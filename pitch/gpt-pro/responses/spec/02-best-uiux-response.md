UIUX Preconditions

Status: pass — write UIUX interaction plan.

Required inputs are present:

Selected idea / concept lock is present: Memory Will, with the locked rumor “Kill one agent; another inherits verified memory,” and the binding first action: judge kills a predecessor agent, chooses a successor role, and watches a cold successor restore only from scoped durable memory. 

concept_lock

Saved PRD GPT Pro response is present at pitch/gpt-pro/responses/spec/01-best-prd-response.md; it explicitly permits the UIUX cycle to proceed and keeps implementation blocked until a separate UIUX response is saved and distilled. 

01-best-prd-response

P0 guarantees are present and binding: durable Memory Will creation after predecessor death; cold successor restore from scoped memory only; inspectable receipt plus honest degraded states. 

01-best-prd-response

Team and implementation constraints are binding: public fresh visitor path, real AI provider path, real Walrus/MemWal write/read/restore path, no deterministic fallback success, no local-only success path, and no static agent theater. 

01-best-prd-response

Visual/design constraints are binding: state change first, proof second; first screen is not a landing page, dashboard, proof packet, or generic logs page; failure states are product states. 

01-best-prd-response

This output is UIUX interaction design only. It does not generate code, patch files, scaffolds, PRD sections, stack lock, or implementation authorization.

Detailed UIUX Interaction Plan
1. Interaction thesis

Memory Will’s UI is a succession control surface. The first screen places the judge inside an in-progress AI workbench, not on a marketing page. The visual question is immediate:

“Kill this agent. See what survives.”

The product should feel tense, physical, and operational: a live predecessor agent is mid-comparison, a durable checkpoint is armed, and one dominant CTA invites the judge to trigger the irreversible handoff. The proof system is always visible as a small inspectable rail or drawer, but it never owns the first frame. The opening minute must show the product consequence before the technical proof: agent dies, local context clears, scoped Memory Will writes, cold successor restores, receipt appears.

2. Screen map
Route / surface	Screen	Primary user action	System response	State changed	Proof shown
/	Public first-run workbench alias	Open public demo	Redirects or aliases directly into the guided vendor-comparison workbench; no marketing landing page	Guest Workspace, seeded Task, current AgentRun, latest TaskCheckpoint loaded	“Checkpoint ready” chip, source count, last checkpoint timestamp
/workspace/:workspaceId/task/:taskId	Predecessor Workbench	Press / hold Kill Agent	Predecessor flatlines; local context meter drops to zero; kill event locks latest valid checkpoint	AgentRun.status = killed; AgentRun.localContextStatus = unavailable; TaskCheckpoint.status = locked_for_will	Flatline animation, “Local context unavailable,” checkpoint id / timestamp
Workbench overlay	Kill confirmation / arming state	Confirm kill through hold-to-confirm or second keyboard confirm	Prevents accidental kill while preserving fast public path	KillIntent recorded; no durable will yet	“This will clear predecessor local context; successor must use Walrus/MemWal memory”
Workbench side sheet	Successor Scope / Memory Will Writer	Choose successor role: Finance, Legal, Designer, Operator; optionally block one memory category	Shows what survives, what is redacted, and what will be written; starts durable write after approval	DelegationPolicy, RedactionLog, MemoryWill draft promoted to write request	Write stepper: checkpoint locked → redactions verified → Walrus/MemWal write
Same sheet	Durable write result	Click Write Memory Will or approve write	Writes Memory Will, delegation policy, redaction log, and evidence/source bundle to Walrus/MemWal	MemoryWill.status = written; walrusPointer/objectId attached; EvidenceBundle persisted/anchored	Pointer pill, object id, write timestamp, inspect affordance
/successor/:willId	Cold Successor Restore	Click Open Successor	Successor starts blank, reads Memory Will, restores only allowed scopes, verifies redactions, continues comparison	SuccessorSession, RestoredCheckpoint, SuccessorReplayTrace, FinalComparisonArtifact	“Started blank,” inherited memory list, unavailable memory list, redaction verification badge
/successor/:willId mutation panel	Role / redaction mutation	Switch successor role or block another memory category	Successor re-plans; output changes or narrows; blocked memory is named as unavailable	Updated DelegationPolicy, RedactionLog, revised SuccessorReplayTrace, revised output	Before/after diff, role policy delta, blocked-scope warning
/will/:willId	Memory Will Receipt	Open receipt / share receipt	Renders before-death checkpoint, scoped will, redactions, successor output, timeline, proof links	MemoryWillReceipt, ReceiptView, optional exported receipt JSON	Public receipt URL, pointer, replay timeline, model/provider metadata
/inspect/:willId	Technical Inspect Surface	Expand proof / raw object	Reads Walrus/MemWal object status and app metadata; displays raw proof only behind disclosure	ProofLink, OpsEventLog.inspect_viewed, read status	Object id, read status, pointer, compact JSON, timestamps
/settings/workspace	Settings / Limits / Retention	Adjust retention, export, receipt visibility, support	Applies workspace-level limits and lifecycle choices outside first minute	Workspace.retention, visibility, limits, supportTicket	Current quota, retention / expiry status, export/deletion confirmation
Global recovery layer	Degraded / failed dependency state	Retry, inspect existing state, or start new run	Shows honest failure; blocks inheritance success until durable path works	FailureState, OpsEventLog, possibly stale TaskCheckpoint	Error class, affected dependency, no-success badge, retry / inspect options

