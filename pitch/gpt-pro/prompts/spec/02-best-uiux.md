# G2 UIUX Spec: Memory Will

## Uploaded reference files
- `bounty_brief.md`
- `.hunter/pipeline-plan.md`
- `pitch/concept_lock.md`
- `pitch/demo_interaction_plan.md`
- `pitch/user_cases.md`
- `pitch/idea_tournament.md`
- `pitch/gpt-pro/responses/spec/01-best-prd-response.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01-product-discovery.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/01d-gpt-pro-research.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/02-stack-and-build.md`
- `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/references/04-experience-quality.md`
- `C:/Users/Ricky/Documents/Project/SuiOverflow/_hoh-zone/fork/tracks/walrus.md`

## Template Source

This prompt follows `C:/Users/Ricky/Documents/Project/hackathonhunter-skill/assets/prompts/best_uiux.prompt.md`.

## Task

You are turning the selected product PRD into a detailed UIUX interaction plan, compressed into hackathon execution. Do not generate code. Do not rewrite the PRD or change the selected concept. The output is interaction design only: screens, states, proof, recovery, demo choreography, and implementation-facing UI notes.

Use the uploaded PRD response and references as binding rules. If the PRD is missing or incomplete, stop instead of inventing a replacement.

## UIUX Preconditions

- First output a `UIUX Preconditions` block before any UIUX content.
- Required inputs are present:
  - selected idea/concept lock: `pitch/concept_lock.md`
  - saved PRD GPT Pro response: `pitch/gpt-pro/responses/spec/01-best-prd-response.md`
  - team constraints: solo build, fresh public visitor path, no implementation before UIUX response is saved
  - implementation constraints: real mutable Walrus/MemWal state, honest degraded states, no hidden local-only success
  - visual/design constraints: the next G3 visual contract will require `impeccable` plus `design-taste-frontend`; do not turn the first screen into a dashboard, proof packet, or landing page
- If `pitch/gpt-pro/responses/spec/01-best-prd-response.md` or equivalent PRD response content is missing, output `missing G2 prerequisites; do not write UIUX` followed by the missing artifact list, then stop.
- This prompt cannot generate PRD sections, code, patch files, project scaffolds, or decide that implementation should begin. It only writes the UIUX interaction plan.

## Inputs

- Selected idea / concept_lock: Memory Will. The judge kills a predecessor agent, selects a successor role, writes a scoped durable Memory Will to Walrus/MemWal, and a cold successor resumes only from allowed memory.
- PRD GPT Pro response: uploaded at `pitch/gpt-pro/responses/spec/01-best-prd-response.md`. It defines P0 guarantees: durable Memory Will creation after predecessor death; cold successor restore from scoped memory only; inspectable Memory Will Receipt and honest recovery states.
- project_prd draft, if already distilled: none yet. The local agent will distill after this UIUX response.
- team/deadline constraints: one primary builder loop; public route must be operable by a fresh visitor; first minute must show kill -> write -> restore -> receipt; code cannot start until this response exists and local G2 artifacts are distilled.
- implementation constraints: likely Next.js-style web app with AI + Walrus/MemWal state; success path must use real write/read/restore/share/delegate or an honest degraded state; no static two-agent theater, localStorage-only memory, or deterministic fallback success.
- visual/design constraints: front-stage should feel like a tense control surface for agent succession, not a marketing landing page or admin dashboard. The first action must be obvious and physical: `Kill Agent`. Proof should be expandable and inspectable but not the first screen's main visual.

## Required Output

Produce only:

1. Detailed UIUX Interaction Plan:
- Screen map with route, screen, primary user action, system response, state changed, proof shown.
- First-run flow for 0-10s, 10-30s, 30-60s, 2-3min, 5min/Q&A.
- For every P0 screen: default, loading, empty, error, success, keyboard/touch behavior, accessibility note, state transition, result/shareable artifact, test selectors.
- Six-Month Product Interaction Contract: month-1/month-6 return user, recurring trigger, owned object/workspace, primary success path, roles/permissions, persistence/history, failure/recovery, reliability/support behavior, privacy/abuse/cost guardrails visible in UI, mobile public first-run, desktop return-user path, and settings/account/limits surface or explicit reason it is not needed.
- Demo choreography: judge input, live consequence, result/shareable artifact, recovery behavior, big-screen staging, mobile QR behavior.
- Implementation notes: components, data/API dependencies, storage/state dependencies, external integrations, Playwright coverage.

2. Traceability:
- Map each P0 interaction to the PRD requirement it serves.
- Flag any interaction that lacks state, proof, recovery, or test evidence.

Block coding if any P0 interaction lacks state, proof, recovery, or test evidence. Implementation may start only after this separate UIUX response is saved and the local agent distills the PRD/UIUX outputs into `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, and/or `BUILD.md` as required by the selected full path.
