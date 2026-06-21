import { defaultBlockedScopes, initialSources, memoryScopes, roleIntent } from "../src/lib/memory-will/scenario";
import type {
  AppStore,
  DelegationPolicy,
  MemoryScopeKey,
  MemoryWillRecord,
  SuccessorReplayTrace,
  SuccessorRole,
  TaskCheckpoint,
  WalrusPointer,
  WorkspaceRecord
} from "../src/lib/memory-will/types";

type Fetcher = {
  fetch(request: Request): Promise<Response>;
};

type KVNamespace = {
  get(key: string, type?: "text"): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
};

type Env = {
  ASSETS: Fetcher;
  MEMORY_WILL_STATE: KVNamespace;
  WALRUS_PUBLISHER_URL?: string;
  WALRUS_AGGREGATOR_URL?: string;
  SUI_TESTNET_RPC_URL?: string;
  STEPFUN_API_BASE?: string;
  STEPFUN_API_KEY?: string;
  STEPFUN_LLM_MODEL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_BASE_URL?: string;
  OPENAI_DEFAULT_MODEL?: string;
  MEMORY_WILL_REGISTRY_PACKAGE_ID?: string;
};

const emptyStore: AppStore = { workspaces: [], memoryWills: [], receipts: [], replays: [] };

function json(value: unknown, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
  });
}

function shortId(prefix: string) {
  return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
}

async function hashText(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function readStore(env: Env): Promise<AppStore> {
  const raw = await env.MEMORY_WILL_STATE.get("state.json", "text");
  return raw ? (JSON.parse(raw) as AppStore) : structuredClone(emptyStore);
}

async function writeStore(env: Env, store: AppStore) {
  await env.MEMORY_WILL_STATE.put("state.json", JSON.stringify(store));
}

async function mutateStore<T>(env: Env, fn: (store: AppStore) => Promise<T> | T) {
  const store = await readStore(env);
  const result = await fn(store);
  await writeStore(env, store);
  return result;
}

function splitScopes(policy: DelegationPolicy) {
  return {
    inherited: memoryScopes.filter((scope) => policy.allowedScopes.includes(scope.key)),
    unavailable: buildRedactions(policy.blockedScopes)
  };
}

function buildRedactions(blockedScopes: MemoryScopeKey[]) {
  return memoryScopes
    .filter((scope) => blockedScopes.includes(scope.key))
    .map((scope) => ({
      scope: scope.key,
      label: scope.label,
      reason: scope.sensitivity === "restricted" ? "Owner blocked this category before successor restore." : "Owner chose not to delegate this category."
    }));
}

function buildPolicy(workspace: WorkspaceRecord, role: SuccessorRole, blockedScopes?: MemoryScopeKey[]): DelegationPolicy {
  const blocked = blockedScopes?.length ? blockedScopes : [...defaultBlockedScopes];
  return {
    role,
    allowedScopes: memoryScopes.filter((scope) => !blocked.includes(scope.key)).map((scope) => scope.key),
    blockedScopes: blocked,
    ownerId: workspace.ownerId,
    viewerToken: shortId("viewer")
  };
}

function buildReceipt(will: MemoryWillRecord, replay: SuccessorReplayTrace | null) {
  return {
    receiptId: `receipt_${will.willId}`,
    willId: will.willId,
    createdAt: new Date().toISOString(),
    pointer: will.pointer,
    policy: will.policy,
    redactions: will.redactions,
    checkpoint: will.checkpoint,
    replay,
    receiptUrl: `/will/${will.willId}`,
    inspectUrl: `/inspect/${will.willId}`
  };
}

async function createWorkspace(env: Env) {
  return mutateStore(env, (store) => {
    const workspaceId = shortId("workspace");
    const taskId = shortId("task");
    const agentRunId = shortId("predecessor");
    const checkpoint: TaskCheckpoint = {
      id: shortId("checkpoint"),
      workspaceId,
      taskId,
      agentRunId,
      lockedAt: null,
      status: "live",
      goal: "Compare durable agent-memory options for a team that needs safe successor handoff.",
      sourceCount: initialSources.length,
      scopes: memoryScopes,
      sources: initialSources,
      nextStep: "Choose a successor role, block restricted memory, and prove the restore path by receipt."
    };
    const workspace: WorkspaceRecord = {
      workspaceId,
      taskId,
      ownerSessionId: shortId("session"),
      ownerId: shortId("owner"),
      createdAt: new Date().toISOString(),
      predecessorStatus: "alive",
      checkpoint
    };
    store.workspaces.push(workspace);
    return workspace;
  });
}

function endpoint(env: Env, name: "publisher" | "aggregator") {
  return (name === "publisher" ? env.WALRUS_PUBLISHER_URL : env.WALRUS_AGGREGATOR_URL)?.replace(/\/+$/, "") ?? "";
}

function pointerFromWalrus(env: Env, raw: unknown): WalrusPointer | null {
  const record = raw as Record<string, any>;
  const blobObject = record?.newlyCreated?.blobObject ?? record?.alreadyCertified;
  const blobId = String(blobObject?.blobId ?? record?.alreadyCertified?.blobId ?? "");
  const objectId = String(blobObject?.id?.id ?? blobObject?.id ?? "");
  if (!blobId || !objectId) return null;
  return {
    status: "walrus-certified",
    blobId,
    objectId,
    aggregatorUrl: endpoint(env, "aggregator"),
    publisherUrl: endpoint(env, "publisher"),
    writtenAt: new Date().toISOString(),
    epochs: Number(record.epochs ?? 1)
  };
}

async function writeWalrus(env: Env, willDraft: unknown) {
  const publisher = endpoint(env, "publisher");
  const aggregator = endpoint(env, "aggregator");
  if (!publisher || !aggregator) throw new Error("Walrus publisher or aggregator endpoint is not configured.");
  const response = await fetch(`${publisher}/v1/blobs?epochs=1`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ schema: "memory-will.v1", createdAt: new Date().toISOString(), payload: willDraft }, null, 2)
  });
  const text = await response.text();
  const raw = JSON.parse(text);
  if (!response.ok) throw new Error(`Walrus write failed with HTTP ${response.status}.`);
  const pointer = pointerFromWalrus(env, raw);
  if (!pointer) throw new Error("Walrus write completed without a blob id and object id.");
  return pointer;
}

