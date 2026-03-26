"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Grid, Bookmark, UserCheck, UserPlus, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  initial: "H",
  displayName: "Hammad A.",
  username: "@hammadcar",
  bio: "Car enthusiast. Building dreams one wrap at a time.",
  posts: 12,
  followers: 847,
  following: 234,
  gradient: "linear-gradient(135deg, #003d8f, #0066cc)",
};

const MOCK_BUILDS = [
  {
    id: "mb1",
    title: "Supra Build",
    style: "Matte Black Wrap",
    category: "Wrap",
    car: "2023 Toyota Supra",
    likes: 342,
    saves: 28,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp",
    accent: "#44CCFF",
  },
  {
    id: "mb2",
    title: "GT500 Build",
    style: "Carbon Kit",
    category: "Body Kit",
    car: "2022 Ford GT500",
    likes: 218,
    saves: 41,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp",
    accent: "#F87171",
  },
  {
    id: "mb3",
    title: "M3 Build",
    style: "Chrome Delete",
    category: "Wrap",
    car: "2021 BMW M3",
    likes: 189,
    saves: 17,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp",
    accent: "#34D399",
  },
  {
    id: "mb4",
    title: "RS7 Build",
    style: "Full PPF",
    category: "PPF",
    car: "2023 Audi RS7",
    likes: 421,
    saves: 53,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fm=webp",
    accent: "#A78BFA",
  },
];

const MOCK_POSTS = [
  {
    id: "mp1",
    title: "Supra sunset",
    style: "Photo",
    category: "Photo",
    car: "2023 Toyota Supra",
    likes: 156,
    saves: 12,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp",
    accent: "#F87171",
  },
  {
    id: "mp2",
    title: "Garage day",
    style: "Photo",
    category: "Photo",
    car: "2022 Honda Civic",
    likes: 89,
    saves: 7,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80&fm=webp",
    accent: "#34D399",
  },
  {
    id: "mp3",
    title: "New wheels day",
    style: "Photo",
    category: "Wheels",
    car: "2022 Toyota GR86",
    likes: 234,
    saves: 31,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp",
    accent: "#A78BFA",
  },
  {
    id: "mp4",
    title: "PPF complete",
    style: "Photo",
    category: "PPF",
    car: "2021 BMW M3",
    likes: 178,
    saves: 22,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
    accent: "#44CCFF",
  },
];

type Tab = "builds" | "posts";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("builds");
  const [following, setFollowing] = useState(false);

  const gridItems = activeTab === "builds" ? MOCK_BUILDS : MOCK_POSTS;

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 24 }}>
      {/* TopBar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 22,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Profile
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* P6: Follow button top-right, aligned with settings */}
          <button
            onClick={() => setFollowing((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 36,
              padding: "0 16px",
              borderRadius: 999,
              background: following ? "#1C1C24" : "#44CCFF",
              color: following ? "#44CCFF" : "#0C0C10",
              border: following ? "1px solid #44CCFF" : "none",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: following ? "none" : "0 0 16px rgba(68,204,255,0.35)",
            }}
          >
            {following ? (
              <>
                <UserCheck size={14} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={14} />
                Follow
              </>
            )}
          </button>
          <button
            onClick={() => router.push("/settings")}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#14141A",
              border: "1px solid #2A2A36",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            aria-label="Settings"
          >
            <Settings size={18} color="#A0A0B0" />
          </button>
        </div>
      </div>

      {/* P2: Cover photo */}
      <div style={{ position: "relative", marginBottom: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&fm=webp"
          alt="Cover"
          loading="lazy"
          style={{
            width: "100%",
            height: 180,
            objectFit: "cover",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(12,12,16,0.4))",
        }} />
      </div>

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "0 20px 0" }}
      >
        {/* Avatar row — avatar overlaps cover */}
        <div
          style={{
            marginBottom: 16,
            marginTop: -48,
          }}
        >
          {/* 96px avatar */}
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: "50%",
              background: MOCK_USER.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 900,
              fontSize: 38,
              color: "#FFFFFF",
              boxShadow: "0 0 32px rgba(68,204,255,0.25)",
              border: "3px solid #0C0C10",
              flexShrink: 0,
            }}
          >
            {MOCK_USER.initial}
          </div>
        </div>

        {/* Name, username, bio */}
        <h2
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 22,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            margin: "0 0 2px",
          }}
        >
          {MOCK_USER.displayName}
        </h2>
        <p
          style={{
            fontSize: 13,
            color: "#44CCFF",
            fontWeight: 600,
            margin: "0 0 10px",
          }}
        >
          {MOCK_USER.username}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#A0A0B0",
            margin: "0 0 22px",
            lineHeight: 1.55,
          }}
        >
          {MOCK_USER.bio}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            background: "var(--color-surface)",
            borderRadius: 16,
            padding: 16,
            marginBottom: 24,
          }}
        >
          {[
            { label: "Posts", value: MOCK_USER.posts },
            { label: "Followers", value: MOCK_USER.followers.toLocaleString() },
            { label: "Following", value: MOCK_USER.following },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "16px 0",
                borderRight: i < 2 ? "1px solid #2A2A36" : "none",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  fontWeight: 900,
                  fontSize: 20,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#6B6B7B",
                  marginTop: 3,
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #2A2A36",
            marginBottom: 16,
          }}
        >
          {(["builds", "posts"] as Tab[]).map((tab) => {
            const Icon = tab === "builds" ? Grid : Bookmark;
            const isActive = tab === activeTab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  padding: "10px 0 12px",
                  background: "none",
                  border: "none",
                  borderBottom: isActive ? "2px solid #44CCFF" : "2px solid transparent",
                  marginBottom: -1,
                  color: isActive ? "#44CCFF" : "#6B6B7B",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "color 0.2s",
                }}
              >
                <Icon size={15} />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            );
          })}
        </div>

        {/* Content grid - masonry (P7) */}
        <div style={{ columns: 2, columnGap: 10 }}>
          {gridItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              style={{
                borderRadius: 14,
                height: i % 2 === 0 ? 200 : 320,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                breakInside: "avoid" as const,
                marginBottom: 10,
                display: "block",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              {/* Gradient overlay for text legibility */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.8) 100%)",
              }} />
              {/* P4: Card metadata bottom overlay */}
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}>
                {/* Left: category + title + car */}
                <div style={{ flex: 1, minWidth: 0, marginRight: 6 }}>
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    color: item.accent,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: 2,
                  }}>
                    {item.category}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontWeight: 800,
                    fontSize: 11,
                    color: "#FFFFFF",
                    letterSpacing: "-0.02em",
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", display: "block", marginTop: 1 }}>
                    {item.car}
                  </span>
                </div>
                {/* Right: likes + saves */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 2 }}><Heart size={9} /> {item.likes}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 2 }}><Bookmark size={9} /> {item.saves}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
