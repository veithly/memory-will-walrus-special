# Pipeline Plan: walrus-special-2026

## Goal
Build a new Sui Overflow 2026 `Special - Walrus` project through HackathonHunter full mode.

## Current Gate

- Active gate: G7 / Submit hold
- Status: G6 complete; stop before final form submission for human confirmation
- Last plan read: 2026-06-21 Asia/Shanghai
- GPT Pro tournament: full
- GPT Pro next required cycle: none
- User corrections this run: 1
- Last correction repaired at gate: G0

## Read-First Rule

- Before any gate work, read only the references listed in that gate row and the current `references/07-shipping.md` guidance when packaging or submitting.
- If a gate fails, read the one reference tied to the failing symptom before editing.

## Check-Off Rule

- Mark a gate `[x]` only after the evidence files exist and the verification command or inspection in that row is green.
- G7 stays unchecked until a human approves the final form submission.

## Gate Rows

| ID | Status | Gate | Read | Work | Evidence To Produce | Verification |
| --- | --- | --- | --- | --- | --- | --- |
| G0 | [x] | Prize thesis and evidence-only research | `references/00-orchestration.md`, `references/01-product-discovery.md`, `references/01d-gpt-pro-research.md`, `bounty_brief.md` | Research event, Walrus track, and current pull without concepts | `pitch/gpt-pro/prompts/research/01-10x10-deep-research.md`, `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md` | check R0 contains Required Construct Primer, desire-led signals, audience proximity anchors, product ambition patterns, clone traps, and no concepts |
| G1 | [x] | Concept lock | `references/01-product-discovery.md`, `references/01d-gpt-pro-research.md`, `pitch/gpt-pro/responses/research/01-10x10-deep-research-response.md` | Batch ideation and judging, then lock one scene | `pitch/idea_tournament.md`, `pitch/concept_lock.md`, `pitch/demo_interaction_plan.md`, `pitch/user_cases.md` | audit I/J windows batch-started; selected scene passes Agent-Native, Audience Proximity, Product Ambition, and Judge Magnet |
| G2 | [x] | Six-month PRD and UIUX | `references/01-product-discovery.md`, `references/01d-gpt-pro-research.md`, `references/02-stack-and-build.md`, `assets/prompts/best_prd.prompt.md`, `assets/prompts/best_uiux.prompt.md` | Run separate PRD and UIUX GPT Pro cycles before coding | `pitch/gpt-pro/responses/spec/01-best-prd-response.md`, `pitch/gpt-pro/responses/spec/02-best-uiux-response.md`, `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, `stack.lock.json` | check PRD exists before UIUX and no implementation before both responses |
| G3 | [x] | Visual contract | `references/04-experience-quality.md`, `pitch/project_prd.md`, `pitch/uiux_interaction_plan.md`, `.hunter/external-skill-usage.json` | Lock visual lane, component rules, brand assets, and UI quality bar | `pitch/visual-build-contract.md`, `.hunter/external-skill-usage.json`, `PRODUCT.md` | audit `ui-libs,external-skills,design-quality,clarity,motion` green |
| G4 | [x] | Real loop | `references/02-stack-and-build.md`, `pitch/visual-build-contract.md`, `stack.lock.json` | Build kill, write, restore, receipt, proof, and no-success path | `src/app/memory-will-workbench.tsx`, `.hunter/runtime-interaction.report.json`, `.hunter/claim-matrix.json`, `.hunter/operations-check.json` | audit `feature-density,claims,runtime,realness,agent-realness` green |
| G5 | [x] | Public smoke | `references/07-shipping.md`, `BUILD.md` | Run public URL desktop/mobile smoke with fresh visitor path | `.hunter/public-smoke.md`, `.hunter/runtime-artifacts/g5-public-desktop-proof.png`, `.hunter/runtime-artifacts/g5-public-mobile-proof.png`, `.hunter/runtime-interaction.report.json` | smoke/audit public runtime passes 5/5 targets, Chromium/Firefox/WebKit, mobile, reload, second context |
| G6 | [x] | Package | `references/07-shipping.md`, `README.md`, `SUBMISSION.md` | Package only working claims and record deck/video blockers honestly | `README.md`, `SUBMISSION.md`, `pitch/public-copy-facts.md`, `pitch/draft.md`, `pitch/recording/video-outline.md`, `artifacts/narration.json`, `pitch/judge-red-team.md`, `.hunter/packaging-blockers.md` | audit `readme,human-copy,external-skills,template-face,judge-red-team,submission` green |
| G7 | [ ] | Submit | `references/07-shipping.md`, `SUBMISSION.md` | Fill final platform form only after human approval | `SUBMISSION.md`, `pitch/judge-red-team.md`, `.hunter/public-smoke.md` | check `submission` audit green; stop before final submit for human confirmation |

## No Third Nudge Rule

One workflow correction has already happened. If another correction points to a missed Hunter rule, stop implementation, reread the current gate references, and rerun the failing gate before moving on.

## Decisions

- New directory: `walrus-special-2026`.
- Full GPT Pro tournament mode is active.
- Product name: Memory Will.
- Locked concept: judge kills a predecessor agent, writes a scoped Walrus/MemWal Memory Will, and opens a cold successor that restores only allowed memory.

## Blockers

- None at current gate.

## Errors Encountered

- Reused old project first. Repaired by starting this fresh full-mode workspace at G0.
- PRD runner session `hh-spec-prd` collided with stale ChatGPT state from an unrelated project and then hit rate limit before writing an output file. Discarded as invalid evidence; rerun PRD with unique fresh session `hh-walrus-spec-prd`.
