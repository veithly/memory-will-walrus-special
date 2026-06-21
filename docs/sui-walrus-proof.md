# Sui and Walrus proof path

Memory Will uses Walrus on the live P0 path and keeps a Sui Move receipt registry ready for a published testnet anchor.

## P0 path in the demo

1. `POST /api/memory-wills` locks the predecessor checkpoint and writes the Memory Will payload to the Walrus Publisher API.
2. The app stores the returned Walrus blob id and Walrus Sui object id.
3. `POST /api/successor/restore` reads the Walrus blob through the Aggregator before it runs the cold successor.
4. `GET /api/proof/[willId]` reads the Walrus blob again and uses Sui JSON-RPC to inspect the returned Walrus object metadata.

If the Walrus write or read fails, the UI returns a no-success state and the successor does not run.

## Move registry

The Move package lives in `move/`.

```powershell
pnpm sui:build
pnpm sui:test
```

The package defines `memory_will_registry::registry::create_anchor`. It creates a `MemoryWillAnchor` object with:

- Memory Will id
- Walrus blob id
- Walrus object id
- checkpoint hash
- policy hash
- redaction hash
- successor role

The contract does not store private Memory Will text. The payload stays in Walrus and the app enforces redactions before successor restore.

## Publishing boundary

Publishing the package or executing an anchor transaction writes to Sui testnet and consumes gas. The repo includes the Move code and TypeScript transaction builder, but it does not auto-publish or auto-sign from the public demo.

To enable the optional anchor path after human approval:

1. Publish `move/` to Sui testnet.
2. Set `MEMORY_WILL_REGISTRY_PACKAGE_ID` to the published package id.
3. Set `SUI_TESTNET_PAYER_PRIVATE_KEY` only in server secrets.
4. Route anchor execution through `executeMemoryWillAnchor` in `src/lib/memory-will/sui-anchor.ts`.

The current submitted proof surface truthfully shows Walrus write/read and Sui object metadata inspection. If the Move registry is not published, the proof panel reports "Built, not published" instead of claiming a transaction.
