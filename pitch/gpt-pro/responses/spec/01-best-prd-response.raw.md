PRD Preconditions
Check	Status
Upstream GPT Pro mode	yes
Selected idea / concept lock present	present: Memory Will, source candidate S1 Agent Funeral / Memory Will, with the locked rumor “Kill one agent; another inherits verified memory.” 

concept_lock


Idea tournament scoreboard / local pick present	present: S1 was advanced as the best construct fit for kill → scoped Memory Will → successor restore, with Walrus criticality defined as successor continuation being impossible without scoped durable memory. 

idea_tournament


Deep research 10x10 response present	present: R0 requires Walrus/MemWal to be on the critical path via durable state write plus reopen, recall, restore, share, delegate, or inspect behavior. 

01-10x10-deep-research-response


Three judge responses present	present: J1 advanced S1 as strongest sponsor/Walrus fit; J2 kept S1 as a top product backup with the strongest retell line; J3 tied S1 for build/proof but warned that restore/delegation must be inspectable. 

01-sponsor-walrus-judge-response

 

02-product-demand-judge-response

 

03-build-redteam-judge-response


G2 scope	PRD only. This response does not generate UIUX, code, patches, scaffolds, stack lock, or implementation authorization.
Gate continuation	UIUX cycle may proceed after this PRD is saved, because the PRD includes selected-concept traceability, P0 requirements, production mode, and a six-month product contract. Implementation remains blocked until a separate UIUX GPT Pro response is saved and the local agent distills PRD/UIUX outputs into the required artifacts. The pipeline requires PRD before UIUX and no implementation before both responses. 

pipeline-plan

 

01d-gpt-pro-research

1. Project background

Memory Will is a production product for teams running AI work that must survive agent death, app resets, teammate handoffs, and tool boundaries. The locked product scene is deliberately simple: a predecessor research agent is mid-task, the user kills it, chooses a successor role, scopes what memory can survive, and the cold successor continues only from a Walrus/MemWal-backed Memory Will object. The product is not “chat history export,” “project summary,” or “proof dashboard.” It is a durable succession layer for long-running agent work.

The Sui Overflow 2026 Special - Walrus track asks builders to rethink agent systems with Walrus as AI’s verifiable data platform, specifically through durable data/file access, shared context, portable memory, long-running workflows, multi-agent collaboration, artifact-driven workflows, or Walrus/MemWal adoption tooling. The bounty brief further states that Walrus counts only when durable agent state or artifacts are on the critical path and can be reopened, shared, or inspected through real Walrus/Sui proof. 

bounty_brief

Memory Will matches the selected concept because the user-visible product consequence depends on durable scoped memory: without the Memory Will object, the successor cannot continue. The concept lock explicitly defines the product thesis as a portable succession layer where work-in-progress memory, evidence, policies, and checkpoints outlive the original agent and can be inherited by another role or tool. 

concept_lock

2. Problem definition

Long-running agent work fails at the handoff point. Today, users often rely on the same chat window, hidden app memory, pasted transcripts, screenshots, or informal summaries. That breaks when an agent session dies, a contractor leaves, a teammate takes over, a browser tab resets, or a different role needs to continue with only part of the prior context. The result is either memory loss or over-sharing.

The core problem is not merely persistence. The product problem is controlled inheritance:

A user needs to decide what agent memory survives, what gets redacted, who or what inherits it, and how the successor proves it used only the allowed state.

Walrus/MemWal is load-bearing because the successor must reopen scoped durable memory, not receive hidden local context. R0 and the tournament both bind the product to a first-minute durable state change followed by reopen, recall, restore, share, delegate, or inspect behavior; Walrus cannot be a badge, optional upload, hidden backup, or proof page detached from action. 

01-10x10-deep-research-response

 

idea_tournament

3. Target users

Beachhead user: a research/product lead comparing vendors, tools, or strategic options with an AI agent. This user returns because research rarely finishes in one session and often needs handoff to finance, legal, design, operations, or a teammate.

Month-1 user: small teams already using AI for research, vendor comparisons, sales prep, diligence, product planning, or client work. They need a shared workspace where a Memory Will can be created, reopened, audited, and used by a successor role.

Month-6 user: teams running cross-tool or multi-agent work where agent memory must be portable, scoped, inspectable, and reusable across workspaces. This includes research teams, consulting firms, internal product/ops teams, sales organizations, legal operations teams, and AI workflow builders.

