"use client";

import { useState } from "react";
import Link from "next/link";
import { marketplaceBrands, marketplaceWraps, marketplaceWheels } from "@/data/marketplace";

const CATEGORIES = [
  { id: "wraps", label: "Wraps", emoji: "🎨" },
  { id: "wheels", label: "Wheels", emoji: "⚙️" },
  { id: "ppf", label: "PPF", emoji: "🛡️" },
  { id: "tint", label: "Tint", emoji: "🪟" },
  { id: "body-kits", label: "Body Kits", emoji: "🏎️" },
  { id: "accessories", label: "Accessories", emoji: "🔩" },
  { id: "training", label: "Training", emoji: "🎓" },
];

const BUILD_STYLES = [
  { id: "oem-plus", label: "Clean OEM+", desc: "Subtle upgrades, factory-perfect", color: "#1c1c1e", accent: "#007FFF" },
  { id: "full-send-jdm", label: "Full Send JDM", desc: "Aggressive stance, louder everything", color: "#1a2744", accent: "#ff3b30" },
  { id: "euro-spec", label: "Euro Spec", desc: "Restrained, precise, sophisticated", color: "#2d1a44", accent: "#c8a84b" },
  { id: "track-monster", label: "Track Monster", desc: "Aero, lightweight, focused", color: "#1a2a1a", accent: "#22c55e" },
];

const TRENDING = [...marketplaceWraps.slice(0, 3), ...marketplaceWheels.slice(0, 2)];

