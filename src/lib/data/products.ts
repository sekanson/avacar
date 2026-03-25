import type { Product, ProductCategory } from "@/lib/types";

// Gradient colors for product thumbnails (used as CSS backgrounds)
export const categoryColors: Record<ProductCategory, string> = {
  wrap: "#44CCFF",
  wheel: "#A78BFA",
  tint: "#6B7280",
  ppf: "#34D399",
  bodykit: "#F97316",
  accessory: "#EC4899",
};

export const mockProducts: Product[] = [
  // WRAPS
  { id: "w1", category: "wrap", name: "3M 1080 Matte Black", brandName: "3M", thumbnailUrl: "", priceMin: 120000, priceMax: 250000, metadata: { color_hex: "#1a1a1a", finish: "Matte" }, tags: ["matte", "black", "popular"] },
  { id: "w2", category: "wrap", name: "Gloss White Pearl", brandName: "Avery Dennison", thumbnailUrl: "", priceMin: 110000, priceMax: 230000, metadata: { color_hex: "#f5f5f5", finish: "Gloss" }, tags: ["gloss", "white", "clean"] },
  { id: "w3", category: "wrap", name: "Satin Gold Chrome", brandName: "3M", thumbnailUrl: "", priceMin: 140000, priceMax: 290000, metadata: { color_hex: "#d4a017", finish: "Satin" }, tags: ["satin", "gold", "premium"] },
  { id: "w4", category: "wrap", name: "Brushed Steel", brandName: "Avery Dennison", thumbnailUrl: "", priceMin: 155000, priceMax: 310000, metadata: { color_hex: "#8a8a9a", finish: "Brushed" }, tags: ["brushed", "metal", "silver"] },
  { id: "w5", category: "wrap", name: "Gloss Flip Psychedelic", brandName: "3M", thumbnailUrl: "", priceMin: 180000, priceMax: 370000, metadata: { color_hex: "#6644cc", finish: "Gloss Flip" }, tags: ["flip", "color-shift", "unique"] },
  { id: "w6", category: "wrap", name: "Matte Firethorn Red", brandName: "Avery Dennison", thumbnailUrl: "", priceMin: 115000, priceMax: 240000, metadata: { color_hex: "#8b1a1a", finish: "Matte" }, tags: ["matte", "red", "aggressive"] },

  // WHEELS
  { id: "wh1", category: "wheel", name: "VF Series V10-S 20\"", brandName: "Vossen", thumbnailUrl: "", priceMin: 280000, priceMax: 480000, metadata: { diameter: 20, finish: "Gloss Black", weight: 22 }, tags: ["20inch", "concave", "gloss-black"] },
  { id: "wh2", category: "wheel", name: "RS312 Forged 19\"", brandName: "HRE", thumbnailUrl: "", priceMin: 450000, priceMax: 700000, metadata: { diameter: 19, finish: "Polished Silver", weight: 18 }, tags: ["19inch", "forged", "lightweight"] },
  { id: "wh3", category: "wheel", name: "3SDM 0.06 18\"", brandName: "3SDM", thumbnailUrl: "", priceMin: 180000, priceMax: 320000, metadata: { diameter: 18, finish: "Silver/Cut", weight: 23 }, tags: ["18inch", "split-spoke"] },
  { id: "wh4", category: "wheel", name: "Classico C110 19\"", brandName: "Rotiform", thumbnailUrl: "", priceMin: 220000, priceMax: 420000, metadata: { diameter: 19, finish: "Matte Black", weight: 21 }, tags: ["19inch", "classic", "matte-black"] },
  { id: "wh5", category: "wheel", name: "BBS LM-R 20\"", brandName: "BBS", thumbnailUrl: "", priceMin: 380000, priceMax: 600000, metadata: { diameter: 20, finish: "Gold", weight: 19 }, tags: ["20inch", "gold", "motorsport"] },
  { id: "wh6", category: "wheel", name: "CV10T Tinted Gloss 19\"", brandName: "Vossen", thumbnailUrl: "", priceMin: 260000, priceMax: 440000, metadata: { diameter: 19, finish: "Tinted Gloss", weight: 20 }, tags: ["19inch", "concave"] },

  // TINT
  { id: "t1", category: "tint", name: "Crystalline Series 70%", brandName: "3M", thumbnailUrl: "", priceMin: 45000, priceMax: 95000, metadata: { vlt: 70, type: "Ceramic" }, tags: ["ceramic", "clear", "UV-block"] },
  { id: "t2", category: "tint", name: "Prime XR Black 35%", brandName: "XPEL", thumbnailUrl: "", priceMin: 55000, priceMax: 120000, metadata: { vlt: 35, type: "Carbon" }, tags: ["carbon", "dark", "heat-rejection"] },
  { id: "t3", category: "tint", name: "ATC Nano-Ceramic 20%", brandName: "LLumar", thumbnailUrl: "", priceMin: 40000, priceMax: 90000, metadata: { vlt: 20, type: "Nano-Ceramic" }, tags: ["nano", "dark", "privacy"] },
  { id: "t4", category: "tint", name: "Pinnacle Series 50%", brandName: "Avery Dennison", thumbnailUrl: "", priceMin: 50000, priceMax: 110000, metadata: { vlt: 50, type: "Premium" }, tags: ["balanced", "light", "premium"] },

  // PPF
  { id: "p1", category: "ppf", name: "ULTIMATE Plus Self-Healing", brandName: "XPEL", thumbnailUrl: "", priceMin: 200000, priceMax: 450000, metadata: { coverage: "Full Front", selfHealing: true }, tags: ["self-healing", "full-front", "premium"] },
  { id: "p2", category: "ppf", name: "Pro Series Clear Bra", brandName: "3M", thumbnailUrl: "", priceMin: 150000, priceMax: 380000, metadata: { coverage: "Partial Front", selfHealing: false }, tags: ["clear", "partial", "entry"] },
  { id: "p3", category: "ppf", name: "Platinum Shield Full Body", brandName: "XPEL", thumbnailUrl: "", priceMin: 400000, priceMax: 900000, metadata: { coverage: "Full Body", selfHealing: true }, tags: ["full-body", "ultimate", "luxury"] },
  { id: "p4", category: "ppf", name: "SunTek Reaction", brandName: "SunTek", thumbnailUrl: "", priceMin: 180000, priceMax: 420000, metadata: { coverage: "Hood + Fenders", selfHealing: true }, tags: ["mid-range", "front-end"] },

  // BODY KITS
  { id: "b1", category: "bodykit", name: "Widebody Aero Kit", brandName: "Rocket Bunny", thumbnailUrl: "", priceMin: 350000, priceMax: 800000, metadata: { material: "FRP", style: "Wide Body" }, tags: ["widebody", "aggressive", "street"] },
  { id: "b2", category: "bodykit", name: "GT Splitter Package", brandName: "Voltex", thumbnailUrl: "", priceMin: 180000, priceMax: 420000, metadata: { material: "Carbon Fiber", style: "Track" }, tags: ["carbon", "track", "spoiler"] },
  { id: "b3", category: "bodykit", name: "Euro Skirts & Lip", brandName: "Maxton Design", thumbnailUrl: "", priceMin: 85000, priceMax: 200000, metadata: { material: "ABS", style: "Euro" }, tags: ["euro", "subtle", "affordable"] },
  { id: "b4", category: "bodykit", name: "Full Aero Package", brandName: "TRD", thumbnailUrl: "", priceMin: 280000, priceMax: 550000, metadata: { material: "ABS/Carbon", style: "OEM+" }, tags: ["oem-plus", "factory-fit"] },

  // ACCESSORIES
  { id: "a1", category: "accessory", name: "Blackout Badge Delete", brandName: "3M", thumbnailUrl: "", priceMin: 8000, priceMax: 20000, metadata: { material: "Vinyl", type: "Badge" }, tags: ["blackout", "badges", "subtle"] },
  { id: "a2", category: "accessory", name: "Carbon Mirror Caps", brandName: "Genuine Parts", thumbnailUrl: "", priceMin: 25000, priceMax: 65000, metadata: { material: "Carbon Fiber", type: "Mirror" }, tags: ["carbon", "mirrors", "trim"] },
  { id: "a3", category: "accessory", name: "Performance Exhaust Tips", brandName: "Akrapovič", thumbnailUrl: "", priceMin: 45000, priceMax: 120000, metadata: { material: "Titanium", type: "Exhaust" }, tags: ["exhaust", "titanium", "performance"] },
  { id: "a4", category: "accessory", name: "LED Interior Kit", brandName: "Diode Dynamics", thumbnailUrl: "", priceMin: 18000, priceMax: 45000, metadata: { material: "LED", type: "Interior" }, tags: ["led", "interior", "ambient"] },
];

export const mockBrands = [
  { id: "b1", name: "3M", category: "wrap" as ProductCategory },
  { id: "b2", name: "Avery Dennison", category: "wrap" as ProductCategory },
  { id: "b3", name: "XPEL", category: "ppf" as ProductCategory },
  { id: "b4", name: "Vossen", category: "wheel" as ProductCategory },
  { id: "b5", name: "HRE", category: "wheel" as ProductCategory },
  { id: "b6", name: "Rotiform", category: "wheel" as ProductCategory },
  { id: "b7", name: "BBS", category: "wheel" as ProductCategory },
  { id: "b8", name: "LLumar", category: "tint" as ProductCategory },
  { id: "b9", name: "Rocket Bunny", category: "bodykit" as ProductCategory },
];

export function getProductsByCategory(category: ProductCategory): Product[] {
  return mockProducts.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getBrandsByCategory(category: ProductCategory): string[] {
  const brands = mockProducts.filter((p) => p.category === category).map((p) => p.brandName);
  return brands.filter((brand, idx) => brands.indexOf(brand) === idx);
}
