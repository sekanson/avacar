import { NextRequest, NextResponse } from "next/server";
import { detectVehicle } from "@/lib/utils/claude";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, mimeType } = body;

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const result = await detectVehicle(imageBase64, mimeType || "image/jpeg");
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Vehicle detection error:", error);
    // Return fallback if Claude fails
    return NextResponse.json({
      success: true,
      data: {
        make: "Unknown",
        model: "Unknown",
        year: 2022,
        color: "Unknown",
        bodyType: "Sedan",
        confidence: 30,
      },
    });
  }
}
