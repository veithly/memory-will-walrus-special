import { NextResponse } from "next/server";
import { contractAnchorReadiness } from "@/lib/memory-will/sui-anchor";
import { inspectWalrusSuiObject } from "@/lib/memory-will/sui-proof";
import { getMemoryWill } from "@/lib/memory-will/store";
import { readMemoryWillFromWalrus } from "@/lib/memory-will/walrus";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ willId: string }> }
) {
  const { willId } = await params;
  const will = await getMemoryWill(willId);
  if (!will) return NextResponse.json({ error: "Memory Will not found.", noSuccess: true }, { status: 404 });

  if (!will.pointer) {
    return NextResponse.json({
      proof: {
        willId: will.willId,
        readStatus: "degraded",
        pointer: null,
        walrusObject: null,
        suiObject: null,
        contractAnchor: contractAnchorReadiness(),
        checkedAt: new Date().toISOString(),
        message: will.errorMessage || "No Walrus pointer is available."
      }
    });
  }

  let walrusObject: unknown = null;
  let sui: {
    status: "ready" | "degraded" | "error";
    object: unknown;
    message: string;
  };
  try {
    walrusObject = await readMemoryWillFromWalrus(will.pointer, {
      attempts: 6,
      initialDelayMs: 750,
      maxDelayMs: 4000
    });
    sui = await inspectWalrusSuiObject(will.pointer);
  } catch (err) {
    sui = {
      status: "error",
      object: null,
      message: err instanceof Error ? err.message : "Walrus or Sui proof read failed."
    };
  }
  return NextResponse.json({
    proof: {
      willId: will.willId,
      readStatus: sui.status,
      pointer: will.pointer,
      walrusObject,
      suiObject: sui.object,
      contractAnchor: contractAnchorReadiness(),
      checkedAt: new Date().toISOString(),
      message: sui.message
    }
  });
}
