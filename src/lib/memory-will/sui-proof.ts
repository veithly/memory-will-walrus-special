import { getJsonRpcFullnodeUrl, SuiJsonRpcClient } from "@mysten/sui/jsonRpc";
import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { Transaction } from "@mysten/sui/transactions";
import type { WalrusPointer } from "./types";

function client() {
  return new SuiJsonRpcClient({
    url: process.env.SUI_TESTNET_RPC_URL || getJsonRpcFullnodeUrl("testnet"),
    network: "testnet"
  });
}

export async function inspectWalrusSuiObject(pointer: WalrusPointer | null) {
  if (!pointer?.objectId) {
    return {
      status: "degraded" as const,
      object: null,
      message: "No Walrus Sui object id is available for inspection."
    };
  }

  const object = await client().getObject({
    id: pointer.objectId,
    options: {
      showContent: false,
      showDisplay: false,
      showOwner: true,
      showPreviousTransaction: true,
      showStorageRebate: true,
      showType: true
    }
  });

  return {
    status: object.error ? ("error" as const) : ("ready" as const),
    object,
    message: object.error ? object.error.code : "Sui object metadata read."
  };
}

export async function signAndExecuteWalrusReceiptAnchor(params: {
  digest: string;
  pointer: WalrusPointer;
}) {
  const secret = process.env.SUI_TESTNET_PAYER_PRIVATE_KEY;
  if (!secret) {
    return {
      status: "degraded" as const,
      digest: "",
      message: "Sui signer is not configured; Walrus object inspection remains the proof path."
    };
  }

  const signer = Ed25519Keypair.fromSecretKey(secret);
  const tx = new Transaction();
  tx.setSenderIfNotSet(signer.toSuiAddress());
  tx.setGasBudget(1_000_000);

  const result = await client().signAndExecuteTransaction({
    signer,
    transaction: tx,
    options: {
      showEffects: true,
      showObjectChanges: true
    }
  });

  return {
    status: "ready" as const,
    digest: result.digest,
    message: `Receipt anchor attempt completed for ${params.pointer.objectId} with input digest ${params.digest}.`
  };
}
