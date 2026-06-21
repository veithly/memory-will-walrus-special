# Project PRD: Memory Will

Distilled from `pitch/gpt-pro/responses/spec/01-best-prd-response.md`. This is a local G2 artifact, not a code plan.

## Project background

Memory Will is a product for AI work that must survive agent death, tab resets, teammate handoffs, and tool boundaries. The locked scene is simple: a predecessor research agent is mid-task, the user kills it, chooses a successor role, scopes what memory can survive, and a cold successor continues only from a Walrus/MemWal-backed Memory Will object.

The product is not a chat export, generic summary, log dashboard, or proof page. Walrus/MemWal is load-bearing because the successor cannot continue without reopening scoped durable memory.

## Problem Definition

Long-running agent work breaks at the handoff point. Users either lose context or over-share an entire transcript. The product problem is controlled inheritance: decide what memory survives, what is redacted, who inherits it, and how the successor proves it used only allowed state.

## Target Users

- Beachhead: research or product lead comparing vendors or options with an AI agent.
- Month 1: small teams using AI for research, vendor comparisons, sales prep, diligence, planning, or client work.
- Month 6: teams running cross-tool or multi-agent work where memory must be portable, scoped, inspectable, and reusable.

## User pain points

- Context loss: long-running agent work disappears when a tab, chat, or tool resets.
- Unsafe handoff: a user can paste the entire transcript, but cannot scope what a successor is allowed to inherit.
- No proof of inheritance: the receiving agent may claim continuity without showing what it restored.
- No useful failure state: provider/storage failures often look like success unless the product blocks restore and explains what failed.

## Core requirements & priority

### P0 product guarantees

- REQ-001: Create a durable Memory Will after the predecessor agent is killed.
- REQ-002: Store a locked TaskCheckpoint, EvidenceBundle, DelegationPolicy, and RedactionLog with the Memory Will.
- REQ-003: Start the successor with predecessor local context unavailable.
- REQ-004: Restore only allowed memory scopes from the durable Memory Will.
- REQ-005: Change successor output when role or redaction changes.
- REQ-006: Render a Memory Will Receipt and inspect surface that can be reopened from a fresh browser.
- REQ-007: Block success when write/read/restore/provider paths fail.

P1 work: retention/export controls, multiple Memory Wills per workspace, and sales/legal/research templates.

P2 work: MCP adapter, deeper Sui proof visualization, wallet-based ownership, and encrypted payload integration.

## Solution overview

Memory Will turns agent handoff into a scoped durable object. The predecessor agent works inside a visible task. The judge kills it. The app locks the latest checkpoint, asks which successor role should inherit the work, writes the Memory Will to Walrus/MemWal, and opens a cold successor route that can only continue after reading the durable object.

## P0 Product Guarantees

1. Durable Memory Will creation after predecessor death.
   - Judge kills the predecessor agent.
   - Latest valid checkpoint is locked.
   - Memory Will, delegation policy, redaction log, and evidence bundle are written to Walrus/MemWal.
   - Failure to write is a degraded state, not success.

2. Cold successor restore from scoped memory only.
   - Successor starts without predecessor local context.
   - It reads the Memory Will, restores allowed scopes, verifies redactions, and continues the task.
   - Role swaps and redactions visibly change output.

3. Inspectable Memory Will Receipt and honest recovery states.
   - Receipt shows before/after, delegated scopes, redactions, replay, inspect pointer, AI/model metadata, and stale/failed status.
   - Fresh browser can reopen the receipt.
   - Missing pointer, read failure, provider failure, and stale checkpoint are explicit failure states.

## Product Data Objects

- Workspace.
- AgentRun.
- TaskCheckpoint.
- EvidenceBundle.
- MemoryWill.
- DelegationPolicy.
- RedactionLog.
- SuccessorSession.
- RestoredCheckpoint.
- SuccessorReplayTrace.
- FinalComparisonArtifact.
- MemoryWillReceipt.
- ProofLink.
- FailureState.