export default function MarketplacePage() {
  const [activeCat, setActiveCat] = useState("wraps");

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 100 }}>

      {/* ── Hero ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a0e1a 0%, #0d1a35 50%, #0a1628 100%)",
          padding: "48px 24px 40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,127,255,0.2) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.25em",
            color: "#007FFF",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          AVACAR Marketplace
        </p>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#f0f2f5",
            marginBottom: 12,
          }}
        >
          Everything Your Car Needs
        </h1>
        <p style={{ fontSize: 15, color: "rgba(240,242,245,0.65)", marginBottom: 28, lineHeight: 1.5 }}>
          Real products from real brands. Visualize before you buy.
        </p>
        <Link
          href="/marketplace/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "14px 28px",
            borderRadius: 100,
            background: "#007FFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            boxShadow: "0 4px 24px rgba(0,127,255,0.4)",
          }}
        >
          Shop Now →
        </Link>
      </div>

      {/* ── Category Quick Links ── */}
      <div style={{ padding: "20px 0 0" }}>
        <p
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.2em",
            color: "var(--primary)",
            textTransform: "uppercase",
            padding: "0 20px",
            marginBottom: 12,
          }}
        >
          Browse by Category
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "0 20px 4px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: 100,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: activeCat === cat.id ? "var(--chip-active-bg)" : "var(--chip-bg)",
                color: activeCat === cat.id ? "#fff" : "var(--on-surface-variant)",
                transition: "all 0.15s",
              }}
            >
              <span style={{ fontSize: 14 }}>{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Featured Brands ── */}
      <div style={{ padding: "24px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase" }}>
            Featured Brands
          </p>
          <Link href="/marketplace/products" style={{ fontSize: 12, color: "var(--on-surface-variant)", textDecoration: "none" }}>
            See all →
          </Link>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 4px" }}>
          {marketplaceBrands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/marketplace/brands/${brand.slug}`}
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "16px 20px",
                borderRadius: 16,
                background: "var(--surface-card)",
                textDecoration: "none",
                minWidth: 100,
                boxShadow: "var(--shadow-card)",
                transition: "all 0.15s",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: brand.heroGradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 900,
                  color: "#fff",
                  fontStyle: "italic",
                  letterSpacing: "-0.02em",
                }}
              >
                {brand.name.substring(0, 2)}
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)", whiteSpace: "nowrap" }}>{brand.name}</p>
                <p style={{ fontSize: 10, color: "var(--on-surface-variant)", marginTop: 2 }}>★ {brand.avgRating}</p>
              </div>
            </Link>
          ))}
          {/* Extra non-linked brand pills */}
          {["Vossen", "Rotiform", "BBS", "Hexis"].map((b) => (
            <div
              key={b}
              style={{
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "16px 20px",
                borderRadius: 16,
                background: "var(--surface-card)",
                minWidth: 100,
                boxShadow: "var(--shadow-card)",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "var(--surface-high)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 900,
                  color: "var(--on-surface-variant)",
                }}
              >
                {b.substring(0, 2)}
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)", whiteSpace: "nowrap" }}>{b}</p>
                <p style={{ fontSize: 10, color: "var(--on-surface-variant)", marginTop: 2 }}>★ 4.6</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Trending Products ── */}
      <div style={{ padding: "28px 0 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase" }}>
              What&apos;s Hot Right Now
            </p>
            <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginTop: 2 }}>
              Trending Products
            </p>
          </div>
          <Link href="/marketplace/products" style={{ fontSize: 12, color: "var(--on-surface-variant)", textDecoration: "none", flexShrink: 0 }}>
            See all →
          </Link>
        </div>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 4px" }}>
          {TRENDING.map((product) => (
            <Link
              key={product.slug}
              href={`/marketplace/products/${product.slug}`}
              style={{
                flexShrink: 0,
                width: 160,
                background: "var(--surface-card)",
                borderRadius: 16,
                overflow: "hidden",
                textDecoration: "none",
                boxShadow: "var(--shadow-card)",
              }}
            >
              {/* Product image */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: `radial-gradient(ellipse at 35% 35%, ${product.primaryColorHex}cc, ${product.primaryColorHex})`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)",
                  }}
                />
                {/* Brand chip overlay */}
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
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.3 }}>{product.name}</p>
                <p style={{ fontSize: 11, color: "var(--on-surface-variant)", marginTop: 2, textTransform: "capitalize" }}>
                  {product.finish}
                </p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginTop: 6 }}>
                  from ${product.fromPrice}
                  <span style={{ fontSize: 10, fontWeight: 400, color: "var(--on-surface-variant)" }}> {product.unit}</span>
                </p>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#007FFF",
                    marginTop: 6,
                    cursor: "pointer",
                  }}
                >
                  Visualize on My Car →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Shop by Build Style ── */}
      <div style={{ padding: "28px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 6 }}>
          Shop by Style
        </p>
        <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginBottom: 14 }}>
          Find Your Aesthetic
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {BUILD_STYLES.map((style) => (
            <Link
              key={style.id}
              href={`/marketplace/products?style=${style.id}`}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                background: style.color,
                padding: "20px 14px",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minHeight: 100,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${style.accent}33, transparent 70%)`,
                  transform: "translate(20%, -20%)",
                }}
              />
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: style.accent,
                  marginBottom: 4,
                }}
              />
              <p style={{ fontSize: 13, fontWeight: 800, color: "#f0f2f5", letterSpacing: "-0.01em" }}>{style.label}</p>
              <p style={{ fontSize: 10, color: "rgba(240,242,245,0.55)", lineHeight: 1.4 }}>{style.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Featured Build Editorial ── */}
      <div style={{ padding: "28px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 10 }}>
          Community Build
        </p>
        <div
          style={{
            background: "var(--surface-card)",
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "var(--shadow-card)",
          }}
        >
          {/* Build image placeholder */}
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              background: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #1c1c1e 100%)",
              position: "relative",
              display: "flex",
              alignItems: "flex-end",
              padding: 16,
            }}
          >
            <div>
              <p style={{ fontSize: 10, color: "rgba(240,242,245,0.5)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4 }}>
                @wrapsbyalex · 2024 BMW M4
              </p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "#f0f2f5", letterSpacing: "-0.01em" }}>
                Satin Black + HRE FF15
              </p>
            </div>
          </div>
          <div style={{ padding: "16px 16px 20px" }}>
            <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 12, lineHeight: 1.5 }}>
              This build used:
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { label: "3M 1080 Satin Black", slug: "3m-1080-satin-black" },
                { label: "HRE FF15 Gloss Black", slug: "hre-ff15-gloss-black" },
                { label: "XPEL Ultimate Plus", slug: "xpel-ultimate-plus" },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/marketplace/products/${p.slug}`}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 100,
                    background: "var(--surface-low)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--primary)",
                    textDecoration: "none",
                  }}
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Find a Shop ── */}
      <div
        style={{
          margin: "28px 20px 0",
          background: "linear-gradient(135deg, #0d1a35, #0a2244)",
          borderRadius: 20,
          padding: "24px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,127,255,0.2), transparent 70%)",
          }}
        />
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#007FFF", textTransform: "uppercase", marginBottom: 8 }}>
          Find a Shop
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "#f0f2f5", letterSpacing: "-0.01em", marginBottom: 6 }}>
          Ready to get it done?
        </p>
        <p style={{ fontSize: 13, color: "rgba(240,242,245,0.6)", marginBottom: 20, lineHeight: 1.5 }}>
          Find a Zeno Certified shop near you. Every installer vetted, rated, and ready to build.
        </p>
        <input
          type="text"
          placeholder="Enter your city or postal code..."
          className="real-input"
          style={{ marginBottom: 12 }}
        />
        <button
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 100,
            background: "#007FFF",
            color: "#fff",
            fontWeight: 700,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          Find Zeno Certified Shops
        </button>
      </div>

      {/* ── Professional Supplies CTA ── */}
      <div style={{ margin: "20px 20px 0", padding: "20px", background: "var(--surface-card)", borderRadius: 16, boxShadow: "var(--shadow-card)" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
          Are you a shop or installer?
        </p>
        <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 14, lineHeight: 1.5 }}>
          Access wholesale pricing, bulk ordering, and Net-30 terms with a Pro Account.
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 100,
              background: "var(--primary-gradient)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            Browse Supplies
          </button>
          <button
            style={{
              flex: 1,
              padding: "10px 0",
              borderRadius: 100,
              background: "var(--surface-low)",
              color: "var(--on-surface)",
              fontWeight: 700,
              fontSize: 12,
              border: "none",
              cursor: "pointer",
            }}
          >
            Browse Training
          </button>
        </div>
      </div>
    </div>
  );
}
