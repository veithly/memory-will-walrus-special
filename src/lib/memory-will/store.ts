import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { dirname, join } from "node:path";
import { getMemoryWillKv } from "./cloudflare";
import { defaultBlockedScopes, initialSources, memoryScopes } from "./scenario";
import type {
  AppStore,
  DelegationPolicy,
  MemoryScopeKey,
  MemoryWillReceipt,
  MemoryWillRecord,
  SuccessorReplayTrace,
  SuccessorRole,
  TaskCheckpoint,
  WalrusPointer,
  WorkspaceRecord
} from "./types";

const statePath = join(process.cwd(), ".memory-will", "state.json");

const emptyStore: AppStore = {
  workspaces: [],
  memoryWills: [],
  receipts: [],
  replays: []
};

export function hashText(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function shortId(prefix: string) {
  return `${prefix}_${randomUUID().slice(0, 8)}`;
}

async function readStore(): Promise<AppStore> {
  const kv = getMemoryWillKv();
  if (kv) {
    const raw = await kv.get("state.json", "text");
    return raw ? (JSON.parse(raw) as AppStore) : structuredClone(emptyStore);
  }
  if (!existsSync(statePath)) return structuredClone(emptyStore);
  const raw = await readFile(statePath, "utf8");
  return JSON.parse(raw) as AppStore;
}

async function writeStore(store: AppStore) {
  const kv = getMemoryWillKv();
  if (kv) {
    await kv.put("state.json", JSON.stringify(store));
    return;
  }
  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
}

async function mutateStore<T>(fn: (store: AppStore) => T | Promise<T>) {
  const store = await readStore();
  const result = await fn(store);
  await writeStore(store);
  return result;
}

export async function createWorkspace(ownerSessionId: string): Promise<WorkspaceRecord> {
  return mutateStore((store) => {
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
      ownerSessionId,
      ownerId: `owner_${ownerSessionId.slice(0, 8)}`,
      createdAt: new Date().toISOString(),
      predecessorStatus: "alive",
      checkpoint
    };
    store.workspaces.push(workspace);
    return workspace;
  });
}

export async function getWorkspace(workspaceId: string) {
  const store = await readStore();
  return store.workspaces.find((workspace) => workspace.workspaceId === workspaceId) ?? null;
}

export async function lockCheckpoint(workspaceId: string): Promise<TaskCheckpoint> {
  return mutateStore((store) => {
    const workspace = store.workspaces.find((item) => item.workspaceId === workspaceId);
    if (!workspace) throw new Error("Workspace not found");
    workspace.predecessorStatus = "killed";
    workspace.checkpoint = {
      ...workspace.checkpoint,
      status: "locked",
      lockedAt: new Date().toISOString()
    };
    return workspace.checkpoint;
  });
}

export function buildPolicy(params: {
  workspace: WorkspaceRecord;
  role: SuccessorRole;
  blockedScopes?: MemoryScopeKey[];
}): DelegationPolicy {
  const blocked = params.blockedScopes?.length ? params.blockedScopes : [...defaultBlockedScopes];
  const allowedScopes = memoryScopes
    .filter((scope) => !blocked.includes(scope.key))
    .map((scope) => scope.key);
  return {
    role: params.role,
    allowedScopes,
    blockedScopes: blocked,
    ownerId: params.workspace.ownerId,
    viewerToken: shortId("viewer")
  };
}

export function buildRedactions(blockedScopes: MemoryScopeKey[]) {
  return memoryScopes
    .filter((scope) => blockedScopes.includes(scope.key))
    .map((scope) => ({
      scope: scope.key,
      label: scope.label,
      reason:
        scope.sensitivity === "restricted"
          ? "Owner blocked this category before successor restore."
          : "Owner chose not to delegate this category."
    }));
}

export async function saveMemoryWill(params: {
  workspace: WorkspaceRecord;
  checkpoint: TaskCheckpoint;
  policy: DelegationPolicy;
  pointer: WalrusPointer | null;
  walrusStatus: "ready" | "degraded" | "error";
  errorMessage?: string;
}) {
  return mutateStore((store) => {
    const will: MemoryWillRecord = {
      willId: shortId("will"),
      workspaceId: params.workspace.workspaceId,
      taskId: params.workspace.taskId,
      predecessorRunId: params.checkpoint.agentRunId,
      checkpointId: params.checkpoint.id,
      createdAt: new Date().toISOString(),
      status: params.pointer ? "written" : params.walrusStatus === "error" ? "error" : "degraded",
      pointer: params.pointer,
      policy: params.policy,
      redactions: buildRedactions(params.policy.blockedScopes),
      checkpoint: params.checkpoint,
      evidenceBundle: params.checkpoint.sources,
      dependency: {
        walrus: params.walrusStatus,
        ai: "degraded",
        sui: "degraded"
      },
      errorMessage: params.errorMessage
    };
    store.memoryWills.push(will);
    const receipt = buildReceipt(will, null);
    store.receipts.push(receipt);
    return { will, receipt };
  });
}

export async function getMemoryWill(willId: string) {
  const store = await readStore();
  if (willId === "latest") return store.memoryWills.at(-1) ?? null;
  return store.memoryWills.find((will) => will.willId === willId) ?? null;
}

export async function reviseMemoryWillPolicy(willId: string, policy: DelegationPolicy) {
  return mutateStore((store) => {
    const will = store.memoryWills.find((item) => item.willId === willId);
    if (!will) throw new Error("Memory Will not found");
    will.policy = policy;
    will.redactions = buildRedactions(policy.blockedScopes);
    return will;
  });
}

export async function saveReplay(replay: SuccessorReplayTrace) {
  return mutateStore((store) => {
    store.replays.push(replay);
    const will = store.memoryWills.find((item) => item.willId === replay.willId);
    if (will) {
      will.dependency.ai = "ready";
      will.dependency.sui = will.pointer ? "ready" : "degraded";
    }
    const receipt = will ? buildReceipt(will, replay) : null;
    if (receipt) {
      const index = store.receipts.findIndex((item) => item.willId === replay.willId);
      if (index >= 0) store.receipts[index] = receipt;
      else store.receipts.push(receipt);
    }
    return { replay, receipt };
  });
}

export async function getReceipt(willId: string) {
  const store = await readStore();
  if (willId === "latest") return store.receipts.at(-1) ?? null;
  return store.receipts.find((receipt) => receipt.willId === willId) ?? null;
}

function buildReceipt(will: MemoryWillRecord, replay: SuccessorReplayTrace | null): MemoryWillReceipt {
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

export function splitScopes(policy: DelegationPolicy) {
  return {
    inherited: memoryScopes.filter((scope) => policy.allowedScopes.includes(scope.key)),
    unavailable: buildRedactions(policy.blockedScopes)
  };
}