## User Flows

### Hero Flow

1. Fresh visitor opens the public workbench.
2. Predecessor agent is visibly mid-comparison with sources, findings, open questions, and next planned step.
3. Judge presses `Kill Agent`.
4. App clears predecessor local context and locks the latest checkpoint.
5. Judge chooses successor role and optional redaction.
6. App writes Memory Will to Walrus/MemWal.
7. Judge opens cold successor.
8. Successor restores allowed memory, names unavailable memory, and continues.
9. Judge opens Memory Will Receipt and inspect surface.

### Mutation Flow

1. Judge switches successor role or blocks a memory category.
2. DelegationPolicy and RedactionLog update.
3. Successor replans.
4. Output, proof, and receipt revision change.

### Failure Flow

1. Walrus/MemWal write/read/restore fails, model provider fails, or checkpoint is stale.
2. App blocks inheritance success.
3. UI shows dependency, affected object, retry/inspect action, and no-success badge.

## User Cases

- Hero path: research/product lead kills a predecessor agent mid-comparison and restores a finance/legal/designer/operator successor from a scoped Memory Will.
- Sales account handoff: sales manager delegates only approved customer objections, next steps, and redacted notes to a successor sales agent.
- Legal matter handoff: legal ops delegates facts, sources, and open questions while blocking sensitive categories.
- Research sprint continuation: analyst splits a multi-day sprint across roles without losing source-backed memory.

See `pitch/user_cases.md`.

## Demo critical path & Hero Moment

Hero moment: agent flatlines, Memory Will stamp appears, local context clears, successor opens scoped will, and the resumed output changes with the chosen role.

This inherits `pitch/demo_interaction_plan.md`.

### Attention ladder and staging

- 0-10s: live predecessor workbench, checkpoint-ready chip, visible sources/findings, one dominant `Kill Agent` action.
- 10-30s: judge participation through kill action, successor role choice, and optional redaction.
- 30-60s: write stepper, durable pointer, cold successor blank-state beat, restored inherited/unavailable memory.
- Visual staging: death/restore is the main visual beat; proof stays as an expandable rail.
- Recovery behavior: write/read/restore/provider/stale failures show degraded state and block inheritance success.

### Judge magnet inheritance

See `pitch/judge_magnet.md`.

- Personal/customer scar: lost AI context and unsafe handoff.
- P0 product guarantees: durable will creation, cold scoped restore, inspectable receipt.
- Attention ladder: 0-10s, 10-30s, 30-60s, 2-3min, 5min.
- Judge success metrics: first action <=30s, replayable clip, input mutation, reopenable proof, no false success.
- Ship cut: guided research-comparison beachhead only.

The first minute must show:

- `Kill Agent` action within 30 seconds.
- Durable write pointer.
- Cold successor blank-state beat.
- Restored allowed memory list and unavailable memory list.
- Role-specific output.
- Receipt CTA.

## Pages / modules plan

| Route | Module | P0/P1/P2 | Responsibility |
| --- | --- | --- | --- |
| / | Public entry | P0 | Alias directly into guided workbench. |
| /workspace/:workspaceId | Workspace | P0 | Own task, wills, receipts, role policies, and access state. |
| /workspace/:workspaceId/task/:taskId | Predecessor workbench | P0 | Show live agent, checkpoint, sources, kill control. |
| /api/checkpoints | Checkpoint API | P0 | Lock latest TaskCheckpoint before Memory Will write. |
| /api/memory-wills | Memory Will API | P0 | Write/read MemoryWill, policy, redaction, evidence bundle. |
| /successor/:willId | Cold successor | P0 | Restore scoped memory and continue task. |
| /api/successor/restore | Restore API | P0 | Fetch will, verify redactions, generate successor output. |
| /will/:willId | Receipt | P0 | Show shareable Memory Will Receipt. |
| /inspect/:willId | Inspect surface | P0 | Show pointer/read status and compact JSON. |
| /settings/workspace | Settings | P1 | Retention, export, deletion, visibility, support, limits. |

