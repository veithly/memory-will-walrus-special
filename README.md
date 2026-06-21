# Memory Will

Kill one agent, write a scoped Walrus Memory Will, and reopen a cold successor with an inspectable receipt.

![Memory Will receipt proof](.hunter/runtime-artifacts/g5-public-desktop-proof.png)

## Try It In 60 Seconds

- Live URL: https://memory-will-walrus-special.veithly.workers.dev
- Demo path: click `Kill Agent`, choose a successor role, click `Write Memory Will`, click `Open Cold Successor`, then open the receipt and `Inspect Proof`.
- Reopen path: `/?will=latest`

## First Click

Click `Kill Agent`. The live checkpoint becomes a dead predecessor, local context drops to 0%, and the scoped inheritance step opens.

## What It Does

- Input: a live task checkpoint with shareable memory, restricted memory, source notes, and a selected successor role.
- Action: the user kills the predecessor agent, scopes what can survive, writes the Memory Will to Walrus, and opens a cold successor.
- Result artifact: a Memory Will Receipt with Walrus blob id, Walrus/Sui object id, redactions, replay trace, role-specific successor output, and proof status.
- How to inspect: open the receipt, click `Inspect Proof`, or load `/?will=latest` in a second browser context.

## How It Works

- Walrus: `POST /api/memory-wills` writes the Memory Will JSON through the Walrus Publisher HTTP API before restore is enabled.
- Walrus read gate: `POST /api/successor/restore` reads the Walrus blob with strict consistency and bounded backoff before any successor output appears.
- Agent: `src/lib/memory-will/agent.ts` calls an OpenAI-compatible chat completion provider and records live run evidence in `.hunter/agent-runs.json`.
- Sui proof: `src/app/api/proof/[willId]/route.ts` reads the Walrus blob and Sui object metadata for the proof panel.
- Move registry: `move/` contains a Sui Move `MemoryWillAnchor` package and `src/lib/memory-will/sui-anchor.ts` builds the optional anchor transaction. The public demo reports it as built/not published unless a package id and server signer are configured.
- Local state: `.memory-will/state.json` keeps the demo workspace and receipt history. It does not replace the Walrus read gate.

## Key Files

- `src/app/memory-will-workbench.tsx` - workbench UI, kill flow, scope controls, restore states, receipt, proof rail.
- `src/lib/memory-will/walrus.ts` - Walrus write/read adapter.
- `src/lib/memory-will/store.ts` - workspace, checkpoint, receipt, redaction, and replay records.
- `src/lib/memory-will/sui-proof.ts` - Sui object metadata inspection.
- `move/sources/memory_will_registry.move` - Sui Move receipt registry for published anchor objects.
- `docs/sui-walrus-proof.md` - exact Walrus, Sui object, and optional Move registry proof path.
- `.hunter/runtime-interaction.report.json` - public browser audit with desktop, mobile, reload, and second-context checks.
- `.hunter/claim-matrix.json` - claim-to-proof map for public copy.

## Verified Proof

- Public runtime audit: 5/5 targets, Chromium/Firefox/WebKit, mobile included, 40 user actions, reload assertion, second browser context, 0 console errors, 0 failed requests.
- Desktop proof screenshot: `.hunter/runtime-artifacts/g5-public-desktop-proof.png`
- Mobile proof screenshot: `.hunter/runtime-artifacts/g5-public-mobile-proof.png`
- Full report: `.hunter/runtime-interaction.report.json`

## Pitch Artifacts

- Pitch deck: `projects/pitch/ppt-master/memory-will-deck_ppt169_20260621/exports/memory-will-deck_20260621_232345.pptx`
- Demo video: `artifacts/video/memory-will-demo-final.mp4`
- Video QA contact sheet: `artifacts/video/qa/final-contact-sheet.jpg`

## Limits

- The live demo depends on configured Walrus publisher/aggregator endpoints and a live OpenAI-compatible model provider.
- Walrus reads can briefly return `404` after certification, so restore uses strict consistency and bounded retry. A failed read still returns a no-success state.
- The current public URL is a temporary tunnel. Use a stable deployment URL before final judging.

## Run Locally

```powershell
pnpm install
pnpm sui:build
pnpm sui:test
pnpm build
pnpm start --port 4393
```

Set Walrus publisher/aggregator, an OpenAI-compatible chat provider, and optional Sui testnet RPC as local or deployment secrets. Do not commit secrets.