The P0 screen set is: public workbench, kill/scope writer, cold successor restore, mutation/diff, receipt, inspect, and recovery surfaces. Settings is not P0 for first-minute judging, but it is required for the six-month product contract.

3. First-run flow
0–10 seconds: “I know what to do”

The visitor lands directly in the workbench. The largest text is concrete: “Vendor comparison agent is alive. Kill it to prove the work survives.” The predecessor agent is visibly mid-task: three vendor cards, source chips, current findings, open questions, and next planned step. The only dominant CTA is Kill Agent.

The proof surface is present but quiet: a small “Checkpoint ready” chip with an inspect chevron. No proof table, dashboard nav, wallet prompt, admin setup, or landing hero appears in the attention zone.

10–30 seconds: death → scope

The judge presses or holds Kill Agent. The predecessor card flatlines, the local context meter drops to zero, and the UI explicitly says: “Predecessor local context is unavailable.”

Immediately, a successor scope sheet slides in. The judge chooses one successor role: Finance, Legal, Designer, or Operator. The default redaction category is visible but not forced; for demo drama, “Block pricing notes” should be one obvious toggle. The sheet shows two columns: Survives and Blocked.

The write begins only after user approval. The UI names the durable act: “Write Memory Will to Walrus/MemWal.”

30–60 seconds: write → restore → receipt CTA

The write stepper completes: checkpoint locked, redactions verified, Memory Will written. A pointer/object id appears in a compact pill with Copy, Inspect, and Open Successor.

The judge clicks Open Successor. The successor screen opens with a blank state first: “No predecessor local context loaded.” Then it fetches the Memory Will, lists allowed memory scopes, lists unavailable categories, verifies redactions, and produces a role-specific continuation.

The first-minute end state must show three things at once: successor output, inherited/unavailable memory, and a CTA to Open Memory Will Receipt.

2–3 minutes: mutation and proof

The judge switches successor role or blocks a memory category. The successor replans. Finance emphasizes budget / cost risk when pricing is allowed; if pricing is blocked, finance says it cannot make pricing claims and narrows the recommendation. Legal emphasizes contractual risk and uncertainties. Designer emphasizes UX / implementation fit. Operator emphasizes rollout and execution risk.

The UI shows a diff: Role changed, scope changed, output changed. The receipt updates or creates a revised trace. The judge opens the receipt and sees before-death checkpoint, Memory Will metadata, delegated scopes, redactions, successor replay trace, restored output, final comparison artifact, and inspect pointer.

5 minutes / Q&A: inspect, recover, reopen

