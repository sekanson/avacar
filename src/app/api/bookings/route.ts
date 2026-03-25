import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const confirmationCode =
      "AVC-" + Math.random().toString(36).slice(2, 6).toUpperCase();

    const booking = {
      id: Math.random().toString(36).slice(2),
      ...body,
      confirmationCode,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    };

    // In production, this saves to Supabase
    return NextResponse.json({ success: true, data: booking });
  } catch {
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}

export async function GET() {
  // In production, fetch user's bookings from Supabase
  return NextResponse.json({ success: true, data: [] });
}
