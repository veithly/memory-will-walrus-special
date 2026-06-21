import { NextResponse } from "next/server";
import { buildPolicy, buildRedactions, getWorkspace, lockCheckpoint, saveMemoryWill } from "@/lib/memory-will/store";
import { writeMemoryWillToWalrus } from "@/lib/memory-will/walrus";
import type { MemoryScopeKey, SuccessorRole } from "@/lib/memory-will/types";

export const dynamic = "force-dynamic";

type WriteBody = {
  workspaceId?: string;
  role?: SuccessorRole;
  blockedScopes?: MemoryScopeKey[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as WriteBody;
  if (!body.workspaceId || !body.role) {
    return NextResponse.json({ error: "workspaceId and role are required." }, { status: 400 });
  }

  const workspace = await getWorkspace(body.workspaceId);
  if (!workspace) return NextResponse.json({ error: "Workspace not found." }, { status: 404 });

  const checkpoint = await lockCheckpoint(workspace.workspaceId);
  const policy = buildPolicy({
    workspace,
    role: body.role,
    blockedScopes: body.blockedScopes
  });

  const willDraft = {
    workspaceId: workspace.workspaceId,
    taskId: workspace.taskId,
    predecessorRunId: checkpoint.agentRunId,
    checkpointId: checkpoint.id,
    policy,
    redactions: buildRedactions(policy.blockedScopes),
    checkpoint,
    evidenceBundle: checkpoint.sources,
    errorMessage: ""
  };

  const walrusWrite = await writeMemoryWillToWalrus({ willDraft }).catch((err) => ({
    status: "error" as const,
    pointer: null,
    raw: null,
    message: err instanceof Error ? err.message : "Walrus write failed."
  }));
  const { will, receipt } = await saveMemoryWill({
    workspace,
    checkpoint,
    policy,
    pointer: walrusWrite.pointer,
    walrusStatus: walrusWrite.status,
    errorMessage: "message" in walrusWrite ? walrusWrite.message : undefined
  });

  const status = 200;
  return NextResponse.json(
    {
      will,
      receipt,
      noSuccess: walrusWrite.status !== "ready",
      error: walrusWrite.status === "ready" ? "" : "message" in walrusWrite ? walrusWrite.message : "Walrus Memory Will was not written.",
      walrus: {
        status: walrusWrite.status,
        pointer: walrusWrite.pointer,
        message: "message" in walrusWrite ? walrusWrite.message : "Walrus Memory Will written."
      }
    },
    { status }
  );
}
