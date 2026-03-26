"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { allMarketplaceProducts } from "@/data/marketplace";
import type { MarketplaceProduct } from "@/data/marketplace";
import { SlidersHorizontal, X } from "lucide-react";

const MODE_TABS = [
  { id: "designs",  label: "Designs",  href: "/marketplace/designs" },
  { id: "products", label: "Products", href: "/marketplace/products" },
  { id: "shops",    label: "Shops",    href: "/marketplace/shops" },
  { id: "training", label: "Training", href: "/marketplace/training" },
];

const WHEEL_IMAGES = [
  "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=600&q=80&fm=webp",
  "https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?w=600&q=80&fm=webp",
  "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=600&q=80&fm=webp",
];
const PPF_IMAGE = "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&q=80&fm=webp";

const FINISHES = ["All", "Matte", "Satin", "Gloss", "Chrome", "Color-Shift"];
const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "wraps", label: "Wraps" },
  { id: "wheels", label: "Wheels" },
  { id: "ppf", label: "PPF" },
];
const SORTS = ["Popular", "Newest", "Price: Low", "Price: High"];

function ProductCard({ product, sponsored }: { product: MarketplaceProduct; sponsored?: boolean }) {
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
              ? product.primaryColorHex
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
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, transparent 55%)",
              }}
            />
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

          {/* Variant color swatches */}
          <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
            {product.variants.slice(0, 5).map((v) => (
              <div
                key={v.name}
                title={v.name}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: v.colorHex,
                  border: "2px solid var(--surface-low)",
                  flexShrink: 0,
                }}
              />
            ))}
            {product.variants.length > 5 && (
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "var(--surface-low)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 8,
                  fontWeight: 700,
                  color: "var(--on-surface-variant)",
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
  const [loading, setLoading] = useState(true);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeFinish, setActiveFinish] = useState("All");
  const [activeSort, setActiveSort] = useState("Popular");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

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

      {/* Mode Tabs */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 20px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {MODE_TABS.map((tab) => {
          const isActive = tab.id === "products";
          return (
            <Link
              key={tab.id}
              href={tab.href}
              style={{
                flexShrink: 0,
                padding: "14px 18px",
                fontSize: 14,
                fontWeight: 600,
                color: isActive ? "#44CCFF" : "var(--color-text-tertiary)",
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #44CCFF" : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

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
              <p style={{ fontSize: 24, marginBottom: 8 }}>🔍</p>
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
