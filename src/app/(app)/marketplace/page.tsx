"use client";

import { useState } from "react";
import Link from "next/link";
import { marketplaceBrands, marketplaceWraps, marketplaceWheels } from "@/data/marketplace";

/* ─── Mode Tabs ─── */
const MODE_TABS = [
  { id: "designs",  label: "Designs",  href: "/marketplace/designs" },
  { id: "products", label: "Products", href: "/marketplace/products" },
  { id: "shops",    label: "Shops",    href: "/marketplace/shops" },
  { id: "training", label: "Training", href: "/marketplace/training" },
];

/* ─── Design Cards ─── */
const FEATURED_DESIGNS = [
  { slug: "midnight-fury",  name: "Midnight Fury",  car: "GT-R R35",      seller: "@wraplord",         price: 149, rating: 4.9, img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "carbon-stealth", name: "Carbon Stealth", car: "M4 Comp",       seller: "@graphicflow",      price: 199, rating: 4.8, img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "neon-circuit",   name: "Neon Circuit",   car: "Civic Type R",  seller: "@jdm.wraps",        price: 89,  rating: 4.7, img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "arctic-storm",   name: "Arctic Storm",   car: "RS6 Avant",     seller: "@eurostyle",        price: 249, rating: 5.0, img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "tokyo-drift",    name: "Tokyo Drift",    car: "Supra A90",     seller: "@drift.kings",      price: 179, rating: 4.6, img: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=400&h=267&fit=crop&q=70&fm=webp" },
];

/* ─── Brand Colors ─── */
const BRAND_COLORS: Record<string, string> = {
  "3M": "#FF0000",
  "Avery": "#004B8D",
  "HRE": "#1a1a1a",
  "XPEL": "#111111",
  "Vossen": "#C9A84C",
  "Inozetek": "#222",
  "Liberty Walk": "#e00",
  "BBS": "#CC0000",
};

const EXTRA_BRANDS = ["Avery", "HRE", "XPEL", "Vossen", "Inozetek", "Liberty Walk", "BBS"];

/* ─── Shop Cards ─── */
const FEATURED_SHOPS = [
  { name: "WrapLords LA",     location: "Los Angeles, CA", rating: 4.9, jobs: 342, badge: "CERTIFIED", avatar: "W" },
  { name: "Euro Atelier",     location: "Miami, FL",       rating: 4.8, jobs: 217, badge: "CERTIFIED", avatar: "E" },
  { name: "JDM Customs NYC",  location: "New York, NY",    rating: 4.7, jobs: 189, badge: "CERTIFIED", avatar: "J" },
];

/* ─── Build Styles (kept from existing) ─── */
const BUILD_STYLES = [
  { id: "oem-plus",      label: "Clean OEM+",      desc: "Subtle upgrades, factory-perfect",    color: "#1c1c1e", accent: "#007FFF", bgImage: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=200&fit=crop&q=60&fm=webp" },
  { id: "full-send-jdm", label: "Full Send JDM",   desc: "Aggressive stance, louder everything", color: "#1a2744", accent: "#ff3b30", bgImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&q=60&fm=webp" },
  { id: "euro-spec",     label: "Euro Spec",        desc: "Restrained, precise, sophisticated",   color: "#2d1a44", accent: "#c8a84b", bgImage: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=200&fit=crop&q=60&fm=webp" },
  { id: "track-monster", label: "Track Monster",   desc: "Aero, lightweight, focused",           color: "#1a2a1a", accent: "#22c55e", bgImage: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=400&h=200&fit=crop&q=60&fm=webp" },
];

const TRENDING = [...marketplaceWraps.slice(0, 3), ...marketplaceWheels.slice(0, 2)];

/* ─── Design Card Component ─── */
function DesignCard({ design }: { design: typeof FEATURED_DESIGNS[0] }) {
  return (
    <Link
      href={`/marketplace/designs/${design.slug}`}
      style={{
        flexShrink: 0,
        width: 200,
        background: "var(--color-surface)",
        borderRadius: 24,
        overflow: "hidden",
        textDecoration: "none",
        display: "block",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img
          src={design.img}
          alt={design.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Rating badge */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.65)",
            backdropFilter: "blur(8px)",
            borderRadius: 100,
            padding: "3px 8px",
            fontSize: 11,
            fontWeight: 700,
            color: "#fff",
          }}
        >
          ★ {design.rating}
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
          {design.name} — {design.car}
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 3 }}>by {design.seller}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF", marginTop: 6 }}>From ${design.price} installed</p>
        <p style={{ fontSize: 12, color: "#44CCFF", marginTop: 6, cursor: "pointer" }}>🔮 Try On My Car</p>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
export default function MarketplacePage() {
  const [buildImgError, setBuildImgError] = useState(false);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 100 }}>

      {/* ── Mode Tabs ── */}
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
          const isActive = tab.id === "designs";
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

      {/* ── Hero ── */}
      <div
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(12,12,16,0.9) 0%, rgba(12,12,16,0.6) 50%, rgba(12,12,16,0.1) 100%),
            url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&h=600&fit=crop&q=80&fm=webp')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "clamp(280px, 400px, 400px)",
          display: "flex",
          alignItems: "center",
          padding: "0 28px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 520 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#44CCFF",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            AVA.CAR MARKETPLACE
          </p>
          <h1
            style={{
              fontSize: "clamp(28px, 5vw, 40px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: 14,
            }}
          >
            Everything For Your Car
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", marginBottom: 28, lineHeight: 1.5 }}>
            Browse 50,000+ designs, real products from top brands, and certified local shops.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/marketplace/designs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "13px 24px",
                borderRadius: 100,
                background: "linear-gradient(135deg, #44CCFF, #0099cc)",
                color: "#0C0C10",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Browse Designs →
            </Link>
            <Link
              href="/marketplace/products"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "13px 24px",
                borderRadius: 100,
                border: "1.5px solid rgba(255,255,255,0.4)",
                background: "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Shop Products →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Find Your Look — Designs ── */}
      <div style={{ padding: "48px 0 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
              DESIGNS
            </p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
              Find Your Look
            </p>
            <p style={{ fontSize: 14, color: "var(--color-text-tertiary)", marginTop: 4 }}>
              Browse 50,000+ designs. Try any of them on your car.
            </p>
          </div>
          <Link
            href="/marketplace/designs"
            style={{ fontSize: 13, color: "#44CCFF", textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            See All Designs →
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "0 20px 4px",
          }}
        >
          {FEATURED_DESIGNS.map((design) => (
            <DesignCard key={design.slug} design={design} />
          ))}
        </div>
      </div>

      {/* ── Real Products, Real Brands ── */}
      <div style={{ padding: "48px 0 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px", marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
              PRODUCTS
            </p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
              Real Products, Real Brands
            </p>
          </div>
          <Link
            href="/marketplace/products"
            style={{ fontSize: 13, color: "#44CCFF", textDecoration: "none", flexShrink: 0, whiteSpace: "nowrap" }}
          >
            Shop All Products →
          </Link>
        </div>

        {/* Brand circles */}
        <div style={{ display: "flex", gap: 14, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 16px" }}>
          {marketplaceBrands.slice(0, 1).map((brand) => (
            <Link
              key={brand.slug}
              href={`/marketplace/brands/${brand.slug}`}
              style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none" }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background: "#FF0000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: "-0.02em",
                }}
              >
                3M
              </div>
              <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)" }}>3M</p>
            </Link>
          ))}
          {EXTRA_BRANDS.map((b) => {
            const BRAND_SLUGS: Record<string, string> = {
              "Avery": "avery",
              "HRE": "hre",
              "XPEL": "xpel",
              "Vossen": "vossen",
              "Inozetek": "inozetek",
              "Liberty Walk": "liberty-walk",
              "BBS": "bbs",
            };
            return (
              <Link
                key={b}
                href={`/marketplace/brands/${BRAND_SLUGS[b] ?? b.toLowerCase()}`}
                style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textDecoration: "none" }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: BRAND_COLORS[b] ?? "var(--color-surface-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 12,
                    fontWeight: 900,
                    color: "#fff",
                    letterSpacing: "-0.02em",
                    textAlign: "center",
                    padding: "0 4px",
                  }}
                >
                  {b.length > 4 ? b.substring(0, 3) : b.substring(0, 2)}
                </div>
                <p style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)", maxWidth: 60, textAlign: "center", lineHeight: 1.2 }}>
                  {b}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Trending product cards */}
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 4px" }}>
          {TRENDING.map((product, idx) => {
            const hex = product.primaryColorHex ?? "#333";
            return (
              <Link
                key={product.slug}
                href={`/marketplace/products/${product.slug}`}
                style={{
                  flexShrink: 0,
                  width: 160,
                  background: "var(--color-surface)",
                  borderRadius: 16,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: `linear-gradient(135deg, ${hex}, ${hex}99)`,
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)" }} />
                  <span style={{ fontSize: 28, opacity: 0.35, filter: "brightness(1.6)", zIndex: 1 }}>
                    {product.category === "wheels" ? "⚙️" : "🎨"}
                  </span>
                  <div
                    style={{
                      position: "absolute", top: 8, left: 8,
                      padding: "3px 8px", borderRadius: 100,
                      background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)",
                      fontSize: 9, fontWeight: 700, color: "#fff", letterSpacing: "0.05em", zIndex: 2,
                    }}
                  >
                    {product.brand}
                  </div>
                  {idx === 0 && (
                    <div
                      style={{
                        position: "absolute", top: 8, right: 8,
                        fontSize: 9, fontWeight: 600,
                        color: "var(--color-text-tertiary)",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        zIndex: 2,
                      }}
                    >
                      Sponsored
                    </div>
                  )}
                </div>
                <div style={{ padding: "10px 12px 12px" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.3 }}>{product.name}</p>
                  <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2, textTransform: "capitalize" }}>{product.finish}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", marginTop: 6 }}>
                    from ${product.fromPrice}
                    <span style={{ fontSize: 10, fontWeight: 400, color: "var(--color-text-tertiary)" }}> {product.unit}</span>
                  </p>
                  <p style={{ fontSize: 11, fontWeight: 600, color: "#44CCFF", marginTop: 6, cursor: "pointer" }}>
                    🔮 Try On My Car →
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── Find Someone to Build It — Shops ── */}
      <div style={{ padding: "48px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          SHOPS
        </p>
        <p style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Find Someone to Build It
        </p>
        <p style={{ fontSize: 14, color: "var(--color-text-tertiary)", marginBottom: 16 }}>
          Zeno Certified installers near you. Vetted, rated, ready.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {FEATURED_SHOPS.map((shop) => (
            <div
              key={shop.name}
              style={{
                background: "var(--color-surface)",
                borderRadius: 16,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #44CCFF33, #44CCFF11)",
                    border: "1.5px solid #44CCFF44",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#44CCFF",
                    flexShrink: 0,
                  }}
                >
                  {shop.avatar}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>{shop.name}</p>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: "#44CCFF",
                        background: "rgba(68,204,255,0.12)",
                        padding: "2px 7px",
                        borderRadius: 100,
                      }}
                    >
                      {shop.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>{shop.location}</p>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>★ {shop.rating} · {shop.jobs} jobs</p>
                <Link
                  href="/create/shops"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#44CCFF",
                    textDecoration: "none",
                    padding: "5px 12px",
                    borderRadius: 100,
                    border: "1px solid #44CCFF44",
                  }}
                >
                  Book →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/create/shops"
          style={{
            display: "block",
            textAlign: "center",
            marginTop: 16,
            padding: "13px 24px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #44CCFF, #0099cc)",
            color: "#0C0C10",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Find Shops Near Me →
        </Link>
      </div>

      {/* ── Shop by Style ── */}
      <div style={{ padding: "48px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 6 }}>
          Shop by Style
        </p>
        <p style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 14 }}>
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
                backgroundImage: `url('${style.bgImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                textDecoration: "none",
                display: "block",
                minHeight: 100,
                position: "relative",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: style.color, opacity: 0.65 }} />
              <div
                style={{
                  position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%",
                  background: `radial-gradient(circle, ${style.accent}44, transparent 70%)`,
                  transform: "translate(20%, -20%)",
                }}
              />
              <div style={{ position: "relative", zIndex: 1, padding: "20px 14px", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: style.accent, marginBottom: 4 }} />
                <p style={{ fontSize: 13, fontWeight: 800, color: "#f0f2f5", letterSpacing: "-0.01em" }}>{style.label}</p>
                <p style={{ fontSize: 10, color: "rgba(240,242,245,0.65)", lineHeight: 1.4 }}>{style.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Community Build ── */}
      <div style={{ padding: "48px 20px 0", marginTop: 48 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 10 }}>
          Community Build
        </p>
        <div style={{ background: "var(--color-surface)", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ width: "100%", aspectRatio: "16/9", position: "relative", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
            {buildImgError ? (
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #0d1117 0%, #1a1a2e 50%, #1c1c1e 100%)" }} />
            ) : (
              <img
                src="https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=800&h=500&fit=crop&q=80&fm=webp"
                alt="BMW M4 community build"
                loading="lazy"
                onError={() => setBuildImgError(true)}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)" }} />
            <div style={{ position: "relative", zIndex: 1, padding: 16 }}>
              <p style={{ fontSize: 10, color: "rgba(240,242,245,0.65)", fontWeight: 600, letterSpacing: "0.1em", marginBottom: 4 }}>
                @wrapsbyalex · 2024 BMW M4
              </p>
              <p style={{ fontSize: 18, fontWeight: 700, color: "#f0f2f5", letterSpacing: "-0.01em" }}>Satin Black + HRE FF15</p>
            </div>
          </div>
          <div style={{ padding: "16px 16px 20px" }}>
            <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginBottom: 12, lineHeight: 1.5 }}>This build used:</p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[
                { label: "3M 1080 Satin Black", slug: "3m-1080-satin-black" },
                { label: "HRE FF15 Gloss Black", slug: "hre-ff15-gloss-black" },
                { label: "XPEL Ultimate Plus",   slug: "xpel-ultimate-plus" },
              ].map((p) => (
                <Link
                  key={p.slug}
                  href={`/marketplace/products/${p.slug}`}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 100,
                    background: "rgba(68,204,255,0.1)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#44CCFF",
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

    </div>
  );
}
