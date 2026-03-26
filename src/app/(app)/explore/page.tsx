"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Heart, MessageCircle, Eye, Sparkles, ShoppingCart, Car } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

function slugifyVehicle(vehicle: string): string {
  // "2022 Honda Civic" → "honda-civic"
  // Strip year prefix, lowercase, replace spaces with hyphens
  const withoutYear = vehicle.replace(/^\d{4}[-–]?\d{0,4}\s+/, "").replace(/^\d{4}\s+/, "");
  return withoutYear.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

// ─── Feed Mock Data ────────────────────────────────────────────────────────────

const FEED_POSTS = [
  {
    id: "p1",
    handle: "wrapsbyalex",
    avatar: "W",
    age: "3h",
    vehicle: "2022 Mercedes G-Wagon",
    caption: "Finally did the Murdered Out look on my G-Wagon. Full 3M Satin Black + tint.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&fm=webp",
    tags: ["3M Satin Black", "HRE P101"],
    likes: "342",
    comments: "28",
    views: "12.4K",
    ratio: "4/5",
  },
  {
    id: "p2",
    handle: "driftking",
    avatar: "D",
    age: "6h",
    vehicle: "2023 Toyota Supra A90",
    caption: "Supra on P101s at Mosport. The fitment is chef's kiss.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp",
    tags: ["HRE P101", "Stance"],
    likes: "218",
    comments: "45",
    views: "8.7K",
    ratio: "1/1",
  },
  {
    id: "p3",
    handle: "euroboy",
    avatar: "E",
    age: "12h",
    vehicle: "2022 Audi RS6 Avant",
    caption: "RS6 in 3M Nardo Gray. This color was made for Audis.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
    tags: ["3M Nardo Gray", "Vossen CV3"],
    likes: "567",
    comments: "89",
    views: "24.1K",
    ratio: "4/3",
  },
  {
    id: "p4",
    handle: "jdm.wraps",
    avatar: "J",
    age: "1d",
    vehicle: "2023 Honda Civic Type R",
    caption: "Full JDM build on the Civic. Rocket Bunny + Inozetek. This thing is loud.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp",
    tags: ["Rocket Bunny", "Inozetek Purple"],
    likes: "134",
    comments: "16",
    views: "5.2K",
    ratio: "4/5",
  },
  {
    id: "p5",
    handle: "carbonwerks",
    avatar: "C",
    age: "1d",
    vehicle: "2024 BMW M4 Competition",
    caption: "M4 in our studio. Carbon fiber everything. Client wanted maximum aggression.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp",
    tags: ["Carbon Fiber", "BBS CH-R"],
    likes: "891",
    comments: "124",
    views: "41.2K",
    ratio: "1/1",
  },
  {
    id: "p6",
    handle: "ev.wraps",
    avatar: "E",
    age: "2d",
    vehicle: "2023 Tesla Model 3",
    caption: "Tesla Model 3 — Satin White Pearl. Clean is the new loud.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&fm=webp",
    tags: ["3M White Pearl", "Tint 20%"],
    likes: "203",
    comments: "31",
    views: "9.8K",
    ratio: "4/5",
  },
  {
    id: "p7",
    handle: "ppf.obsessed",
    avatar: "P",
    age: "2d",
    vehicle: "2024 BMW M3",
    caption: "Full XPEL Ultimate Plus on the M3. Rock solid protection and it still looks factory.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp",
    tags: ["XPEL Ultimate Plus", "PPF"],
    likes: "445",
    comments: "52",
    views: "18.3K",
    ratio: "4/3",
  },
  {
    id: "p8",
    handle: "chromedelete_co",
    avatar: "C",
    age: "3d",
    vehicle: "2023 BMW 5 Series",
    caption: "Full chrome delete on the 5 Series. Every piece blacked out. Zero chrome, all class.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fm=webp",
    tags: ["3M Matte Black", "Chrome Delete"],
    likes: "278",
    comments: "33",
    views: "11.2K",
    ratio: "1/1",
  },
  {
    id: "p9",
    handle: "tintpros_gta",
    avatar: "T",
    age: "3d",
    vehicle: "2022 Porsche 911 GT3",
    caption: "GT3 came in for 35% all around ceramic tint. The reflection on this car is insane.",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&fm=webp",
    tags: ["Ceramic Tint 35%", "XPEL"],
    likes: "523",
    comments: "67",
    views: "22.1K",
    ratio: "4/5",
  },
  {
    id: "p10",
    handle: "rimcity_official",
    avatar: "R",
    age: "4d",
    vehicle: "2021 Nissan GT-R R35",
    caption: "GT-R on Vossen HF-5 in Gloss Gold. The perfect contrast with the Gunmetal wrap.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&fm=webp",
    tags: ["Vossen HF-5", "Inozetek Gunmetal"],
    likes: "387",
    comments: "44",
    views: "16.8K",
    ratio: "4/3",
  },
  {
    id: "p11",
    handle: "civicbuilder",
    avatar: "C",
    age: "4d",
    vehicle: "2022 Honda Civic",
    caption: "Stock to stunner in one weekend. Avery SW900 Gloss White and 18s. Civic owners rise up.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp",
    tags: ["Avery SW900", "Enkei Wheels"],
    likes: "192",
    comments: "38",
    views: "7.4K",
    ratio: "1/1",
  },
  {
    id: "p12",
    handle: "supragang",
    avatar: "S",
    age: "5d",
    vehicle: "2023 Toyota Supra A90",
    caption: "Murdered Out Supra. Full Inozetek Super Gloss Deep Black. This thing looks like it costs $300K.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp",
    tags: ["Inozetek Deep Black", "HRE R101"],
    likes: "634",
    comments: "78",
    views: "29.5K",
    ratio: "4/5",
  },
  {
    id: "p13",
    handle: "m4builds",
    avatar: "M",
    age: "5d",
    vehicle: "2024 BMW M4 Competition",
    caption: "M4 in Avery SW900 Gloss Nardo Gray. Satin Black roof. The stance is perfect.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp",
    tags: ["Avery Nardo Gray", "Satin Black Roof"],
    likes: "451",
    comments: "56",
    views: "19.2K",
    ratio: "4/3",
  },
  {
    id: "p14",
    handle: "armorshield_ppf",
    avatar: "A",
    age: "6d",
    vehicle: "2023 Lamborghini Urus",
    caption: "Full front clip PPF on the Urus. Client drives hard, we protect harder.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
    tags: ["XPEL Ultimate Plus", "Front Clip PPF"],
    likes: "712",
    comments: "93",
    views: "35.8K",
    ratio: "1/1",
  },
  {
    id: "p15",
    handle: "jdmfan",
    avatar: "J",
    age: "1w",
    vehicle: "2021 Toyota GR86",
    caption: "GR86 got the full JDM treatment. Widebody kit, Volk TE37s, and Matte White wrap. Perfection.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp",
    tags: ["Matte White Wrap", "Volk TE37"],
    likes: "298",
    comments: "41",
    views: "13.7K",
    ratio: "4/5",
  },
];

const VEHICLE_FILTERS = ["All Cars", "Honda Civic", "BMW M4", "Toyota Supra", "G-Wagon", "Porsche 911", "More"];

const FEED_TABS = ["For You", "Following", "Trending"];

// ─── Explore grid data ─────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Wraps", "Wheels", "Tint", "PPF", "Body Kits", "Accessories"];

const FEATURED_BUILDS = [
  { id: "b1", car: "2023 GR86", type: "Matte Wrap", shop: "WrapsByAlex", price: "$1,400", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp", accent: "#44CCFF", tag: "Wraps" },
  { id: "b2", car: "2022 M4 Comp", type: "Carbon Kit", shop: "CarbonWerks", price: "Quote on request", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp", accent: "#F87171", tag: "Body Kits" },
  { id: "b3", car: "2021 GT-R R35", type: "Ceramic Tint", shop: "TintPros GTA", price: "$650", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&fm=webp", accent: "#34D399", tag: "Tint" },
  { id: "b4", car: "2023 WRX", type: "Forged Wheels", shop: "RimCity", price: "$3,200", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp", accent: "#A78BFA", tag: "Wheels" },
  { id: "b5", car: "2022 RS6 Avant", type: "Full PPF", shop: "ArmorShield", price: "$4,800", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&fm=webp", accent: "#FBBF24", tag: "PPF" },
  { id: "b6", car: "2023 Supra A90", type: "Chrome Delete", shop: "DetailKings", price: "$900", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&fm=webp", accent: "#FB923C", tag: "Accessories" },
];

const TRENDING_SHOPS = [
  { id: "s1", name: "WrapsByAlex", rating: 4.9, reviews: 214, location: "Toronto, ON", gradient: "linear-gradient(135deg, #003d8f, #005ab7)", bgImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp", initial: "W", specialty: "Wraps & PPF" },
  { id: "s2", name: "CarbonWerks", rating: 4.8, reviews: 178, location: "Mississauga, ON", gradient: "linear-gradient(135deg, #1a0505, #3d0e0e)", bgImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp", initial: "C", specialty: "Body Kits" },
  { id: "s3", name: "RimCity", rating: 4.7, reviews: 320, location: "Brampton, ON", gradient: "linear-gradient(135deg, #0a0814, #1a1030)", bgImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp", initial: "R", specialty: "Wheels" },
  { id: "s4", name: "ArmorShield", rating: 5.0, reviews: 89, location: "Vaughan, ON", gradient: "linear-gradient(135deg, #081408, #0e2010)", bgImage: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp", initial: "A", specialty: "PPF" },
];

// ─── Skeleton ──────────────────────────────────────────────────────────────────

function Skeleton({ style }: { style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "linear-gradient(90deg, #14141A 25%, #1C1C24 50%, #14141A 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      borderRadius: 12,
      ...style,
    }} />
  );
}

// ─── FeedPost ─────────────────────────────────────────────────────────────────

function FeedPost({ post, index }: { post: typeof FEED_POSTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      style={{
        background: "var(--color-surface)",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid var(--color-border)",
        marginBottom: 16,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: "50%",
            background: "linear-gradient(135deg, #44CCFF33, #44CCFF66)",
            border: "1.5px solid rgba(68,204,255,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 800, color: "#44CCFF",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            flexShrink: 0,
          }}>
            {post.avatar}
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", margin: 0 }}>@{post.handle}</p>
            <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: 0 }}>{post.age} ago</p>
          </div>
        </div>
        <button style={{
          fontSize: 12, fontWeight: 700, color: "#44CCFF",
          background: "rgba(68,204,255,0.1)", border: "1px solid rgba(68,204,255,0.3)",
          borderRadius: 999, padding: "5px 12px", cursor: "pointer",
        }}>
          + Follow
        </button>
      </div>

      {/* Vehicle tag */}
      {post.vehicle && (
        <div style={{ padding: "0 16px 10px" }}>
          <Link href={`/vehicle/${slugifyVehicle(post.vehicle)}`} style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontWeight: 600, color: "var(--color-text-secondary)",
            background: "var(--color-surface-elevated)", border: "none",
            borderRadius: 999, padding: "4px 10px", cursor: "pointer",
            textDecoration: "none",
          }}>
            <Car size={11} />
            {post.vehicle}
          </Link>
        </div>
      )}

      {/* Caption */}
      <p style={{ fontSize: 14, color: "var(--color-text-primary)", margin: "0 16px 12px", lineHeight: 1.5 }}>
        {post.caption}
      </p>

      {/* Image */}
      <div style={{ position: "relative", maxHeight: 600, overflow: "hidden" }}>
        <img
          src={post.image}
          alt={post.caption}
          loading="lazy"
          style={{ width: "100%", aspectRatio: (post.ratio || "4/5"), objectFit: "cover", display: "block", maxHeight: 600 }}
        />
      </div>

      {/* Product tags */}
      <div style={{ display: "flex", gap: 6, padding: "12px 16px 8px", flexWrap: "wrap" }}>
        {post.tags.map((tag) => (
          <span key={tag} style={{
            background: "var(--color-surface-elevated)",
            borderRadius: 999,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: "var(--color-text-secondary)",
          }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Engagement */}
      <div style={{ display: "flex", gap: 16, padding: "4px 16px 10px" }}>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><Heart size={13} /> {post.likes}</span>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><MessageCircle size={13} /> {post.comments}</span>
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: 4 }}><Eye size={13} /> {post.views}</span>
      </div>

      {/* Action buttons */}
      <div style={{
        display: "flex", gap: 8, padding: "8px 16px 14px",
        borderTop: "1px solid var(--color-border)",
      }}>
        <button style={{
          flex: 1, fontSize: 13, fontWeight: 600, color: "#44CCFF",
          background: "rgba(68,204,255,0.08)", border: "1px solid rgba(68,204,255,0.2)",
          borderRadius: 12, padding: "10px 8px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        }}>
          <Sparkles size={13} /> Try On My Car
        </button>
        <button style={{
          flex: 1, fontSize: 13, fontWeight: 600, color: "#44CCFF",
          background: "rgba(68,204,255,0.08)", border: "1px solid rgba(68,204,255,0.2)",
          borderRadius: 12, padding: "10px 8px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
        }}>
          <ShoppingCart size={13} /> Shop This Build
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeVehicle, setActiveVehicle] = useState("All Cars");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = FEATURED_BUILDS.filter((b) =>
    activeCategory === "All" || b.tag === activeCategory
  );

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 24 }}>
      {/* TopBar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 30,
        background: "rgba(12,12,16,0.88)", backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(42,42,54,0.50)",
        padding: "12px 20px 0",
      }}>
        <h1 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 900, fontSize: 22, color: "#FFFFFF",
          letterSpacing: "-0.04em", margin: "0 0 12px",
        }}>
          Explore
        </h1>

        {/* Feed tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(42,42,54,0.6)" }}>
          {FEED_TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1, padding: "10px 4px 11px", fontSize: 13, fontWeight: 700,
                background: "none", border: "none", cursor: "pointer",
                color: activeTab === i ? "#44CCFF" : "#6B6B7B",
                borderBottom: activeTab === i ? "2px solid #44CCFF" : "2px solid transparent",
                marginBottom: -1, transition: "all 0.15s",
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="desktop-feed-col">
      {/* Post input bar */}
      <div style={{
        margin: "16px 20px 0",
        background: "var(--color-surface)",
        borderRadius: 16, padding: 12,
        display: "flex", alignItems: "center", gap: 10,
        border: "1px solid var(--color-border)",
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #44CCFF33, #44CCFF66)",
          border: "1.5px solid rgba(68,204,255,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 800, color: "#44CCFF",
        }}>
          Y
        </div>
        <input
          type="text"
          placeholder="Share your latest build..."
          style={{
            flex: 1, background: "none", border: "none", outline: "none",
            fontSize: 14, color: "var(--color-text-secondary)",
            fontFamily: "inherit",
          }}
        />
        <button style={{
          fontSize: 13, fontWeight: 700, color: "#0C0C10",
          background: "#44CCFF", border: "none", borderRadius: 10,
          padding: "7px 14px", cursor: "pointer",
        }}>
          Post
        </button>
      </div>

      {/* Following tab content */}
      {activeTab === 1 && (
        <div style={{ padding: "16px 20px 0" }}>
          {/* Following groups */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#6B6B7B", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 12px" }}>
              You follow
            </p>
            <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
              {[
                { label: "wrapsbyalex", type: "Creator", color: "#44CCFF" },
                { label: "BMW M4", type: "Vehicle", color: "#34D399" },
                { label: "#MurderedOut", type: "Style", color: "#A78BFA" },
                { label: "3M", type: "Brand", color: "#FBBF24" },
                { label: "carbonwerks", type: "Creator", color: "#44CCFF" },
              ].map((item) => (
                <div key={item.label} style={{
                  flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                }}>
                  <div style={{
                    width: 52, height: 52, borderRadius: "50%",
                    background: `${item.color}22`,
                    border: `2px solid ${item.color}44`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 800, color: item.color,
                  }}>
                    {item.label[0].toUpperCase()}
                  </div>
                  <span style={{ fontSize: 10, color: "#A0A0B0", maxWidth: 60, textAlign: "center", lineHeight: 1.2 }}>{item.label}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: item.color, background: `${item.color}15`, borderRadius: 999, padding: "1px 6px" }}>{item.type}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Following feed — subset of posts */}
          {FEED_POSTS.slice(0, 5).map((post, i) => (
            <FeedPost key={post.id} post={post} index={i} />
          ))}
        </div>
      )}

      {/* Feed posts */}
      {activeTab !== 1 && (
      <div style={{ padding: "16px 20px 0" }}>
        {FEED_POSTS.map((post, i) => (
          <FeedPost key={post.id} post={post} index={i} />
        ))}
      </div>
      )}
      </div>

      {/* ── FEATURED BUILDS section ───────────────────────────────────────── */}
      <div style={{ padding: "8px 20px 0" }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
          Featured Builds
        </p>
        <h2 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 800, fontSize: 18, color: "#FFFFFF",
          letterSpacing: "-0.03em", margin: "0 0 16px",
        }}>
          Top Builds This Week
        </h2>
      </div>

      {/* Category chips */}
      <div style={{
        display: "flex", gap: 8, padding: "0 20px 10px",
        overflowX: "auto", scrollbarWidth: "none", whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
      } as React.CSSProperties}>
        {CATEGORIES.map((cat) => {
          const isActive = cat === activeCategory;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0, padding: "7px 16px", borderRadius: 999,
                fontSize: 13, fontWeight: 600, cursor: "pointer",
                border: isActive ? "1px solid rgba(68,204,255,0.30)" : "none",
                background: isActive ? "rgba(68,204,255,0.15)" : "var(--color-surface-elevated)",
                color: isActive ? "#44CCFF" : "#A0A0B0",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Vehicle filters */}
      <div style={{
        display: "flex", gap: 8, padding: "0 20px 16px",
        overflowX: "auto", scrollbarWidth: "none", whiteSpace: "nowrap",
        WebkitOverflowScrolling: "touch",
      } as React.CSSProperties}>
        {VEHICLE_FILTERS.map((v) => {
          const isActive = v === activeVehicle;
          const slug = v !== "All Cars" && v !== "More" ? slugifyVehicle(v) : null;
          const chipStyle: React.CSSProperties = {
            flexShrink: 0, padding: "5px 12px", borderRadius: 999,
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            border: isActive ? "1px solid rgba(52,211,153,0.35)" : "1px solid var(--color-border)",
            background: isActive ? "rgba(52,211,153,0.12)" : "transparent",
            color: isActive ? "#34D399" : "#6B6B7B",
            transition: "all 0.2s",
            display: "flex", alignItems: "center", gap: 5,
          };
          if (slug) {
            return (
              <Link key={v} href={`/vehicle/${slug}`} style={{ textDecoration: "none", flexShrink: 0, display: "inline-flex" }}>
                <span style={chipStyle}>
                  <Car size={10} />
                  {v}
                </span>
              </Link>
            );
          }
          return (
            <button key={v} onClick={() => setActiveVehicle(v)} style={chipStyle}>
              {v}
            </button>
          );
        })}
      </div>

      <section style={{ padding: "0 20px" }}>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[...Array(6)].map((_, i) => <Skeleton key={i} style={{ height: 200 }} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#6B6B7B", fontSize: 14 }}>
            No builds found.
          </div>
        ) : (
          <div style={{ columns: 2, columnGap: 12 }}>
            {filtered.map((build, i) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.35 }}
                style={{
                  borderRadius: 16, background: "#14141A", border: "1px solid #2A2A36",
                  overflow: "hidden", cursor: "pointer",
                  breakInside: "avoid" as const, marginBottom: 12,
                  display: "inline-block", width: "100%",
                }}
              >
                <div style={{ height: i % 2 === 0 ? 200 : 280, position: "relative", overflow: "hidden" }}>
                  <img
                    src={build.image} alt={build.car} loading="lazy"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.45))" }} />
                  <span style={{
                    position: "absolute", top: 12, left: 12,
                    fontSize: 10, fontWeight: 700, color: "#fff",
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
                    borderRadius: 999, padding: "4px 10px", zIndex: 1,
                  }}>
                    {build.tag}
                  </span>
                </div>
                <div style={{ padding: "10px 12px 12px" }}>
                  <p style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 13, color: "#FFFFFF", margin: "0 0 2px", letterSpacing: "-0.02em" }}>
                    {build.car}
                  </p>
                  <p style={{ fontSize: 11, color: "#A0A0B0", margin: "0 0 6px" }}>{build.type}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 10, color: "#6B6B7B" }}>{build.shop}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: build.price === "Quote on request" ? "var(--color-text-secondary)" : build.accent, fontStyle: build.price === "Quote on request" ? "italic" : "normal" }}>
                      {build.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* ── TRENDING SHOPS section ─────────────────────────────────────────── */}
      <section style={{ padding: "28px 0 0" }}>
        <div style={{ padding: "0 20px", marginBottom: 14 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 4px" }}>
            Trending Shops
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 18, color: "#FFFFFF", letterSpacing: "-0.03em", margin: 0 }}>
              Top Rated Near You
            </h2>
            <button style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
              See All
            </button>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, padding: "4px 20px 8px", overflowX: "auto", scrollbarWidth: "none" }}>
          {loading
            ? [...Array(4)].map((_, i) => <Skeleton key={i} style={{ width: 160, height: 130, flexShrink: 0 }} />)
            : TRENDING_SHOPS.map((shop, i) => (
                <motion.div
                  key={shop.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.35 }}
                  style={{
                    flexShrink: 0, width: 160, background: "#14141A",
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.85)), url('${shop.bgImage}')`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    borderRadius: 24, border: "1px solid #2A2A36",
                    padding: 14, cursor: "pointer",
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, background: shop.gradient,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontWeight: 900, fontSize: 18, color: "#FFFFFF", marginBottom: 10,
                  }}>
                    {shop.initial}
                  </div>
                  <p style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 13, color: "#FFFFFF", margin: "0 0 2px", letterSpacing: "-0.02em" }}>
                    {shop.name}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 4 }}>
                    <Star size={11} color="#EF9F27" fill="#EF9F27" />
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#EF9F27" }}>{shop.rating}</span>
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

      <style>{`@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`}</style>
    </div>
  );
}
