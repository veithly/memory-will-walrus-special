# Memory Will deck source

## Project

Memory Will

## Track

Sui Overflow 2026, Special - Walrus.

## One-line story

A judge kills a predecessor agent, writes a scoped Memory Will to Walrus, and reopens a cold successor from the receipt.

## Demo path

1. Open the live URL.
2. Click `Kill Agent`.
3. Choose a successor role and keep restricted memory blocked.
4. Click `Write Memory Will`.
5. Wait for `Walrus pointer certified`.
6. Click `Open Cold Successor`.
7. Open the receipt and click `Inspect Proof`.
8. Reopen `/?will=latest` in a second browser context.

## First-screen belief

The reviewer should understand the product in one sentence: kill an AI task and let the next one inherit only approved durable memory.

## Why this is a Walrus project

Walrus is on the restore path. `POST /api/memory-wills` writes the Memory Will JSON through the Walrus Publisher API before restore is enabled. `POST /api/successor/restore` reads the Walrus blob through the Aggregator before any successor output appears. If Walrus write or read fails, the app returns a no-success state instead of pretending the handoff worked.

## Sui proof path

The proof panel reads Sui object metadata for the Walrus object id returned by the write path. The repo also includes a Sui Move package under `move/` with a `MemoryWillAnchor` object:

- Memory Will id
- Walrus blob id
- Walrus object id
- checkpoint hash
- policy hash
- redaction hash
- successor role

The Move package builds and tests locally. It is not claimed as published unless `MEMORY_WILL_REGISTRY_PACKAGE_ID` and a server signer are configured.

## Verified commands

- `pnpm build`: passed
- `pnpm typecheck`: passed after sequential rerun
- `pnpm sui:build`: passed
- `pnpm sui:test`: passed, 1 Move test

## Real artifacts to show

- Desktop runtime screenshot: `.hunter/runtime-artifacts/g5-public-desktop-proof.png`
- Mobile runtime screenshot: `.hunter/runtime-artifacts/g5-public-mobile-proof.png`
- Runtime report: `.hunter/runtime-interaction.report.json`
- Proof doc: `docs/sui-walrus-proof.md`
- Move source: `move/sources/memory_will_registry.move`
- Walrus adapter: `src/lib/memory-will/walrus.ts`
- Sui proof: `src/lib/memory-will/sui-proof.ts`
- Sui anchor builder: `src/lib/memory-will/sui-anchor.ts`

## Slide spine

1. Killed agent, scoped receipt.
2. Handoff without leakage.
3. Product run: kill, write, restore, inspect.
4. Walrus is the gate.
5. Sui and Move proof boundary.
6. Try it, then inspect it.

## Claims to avoid

- Do not claim the Move registry is published unless a package id exists.
- Do not claim every Memory Will is user-owned on Sui in the P0.
- Do not claim a browser wallet transaction exists.
- Do not call local state the source of restore truth.