Open /inspect/:willId from the receipt. Expand the Walrus/MemWal pointer, read status, object metadata, and compact Memory Will JSON. Open the receipt in an incognito / fresh browser path or scan the QR code from a phone. Demonstrate one honest failure state: missing pointer, forced write failure, stale checkpoint, or provider failure. The UI must never show restored success when the durable write/read/restore path is unavailable.

4. P0 screen specifications
P0 Screen A — Public Predecessor Workbench

Route: / aliasing to /workspace/:workspaceId/task/:taskId

Purpose: Make the judge understand the task, the agent, and the first action within five seconds.

State	Interaction design
Default	Live predecessor panel at center-left. Current task: “Compare three vendors for a product team.” Visible sections: goal, sources, current findings, open questions, next planned step. Right rail shows compact checkpoint status. Dominant CTA: Kill Agent.
Loading	Skeleton loads workbench and latest checkpoint. Kill Agent is disabled with copy: “Loading latest checkpoint — cannot kill safely yet.” No permanent spinner.
Empty	If no task exists, show a labeled public demo seed: “Demo task: vendor comparison.” Primary action becomes Load Demo Task; after load, return to default. Do not show a blank dashboard.
Error	If task/checkpoint cannot load, show “No valid checkpoint — cannot create Memory Will.” Actions: Retry checkpoint, Inspect health, Load public demo task.
Success	After kill confirmation, predecessor card flatlines, local context meter reaches zero, and successor scope sheet opens.
Keyboard behavior	Initial focus lands on Kill Agent after workbench loads. Tab moves through source chips, checkpoint inspect, then kill. Enter on Kill Agent enters armed state; second Enter confirms. Esc cancels armed state.
Touch behavior	CTA is sticky above fold with at least 48px tap target. Touch uses press-and-hold or tap → inline confirm, not a tiny modal. Source chips open bottom-sheet previews.
Accessibility note	Flatline and local-context-cleared events are announced in an aria-live="polite" region. Context status is text plus icon, not color alone. Focus moves to successor scope sheet after kill.
State transition	AgentRun.alive → killed; localContextStatus.available → unavailable; TaskCheckpoint.ready → locked_for_will.
Result / artifact	Locked task checkpoint and kill event.
Test selectors	data-hero-text, data-cta-primary="kill-agent", data-agent-status, data-local-context-meter, data-checkpoint-ready, data-source-chip, data-next-step-preview, data-kill-armed, data-workbench-error.
P0 Screen B — Kill Confirmation and Successor Scope Writer

Surface: Workbench overlay / side sheet

Purpose: Let the user approve inheritance scope quickly while proving what will and will not survive.

State	Interaction design
Default	Sheet title: “Choose who inherits.” Four role cards: Finance, Legal, Designer, Operator. Memory categories are grouped into Facts, Sources, Open questions, Next step, Pricing notes, Contract/legal notes, Subjective preference notes. Two columns show Will survive and Blocked before write.
Loading	Write stepper with named stages: Lock checkpoint, Verify redactions, Write Memory Will, Attach pointer. Each stage has status text. CTA disabled with “Writing durable Memory Will…”
Empty	If no locked checkpoint exists, sheet blocks write and sends focus to Retry checkpoint. Copy: “No valid checkpoint. Killing without a checkpoint cannot be inherited.”
Error	Walrus/MemWal write failure: “Agent is killed, but work cannot be safely inherited.” Show failed dependency, retry write, inspect health, and start-over options. Do not show Open Successor.
Success	Pointer/object id appears. CTA changes to Open Successor. Secondary actions: Copy pointer, Inspect, Open Receipt later.
Keyboard behavior	Arrow keys move between role cards; F, L, D, O select roles when focus is in the sheet. Space toggles redaction checkboxes. Enter on Write Memory Will starts write.
Touch behavior	Role cards are large, single-tap selectable. Redaction categories are full-width toggles. Pointer pill has separate large Copy and Inspect targets.
Accessibility note	Role selection uses radio semantics. Redaction list uses checkbox semantics. Write status stepper announces stage completion. Error state moves focus to the error headline.
State transition	MemoryWillDraft → MemoryWill.write_pending → MemoryWill.written; DelegationPolicy.created; RedactionLog.verified; EvidenceBundle.persisted/anchored.
Result / artifact	Durable Memory Will object with Walrus/MemWal pointer/object id.
Test selectors	data-scope-sheet, data-role-card-finance, data-role-card-legal, data-role-card-designer, data-role-card-operator, data-redaction-toggle-pricing, data-redaction-toggle-legal, data-will-write-stepper, data-memory-will-pointer, data-write-error, data-cta-open-successor.
P0 Screen C — Cold Successor Restore

