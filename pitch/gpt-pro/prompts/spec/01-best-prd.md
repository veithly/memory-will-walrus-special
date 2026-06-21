# G2 PRD Spec: Memory Will

## Uploaded reference files
- `bounty_brief.md`
- `.hunter/pipeline-plan.md`
- `pitch/concept_lock.md`
- `pitch/demo_interaction_plan.md`
- `pitch/user_cases.md`
- `pitch/idea_tournament.md`
- `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`
- `pitch/gpt-pro/responses/judging/01-sponsor-walrus-judge-response.md`
- `pitch/gpt-pro/responses/judging/02-product-demand-judge-response.md`
- `pitch/gpt-pro/responses/judging/03-build-redteam-judge-response.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`
- `C:/Users/Ricky/Documents/Project/SuiOverflow/_hoh-zone/fork/tracks/walrus.md`

## Template Source

This prompt follows `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/assets/prompts/best_prd.prompt.md`.

## Task

You are turning the selected hackathon idea into a six-month production product PRD, compressed into hackathon execution. Do not generate code. Do not write the UIUX interaction plan. Think like a product that must keep serving real users for six months; the hackathon deadline only affects cut order, not product ambition. The demo is only one route through the product. Do not frame the work as a 24-hour/48-hour MVP, proof-of-concept, or disposable demo.

Use the uploaded files as binding rules. Do not invent a PRD shape, stack story, or scope cut that conflicts with them.

## Spec Preconditions

- First output a `PRD Preconditions` block before any PRD content.
- Upstream GPT Pro mode: yes
- Required upstream inputs are present:
  - selected idea/concept lock: `pitch/concept_lock.md`
  - idea_tournament scoreboard/local pick: `pitch/idea_tournament.md`
  - deep_research_10x10 response: `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md`
  - three judge responses:
    - `pitch/gpt-pro/responses/judging/01-sponsor-walrus-judge-response.md`
    - `pitch/gpt-pro/responses/judging/02-product-demand-judge-response.md`
    - `pitch/gpt-pro/responses/judging/03-build-redteam-judge-response.md`
- If any prerequisite is missing or insufficient, output `missing G2 prerequisites; do not write PRD` followed by the missing artifact list, then stop.
- This prompt cannot generate UIUX, code, patch files, project scaffolds, or decide that implementation should begin. It only writes the product PRD.

## Inputs

- Current hackathon brief: Sui Overflow 2026 `Special - Walrus`, focused on functional AI agents or agent workflows using Walrus as verifiable durable data infrastructure for durable data/file access, shared context, portable memory, long-running workflows, multi-agent collaboration, artifact-driven workflows, or Walrus/MemWal adoption tooling.
- Selected idea / concept lock: Memory Will. The judge kills a predecessor agent, chooses a successor role, and a cold successor agent resumes only from a scoped Walrus/MemWal Memory Will object.
- idea_tournament scoreboard: S1 Agent Funeral / Memory Will was selected over S5 Context Crash Test, S3 BidForge Memory, and S4 Memory Tattoo Parlor because it had the strongest combined sponsor primitive, judge magnet, and buildability score.
- 3 judge responses: uploaded. J1 picked S1 as best sponsor/Walrus primitive. J2 picked S3 for demand but kept S1 as a top product backup with the best memory-handoff retell line. J3 tied S1 and S5 for build/proof, warning that S1 fails if successor restore/delegation is not inspectable.
- judge_magnet: `Kill Agent` first action <=30s; agent flatlines; Memory Will stamp appears; local context clears; successor opens scoped will; role-specific continuation changes with judge input.
- deep_research_10x10: uploaded R0 says Walrus must be load-bearing via durable memory/object write plus reopen/recall/restore/share/delegate/inspect path.
- winner_research: not separate; use R0, idea tournament, and judges as upstream evidence.
- team/deadline constraints: solo agent build in a fresh project; public demo must be runnable by a fresh visitor; product code cannot begin until separate PRD and UIUX GPT Pro responses exist and local artifacts are distilled.
- implementation constraints: likely web app with AI + Web3/Walrus primitive; success must use real mutable state and honest degraded state if provider/storage fails; no deterministic fallback as success; no hidden local-only memory; no unsupported production claims.

## Required Output

Produce only:

1. Detailed PRD using these 14 sections:
Project background; Problem definition; Target users; User pain points; Core requirements & priority; Solution overview; User flows; User Cases; Demo critical path & Hero Moment; Pages / modules plan; Visual direction & UI principles; Technical constraints; Success metrics; Risks & cut list.

The PRD must include a Six-month product contract covering: month-1 return user, month-6 return user, recurring trigger, owned product object/workspace, production mode, roles and permissions, data lifecycle, failure/recovery behavior, reliability target, observability/logs, support path, privacy/security posture, abuse/cost guardrails, public operability without the builder, first 10 real users or teams, six-month maintenance owner, next integration, and the roadmap/cut line that preserves a usable product. Fallback is only an error/degraded mode; do not define deterministic fallback output, seed-only success, or "watch the demo" as the product success path.

2. Scope discipline:
- Exactly 2-3 P0 product guarantees that still matter in month 6.
- P1/P2 only if time remains.
- Explicit non-goals and cut list.
- Risk mitigation and recovery/degraded-mode plan; no fake success output.

3. Traceability:
- Map each P0 requirement to route/API/data/state/test/deploy evidence.
- Mark any UIUX question that must be answered by the next UIUX cycle.

Block the next UIUX cycle if the PRD lacks selected concept traceability, P0 requirements, production mode, or six-month product contract. Implementation may start only after a separate UIUX GPT Pro response is saved and the local agent distills the PRD/UIUX outputs into the required project artifacts.
