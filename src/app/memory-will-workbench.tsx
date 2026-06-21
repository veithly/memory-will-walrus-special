"use client";

import {
  BadgeCheck,
  CircleAlert,
  Copy,
  FileClock,
  RotateCcw,
  ShieldCheck,
  Skull,
  Undo2
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { defaultBlockedScopes, memoryScopes, successorRoles } from "@/lib/memory-will/scenario";
import type {
  MemoryScopeKey,
  MemoryWillReceipt,
  MemoryWillRecord,
  ProofStatus,
  SuccessorReplayTrace,
  SuccessorRole,
  WorkspaceRecord
} from "@/lib/memory-will/types";

type Phase =
  | "boot"
  | "ready"
  | "killed"
  | "writing"
  | "written"
  | "restoring"
  | "restored"
  | "receipt"
  | "inspect"
  | "blocked";

type ReceiptResponse = {
  will: MemoryWillRecord;
  receipt: MemoryWillReceipt;
};

const orderedSteps = [
  "Kill predecessor",
  "Scope inheritance",
  "Write Walrus will",
  "Restore successor"
];

function scopeLabels(keys: readonly MemoryScopeKey[]) {
  return memoryScopes.filter((scope) => keys.includes(scope.key));
}

function modeLabel(phase: Phase) {
  if (phase === "ready") return "Checkpoint live";
  if (phase === "killed") return "Predecessor killed";
  if (phase === "writing") return "Writing Memory Will";
  if (phase === "written") return "Walrus pointer certified";
  if (phase === "restoring") return "Cold successor opening";
  if (phase === "restored") return "Scoped restore complete";
  if (phase === "receipt") return "Receipt reopened";
  if (phase === "inspect") return "Proof inspected";
  if (phase === "blocked") return "No-success state";
  return "Preparing workbench";
}

async function readJson<T>(response: Response): Promise<T> {
  const data = (await response.json()) as T;
  if (!response.ok || (data as { noSuccess?: boolean }).noSuccess) {
    throw new Error((data as { error?: string }).error || `HTTP ${response.status}`);
  }
  return data;
}

export default function MemoryWillWorkbench() {
  const [phase, setPhase] = useState<Phase>("boot");
  const [workspace, setWorkspace] = useState<WorkspaceRecord | null>(null);
  const [role, setRole] = useState<SuccessorRole>("finance");
  const [blockedScopes, setBlockedScopes] = useState<MemoryScopeKey[]>([...defaultBlockedScopes]);
  const [will, setWill] = useState<MemoryWillRecord | null>(null);
  const [receipt, setReceipt] = useState<MemoryWillReceipt | null>(null);
  const [replay, setReplay] = useState<SuccessorReplayTrace | null>(null);
  const [proof, setProof] = useState<ProofStatus | null>(null);
  const [error, setError] = useState("");

  const allowed = useMemo(
    () => scopeLabels(memoryScopes.map((scope) => scope.key).filter((key) => !blockedScopes.includes(key))),
    [blockedScopes]
  );
  const unavailable = useMemo(() => scopeLabels(blockedScopes), [blockedScopes]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const willParam = params.get("will");
    if (willParam) {
      openReceipt(willParam);
      return;
    }
    void initializeWorkspace();
  }, []);

  async function initializeWorkspace() {
    setError("");
    setPhase("boot");
    const data = await readJson<{ workspace: WorkspaceRecord }>(await fetch("/api/workspace/init"));
    setWorkspace(data.workspace);
    setWill(null);
    setReceipt(null);
    setReplay(null);
    setProof(null);
    setPhase("ready");
  }

  function toggleScope(scope: MemoryScopeKey) {
    setBlockedScopes((current) =>
      current.includes(scope) ? current.filter((item) => item !== scope) : [...current, scope]
    );
  }

  async function writeWill() {
    if (!workspace) return;
    setError("");
    setPhase("writing");
    try {
      const response = await fetch("/api/memory-wills", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          workspaceId: workspace.workspaceId,
          role,
          blockedScopes
        })
      });
      const data = await readJson<{
        will: MemoryWillRecord;
        receipt: MemoryWillReceipt;
      }>(response);
      setWill(data.will);
      setReceipt(data.receipt);
      setPhase("written");
      window.history.replaceState({}, "", `/?will=${data.will.willId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Memory Will write failed.");
      setPhase("blocked");
    }
  }

  async function restoreSuccessor(nextRole = role) {
    const activeWill = will || (await openReceipt("latest"));
    if (!activeWill?.pointer) {
      setError("Restore is blocked because no Walrus pointer exists.");
      setPhase("blocked");
      return;
    }
    setError("");
    setRole(nextRole);
    setPhase("restoring");
    try {
      const data = await readJson<{
        replay: SuccessorReplayTrace;
      }>(
        await fetch("/api/successor/restore", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            willId: activeWill.willId,
            role: nextRole,
            blockedScopes
          })
        })
      );
      setReplay(data.replay);
      setPhase("restored");
      await openReceipt(activeWill.willId, false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Successor restore failed.");
      setPhase("blocked");
    }
  }

  async function openReceipt(willId: string, makeReceiptPhase = true) {
    setError("");
    try {
      const data = await readJson<ReceiptResponse>(await fetch(`/api/memory-wills/${willId}`));
      setWill(data.will);
      setReceipt(data.receipt);
      if (data.receipt.replay) setReplay(data.receipt.replay);
      window.history.replaceState({}, "", `/?will=${data.will.willId}`);
      if (makeReceiptPhase) setPhase("receipt");
      return data.will;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Receipt could not be opened.");
      setPhase("blocked");
      return null;
    }
  }

  async function inspectProof() {
    const activeWill = will || (await openReceipt("latest", false));
    if (!activeWill) return;
    setError("");
    try {
      const data = await readJson<{ proof: ProofStatus }>(await fetch(`/api/proof/${activeWill.willId}`));
      setProof(data.proof);
      setPhase("inspect");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Proof read failed.");
      setPhase("blocked");
    }
  }

  const predecessorKilled = phase !== "boot" && phase !== "ready";
  const pointerShort = will?.pointer?.blobId ? `${will.pointer.blobId.slice(0, 10)}...${will.pointer.blobId.slice(-8)}` : "";
  const currentCheckpoint = workspace?.checkpoint || will?.checkpoint;

  return (
    <main
      className="workbench-shell"
      data-visual-lane="cinematic operations console with editorial restraint and a clear physical kill/restore beat."
      data-hero-composition="split living/dead successor stage"
    >
      <section className="hero-grid" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="system-label">Walrus memory succession</p>
          <h1 id="hero-title" data-hero-text>
            Kill one agent. Restore a scoped successor in 60 seconds.
          </h1>
          <p className="hero-subcopy">
            Trigger an agent death, choose what survives, write a Walrus Memory Will, then inspect what the cold successor restored.
          </p>
          <div className="step-strip" aria-label="How it works">
            {orderedSteps.map((step, index) => (
              <span key={step}>
                <strong>{index + 1}</strong>
                {step}
              </span>
            ))}
          </div>
          <div className="status-line" data-agent-status>
            <span>{modeLabel(phase)}</span>
            <span data-local-context-meter>{predecessorKilled ? "local context 0%" : "local context 100%"}</span>
          </div>
        </div>

        <div className="stage-panel" aria-label="Agent succession workbench">
          <div className={`stage-column living ${predecessorKilled ? "is-dead" : ""}`}>
            <div className="panel-head">
              <span>Predecessor</span>
              <BadgeCheck aria-hidden="true" size={18} />
            </div>
            <div className="agent-card">
              <div className="pulse-line" aria-hidden="true" />
              <h2>{predecessorKilled ? "Agent killed at checkpoint" : "Vendor comparison in progress"}</h2>
              <p data-checkpoint-ready>
                {currentCheckpoint?.sourceCount ?? 3} sources read. Checkpoint {currentCheckpoint?.id ?? "pending"} is ready for a will.
              </p>
              <ul>
                {(currentCheckpoint?.sources ?? []).map((source) => (
                  <li key={source.id} data-source-chip>
                    <strong>{source.title}</strong>
                    <span>{source.finding}</span>
                  </li>
                ))}
              </ul>
              <p className="next-step" data-next-step-preview>
                {currentCheckpoint?.nextStep ?? "Choose a successor role and block restricted memory."}
              </p>
            </div>
          </div>

          <div className="action-spine" aria-label="Primary action">
            {phase === "ready" || phase === "boot" ? (
              <button
                type="button"
                className="kill-button"
                data-cta-primary="kill-agent"
                data-kill-armed={phase === "ready"}
                onClick={() => setPhase("killed")}
              >
                <Skull aria-hidden="true" size={19} />
                Kill Agent
              </button>
            ) : (
              <button type="button" className="write-button" onClick={writeWill} data-scope-sheet>
                <FileClock aria-hidden="true" size={18} />
                Write Memory Will
              </button>
            )}
            <div className={`will-stamp ${will?.pointer ? "is-certified" : ""}`} aria-hidden="true">
              Memory Will
            </div>
            {will?.pointer ? (
              <button type="button" className="secondary-button" data-next-step-cta onClick={() => restoreSuccessor(role)}>
                <Undo2 aria-hidden="true" size={18} />
                Open Cold Successor
              </button>
            ) : null}
          </div>

          <div className="stage-column successor">
            <div className="panel-head">
              <span>Cold successor</span>
              <Undo2 aria-hidden="true" size={18} />
            </div>
            <div className="agent-card restored" data-successor-blank-state={phase === "restoring"}>
              <h2>{replay ? `${successorRoles.find((item) => item.key === replay.role)?.label} restored` : "Context starts empty"}</h2>
              <p>
                {replay
                  ? `${replay.providerMode === "live" ? "Live model" : "Scoped fallback"} output hash ${replay.outputHash.slice(0, 12)} is tied to role ${replay.role}.`
                  : "The successor cannot use predecessor state until it reads the Walrus Memory Will."}
              </p>
              {phase === "restoring" ? <div className="restore-stepper" data-restore-stepper>Reading Walrus will, verifying redactions, asking successor engine.</div> : null}
              {replay ? (
                <pre className="successor-output" data-successor-output>
                  {replay.output}
                </pre>
              ) : null}
              {receipt ? (
                <div className="receipt-actions">
                  <button type="button" className="receipt-link" data-cta-open-receipt onClick={() => openReceipt(receipt.willId)}>
                    Open Receipt
                  </button>
                  <button type="button" className="receipt-link" data-cta-inspect onClick={inspectProof}>
                    Inspect Proof
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="control-grid" aria-label="Scope and proof controls">
        <div className="control-panel role-panel">
          <div className="panel-head">
            <span>Successor role</span>
            <ShieldCheck aria-hidden="true" size={18} />
          </div>
          <div className="role-list" data-mutation-panel>
            {successorRoles.map((item) => (
              <button
                type="button"
                key={item.key}
                className={item.key === role ? "role-card is-selected" : "role-card"}
                data-current-role={item.key === role}
                data-role-card-finance={item.key === "finance" || undefined}
                data-role-swap-legal={item.key === "legal" || undefined}
                onClick={() => {
                  setRole(item.key);
                  if (will?.pointer && replay) void restoreSuccessor(item.key);
                }}
              >
                <strong>{item.label}</strong>
                <span>{item.intent}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="control-panel">
          <div className="panel-head">
            <span>Allowed memory</span>
            <ShieldCheck aria-hidden="true" size={18} />
          </div>
          <ul data-inherited-memory-list>
            {allowed.map((item) => (
              <li key={item.key}>
                <strong>{item.label}</strong>
                <span>{item.content}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="control-panel blocked">
          <div className="panel-head">
            <span>Unavailable memory</span>
            <CircleAlert aria-hidden="true" size={18} />
          </div>
          <div className="redaction-list" data-unavailable-memory-list>
            {memoryScopes
              .filter((scope) => scope.sensitivity === "restricted")
              .map((scope) => (
                <button
                  type="button"
                  key={scope.key}
                  className={blockedScopes.includes(scope.key) ? "redaction-chip is-blocked" : "redaction-chip"}
                  data-redaction-toggle-pricing={scope.key === "pricing_notes" || undefined}
                  data-mutation-redaction-toggle={scope.key}
                  aria-pressed={blockedScopes.includes(scope.key)}
                  onClick={() => toggleScope(scope.key)}
                >
                  {blockedScopes.includes(scope.key) ? "Blocked" : "Allowed"}: {scope.label}
                </button>
              ))}
          </div>
          {unavailable.map((item) => (
            <p key={item.key} className="blocked-note">
              {item.label} stays unavailable to the successor.
            </p>
          ))}
        </div>
      </section>

      <section className="receipt-grid" id="receipt" aria-label="Receipt and inspection">
        <div className="ledger-panel receipt" data-receipt-header>
          <div className="panel-head">
            <span>Memory Will Receipt</span>
            <FileClock aria-hidden="true" size={18} />
          </div>
          {receipt ? (
            <>
              <dl>
                <div>
                  <dt>Status</dt>
                  <dd data-receipt-status>{will?.status === "written" ? "Scoped restore ready" : "No success"}</dd>
                </div>
                <div>
                  <dt>Walrus blob</dt>
                  <dd data-receipt-pointer data-memory-will-pointer>{pointerShort || "No pointer"}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{receipt.policy.role}</dd>
                </div>
              </dl>
              <button type="button" className="copy-button" data-share-receipt onClick={() => navigator.clipboard?.writeText(window.location.href)}>
                <Copy aria-hidden="true" size={16} />
                Copy Receipt Link
              </button>
            </>
          ) : (
            <p>No receipt yet. Kill the agent and write a Memory Will first.</p>
          )}
        </div>

        <div className="ledger-panel">
          <div className="panel-head">
            <span>Replay trace</span>
            <RotateCcw aria-hidden="true" size={18} />
          </div>
          {replay ? (
            <ol className="timeline" data-successor-replay data-receipt-timeline>
              <li>Checkpoint locked: {will?.checkpointId}</li>
              <li data-redaction-verified>Redactions verified: {replay.unavailable.length}</li>
              <li data-output-diff>Output differs by role: {replay.role}</li>
            </ol>
          ) : (
            <p>The replay appears after the cold successor restores from Walrus.</p>
          )}
        </div>

        <div className="ledger-panel inspect" data-inspect-summary>
          <div className="panel-head">
            <span>Proof surface</span>
            <ShieldCheck aria-hidden="true" size={18} />
          </div>
          {proof ? (
            <dl>
              <div>
                <dt>Read status</dt>
                <dd data-proof-status>{proof.readStatus}</dd>
              </div>
              <div>
                <dt>Sui object</dt>
                <dd data-walrus-pointer>{proof.pointer?.objectId.slice(0, 18) ?? "No object"}</dd>
              </div>
              <div>
                <dt>Move registry</dt>
                <dd>{proof.contractAnchor.status === "ready" ? proof.contractAnchor.packageId.slice(0, 18) : "Built, not published"}</dd>
              </div>
              <div>
                <dt>Checked</dt>
                <dd>{new Date(proof.checkedAt).toLocaleTimeString()}</dd>
              </div>
            </dl>
          ) : (
            <p>Open proof after a pointer is written. Missing pointer means no success.</p>
          )}
        </div>
      </section>

      {error ? (
        <div className="recovery-banner" data-recovery-banner data-no-success-badge>
          <strong>No-success:</strong> <span data-dependency-name>{error}</span>
          <button type="button" data-retry-action onClick={initializeWorkspace}>
            Start New Run
          </button>
        </div>
      ) : null}
    </main>
  );
}
