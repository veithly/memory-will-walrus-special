import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { getMemoryWillKv } from "@/lib/memory-will/cloudflare";

export const dynamic = "force-dynamic";

export async function GET() {
  const kv = getMemoryWillKv();
  if (kv) {
    const raw = await kv.get("agent-runs.json", "text");
    return NextResponse.json(raw ? JSON.parse(raw) : { runs: [] });
  }
  const path = join(process.cwd(), ".hunter", "agent-runs.json");
  if (!existsSync(path)) return NextResponse.json({ runs: [] });
  return NextResponse.json(JSON.parse(await readFile(path, "utf8")));
}
