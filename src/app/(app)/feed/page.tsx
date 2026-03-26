"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, MessageCircle, Eye } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INTENT_PILLS = ["All", "Modify", "Scene", "Style", "Content", "Browse", "Shop"];

const RECENT_BUILDS = [
  { name: "GR86 — Satin Black", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80&fm=webp" },
  { name: "M4 — Euro Clean", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80&fm=webp" },
  { name: "Supra — Murdered Out", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80&fm=webp" },
  { name: "RS6 — Nardo Gray", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&q=80&fm=webp" },
  { name: "Type R — JDM Build", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80&fm=webp" },
];

const TEMPLATE_FILTER_TABS = ["Templates", "Community", "Tutorials"];

const TYPE_BADGE_COLORS: Record<string, { bg: string; color: string }> = {
  Look:     { bg: "rgba(68,204,255,0.15)",  color: "#44CCFF" },
  Scene:    { bg: "rgba(52,211,153,0.15)",  color: "#34D399" },
  Style:    { bg: "rgba(168,85,247,0.15)",  color: "#A855F7" },
  Workflow: { bg: "rgba(251,191,36,0.15)",  color: "#FBBF24" },
  Content:  { bg: "rgba(236,72,153,0.15)",  color: "#EC4899" },
};

const TEMPLATES = [
  { name: "Murdered Out",        type: "Look",     desc: "All black everything. One tap.",              image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fm=webp" },
  { name: "Tokyo Night",         type: "Scene",    desc: "Neon-lit streets, rain reflections.",         image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp" },
  { name: "JDM Street Build",    type: "Style",    desc: "Slammed, wide, aggressive.",                  image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp" },
  { name: "Studio Showroom",     type: "Scene",    desc: "Clean studio, dramatic lighting.",            image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp" },
  { name: "Golden Hour Shoot",   type: "Content",  desc: "Perfect Instagram light.",                   image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp" },
  { name: "Client Wrap Proposal",type: "Workflow", desc: "3 color options, pricing included.",         image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp" },
  { name: "Rolling Shot",        type: "Scene",    desc: "Highway speed, blurred background.",         image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
  { name: "Before / After Maker",type: "Content",  desc: "Side-by-side comparison.",                   image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp" },
];

const COMMUNITY_POSTS = [
  { username: "wrapsbyalex", timeAgo: "3h ago",  caption: "Finally did the Murdered Out look on my G-Wagon", likes: "342", comments: "28",  views: "12.4K", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fm=webp", ratio: "4/5" },
  { username: "driftking",   timeAgo: "5h ago",  caption: "Supra on HRE P101s at the track",                  likes: "218", comments: "45",  views: "8.7K",  image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp", ratio: "1/1" },
  { username: "euroboy",     timeAgo: "8h ago",  caption: "RS6 in 3M Nardo Gray — perfection",                likes: "567", comments: "89",  views: "24.1K", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp", ratio: "4/3" },
  { username: "jdmfan",      timeAgo: "12h ago", caption: "Civic Type R — full JDM street build",             likes: "134", comments: "16",  views: "5.2K",  image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp", ratio: "4/5" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const router = useRouter();
  const [activeIntent, setActiveIntent] = useState("All");
  const [activeTemplateTab, setActiveTemplateTab] = useState("Templates");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 32 }}>

      {/* ── Row 1: Intent Filter Pills ──────────────────────────────────────── */}
      <div style={{
        display: "flex",
        gap: 8,
        overflowX: "auto",
        padding: "16px 20px 8px",
        scrollbarWidth: "none",
      }}>
        {INTENT_PILLS.map((pill) => {
          const isActive = pill === activeIntent;
          return (
            <button
              key={pill}
              onClick={() => setActiveIntent(pill)}
              style={{
                flexShrink: 0,
                height: 34,
                padding: "0 16px",
                borderRadius: 999,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                background: isActive ? "#44CCFF" : "var(--color-surface-elevated)",
                color: isActive ? "#0C0C10" : "var(--color-text-secondary)",
                transition: "all 0.15s",
              }}
            >
              {pill}
            </button>
          );
        })}
      </div>

      {/* ── Row 2: My Garage (Recent) ───────────────────────────────────────── */}
      <section style={{ marginBottom: 28 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#44CCFF",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Recent Builds
          </span>
          <button
            onClick={() => router.push("/create")}
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#44CCFF",
              background: "rgba(68,204,255,0.1)",
              border: "1px solid rgba(68,204,255,0.2)",
              borderRadius: 999,
              padding: "4px 12px",
              cursor: "pointer",
            }}
          >
            + New Build
          </button>
        </div>
        <div style={{
          display: "flex",
          gap: 12,
          overflowX: "auto",
          padding: "4px 20px 8px",
          scrollbarWidth: "none",
        }}>
          {RECENT_BUILDS.map((build) => (
            <div
              key={build.name}
              onClick={() => router.push("/create")}
              style={{ flexShrink: 0, cursor: "pointer" }}
            >
              <div style={{
                width: 120,
                height: 90,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--color-border)",
                marginBottom: 6,
              }}>
                <img
                  src={build.image}
                  alt={build.name}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <p style={{
                fontSize: 11,
                color: "var(--color-text-secondary)",
                margin: 0,
                width: 120,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}>
                {build.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Row 4: Get Inspired (Templates) ────────────────────────────────── */}
      <section style={{ padding: "0 20px", marginBottom: 28 }}>
        <p style={{
          fontSize: 10,
          fontWeight: 700,
          color: "#44CCFF",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          margin: "0 0 12px",
        }}>
          Get Inspired
        </p>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {TEMPLATE_FILTER_TABS.map((tab) => {
            const isActive = tab === activeTemplateTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTemplateTab(tab)}
                style={{
                  height: 30,
                  padding: "0 14px",
                  borderRadius: 999,
                  border: "1px solid var(--color-border)",
                  background: isActive ? "var(--color-surface-elevated)" : "transparent",
                  color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* 2-col template grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {TEMPLATES.map((template) => {
            const badge = TYPE_BADGE_COLORS[template.type];
            return (
              <div
                key={template.name}
                onClick={() => router.push("/create")}
                style={{
                  borderRadius: "1.5rem",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  overflow: "hidden",
                  cursor: "pointer",
                }}
              >
                {/* 16:9 preview */}
                <div style={{ position: "relative", aspectRatio: "16/9" }}>
                  <img
                    src={template.image}
                    alt={template.name}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                  <span style={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    fontSize: 9,
                    fontWeight: 700,
                    background: badge.bg,
                    color: badge.color,
                    padding: "3px 8px",
                    borderRadius: 999,
                    backdropFilter: "blur(8px)",
                  }}>
                    {template.type}
                  </span>
                </div>
                {/* Body */}
                <div style={{ padding: "10px 12px 12px" }}>
                  <p style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    margin: "0 0 4px",
                    lineHeight: 1.3,
                  }}>
                    {template.name}
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: "var(--color-text-secondary)",
                    margin: "0 0 8px",
                    lineHeight: 1.4,
                  }}>
                    {template.desc}
                  </p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#44CCFF" }}>
                    Try It →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Row 5: Trending in Community ────────────────────────────────────── */}
      <section>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          marginBottom: 12,
        }}>
          <span style={{
            fontSize: 10,
            fontWeight: 700,
            color: "#44CCFF",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}>
            Trending in Community
          </span>
          <button style={{
            fontSize: 12,
            fontWeight: 600,
            color: "#44CCFF",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}>
            See All →
          </button>
        </div>

        <div style={{
          display: "flex",
          gap: 14,
          overflowX: "auto",
          padding: "4px 20px 8px",
          scrollbarWidth: "none",
        }}>
          {COMMUNITY_POSTS.map((post) => (
            <div
              key={post.username}
              style={{
                flexShrink: 0,
                width: 220,
                borderRadius: 16,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              {/* Variable aspect ratio like Instagram */}
              <div style={{ position: "relative", aspectRatio: (post as any).ratio || "4/5" }}>
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              {/* Body */}
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>
                  @{post.username} · {post.timeAgo}
                </p>
                <p style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--color-text-primary)",
                  margin: "0 0 8px",
                  lineHeight: 1.4,
                }}>
                  &ldquo;{post.caption}&rdquo;
                </p>
                <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 11, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 3 }}><Heart size={11} /> {post.likes}</span>
                  <span style={{ fontSize: 11, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 3 }}><MessageCircle size={11} /> {post.comments}</span>
                  <span style={{ fontSize: 11, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 3 }}><Eye size={11} /> {post.views}</span>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button style={{
                    flex: 1, fontSize: 10, fontWeight: 700, color: "#44CCFF",
                    background: "rgba(68,204,255,0.10)", border: "1px solid rgba(68,204,255,0.25)",
                    borderRadius: 999, padding: "6px 4px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                  }}>
                    ✨ Try On My Car
                  </button>
                  <button style={{
                    flex: 1, fontSize: 10, fontWeight: 700, color: "var(--color-text-primary)",
                    background: "transparent", border: "1px solid var(--color-border)",
                    borderRadius: 999, padding: "6px 4px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 3,
                  }}>
                    🛒 Shop Build
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