Non-users / anti-cases: users who only want a local chatbot summary, a generic workflow dashboard, a log viewer, a static two-agent animation, or a final report stored on Walrus after all meaningful work has already happened. The uploaded user cases explicitly reject local chat summarization, handoff pages without cold restore, log viewers without mutation, generic workflow engines with Walrus only for final reports, and scripted agents sharing hidden context. 

user_cases

4. User pain points

Agent work dies with the session. The user may have useful facts, decisions, sources, and open questions, but no reliable product object that a new agent can reopen.

Handoffs over-share or under-share. Pasting a full transcript gives the successor too much sensitive context; writing a manual summary loses source grounding and uncertainty.

Successors are not auditable. Users cannot tell whether the successor inherited a fact, hallucinated it, ignored a redaction, or used hidden context.

Role-specific continuation is brittle. Finance, legal, design, and operations successors need different memory scopes and priorities. A one-size summary does not encode delegated authority.

Durable proof is detached from user action. Many storage demos show proof after the fact. Memory Will must make proof part of the work object: will, scopes, redactions, replay, and receipt.

Provider/storage failures often masquerade as success. The product must show degraded mode when AI or Walrus/MemWal fails, not generate deterministic fallback output and call it restoration.

5. Core requirements & priority
Exactly 3 P0 product guarantees
P0-1 — Durable Memory Will creation after predecessor death

When the user kills or ends a predecessor agent run, the system must create a durable Memory Will object from the latest valid checkpoint, evidence bundle, delegation policy, and redaction log. The user must see a Walrus/MemWal pointer or object id, and the product must clearly mark predecessor local context as unavailable after death. This is the core “death → will” guarantee.

P0-2 — Cold successor restore from scoped memory only

A successor agent must start as a cold role/session and restore only from the Memory Will’s allowed scopes. Changing successor role or blocking a memory category must change the restored context, successor uncertainty, and output. If required memory is redacted or missing, the successor must narrow its output or ask for scope; it must not hallucinate around the gap.

P0-3 — Inspectable Memory Will Receipt and honest recovery states

Every successful handoff must produce a reopenable Memory Will Receipt showing before-death checkpoint, delegated scopes, redactions, successor replay trace, restored output, and Walrus/MemWal inspect pointer. If the AI provider, Walrus/MemWal write, read, restore, or proof path fails, the product must show a degraded/error state and block inheritance success until the durable path is restored.

P0 traceability map
P0 guarantee	Product routes / surfaces	API / tool contract	Data objects	State evidence	Test evidence	Deploy evidence
P0-1 Durable Memory Will creation	/workspace/:workspaceId/task/:taskId, /api/checkpoints, /api/memory-wills	remember_checkpoint, write_memory_will, delegate_memory_scope	Workspace, AgentRun, TaskCheckpoint, EvidenceBundle, MemoryWill, DelegationPolicy, RedactionLog	Memory Will has task id, checkpoint id, source ids, allowed scopes, redactions, successor role, timestamp, and Walrus/MemWal pointer; predecessor local context status becomes unavailable	Kill action test asserts a real write result exists; local-only storage cannot pass; provider/storage failure shows degraded state	Public URL allows a fresh visitor to kill a visible task and receive a durable pointer, not a seeded receipt
P0-2 Cold successor restore	/successor/:willId, /api/successor/restore, /api/redactions/verify	restore_successor_context, verify_redactions, comparison compiler / role continuation action	SuccessorSession, AllowedMemoryScope, RestoredCheckpoint, SuccessorReplayTrace, FinalComparisonArtifact	Successor starts without predecessor local state; restored memories are listed; blocked scopes are absent; role and redaction changes alter output	Role-swap test checks finance/legal/designer/operator outputs differ; redaction test verifies blocked category is named as unavailable; missing pointer test blocks continuation	Fresh browser can open successor from receipt link and continue from durable object only
P0-3 Receipt and recovery	/will/:willId, /inspect/:willId, /api/receipts, /api/health	render_will_receipt, Walrus/MemWal read/inspect, proof/status renderer	MemoryWillReceipt, ProofLink, ReceiptView, OpsEventLog, FailureState	Receipt shows before/after, scopes, redactions, replay, inspect pointer, AI/model run metadata, and any stale/failed status	Incognito reopen test; forced Walrus write/read failure test; forced AI failure test; stale checkpoint warning test	Public receipt URL survives refresh and can be inspected without the builder explaining it

