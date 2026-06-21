# Judge Red-Team: Memory Will

## Inputs

- Live URL: https://memory-will-walrus-special.veithly.workers.dev
- README: `README.md`
- Video: `pitch/recording/video-outline.md`
- Deck: `pitch/draft.md`
- SUBMISSION.md: `SUBMISSION.md`
- Claim matrix: `.hunter/claim-matrix.json`

## Fatal Objections

| Objection | Evidence checked | Status | Required fix |
|---|---|---|---|
| I cannot tell what it does in 10 seconds. | README first viewport and desktop screenshot | resolved | clear |
| I cannot operate the URL. | Runtime report, fresh public browser path | resolved | clear |
| The result looks staged. | Claim matrix, agent runs, receipt screenshot | resolved | clear |
| The sponsor/domain tech is decorative. | Walrus write/read routes and proof panel | resolved | clear |
| The copy sounds like a template. | Human-copy audit inputs and public-copy facts | resolved | clear |
| Public artifacts disagree. | README, pitch draft, video outline, submission | resolved | clear |

## 10-Second Recall

| Reader | User | Action | Result | Artifact/link | Result |
|---|---|---|---|---|---|
| 1 | research lead | kills predecessor agent | scoped successor restores | live URL and receipt | PASS |
| 2 | judge | clicks Kill Agent | receipt shows Walrus/Sui ids | `/?will=latest` | PASS |
| 3 | product lead | writes allowed memory | cold successor answers by role | proof screenshot | PASS |

Pass rule: at least 2 of 3 readers can recall user, action, result, and artifact/link.

## Conditional Language Check

- First-pass copy contains "with keys installed": no
- First-pass copy contains "production plan": no
- First-pass copy contains "credential blocker": no
- First-pass copy contains "can show either": no
- First-pass copy contains "configured status": no
- First-pass copy contains future-tense integration wording: no

Pass rule: all answers are no, unless the phrase appears only in limitations and is backed by a live proof ID.

## Red-Team Objections

- Objection 1: The Walrus result may be decorative -> answer/inspection path: `src/app/api/successor/restore/route.ts` reads the blob before successor output, and `.hunter/runtime-interaction.report.json` waits for the restore.
- Objection 2: The successor may be static -> answer/inspection path: `.hunter/agent-runs.json` records live provider mode, input hash, output hash, model, and tool calls.
- Objection 3: The receipt may not reopen -> answer/inspection path: runtime case `receipt reopen second context` loads `/?will=latest` and asserts `Sui object`.

## Verdict

- Open fatal objections: 0
- Cold recall: PASS
- Conditional language: PASS
- Decision: PASS

## Required Fixes Before Submit

- clear
