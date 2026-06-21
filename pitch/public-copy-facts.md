# Public Copy Facts: Memory Will

## Language Lock

- Project language: English
- Source: Sui Overflow 2026 public event page and `stack.lock.json`
- Public copy rule: every judge-facing sentence names the user, action, result, or inspection path.
- Required copy skills: `stop-slop` and `humanizer` loaded and recorded in `.hunter/external-skill-usage.json`.

## One Product Sentence

A research lead uses Memory Will to turn a killed predecessor agent into a scoped Walrus receipt that a cold successor can reopen.

## Scene

- User: research or product lead
- Situation: an agent holds useful work, but the next agent must inherit only approved memory.
- Pain / pressure: a normal handoff either loses context or leaks restricted notes.
- First action: click `Kill Agent`.
- Visible result: the predecessor dies, local context drops to 0%, and the will writer opens.
- Inspectable artifact: Memory Will Receipt with Walrus blob id, Sui object id, redactions, replay trace, and output hash.
- Number / threshold: the hero loop completes in the public audit across 5 targets and 40 user actions.
- Real limitation: a failed Walrus read returns no-success instead of a handoff.
- Next milestone: replace the temporary tunnel with a stable deployment URL before final judging.

## Vocabulary

Use:
- Memory Will
- Cold successor
- Memory Will Receipt
- Walrus blob id
- Sui object id

Translate before public copy:
- `proof` -> receipt inspection
- `evidence` -> screenshot, runtime report, or receipt reopen path
- `claim matrix` -> verified runtime report

Do not use in public copy:
- Internal audit jargon
- Generic AI brochure language
- Binary contrast slogans
- Category-first hackathon framing
- Helper tooling names

Exact blocklist source: `scripts/lib/copy_rules.mjs`

## Public Surfaces

| Surface | First sentence | Artifact/link shown |
| --- | --- | --- |
| README | Kill one agent, write a scoped Walrus Memory Will, and reopen a cold successor with an inspectable receipt. | `.hunter/runtime-artifacts/g5-public-desktop-proof.png` |
| Slide 1 | A killed agent leaves a scoped Walrus receipt. | Memory Will Receipt |
| Narration first line | A reviewer clicks Kill Agent and gets a Memory Will receipt with a Walrus blob id. | Live workbench and receipt |
| Submission tagline | Click Kill Agent and reopen scoped Walrus memory by receipt. | Live URL and `/?will=latest` |

## Decision

Decision: PASS
