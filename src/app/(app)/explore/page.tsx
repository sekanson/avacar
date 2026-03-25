"use client";

import { useState, useEffect } from "react";
import { Search, MapPin, Star, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Wraps", "Wheels", "Tint", "PPF", "Body Kits", "Accessories"];

const FEATURED_BUILDS = [
  {
    id: "b1",
    car: "2023 GR86",
    type: "Matte Wrap",
    shop: "WrapsByAlex",
    price: "$1,400",
    gradient: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 100%)",
    accent: "#44CCFF",
    tag: "Wraps",
  },
  {
    id: "b2",
    car: "2022 M4 Comp",
    type: "Carbon Kit",
    shop: "CarbonWerks",
    price: "Quote on request",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0808 100%)",
    accent: "#F87171",
    tag: "Body Kits",
  },
  {
    id: "b3",
    car: "2021 GT-R R35",
    type: "Ceramic Tint",
    shop: "TintPros GTA",
    price: "$650",
    gradient: "linear-gradient(135deg, #04080e 0%, #08101c 100%)",
    accent: "#34D399",
    tag: "Tint",
  },
  {
    id: "b4",
    car: "2023 WRX",
    type: "Forged Wheels",
    shop: "RimCity",
    price: "$3,200",
    gradient: "linear-gradient(135deg, #0a080e 0%, #180d24 100%)",
    accent: "#A78BFA",
    tag: "Wheels",
  },
  {
    id: "b5",
    car: "2022 RS6 Avant",
    type: "Full PPF",
    shop: "ArmorShield",
    price: "$4,800",
    gradient: "linear-gradient(135deg, #090a08 0%, #111a0e 100%)",
    accent: "#FBBF24",
    tag: "PPF",
  },
  {
    id: "b6",
    car: "2023 Supra A90",
    type: "Chrome Delete",
    shop: "DetailKings",
    price: "$900",
    gradient: "linear-gradient(135deg, #0c0808 0%, #201010 100%)",
    accent: "#FB923C",
    tag: "Accessories",
  },
];

const TRENDING_SHOPS = [
  {
    id: "s1",
    name: "WrapsByAlex",
    rating: 4.9,
    reviews: 214,
    location: "Toronto, ON",
    gradient: "linear-gradient(135deg, #003d8f, #005ab7)",
    initial: "W",
    specialty: "Wraps & PPF",
  },
  {
    id: "s2",
    name: "CarbonWerks",
    rating: 4.8,
    reviews: 178,
    location: "Mississauga, ON",
    gradient: "linear-gradient(135deg, #1a0505, #3d0e0e)",
    initial: "C",
    specialty: "Body Kits",
  },
  {
    id: "s3",
    name: "RimCity",
    rating: 4.7,
    reviews: 320,
    location: "Brampton, ON",
    gradient: "linear-gradient(135deg, #0a0814, #1a1030)",
    initial: "R",
    specialty: "Wheels",
  },
  {
    id: "s4",
    name: "ArmorShield",
    rating: 5.0,
    reviews: 89,
    location: "Vaughan, ON",
    gradient: "linear-gradient(135deg, #081408, #0e2010)",
    initial: "A",
    specialty: "PPF",
  },
];

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #14141A 25%, #1C1C24 50%, #14141A 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: 12,
        ...style,
      }}
    />
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = FEATURED_BUILDS.filter((b) => {
    const matchesCat = activeCategory === "All" || b.tag === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      b.car.toLowerCase().includes(q) ||
      b.type.toLowerCase().includes(q) ||
      b.shop.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 24 }}>
      {/* TopBar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
          padding: "12px 20px 14px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 22,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            margin: "0 0 12px",
          }}
        >
          Explore
        </h1>

        {/* Search bar */}
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            color="#6B6B7B"
            style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search builds, cars, shops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              height: 44,
              padding: "0 16px 0 42px",
              borderRadius: 12,
              border: "1px solid #2A2A36",
              background: "#1C1C24",
              fontSize: 14,
              color: "#FFFFFF",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Category chips */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "14px 20px 0",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "7px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                border: isActive ? "1px solid rgba(68,204,255,0.30)" : "1px solid #2A2A36",
                background: isActive ? "rgba(68,204,255,0.15)" : "#14141A",
                color: isActive ? "#44CCFF" : "#A0A0B0",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Featured Builds */}
      <section style={{ padding: "20px 20px 0" }}>
        <h2
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 800,
            fontSize: 18,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            margin: "0 0 14px",
          }}
        >
          Featured Builds
        </h2>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} style={{ height: 200 }} />
            ))}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {filtered.map((build, i) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                style={{
                  borderRadius: 16,
                  background: "#14141A",
                  border: "1px solid #2A2A36",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* Gradient image */}
                <div
                  style={{
                    height: 110,
                    background: build.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      background: build.accent,
                      opacity: 0.25,
                      filter: "blur(14px)",
                      position: "absolute",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: build.accent,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      background: `${build.accent}18`,
                      border: `1px solid ${build.accent}30`,
                      borderRadius: 999,
                      padding: "3px 8px",
                      position: "relative",
                    }}
                  >
                    {build.tag}
                  </span>
                </div>

                {/* Details */}
                <div style={{ padding: "10px 12px 12px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 800,
                      fontSize: 13,
                      color: "#FFFFFF",
                      margin: "0 0 2px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {build.car}
                  </p>
                  <p style={{ fontSize: 11, color: "#A0A0B0", margin: "0 0 6px" }}>
                    {build.type}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "#6B6B7B" }}>{build.shop}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: build.accent }}>
                      {build.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {filtered.length === 0 && (
              <div
                style={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  padding: "40px 0",
                  color: "#6B6B7B",
                  fontSize: 14,
                }}
              >
                No builds found.
              </div>
            )}
          </div>
        )}
      </section>

      {/* Trending Shops */}
      <section style={{ padding: "28px 0 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            marginBottom: 14,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800,
              fontSize: 18,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Trending Shops
          </h2>
          <button
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#44CCFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            See All
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            padding: "4px 20px 8px",
            overflowX: "auto",
            scrollbarWidth: "none",
          }}
        >
          {loading
            ? [...Array(4)].map((_, i) => (
                <Skeleton key={i} style={{ width: 160, height: 130, flexShrink: 0 }} />
              ))
            : TRENDING_SHOPS.map((shop, i) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
                  style={{
                    flexShrink: 0,
                    width: 160,
                    background: "#14141A",
                    borderRadius: 16,
                    border: "1px solid #2A2A36",
                    padding: 14,
                    cursor: "pointer",
                  }}
                >
                  {/* Logo */}
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: shop.gradient,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 900,
                      fontSize: 18,
                      color: "#FFFFFF",
                      marginBottom: 10,
                    }}
                  >
                    {shop.initial}
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 800,
                      fontSize: 13,
                      color: "#FFFFFF",
                      margin: "0 0 2px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {shop.name}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <Star size={11} color="#FBBF24" fill="#FBBF24" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#FBBF24" }}>
                      {shop.rating}
                    </span>
                    <span style={{ fontSize: 11, color: "#6B6B7B" }}>({shop.reviews})</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <MapPin size={10} color="#6B6B7B" />
                    <span style={{ fontSize: 10, color: "#6B6B7B" }}>{shop.location}</span>
                  </div>
                </motion.div>
              ))}
        </div>
      </section>

      {/* Shimmer keyframe — injected inline via global style hack */}
      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}
