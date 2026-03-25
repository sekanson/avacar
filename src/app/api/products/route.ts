import { NextRequest, NextResponse } from "next/server";
import { mockProducts } from "@/lib/data/products";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const q = searchParams.get("q");

  let products = [...mockProducts];

  if (category) {
    products = products.filter((p) => p.category === category);
  }
  if (brand) {
    products = products.filter(
      (p) => p.brandName.toLowerCase() === brand.toLowerCase()
    );
  }
  if (q) {
    const query = q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brandName.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({ success: true, data: products });
}
