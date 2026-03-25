import { NextRequest, NextResponse } from "next/server";
import { mockShops } from "@/lib/data/shops";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const service = searchParams.get("service");

  let shops = [...mockShops];

  if (service) {
    shops = shops.filter((s) =>
      s.services.includes(service as "wrap" | "wheel" | "tint" | "ppf" | "bodykit" | "accessory")
    );
  }

  // Sort by distance
  shops.sort((a, b) => (a.distanceKm ?? 999) - (b.distanceKm ?? 999));

  return NextResponse.json({ success: true, data: shops });
}