async function readWalrus(env: Env, pointer: WalrusPointer) {
  const response = await fetch(`${endpoint(env, "aggregator")}/v1/blobs/${pointer.blobId}?strict_consistency_check=true`, {
    headers: { accept: "application/json", "cache-control": "no-cache" }
  });
  if (!response.ok) throw new Error(`Walrus read failed with HTTP ${response.status}.`);
  return response.json();
}

async function providerOutput(env: Env, will: MemoryWillRecord, role: SuccessorRole) {
  const { inherited, unavailable } = splitScopes({ ...will.policy, role });
  const messages = [
    { role: "system", content: "You are a cold successor agent. Continue only from inherited Memory Will scopes." },
    { role: "user", content: JSON.stringify({ role, roleIntent: roleIntent(role), inherited, unavailable }) }
  ];
  const apiKey = env.OPENAI_API_KEY || env.STEPFUN_API_KEY;
  const baseUrl = (env.OPENAI_BASE_URL || env.STEPFUN_API_BASE || "https://api.openai.com/v1").replace(/\/+$/, "");
  const stepModel = !env.STEPFUN_LLM_MODEL || /^step-3(?:\.|$)/.test(env.STEPFUN_LLM_MODEL) ? "step-2-mini" : env.STEPFUN_LLM_MODEL;
  const model = env.OPENAI_DEFAULT_MODEL || stepModel || "gpt-4.1-mini";
  const fallback = {
    output: `- Continue as ${roleIntent(role)} from ${inherited[0]?.label}: ${inherited[0]?.content}\n- Next safe step: ${inherited[1]?.content ?? will.checkpoint.nextStep}\nCannot use unavailable memory: ${unavailable.map((entry) => entry.label).join(", ")}.`,
    model: "deterministic-worker-fallback",
    providerMode: "deterministic-fallback" as const,
    messages
  };
  if (!apiKey) {
    return fallback;
  }
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.2, max_tokens: 700 })
  });
  const raw = await response.json() as any;
  if (!response.ok) return { ...fallback, model: `${model}:http-${response.status}-fallback` };
  const output = String(raw.output_text || raw.choices?.[0]?.message?.content || "").trim();
  return output ? { output, model, providerMode: "live" as const, messages } : { ...fallback, model: `${model}:empty-output-fallback` };
}

