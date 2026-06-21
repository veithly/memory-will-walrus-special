import { NextResponse } from "next/server";
import { runSuccessorAgent } from "@/lib/memory-will/agent";
import { buildRedactions, getMemoryWill, reviseMemoryWillPolicy } from "@/lib/memory-will/store";
import { readMemoryWillFromWalrus } from "@/lib/memory-will/walrus";
import type { DelegationPolicy, MemoryScopeKey, SuccessorRole } from "@/lib/memory-will/types";

export const dynamic = "force-dynamic";

type RestoreBody = {
  willId?: string;
  role?: SuccessorRole;
  blockedScopes?: MemoryScopeKey[];
};

function policyForMutation(base: DelegationPolicy, role: SuccessorRole, blockedScopes?: MemoryScopeKey[]): DelegationPolicy {
  const blocked = blockedScopes?.length ? blockedScopes : base.blockedScopes;
  const allScopes: MemoryScopeKey[] = [
    "vendor_shortlist",
    "source_findings",
    "open_questions",
    "next_step",
    "pricing_notes",
    "private_budget",
    "unverified_hunches"
  ];
  return {
    ...base,
    role,
    blockedScopes: blocked,
    allowedScopes: allScopes.filter((scope) => !blocked.includes(scope))
  };
}

export async function POST(request: Request) {
  const body = (await request.json()) as RestoreBody;
  if (!body.willId || !body.role) {
    return NextResponse.json({ error: "willId and role are required." }, { status: 400 });
  }

  const will = await getMemoryWill(body.willId);
  if (!will) return NextResponse.json({ error: "Memory Will not found." }, { status: 404 });
  if (!will.pointer) {
    return NextResponse.json(
      {
        error: will.errorMessage || "Memory Will has no Walrus pointer, so restore is blocked.",
        noSuccess: true
      },
      { status: 200 }
    );
  }

  try {
    await readMemoryWillFromWalrus(will.pointer, {
      attempts: 8,
      initialDelayMs: 750,
      maxDelayMs: 5000
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Walrus read failed.",
        noSuccess: true
      },
      { status: 200 }
    );
  }
  const policy = policyForMutation(will.policy, body.role, body.blockedScopes);
  const revisedWill = await reviseMemoryWillPolicy(will.willId, policy);
  revisedWill.redactions = buildRedactions(policy.blockedScopes);
  let replay;
  try {
    replay = await runSuccessorAgent({
      will: revisedWill,
      role: body.role,
      claimId: "C2"
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "AI successor run failed.",
        noSuccess: true
      },
      { status: 200 }
    );
  }

  return NextResponse.json({
    replay,
    inherited: replay.inherited,
    unavailable: replay.unavailable
  });
}
