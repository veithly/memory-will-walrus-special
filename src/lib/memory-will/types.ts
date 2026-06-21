export type SuccessorRole = "finance" | "legal" | "designer" | "operator";

export type MemoryScopeKey =
  | "vendor_shortlist"
  | "source_findings"
  | "open_questions"
  | "next_step"
  | "pricing_notes"
  | "private_budget"
  | "unverified_hunches";

export type DependencyStatus = "ready" | "degraded" | "error";

export type MemoryScope = {
  key: MemoryScopeKey;
  label: string;
  content: string;
  sensitivity: "shareable" | "restricted";
};

export type SourceRecord = {
  id: string;
  title: string;
  url: string;
  finding: string;
};

export type TaskCheckpoint = {
  id: string;
  workspaceId: string;
  taskId: string;
  agentRunId: string;
  lockedAt: string | null;
  status: "live" | "locked";
  goal: string;
  sourceCount: number;
  scopes: MemoryScope[];
  sources: SourceRecord[];
  nextStep: string;
};

export type WorkspaceRecord = {
  workspaceId: string;
  taskId: string;
  ownerSessionId: string;
  ownerId: string;
  createdAt: string;
  predecessorStatus: "alive" | "killed";
  checkpoint: TaskCheckpoint;
};

export type WalrusPointer = {
  status: "walrus-certified";
  blobId: string;
  objectId: string;
  aggregatorUrl: string;
  publisherUrl: string;
  writtenAt: string;
  epochs: number;
};

export type DelegationPolicy = {
  role: SuccessorRole;
  allowedScopes: MemoryScopeKey[];
  blockedScopes: MemoryScopeKey[];
  ownerId: string;
  viewerToken: string;
};

export type RedactionEntry = {
  scope: MemoryScopeKey;
  label: string;
  reason: string;
};

export type MemoryWillRecord = {
  willId: string;
  workspaceId: string;
  taskId: string;
  predecessorRunId: string;
  checkpointId: string;
  createdAt: string;
  status: "written" | "degraded" | "error";
  pointer: WalrusPointer | null;
  policy: DelegationPolicy;
  redactions: RedactionEntry[];
  checkpoint: TaskCheckpoint;
  evidenceBundle: SourceRecord[];
  dependency: {
    walrus: DependencyStatus;
    ai: DependencyStatus;
    sui: DependencyStatus;
  };
  errorMessage?: string;
};

export type SuccessorReplayTrace = {
  traceId: string;
  willId: string;
  role: SuccessorRole;
  createdAt: string;
  inherited: MemoryScope[];
  unavailable: RedactionEntry[];
  output: string;
  model: string;
  providerMode: "live" | "deterministic-fallback";
  outputHash: string;
  inputHash: string;
  toolCalls: string[];
};

export type MemoryWillReceipt = {
  receiptId: string;
  willId: string;
  createdAt: string;
  pointer: WalrusPointer | null;
  policy: DelegationPolicy;
  redactions: RedactionEntry[];
  checkpoint: TaskCheckpoint;
  replay: SuccessorReplayTrace | null;
  inspectUrl: string;
  receiptUrl: string;
};

export type ProofStatus = {
  willId: string;
  readStatus: DependencyStatus;
  pointer: WalrusPointer | null;
  walrusObject: unknown;
  suiObject: unknown;
  contractAnchor: {
    status: DependencyStatus;
    packageId: string;
    digest: string;
    message: string;
  };
  checkedAt: string;
  message: string;
};

export type AppStore = {
  workspaces: WorkspaceRecord[];
  memoryWills: MemoryWillRecord[];
  receipts: MemoryWillReceipt[];
  replays: SuccessorReplayTrace[];
};
