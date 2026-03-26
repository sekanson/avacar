"use client";

import { useState } from "react";
import Link from "next/link";

/* ─── Mock Design Data ─── */
const DESIGN = {
  slug: "midnight-fury",
  name: "Midnight Fury",
  car: "GT-R R35",
  seller: "WrapLord Studios",
  sellerHandle: "@wraplord",
  sellerType: "SHOP",
  sellerRating: 4.9,
  sellerDesigns: 42,
  sellerFollowers: "1.2K",
  sellerAvatar: "W",
  description: "A striking blackout treatment with electric blue racing accents. Inspired by GTR race liveries. Comes with door numbers, roof stripe, and full body coverage. Perfect for track days and weekend warriors who want their car to turn heads.",
  price: 149,
  installLow: 400,
  installHigh: 800,
  rating: 4.9,
  ratingCount: 12,
  views: 196,
  heroImg: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=900&fit=crop&q=80&fm=webp",
  thumbnails: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop&q=70&fm=webp",
    "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=200&h=200&fit=crop&q=70&fm=webp",
    "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=200&h=200&fit=crop&q=70&fm=webp",
    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=200&h=200&fit=crop&q=70&fm=webp",
    "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=200&h=200&fit=crop&q=70&fm=webp",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&h=200&fit=crop&q=70&fm=webp",
  ],
};

