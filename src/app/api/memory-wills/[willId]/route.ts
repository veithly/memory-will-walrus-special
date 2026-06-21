import { NextResponse } from "next/server";
import { getMemoryWill, getReceipt } from "@/lib/memory-will/store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ willId: string }> }
) {
  const { willId } = await params;
  const will = await getMemoryWill(willId);
  const receipt = await getReceipt(willId);
  if (!will || !receipt) {
    return NextResponse.json({ error: "Memory Will receipt not found.", noSuccess: true }, { status: 200 });
  }
  return NextResponse.json({ will, receipt });
}
