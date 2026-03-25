import { NextResponse } from "next/server";

export async function GET() {
  // Sprint 1: return empty feed
  // Sprint 2: this will query Supabase for posts
  return NextResponse.json({
    success: true,
    data: [],
    message: "Social feed coming in Sprint 2",
  });
}