The locked demo plan already names the required state objects and tool calls: Memory Will, task checkpoint, evidence bundle, delegation policy, successor replay trace, Memory Will Receipt, plus remember_checkpoint, write_memory_will, delegate_memory_scope, restore_successor_context, verify_redactions, and render_will_receipt. 

demo_interaction_plan

P1 only if time remains

P1 work must not weaken P0. It may include team spaces with simple invite links, multiple Memory Wills per workspace, exportable receipt JSON, basic retention controls, and adjacent templates for sales account handoff, legal matter handoff, and research sprint continuation.

P2 only if time remains

P2 work may include an MCP or agent-framework adapter, deeper Sui proof visualization, workspace analytics, wallet-based ownership, private/encrypted payload integration, and cross-tool import/export. These are not required for public product success unless P0 is complete.

6. Solution overview

Memory Will turns an agent handoff into a durable, scoped, inspectable succession object.

The product has four product objects:

Object	Purpose
Workspace	The owned space a person or team returns to. It contains tasks, checkpoints, wills, receipts, and access controls.
Task checkpoint	The latest work-in-progress state: facts, sources, open questions, incomplete next step, and model/tool trace.
Memory Will	The durable Walrus/MemWal object containing scoped memory, redactions, role policy, evidence pointers, and inheritance metadata.
Memory Will Receipt	The human-readable and shareable replay artifact proving what died, what survived, what was blocked, who inherited it, and how the successor continued.

The product mode is a public web app backed by real AI provider calls and real Walrus/MemWal durable state operations. A starter research comparison may be provided so a fresh visitor can operate the product immediately, but the Memory Will, pointer, successor restoration, replay trace, and output must be generated from the visitor’s runtime action. Seeded content can introduce the task; it cannot be the success path.

Six-month product contract
Contract item	Product commitment
Month-1 return user	A research/product lead or small team returns to a Memory Will workspace to reopen prior vendor comparisons, hand off to a different role, and inspect receipts from previous runs.
Month-6 return user	A team running recurring AI workflows returns to a cross-tool succession workspace where Memory Wills preserve scoped checkpoints across projects, agents, and roles.
Recurring trigger	“This agent/session/person cannot continue” after a research sprint, sales call, legal review, client project, diligence task, or multi-day agent run.
Owned product object/workspace	A Workspace containing TaskCheckpoint, MemoryWill, DelegationPolicy, RedactionLog, SuccessorReplayTrace, and Receipt objects.
Production mode	Public web product with real model/provider path, real Walrus/MemWal write/read/restore path, persistent receipt URLs, and honest degraded state when dependencies fail.
Roles and permissions	Workspace owner, editor, viewer/auditor, predecessor agent, successor agent role, and public receipt viewer. Successor roles include finance, legal, designer, and operator for the beachhead.
Data lifecycle	Data is created during agent work, checkpointed, validated into scoped memory, persisted to Walrus/MemWal, reopened by successor or receipt, exportable as receipt JSON, and deletable or expired according to workspace policy. Long-lived objects require explicit lifetime/renewal handling rather than silent “forever” claims.
Failure/recovery behavior	Walrus/MemWal write failure blocks inheritance success; missing pointer makes successor start blank and unable to continue; stale checkpoint shows a warning; AI provider failure shows degraded mode and preserves existing durable objects without fabricating output.
Reliability target	P0 public routes target ≥95% successful completion of write → restore → receipt reopen over rolling 30-day operation, measured from fresh browser tests. The non-negotiable reliability rule is 0 false-success handoffs.
Observability/logs	Store non-secret ops events for checkpoint created, will write attempted/succeeded/failed, restore attempted/succeeded/failed, redaction verification, receipt render, provider error, and public inspect view. User-visible replay is separate from internal health logs.
Support path	Public footer/help link to report a broken receipt or failed restore; support triage owned by the project maintainer named in the README/SUBMISSION.
Privacy/security posture	Default public mode uses synthetic or user-approved non-secret data. Sensitive raw text is redacted before durable storage or stored only with explicit private/encrypted handling. No API keys, private credentials, hidden prompts, or secrets appear in receipts, logs, or public proof views. No compliance/legal confidentiality claims unless implemented and documented.
Abuse/cost guardrails	Rate-limit Memory Will writes/restores per visitor/workspace, cap model tokens and agent steps, block unlimited loops, expose provider failure instead of retry storms, and prevent public receipt spam from becoming unbounded storage spend.
Public operability without builder	Fresh visitor can open the public app, run the guided research comparison, kill the agent, choose role/scope, restore successor, and open receipt without private setup or builder narration.
First 10 real users or teams	Recruit 3 research/product leads, 2 founder/ops teams, 2 consulting/research teams, 1 sales team, 1 legal/compliance reviewer, and 1 AI workflow builder to test whether Memory Wills replace pasted handoff summaries.
Six-month maintenance owner	The submitting solo builder/project owner is accountable for public uptime, dependency renewals, support intake, README accuracy, and P0 regression checks; the owner must be named before submission packaging.
Next integration	MemWal MCP / agent-client adapter so external agents can write/read Memory Wills from existing workflows rather than only through the web app.
Roadmap/cut line preserving usability	The durable core remains one workspace, one research task, one Memory Will, one cold successor, one receipt. Everything else—enterprise identity, broad vertical templates, deep wallet UX, marketplace, multi-agent framework—is cut before weakening that usable product.
7. User flows
Flow A — Create or open a task workspace