Route: /successor/:willId

Purpose: Prove the successor starts cold and continues only from scoped durable memory.

State	Interaction design
Default	Header: “Cold successor.” Before restore, show an empty memory chamber: “No predecessor local context loaded.” CTA: Restore from Memory Will. If navigated from write success, restoration can auto-start after a short blank-state beat.
Loading	Stepper: Read Memory Will, Load allowed scopes, Verify redactions, Plan successor response, Continue comparison. The output area remains empty until verification passes.
Empty	Missing or invalid pointer: “No Memory Will found. Successor must stay blank.” Actions: Return to workbench, Paste/open valid pointer, Inspect failure.
Error	Restore read failure, AI provider failure, or verifier failure blocks continuation. Show exact dependency and whether existing durable state remains inspectable.
Success	Successor output appears with three fixed blocks: Inherited, Unavailable, Continuation. Output must explicitly mention role and missing scopes.
Keyboard behavior	Focus starts on restore CTA or blank-state status. R retries restore after failure. Tab order: inherited list → unavailable list → output → mutate role → open receipt.
Touch behavior	Inherited/unavailable categories collapse into accessible accordions. Open Receipt remains sticky after output.
Accessibility note	“Started blank” and “Restore complete” are announced. Inherited and unavailable memory use headings so screen-reader users can verify boundaries.
State transition	SuccessorSession.created; RestoredCheckpoint.created; SuccessorReplayTrace.restore_event; FinalComparisonArtifact.created.
Result / artifact	Role-specific continuation and successor replay trace.
Test selectors	data-successor-blank-state, data-restore-stepper, data-inherited-memory-list, data-unavailable-memory-list, data-redaction-verified, data-successor-output, data-restore-error, data-cta-open-receipt.
P0 Screen D — Role / Redaction Mutation and Diff

Surface: Mutation panel within /successor/:willId

Purpose: Let the judge change input and see the delegated state and output change.

State	Interaction design
Default	Compact panel: “Try a different inheritance.” Shows current role and current blocked categories. One-click role swap and redaction toggles.
Loading	Shows “Rebuilding successor from revised scope,” with restore / verification steps. Previous output remains visible but marked Superseded.
Empty	If no alternate roles are available because of bad config, show “No successor roles configured” and block mutation from pretending success.
Error	If new scope removes required memory, successor must ask for missing scope or produce a narrower output. If verifier catches blocked facts, show “Output failed redaction verification.”
Success	Before/after diff shows role policy change, memory scope change, and output change. New receipt trace is appended or a new receipt revision is created.
Keyboard behavior	Role cards support arrow navigation. M jumps to mutation panel. Esc returns to output.
Touch behavior	Role swap cards and redaction toggles are thumb-sized. Diff defaults to summary on mobile with expandable details.
Accessibility note	Diff is not color-only; each changed line is labeled Added, Removed, or Unavailable.
State transition	DelegationPolicy.revised; RedactionLog.revised; SuccessorReplayTrace.replanned; FinalComparisonArtifact.revised.
Result / artifact	Revised successor output and role/scope diff.
Test selectors	data-mutation-panel, data-current-role, data-role-swap-legal, data-role-swap-finance, data-mutation-redaction-toggle, data-replan-stepper, data-output-diff, data-verifier-failed, data-receipt-revision-link.
P0 Screen E — Memory Will Receipt

Route: /will/:willId

Purpose: Give the user and judge a shareable replay artifact, not a dashboard.

