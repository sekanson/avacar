"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Plus } from "lucide-react";

// ─── Feed Mock Data ────────────────────────────────────────────────────────────

const FEED_POSTS = [
  { id: "p1",  handle: "wrapsbyalex",    vehicle: "2022 Mercedes G-Wagon",      image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fm=webp", tags: ["3M Satin Black", "HRE P101"] },
  { id: "p2",  handle: "driftking",      vehicle: "2023 Toyota Supra A90",      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp", tags: ["HRE P101", "Stance"] },
  { id: "p3",  handle: "euroboy",        vehicle: "2022 Audi RS6 Avant",        image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp", tags: ["3M Nardo Gray", "Vossen CV3"] },
  { id: "p4",  handle: "jdm.wraps",      vehicle: "2023 Honda Civic Type R",    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp", tags: ["Rocket Bunny", "Inozetek Purple"] },
  { id: "p5",  handle: "carbonwerks",    vehicle: "2024 BMW M4 Competition",    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp", tags: ["Carbon Fiber", "BBS CH-R"] },
  { id: "p6",  handle: "ev.wraps",       vehicle: "2023 Tesla Model 3",         image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp", tags: ["3M White Pearl", "Tint 20%"] },
  { id: "p7",  handle: "ppf.obsessed",   vehicle: "2024 BMW M3",                image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp", tags: ["XPEL Ultimate Plus", "PPF"] },
  { id: "p8",  handle: "chromedelete_co",vehicle: "2023 BMW 5 Series",          image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp", tags: ["3M Matte Black", "Chrome Delete"] },
  { id: "p9",  handle: "tintpros_gta",   vehicle: "2022 Porsche 911 GT3",       image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp", tags: ["Ceramic Tint 35%", "XPEL"] },
  { id: "p10", handle: "rimcity_official",vehicle: "2021 Nissan GT-R R35",      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp", tags: ["Vossen HF-5", "Inozetek Gunmetal"] },
  { id: "p11", handle: "civicbuilder",   vehicle: "2022 Honda Civic",           image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp", tags: ["Avery SW900", "Enkei Wheels"] },
  { id: "p12", handle: "supragang",      vehicle: "2023 Toyota Supra A90",      image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp", tags: ["Inozetek Deep Black", "HRE R101"] },
  { id: "p13", handle: "m4builds",       vehicle: "2024 BMW M4 Competition",    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp", tags: ["Avery Nardo Gray", "Satin Black Roof"] },
  { id: "p14", handle: "armorshield_ppf",vehicle: "2023 Lamborghini Urus",      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp", tags: ["XPEL Ultimate Plus", "Front Clip PPF"] },
  { id: "p15", handle: "jdmfan",         vehicle: "2021 Toyota GR86",           image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp", tags: ["Matte White Wrap", "Volk TE37"] },
  { id: "p16", handle: "rollingshots",   vehicle: "2022 Honda Civic",           image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp", tags: ["Gloss White", "Rolling Shot"] },
  { id: "p17", handle: "eurospec",       vehicle: "2024 BMW M4 Competition",    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp", tags: ["Carbon Fiber", "Euro Spec"] },
  { id: "p18", handle: "stateside.builds",vehicle: "2023 Porsche 911",          image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp", tags: ["PPF Full Body", "Ceramic Coat"] },
  { id: "p19", handle: "nightcrew",      vehicle: "2023 Tesla Model 3",         image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp", tags: ["Avery Satin Black", "Night Shot"] },
  { id: "p20", handle: "trackday_official",vehicle: "2021 Nissan GT-R R35",     image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp", tags: ["Track Build", "Inozetek"] },
];

const INTEREST_PILLS = ["All", "Wraps", "Wheels", "Full Builds", "Scenes", "JDM", "Euro", "Muscle", "Off-Road"];

// ─── Uniform Grid Card ──────────────────────────────────────────────────────────

function GridCard({ post }: { post: typeof FEED_POSTS[0] }) {
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
          justifyContent: "space-between",
          padding: 10,
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
            border: "none", cursor: "pointer",
            fontSize: 11, fontWeight: 700,
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          }}>
            🔮 Try On My Car
          </button>
        </div>
      )}

      {/* Always-visible bottom overlay */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "28px 10px 10px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
        pointerEvents: "none",
      }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "#fff", margin: "0 0 3px" }}>{post.vehicle}</p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: 0 }}>
          {post.tags.join(" · ")}
        </p>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState("All");
  const [followingOnly, setFollowingOnly] = useState(false);
  const [activeTab, setActiveTab] = useState("Feed");

  const filteredPosts = activeFilter === "All" ? FEED_POSTS : FEED_POSTS.filter(() => true);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 96 }}>

      {/* FILTER PILLS — sticky */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(12,12,16,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(42,42,54,0.5)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px",
      }}>
        <div className="scroll-row" style={{ display: "flex", gap: 6, flex: 1 }}>
          {INTEREST_PILLS.map((pill) => (
            <button key={pill} onClick={() => setActiveFilter(pill)} style={{
              flexShrink: 0, height: 30, padding: "0 12px", borderRadius: 999,
              border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600,
              background: activeFilter === pill ? "#44CCFF" : "var(--color-surface-elevated)",
              color: activeFilter === pill ? "#0C0C10" : "var(--color-text-secondary)",
              transition: "all 0.15s",
            }}>{pill}</button>
          ))}
        </div>
        <button onClick={() => setFollowingOnly(f => !f)} style={{
          flexShrink: 0, height: 30, padding: "0 12px", marginLeft: 10, borderRadius: 999,
          border: `1px solid ${followingOnly ? "#44CCFF" : "var(--color-border)"}`,
          background: followingOnly ? "rgba(68,204,255,0.12)" : "none",
          color: followingOnly ? "#44CCFF" : "var(--color-text-secondary)",
          fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
        }}>
          {followingOnly ? "✓ Following" : "Following"}
        </button>
      </div>

      {/* UNIFORM GRID */}
      <div style={{ padding: "14px 12px 0" }}>
        <div className="masonry-grid">
          {/* CTA card — first in grid */}
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

          {filteredPosts.map((post) => (
            <GridCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      {/* Floating bottom tab bar */}
      <div style={{
        position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 4, zIndex: 50,
        background: "rgba(20,20,26,0.9)", backdropFilter: "blur(16px)",
        borderRadius: 999, padding: "4px", border: "1px solid rgba(255,255,255,0.1)",
      }}>
        {["Feed", "Trending"].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
            background: activeTab === tab ? "#fff" : "transparent",
            color: activeTab === tab ? "#0C0C10" : "rgba(255,255,255,0.6)",
            border: "none", cursor: "pointer", transition: "all 0.15s",
          }}>{tab}</button>
        ))}
        <button
          onClick={() => router.push("/create")}
          style={{
            padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 700,
            background: "#44CCFF", color: "#0C0C10", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 5,
          }}
        >
          <Plus size={13} /> Design Your Ride
        </button>
      </div>

    </div>
  );
}
