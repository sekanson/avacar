"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Eye, Bookmark, Sparkles } from "lucide-react";

// ─── Feed Mock Data ────────────────────────────────────────────────────────────

const FEED_POSTS = [
  {
    id: "p1",
    handle: "wrapsbyalex",
    avatar: "W",
    age: "3h",
    vehicle: "2022 Mercedes G-Wagon",
    caption: "Finally did the Murdered Out look on my G-Wagon. Full 3M Satin Black + tint.",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp",
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
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp",
    tags: ["Matte White Wrap", "Volk TE37"],
    likes: "298",
    comments: "41",
    views: "13.7K",
    ratio: "4/5",
  },
  {
    id: "p16",
    handle: "rollingshots",
    avatar: "R",
    age: "1w",
    vehicle: "2022 Honda Civic",
    caption: "Rolling shots on the Civic. Golden hour hits different on gloss white.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp",
    tags: ["Gloss White", "Rolling Shot"],
    likes: "187",
    comments: "22",
    views: "6.9K",
    ratio: "4/3",
  },
  {
    id: "p17",
    handle: "eurospec",
    avatar: "E",
    age: "1w",
    vehicle: "2024 BMW M4 Competition",
    caption: "Euro spec M4 fresh off the wrap table. Carbon roof, CF splitter, the works.",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp",
    tags: ["Carbon Fiber", "Euro Spec"],
    likes: "539",
    comments: "71",
    views: "23.4K",
    ratio: "1/1",
  },
  {
    id: "p18",
    handle: "stateside.builds",
    avatar: "S",
    age: "2w",
    vehicle: "2023 Porsche 911",
    caption: "Stateside 911 build. PPF full body, ceramic coat, and a subtle satin finish on top.",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp",
    tags: ["PPF Full Body", "Ceramic Coat"],
    likes: "623",
    comments: "84",
    views: "28.1K",
    ratio: "4/5",
  },
  {
    id: "p19",
    handle: "nightcrew",
    avatar: "N",
    age: "2w",
    vehicle: "2023 Tesla Model 3",
    caption: "Night crew vibes. Tesla wrapped in Avery Satin Black under the city lights.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp",
    tags: ["Avery Satin Black", "Night Shot"],
    likes: "314",
    comments: "39",
    views: "14.2K",
    ratio: "4/3",
  },
  {
    id: "p20",
    handle: "trackday_official",
    avatar: "T",
    age: "3w",
    vehicle: "2021 Nissan GT-R R35",
    caption: "Track day weapon. GT-R prepped and wrapped. All business on the circuit.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp",
    tags: ["Track Build", "Inozetek"],
    likes: "478",
    comments: "63",
    views: "20.5K",
    ratio: "1/1",
  },
];

// ─── Section Data ───────────────────────────────────────────────────────────────

