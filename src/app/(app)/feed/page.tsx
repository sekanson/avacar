"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const INTENT_PILLS = ["All", "Modify", "Scene", "Style", "Content", "Browse", "Shop"];

const GRID_POSTS = [
  { id: "g1",  vehicle: "2022 Mercedes G-Wagon",   handle: "wrapsbyalex",     tag: "3M Satin Black · HRE P101",       image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fm=webp" },
  { id: "g2",  vehicle: "2023 Toyota Supra A90",   handle: "driftking",       tag: "HRE P101 · Stance",               image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp" },
  { id: "g3",  vehicle: "2022 Audi RS6 Avant",     handle: "euroboy",         tag: "3M Nardo Gray · Vossen CV3",      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
  { id: "g4",  vehicle: "2023 Honda Civic Type R",  handle: "jdm.wraps",      tag: "Rocket Bunny · Inozetek",         image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp" },
  { id: "g5",  vehicle: "2024 BMW M4 Competition", handle: "carbonwerks",     tag: "Carbon Fiber · BBS CH-R",         image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp" },
  { id: "g6",  vehicle: "2023 Tesla Model 3",      handle: "ev.wraps",        tag: "3M White Pearl · Tint 20%",       image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp" },
  { id: "g7",  vehicle: "2024 BMW M3",             handle: "ppf.obsessed",    tag: "XPEL Ultimate Plus · PPF",        image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp" },
  { id: "g8",  vehicle: "2023 BMW 5 Series",       handle: "chromedelete_co", tag: "3M Matte Black · Chrome Delete",  image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp" },
  { id: "g9",  vehicle: "2022 Porsche 911 GT3",    handle: "tintpros_gta",    tag: "Ceramic Tint 35% · XPEL",        image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp" },
  { id: "g10", vehicle: "2021 Nissan GT-R R35",    handle: "rimcity_official",tag: "Vossen HF-5 · Inozetek Gunmetal", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp" },
  { id: "g11", vehicle: "2022 Honda Civic",         handle: "civicbuilder",   tag: "Avery SW900 · Enkei Wheels",      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp" },
  { id: "g12", vehicle: "2023 Lamborghini Urus",   handle: "armorshield_ppf", tag: "XPEL Ultimate Plus · Front Clip", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
];

// ─── Grid Card ────────────────────────────────────────────────────────────────

function GridCard({ post }: { post: typeof GRID_POSTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ borderRadius: 14, overflow: "hidden", cursor: "pointer", position: "relative" }}
    >
      <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
        <img
          src={post.image}
          alt={post.vehicle}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"; }}
        />
      </div>

      {/* Hover overlay */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.45)",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", padding: 10,
        }}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: saved ? "#44CCFF" : "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Bookmark size={14} color={saved ? "#0C0C10" : "#fff"} fill={saved ? "#0C0C10" : "none"} />
            </button>
          </div>
          <button style={{
            width: "100%", height: 32, borderRadius: 999,
            background: "#44CCFF", color: "#0C0C10",
            border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700,
          }}>
            🔮 Try On My Car
          </button>
        </div>
      )}

      {/* Bottom overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "28px 10px 10px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
        pointerEvents: "none",
      }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{post.vehicle}</p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", margin: 0 }}>{post.tag}</p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const router = useRouter();
  const [activeIntent, setActiveIntent] = useState("All");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 32 }}>

      {/* Intent filter pills */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto",
        padding: "14px 16px 10px", scrollbarWidth: "none",
      }}>
        {INTENT_PILLS.map((pill) => {
          const isActive = pill === activeIntent;
          return (
            <button
              key={pill}
              onClick={() => setActiveIntent(pill)}
              style={{
                flexShrink: 0, height: 32, padding: "0 14px", borderRadius: 999,
                border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
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

      {/* Uniform grid */}
      <div style={{ padding: "8px 12px 0" }}>
        <div className="masonry-grid">
          {/* CTA card — first */}
          <div
            onClick={() => router.push("/create")}
            style={{
              borderRadius: 14, aspectRatio: "4/3",
              background: "linear-gradient(135deg, #0057cc, #007FFF)",
              display: "flex", flexDirection: "column",
              alignItems: "flex-start", justifyContent: "flex-end",
              padding: "16px", cursor: "pointer", position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 14, left: 14,
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Plus size={18} color="#fff" />
            </div>
            <p style={{
              fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.2,
              fontFamily: "Manrope, sans-serif", letterSpacing: "-0.03em", margin: 0,
            }}>
              Design your<br />dream ride
            </p>
          </div>

          {GRID_POSTS.map((post) => (
            <GridCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
}