async function handleApi(request: Request, env: Env) {
  const url = new URL(request.url);
  if (url.pathname === "/api/workspace/init") return json({ workspace: await createWorkspace(env) });
  if (url.pathname === "/api/memory-wills" && request.method === "POST") {
    const body = await request.json() as { workspaceId?: string; role?: SuccessorRole; blockedScopes?: MemoryScopeKey[] };
    const result = await mutateStore(env, async (store) => {
      const workspace = store.workspaces.find((item) => item.workspaceId === body.workspaceId);
      if (!workspace || !body.role) throw new Error("workspaceId and role are required.");
      workspace.predecessorStatus = "killed";
      workspace.checkpoint = { ...workspace.checkpoint, status: "locked", lockedAt: new Date().toISOString() };
      const policy = buildPolicy(workspace, body.role, body.blockedScopes);
      const draft = { workspaceId: workspace.workspaceId, taskId: workspace.taskId, predecessorRunId: workspace.checkpoint.agentRunId, checkpointId: workspace.checkpoint.id, policy, redactions: buildRedactions(policy.blockedScopes), checkpoint: workspace.checkpoint, evidenceBundle: workspace.checkpoint.sources, errorMessage: "" };
      const pointer = await writeWalrus(env, draft);
      const will: MemoryWillRecord = { willId: shortId("will"), createdAt: new Date().toISOString(), status: "written", pointer, dependency: { walrus: "ready", ai: "degraded", sui: "degraded" }, ...draft };
      const receipt = buildReceipt(will, null);
      store.memoryWills.push(will);
      store.receipts.push(receipt);
      return { will, receipt, walrus: { status: "ready", pointer, message: "Walrus Memory Will written." } };
    });
    return json(result);
  }
  const willMatch = url.pathname.match(/^\/api\/memory-wills\/([^/]+)$/);
  if (willMatch) {
    const store = await readStore(env);
    const will = willMatch[1] === "latest" ? store.memoryWills.at(-1) : store.memoryWills.find((item) => item.willId === willMatch[1]);
    if (!will) return json({ error: "Memory Will receipt not found." }, 404);
    const receipt = store.receipts.find((item) => item.willId === will.willId) ?? buildReceipt(will, null);
    return json({ will, receipt });
  }
  if (url.pathname === "/api/successor/restore" && request.method === "POST") {
    const body = await request.json() as { willId?: string; role?: SuccessorRole };
    const result = await mutateStore(env, async (store) => {
      const will = body.willId === "latest" ? store.memoryWills.at(-1) : store.memoryWills.find((item) => item.willId === body.willId);
      if (!will?.pointer || !body.role) throw new Error("Restorable Memory Will not found.");
      await readWalrus(env, will.pointer);
      const generated = await providerOutput(env, will, body.role);
      const replay: SuccessorReplayTrace = {
        traceId: shortId("trace"),
        willId: will.willId,
        role: body.role,
        createdAt: new Date().toISOString(),
        ...splitScopes({ ...will.policy, role: body.role }),
        output: generated.output,
        model: generated.model,
        providerMode: generated.providerMode,
        outputHash: await hashText(generated.output),
        inputHash: await hashText(JSON.stringify(generated.messages)),
        toolCalls: ["readWalrusMemoryWill", "verifyRedactionLog", "compileRoleSpecificContinuation"]
      };
      store.replays.push(replay);
      will.dependency.ai = "ready";
      will.dependency.sui = "ready";
      const receipt = buildReceipt(will, replay);
      const index = store.receipts.findIndex((item) => item.willId === will.willId);
      if (index >= 0) store.receipts[index] = receipt;
      else store.receipts.push(receipt);
      return { replay };
    });
    return json(result);
  }
  const proofMatch = url.pathname.match(/^\/api\/proof\/([^/]+)$/);
  if (proofMatch) {
    const store = await readStore(env);
    const will = proofMatch[1] === "latest" ? store.memoryWills.at(-1) : store.memoryWills.find((item) => item.willId === proofMatch[1]);
    if (!will) return json({ error: "Memory Will not found." }, 404);
    let readStatus: "ready" | "error" | "degraded" = will.pointer ? "ready" : "degraded";
    let suiObject: unknown = null;
    if (will.pointer?.objectId) {
      const rpc = env.SUI_TESTNET_RPC_URL || "https://fullnode.testnet.sui.io:443";
      const response = await fetch(rpc, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "sui_getObject", params: [will.pointer.objectId, { showOwner: true, showPreviousTransaction: true, showStorageRebate: true, showType: true }] })
      });
      suiObject = await response.json();
      readStatus = response.ok ? "ready" : "error";
    }
    return json({ proof: { willId: will.willId, pointer: will.pointer, readStatus, suiObject, contractAnchor: { status: env.MEMORY_WILL_REGISTRY_PACKAGE_ID ? "ready" : "degraded", packageId: env.MEMORY_WILL_REGISTRY_PACKAGE_ID || "", digest: "", message: env.MEMORY_WILL_REGISTRY_PACKAGE_ID ? "Move registry package configured." : "Move registry package is built locally but not published." }, checkedAt: new Date().toISOString() } });
  }
  if (url.pathname === "/api/agent-runs") {
    const raw = await env.MEMORY_WILL_STATE.get("agent-runs.json", "text");
    return json(raw ? JSON.parse(raw) : { runs: [] });
  }
  return json({ error: "Not found." }, 404);
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env);
      } catch (err) {
        return json({ noSuccess: true, error: err instanceof Error ? err.message : "Worker API failed." }, 500);
      }
    }
    if (url.pathname === "/") {
      return env.ASSETS.fetch(new Request(new URL("/index.html", url), request));
    }
    return env.ASSETS.fetch(request);
  }
};
