import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import { hashText } from "./store";
import type { MemoryWillRecord } from "./types";

type AnchorStatus =
  | {
      status: "ready";
      packageId: string;
      digest: string;
      message: string;
    }
  | {
      status: "degraded";
      packageId: string;
      digest: "";
      message: string;
    };

function packageId() {
  return process.env.MEMORY_WILL_REGISTRY_PACKAGE_ID?.trim() ?? "";
}

function signer() {
  const secret = process.env.SUI_TESTNET_PAYER_PRIVATE_KEY;
  return secret ? Ed25519Keypair.fromSecretKey(secret) : null;
}

function bytes(value: string) {
  return Array.from(Buffer.from(value, "utf8"));
}

export function contractAnchorReadiness(): AnchorStatus {
  const id = packageId();
  if (!id) {
    return {
      status: "degraded",
      packageId: "",
      digest: "",
      message: "Move registry package is built locally but MEMORY_WILL_REGISTRY_PACKAGE_ID is not configured."
    };
  }
  if (!signer()) {
    return {
      status: "degraded",
      packageId: id,
      digest: "",
      message: "Move registry package is configured, but no server signer is configured for anchor transactions."
    };
  }
  return {
    status: "ready",
    packageId: id,
    digest: "",
    message: "Move registry package and server signer are configured for receipt anchor transactions."
  };
}

export function buildMemoryWillAnchorTransaction(will: MemoryWillRecord) {
  if (!will.pointer) throw new Error("Cannot anchor a Memory Will without a Walrus pointer.");
  const id = packageId();
  if (!id) throw new Error("MEMORY_WILL_REGISTRY_PACKAGE_ID is not configured.");

  const tx = new Transaction();
  tx.moveCall({
    target: `${id}::registry::create_anchor`,
    arguments: [
      tx.pure.vector("u8", bytes(will.willId)),
      tx.pure.vector("u8", bytes(will.pointer.blobId)),
      tx.pure.vector("u8", bytes(will.pointer.objectId)),
      tx.pure.vector("u8", bytes(hashText(JSON.stringify(will.checkpoint)))),
      tx.pure.vector("u8", bytes(hashText(JSON.stringify(will.policy)))),
      tx.pure.vector("u8", bytes(hashText(JSON.stringify(will.redactions)))),
      tx.pure.vector("u8", bytes(will.policy.role))
    ]
  });
  return tx;
}

export async function executeMemoryWillAnchor(will: MemoryWillRecord, client: {
  signAndExecuteTransaction: (input: {
    signer: Ed25519Keypair;
    transaction: Transaction;
    options?: { showEffects?: boolean; showObjectChanges?: boolean; showEvents?: boolean };
  }) => Promise<{ digest: string }>;
}): Promise<AnchorStatus> {
  const keypair = signer();
  const id = packageId();
  if (!id || !keypair) return contractAnchorReadiness();

  const tx = buildMemoryWillAnchorTransaction(will);
  const result = await client.signAndExecuteTransaction({
    signer: keypair,
    transaction: tx,
    options: {
      showEffects: true,
      showObjectChanges: true,
      showEvents: true
    }
  });

  return {
    status: "ready",
    packageId: id,
    digest: result.digest,
    message: `Memory Will anchor transaction executed for ${will.willId}.`
  };
}
