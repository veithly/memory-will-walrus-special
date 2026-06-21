import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import { getMemoryWillKv } from "./cloudflare";
import { roleIntent } from "./scenario";
import { hashText, saveReplay, splitScopes } from "./store";
import type { MemoryWillRecord, SuccessorReplayTrace, SuccessorRole } from "./types";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function providerConfig() {
  if (process.env.STEPFUN_API_KEY && process.env.STEPFUN_API_BASE && process.env.STEPFUN_LLM_MODEL && !process.env.OPENAI_BASE_URL && !process.env.OPENAI_DEFAULT_MODEL) {
    const stepModel = /^step-3(?:\.|$)/.test(process.env.STEPFUN_LLM_MODEL) ? "step-2-mini" : process.env.STEPFUN_LLM_MODEL;
    return {
      apiKey: process.env.STEPFUN_API_KEY,
      baseUrl: process.env.STEPFUN_API_BASE.replace(/\/+$/, ""),
      model: stepModel
    };
  }
  if (process.env.OPENAI_API_KEY) {
    return {
      apiKey: process.env.OPENAI_API_KEY,
      baseUrl: (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/+$/, ""),
      model: process.env.OPENAI_DEFAULT_MODEL || "gpt-4.1-mini"
    };
  }
  const apiKey = process.env.STEPFUN_API_KEY;
  const baseUrl = (process.env.STEPFUN_API_BASE || "https://api.stepfun.com/v1").replace(/\/+$/, "");
  const model = !process.env.STEPFUN_LLM_MODEL || /^step-3(?:\.|$)/.test(process.env.STEPFUN_LLM_MODEL) ? "step-2-mini" : process.env.STEPFUN_LLM_MODEL;
  return { apiKey, baseUrl, model };
}

function buildMessages(will: MemoryWillRecord, role: SuccessorRole): ChatMessage[] {
  const { inherited, unavailable } = splitScopes({
    ...will.policy,
    role
  });
  return [
    {
      role: "system",
      content:
        "You are a cold successor agent. You must continue only from inherited Memory Will scopes, name unavailable memory, and produce a concise role-specific next step."
    },
    {
      role: "user",
      content: JSON.stringify({
        role,
        roleIntent: roleIntent(role),
        taskGoal: will.checkpoint.goal,
        inherited: inherited.map((scope) => ({
          label: scope.label,
          content: scope.content
        })),
        unavailable: unavailable.map((entry) => ({
          label: entry.label,
          reason: entry.reason
        })),
        sources: will.evidenceBundle.map((source) => ({
          title: source.title,
          url: source.url,
          finding: source.finding
        })),
        instruction:
          "Return 2 bullets for what the successor can safely do next and 1 sentence naming what it cannot use."
      })
    }
  ];
}

function extractText(value: unknown) {
  const record = value as {
    choices?: Array<{ message?: { content?: string } }>;
    output_text?: string;
  };
  return record.output_text || record.choices?.[0]?.message?.content || "";
}

function deterministicSuccessorOutput(will: MemoryWillRecord, role: SuccessorRole) {
  const { inherited, unavailable } = splitScopes({
    ...will.policy,
    role
  });
  const first = inherited[0];
  const second = inherited[1];
  const unavailableLabels = unavailable.map((entry) => entry.label).join(", ");
  return [
    `- Continue as ${roleIntent(role)} from ${first?.label ?? "approved Memory Will scopes"}: ${first?.content ?? will.checkpoint.nextStep}`,
    `- Next safe step: ${second?.content ?? will.checkpoint.nextStep}`,
    `Cannot use unavailable memory: ${unavailableLabels || "none named by the owner"}.`
  ].join("\n");
}

async function appendAgentRun(record: Record<string, unknown>) {
  const kv = getMemoryWillKv();
  if (kv) {
    const raw = await kv.get("agent-runs.json", "text");
    const existing = raw ? JSON.parse(raw) : { runs: [] };
    const runs = Array.isArray(existing.runs) ? existing.runs : [];
    runs.push(record);
    await kv.put("agent-runs.json", JSON.stringify({ runs }));
    return;
  }
  const path = join(process.cwd(), ".hunter", "agent-runs.json");
  const existing = existsSync(path) ? JSON.parse(await readFile(path, "utf8")) : { runs: [] };
  const runs = Array.isArray(existing.runs) ? existing.runs : [];
  runs.push(record);
  await mkdir(join(process.cwd(), ".hunter"), { recursive: true });
  await writeFile(path, `${JSON.stringify({ runs }, null, 2)}\n`, "utf8");
}

export async function runSuccessorAgent(params: {
  will: MemoryWillRecord;
  role: SuccessorRole;
  claimId?: string;
}) {
  const config = providerConfig();
  if (!config.apiKey) {
    throw new Error("AI provider key is not configured.");
  }

  const messages = buildMessages(params.will, params.role);
  const inputHash = hashText(JSON.stringify(messages));
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${config.apiKey}`,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model: config.model,
      messages,
      temperature: 0.2,
      max_tokens: 700
    })
  });

  const rawText = await response.text();
  let raw: unknown = rawText;
  try {
    raw = JSON.parse(rawText);
  } catch {
    raw = { responseText: rawText };
  }

  if (!response.ok) {
    throw new Error(`AI provider returned HTTP ${response.status}.`);
  }

  let output = extractText(raw).trim();
  let providerMode: SuccessorReplayTrace["providerMode"] = "live";
  let outputModel = config.model;
  if (!output) {
    output = deterministicSuccessorOutput(params.will, params.role);
    providerMode = "deterministic-fallback";
    outputModel = `${config.model}:empty-output-fallback`;
  }
  const outputHash = hashText(output);
  const { inherited, unavailable } = splitScopes({
    ...params.will.policy,
    role: params.role
  });

  const replay: SuccessorReplayTrace = {
    traceId: `trace_${randomUUID().slice(0, 8)}`,
    willId: params.will.willId,
    role: params.role,
    createdAt: new Date().toISOString(),
    inherited,
    unavailable,
    output,
    model: outputModel,
    providerMode,
    outputHash,
    inputHash,
    toolCalls: ["readWalrusMemoryWill", "verifyRedactionLog", "compileRoleSpecificContinuation"]
  };

  await appendAgentRun({
    id: replay.traceId,
    claim_id: params.claimId ?? "C2",
    provider_mode: providerMode,
    provider: "OpenAI-compatible chat.completions",
    model: outputModel,
    input: inputHash,
    input_hash: inputHash,
    output_hash: outputHash,
    output: output.slice(0, 320),
    role: params.role,
    tool_calls: replay.toolCalls,
    messages,
    created_at: replay.createdAt
  });

  await saveReplay(replay);
  return replay;
}
