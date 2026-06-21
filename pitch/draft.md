# Pitch Draft: Memory Will

## Deck Mode Decision

- mode: online-combined
- why this mode: judges need the live result and the receipt inspection path in one short story.
- slides included: result, pressure, product run, mechanism, try and inspect.
- slide deliberately removed: market map.
- form/audience reason for any slide count change: keep the first review under three minutes.
- project language: English
- language source / override: Sui Overflow public event page and `stack.lock.json`.

## Slide Inventory

| Slide | Job | Judge belief | Real artifact shown | Keep/cut |
|---|---|---|---|---|
| 1 | Open with the result | A killed agent can leave a scoped receipt. | Desktop proof screenshot | Keep |
| 2 | Name the pressure | Agent handoff needs memory and restraint at the same time. | Allowed vs unavailable memory panels | Keep |
| 3 | Show the product run | The judge can run kill, write, restore, and inspect. | Public workbench | Keep |
| 4 | Explain the mechanism | Walrus is on the restore path, not decoration. | Blob id, Sui object id, route paths | Keep |
| 5 | Ask the judge to try it | The reviewer has one URL and one receipt path. | Live URL and `/?will=latest` | Keep |

## Slide 1: Killed Agent, Scoped Receipt

**Job:** Open with the result.
**Judge belief:** Memory Will has a concrete artifact, not a chat answer.
**Visual:** `.hunter/runtime-artifacts/g5-public-desktop-proof.png`
**Spoken:** "A research lead kills the predecessor agent and gets a Memory Will receipt with a Walrus blob id."
**Artifact on screen:** Memory Will Receipt

## Slide 2: Handoff Without Leakage

**Job:** Make the pressure concrete.
**Judge belief:** The product solves a real handoff tension.
**Screen:** allowed memory beside unavailable memory.
**Spoken:** "The next agent needs the work, but not the private budget or unverified notes."

## Slide 3: Product Run

**Job:** Let the workbench carry the middle.
**Judge belief:** The app runs from a fresh browser.
**Visual:** public workbench.
**Caption:** Kill Agent -> Write Memory Will -> Open Cold Successor -> Inspect Proof.
**Spoken intro:** "Start with Kill Agent."
**Spoken outro:** "The result lands as a receipt, and it opens again at `/?will=latest`."

## Slide 4: Walrus Is The Gate

**Job:** Explain why the result is real.
**Judge belief:** Restore depends on Walrus read success.
**Visual:** write route, restore route, proof route.
**Spoken:** "`/api/memory-wills` writes the will to Walrus. `/api/successor/restore` reads the blob before the successor answers. `/api/proof/[willId]` reads Walrus and Sui object metadata."
**Inspection path:** `.hunter/runtime-interaction.report.json`

## Slide 5: Try It, Then Inspect It

**Job:** End with one action.
**Judge belief:** The reviewer can operate the product without builder help.
**Closing screen:** Live URL plus receipt card.
**Demo:** https://memory-will-walrus-special.veithly.workers.dev
**Repo:** add final repository URL before submit.
**Inspect:** `/?will=latest`
**Looking for:** sponsor-track review on whether the Memory Will pattern is a strong Walrus use case.
**Spoken:** "Try Kill Agent, then inspect the receipt."