## Visual direction & UI principles

The UI should feel like a succession control surface: tense, operational, and clear. The first screen is not a landing page, dashboard, proof packet, or logs view. State change comes first, proof is visible but secondary and expandable.

Visual style lane: cinematic operations console with editorial restraint and a clear physical kill/restore beat.

Primary UI library: Radix Themes / Radix UI primitives.

Supporting UI library: lucide-react icons with custom Memory Will stage components.

Official docs checked: Radix UI docs at https://www.radix-ui.com/primitives and lucide docs at https://lucide.dev/icons/.

Install commands: `pnpm add @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-tooltip lucide-react`.

Tailwind/shadcn rejection note: Tailwind can handle layout tokens, but a shadcn-only surface would look like a generic dashboard; the product needs bespoke death/restore/status components.

design-taste-frontend visual direction source workflow anti-template: use `C:/Users/Ricky/.skills-manager/skills/design-taste-frontend/SKILL.md` for design read, anti-default discipline, and visual audit before G4 build.

impeccable setup register color strategy audit notes: use `C:/Users/Ricky/.skills-manager/skills/impeccable/SKILL.md` for product register, palette seed, accessibility, motion restraint, and interaction audit.

Non-Tailwind visual signature: a split living/dead successor stage, flatline meter, stamped Memory Will pointer, and scoped-memory ledger cards.

Logo source: logo-generator skill for a restrained Memory Will wordmark if a logo is needed.

Avatar source: no mascot; predecessor/successor agents are represented as status panels and role chips.

Generated image/cutout assets: none planned for P0; product-native UI and mockups only, no generated cutout assets.

Hero composition: full workbench frame with live predecessor left, scope/proof rail right, and one destructive action centered.

Visual differentiation note: avoid SaaS card grid, terminal-only proof, generic AI chat, and animated pitch-deck scenes.

Forbidden lookalikes: no ChatGPT clone, no Vercel-style AI template, no blockchain explorer, no admin analytics dashboard.

QR mobile access plan: receipt page exposes a QR for mobile reopen and judge phone inspection after desktop hero path.

Mobile primary flow: bottom-sheet kill/scope/restore flow with proof behind disclosure and receipt as the final screen.

Desktop parity plan: all P0 state transitions, role mutation, receipt, and inspect proof must work on desktop and mobile.

## Technical Constraints

- Real success requires AI/model output and a real Walrus/MemWal write/read/restore path or honest degraded state.
- No hidden local-only success, scripted success when providers fail, static agent theater, or scripted restore.
- Agent claims require model, input, output, role, tools, and trace per run.
- Public visitor must be able to complete the hero loop without the builder.
- Public claims must not overstate permanence, privacy, production security, or sponsor integration beyond what is implemented.

### Product backbone

Identity/session model: guest workspace for public demo, generated workspace id, owner session id, receipt viewer role, and inspector role.

Storage schema: Workspace, AgentRun, TaskCheckpoint, EvidenceBundle, MemoryWill, DelegationPolicy, RedactionLog, SuccessorSession, SuccessorReplayTrace, MemoryWillReceipt, FailureState.

Ownership fields: workspaceId, ownerSessionId, willId, successorRole, viewerToken, createdAt, updatedAt, walrusPointer, receiptVisibility.

Multi-user plan: public demo is guest-owned; shared receipt viewer can inspect only the receipt and proof fields, not private draft state.

## Success Metrics

- P0 durable loop success: write -> read/restore -> receipt reopen succeeds for public route.
- Zero false-success handoffs.
- Judge first action occurs in <=30 seconds.
- 5-second clip is understandable without builder narration.
- Role/redaction mutation changes output and proof.
- Fresh browser can reopen receipt and inspect pointer.

