"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Car, Heart, MessageCircle, Eye, Users, Wrench, Sparkles, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Vehicle data ─────────────────────────────────────────────────────────────

const VEHICLES: Record<string, {
  name: string;
  year: string;
  image: string;
  builds: number;
  followers: number;
  heroImage: string;
  popularMods: { name: string; price: string; count: number }[];
  posts: {
    id: string; handle: string; avatar: string; caption: string;
    image: string; likes: string; comments: string; views: string; tags: string[];
  }[];
}> = {
  "honda-civic": {
    name: "Honda Civic",
    year: "2022–2024",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp",
    heroImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&fm=webp",
    builds: 1240,
    followers: 8400,
    popularMods: [
      { name: "Inozetek Gloss White", price: "from $1,800", count: 312 },
      { name: "Volk TE37 Wheels", price: "from $2,400", count: 248 },
      { name: "Ceramic Tint 35%", price: "from $350", count: 671 },
      { name: "Rocket Bunny Kit", price: "from $5,200", count: 89 },
    ],
    posts: [
      { id: "hc1", handle: "civicbuilder", avatar: "C", caption: "Stock to stunner in one weekend. Avery SW900 + 18s.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp", likes: "192", comments: "38", views: "7.4K", tags: ["Avery SW900", "Enkei Wheels"] },
      { id: "hc2", handle: "jdm.wraps", avatar: "J", caption: "Full JDM build. Rocket Bunny + Inozetek. This thing is loud.", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp", likes: "134", comments: "16", views: "5.2K", tags: ["Rocket Bunny", "Inozetek Purple"] },
      { id: "hc3", handle: "cleanbuilds", avatar: "C", caption: "Ceramic coated and ready for summer.", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&fm=webp", likes: "89", comments: "11", views: "3.1K", tags: ["Ceramic Tint", "PPF"] },
      { id: "hc4", handle: "type_r_fan", avatar: "T", caption: "Type R in Matte Red. OEM+ done right.", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp", likes: "445", comments: "67", views: "21.3K", tags: ["Matte Red", "BBS Wheels"] },
    ],
  },
  "bmw-m4": {
    name: "BMW M4",
    year: "2021–2024",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp",
    heroImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80&fm=webp",
    builds: 3420,
    followers: 21600,
    popularMods: [
      { name: "3M Satin Black Wrap", price: "from $2,400", count: 891 },
      { name: "HRE FF15 Wheels", price: "from $4,800", count: 534 },
      { name: "Full PPF XPEL", price: "from $3,800", count: 712 },
      { name: "Avery Nardo Gray", price: "from $2,200", count: 445 },
    ],
    posts: [
      { id: "m41", handle: "carbonwerks", avatar: "C", caption: "M4 in our studio. Carbon fiber everything. Client wanted maximum aggression.", image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp", likes: "891", comments: "124", views: "41.2K", tags: ["Carbon Fiber", "BBS CH-R"] },
      { id: "m42", handle: "m4builds", avatar: "M", caption: "M4 in Avery SW900 Gloss Nardo Gray. Satin Black roof. The stance is perfect.", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp", likes: "451", comments: "56", views: "19.2K", tags: ["Avery Nardo Gray", "Satin Black Roof"] },
      { id: "m43", handle: "ppf.obsessed", avatar: "P", caption: "Full XPEL Ultimate Plus on the M4. Rock solid protection.", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp", likes: "445", comments: "52", views: "18.3K", tags: ["XPEL Ultimate Plus", "PPF"] },
      { id: "m44", handle: "euroboy", avatar: "E", caption: "Competition package in Isle of Man Green PPF. Perfection.", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp", likes: "672", comments: "91", views: "31.5K", tags: ["Isle of Man Green", "PPF"] },
    ],
  },
  "toyota-supra": {
    name: "Toyota Supra A90",
    year: "2019–2024",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp",
    heroImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80&fm=webp",
    builds: 2180,
    followers: 14900,
    popularMods: [
      { name: "Inozetek Super Gloss Black", price: "from $2,000", count: 634 },
      { name: "HRE P101 Wheels", price: "from $4,200", count: 421 },
      { name: "Rocket Bunny V2 Kit", price: "from $6,200", count: 156 },
      { name: "Chrome Delete", price: "from $600", count: 889 },
    ],
    posts: [
      { id: "ts1", handle: "driftking", avatar: "D", caption: "Supra on P101s at Mosport. The fitment is chef's kiss.", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp", likes: "218", comments: "45", views: "8.7K", tags: ["HRE P101", "Stance"] },
      { id: "ts2", handle: "supragang", avatar: "S", caption: "Murdered Out Supra. Full Inozetek Super Gloss Deep Black.", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp", likes: "634", comments: "78", views: "29.5K", tags: ["Inozetek Deep Black", "HRE R101"] },
      { id: "ts3", handle: "jdmfan", avatar: "J", caption: "Supra goes full JDM. Volk TE37s + Inozetek Purple.", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp", likes: "521", comments: "63", views: "23.1K", tags: ["Inozetek Purple", "Volk TE37"] },
    ],
  },
  "g-wagon": {
    name: "Mercedes G-Wagon",
    year: "2019–2024",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&fm=webp",
    heroImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80&fm=webp",
    builds: 1890,
    followers: 18200,
    popularMods: [
      { name: "3M Satin Black Full Wrap", price: "from $4,200", count: 342 },
      { name: "Forgiato Wheels 24\"", price: "from $6,800", count: 267 },
      { name: "Window Tint 20%", price: "from $400", count: 1240 },
      { name: "Matte Olive Green", price: "from $4,500", count: 189 },
    ],
    posts: [
      { id: "gw1", handle: "wrapsbyalex", avatar: "W", caption: "Finally did the Murdered Out look on my G-Wagon. Full 3M Satin Black + tint.", image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&fm=webp", likes: "342", comments: "28", views: "12.4K", tags: ["3M Satin Black", "HRE P101"] },
      { id: "gw2", handle: "luxwraps", avatar: "L", caption: "Matte Olive G-Wagon. The off-road look on a luxury icon.", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fm=webp", likes: "567", comments: "72", views: "26.8K", tags: ["Matte Olive", "Forgiato Wheels"] },
      { id: "gw3", handle: "gwagonking", avatar: "G", caption: "Starlight Black G-Wagon on 24s. No notes.", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&fm=webp", likes: "891", comments: "134", views: "48.2K", tags: ["Starlight Black", "24\" Forgiatos"] },
    ],
  },
  "porsche-911": {
    name: "Porsche 911",
    year: "2020–2024",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&fm=webp",
    heroImage: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80&fm=webp",
    builds: 2760,
    followers: 22100,
    popularMods: [
      { name: "Ceramic Tint 35%", price: "from $650", count: 1023 },
      { name: "XPEL Full PPF", price: "from $5,200", count: 891 },
      { name: "HRE 305M Wheels", price: "from $5,800", count: 334 },
      { name: "3M Color-Shift Wrap", price: "from $5,400", count: 112 },
    ],
    posts: [
      { id: "p91", handle: "tintpros_gta", avatar: "T", caption: "GT3 came in for 35% all around ceramic tint. The reflection on this car is insane.", image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&fm=webp", likes: "523", comments: "67", views: "22.1K", tags: ["Ceramic Tint 35%", "XPEL"] },
      { id: "p92", handle: "euroboy", avatar: "E", caption: "GT3 RS in Shark Blue. Stock paint but perfect PPF + ceramic.", image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp", likes: "712", comments: "98", views: "34.5K", tags: ["Shark Blue", "Full PPF"] },
      { id: "p93", handle: "porschemods", avatar: "P", caption: "Turbo S on HRE 305M in Frozen Silver. Perfection in every angle.", image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp", likes: "634", comments: "84", views: "28.9K", tags: ["HRE 305M", "PPF Full"] },
    ],
  },
};

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function VehiclePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [followed, setFollowed] = useState(false);

  const vehicle = VEHICLES[slug];

  if (!vehicle) {
    return (
      <div style={{ minHeight: "100vh", background: "#0C0C10", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        <Car size={48} color="#44CCFF" style={{ opacity: 0.4 }} />
        <p style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>Vehicle not found</p>
        <button onClick={() => router.back()} style={{ fontSize: 14, color: "#44CCFF", background: "none", border: "none", cursor: "pointer" }}>← Go back</button>
      </div>
    );
  }

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 40 }}>
      {/* Hero */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img
          src={vehicle.heroImage}
          alt={vehicle.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(12,12,16,0.9) 100%)" }} />

        {/* Back button */}
        <button
          onClick={() => router.back()}
          style={{
            position: "absolute", top: 16, left: 16,
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={17} color="#fff" />
        </button>

        {/* Vehicle info overlay */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 20px 20px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(68,204,255,0.15)", border: "1px solid rgba(68,204,255,0.3)",
            borderRadius: 999, padding: "3px 10px", marginBottom: 8,
          }}>
            <Car size={10} color="#44CCFF" />
            <span style={{ fontSize: 10, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              {vehicle.year}
            </span>
          </div>
          <h1 style={{
            fontSize: 28, fontWeight: 900, color: "#fff",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            letterSpacing: "-0.04em", margin: "0 0 12px",
          }}>
            {vehicle.name}
          </h1>

          {/* Stats + Follow */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ display: "flex", gap: 16 }}>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <strong style={{ color: "#fff", fontWeight: 700 }}>{formatCount(vehicle.builds)}</strong> builds
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)" }}>
                <strong style={{ color: "#fff", fontWeight: 700 }}>{formatCount(vehicle.followers)}</strong> followers
              </span>
            </div>
            <div style={{ flex: 1 }} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFollowed((f) => !f)}
              style={{
                height: 36, padding: "0 18px", borderRadius: 999,
                background: followed ? "rgba(68,204,255,0.15)" : "#44CCFF",
                border: followed ? "1px solid rgba(68,204,255,0.4)" : "none",
                color: followed ? "#44CCFF" : "#0C0C10",
                fontWeight: 700, fontSize: 13, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                transition: "all 0.2s",
              }}
            >
              <Users size={13} />
              {followed ? "Following" : "Follow Vehicle"}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Popular Mods */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 2px" }}>
              Most Popular
            </p>
            <h2 style={{
              fontSize: 18, fontWeight: 800, color: "#fff",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              letterSpacing: "-0.03em", margin: 0,
            }}>
              Popular Mods
            </h2>
          </div>
          <Link href="/marketplace/products" style={{ fontSize: 12, fontWeight: 600, color: "#44CCFF", textDecoration: "none" }}>
            Shop All →
          </Link>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {vehicle.popularMods.map((mod, i) => (
            <motion.div
              key={mod.name}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "#14141A", borderRadius: 14, padding: "12px 16px",
                border: "1px solid #2A2A36", cursor: "pointer",
              }}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: "rgba(68,204,255,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Wrench size={16} color="#44CCFF" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", margin: 0 }}>{mod.name}</p>
                <p style={{ fontSize: 11, color: "#6B6B7B", margin: 0 }}>{mod.count} builds use this</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#44CCFF" }}>{mod.price}</span>
                <ChevronRight size={14} color="#6B6B7B" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Community Builds */}
      <div style={{ padding: "28px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 4px" }}>
          Community
        </p>
        <h2 style={{
          fontSize: 18, fontWeight: 800, color: "#fff",
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          letterSpacing: "-0.03em", margin: "0 0 16px",
        }}>
          {vehicle.name} Builds
        </h2>

        {/* Masonry-style grid */}
        <div style={{ columns: 2, columnGap: 12 }}>
          {vehicle.posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              style={{
                breakInside: "avoid" as const,
                display: "inline-block", width: "100%",
                background: "#14141A", borderRadius: 16,
                border: "1px solid #2A2A36", overflow: "hidden",
                marginBottom: 12, cursor: "pointer",
              }}
            >
              <div style={{ height: i % 2 === 0 ? 160 : 220, position: "relative", overflow: "hidden" }}>
                <img
                  src={post.image}
                  alt={post.caption}
                  loading="lazy"
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))" }} />
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", margin: "0 0 3px" }}>@{post.handle}</p>
                <p style={{ fontSize: 12, color: "#A0A0B0", margin: "0 0 8px", lineHeight: 1.4 }}>{post.caption}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 8 }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{
                      fontSize: 9, fontWeight: 600, color: "#6B6B7B",
                      background: "#1E1E28", borderRadius: 999, padding: "2px 7px",
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <span style={{ fontSize: 11, color: "#6B6B7B", display: "flex", alignItems: "center", gap: 3 }}><Heart size={10} /> {post.likes}</span>
                  <span style={{ fontSize: 11, color: "#6B6B7B", display: "flex", alignItems: "center", gap: 3 }}><MessageCircle size={10} /> {post.comments}</span>
                  <span style={{ fontSize: 11, color: "#6B6B7B", display: "flex", alignItems: "center", gap: 3 }}><Eye size={10} /> {post.views}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(68,204,255,0.08) 0%, rgba(0,127,255,0.12) 100%)",
          border: "1px solid rgba(68,204,255,0.2)",
          borderRadius: 20, padding: "24px 20px",
          textAlign: "center",
        }}>
          <div style={{ marginBottom: 8 }}>
            <Sparkles size={28} color="#44CCFF" style={{ marginBottom: 8 }} />
          </div>
          <h3 style={{
            fontSize: 18, fontWeight: 800, color: "#fff",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            letterSpacing: "-0.03em", margin: "0 0 8px",
          }}>
            Try a look on YOUR {vehicle.name}
          </h3>
          <p style={{ fontSize: 13, color: "#A0A0B0", margin: "0 0 20px", lineHeight: 1.5 }}>
            Upload a photo and see how any of these mods look on your actual car in seconds.
          </p>
          <Link
            href="/create"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
              height: 52, padding: "0 32px", borderRadius: 999,
              background: "linear-gradient(135deg, #44CCFF 0%, #007FFF 100%)",
              color: "#0C0C10", fontWeight: 700, fontSize: 15,
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(68,204,255,0.3)",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            }}
          >
            <Sparkles size={16} /> Try It Now
          </Link>
        </div>
      </div>
    </div>
  );
}