State	Interaction design
Default	Receipt header: “Memory Will Receipt.” Shows killed predecessor, successor role, pointer pill, receipt status, and share controls. Body is a timeline: before death → will written → restore → redaction verification → successor continuation.
Loading	Reads receipt metadata, will object, replay trace, and final artifact. Skeleton preserves receipt layout and says which dependency is loading.
Empty	Unknown id: “No receipt for this Memory Will.” Actions: Open workbench, Inspect pointer, Try another receipt.
Error	Partial receipt: show what is available and what failed. If proof read fails, receipt remains viewable but marked “Proof currently unavailable.” If will write was never valid, receipt cannot claim success.
Success	Shareable receipt with before/after, delegated scopes, redactions, replay timeline, final comparison artifact, model/provider metadata, pointer, and inspect link.
Keyboard behavior	S focuses share/copy link. I opens inspect. Timeline is navigable by headings.
Touch behavior	Receipt has a mobile-first summary card, then expandable proof sections. QR button is sticky near share actions.
Accessibility note	Receipt timeline uses ordered list semantics. Pointer is readable as text and copyable with confirmation.
State transition	MemoryWillReceipt.rendered; ReceiptView.created; OpsEventLog.receipt_viewed.
Result / artifact	Public or private receipt URL and exportable receipt JSON.
Test selectors	data-receipt-header, data-receipt-status, data-receipt-pointer, data-receipt-timeline, data-before-death-checkpoint, data-delegated-scopes, data-redaction-log, data-successor-replay, data-final-artifact, data-share-receipt, data-cta-inspect.
P0 Screen F — Inspect Surface

Route: /inspect/:willId

Purpose: Let technical judges verify the durable object without making proof the first screen.

State	Interaction design
Default	Compact proof summary: pointer/object id, write timestamp, read status, object lifetime/expiry if applicable, linked receipt, linked successor trace. Raw JSON is collapsed by default.
Loading	Shows Reading Walrus/MemWal object, Checking app receipt, Comparing trace.
Empty	No pointer found: “Cannot inspect because no durable Memory Will pointer exists.”
Error	Pointer unreachable, expired, malformed, or proof unavailable. Show no-success badge if inspect failure invalidates inheritance.
Success	Object status, pointer, compact JSON, app metadata, read/write trace, and copy controls.
Keyboard behavior	J expands JSON, C copies pointer, B returns to receipt.
Touch behavior	Raw JSON opens in a full-screen drawer with copy buttons pinned.
Accessibility note	Raw JSON is wrapped in readable sections with labels; long ids have copy controls and visible text.
State transition	ProofLink.read_attempted; OpsEventLog.inspect_viewed; optional ProofLink.status = verified/unavailable.
Result / artifact	Inspectable proof surface linked from receipt.
Test selectors	data-inspect-summary, data-proof-status, data-walrus-pointer, data-object-lifetime, data-raw-json-toggle, data-raw-memory-will-json, data-read-trace, data-copy-pointer, data-inspect-error.
P0 Screen G — Global Recovery / Degraded States

Surface: Inline banners, blocking panels, and receipt status strips across P0 routes

Purpose: Make failure honest and usable.

Failure	UI behavior	Blocked success condition	Recovery action
Checkpoint missing	Kill Agent disabled; workbench says no valid checkpoint	Cannot create Memory Will	Retry checkpoint or load demo task
Walrus/MemWal write fails	Predecessor may be killed, but Open Successor is hidden	Cannot claim inheritance	Retry write, inspect health, start new run
Pointer missing	Successor blank state remains	Cannot restore successor	Return to receipt/workbench or provide valid pointer
Restore read fails	Successor output area blocked	Cannot continue	Retry restore, inspect pointer
Redaction verifier fails	Output marked invalid and hidden behind failure summary	Cannot save final artifact as valid	Regenerate narrower output or revise scope
Stale checkpoint	Warning shows checkpoint age and source	Can restore only after explicit user confirmation	Restore older state or cancel
AI provider fails	Existing durable state remains inspectable; no fake continuation	Cannot produce successor output	Retry provider or open receipt/proof-only view
Receipt proof read fails	Receipt viewable only as partial / degraded	Cannot display “verified” state	Retry inspect or share partial with warning

