"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import DesignCard from "@/components/community/DesignCard";

// ─── Mock Data ──────────────────────────────────────────────────────────────────

const DESIGNS = [
  { id: "1", name: "Carbon Ghost", designer: { handle: "livery.king" }, price: 75 as number | "free", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", vehicle: "BMW M4", style: "Murdered Out" },
  { id: "2", name: "Neon Drift Kit", designer: { handle: "wraplabs" }, price: "free" as number | "free", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", vehicle: "Toyota Supra", style: "JDM Street" },
  { id: "3", name: "Chrome Wave", designer: { handle: "chromecraft" }, price: 120 as number | "free", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", vehicle: "Porsche 911", style: "Clean Euro" },
  { id: "4", name: "Stealth Edition", designer: { handle: "ghostwraps" }, price: 45 as number | "free", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", vehicle: "G-Wagon", style: "Murdered Out" },
  { id: "5", name: "Sakura Livery", designer: { handle: "jdm.arts" }, price: 25 as number | "free", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", vehicle: "Honda Civic", style: "JDM Street" },
  { id: "6", name: "Sunset Race", designer: { handle: "neon.designs" }, price: 180 as number | "free", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", vehicle: "Nissan GT-R", style: "Racing Livery" },
  { id: "7", name: "Arctic Camo", designer: { handle: "carbonink" }, price: 65 as number | "free", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", vehicle: "BMW M4", style: "Camo" },
  { id: "8", name: "Vapor Chrome", designer: { handle: "euro.skins" }, price: 95 as number | "free", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80", vehicle: "Porsche 911", style: "Color Shift" },
  { id: "9", name: "Night Crawler", designer: { handle: "livery.king" }, price: "free" as number | "free", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", vehicle: "Toyota Supra", style: "Murdered Out" },
  { id: "10", name: "Holographic FX", designer: { handle: "chromecraft" }, price: 150 as number | "free", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", vehicle: "Honda Civic", style: "Color Shift" },
  { id: "11", name: "Matte Onyx", designer: { handle: "ghostwraps" }, price: 55 as number | "free", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", vehicle: "G-Wagon", style: "Murdered Out" },
  { id: "12", name: "Tokyo Drift", designer: { handle: "jdm.arts" }, price: 35 as number | "free", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", vehicle: "Nissan GT-R", style: "JDM Street" },
  { id: "13", name: "Lunar White", designer: { handle: "euro.skins" }, price: "free" as number | "free", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", vehicle: "BMW M4", style: "Clean Euro" },
  { id: "14", name: "Inferno Racing", designer: { handle: "neon.designs" }, price: 200 as number | "free", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", vehicle: "Porsche 911", style: "Racing Livery" },
  { id: "15", name: "Digital Camo", designer: { handle: "carbonink" }, price: 80 as number | "free", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80", vehicle: "G-Wagon", style: "Camo" },
  { id: "16", name: "Prism Shift", designer: { handle: "wraplabs" }, price: 130 as number | "free", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", vehicle: "Toyota Supra", style: "Color Shift" },
  { id: "17", name: "Street King", designer: { handle: "livery.king" }, price: 40 as number | "free", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", vehicle: "Honda Civic", style: "JDM Street" },
  { id: "18", name: "Monaco Blue", designer: { handle: "euro.skins" }, price: 90 as number | "free", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80", vehicle: "Porsche 911", style: "Clean Euro" },
  { id: "19", name: "Shadow Protocol", designer: { handle: "ghostwraps" }, price: "free" as number | "free", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", vehicle: "Nissan GT-R", style: "Murdered Out" },
  { id: "20", name: "Gold Rush", designer: { handle: "neon.designs" }, price: 175 as number | "free", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", vehicle: "BMW M4", style: "Racing Livery" },
];

const DESIGNERS = [
  { handle: "livery.king", name: "Livery King", verified: true, specialty: ["Racing Livery", "Murdered Out"], designs: 47, followers: "12.4K", sales: 892 },
  { handle: "wraplabs", name: "Wrap Labs Studio", verified: true, specialty: ["Color Shift", "Clean Euro"], designs: 31, followers: "8.7K", sales: 541 },
  { handle: "chromecraft", name: "Chrome Craft", verified: false, specialty: ["Color Shift", "Camo"], designs: 23, followers: "5.2K", sales: 287 },
  { handle: "neon.designs", name: "Neon Designs Co", verified: true, specialty: ["Racing Livery", "JDM Street"], designs: 58, followers: "21.1K", sales: 1243 },
  { handle: "jdm.arts", name: "JDM Arts", verified: false, specialty: ["JDM Street"], designs: 19, followers: "3.8K", sales: 156 },
  { handle: "euro.skins", name: "Euro Skins", verified: true, specialty: ["Clean Euro", "Murdered Out"], designs: 34, followers: "9.5K", sales: 678 },
  { handle: "ghostwraps", name: "Ghost Wraps", verified: false, specialty: ["Murdered Out", "Camo"], designs: 15, followers: "2.9K", sales: 98 },
  { handle: "carbonink", name: "Carbon Ink Design", verified: true, specialty: ["Camo", "Racing Livery"], designs: 42, followers: "14.2K", sales: 1024 },
];

// ─── Filter Options ──────────────────────────────────────────────────────────────

const VEHICLE_FILTERS = ["All", "BMW M4", "Supra", "Civic", "G-Wagon", "Porsche 911", "GT-R"];
const STYLE_FILTERS = ["Murdered Out", "Racing Livery", "Color Shift", "JDM Street", "Clean Euro", "Camo"];
const PRICE_FILTERS = ["All", "Free", "Under $50", "$50-$100", "$100+"] as const;
type PriceFilter = typeof PRICE_FILTERS[number];
const SORT_OPTIONS = ["Trending", "Newest", "Price: Low", "Price: High"] as const;
type SortOption = typeof SORT_OPTIONS[number];

// ─── Sub-components ─────────────────────────────────────────────────────────────

function DesignerCard({ d, onNavigate }: { d: typeof DESIGNERS[0]; onNavigate: (path: string) => void }) {
  const [following, setFollowing] = useState(false);
  const initial = d.handle[0].toUpperCase();

  return (
    <div
      style={{
        background: "#14141A",
        border: "1px solid #2A2A36",
        borderRadius: 12,
        padding: "20px 16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
      }}
      onClick={() => onNavigate(`/community/designer/${d.handle}`)}
    >
      {/* Avatar */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #44CCFF, #0088bb)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 800,
          color: "#0C0C10",
          flexShrink: 0,
        }}
      >
        {initial}
      </div>

      {/* Name + verified */}
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#E8E8F0" }}>{d.name}</span>
          {d.verified && (
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: "50%",
                background: "#44CCFF",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 9,
                fontWeight: 900,
                color: "#0C0C10",
                flexShrink: 0,
              }}
            >
              ✓
            </span>
          )}
        </div>
        <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>@{d.handle}</p>
      </div>

      {/* Specialty tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, justifyContent: "center" }}>
        {d.specialty.map((s) => (
          <span
            key={s}
            style={{
              fontSize: 10,
              fontWeight: 600,
              padding: "3px 9px",
              borderRadius: 999,
              background: "rgba(68,204,255,0.1)",
              color: "#44CCFF",
              border: "1px solid rgba(68,204,255,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          gap: 0,
          width: "100%",
          borderTop: "1px solid #2A2A36",
          paddingTop: 12,
          marginTop: 2,
        }}
      >
        {[
          { label: "Designs", value: d.designs },
          { label: "Followers", value: d.followers },
          { label: "Sales", value: d.sales },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              textAlign: "center",
              borderRight: i < 2 ? "1px solid #2A2A36" : "none",
            }}
          >
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#E8E8F0" }}>{stat.value}</p>
            <p style={{ margin: "2px 0 0", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Follow button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setFollowing((f) => !f);
        }}
        style={{
          width: "100%",
          height: 34,
          borderRadius: 999,
          border: following ? "1px solid #44CCFF" : "none",
          background: following ? "rgba(68,204,255,0.1)" : "#44CCFF",
          color: following ? "#44CCFF" : "#0C0C10",
          fontSize: 13,
          fontWeight: 700,
          cursor: "pointer",
          transition: "all 0.15s",
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
        }}
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────────

export default function CommunityPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"explore" | "designers" | "challenges">("explore");

  // Explore filters
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [styleFilters, setStyleFilters] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("All");
  const [sortOption, setSortOption] = useState<SortOption>("Trending");

  function toggleStyleFilter(s: string) {
    setStyleFilters((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  const filteredDesigns = useMemo(() => {
    let result = [...DESIGNS];

    // Vehicle filter
    if (vehicleFilter !== "All") {
      result = result.filter((d) => d.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase()));
    }

    // Style filter
    if (styleFilters.length > 0) {
      result = result.filter((d) => styleFilters.includes(d.style));
    }

    // Price filter
    if (priceFilter === "Free") {
      result = result.filter((d) => d.price === "free");
    } else if (priceFilter === "Under $50") {
      result = result.filter((d) => d.price !== "free" && (d.price as number) < 50);
    } else if (priceFilter === "$50-$100") {
      result = result.filter((d) => d.price !== "free" && (d.price as number) >= 50 && (d.price as number) <= 100);
    } else if (priceFilter === "$100+") {
      result = result.filter((d) => d.price !== "free" && (d.price as number) > 100);
    }

    // Sort
    if (sortOption === "Newest") {
      result = [...result].reverse();
    } else if (sortOption === "Price: Low") {
      result = [...result].sort((a, b) => {
        const pa = a.price === "free" ? 0 : (a.price as number);
        const pb = b.price === "free" ? 0 : (b.price as number);
        return pa - pb;
      });
    } else if (sortOption === "Price: High") {
      result = [...result].sort((a, b) => {
        const pa = a.price === "free" ? 0 : (a.price as number);
        const pb = b.price === "free" ? 0 : (b.price as number);
        return pb - pa;
      });
    }

    return result;
  }, [vehicleFilter, styleFilters, priceFilter, sortOption]);

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 32 }}>

      {/* Sub-nav tabs */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: "rgba(12,12,16,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #2A2A36",
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 0,
        }}
      >
        {(["explore", "designers", "challenges"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              height: 46,
              padding: "0 18px",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? "#44CCFF" : "rgba(255,255,255,0.45)",
              borderBottom: activeTab === tab ? "2px solid #44CCFF" : "2px solid transparent",
              transition: "all 0.15s",
              textTransform: "capitalize",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              letterSpacing: "0.01em",
              marginBottom: -1,
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* ── EXPLORE TAB ── */}
      {activeTab === "explore" && (
        <div>
          {/* Upload CTA banner */}
          <div
            style={{
              margin: "16px 16px 0",
              padding: "14px 16px",
              borderRadius: 12,
              background: "linear-gradient(135deg, rgba(68,204,255,0.12), rgba(68,204,255,0.04))",
              border: "1px solid rgba(68,204,255,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#E8E8F0" }}>Share your design</p>
              <p style={{ margin: "2px 0 0", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>Earn money when others try it on their car</p>
            </div>
            <button
              onClick={() => router.push("/community/upload")}
              style={{
                flexShrink: 0,
                height: 34,
                padding: "0 16px",
                borderRadius: 999,
                background: "#44CCFF",
                color: "#0C0C10",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 700,
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                whiteSpace: "nowrap",
              }}
            >
              Upload
            </button>
          </div>

          {/* Sticky filter bar */}
          <div
            style={{
              position: "sticky",
              top: 46,
              zIndex: 20,
              background: "rgba(12,12,16,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid rgba(42,42,54,0.6)",
              padding: "10px 0 10px",
            }}
          >
            {/* Vehicle chips */}
            <div
              className="scroll-row"
              style={{
                display: "flex",
                gap: 7,
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "0 16px",
              }}
            >
              {VEHICLE_FILTERS.map((v) => (
                <button
                  key={v}
                  onClick={() => setVehicleFilter(v)}
                  style={{
                    flexShrink: 0,
                    height: 30,
                    padding: "0 13px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 600,
                    background: vehicleFilter === v ? "#44CCFF" : "#1C1C24",
                    color: vehicleFilter === v ? "#0C0C10" : "rgba(255,255,255,0.55)",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>

            {/* Style chips */}
            <div
              className="scroll-row"
              style={{
                display: "flex",
                gap: 7,
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "8px 16px 0",
              }}
            >
              {STYLE_FILTERS.map((s) => {
                const active = styleFilters.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggleStyleFilter(s)}
                    style={{
                      flexShrink: 0,
                      height: 28,
                      padding: "0 12px",
                      borderRadius: 999,
                      border: active ? "1px solid #44CCFF" : "1px solid rgba(68,204,255,0.2)",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      background: active ? "rgba(68,204,255,0.14)" : "transparent",
                      color: active ? "#44CCFF" : "rgba(255,255,255,0.45)",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {/* Price + sort row */}
            <div
              className="scroll-row"
              style={{
                display: "flex",
                gap: 7,
                overflowX: "auto",
                scrollbarWidth: "none",
                padding: "8px 16px 0",
                alignItems: "center",
              }}
            >
              {PRICE_FILTERS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPriceFilter(p)}
                  style={{
                    flexShrink: 0,
                    height: 28,
                    padding: "0 12px",
                    borderRadius: 999,
                    border: "none",
                    cursor: "pointer",
                    fontSize: 11,
                    fontWeight: 600,
                    background: priceFilter === p ? "#44CCFF" : "#1C1C24",
                    color: priceFilter === p ? "#0C0C10" : "rgba(255,255,255,0.45)",
                    transition: "all 0.15s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {p}
                </button>
              ))}

              <div style={{ flexShrink: 0, marginLeft: 4 }}>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  style={{
                    height: 28,
                    padding: "0 10px",
                    borderRadius: 999,
                    border: "1px solid #2A2A36",
                    background: "#1C1C24",
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: "pointer",
                    outline: "none",
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  }}
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section header with count */}
          <div style={{ padding: "14px 16px 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
              {filteredDesigns.length} design{filteredDesigns.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Masonry grid */}
          <div style={{ padding: "0 12px" }}>
            <div className="masonry-grid">
              {filteredDesigns.map((design) => (
                <DesignCard key={design.id} {...design} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DESIGNERS TAB ── */}
      {activeTab === "designers" && (
        <div style={{ padding: "16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 12,
            }}
          >
            {DESIGNERS.map((d) => (
              <DesignerCard key={d.handle} d={d} onNavigate={router.push} />
            ))}
          </div>
        </div>
      )}

      {/* ── CHALLENGES TAB ── */}
      {activeTab === "challenges" && (
        <div style={{ padding: "24px 16px" }}>
          {/* Coming soon heading */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0, lineHeight: 1.6 }}>
              Brand challenges coming soon — earn prizes by designing for real brands
            </p>
          </div>

          {/* Mock challenge card */}
          <div
            style={{
              maxWidth: 420,
              margin: "0 auto",
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #2A2A36",
              background: "#14141A",
            }}
          >
            {/* Gradient header */}
            <div
              style={{
                height: 120,
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* Brand logo placeholder */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 11,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.5)",
                  letterSpacing: "0.05em",
                }}
              >
                3M
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: "rgba(68,204,255,0.15)",
                  border: "1px solid rgba(68,204,255,0.3)",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#44CCFF",
                  letterSpacing: "0.05em",
                }}
              >
                COMING SOON
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "18px 18px 20px" }}>
              <h3
                style={{
                  margin: "0 0 6px",
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#E8E8F0",
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  letterSpacing: "-0.02em",
                }}
              >
                3M Design Challenge
              </h3>

              <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Prize</p>
                  <p style={{ margin: "3px 0 0", fontSize: 16, fontWeight: 800, color: "#44CCFF" }}>$5,000 + Products</p>
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Deadline</p>
                  <p style={{ margin: "3px 0 0", fontSize: 14, fontWeight: 700, color: "#E8E8F0" }}>TBD — Stay tuned</p>
                </div>
              </div>

              <p style={{ margin: "0 0 16px", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Design a custom wrap using 3M materials for a chance to win cash and a full product kit.
              </p>

              <button
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 999,
                  border: "1px solid #44CCFF",
                  background: "rgba(68,204,255,0.1)",
                  color: "#44CCFF",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  letterSpacing: "0.02em",
                  transition: "all 0.15s",
                }}
              >
                Notify Me
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
