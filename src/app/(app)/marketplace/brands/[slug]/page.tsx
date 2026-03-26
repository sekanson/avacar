"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBrandBySlug } from "@/data/marketplace";

/* ─── Inline brand data for 3M, HRE, Vossen (as per spec) ─── */
const BRAND_OVERRIDES: Record<string, {
  color: string;
  textColor: string;
  category: string;
  about: string;
  heroImg: string;
  products: { name: string; type: string; price: string; unit: string; colorHex: string }[];
  filterChips: string[];
  stats: { products: number; builds: number; rating: number };
}> = {
  "3m": {
    color: "#CC0000",
    textColor: "#ffffff",
    category: "Wraps & PPF",
    about: "3M is the world's leading manufacturer of vinyl wrap films and paint protection film, trusted by professional installers and detailing shops worldwide. From the iconic 1080 Series to advanced Scotchgard PPF, 3M sets the global standard.",
    heroImg: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80&fm=webp",
    filterChips: ["All", "Wraps", "PPF", "Tint"],
    stats: { products: 42, builds: 8400, rating: 4.9 },
    products: [
      { name: "1080 Satin Black",       type: "Vinyl Wrap Film",  price: "28",  unit: "/sqft", colorHex: "#1a1a1a" },
      { name: "1080 Gloss Nardo Gray",  type: "Vinyl Wrap Film",  price: "32",  unit: "/sqft", colorHex: "#9a9aaa" },
      { name: "2080 Matte Charcoal",    type: "Vinyl Wrap Film",  price: "30",  unit: "/sqft", colorHex: "#3a3a3a" },
      { name: "Scotchgard PPF Pro",     type: "Paint Protection", price: "45",  unit: "/sqft", colorHex: "#d0d8e0" },
      { name: "1080 Color Shift",       type: "Vinyl Wrap Film",  price: "38",  unit: "/sqft", colorHex: "#6644aa" },
      { name: "Crystalline Window Tint",type: "Window Film",      price: "18",  unit: "/sqft", colorHex: "#8ab4c8" },
    ],
  },
  "hre": {
    color: "#1a1a1a",
    textColor: "#C9A84C",
    category: "Wheels",
    about: "HRE Performance Wheels crafts the world's finest forged wheels for the most demanding drivers and builds. Each set is manufactured in Vista, California using aerospace-grade 6061-T6 aluminum.",
    heroImg: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=1200&q=80&fm=webp",
    filterChips: ["All", "Mesh", "Split-Spoke", "Monoblock"],
    stats: { products: 18, builds: 3200, rating: 4.9 },
    products: [
      { name: "FF15 Brushed Dark",  type: "Forged Wheel", price: "4,800", unit: "/set", colorHex: "#3a3a3a" },
      { name: "P101 Satin Black",   type: "Forged Wheel", price: "6,200", unit: "/set", colorHex: "#1a1a1a" },
      { name: "R101 Lightweight",   type: "Forged Wheel", price: "7,400", unit: "/set", colorHex: "#5a5a5a" },
      { name: "FF04 Tarmac",        type: "Forged Wheel", price: "3,800", unit: "/set", colorHex: "#2a2a2a" },
      { name: "S201H Forged",       type: "Forged Wheel", price: "9,600", unit: "/set", colorHex: "#C9A84C" },
      { name: "Classic 300",        type: "Forged Wheel", price: "5,200", unit: "/set", colorHex: "#888888" },
    ],
  },
  "vossen": {
    color: "#C9A84C",
    textColor: "#0C0C10",
    category: "Wheels",
    about: "Vossen Wheels is a Miami-based luxury wheel manufacturer known for precision craftsmanship and an unmatched catalog of flow-formed and forged designs for sport, luxury, and performance vehicles.",
    heroImg: "https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?w=1200&q=80&fm=webp",
    filterChips: ["All", "Flow Form", "Forged", "Hybrid"],
    stats: { products: 24, builds: 5600, rating: 4.8 },
    products: [
      { name: "CV3 Gloss Black",  type: "Flow Formed Wheel", price: "3,200", unit: "/set", colorHex: "#1a1a1a" },
      { name: "HF-5 Silver",      type: "Flow Formed Wheel", price: "2,800", unit: "/set", colorHex: "#c0c0c0" },
      { name: "ML-R1 Forged",     type: "Forged Wheel",      price: "8,400", unit: "/set", colorHex: "#4a4a4a" },
      { name: "CV10 Matte Grey",  type: "Flow Formed Wheel", price: "3,600", unit: "/set", colorHex: "#888888" },
      { name: "HF-7 Bronze",      type: "Flow Formed Wheel", price: "3,000", unit: "/set", colorHex: "#8B6914" },
      { name: "S21-01 Carbon",    type: "Forged Wheel",      price: "6,800", unit: "/set", colorHex: "#222222" },
    ],
  },
};