Global recovery selectors: data-recovery-banner, data-dependency-name, data-no-success-badge, data-retry-action, data-inspect-health, data-stale-checkpoint-warning, data-provider-error, data-verification-blocked.

5. Six-Month Product Interaction Contract
Contract item	UIUX commitment
Month-1 return user	A research/product lead or small team returns to a workspace history view after first-run success. The first return-user frame is not the public kill scene; it shows recent Memory Wills, active tasks, and receipts, with Resume, Create new Memory Will, and Inspect receipt.
Month-6 return user	A team running recurring AI workflows returns to a cross-tool succession workspace where Memory Wills preserve scoped checkpoints across projects, roles, and agents. External integration status is visible after the core receipt path, not in the first minute.
Recurring trigger	“This agent/session/person cannot continue.” UI language should reuse this trigger on task pages: Create Memory Will, Kill Agent, Hand off to successor, Restore from Memory Will.
Owned object / workspace	The owned product object is a Workspace containing TaskCheckpoint, MemoryWill, DelegationPolicy, RedactionLog, SuccessorReplayTrace, and Receipt. The UI must make these feel like a saved case file, not a logs database.
Primary success path	Public or return user completes: workbench → kill → role/scope → Walrus/MemWal write → cold successor restore → receipt → inspect.
Roles / permissions	UI supports Owner, Editor, Viewer/Auditor, Predecessor Agent, Successor Role, and Public Receipt Viewer. In public demo, ownership can be guest-session based; team permissions can be deferred, but receipt visibility must still be explicit.
Persistence / history	Return workspace shows Memory Will timeline, receipt list, object id, created time, successor role, redaction summary, and expiry/renewal status if object lifetime is bounded. No “forever” copy unless implemented.
Failure / recovery	Every route has no-success state. A failed durable write/read/restore blocks inheritance success. Stale checkpoint and provider failures preserve existing state but do not fabricate continuation.
Reliability / support behavior	Footer or receipt action includes Report broken receipt. Health status is small and backstage. Receipt errors display dependency, timestamp, and retry path.
Privacy guardrails visible in UI	Public demo warns: “Use synthetic or non-secret data.” Before durable write, the scope sheet says redactions happen before storage/display unless private encrypted mode exists. Public receipts are labeled public unless marked otherwise.
Abuse / cost guardrails visible in UI	UI shows write/restore limits, step caps, and retry cooldowns as small limit badges. Provider failure copy prevents retry storms: “Retry available in X seconds” or “Open existing receipt instead.”
Mobile public first-run	Mobile opens the same workbench in one column. Kill Agent is sticky; source cards collapse; scope sheet becomes full-screen; receipt summary and QR sharing are prioritized.
Desktop return-user path	Desktop can use a left history rail after first success: active tasks, previous wills, receipts, filters by role/status. This is not shown on first public route before the judge action.
Settings / account / limits surface	Needed, but not first-minute P0. /settings/workspace holds retention, export, deletion, receipt visibility, support, usage limits, and optional account claim. Public demo can run as guest, but durable receipt visibility and limits must still be displayed.
6. Demo choreography
Beat	Judge input	Live consequence	Result / shareable artifact
1	Opens public URL	Workbench is already alive; predecessor is mid vendor comparison	Checkpoint-ready proof chip
2	Presses Kill Agent	Agent flatlines; local context meter drops to zero	Locked checkpoint and will draft
3	Chooses Finance successor and optionally blocks Pricing notes	Scope sheet shows survives vs blocked; durable write starts	Memory Will pointer/object id
4	Clicks Open Successor	Cold successor starts blank, restores allowed scopes, verifies redactions	Role-specific continuation
5	Switches role to Legal or blocks a category	Successor replans and output changes/narrows	Diff and revised replay trace
6	Opens Memory Will Receipt	Before/after and replay timeline render	Shareable receipt URL
7	Opens Inspect	Proof drawer / inspect route shows pointer and object status	Sponsor-readable proof path
8	Demonstrates failure	Invalid pointer, forced write failure, stale checkpoint, or provider failure	Honest degraded state; no fake success

