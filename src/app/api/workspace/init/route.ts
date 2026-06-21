import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { createWorkspace } from "@/lib/memory-will/store";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("mw_session_id")?.value;
  const ownerSessionId = existing || `session_${randomUUID().slice(0, 12)}`;
  if (!existing) {
    cookieStore.set("mw_session_id", ownerSessionId, {
      sameSite: "lax",
      httpOnly: true,
      path: "/"
    });
  }
  const workspace = await createWorkspace(ownerSessionId);
  return NextResponse.json({ workspace });
}