const COMMUNITY_BUILDS = [
  { img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=400&h=267&fit=crop&q=70&fm=webp", creator: "@wrapsbyalex", likes: 2840 },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop&q=70&fm=webp",   creator: "@jdm.wraps",    likes: 1920 },
  { img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=267&fit=crop&q=70&fm=webp",   creator: "@graphicflow",  likes: 1450 },
];

const CERTIFIED_SHOPS = [
  { name: "WrapLords LA",    location: "Los Angeles, CA", rating: 4.9, jobs: 342 },
  { name: "Euro Atelier",    location: "Miami, FL",       rating: 4.8, jobs: 217 },
  { name: "JDM Customs NYC", location: "New York, NY",    rating: 4.7, jobs: 189 },
];

const WHEEL_IMGS = [
  "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=400&h=300&fit=crop&q=70&fm=webp",
  "https://images.unsplash.com/photo-1626668011687-8a114cf5a34c?w=400&h=300&fit=crop&q=70&fm=webp",
  "https://images.unsplash.com/photo-1605559911160-a3d95d213904?w=400&h=300&fit=crop&q=70&fm=webp",
];

/* ─── Product Card ─── */
function BrandProductCard({
  product,
  isWheel,
}: {
  product: { name: string; type: string; price: string; unit: string; colorHex: string };
  isWheel: boolean;
}) {
  return (
    <div style={{ background: "var(--color-surface)", borderRadius: 16, overflow: "hidden" }}>
      <div
        style={{
          width: "100%",
          height: 180,
          background: isWheel ? "#111" : product.colorHex,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isWheel ? (
          <img
            src={WHEEL_IMGS[product.name.charCodeAt(0) % 3]}
            alt={product.name}
            loading="lazy"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 55%)",
            }}
          />
        )}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
          {product.name}
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 3 }}>{product.type}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#44CCFF", marginTop: 6 }}>
          From ${product.price}
          <span style={{ fontWeight: 400, color: "var(--color-text-tertiary)" }}>{product.unit}</span>
        </p>
        <button
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: 12,
            fontWeight: 600,
            color: "#44CCFF",
            cursor: "pointer",
            marginTop: 8,
          }}
        >
          Visualize on My Car →
        </button>
      </div>
    </div>
  );
}