Big-screen staging: Use a two-zone composition. Left 60% is the live agent / successor output. Right 40% is the memory boundary: checkpoint, survives/blocked scopes, pointer, and receipt CTA. During the first 60 seconds, keep the inspect drawer collapsed. Use large labels: Alive, Killed, Local context: 0, Will written, Successor restored.

Mobile QR behavior: After the receipt renders, show Open this receipt on your phone as a QR overlay. The QR opens /will/:willId, not the builder’s local session. Mobile receipt starts with summary, pointer, inherited/unavailable memory, and Inspect button. QR view must not expose secrets or private raw prompts.

Recovery staging: Use one controlled recovery demo in Q&A, not in the first hero pass. Best options: open /successor/missing-pointer-demo, force a Walrus/MemWal write failure through a QA-only dependency flag, or show stale checkpoint warning from a known test fixture. The recovery message must say “cannot safely inherit” rather than “try again later” alone.

7. Implementation-facing UI notes
Components

WorkbenchShell

PredecessorAgentPanel

AgentVitalStrip

LocalContextMeter

CheckpointStatusChip

SourceBundleRail

KillAgentButton

KillArmingState

SuccessorScopeSheet

RoleCardGrid

RedactionToggleList

SurvivesBlockedColumns

WillWriteStepper

PointerPill

ColdSuccessorPanel

RestoreStepper

InheritedMemoryList

UnavailableMemoryList

RedactionVerifierBadge

SuccessorContinuationOutput

MutationPanel

RoleScopeDiff

ReceiptTimeline

ReceiptShareBar

ProofDrawer

InspectObjectPanel

RecoveryBanner

NoSuccessBadge

LimitBadge

ReceiptQRCodeOverlay

WorkspaceSettingsPanel

Data / API dependencies

GET /api/workspaces/:workspaceId

GET /api/tasks/:taskId

POST /api/checkpoints via remember_checkpoint

POST /api/memory-wills via write_memory_will

POST /api/memory-wills/:willId/delegation via delegate_memory_scope

GET /api/memory-wills/:willId

POST /api/successor/restore via restore_successor_context

POST /api/redactions/verify via verify_redactions

POST /api/successor/continue via comparison compiler / role continuation

GET /api/receipts/:willId

POST /api/receipts via render_will_receipt

GET /api/inspect/:willId

GET /api/health

GET /api/limits

POST /api/support/broken-receipt

Storage / state dependencies

Workspace

AgentRun

TaskCheckpoint

EvidenceBundle

DelegationPolicy

RedactionLog

MemoryWill

SuccessorSession

RestoredCheckpoint

SuccessorReplayTrace

FinalComparisonArtifact

MemoryWillReceipt

ProofLink

ReceiptView

FailureState

OpsEventLog

The local app database may cache metadata and render history, but the UI must treat the Walrus/MemWal pointer/read as the authoritative success path for Memory Will inheritance.

External integrations

Real AI/model provider for predecessor checkpoint summary, successor planning, continuation output, and role-specific mutation.

Real Walrus/MemWal write/read/restore/delegate path for Memory Will object or memory payload.

Source/artifact opener for the beachhead evidence bundle.

QR generation for receipt sharing.

Health/ops event logging for non-secret dependency status.

Optional Sui/Walrus inspect link if available; do not require wallet in public first-run unless the actual implementation needs a user signature.

