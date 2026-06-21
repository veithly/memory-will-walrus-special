import type { MemoryScope, SourceRecord, SuccessorRole } from "./types";

export const successorRoles: Array<{
  key: SuccessorRole;
  label: string;
  intent: string;
}> = [
  {
    key: "finance",
    label: "Finance successor",
    intent: "continue with cost exposure, renewal risk, and budget-safe next questions"
  },
  {
    key: "legal",
    label: "Legal successor",
    intent: "continue with contractual risk, data retention, and proof obligations"
  },
  {
    key: "designer",
    label: "Designer successor",
    intent: "continue with buyer-facing clarity, evidence hierarchy, and onboarding friction"
  },
  {
    key: "operator",
    label: "Operator successor",
    intent: "continue with rollout steps, owner handoffs, and recovery states"
  }
];

export const memoryScopes: MemoryScope[] = [
  {
    key: "vendor_shortlist",
    label: "Vendor shortlist",
    content: "Walrus for durable agent data, MemWal for agent memory, and Sui object proofs for receipt inspection.",
    sensitivity: "shareable"
  },
  {
    key: "source_findings",
    label: "Source-backed findings",
    content:
      "The selected vendor must let a successor reopen scoped memory by object id and show redaction state without a hidden transcript.",
    sensitivity: "shareable"
  },
  {
    key: "open_questions",
    label: "Open questions",
    content:
      "Confirm retention period, read latency, proof surface, and how a teammate can verify the successor did not inherit blocked notes.",
    sensitivity: "shareable"
  },
  {
    key: "next_step",
    label: "Next comparison step",
    content:
      "Ask the successor to produce a role-specific continuation from the durable will before expanding to a full workspace.",
    sensitivity: "shareable"
  },
  {
    key: "pricing_notes",
    label: "Pricing notes",
    content: "Internal unit-cost guesses and renewal pressure notes from the private planning thread.",
    sensitivity: "restricted"
  },
  {
    key: "private_budget",
    label: "Private budget",
    content: "Team budget ceiling and procurement timing are intentionally withheld from successors by default.",
    sensitivity: "restricted"
  },
  {
    key: "unverified_hunches",
    label: "Unverified hunches",
    content: "Speculative vendor preference without source support should not bias the successor.",
    sensitivity: "restricted"
  }
];

export const initialSources: SourceRecord[] = [
  {
    id: "source_walrus_http",
    title: "Walrus HTTP API",
    url: "https://docs.wal.app/usage/web-api.html",
    finding: "Publisher and aggregator endpoints can write and read blobs by id."
  },
  {
    id: "source_sui_sdk",
    title: "Sui TypeScript SDK",
    url: "https://sdk.mystenlabs.com/sui/clients/json-rpc",
    finding: "SuiClient can inspect onchain object metadata for receipt proof."
  },
  {
    id: "source_deepsurge_walrus",
    title: "Sui Overflow 2026 Walrus track",
    url: "https://www.deepsurge.xyz/hackathons/b587dc0c-4cb8-4e63-ada5-519df38103bf",
    finding: "The Special - Walrus track rewards agent workflows where Walrus is on the critical path."
  }
];

export const defaultBlockedScopes = ["pricing_notes", "private_budget", "unverified_hunches"] as const;

export function roleIntent(role: SuccessorRole) {
  return successorRoles.find((item) => item.key === role)?.intent ?? successorRoles[0].intent;
}
