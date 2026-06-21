# Submission Draft

## Project

Memory Will

## One-Line Description

A judge kills a predecessor agent, writes a scoped Memory Will to Walrus, and reopens a cold successor with a receipt that shows what memory survived.

## Tagline

Click Kill Agent and reopen scoped Walrus memory by receipt.

## Short Description

A judge kills a predecessor agent, writes allowed memory to Walrus, opens a cold successor, and inspects the receipt, redactions, replay trace, and Sui object id.

## Track

Sui Overflow 2026 - Special - Walrus

## Live URL

https://memory-will-walrus-special.veithly.workers.dev

## Demo Path

1. Open the live URL.
2. Click `Kill Agent`.
3. Choose a successor role and leave restricted memory blocked.
4. Click `Write Memory Will`.
5. After `Walrus pointer certified`, click `Open Cold Successor`.
6. Click `Open Receipt` and `Inspect Proof`.
7. Open `/?will=latest` in a second browser context to verify receipt reopen.

## What It Does

Memory Will turns agent handoff into an inheritance event. The user kills a live predecessor, chooses which memory scopes can survive, writes the will to Walrus, then opens a cold successor that can only use the restored scopes. The result is a receipt with the Walrus blob id, Sui object id, redactions, replay trace, and live successor output hash.

## How It Uses Walrus And Sui

- Walrus Publisher stores the Memory Will JSON before restore is enabled.
- Walrus Aggregator is read during successor restore. If the blob cannot be read, the app shows no-success instead of a fake handoff.
- The proof panel reads the Walrus blob and Sui object metadata so a judge can inspect the storage anchor.
- A Sui Move receipt registry is included under `move/`. It can publish `MemoryWillAnchor` objects with the Memory Will id, Walrus blob id, Walrus object id, checkpoint hash, policy hash, redaction hash, and successor role. The submitted P0 does not auto-sign transactions; it reports the registry as built/not published unless a package id and server signer are configured.

## What Is Real Today

- Public workbench at the live URL.
- Real Walrus write/read path in `src/lib/memory-will/walrus.ts`.
- Real Sui Move registry source in `move/sources/memory_will_registry.move`.
- Live model successor output recorded in `.hunter/agent-runs.json`.
- Second-browser receipt reopen at `/?will=latest`.
- Missing receipt recovery path that shows no-success and returns to a fresh run.
- Public runtime report: `.hunter/runtime-interaction.report.json`.
- Pitch deck: `projects/pitch/ppt-master/memory-will-deck_ppt169_20260621/exports/memory-will-deck_20260621_232345.pptx`.
- Demo video: https://youtu.be/JY0_hyjtelM.

## Verification

- `pnpm typecheck`
- `pnpm build`
- `pnpm sui:build`
- `pnpm sui:test`
- `node C:\Users\Ricky\Documents\Project\hackathonhunter-skill\scripts\audit_runtime_interaction.mjs . --plan .hunter\runtime-interaction.plan.json --url https://memory-will-walrus-special.veithly.workers.dev`
- `node C:\Users\Ricky\Documents\Project\hackathonhunter-skill\scripts\audit_project.mjs . --phase feature-density,claims,runtime,realness,agent-realness`

## Known Limits

- The live URL is deployed on Cloudflare Workers for final judging.
- Hosted video is available at https://youtu.be/JY0_hyjtelM; hosted deck URL still needs the final platform upload field or a stable file URL.

## Fields To Fill Before Final Submit

- Repo URL: https://github.com/veithly/memory-will-walrus-special
- Video URL: https://youtu.be/JY0_hyjtelM
- Deck URL: local file ready at `projects/pitch/ppt-master/memory-will-deck_ppt169_20260621/exports/memory-will-deck_20260621_232345.pptx`
- Team/member profile fields:
- Final form confirmation from the user:
