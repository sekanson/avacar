"use client";

import { useState } from "react";
import Link from "next/link";
import { allMarketplaceProducts } from "@/data/marketplace";
import type { MarketplaceProduct } from "@/data/marketplace";
import { SlidersHorizontal, X, Search, Package } from "lucide-react";

// ─── Curated Collections ──────────────────────────────────────────────────────

const CURATED_COLLECTIONS = [
  {
    id: "murdered-out",
    name: "Murdered Out Essentials",
    count: 12,
    description: "All black everything",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80&fm=webp",
    accent: "#F87171",
    filter: { category: "wraps", finish: "Matte" },
  },
  {
    id: "show-car",
    name: "Show Car Starter Pack",
    count: 18,
    description: "Turn heads at every show",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&q=80&fm=webp",
    accent: "#44CCFF",
    filter: { category: "wraps", finish: "Gloss" },
  },
  {
    id: "euro-clean",
    name: "Euro Clean",
    count: 9,
    description: "Refined, subtle, tasteful",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80&fm=webp",
    accent: "#34D399",
    filter: { category: "wraps", finish: "Satin" },
  },
  {
    id: "off-road",
    name: "Off-Road Ready",
    count: 14,
    description: "Built for the trail",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&q=80&fm=webp",
    accent: "#FBBF24",
    filter: { category: "wraps", finish: "Matte" },
  },
];