A user opens a Memory Will workspace with a visible long-running task, such as comparing three vendors. The predecessor agent has a goal, source bundle, current findings, open questions, and a next planned step. The system maintains a checkpoint so that “what would normally be lost” has a structured state boundary.

Flow B — Kill predecessor and approve inheritance

The user kills the predecessor agent. The app marks predecessor local context unavailable, prepares a Memory Will draft from the latest checkpoint, and asks the user to choose successor role and blocked memory categories. The user approves what survives. This is the human approval boundary: the agent may propose scope, but the user controls inheritance.

Flow C — Write durable Memory Will

The system writes the Memory Will, delegation policy, redaction log, and source/evidence pointers to Walrus/MemWal. It returns a durable pointer/object id. If the write fails, the product says the predecessor can be killed but the work cannot be safely inherited.

Flow D — Open cold successor

The user opens a successor session from the Memory Will. The successor starts blank, restores only allowed scopes, lists inherited and unavailable memory, verifies redactions, and continues the task with role-specific priorities.

Flow E — Mutate role or redaction

The user changes successor role or blocks a memory category. The successor re-plans. If pricing notes are blocked, a finance successor cannot make pricing claims; if legal inherits the will, it emphasizes contractual risk and uncertainty instead of budget analysis. The output must visibly change because delegated memory and role policy changed.

Flow F — Open receipt and inspect proof

The user opens the Memory Will Receipt. The receipt shows before-death checkpoint, Memory Will metadata, delegated memory scopes, redactions, successor replay trace, restored output, final comparison artifact, and Walrus/MemWal inspect pointer.

Flow G — Recovery/degraded state

If durable write fails, the will is not valid. If restore fails, the successor cannot continue. If checkpoint is stale, the system shows the stale timestamp and asks whether to restore the older state. If the AI provider fails, existing durable state remains inspectable but no fake continuation is generated. The demo plan requires these failure states and forbids claiming success from local-only fallback. 

demo_interaction_plan

8. User Cases
Case	User	Trigger	Action	Result	Return loop
Hero: vendor / option comparison	Research or product lead	Original agent, browser tab, contractor, or tool cannot continue	Create Memory Will, scope inheritance, open cold successor	Successor resumes from durable Walrus/MemWal memory with inherited facts, redactions, and replay	Reopen future research work instead of pasting a transcript
Sales account handoff	Sales manager or account executive	Account owner leaves, changes territory, or hands work to a specialist	Create will with allowed customer context, objections, next steps, and redacted sensitive notes	Successor sales agent drafts role-specific next action while proving inherited memories	Recurring account transitions and specialist handoffs
Legal matter handoff	Legal ops team or small law firm	Agent or teammate cannot continue a review	Delegate only approved facts, sources, and open questions	Successor continues with explicit redactions and uncertainty where memory is blocked	Repeat matter review, compliance review, and approval workflows
Research sprint continuation	Research lead, analyst, founder, consulting team	Multi-day research is interrupted or split by role	Successor inherits scoped checkpoint and source bundle	Finance, design, legal, or operator successor produces different next-step analysis from same Memory Will	Multi-day projects with recurring role-specific continuation

