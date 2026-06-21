# UIUX Interaction Plan: Memory Will

Distilled from `pitch/gpt-pro/responses/spec/02-best-uiux-response.md`. This is a local G2 artifact, not implementation code.

## Interaction Thesis

Memory Will is a succession control surface. The opening question is concrete: "Kill this agent. See what survives." The first frame must put the judge inside an in-progress AI workbench, not a marketing page, dashboard, proof packet, or logs page.

## Screen Map

| Route / Surface | Screen | Primary Action | System Response | State Changed | Proof Shown |
| --- | --- | --- | --- | --- | --- |
| `/` | Public workbench alias | Open demo | Loads guided vendor-comparison workbench. | Guest workspace, seeded task, current AgentRun, latest checkpoint. | Checkpoint ready chip, source count, timestamp. |
| `/workspace/:workspaceId/task/:taskId` | Predecessor workbench | Press/hold `Kill Agent` | Agent flatlines, local context meter drops to zero. | AgentRun killed; checkpoint locked for will. | Flatline, local context unavailable, checkpoint id. |
| Workbench overlay | Kill confirmation | Confirm kill | Prevents accidental kill without slowing public path. | KillIntent recorded. | Clear consequence copy. |
| Workbench sheet | Scope writer | Choose successor role and redactions | Shows survives/blocked memory and starts durable write after approval. | DelegationPolicy, RedactionLog, MemoryWill draft. | Write stepper. |
| Same sheet | Durable write result | Approve write | Writes Memory Will to Walrus/MemWal. | MemoryWill written with pointer/object id. | Pointer pill, timestamp, inspect affordance. |
| `/successor/:willId` | Cold successor restore | Open successor | Starts blank, restores allowed scopes, verifies redactions, continues. | SuccessorSession, RestoredCheckpoint, replay trace, final artifact. | Blank-state beat, inherited/unavailable lists, verification badge. |
| Successor mutation panel | Role/redaction mutation | Switch role or block memory | Replans and updates output. | Revised policy, redaction log, replay trace. | Before/after diff, blocked-scope warning. |
| `/will/:willId` | Memory Will Receipt | Open/share receipt | Renders before/after, scopes, redactions, successor output, timeline. | Receipt view saved. | Public URL, pointer, replay timeline. |
| `/inspect/:willId` | Inspect surface | Expand proof | Reads Walrus/MemWal object status and compact JSON. | Inspect event logged. | Object id, read status, JSON, timestamps. |
| Global | Recovery layer | Retry/inspect/start new run | Shows honest failure and blocks fake inheritance. | FailureState and ops event. | Dependency name, no-success badge. |

## First-Run Flow

- 0-10s: visitor lands in workbench with live predecessor panel, three vendor cards, source chips, current findings, open questions, next planned step, quiet checkpoint-ready proof chip, and one dominant `Kill Agent` CTA.
- 10-30s: judge kills agent; flatline and local-context-zero state appear; successor scope sheet opens; judge chooses finance, legal, designer, or operator and optionally blocks a memory category.
- 30-60s: Memory Will write stepper completes; pointer appears; judge opens successor; successor starts blank, fetches will, lists inherited/unavailable memories, and continues.
- 2-3min: judge changes role or redaction; output and receipt trace update.
- 5min/Q&A: open receipt, inspect pointer, reopen in fresh browser/mobile, and show one honest degraded state.

## P0 Screen Requirements

## Interaction Details

### A. Public Predecessor Workbench

- Default: live predecessor panel, task goal, sources, findings, open questions, next planned step, checkpoint rail, `Kill Agent`.
- Loading: kill disabled until checkpoint loads.
- Empty: load guided public demo task, no blank dashboard.
- Error: no valid checkpoint blocks Memory Will creation.
- Success: flatline and scope sheet.
- Test selectors: `data-hero-text`, `data-cta-primary="kill-agent"`, `data-agent-status`, `data-local-context-meter`, `data-checkpoint-ready`, `data-source-chip`, `data-next-step-preview`, `data-kill-armed`, `data-workbench-error`.

### B. Kill Confirmation And Scope Writer

- Default: successor role cards and survives/blocked columns.
- Loading: write stepper shows checkpoint locked, redactions verified, Walrus/MemWal write.
- Error: write failure hides successor CTA and shows no-success.
- Success: pointer pill and `Open Successor`.
- Test selectors: `data-scope-sheet`, `data-role-card-finance`, `data-role-card-legal`, `data-role-card-designer`, `data-role-card-operator`, `data-redaction-toggle-pricing`, `data-redaction-toggle-legal`, `data-will-write-stepper`, `data-memory-will-pointer`, `data-write-error`, `data-cta-open-successor`.

### C. Cold Successor Restore

- Default: blank successor state first, then restore stepper.
- Loading: read/verify states are visible.
- Error: missing pointer or read failure blocks continuation.
- Success: inherited memory list, unavailable memory list, redaction verified badge, role-specific output.
- Test selectors: `data-successor-blank-state`, `data-restore-stepper`, `data-inherited-memory-list`, `data-unavailable-memory-list`, `data-redaction-verified`, `data-successor-output`, `data-restore-error`, `data-cta-open-receipt`.

### D. Role / Redaction Mutation