function CollectionsRow({
  onSelectCollection,
  activeCollection,
}: {
  onSelectCollection: (id: string | null, filter: { category: string; finish: string } | null) => void;
  activeCollection: string | null;
}) {
  return (
    <div style={{ padding: "0 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", margin: 0 }}>
          Curated Collections
        </p>
        {activeCollection && (
          <button
            onClick={() => onSelectCollection(null, null)}
            style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-variant)", background: "none", border: "none", cursor: "pointer" }}
          >
            Clear ×
          </button>
        )}
      </div>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none" }}>
        {CURATED_COLLECTIONS.map((col) => {
          const isActive = activeCollection === col.id;
          return (
            <button
              key={col.id}
              onClick={() => onSelectCollection(isActive ? null : col.id, isActive ? null : col.filter)}
              style={{
                flexShrink: 0, width: 160, borderRadius: 16,
                background: isActive ? `${col.accent}18` : "var(--surface-card)",
                border: isActive ? `1.5px solid ${col.accent}55` : "1px solid var(--ghost-border)",
                padding: 0, cursor: "pointer", overflow: "hidden",
                textAlign: "left", boxShadow: isActive ? `0 0 16px ${col.accent}22` : "var(--shadow-card)",
                transition: "all 0.2s",
              }}
            >
              {/* Hero image */}
              <div style={{ position: "relative", height: 80, overflow: "hidden" }}>
                <img
                  src={col.image}
                  alt={col.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.15), rgba(0,0,0,0.45))" }} />
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)", margin: "0 0 2px", lineHeight: 1.3 }}>
                  {col.name}
                </p>
                <p style={{ fontSize: 10, color: "var(--on-surface-variant)", margin: "0 0 6px" }}>{col.description}</p>
                <span style={{
                  fontSize: 9, fontWeight: 700, color: col.accent,
                  background: `${col.accent}15`, borderRadius: 999, padding: "2px 7px",
                }}>
                  {col.count} products
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


const WHEEL_IMAGES = [
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp",
  "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp",
];
const PPF_IMAGE = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp";

// Generate a rich gradient for wrap products based on their finish type and color
function getWrapGradient(hex: string, finish: string): string {
  const f = (finish || "").toLowerCase();
  if (f.includes("carbon")) {
    return `repeating-linear-gradient(45deg, #1a1a1a 0px, #1a1a1a 4px, #2a2a2a 4px, #2a2a2a 8px), repeating-linear-gradient(-45deg, #111 0px, #111 4px, #222 4px, #222 8px)`;
  }
  if (f.includes("chrome")) {
    return `linear-gradient(135deg, #c8c8c8 0%, #f0f0f0 25%, #a0a0a0 50%, #e8e8e8 75%, #b8b8b8 100%)`;
  }
  if (f.includes("color-shift") || f.includes("colour shift") || f.includes("cosmic") || f.includes("shift")) {
    return `linear-gradient(135deg, ${hex} 0%, #9b59b6 33%, #3498db 66%, ${hex} 100%)`;
  }
  if (f.includes("matte")) {
    return `linear-gradient(160deg, ${hex}ee 0%, ${hex}cc 40%, ${hex}bb 70%, ${hex}aa 100%)`;
  }
  if (f.includes("satin")) {
    return `linear-gradient(135deg, ${hex}dd 0%, ${hex}ff 30%, ${hex}ee 60%, ${hex}cc 100%)`;
  }
  // Gloss: strong highlight
  return `linear-gradient(135deg, ${hex} 0%, ${adjustBrightness(hex, 60)} 30%, ${hex} 60%, ${adjustBrightness(hex, -20)} 100%)`;
}

function adjustBrightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}

const FINISHES = ["All", "Matte", "Satin", "Gloss", "Chrome", "Color-Shift"];
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wraps", label: "Wraps" },
  { id: "wheels", label: "Wheels" },
  { id: "ppf", label: "PPF" },
];
const SORTS = ["Popular", "Newest", "Price: Low", "Price: High"];

function ProductCard({ product, sponsored }: { product: MarketplaceProduct; sponsored?: boolean }) {
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const activeVariant = product.variants[activeVariantIdx] ?? { colorHex: product.primaryColorHex, name: "" };

  return (
    <Link
      href={`/marketplace/products/${product.slug}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        style={{
          background: "var(--surface-card)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
          transition: "all 0.2s",
        }}
      >
        {/* Square 1:1 image */}
        <div
          style={{
            width: "100%",
            aspectRatio: "1 / 1",
            background: product.category === "wraps"
              ? getWrapGradient(activeVariant.colorHex, product.finish)
              : "#111",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {product.category === "wheels" && (
            <img
              src={WHEEL_IMAGES[product.slug.charCodeAt(0) % 3]}
              alt={product.name}
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {product.category === "ppf" && (
            <img
              src={PPF_IMAGE}
              alt={product.name}
              loading="lazy"
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
          {product.category === "wraps" && (
            <>
              {/* Texture overlay to simulate material finish */}
              <div style={{
                position: "absolute", inset: 0,
                background: product.finish?.toLowerCase().includes("matte")
                  ? "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.04) 0%, transparent 60%)"
                  : "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 50%)",
              }} />
              {/* Car silhouette overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                padding: "0 8px 6px",
              }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, color: "rgba(0,0,0,0.5)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  textShadow: "0 1px 2px rgba(255,255,255,0.15)",
                }}>
                  {product.finish}
                </span>
              </div>
            </>
          )}
          {/* Brand logo overlay top-left */}
          <div
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              padding: "3px 8px",
              borderRadius: 100,
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(8px)",
              fontSize: 9,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            {product.brand}
          </div>
          {sponsored && (
            <div
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 9,
                fontWeight: 600,
                color: "var(--on-surface-variant)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Sponsored
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: "10px 12px 14px" }}>
          <p
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "var(--on-surface)",
              lineHeight: 1.3,
              marginBottom: 6,
            }}
          >
            {product.name}
          </p>

          {/* Variant color swatches — tappable */}
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {product.variants.slice(0, 5).map((v, idx) => (
              <button
                key={v.name}
                title={v.name}
                onClick={(e) => { e.preventDefault(); setActiveVariantIdx(idx); }}
                style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: v.colorHex,
                  border: idx === activeVariantIdx ? "2px solid var(--primary)" : "2px solid var(--surface-low)",
                  flexShrink: 0, cursor: "pointer", padding: 0,
                  boxShadow: idx === activeVariantIdx ? `0 0 0 1px var(--primary)` : "none",
                  transition: "all 0.15s",
                }}
              />
            ))}
            {product.variants.length > 5 && (
              <div
                style={{
                  width: 16, height: 16, borderRadius: "50%",
                  background: "var(--surface-low)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 8, fontWeight: 700, color: "var(--on-surface-variant)",
                }}
              >
                +{product.variants.length - 5}
              </div>
            )}
          </div>

          {/* Price */}
          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
            from ${product.fromPrice}
            <span style={{ fontSize: 10, fontWeight: 400, color: "var(--on-surface-variant)" }}>
              {" "}{product.unit}
            </span>
          </p>

          {/* Visualize CTA */}
          <p style={{ fontSize: 11, fontWeight: 600, color: "#007FFF", cursor: "pointer" }}>
            Visualize on My Car →
          </p>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden" }}>
      <div className="skel" style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 0 }} />
      <div style={{ padding: "10px 12px 14px", background: "var(--surface-card)" }}>
        <div className="skel" style={{ height: 14, width: "80%", marginBottom: 8 }} />
        <div className="skel" style={{ height: 10, width: "60%", marginBottom: 8 }} />
        <div className="skel" style={{ height: 13, width: "50%", marginBottom: 6 }} />
        <div className="skel" style={{ height: 11, width: "70%" }} />
      </div>
    </div>
  );
}

function FilterPanel({
  activeCategory,
  setActiveCategory,
  activeFinish,
  setActiveFinish,
  activeSort,
  setActiveSort,
  onClose,
}: {
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  activeFinish: string;
  setActiveFinish: (v: string) => void;
  activeSort: string;
  setActiveSort: (v: string) => void;
  onClose?: () => void;
}) {
  return (
    <div>
      {onClose && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)" }}>Filters</p>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--on-surface-variant)" }}
          >
            <X size={20} />
          </button>
        </div>
      )}

      {/* Category */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 10 }}>
          Category
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: activeCategory === cat.id ? "var(--chip-active-bg)" : "var(--chip-bg)",
                color: activeCategory === cat.id ? "#fff" : "var(--on-surface-variant)",
                transition: "all 0.15s",
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Finish */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 10 }}>
          Finish
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {FINISHES.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFinish(f)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: activeFinish === f ? "var(--chip-active-bg)" : "var(--chip-bg)",
                color: activeFinish === f ? "#fff" : "var(--on-surface-variant)",
                transition: "all 0.15s",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 10 }}>
          Sort By
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {SORTS.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSort(s)}
              style={{
                padding: "7px 14px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontWeight: 600,
                background: activeSort === s ? "var(--chip-active-bg)" : "var(--chip-bg)",
                color: activeSort === s ? "#fff" : "var(--on-surface-variant)",
                transition: "all 0.15s",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 100,
            background: "var(--primary-gradient)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
          }}
        >
          Apply Filters
        </button>
      )}
    </div>
  );
}

export default function ProductCatalogPage() {
  const [loading] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFinish, setActiveFinish] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  const handleSelectCollection = (id: string | null, filter: { category: string; finish: string } | null) => {
    setActiveCollection(id);
    if (filter) {
      setActiveCategory(filter.category);
      setActiveFinish(filter.finish);
    } else {
      setActiveCategory("all");
      setActiveFinish("All");
    }
  };

  const filtered = allMarketplaceProducts.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (activeFinish !== "All" && p.finish.toLowerCase() !== activeFinish.toLowerCase()) return false;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (activeSort === "Price: Low") return a.fromPrice - b.fromPrice;
    if (activeSort === "Price: High") return b.fromPrice - a.fromPrice;
    if (activeSort === "Newest") return b.id.localeCompare(a.id);
    return b.rating - a.rating; // Popular
  });

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 100 }}>


      {/* Header */}
      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 4 }}>
          AVACAR Marketplace
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.02em", marginBottom: 16 }}>
          Product Catalog
        </h1>
      </div>

      {/* Mobile filter bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "0 20px 16px",
          overflowX: "auto",
          scrollbarWidth: "none",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setShowFilterSheet(true)}
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 14px",
            borderRadius: 100,
            border: "none",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
            background: "var(--chip-bg)",
            color: "var(--on-surface)",
          }}
        >
          <SlidersHorizontal size={13} />
          Filters
        </button>
        {CATEGORIES.slice(1).map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? "all" : cat.id)}
            style={{
              flexShrink: 0,
              padding: "8px 14px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 600,
              background: activeCategory === cat.id ? "var(--chip-active-bg)" : "var(--chip-bg)",
              color: activeCategory === cat.id ? "#fff" : "var(--on-surface-variant)",
              transition: "all 0.15s",
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Curated Collections Row */}
      <CollectionsRow onSelectCollection={handleSelectCollection} activeCollection={activeCollection} />

      {/* Desktop: two-column layout with filter sidebar */}
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "0 20px",
        }}
      >
        {/* Filter sidebar — desktop only */}
        <div
          className="desktop-only-chrome"
          style={{
            width: 220,
            flexShrink: 0,
            display: "none", // overridden by media query in CSS
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 20,
              background: "var(--surface-card)",
              borderRadius: 16,
              padding: "20px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <FilterPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeFinish={activeFinish}
              setActiveFinish={setActiveFinish}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
          </div>
        </div>

        {/* Product grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Result count */}
          <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 14 }}>
            {loading ? "Loading..." : `${sorted.length} products`}
          </p>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
            className="marketplace-product-grid"
          >
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : sorted.map((product, idx) => (
                  <ProductCard key={product.slug} product={product} sponsored={idx === 0} />
                ))}
          </div>

          {!loading && sorted.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <Search size={24} style={{ marginBottom: 8, color: "var(--color-text-tertiary)" }} />
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--on-surface)", marginBottom: 6 }}>
                Nothing here yet
              </p>
              <p style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      {showFilterSheet && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "var(--modal-overlay)",
            zIndex: 50,
            display: "flex",
            alignItems: "flex-end",
          }}
          onClick={() => setShowFilterSheet(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 700,
              margin: "0 auto",
              background: "var(--modal-bg)",
              borderRadius: "20px 20px 0 0",
              padding: "24px 24px 40px",
              boxShadow: "var(--shadow-modal)",
              animation: "fadeIn 0.2s ease",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <FilterPanel
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeFinish={activeFinish}
              setActiveFinish={setActiveFinish}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
              onClose={() => setShowFilterSheet(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