### Judge success metrics

- First action <=30s.
- 5-second clip: flatline -> stamp -> context zero -> cold restore.
- Role/redaction mutation changes visible output and proof.
- Missing durable pointer blocks restore.
- Receipt and inspect page can be reopened without builder narration.

## Risks & Cut list

### Main Risks

- Successor secretly inherits local state.
- Memory Will is only a summary card, not durable scoped memory.
- Proof becomes a dashboard and kills the first-minute hook.
- Walrus/MemWal outage is hidden behind fake success.
- Role-specific output feels scripted.

### Cut List

- No general agent framework.
- No enterprise identity system.
- No broad vertical workflow library.
- No production-grade legal/sales/research claims.
- No full workspace admin before P0 loop works.

## Requirement coverage matrix

| Requirement | Route/API | Real data source | Test evidence | Deploy evidence |
| --- | --- | --- | --- | --- |
| REQ-001 Kill predecessor and lock checkpoint | /workspace/:workspaceId/task/:taskId, /api/checkpoints | Judge action, AgentRun, TaskCheckpoint | `kill-write.spec` | Public URL shows kill -> checkpoint lock |
| REQ-002 Write Memory Will | /api/memory-wills | MemoryWill, DelegationPolicy, RedactionLog, Walrus/MemWal pointer | `kill-write.spec`, `walrus-write-failure.spec` | Public URL returns pointer or degraded state |
| REQ-003 Start successor blank | /successor/:willId | SuccessorSession with no predecessor local context | `cold-successor.spec` | Fresh route shows blank-state beat |
| REQ-004 Restore scoped memory | /api/successor/restore | RestoredCheckpoint, AllowedMemoryScope | `cold-successor.spec`, `missing-pointer.spec` | Fresh browser restore uses durable pointer |
| REQ-005 Mutate role/redaction | /successor/:willId mutation panel | Revised DelegationPolicy, RedactionLog, SuccessorReplayTrace | `role-mutation.spec`, `redaction-block.spec` | Role swap changes output on deployed app |
| REQ-006 Render receipt and inspect proof | /will/:willId, /inspect/:willId | MemoryWillReceipt, ProofLink, read status | `receipt-reopen.spec`, `inspect-proof.spec` | Receipt URL and inspect URL reopen publicly |
| REQ-007 Block false success | global recovery layer, /api/health | FailureState, provider/storage status | `provider-failure.spec`, `stale-checkpoint.spec` | Deployed app shows no-success badge on failure |

## Six-Month Product Contract

- Month-1 return user: small team lead reopening Memory Wills across repeated research or client work.
- Month-6 return user: team operating cross-tool agent handoffs with scoped durable memory.
- Recurring trigger: an agent task is interrupted, reassigned, role-shifted, or needs scoped delegation.
- Owned object: Memory Will workspace containing checkpoints, delegation policies, redactions, receipts, and replay traces.
- Production mode: public app with durable memory adapter, AI provider, receipt reopen, inspection, and honest failure states.
- Roles and permissions: predecessor owner, successor role, receipt viewer, inspector; public demo can use guest workspace.
- Data lifecycle: create checkpoint, write will, restore successor, revise redaction, save receipt, inspect, export/delete later.
- Failure/recovery: write/read/restore/provider/stale failures block success and offer retry/inspect.
- Reliability target: no false-success restore; P0 route should remain operable for fresh visitors.
- Privacy/security posture: scoped memory and redactions are visible; no unsupported encryption/privacy claims until implemented.
- Public operability: fresh visitor can complete the guided hero route.
- First 10 users: research teams, consulting teams, founder/product leads, sales ops, legal ops, AI workflow builders.
- Maintenance owner: project owner must keep public app, README, env docs, and P0 regression checks accurate.
- Next integration: MCP or agent-framework adapter after P0 app proves the loop.