const MORE_DESIGNS = [
  { slug: "carbon-stealth", name: "Carbon Stealth", car: "M4 Comp",     price: 199, img: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=300&h=200&fit=crop&q=70&fm=webp" },
  { slug: "neon-circuit",   name: "Neon Circuit",   car: "Civic Type R", price: 89,  img: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=300&h=200&fit=crop&q=70&fm=webp" },
  { slug: "arctic-storm",   name: "Arctic Storm",   car: "RS6 Avant",   price: 249, img: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=300&h=200&fit=crop&q=70&fm=webp" },
  { slug: "tokyo-drift",    name: "Tokyo Drift",    car: "Supra A90",   price: 179, img: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=300&h=200&fit=crop&q=70&fm=webp" },
];

const REVIEWS = [
  {
    avatar: "M",
    name: "Marcus L.",
    rating: 5,
    date: "Mar 12, 2026",
    text: "Absolutely love it. The shop nailed the install in under 3 hours. Car looks completely transformed — way better than I expected for the price.",
  },
  {
    avatar: "S",
    name: "Sofia R.",
    rating: 5,
    date: "Feb 28, 2026",
    text: "Tried it on my car using the preview tool and was sold immediately. Install was flawless. Already getting compliments everywhere.",
  },
  {
    avatar: "D",
    name: "Devlin K.",
    rating: 4,
    date: "Feb 14, 2026",
    text: "Great design, very clean. The shop quoted me a little higher than the estimate but final result is worth it. Would recommend.",
  },
];

/* ─── Star Rating ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#FFD700", fontSize: 13 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

/* ─── Main Page ─── */
export default function DesignDetailPage() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeTab,   setActiveTab]   = useState<"more" | "reviews">("more");
  const [saved,       setSaved]       = useState(false);
  const [following,   setFollowing]   = useState(false);

  const totalLow  = DESIGN.price + DESIGN.installLow;
  const totalHigh = DESIGN.price + DESIGN.installHigh;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 100 }}>

      {/* Back nav */}
      <div style={{ padding: "16px 20px 0" }}>
        <Link
          href="/marketplace/designs"
          style={{ fontSize: 13, color: "var(--color-text-tertiary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          ← Back to Designs
        </Link>
      </div>

      {/* ── Main Layout ── */}
      <div
        style={{
          display: "flex",
          gap: 32,
          padding: "20px 20px 0",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left Side (65%) ── */}
        <div style={{ flex: "1 1 380px", minWidth: 0 }}>

          {/* Hero Image */}
          <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/3" }}>
            <img
              src={DESIGN.thumbnails[activeThumb] ?? DESIGN.heroImg}
              alt={DESIGN.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Thumbnail strip */}
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 12,
              overflowX: "auto",
              scrollbarWidth: "none",
            }}
          >
            {DESIGN.thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                style={{
                  flexShrink: 0,
                  width: 80,
                  height: 80,
                  borderRadius: 8,
                  overflow: "hidden",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  outline: activeThumb === i ? "2px solid #44CCFF" : "none",
                  outlineOffset: 2,
                  transition: "outline 0.15s",
                }}
              >
                <img
                  src={thumb}
                  alt={`View ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>

          {/* Seller Info Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 20,
              paddingBottom: 16,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #44CCFF33, #44CCFF11)",
                border: "1.5px solid #44CCFF44",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, fontWeight: 800, color: "#44CCFF",
                flexShrink: 0,
              }}
            >
              {DESIGN.sellerAvatar}
            </div>

            {/* Name + badge + stats */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)" }}>
                  {DESIGN.seller}
                </p>
                <span
                  style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.06em",
                    color: "#44CCFF", background: "rgba(68,204,255,0.12)",
                    padding: "2px 7px", borderRadius: 100,
                  }}
                >
                  {DESIGN.sellerType}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 2 }}>
                ★ {DESIGN.sellerRating} · {DESIGN.sellerDesigns} designs · {DESIGN.sellerFollowers} followers
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
              <button
                onClick={() => setFollowing((f) => !f)}
                style={{
                  padding: "7px 16px", borderRadius: 100, cursor: "pointer",
                  fontSize: 13, fontWeight: 600,
                  border: following ? "none" : "1px solid rgba(255,255,255,0.2)",
                  background: following ? "rgba(68,204,255,0.15)" : "transparent",
                  color: following ? "#44CCFF" : "var(--color-text-secondary)",
                  transition: "all 0.15s",
                }}
              >
                {following ? "Following" : "Follow"}
              </button>
              <button
                style={{
                  padding: "7px 16px", borderRadius: 100, cursor: "pointer",
                  fontSize: 13, fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                }}
              >
                🔮 Try On My Car
              </button>
            </div>
          </div>

          {/* Engagement row */}
          <div
            style={{
              display: "flex",
              gap: 20,
              alignItems: "center",
              marginTop: 14,
              paddingBottom: 20,
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--color-text-tertiary)" }}>👀 {DESIGN.views} views</span>
            <button
              onClick={() => setSaved((s) => !s)}
              style={{
                fontSize: 13, fontWeight: 600,
                color: saved ? "#44CCFF" : "var(--color-text-secondary)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              {saved ? "♥ Saved" : "♡ Save"}
            </button>
            <button
              style={{
                fontSize: 13, color: "var(--color-text-secondary)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
              }}
            >
              📤 Share
            </button>
          </div>

          {/* Tabs: More Designs | Reviews */}
          <div style={{ marginTop: 24 }}>
            <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 20 }}>
              {(["more", "reviews"] as const).map((tab) => {
                const label = tab === "more" ? "MORE DESIGNS" : `REVIEWS (${DESIGN.ratingCount})`;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      padding: "12px 18px",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.06em",
                      color: activeTab === tab ? "#44CCFF" : "var(--color-text-tertiary)",
                      background: "none",
                      border: "none",
                      borderBottom: activeTab === tab ? "2px solid #44CCFF" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* More Designs tab */}
            {activeTab === "more" && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                {MORE_DESIGNS.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/marketplace/designs/${d.slug}`}
                    style={{ background: "var(--color-surface)", borderRadius: 16, overflow: "hidden", textDecoration: "none", display: "block" }}
                  >
                    <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
                      <img
                        src={d.img}
                        alt={d.name}
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                    </div>
                    <div style={{ padding: "10px 12px 12px" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>{d.name}</p>
                      <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 2 }}>{d.car}</p>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF", marginTop: 6 }}>From ${d.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === "reviews" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {REVIEWS.map((review) => (
                  <div
                    key={review.name}
                    style={{ background: "var(--color-surface)", borderRadius: 14, padding: 16 }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <div
                        style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "var(--color-surface-elevated)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)",
                          flexShrink: 0,
                        }}
                      >
                        {review.avatar}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>{review.name}</p>
                          <Stars rating={review.rating} />
                        </div>
                        <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", marginTop: 1 }}>{review.date}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{review.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Right Side (35%, sticky on desktop) ── */}
        <div
          style={{
            flex: "0 1 340px",
            minWidth: 280,
            position: "sticky",
            top: 80,
            background: "var(--color-surface)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          {/* Design name */}
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "-0.02em", marginBottom: 8 }}>
            {DESIGN.name}
          </h1>
          <p style={{ fontSize: 13, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 6 }}>
            {DESIGN.car} · by {DESIGN.sellerHandle}
          </p>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 20 }}>
            {DESIGN.description}
          </p>

          {/* Separator */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

          {/* Try On CTA */}
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginBottom: 10 }}>
            See it on your car first
          </p>
          <button
            style={{
              width: "100%", height: 56, borderRadius: 100,
              background: "linear-gradient(135deg, #44CCFF, #0099cc)",
              color: "#0C0C10", fontWeight: 700, fontSize: 16,
              border: "none", cursor: "pointer",
              marginBottom: 20,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}
          >
            🔮 Try On My Car →
          </button>

          {/* Separator */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.06)", marginBottom: 20 }} />

          {/* Pricing breakdown */}
          <p
            style={{
              fontSize: 10, fontWeight: 700, letterSpacing: "0.2em",
              color: "#44CCFF", textTransform: "uppercase", marginBottom: 14,
            }}
          >
            WHAT THIS COSTS ALL-IN
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Design</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>${DESIGN.price}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Professional install</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)" }}>${DESIGN.installLow}–${DESIGN.installHigh} est.</span>
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)" }}>Total estimate</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#44CCFF" }}>${totalLow}–${totalHigh}</span>
            </div>
          </div>

          {/* Get This Built CTA */}
          <Link
            href="/create/shops"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "100%", height: 48, borderRadius: 100,
              background: "linear-gradient(135deg, #44CCFF, #0099cc)",
              color: "#0C0C10", fontWeight: 700, fontSize: 15,
              textDecoration: "none", marginBottom: 12,
            }}
          >
            Get This Built →
          </Link>

          {/* Secondary links */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
            <button
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13, color: "var(--color-text-tertiary)",
              }}
            >
              Just buy the design →
            </button>
            <button
              onClick={() => setSaved((s) => !s)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 13,
                color: saved ? "#44CCFF" : "var(--color-text-tertiary)",
              }}
            >
              {saved ? "♥ Saved for later" : "♡ Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
