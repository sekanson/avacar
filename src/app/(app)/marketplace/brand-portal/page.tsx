"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, TrendingDown, Minus } from "lucide-react";

/* ─── Mock Data ─── */
const KPI_CARDS = [
  { value: "42.8K", label: "Product Views",  sublabel: "Last 30 days" },
  { value: "8,400", label: "Builds Using",   sublabel: "Your products" },
  { value: "$124K", label: "Revenue",        sublabel: "This Quarter" },
  { value: "★4.9",  label: "Avg Rating",     sublabel: "Across catalog" },
];

const PRODUCT_PERFORMANCE = [
  { name: "1080 Satin Black",    views: "12.4K", builds: "3,200", revenue: "$42K", trend: "up",   pct: "12%" },
  { name: "1080 Nardo Gray",     views: "8.7K",  builds: "1,800", revenue: "$28K", trend: "up",   pct: "8%" },
  { name: "2080 Matte Charcoal", views: "6.2K",  builds: "1,400", revenue: "$18K", trend: "up",   pct: "15%" },
  { name: "Scotchgard PPF Pro",  views: "4.1K",  builds: "980",   revenue: "$22K", trend: "flat", pct: "0%" },
  { name: "Color Shift",         views: "3.8K",  builds: "620",   revenue: "$11K", trend: "up",   pct: "24%" },
  { name: "Crystalline Tint",    views: "2.9K",  builds: "400",   revenue: "$3K",  trend: "down", pct: "5%" },
];