These cases are taken directly from the uploaded user cases; the human boundary is that high-risk actions are not executed automatically, the predecessor may propose memory scope, the user approves inheritance, and the successor drafts or asks for missing memory rather than publishing external actions. 

user_cases

9. Demo critical path & Hero Moment

The demo is a public route through the production product contract, not a separate success condition.

Critical path:

Open workbench with predecessor research agent mid-comparison.

Click Kill Agent.

Agent flatlines; local context meter drops to zero.

Select successor role: finance, legal, designer, or operator.

Optionally block one memory category.

System writes Memory Will, delegation policy, redaction log, and source bundle to Walrus/MemWal.

Open cold successor.

Successor fetches scoped Memory Will, shows inherited/unavailable memories, verifies redactions, and continues the comparison.

Open Memory Will Receipt.

Inspect durable pointer/object id, replay timeline, role-specific output, and redaction effect.

Hero Moment:
Agent flatlines → Memory Will stamped → local context cleared → successor opens scoped will → successor continues with the chosen role’s bias.

Judge magnet requirements: first action within 30 seconds; 5-second replayable state change; role or blocked category changes the output; receipt is shareable/reopenable; proof is backstage but inspectable. The product discovery reference requires audience proximity, judge-controlled input mutation, share/replay artifact, and an agent-native loop with goal → observe → plan → tool calls → state mutation → verification → surprise/replan → replay trace. 

01-product-discovery

10. Pages / modules plan

This is a product module plan, not a UIUX interaction plan. Final layout, microcopy, motion, accessibility states, and component behavior belong to the next UIUX cycle.

Route / module	Product responsibility	P0/P1/P2	UIUX-cycle question to answer next
/ public entry	Explain the Memory Will promise and let a fresh visitor enter a guided public workspace	P0	[UIUX-CYCLE QUESTION] How should the first screen invite “kill the agent” without making the product feel like a staged trick?
/workspace/:workspaceId	Owned workspace containing tasks, wills, receipts, role policies, and access state	P0	[UIUX-CYCLE QUESTION] How should workspace ownership be visible without turning the first minute into admin setup?
/workspace/:workspaceId/task/:taskId workbench	Show predecessor goal, sources, findings, checkpoint readiness, and kill control	P0	[UIUX-CYCLE QUESTION] How should checkpoint readiness be shown as trustworthy but not dashboard-heavy?
Memory Will writer module	Convert checkpoint into scoped will, policy, redactions, and durable write	P0	[UIUX-CYCLE QUESTION] How should users approve inheritance scope quickly while still understanding what will be blocked?
/successor/:willId	Start cold successor, restore allowed memory, verify redactions, continue task	P0	[UIUX-CYCLE QUESTION] How should the successor prove it starts blank without overexplaining implementation details?
/will/:willId receipt	Show before/after, delegated memories, redactions, replay, final artifact, inspect pointer	P0	[UIUX-CYCLE QUESTION] How should receipt proof stay shareable for normal users and inspectable for sponsor judges?
/inspect/:willId	Technical inspection surface for Walrus/MemWal pointer, object status, read/write trace	P0	[UIUX-CYCLE QUESTION] How much raw JSON/proof should be visible by default versus expandable?
/settings/workspace	Retention, export, deletion, receipt visibility, support link	P1	[UIUX-CYCLE QUESTION] How should deletion/expiry copy avoid unsupported permanence or privacy claims?
Template modules	Sales, legal, research sprint variants using same will engine	P1	[UIUX-CYCLE QUESTION] Which adjacent template can be shown without diluting the research-comparison beachhead?
MCP / external agent integration	Let existing agent clients create/read Memory Wills	P2	[UIUX-CYCLE QUESTION] Where should external integration status appear without becoming the product’s front stage?
11. Visual direction & UI principles

Memory Will should feel like a serious succession product with one dramatic public action. The “funeral/will” metaphor is memorable, but it should be controlled and professional: more “verified handoff receipt” than horror, meme, or gimmick.

Core visual principles:

State change first, proof second. The user should immediately understand that the predecessor died, memory was scoped, and the successor continued. Proof must be inspectable but not the opening screen.

Show inheritance boundaries. Allowed scopes, redacted categories, missing memory, and role policy should be visually distinct. The user must never wonder whether a blocked category leaked.