Playwright coverage
Test file / scenario	Required assertion
public-first-run.spec	Fresh visitor loads workbench, sees data-cta-primary="kill-agent", completes kill → write → restore → receipt.
kill-write.spec	Kill action sets local context to unavailable and produces a real Memory Will pointer; local-only fallback cannot pass.
walrus-write-failure.spec	Forced write failure shows data-no-success-badge and hides Open Successor.
cold-successor.spec	Successor begins with data-successor-blank-state, then restores only after pointer read.
role-mutation.spec	Finance, Legal, Designer, and Operator outputs visibly differ.
redaction-block.spec	Blocking pricing notes removes pricing memory or produces failed verification; successor names missing memory.
missing-pointer.spec	Invalid /successor/:willId keeps successor blank and blocks continuation.
receipt-reopen.spec	/will/:willId opens in fresh browser/incognito and shows receipt timeline and pointer.
inspect-proof.spec	Inspect route shows pointer, read status, and raw object disclosure.
stale-checkpoint.spec	Stale checkpoint warning appears and requires explicit restore choice.
provider-failure.spec	AI provider failure preserves existing durable proof but does not fabricate successor output.
keyboard.spec	Critical path works with keyboard: kill arming, role selection, redaction toggle, restore, receipt, inspect.
mobile-public.spec	Mobile viewport shows sticky kill CTA, usable scope sheet, successor output, and receipt QR/share.
accessibility.spec	Live region announces kill/restore; role cards and redactions expose correct radio/checkbox semantics; no color-only status.
Traceability
P0 interaction map
P0 interaction	PRD requirement served	State evidence	Proof evidence	Recovery evidence	Test evidence hook	Gap flag
Workbench shows predecessor mid-task and checkpoint ready	P0-1 durable Memory Will creation after predecessor death	TaskCheckpoint.ready, AgentRun.active	Checkpoint chip, source count, timestamp	Checkpoint load failure blocks kill	public-first-run.spec, kill-write.spec	No UIUX gap
Judge kills predecessor	P0-1	AgentRun.status = killed, localContextStatus = unavailable, locked checkpoint	Flatline, local context meter zero, checkpoint id	If checkpoint missing, kill disabled or blocks inheritance	kill-write.spec, keyboard.spec, mobile-public.spec	No UIUX gap
Judge chooses successor role and redaction scope	P0-1 and P0-2	DelegationPolicy, RedactionLog, MemoryWillDraft	Survives/blocked columns	Empty checkpoint blocks write; invalid scope shows no-success	redaction-block.spec, role-mutation.spec	No UIUX gap
System writes Memory Will to Walrus/MemWal	P0-1	MemoryWill.written, walrusPointer/objectId, EvidenceBundle	Pointer pill, write stepper, inspect affordance	Write failure hides successor and says cannot safely inherit	walrus-write-failure.spec, kill-write.spec	No UIUX gap
Cold successor starts blank and restores	P0-2 cold successor restore from scoped memory only	SuccessorSession, RestoredCheckpoint, SuccessorReplayTrace	Blank-state beat, inherited/unavailable memory list, verifier badge	Missing pointer/read failure blocks continuation	cold-successor.spec, missing-pointer.spec	No UIUX gap
Successor continues with role-specific output	P0-2	FinalComparisonArtifact, replay trace model/tool steps	Output cites inherited categories and unavailable memory	Provider failure shows degraded mode; no fake continuation	provider-failure.spec, role-mutation.spec	No UIUX gap
Judge switches role or blocks memory category	P0-2	Revised DelegationPolicy, revised RedactionLog, revised trace	Before/after diff, scope delta, output delta	Verifier failure blocks invalid output	role-mutation.spec, redaction-block.spec	No UIUX gap
Receipt opens and can be shared	P0-3 inspectable receipt and recovery	MemoryWillReceipt, ReceiptView, FinalComparisonArtifact	Before/after, scopes, redactions, replay, pointer, model metadata	Partial receipt marks unavailable proof; invalid will cannot show success	receipt-reopen.spec	No UIUX gap
Inspect route opens durable proof	P0-3	ProofLink, OpsEventLog.inspect_viewed	Pointer/object id, read status, compact JSON, timestamps	Expired/unreachable pointer shows inspect failure	inspect-proof.spec	No UIUX gap
Global degraded states block false success	P0-3	FailureState, dependency-specific ops event	No-success badge, dependency name, retry/inspect action	Write/read/restore/provider/stale failures have explicit recovery	walrus-write-failure.spec, stale-checkpoint.spec, provider-failure.spec	No UIUX gap
Coding gate

No P0 interaction in this UIUX plan lacks a planned state, proof, recovery, or test selector / Playwright evidence hook.

Implementation remains blocked until this UIUX response is saved and the local agent distills the PRD/UIUX outputs into pitch/project_prd.md, pitch/uiux_interaction_plan.md, and/or BUILD.md as required by the selected full path.