const TRENDING_CARDS = [
  { title: "🔥 Murdered Out builds are trending", bg: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80&fm=webp" },
  { title: "🔥 Supra season is here", bg: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp" },
  { title: "🔥 Best wraps for spring", bg: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp" },
];

const VEHICLE_PILLS = [
  { label: "Honda Civic", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=300&q=80&fm=webp", slug: "honda-civic" },
  { label: "BMW M4", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&q=80&fm=webp", slug: "bmw-m4" },
  { label: "G-Wagon", img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=300&q=80&fm=webp", slug: "g-wagon" },
  { label: "Toyota Supra", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&q=80&fm=webp", slug: "toyota-supra" },
  { label: "Porsche 911", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=300&q=80&fm=webp", slug: "porsche-911" },
  { label: "Nissan GT-R", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&q=80&fm=webp", slug: "nissan-gt-r" },
  { label: "Tesla", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&q=80&fm=webp", slug: "tesla" },
  { label: "More ▾", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=300&q=80&fm=webp", slug: null },
];

const COLLECTIONS = [
  { title: "Midnight Builds", count: 48, images: ["https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&q=80&fm=webp"] },
  { title: "Golden Hour", count: 32, images: ["https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80&fm=webp"] },
  { title: "JDM Legends", count: 67, images: ["https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=200&q=80&fm=webp"] },
  { title: "Clean Dailies", count: 41, images: ["https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=200&q=80&fm=webp","https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=200&q=80&fm=webp"] },
];

const INTEREST_PILLS = ["All", "Wraps", "Wheels", "Full Builds", "Scenes", "JDM", "Euro", "Muscle", "Off-Road"];

// ─── MasonryCard Component ──────────────────────────────────────────────────────

function MasonryCard({ post }: { post: typeof FEED_POSTS[0] }) {
  const [hovered, setHovered] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        breakInside: "avoid",
        marginBottom: 10,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        background: "var(--color-surface)",
      }}
    >
      <img
        src={post.image}
        alt={post.caption}
        loading="lazy"
        style={{ width: "100%", display: "block" }}
        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80"; }}
      />

      {/* Hover overlay */}
      {hovered && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column",
          justifyContent: "space-between",
          padding: 12,
          transition: "opacity 0.2s",
        }}>
          {/* Top right save */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={(e) => { e.stopPropagation(); setSaved(s => !s); }}
              style={{
                width: 36, height: 36, borderRadius: "50%",
                background: saved ? "#44CCFF" : "rgba(255,255,255,0.15)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Bookmark size={16} color={saved ? "#0C0C10" : "#fff"} fill={saved ? "#0C0C10" : "none"} />
            </button>
          </div>
          {/* Bottom action */}
          <button style={{
            width: "100%", height: 36, borderRadius: 999,
            background: "#44CCFF", color: "#0C0C10",
            border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 700,
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          }}>
            🔮 Try On My Car
          </button>
        </div>
      )}

      {/* Always-visible bottom info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 10px 10px",
        background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
        pointerEvents: "none",
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "#fff", margin: "0 0 2px" }}>@{post.handle}</p>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", margin: 0 }}>🚗 {post.vehicle}</p>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────

export default function ExplorePage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [followingOnly, setFollowingOnly] = useState(false);

  const filteredPosts = activeFilter === "All" ? FEED_POSTS : FEED_POSTS.filter(() => true);

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 80 }}>

      {/* SECTION 1: Trending Now */}
      <section style={{ padding: "20px 20px 0" }}>
        <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 18, color: "var(--color-text-primary)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          Trending Now
        </h2>
        <div className="scroll-row" style={{ display: "flex", gap: 12, paddingBottom: 4 }}>
          {TRENDING_CARDS.map((card) => (
            <div key={card.title} style={{
              flexShrink: 0, width: 280, height: 160, borderRadius: 16, overflow: "hidden",
              position: "relative", cursor: "pointer",
            }}>
              <img src={card.bg} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px 16px" }}>
                <p style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 15, color: "#fff", margin: "0 0 4px", lineHeight: 1.3 }}>{card.title}</p>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>See all →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Browse by Vehicle */}
      <section style={{ padding: "24px 20px 0" }}>
        <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 18, color: "var(--color-text-primary)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          Browse by Vehicle
        </h2>
        <div className="scroll-row" style={{ display: "flex", gap: 10, paddingBottom: 4 }}>
          {VEHICLE_PILLS.map((v) => {
            const inner = (
              <div style={{
                flexShrink: 0, width: 120, height: 70, borderRadius: 12, overflow: "hidden",
                position: "relative", cursor: "pointer",
              }}>
                <img src={v.img} alt={v.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                <p style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 11, fontWeight: 700, color: "#fff", margin: 0 }}>{v.label}</p>
              </div>
            );
            return v.slug ? (
              <Link key={v.label} href={`/vehicle/${v.slug}`} style={{ textDecoration: "none" }}>{inner}</Link>
            ) : (
              <div key={v.label}>{inner}</div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Featured Collections */}
      <section style={{ padding: "24px 20px 0" }}>
        <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 18, color: "var(--color-text-primary)", margin: "0 0 14px", letterSpacing: "-0.02em" }}>
          Featured Collections
        </h2>
        <div className="scroll-row" style={{ display: "flex", gap: 12, paddingBottom: 4 }}>
          {COLLECTIONS.map((col) => (
            <div key={col.title} style={{ flexShrink: 0, width: 180, cursor: "pointer" }}>
              <div style={{ width: 180, height: 160, borderRadius: 14, overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 2 }}>
                {col.images.map((img, i) => (
                  <img key={i} src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ))}
              </div>
              <p style={{ fontWeight: 700, fontSize: 13, color: "var(--color-text-primary)", margin: "8px 0 2px" }}>{col.title}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>{col.count} builds</p>
            </div>
          ))}
        </div>
      </section>

      {/* FILTER PILLS — sticky */}
      <div style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(12,12,16,0.9)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(42,42,54,0.5)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "12px 20px",
        marginTop: 24,
      }}>
        <div className="scroll-row" style={{ display: "flex", gap: 8, flex: 1 }}>
          {INTEREST_PILLS.map((pill) => (
            <button key={pill} onClick={() => setActiveFilter(pill)} style={{
              flexShrink: 0, height: 32, padding: "0 14px", borderRadius: 999,
              border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
              background: activeFilter === pill ? "#44CCFF" : "var(--color-surface-elevated)",
              color: activeFilter === pill ? "#0C0C10" : "var(--color-text-secondary)",
              transition: "all 0.15s",
            }}>{pill}</button>
          ))}
        </div>
        <button onClick={() => setFollowingOnly(f => !f)} style={{
          flexShrink: 0, height: 32, padding: "0 14px", marginLeft: 12, borderRadius: 999,
          border: `1px solid ${followingOnly ? "#44CCFF" : "var(--color-border)"}`,
          background: followingOnly ? "rgba(68,204,255,0.12)" : "none",
          color: followingOnly ? "#44CCFF" : "var(--color-text-secondary)",
          fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
        }}>
          {followingOnly ? "✓ Following" : "Following"}
        </button>
      </div>

      {/* MASONRY GRID */}
      <div style={{ padding: "16px 12px 0" }}>
        <div className="masonry-grid">
          {filteredPosts.map((post) => (
            <MasonryCard key={post.id} post={post} />
          ))}
        </div>
      </div>

    </div>
  );
}