Make cold restore legible. The successor should visibly start blank, then load allowed memory from the will. This is the core trust beat.

Receipt over dashboard. The shareable artifact is a Memory Will Receipt with replay and proof, not a generic logs page.

Failure states are product states. Degraded mode must look intentional and trustworthy: “cannot safely inherit” is a valid product outcome when storage or provider paths fail.

Accessible by default. The next UIUX cycle must specify keyboard/touch behavior, loading/empty/error/success states, focus order, color contrast, screen-reader labels, and test selectors for each P0 screen, as required by the product discovery reference. 

01-product-discovery

12. Technical constraints
Real provider and storage constraints

Memory Will is BOTH in product character: AI changes the user-visible continuation, and Walrus/MemWal changes the user outcome by making scoped memory durable, portable, and inspectable. The stack must be chosen later through the proper stack lock, but the product constraints are already binding:

Reviewer-visible success must use a real AI/model provider path.

Reviewer-visible success must use real Walrus/MemWal write/read/restore state.

A local database may cache metadata, but cannot be the authoritative success path.

A starter dataset may help public visitors begin, but runtime will creation and successor restoration must be real.

Fallback can only be error/degraded mode; it cannot generate deterministic success output.

Static arrays are not agent traces.

A fake tx/hash/proof or hidden JSON-only proof path is disallowed by the build realness reference. 

02-stack-and-build

Minimum data model contract
Entity	Required fields
Workspace	id, owner id/session, title, visibility, created/updated timestamps, retention setting
AgentRun	id, workspace id, task id, role, model/provider metadata, current status, local context status
TaskCheckpoint	id, task id, facts, sources, open questions, next planned step, checkpoint timestamp, validation status
EvidenceBundle	id, source ids/snippets/files, source visibility, hash/pointer metadata where available
DelegationPolicy	id, successor role, allowed categories, denied categories, policy rationale
RedactionLog	id, blocked category, affected memory ids, reason, verification status
MemoryWill	id, task id, checkpoint id, evidence bundle id, policy id, redaction log id, successor role, Walrus/MemWal pointer/object id, created timestamp
SuccessorReplayTrace	id, will id, restore event, recall event, redaction checks, model/tool steps, final output id
MemoryWillReceipt	id, will id, public/private status, before/after summary, inspect pointer, replay timeline, export payload
OpsEventLog	id, event type, dependency, status, error class, non-secret metadata, timestamp
AI behavior constraints

The successor must cite inherited memory categories and explicitly name unavailable memory. AI outputs must be validated against the restored scope: if the output uses a blocked category, the redaction verifier fails and the product shows an error or requests regeneration. The system should prefer narrower, honest continuation over broad unsupported answers.

Walrus/MemWal constraints

Walrus/MemWal must store or anchor the Memory Will object or memory payload on the critical path. The receipt must include a pointer/object id that can be reopened or inspected. If object lifetime is time-bounded, the product must expose renewal/expiry status rather than claiming indefinite durability.

Privacy/security posture

Public launch mode must assume receipts and inspect links can be viewed by others unless explicitly marked private. The product must not store secrets, credentials, private customer data, privileged legal material, or personally sensitive information in public demo paths. Redactions must happen before public receipt display and before durable storage unless an explicit private/encrypted storage mode is implemented and documented.

Human approval boundary

The predecessor may write memory and propose successor scope. The user approves what survives. The successor may draft analysis and ask for missing memory, but cannot publish external actions, contact third parties, spend money, sign documents, or submit official work without human approval. The user cases require this boundary. 

user_cases