/* ─── Main Page ─── */
export default function BrandStorefrontPage() {
  const { slug } = useParams<{ slug: string }>();
  const [activeFilter, setActiveFilter] = useState("All");
  const [aboutExpanded, setAboutExpanded] = useState(false);

  const override = BRAND_OVERRIDES[slug ?? ""];
  const dbBrand = getBrandBySlug(slug ?? "");

  /* ── Completely unknown brand ── */
  if (!override && !dbBrand) {
    const brandName = (slug ?? "").replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <div
        style={{
          background: "var(--color-bg)",
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          padding: "60px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: 48 }}>🏁</p>
        <p style={{ fontSize: 24, fontWeight: 800, color: "var(--color-text-primary)" }}>
          {brandName} — Coming Soon
        </p>
        <p style={{ fontSize: 14, color: "var(--color-text-tertiary)" }}>
          {"We're onboarding this brand. Check back soon for products and builds."}
        </p>
        <Link
          href="/marketplace"
          style={{
            padding: "12px 28px",
            borderRadius: 100,
            background: "linear-gradient(135deg, #44CCFF, #0099cc)",
            color: "#0C0C10",
            fontWeight: 700,
            fontSize: 14,
            textDecoration: "none",
          }}
        >
          Back to Marketplace
        </Link>
      </div>
    );
  }

  /* Resolve display values */
  const brandName   = override ? slug!.toUpperCase().replace("3M", "3M") : dbBrand!.name;
  const tagline     = override ? "" : dbBrand!.tagline;
  const heroImg     = override?.heroImg ?? "";
  const brandColor  = override?.color ?? "#1a1a1a";
  const textColor   = override?.textColor ?? "#ffffff";
  const category    = override?.category ?? "Automotive";
  const about       = override?.about ?? dbBrand!.about;
  const stats       = override?.stats ?? { products: dbBrand!.productCount, builds: dbBrand!.buildsCount, rating: dbBrand!.avgRating };
  const products    = override?.products ?? [];
  const filterChips = override?.filterChips ?? ["All"];
  const isWheel     = category === "Wheels";

  /* Resolve brand display name */
  const displayName = dbBrand?.name ?? slug!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 80 }}>

      {/* ── Hero Banner ── */}
      <div
        style={{
          position: "relative",
          height: 280,
          overflow: "hidden",
          background: brandColor,
        }}
      >
        {heroImg && (
          <img
            src={heroImg}
            alt={displayName}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.3,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(to right, ${brandColor}f0 0%, ${brandColor}99 55%, ${brandColor}22 100%)`,
          }}
        />
        {/* Dark gradient for text readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.45) 100%)",
          }}
        />

        {/* Back button */}
        <Link
          href="/marketplace"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            zIndex: 2,
          }}
        >
          <ArrowLeft size={17} color="#fff" />
        </Link>

        {/* Hero content — left side */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            zIndex: 2,
          }}
        >
          <div style={{ maxWidth: "60%" }}>
            {/* Brand logo circle */}
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
                border: "2px solid rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: displayName.length > 4 ? 14 : 20,
                fontWeight: 900,
                color: textColor === "#ffffff" ? "#fff" : textColor,
                letterSpacing: "-0.02em",
                marginBottom: 16,
              }}
            >
              {displayName}
            </div>
            <h1
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 8,
              }}
            >
              {displayName}
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", fontWeight: 500, lineHeight: 1.4 }}>
              {tagline || category}
            </p>
          </div>
        </div>
      </div>

      {/* ── Brand Info Bar ── */}
      <div
        style={{
          background: "var(--color-surface)",
          padding: "16px 20px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: brandColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: displayName.length > 4 ? 10 : 14,
              fontWeight: 900,
              color: textColor === "#ffffff" ? "#fff" : textColor,
              flexShrink: 0,
            }}
          >
            {displayName}
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
                {displayName}
              </p>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#44CCFF",
                  background: "rgba(68,204,255,0.12)",
                  padding: "2px 8px",
                  borderRadius: 100,
                }}
              >
                {category}
              </span>
            </div>
            <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>
              {stats.products} Products · Used in {stats.builds.toLocaleString()} builds · ★{stats.rating} average
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "var(--color-text-secondary)",
            lineHeight: 1.6,
            overflow: aboutExpanded ? "visible" : "hidden",
            display: "-webkit-box",
            WebkitLineClamp: aboutExpanded ? undefined : 2,
            WebkitBoxOrient: "vertical" as const,
          }}
        >
          {about}
        </p>
        <button
          onClick={() => setAboutExpanded((v) => !v)}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            fontSize: 12,
            fontWeight: 600,
            color: "#44CCFF",
            cursor: "pointer",
            marginTop: 4,
          }}
        >
          {aboutExpanded ? "Show less" : "Read more"}
        </button>
      </div>

      {/* ── Featured Products ── */}
      {products.length > 0 && (
        <div style={{ padding: "32px 20px 0" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
            FEATURED PRODUCTS
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
            Top Picks
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {products.slice(0, 3).map((p) => (
              <BrandProductCard key={p.name} product={p} isWheel={isWheel} />
            ))}
          </div>
        </div>
      )}

      {/* ── Popular in Community ── */}
      <div style={{ padding: "32px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          POPULAR IN COMMUNITY
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
          Builds Using {displayName}
        </p>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
          {COMMUNITY_BUILDS.map((build, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 220,
                background: "var(--color-surface)",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                <img
                  src={build.img}
                  alt="Community build"
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    padding: "3px 8px",
                    borderRadius: 100,
                    background: brandColor,
                    fontSize: 9,
                    fontWeight: 700,
                    color: textColor === "#ffffff" ? "#fff" : textColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  Uses {displayName} {products[i]?.name.split(" ").slice(0, 2).join(" ") ?? ""}
                </div>
              </div>
              <div style={{ padding: "10px 12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 600 }}>{build.creator}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>♥ {build.likes.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── All Products ── */}
      {products.length > 0 && (
        <div style={{ padding: "32px 20px 0" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
            ALL PRODUCTS
          </p>
          <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Full Catalog
          </p>
          {/* Filter chips */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", marginBottom: 16 }}>
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                style={{
                  flexShrink: 0,
                  padding: "7px 16px",
                  borderRadius: 100,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: activeFilter === chip ? "#44CCFF" : "var(--color-surface)",
                  color: activeFilter === chip ? "#0C0C10" : "var(--color-text-secondary)",
                  transition: "all 0.15s",
                }}
              >
                {chip}
              </button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {products.map((p) => (
              <BrandProductCard key={p.name} product={p} isWheel={isWheel} />
            ))}
          </div>
        </div>
      )}

      {/* ── Certified Shops ── */}
      <div style={{ padding: "32px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          CERTIFIED SHOPS
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>
          Shops That Carry {displayName}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {CERTIFIED_SHOPS.map((shop) => (
            <div
              key={shop.name}
              style={{
                background: "var(--color-surface)",
                borderRadius: 14,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(68,204,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#44CCFF",
                    flexShrink: 0,
                  }}
                >
                  {shop.name[0]}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>{shop.name}</p>
                    <span
                      style={{
                        fontSize: 8,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: textColor === "#0C0C10" ? "#0C0C10" : "#fff",
                        background: brandColor,
                        padding: "2px 6px",
                        borderRadius: 100,
                      }}
                    >
                      {displayName} CERTIFIED
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>
                    {shop.location} · ★{shop.rating} · {shop.jobs} jobs
                  </p>
                </div>
              </div>
              <Link
                href="/create/shops"
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#44CCFF",
                  textDecoration: "none",
                  padding: "6px 14px",
                  borderRadius: 100,
                  border: "1px solid rgba(68,204,255,0.3)",
                  flexShrink: 0,
                }}
              >
                Book →
              </Link>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, textAlign: "center" }}>
          <Link
            href="/marketplace/brand-portal"
            style={{ fontSize: 12, color: "var(--color-text-tertiary)", textDecoration: "none" }}
          >
            Brand Manager? → Go to Brand Portal
          </Link>
        </div>
      </div>

    </div>
  );
}
