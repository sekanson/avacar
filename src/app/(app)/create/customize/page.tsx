"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ArrowRight, Check } from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";
import { cn } from "@/lib/utils/cn";
import type { ProductCategory } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface MockProduct {
  id: string;
  name: string;
  brandName: string;
  colorHex?: string;
  priceMin: number;
  priceMax: number;
  category: ProductCategory;
  tags?: string[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockProducts: Record<ProductCategory, MockProduct[]> = {
  wrap: [
    { id: "w1", name: "3M 2080 Satin Black", brandName: "3M", colorHex: "#1A1A1A", priceMin: 280000, priceMax: 350000, category: "wrap", tags: ["popular", "stealth"] },
    { id: "w2", name: "Avery Gloss White", brandName: "Avery Dennison", colorHex: "#F5F5F5", priceMin: 260000, priceMax: 330000, category: "wrap", tags: ["clean"] },
    { id: "w3", name: "Avery Satin Miami Blue", brandName: "Avery Dennison", colorHex: "#3B82F6", priceMin: 270000, priceMax: 340000, category: "wrap", tags: ["bold", "sport"] },
    { id: "w4", name: "Inozetek Army Green", brandName: "Inozetek", colorHex: "#4A5240", priceMin: 290000, priceMax: 370000, category: "wrap", tags: ["matte"] },
    { id: "w5", name: "3M 1080 Gloss Flip Psych", brandName: "3M", colorHex: "#6644CC", priceMin: 420000, priceMax: 550000, category: "wrap", tags: ["exotic", "shift"] },
    { id: "w6", name: "Avery Dennison Matte Red", brandName: "Avery Dennison", colorHex: "#CC2222", priceMin: 275000, priceMax: 345000, category: "wrap" },
  ],
  wheel: [
    { id: "wh1", name: "Vossen HF-5 20\"", brandName: "Vossen", colorHex: "#8A8A8A", priceMin: 250000, priceMax: 400000, category: "wheel", tags: ["flow-form"] },
    { id: "wh2", name: "HRE P101 19\"", brandName: "HRE", colorHex: "#C0C0C0", priceMin: 450000, priceMax: 700000, category: "wheel", tags: ["forged", "premium"] },
    { id: "wh3", name: "Rotiform LAS-R 20\"", brandName: "Rotiform", colorHex: "#222222", priceMin: 180000, priceMax: 280000, category: "wheel", tags: ["cast"] },
    { id: "wh4", name: "Vossen CV3-R 21\"", brandName: "Vossen", colorHex: "#1A1A1A", priceMin: 320000, priceMax: 500000, category: "wheel", tags: ["concave"] },
    { id: "wh5", name: "HRE FF21 20\"", brandName: "HRE", colorHex: "#D4A017", priceMin: 360000, priceMax: 580000, category: "wheel", tags: ["forged", "gold"] },
    { id: "wh6", name: "Rotiform TMB 18\"", brandName: "Rotiform", colorHex: "#8A8A8A", priceMin: 140000, priceMax: 220000, category: "wheel" },
  ],
  tint: [
    { id: "t1", name: "3M Ceramic IR 35%", brandName: "3M", priceMin: 45000, priceMax: 80000, category: "tint", tags: ["ceramic", "IR-block"] },
    { id: "t2", name: "XPEL Prime XR Plus", brandName: "XPEL", priceMin: 55000, priceMax: 95000, category: "tint", tags: ["nano-ceramic"] },
    { id: "t3", name: "LLumar FormulaOne Pinnacle", brandName: "LLumar", priceMin: 50000, priceMax: 85000, category: "tint", tags: ["ceramic"] },
    { id: "t4", name: "3M FX-ST 20%", brandName: "3M", priceMin: 35000, priceMax: 60000, category: "tint", tags: ["dyed"] },
    { id: "t5", name: "XPEL Prime CS 50%", brandName: "XPEL", priceMin: 40000, priceMax: 70000, category: "tint", tags: ["color-stable"] },
    { id: "t6", name: "Huper Optik Ceramic 40%", brandName: "Huper Optik", priceMin: 48000, priceMax: 82000, category: "tint", tags: ["ceramic", "UV"] },
  ],
  ppf: [
    { id: "p1", name: "XPEL Ultimate Plus", brandName: "XPEL", priceMin: 180000, priceMax: 300000, category: "ppf", tags: ["self-heal", "gloss"] },
    { id: "p2", name: "3M Pro Series", brandName: "3M", priceMin: 160000, priceMax: 270000, category: "ppf", tags: ["self-heal"] },
    { id: "p3", name: "LLumar Platinum", brandName: "LLumar", priceMin: 155000, priceMax: 260000, category: "ppf", tags: ["matte"] },
    { id: "p4", name: "XPEL Stealth Matte", brandName: "XPEL", priceMin: 200000, priceMax: 340000, category: "ppf", tags: ["matte", "premium"] },
    { id: "p5", name: "Stek DYNOshield", brandName: "Stek", priceMin: 175000, priceMax: 295000, category: "ppf", tags: ["gloss"] },
    { id: "p6", name: "SunTek Ultra", brandName: "SunTek", priceMin: 150000, priceMax: 250000, category: "ppf", tags: ["entry"] },
  ],
  bodykit: [
    { id: "bk1", name: "Varis Arising-II Full Kit", brandName: "Varis", priceMin: 850000, priceMax: 1500000, category: "bodykit", tags: ["carbon", "wide-body"] },
    { id: "bk2", name: "TRD Aero Package", brandName: "TRD", priceMin: 350000, priceMax: 600000, category: "bodykit", tags: ["OEM+", "spoiler"] },
    { id: "bk3", name: "Rocketbunny Front Lip", brandName: "Rocket Bunny", priceMin: 120000, priceMax: 200000, category: "bodykit", tags: ["JDM"] },
    { id: "bk4", name: "Liberty Walk LB★Works", brandName: "Liberty Walk", priceMin: 1200000, priceMax: 2200000, category: "bodykit", tags: ["wide-body", "premium"] },
    { id: "bk5", name: "Voltex Type-7 Rear Wing", brandName: "Voltex", priceMin: 180000, priceMax: 320000, category: "bodykit", tags: ["wing", "aero"] },
    { id: "bk6", name: "Seibon Carbon Hood", brandName: "Seibon", priceMin: 95000, priceMax: 180000, category: "bodykit", tags: ["carbon", "hood"] },
  ],
  accessory: [
    { id: "ac1", name: "HKS Super Drager Exhaust", brandName: "HKS", priceMin: 120000, priceMax: 220000, category: "accessory", tags: ["exhaust", "sound"] },
    { id: "ac2", name: "Brembo GT 6-Piston Brakes", brandName: "Brembo", priceMin: 400000, priceMax: 700000, category: "accessory", tags: ["brakes", "performance"] },
    { id: "ac3", name: "KW Variant 3 Coilovers", brandName: "KW", priceMin: 250000, priceMax: 420000, category: "accessory", tags: ["suspension"] },
    { id: "ac4", name: "Bride Zeta IV Seat", brandName: "Bride", priceMin: 130000, priceMax: 210000, category: "accessory", tags: ["interior", "seat"] },
    { id: "ac5", name: "OMP Nardi Deep Corn Wheel", brandName: "OMP", priceMin: 45000, priceMax: 90000, category: "accessory", tags: ["interior", "steering"] },
    { id: "ac6", name: "Sard Carbon Shift Knob", brandName: "Sard", priceMin: 12000, priceMax: 25000, category: "accessory", tags: ["interior"] },
  ],
};

// ─── Tabs config ──────────────────────────────────────────────────────────────

const TABS: { id: ProductCategory; label: string; color: string }[] = [
  { id: "wrap",      label: "Wraps",      color: "#44CCFF" },
  { id: "wheel",     label: "Wheels",     color: "#A78BFA" },
  { id: "tint",      label: "Tint",       color: "#6B7280" },
  { id: "ppf",       label: "PPF",        color: "#34D399" },
  { id: "bodykit",   label: "Body Kits",  color: "#F97316" },
  { id: "accessory", label: "Accessories",color: "#EC4899" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCents(cents: number): string {
  const d = cents / 100;
  if (d >= 1000) return `$${(d / 1000).toFixed(d % 1000 === 0 ? 0 : 1)}k`;
  return `$${d}`;
}

function allBrands(category: ProductCategory): string[] {
  const names = Array.from(new Set(mockProducts[category].map((p) => p.brandName)));
  return names;
}

// ─── Product Tile ─────────────────────────────────────────────────────────────

function ProductTile({
  product,
  isSelected,
  accentColor,
  onToggle,
}: {
  product: MockProduct;
  isSelected: boolean;
  accentColor: string;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="relative flex flex-col rounded-card overflow-hidden text-left transition-all duration-200 active:scale-95"
      style={{
        background: "#14141A",
        border: `1.5px solid ${isSelected ? accentColor : "#2A2A36"}`,
        boxShadow: isSelected ? `0 0 16px ${accentColor}30` : undefined,
      }}
    >
      {/* Thumbnail */}
      <div
        className="w-full"
        style={{ aspectRatio: "1/1", flexShrink: 0 }}
      >
        {product.colorHex ? (
          <div
            className="w-full h-full"
            style={{
              background: `linear-gradient(135deg, ${product.colorHex}ee 0%, ${product.colorHex}88 100%)`,
            }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "#1C1C24" }}
          >
            <span className="text-display-xs font-mono" style={{ color: accentColor }}>
              {product.brandName.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 space-y-1 flex-1">
        <p className="text-body-sm font-medium text-text-primary leading-tight line-clamp-2">
          {product.name}
        </p>
        <p className="text-body-xs text-text-tertiary">{product.brandName}</p>
        <p className="text-body-xs font-mono mt-1" style={{ color: accentColor }}>
          {formatCents(product.priceMin)} – {formatCents(product.priceMax)}
        </p>
      </div>

      {/* Selected check */}
      {isSelected && (
        <div
          className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ background: accentColor }}
        >
          <Check size={12} style={{ color: "#0C0C10" }} />
        </div>
      )}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CustomizePage() {
  const router = useRouter();
  const { currentBuild, addItem, removeItem, getTotal } = useBuildStore();

  const [activeTab, setActiveTab] = useState<ProductCategory>("wrap");
  const [brandFilter, setBrandFilter] = useState<string>("All");

  const tabConfig = TABS.find((t) => t.id === activeTab)!;
  const brands = ["All", ...allBrands(activeTab)];

  const filtered =
    brandFilter === "All"
      ? mockProducts[activeTab]
      : mockProducts[activeTab].filter((p) => p.brandName === brandFilter);

  function isSelected(product: MockProduct) {
    return currentBuild.items[product.category]?.product.id === product.id;
  }

  function toggle(product: MockProduct) {
    if (isSelected(product)) {
      removeItem(product.category);
    } else {
      addItem(product.category, {
        product: {
          id: product.id,
          name: product.name,
          brandName: product.brandName,
          thumbnailUrl: "",
          priceMin: product.priceMin,
          priceMax: product.priceMax,
          category: product.category,
          metadata: product.colorHex ? { color_hex: product.colorHex } : {},
        },
      });
    }
  }

  const total = getTotal();
  const itemCount = Object.keys(currentBuild.items).length;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 flex-shrink-0"
        style={{ height: "3.5rem", borderBottom: "1px solid #2A2A36" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          Customize Your Build
        </span>
        {itemCount > 0 && (
          <span
            className="text-body-xs font-medium px-2 py-0.5 rounded-chip"
            style={{ background: "rgba(68,204,255,0.15)", color: "#44CCFF" }}
          >
            {itemCount} selected
          </span>
        )}
      </header>

      {/* Category Tabs */}
      <div
        className="flex overflow-x-auto gap-0 flex-shrink-0 scrollbar-none"
        style={{ borderBottom: "1px solid #2A2A36" }}
      >
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setBrandFilter("All"); }}
              className="flex items-center gap-1.5 px-4 py-3 text-body-sm font-medium whitespace-nowrap transition-all flex-shrink-0 relative"
              style={{
                color: isActive ? tab.color : "#6B6B7B",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: tab.color,
                  opacity: isActive ? 1 : 0.4,
                  flexShrink: 0,
                }}
              />
              {tab.label}
              {isActive && (
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: tab.color,
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Brand filter chips */}
      <div
        className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-none flex-shrink-0"
        style={{ borderBottom: "1px solid #2A2A36" }}
      >
        {brands.map((brand) => {
          const isActive = brand === brandFilter;
          return (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              className="flex-shrink-0 px-3 py-1.5 rounded-chip text-body-xs font-medium transition-all"
              style={{
                background: isActive
                  ? tabConfig.color
                  : "rgba(255,255,255,0.06)",
                color: isActive ? "#0C0C10" : "#A0A0B0",
                border: isActive ? "none" : "1px solid #2A2A36",
              }}
            >
              {brand}
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4"
        style={{ paddingBottom: itemCount > 0 ? "88px" : "16px" }}
      >
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              isSelected={isSelected(product)}
              accentColor={tabConfig.color}
              onToggle={() => toggle(product)}
            />
          ))}
        </div>
      </div>

      {/* Build Summary sticky bar */}
      {itemCount > 0 && (
        <div
          className="fixed bottom-20 inset-x-0 z-10 mx-4"
          style={{ marginBottom: 0 }}
        >
          <div
            className="rounded-card p-4 flex items-center gap-3"
            style={{
              background: "#1C1C24",
              border: "1px solid #2A2A36",
              boxShadow: "0 -4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-body-xs text-text-tertiary">
                {itemCount} item{itemCount > 1 ? "s" : ""} selected
              </p>
              <p className="text-body-md font-mono font-medium text-cyan truncate">
                {formatCents(total.min)} – {formatCents(total.max)}
              </p>
            </div>
            <button
              onClick={() => router.push("/create/render")}
              className="flex items-center gap-2 px-5 h-11 rounded-button font-medium text-body-md text-background transition-all active:scale-95 flex-shrink-0"
              style={{
                background: "#44CCFF",
                boxShadow: "0 0 16px rgba(68,204,255,0.3)",
              }}
            >
              Get Quote
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
