# Task Plan: New Sui Overflow Walrus Project

## Goal
Create a new Sui Overflow 2026 `Special - Walrus` project through the full HackathonHunter process, ending with a live product loop, proof-backed README, screenshots, and paste-ready submission copy.

## Phases
- [x] Phase 0: Acknowledge correction and stop using old `proofquay` as the project
- [x] Phase 1: Create fresh project directory and full-mode plan files
- [x] Phase 2: Run G0/R0 evidence-only GPT Pro research
- [x] Phase 3: Batch-start I1-I3 ideation, synthesize `pitch/idea_tournament.md`
- [x] Phase 4: Batch-start J1-J3 judging, lock `pitch/concept_lock.md`
- [x] Phase 5: Run separate PRD and UIUX GPT Pro spec cycles
- [x] Phase 6: Build the selected real loop
- [x] Phase 7: Verify locally, deploy or report blocker, package submission
- [x] Phase 8: Produce final `ppt-master` deck and HyperFrames demo video assets

## Key Questions
1. What Walrus Agent/Memory construct visibly counts for this track?
2. What first action can a non-domain judge take in under 30 seconds?
3. What result changes when the judge changes input?
4. What result can be reopened from Walrus and inspected through Sui proof?

## Decisions Made
- New project directory: `walrus-special-2026`.
- Full mode is active because the user explicitly requested the full Hunter process and corrected the earlier reuse of an existing project.
- GPT Pro tournament mode is active for open, prize-critical concept selection.
- No implementation until R0, I1-I3, local synthesis, J1-J3, local lock, PRD spec, and UIUX spec are complete.

## Errors Encountered
- Earlier work incorrectly upgraded `proofquay` instead of creating a new project. Resolution: stop that line, create `walrus-special-2026`, set user correction count to 1, and restart at G0.
- PRD GPT Pro session name `hh-spec-prd` had stale external ChatGPT state from another project and was invalid before response output. Resolution: rerun PRD with unique fresh session `hh-walrus-spec-prd`.
- Running `pnpm typecheck` at the same time as `pnpm build` races with Next's `.next/types` generation and produces temporary missing-file TS6053 errors. Resolution: run build and typecheck sequentially.

## Status
**Currently at G7 submit hold** - G0-G6 are complete. The final `ppt-master` deck, real browser recording, Mimo TTS narration, and HyperFrames demo video are packaged. `user_key.txt` was not found during TTS setup; `C:\Users\Ricky\use_key.txt` provided the Mimo key with explicit Mimo env overrides. Stop before final form submission unless the user explicitly approves that submit action.