13. Success metrics
Product success
Metric	Target
Fresh public completion	≥80% of first 10 real users can complete kill → will write → successor restore → receipt open without builder help
P0 durable loop	≥95% successful completion of write → read/restore → receipt reopen over rolling 30-day public operation
False-success rate	0 cases where the product claims inheritance succeeded without a valid durable Memory Will pointer/read
Role mutation	Finance/legal/designer/operator successor outputs visibly differ in automated and manual checks
Redaction behavior	100% of blocked-category tests either remove the memory from successor context or produce a failed verification state
Receipt reopen	100% of successful Memory Wills have a receipt URL that reopens in a fresh browser session
Failure honesty	100% of forced provider/storage failures show degraded/error state instead of deterministic substitute success
Month-1 return	At least 5 of first 10 users/teams create or reopen a second Memory Will after initial use
Month-6 product signal	At least 3 teams use Memory Will for more than one task type or request external-agent integration
Judging success
Judge-facing signal	Target
First action	Judge can click Kill Agent and choose successor role within 30 seconds
Hero clip	Five-second clip shows flatline → Memory Will stamp → local context cleared → successor restore → role-specific continuation
Inspectability	Judge can inspect Memory Will object/pointer, delegated scopes, redactions, replay trace, and restored output
Sponsor criticality	Removing Walrus/MemWal makes successor continuation fail or degrade, not merely swap storage vendors
Retell line	A non-domain judge can repeat: “I killed an AI, it wrote a memory will, and the next AI continued only with the memories I allowed.” The J2 judge response identified this as the strongest memory-handoff retell line. 

02-product-demand-judge-response

14. Risks & cut list
Key risks and mitigations
Risk	Why it matters	Mitigation / recovery
The product becomes theatrical summarization	J1 and J3 both warn S1 fails if successor continuation is just a local summary or hidden context. 

01-sponsor-walrus-judge-response

 

03-build-redteam-judge-response

	Enforce cold successor session, clear predecessor local context, require Walrus/MemWal pointer before restore, and show missing-pointer failure.
Restore/delegation is not inspectable	J3 calls this fatal because otherwise the product is just a dramatic summarizer. 

03-build-redteam-judge-response

	Receipt must show delegated memory list, redactions, replay, pointer, and role/scope diff.
Walrus becomes decorative storage	The track and R0 reject Walrus as badge, optional upload, or local-only chatbot memory. 

bounty_brief

 

01-10x10-deep-research-response

	All P0 success depends on durable write/read/restore; failure blocks inheritance success.
First beat becomes proof/logs instead of human action	Product discovery rejects proof packets and dashboards as first 15–30 seconds. 

01-10x10-deep-research-response

	Keep proof inspectable after the kill/restore moment; do not lead with logs.
AI output hallucinates around redactions	A successor might infer blocked memory from context.	Validate successor output against allowed scopes; require “missing memory” language when scope is blocked; fail verification if blocked facts appear.
Public visitors cannot run it without setup	The pipeline requires fresh public operation and public smoke later. 

pipeline-plan

	Provide guided public workspace and starter research task, while ensuring runtime will/write/restore/receipt are real.
Privacy confusion	Durable/public proof can expose sensitive memory.	Default to synthetic/public data; warn before durable write; redact before storage/display; avoid sensitive vertical claims.
Provider or storage outage	Product could fake success under pressure.	Degraded states are the only fallback. Existing receipts remain inspectable; no new inheritance success is claimed.
Scope creep into platform	Enterprise identity, all agent frameworks, and many verticals would dilute the core.	Preserve one workspace, one task, one Memory Will, one successor, one receipt as the usable product.
Explicit non-goals

No general agent framework.

No enterprise identity or compliance suite.

No broad vertical workflows beyond the research-comparison beachhead during the public launch slice.

No deterministic fallback output as success.

No localStorage-only or hidden local memory path for product success.

No static two-agent theater.

No chat export, project handoff summary, or knowledge-base article as the core product.

No claims that Memory Will is suitable for confidential legal, medical, financial, or regulated records unless private/encrypted storage and policy controls are implemented.

No automatic external actions by successor agents.

Cut list

Cut in this order if scope pressure appears:

P2 external MCP/client integration.

Wallet-based ownership UX beyond a basic proof pointer.

Enterprise roles, SSO, org admin, audit export polish.

Sales/legal/research templates beyond text examples.

Multi-workspace dashboards.

Advanced comparison diffing.

Receipt visual polish that does not affect proof or reopenability.

Custom source ingestion beyond the beachhead source bundle.

Multi-successor branching.

Any feature that slows or obscures kill → durable will → cold successor restore → receipt.

Gate block statement

The next UIUX cycle is not blocked by this PRD because selected concept traceability, P0 requirements, production mode, and the six-month product contract are present. Implementation is still blocked until the separate UIUX GPT Pro response is saved and the local agent distills the PRD/UIUX outputs into pitch/project_prd.md, pitch/uiux_interaction_plan.md, stack.lock.json, and the later build artifacts required by G2/G3/G4.