- Default: current role, role swap controls, redaction toggles.
- Error: invalid scope or verifier failure blocks revised output.
- Success: diff shows role/scope/output changes.
- Test selectors: `data-mutation-panel`, `data-current-role`, `data-role-swap-legal`, `data-role-swap-finance`, `data-mutation-redaction-toggle`, `data-replan-stepper`, `data-output-diff`, `data-verifier-failed`, `data-receipt-revision-link`.

### E. Memory Will Receipt

- Default: receipt header, pointer, timeline, before-death checkpoint, delegated scopes, redaction log, successor replay, final artifact.
- Error: partial receipt marks unavailable proof.
- Success: shareable receipt URL and inspect CTA.
- Test selectors: `data-receipt-header`, `data-receipt-status`, `data-receipt-pointer`, `data-receipt-timeline`, `data-before-death-checkpoint`, `data-delegated-scopes`, `data-redaction-log`, `data-successor-replay`, `data-final-artifact`, `data-share-receipt`, `data-cta-inspect`.

### F. Inspect Surface

- Default: compact proof summary with expandable raw object.
- Error: expired/unreachable pointer shows inspect failure, not success.
- Success: pointer, read status, object metadata, compact Memory Will JSON.
- Test selectors: `data-inspect-summary`, `data-proof-status`, `data-walrus-pointer`, `data-object-lifetime`, `data-raw-json-toggle`, `data-raw-memory-will-json`, `data-read-trace`, `data-copy-pointer`, `data-inspect-error`.

### G. Recovery / Degraded States

- Default: inline banners or blocking panels across P0 routes.
- Error: write/read/restore/provider/stale failures block false success.
- Success: retry or inspect without pretending restore worked.
- Test selectors: `data-recovery-banner`, `data-no-success-badge`, `data-retry-action`, `data-dependency-name`, `data-stale-checkpoint-warning`.

## Demo Choreography

1. Start with the predecessor workbench already alive.
2. Kill the agent.
3. Choose a successor role and optional blocked memory.
4. Watch the write stepper produce a pointer.
5. Open cold successor and see blank state before restore.
6. Show role-specific continuation.
7. Change role or redaction and show output diff.
8. Open receipt and inspect surface.
9. Reopen receipt from fresh browser/mobile.
10. Show one honest degraded state if asked.

## Mobile Public First-Run

Mobile should preserve the same one-action loop: live task, `Kill Agent`, bottom-sheet scope writer, successor restore, receipt. Proof JSON should stay behind disclosure to avoid crowding.

## Six-Month Product Interaction Contract

- Month-1 return user: team lead reopens a Memory Will workspace after repeated research or client handoffs.
- Month-6 return user: team using Memory Will as a cross-tool succession layer for long agent work.
- Recurring trigger: agent task is interrupted, reassigned, role-shifted, or needs scoped delegation.
- Owned object/workspace: Memory Will workspace with checkpoints, wills, scopes, redactions, receipts, and replay history.
- Primary success path: kill predecessor, write durable will, restore cold successor, mutate scope, reopen receipt.
- Roles/permissions: owner, successor role, receipt viewer, inspector.
- Persistence/history: Memory Will and receipt history persist; role/redaction revisions create trace entries.
- Failure/recovery: write/read/restore/provider/stale failures block false success and provide retry/inspect.
- Reliability/support behavior: no-success states name the dependency and support/inspect path.
- Privacy/abuse/cost guardrails visible in UI: scoped inheritance, redaction log, retention/visibility controls, provider limits.
- Mobile public first-run: bottom-sheet kill/scope/restore path, receipt as final screen, proof behind disclosure.
- Desktop return-user path: workspace task list, receipts, inspect links, role mutation.
- Settings/account/limits: `/settings/workspace` handles retention, export, deletion, receipt visibility, support, and usage limits.

## Mobile QR behavior

The receipt route should expose a QR code after the desktop hero path so a judge can reopen `/will/:willId` on a phone. QR access is for receipt/inspect review only; the primary kill/restore path remains fully operable on desktop and mobile.

## Implementation Notes

- Components: workbench, agent status card, kill control, scope sheet, write stepper, successor restore panel, mutation diff, receipt, inspect drawer, recovery banner.
- Data/API dependencies: `/api/checkpoints`, `/api/memory-wills`, `/api/successor/restore`, `/api/redactions/verify`, `/api/receipts`, `/api/health`.
- Storage/state dependencies: Workspace, AgentRun, TaskCheckpoint, MemoryWill, DelegationPolicy, RedactionLog, SuccessorReplayTrace, MemoryWillReceipt, FailureState.
- External integrations: AI provider for live role-specific output and Walrus/MemWal for durable write/read/restore or honest degraded state.
- Playwright coverage: public first run, kill/write, cold successor, redaction block, role mutation, receipt reopen, inspect proof, write failure, missing pointer, provider failure, stale checkpoint, keyboard, mobile public.

## Playwright Coverage Hooks

- `public-first-run.spec`
- `kill-write.spec`
- `cold-successor.spec`
- `redaction-block.spec`
- `role-mutation.spec`
- `receipt-reopen.spec`
- `inspect-proof.spec`
- `walrus-write-failure.spec`
- `missing-pointer.spec`
- `provider-failure.spec`
- `stale-checkpoint.spec`
- `keyboard.spec`
- `mobile-public.spec`

## Traceability

No P0 interaction in the UIUX response lacks a planned state, proof, recovery, or test selector / Playwright evidence hook. Coding remains blocked until local G2 artifacts are complete and G3 visual contract begins.
