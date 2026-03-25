"use client";

import { useState } from "react";
import Link from "next/link";
import { use } from "react";
import { getProductBySlug, allMarketplaceProducts } from "@/data/marketplace";
import type { MarketplaceVariant } from "@/data/marketplace";
import { ArrowLeft, ShoppingCart, Heart, Star, ChevronDown, ChevronUp } from "lucide-react";

function ProductImageGallery({ colorHex, variantName }: { colorHex: string; variantName: string }) {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "1 / 1",
        background: `radial-gradient(ellipse at 35% 30%, ${colorHex}bb, ${colorHex})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 55%)",
        }}
      />
      {/* Dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: i === 0 ? 20 : 6,
              height: 6,
              borderRadius: 100,
              background: i === 0 ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          />
        ))}
      </div>
      {/* Variant name overlay */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          padding: "4px 10px",
          borderRadius: 100,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          fontSize: 10,
          fontWeight: 600,
          color: "#fff",
        }}
      >
        {variantName}
      </div>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < Math.floor(rating) ? "#F59E0B" : "none"}
          color={i < Math.floor(rating) ? "#F59E0B" : "var(--on-surface-variant)"}
        />
      ))}
    </span>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  const [selectedVariant, setSelectedVariant] = useState<MarketplaceVariant | null>(
    product ? product.variants[0] : null
  );
  const [showSpecs, setShowSpecs] = useState(false);
  const [showBrand, setShowBrand] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <p style={{ fontSize: 24, marginBottom: 8 }}>🔍</p>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--on-surface)", marginBottom: 6 }}>Product not found</p>
        <Link href="/marketplace/products" style={{ color: "var(--primary)", fontSize: 13, textDecoration: "none" }}>
          ← Back to catalog
        </Link>
      </div>
    );
  }

  const displayColor = selectedVariant?.colorHex ?? product.primaryColorHex;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // Related products (same category, exclude current)
  const related = allMarketplaceProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 120 }}>

      {/* Back navigation */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/marketplace/products" style={{ color: "var(--on-surface-variant)", display: "flex", alignItems: "center" }}>
          <ArrowLeft size={20} />
        </Link>
        <div style={{ display: "flex", gap: 6, fontSize: 12, color: "var(--on-surface-variant)" }}>
          <Link href="/marketplace" style={{ color: "var(--primary)", textDecoration: "none" }}>Shop</Link>
          <span>/</span>
          <Link href="/marketplace/products" style={{ color: "var(--primary)", textDecoration: "none", textTransform: "capitalize" }}>
            {product.category}
          </Link>
          <span>/</span>
          <span style={{ color: "var(--on-surface)" }}>{product.brand}</span>
        </div>
      </div>

      {/* Product image gallery */}
      <div style={{ marginTop: 12 }}>
        <ProductImageGallery colorHex={displayColor} variantName={selectedVariant?.name ?? product.variants[0].name} />
      </div>

      {/* Product header */}
      <div style={{ padding: "20px 20px 0" }}>
        <Link
          href={`/marketplace/brands/${product.brandSlug}`}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px 4px 4px",
            borderRadius: 100,
            background: "var(--surface-low)",
            textDecoration: "none",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "var(--primary-gradient)",
              fontSize: 8,
              fontWeight: 900,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {product.brand.substring(0, 2)}
          </div>
          <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface-variant)" }}>{product.brand}</span>
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginBottom: 8 }}>
          {product.name}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>{product.rating}</span>
          <span style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>({product.reviewCount} reviews)</span>
        </div>

        <p style={{ fontSize: 24, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          from ${product.fromPrice}
          <span style={{ fontSize: 13, fontWeight: 400, color: "var(--on-surface-variant)" }}> {product.unit}</span>
        </p>
      </div>

      {/* Variant selector */}
      <div style={{ padding: "20px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 12 }}>
          Select Variant
        </p>

        {/* Color variant swatches */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {product.variants.map((v) => (
            <button
              key={v.name}
              onClick={() => setSelectedVariant(v)}
              title={v.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 12px 6px 8px",
                borderRadius: 100,
                border: selectedVariant?.name === v.name ? "2px solid #007FFF" : "2px solid transparent",
                background: selectedVariant?.name === v.name ? "var(--primary-alpha-08)" : "var(--chip-bg)",
                cursor: "pointer",
                transition: "all 0.15s",
                opacity: v.inStock ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: v.colorHex,
                  border: "1.5px solid rgba(255,255,255,0.2)",
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--on-surface)", whiteSpace: "nowrap" }}>
                {v.name}
              </span>
              {!v.inStock && (
                <span style={{ fontSize: 9, color: "var(--error)", fontWeight: 600 }}>OUT</span>
              )}
            </button>
          ))}
        </div>

        {selectedVariant && (
          <p style={{ fontSize: 14, fontWeight: 700, color: "var(--on-surface)" }}>
            {selectedVariant.name} — ${selectedVariant.price}{product.unit}
          </p>
        )}
      </div>

      {/* Primary actions — on mobile will be sticky at bottom, here inline */}
      <div style={{ padding: "20px" }}>
        {/* Visualize CTA */}
        <button
          style={{
            width: "100%",
            padding: "16px",
            borderRadius: 100,
            background: "#007FFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            border: "none",
            cursor: "pointer",
            marginBottom: 10,
            boxShadow: "0 4px 24px rgba(0,127,255,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            letterSpacing: "0.02em",
          }}
        >
          🔮 Visualize on My Car
        </button>

        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={handleAddToCart}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: 100,
              background: addedToCart ? "var(--success)" : "var(--surface-low)",
              color: addedToCart ? "#fff" : "var(--on-surface)",
              fontWeight: 700,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              transition: "all 0.2s",
            }}
          >
            <ShoppingCart size={16} />
            {addedToCart ? "Added!" : "Add to Cart"}
          </button>
          <button
            onClick={() => setIsWishlisted((w) => !w)}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              background: isWishlisted ? "rgba(239,68,68,0.1)" : "var(--surface-low)",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              flexShrink: 0,
            }}
          >
            <Heart size={18} fill={isWishlisted ? "#EF4444" : "none"} color={isWishlisted ? "#EF4444" : "var(--on-surface-variant)"} />
          </button>
        </div>
      </div>

      {/* Product description */}
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.65 }}>{product.description}</p>
      </div>

      {/* Specs — collapsible */}
      <div
        style={{
          margin: "0 20px 12px",
          background: "var(--surface-card)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <button
          onClick={() => setShowSpecs((s) => !s)}
          style={{
            width: "100%",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)" }}>Specifications</span>
          {showSpecs ? <ChevronUp size={16} color="var(--on-surface-variant)" /> : <ChevronDown size={16} color="var(--on-surface-variant)" />}
        </button>
        {showSpecs && (
          <div style={{ padding: "0 20px 16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>
                    {key}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Price comparison / vendors */}
      <div style={{ padding: "0 20px 12px" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 12 }}>
          Buy From
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {product.vendors.map((vendor, i) => (
            <div
              key={vendor.name}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "var(--surface-card)",
                borderRadius: 12,
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)" }}>{vendor.name}</span>
                  {i === 0 && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#007FFF",
                        background: "rgba(0,127,255,0.1)",
                        padding: "2px 6px",
                        borderRadius: 100,
                        letterSpacing: "0.05em",
                      }}
                    >
                      BEST PRICE
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 11, color: vendor.inStock ? "var(--success)" : "var(--error)" }}>
                  {vendor.inStock ? "● In Stock" : "● Out of Stock"} · {vendor.shipsIn}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)" }}>${vendor.price}</p>
                <p style={{ fontSize: 10, color: "var(--on-surface-variant)" }}>{product.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional installation CTA */}
      <div
        style={{
          margin: "0 20px 12px",
          padding: "16px",
          background: "var(--surface-card)",
          borderRadius: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
          Need this installed?
        </p>
        <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 12, lineHeight: 1.5 }}>
          Find a Zeno Certified shop that specializes in {product.brand} products.
        </p>
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 100,
            background: "var(--surface-low)",
            color: "var(--on-surface)",
            fontWeight: 600,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
          }}
        >
          Find Zeno Certified Shops →
        </button>
      </div>

      {/* Brand info — collapsible */}
      <div
        style={{
          margin: "0 20px 20px",
          background: "var(--surface-card)",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
        }}
      >
        <button
          onClick={() => setShowBrand((s) => !s)}
          style={{
            width: "100%",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)" }}>About {product.brand}</span>
          {showBrand ? <ChevronUp size={16} color="var(--on-surface-variant)" /> : <ChevronDown size={16} color="var(--on-surface-variant)" />}
        </button>
        {showBrand && (
          <div style={{ padding: "0 20px 16px" }}>
            <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.65, marginBottom: 10 }}>
              {product.brand} is a leading manufacturer of automotive films and finishes, trusted by professional installers worldwide.
            </p>
            <Link
              href={`/marketplace/brands/${product.brandSlug}`}
              style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", textDecoration: "none" }}
            >
              View Brand Storefront →
            </Link>
          </div>
        )}
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div style={{ padding: "0 20px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 6 }}>
            Also From This Category
          </p>
          <p style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)", marginBottom: 14 }}>Related Products</p>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/marketplace/products/${p.slug}`}
                style={{
                  flexShrink: 0,
                  width: 140,
                  background: "var(--surface-card)",
                  borderRadius: 14,
                  overflow: "hidden",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    background: `radial-gradient(ellipse at 35% 35%, ${p.primaryColorHex}cc, ${p.primaryColorHex})`,
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 55%)" }} />
                </div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.3, marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)" }}>from ${p.fromPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky mobile CTA */}
      <div
        className="mobile-only-chrome"
        style={{
          position: "fixed",
          bottom: 72,
          left: 0,
          right: 0,
          padding: "12px 20px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(20px)",
          zIndex: 40,
          display: "flex",
          gap: 8,
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <button
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 100,
            background: "#007FFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,127,255,0.35)",
          }}
        >
          🔮 Visualize on My Car
        </button>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: 100,
            background: addedToCart ? "var(--success)" : "var(--surface-card)",
            color: addedToCart ? "#fff" : "var(--on-surface)",
            fontWeight: 700,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {addedToCart ? "Added! ✓" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