const COMMUNITY_BUILDS = [
  { img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=400&h=267&fit=crop&q=70&fm=webp", creator: "@wrapsbyalex", product: "1080 Satin Black", likes: 2840 },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=267&fit=crop&q=70&fm=webp",   creator: "@jdm.wraps",    product: "1080 Nardo Gray",  likes: 1920 },
  { img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=267&fit=crop&q=70&fm=webp",   creator: "@graphicflow",  product: "Color Shift",      likes: 1450 },
];

const CERTIFIED_SHOPS = [
  { name: "WrapLords LA",    location: "Los Angeles, CA", rating: 4.9, jobs: 342 },
  { name: "Euro Atelier",    location: "Miami, FL",       rating: 4.8, jobs: 217 },
  { name: "JDM Customs NYC", location: "New York, NY",    rating: 4.7, jobs: 189 },
];

/* ─── Trend Icon ─── */
function TrendBadge({ trend, pct }: { trend: string; pct: string }) {
  if (trend === "up")   return <span style={{ color: "#34D399", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><TrendingUp size={12} /> {pct}</span>;
  if (trend === "down") return <span style={{ color: "#F87171", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><TrendingDown size={12} /> {pct}</span>;
  return <span style={{ color: "#FBBF24", fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", gap: 2 }}><Minus size={12} /> {pct}</span>;
}

/* ─── Main Page ─── */
export default function BrandPortalPage() {
  const [activeBrand, setActiveBrand] = useState("3M Performance Division");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 80 }}>

      {/* ── Header ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.5)",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Link
          href="/settings"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--color-surface)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
          }}
        >
          <ArrowLeft size={17} color="var(--color-text-secondary)" />
        </Link>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase" }}>
            BRAND PORTAL
          </p>
          <p style={{ fontSize: 18, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
            {activeBrand}
          </p>
        </div>
        {/* Brand switcher */}
        <select
          value={activeBrand}
          onChange={(e) => setActiveBrand(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: 8,
            border: "none",
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            fontSize: 12,
            fontWeight: 600,
            outline: "none",
            cursor: "pointer",
          }}
        >
          {["3M Performance Division", "3M Window Film Division", "3M PPF Division"].map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>

      <div style={{ padding: "24px 20px 0" }}>

        {/* ── KPI Cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32 }}>
          {KPI_CARDS.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                background: "var(--color-surface)",
                borderRadius: 16,
                padding: "16px 14px",
              }}
            >
              <p style={{ fontSize: 26, fontWeight: 900, color: "var(--color-text-primary)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                {kpi.value}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", marginTop: 6 }}>{kpi.label}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{kpi.sublabel}</p>
            </div>
          ))}
        </div>

        {/* ── Product Performance ── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          PRODUCT PERFORMANCE
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 14 }}>
          Catalog Analytics
        </p>
        <div style={{ background: "var(--color-surface)", borderRadius: 16, overflow: "hidden", marginBottom: 32 }}>
          {/* Table header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {["Product", "Views", "Builds", "Revenue", "Trend"].map((h) => (
              <p key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {h}
              </p>
            ))}
          </div>
          {/* Table rows */}
          {PRODUCT_PERFORMANCE.map((row, i) => (
            <div
              key={row.name}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                padding: "12px 16px",
                borderBottom: i < PRODUCT_PERFORMANCE.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>{row.name}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{row.views}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{row.builds}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>{row.revenue}</p>
              <TrendBadge trend={row.trend} pct={row.pct} />
            </div>
          ))}
        </div>

        {/* ── Top Community Builds ── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          TOP COMMUNITY BUILDS
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 4 }}>
          Your Brand in the Wild
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", marginBottom: 14 }}>
          Most popular builds using your products
        </p>
        <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4, marginBottom: 32 }}>
          {COMMUNITY_BUILDS.map((build) => (
            <div
              key={build.creator}
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
                  alt={build.creator}
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
                    background: "#CC0000",
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#fff",
                  }}
                >
                  3M {build.product}
                </div>
              </div>
              <div style={{ padding: "10px 12px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", fontWeight: 600 }}>{build.creator}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>♥ {build.likes.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Certified Shops ── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          CERTIFIED SHOPS
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 14 }}>
          Shops Carrying Your Products
        </p>
        {/* Map placeholder */}
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            height: 160,
            marginBottom: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, rgba(68,204,255,0.04) 0%, rgba(68,204,255,0.08) 100%)",
            }}
          />
          <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", fontWeight: 500, position: "relative" }}>
            🗺️ Map integration coming soon
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
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
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                  }}
                >
                  {shop.name[0]}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>{shop.name}</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 1 }}>
                    {shop.location} · ★{shop.rating} · {shop.jobs} jobs
                  </p>
                </div>
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color: "#CC0000",
                  background: "rgba(204,0,0,0.1)",
                  padding: "3px 8px",
                  borderRadius: 100,
                }}
              >
                CERTIFIED
              </span>
            </div>
          ))}
        </div>

        {/* ── Sponsored Placement ── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 4 }}>
          SPONSORED PLACEMENT
        </p>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 14 }}>
          Boost Your Products
        </p>
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 20,
            padding: "20px",
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <span style={{ fontSize: 24 }}>📈</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}>
                Featured Product Placement
              </p>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", marginTop: 2, lineHeight: 1.5 }}>
                Get your products in front of 50K+ monthly active users.
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {[
              { label: "Homepage Feature",    price: "$499/week" },
              { label: "Category Spotlight",  price: "$299/week" },
              { label: "Search Priority",     price: "$199/week" },
            ].map((option) => (
              <div
                key={option.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  background: "var(--color-surface-elevated)",
                  borderRadius: 10,
                }}
              >
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{option.label}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: "#44CCFF" }}>{option.price}</p>
              </div>
            ))}
          </div>

          <button
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: 100,
              background: "linear-gradient(135deg, #44CCFF, #0099cc)",
              color: "#0C0C10",
              fontWeight: 800,
              fontSize: 14,
              border: "none",
              cursor: "pointer",
            }}
          >
            Contact Sales →
          </button>
        </div>

        {/* ── Quick Actions ── */}
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "#44CCFF", textTransform: "uppercase", marginBottom: 14 }}>
          QUICK ACTIONS
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { label: "Manage Products →",    href: "/marketplace/upload" },
            { label: "View Storefront →",     href: "/marketplace/brands/3m" },
            { label: "Download Reports →",   href: "#" },
          ].map((action) => (
            <Link
              key={action.label}
              href={action.href}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "var(--color-surface)",
                borderRadius: 12,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                color: "#44CCFF",
              }}
            >
              {action.label}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
