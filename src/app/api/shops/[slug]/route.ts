import { NextRequest, NextResponse } from "next/server";
import { getShopBySlug, mockReviews } from "@/lib/data/shops";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const shop = getShopBySlug(params.slug);

  if (!shop) {
    return NextResponse.json({ error: "Shop not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: { ...shop, reviews: mockReviews },
  });
}
