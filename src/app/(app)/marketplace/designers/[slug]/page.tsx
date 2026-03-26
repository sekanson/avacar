"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Globe, Share2, MessageCircle, Star, ChevronDown } from "lucide-react";

/* ─── Mock Data ─── */
const SELLER = {
  name: "WrapsbyAlex",
  handle: "@wrapsbyalex",
  badge: "SHOP",
  bio: "Toronto's premier wrap studio. Specializing in satin, chrome, and color-shift finishes. 3M and Avery certified.",
  stats: { designs: 42, rating: 4.9, sales: "1.2K", followers: "3.4K" },
  banner: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=1200&q=80&fm=webp",
  social: {
    instagram: "@wrapsbyalex",
    website: "wrapsbyalex.com",
  },
};

const FEATURED_DESIGNS = [
  { slug: "midnight-fury",  name: "Midnight Fury",  car: "GT-R R35",  price: 149, rating: 4.9, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp" },
  { slug: "arctic-storm",   name: "Arctic Storm",   car: "RS6 Avant", price: 249, rating: 5.0, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
  { slug: "cherry-bomb",    name: "Cherry Bomb",    car: "Charger",   price: 129, rating: 4.4, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp" },
];

const GRID_DESIGNS = [
  { slug: "neon-circuit",  name: "Neon Circuit",  car: "Civic Type R", price: 89,  rating: 4.7, img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "phantom-edge",  name: "Phantom Edge",  car: "Audi RS7",     price: 219, rating: 4.9, img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "solar-flare",   name: "Solar Flare",   car: "Porsche 911",  price: 299, rating: 4.8, img: "https://images.unsplash.com/photo-1564466809058-bf4114d55352?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "venom-strike",  name: "Venom Strike",  car: "Corvette C8",  price: 159, rating: 4.5, img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "tokyo-drift",   name: "Tokyo Drift",   car: "Supra",        price: 179, rating: 4.6, img: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "ice-queen",     name: "Ice Queen",     car: "Model 3",      price: 99,  rating: 4.7, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=267&fit=crop&q=70&fm=webp" },
];

const FILTER_CHIPS = ["All", "Full Wrap", "Partial", "Stripes", "Commercial"];

/* ─── Design Card ─── */
function DesignCard({ design }: { design: { slug: string; name: string; car: string; price: number; rating: number; img: string } }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/marketplace/designs/${design.slug}`}
      style={{
        background: "var(--color-surface)",
        borderRadius: 24,
        overflow: "hidden",
        textDecoration: "none",
        display: "block",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}>
        <img src={design.img} alt={design.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)", borderRadius: 100, padding: "3px 8px", fontSize: 11, fontWeight: 700, color: "#fff" }}>
          ★ {design.rating}
        </div>
        {hovered && (
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#44CCFF", background: "rgba(0,0,0,0.8)", padding: "8px 18px", borderRadius: 100, border: "1px solid #44CCFF44" }}>
              🔮 Try On My Car
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>{design.name} — {design.car}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF", marginTop: 6 }}>From ${design.price}</p>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
export default function DesignerProfilePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [followed, setFollowed] = useState(false);
  const [sort, setSort] = useState("Trending");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 100 }}>

      {/* ── Banner ── */}
      <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
        <img src={SELLER.banner} alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--color-bg) 0%, transparent 60%)" }} />
      </div>

      {/* ── Profile Header ── */}
      <div style={{ padding: "0 20px", marginTop: -36 }}>
        {/* Avatar */}
        <div
          style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "linear-gradient(135deg, #44CCFF, #007FFF)",
            border: "3px solid var(--color-bg)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22, fontWeight: 800, color: "#fff",
            marginBottom: 12,
          }}
        >
          WA
        </div>

        {/* Name + Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <h1 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 700, fontSize: 24, color: "var(--color-text-primary)", margin: 0, letterSpacing: "-0.03em" }}>
            {SELLER.name}
          </h1>
          <span style={{ background: "#44CCFF", color: "#0C0C10", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 100, letterSpacing: "0.05em" }}>
            {SELLER.badge}
          </span>
        </div>

        {/* Bio */}
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: 12, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {SELLER.bio}
        </p>

        {/* Social Links */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 100, background: "var(--color-surface)", border: "none", cursor: "pointer", fontSize: 12, color: "var(--color-text-secondary)" }}>
            <Instagram size={13} /> {SELLER.social.instagram}
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 100, background: "var(--color-surface)", border: "none", cursor: "pointer", fontSize: 12, color: "var(--color-text-secondary)" }}>
            <Globe size={13} /> {SELLER.social.website}
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
          {[
            { label: "Designs", value: SELLER.stats.designs },
            { label: "Avg Rating", value: `★${SELLER.stats.rating}` },
            { label: "Sales", value: SELLER.stats.sales },
            { label: "Followers", value: SELLER.stats.followers },
          ].map((stat) => (
            <div key={stat.label}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "1px 0 0" }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          <button
            onClick={() => setFollowed(!followed)}
            style={{
              flex: 1, height: 40, borderRadius: 100, border: "none", cursor: "pointer",
              background: followed ? "var(--color-surface)" : "linear-gradient(135deg, #44CCFF, #007FFF)",
              color: followed ? "var(--color-text-secondary)" : "#fff",
              fontSize: 14, fontWeight: 700,
              transition: "all 0.2s",
            }}
          >
            {followed ? "Following" : "Follow"}
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 100, background: "var(--color-surface)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageCircle size={17} color="var(--color-text-secondary)" />
          </button>
          <button style={{ width: 40, height: 40, borderRadius: 100, background: "var(--color-surface)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Share2 size={17} color="var(--color-text-secondary)" />
          </button>
        </div>
      </div>

      {/* ── Featured ── */}
      <div style={{ padding: "0 20px 24px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>
          Featured
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {FEATURED_DESIGNS.map((d) => (
            <DesignCard key={d.slug} design={d} />
          ))}
        </div>
      </div>

      {/* ── Filter + Sort ── */}
      <div style={{ padding: "0 20px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip}
              onClick={() => setActiveFilter(chip)}
              style={{
                flexShrink: 0, padding: "7px 16px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
                background: activeFilter === chip ? "#44CCFF" : "var(--color-surface)",
                color: activeFilter === chip ? "#0C0C10" : "var(--color-text-secondary)",
                transition: "all 0.15s",
              }}
            >
              {chip}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ padding: "7px 12px", borderRadius: 8, border: "none", background: "var(--color-surface)", color: "var(--color-text-secondary)", fontSize: 13, outline: "none", cursor: "pointer" }}
          >
            {["Trending", "Newest", "Best Rated"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* ── Design Grid ── */}
      <div style={{ padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
          {GRID_DESIGNS.map((d) => (
            <DesignCard key={d.slug} design={d} />
          ))}
        </div>
      </div>
    </div>
  );
}
