"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Settings, Grid, Bookmark, UserCheck, UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_USER = {
  initial: "H",
  displayName: "Hammad A.",
  username: "@hammadcar",
  bio: "Car enthusiast. Building dreams one wrap at a time. 🚗",
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
    gradient: "linear-gradient(135deg, #0a0a12, #1a1a2e)",
    accent: "#44CCFF",
  },
  {
    id: "mb2",
    title: "GT500 Build",
    style: "Carbon Kit",
    gradient: "linear-gradient(135deg, #0d0d0d, #1a0808)",
    accent: "#F87171",
  },
  {
    id: "mb3",
    title: "M3 Build",
    style: "Chrome Delete",
    gradient: "linear-gradient(135deg, #080a14, #101828)",
    accent: "#34D399",
  },
  {
    id: "mb4",
    title: "RS7 Build",
    style: "Full PPF",
    gradient: "linear-gradient(135deg, #0a080e, #180d24)",
    accent: "#A78BFA",
  },
];

const MOCK_POSTS = [
  {
    id: "mp1",
    title: "Supra sunset",
    style: "Photo",
    gradient: "linear-gradient(135deg, #1a0505, #2d0a0a)",
    accent: "#F87171",
  },
  {
    id: "mp2",
    title: "Garage day",
    style: "Photo",
    gradient: "linear-gradient(135deg, #0a0c08, #101a0c)",
    accent: "#34D399",
  },
  {
    id: "mp3",
    title: "New wheels day",
    style: "Photo",
    gradient: "linear-gradient(135deg, #080a14, #101828)",
    accent: "#A78BFA",
  },
  {
    id: "mp4",
    title: "PPF complete",
    style: "Photo",
    gradient: "linear-gradient(135deg, #0a0a12, #1a1a2e)",
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

      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ padding: "28px 20px 0" }}
      >
        {/* Avatar + follow row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 16,
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
              border: "3px solid rgba(68,204,255,0.25)",
              flexShrink: 0,
            }}
          >
            {MOCK_USER.initial}
          </div>

          {/* Follow button */}
          <button
            onClick={() => setFollowing((v) => !v)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 40,
              padding: "0 20px",
              borderRadius: 999,
              background: following ? "#1C1C24" : "#44CCFF",
              color: following ? "#44CCFF" : "#0C0C10",
              border: following ? "1px solid #44CCFF" : "none",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 13,
              fontWeight: 800,
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: following ? "none" : "0 0 18px rgba(68,204,255,0.35)",
            }}
          >
            {following ? (
              <>
                <UserCheck size={15} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={15} />
                Follow
              </>
            )}
          </button>
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
            background: "#14141A",
            borderRadius: 16,
            border: "1px solid #2A2A36",
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
                  fontSize: 13,
                  fontWeight: 700,
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

        {/* Content grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {gridItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              style={{
                borderRadius: 14,
                background: item.gradient,
                border: `1px solid ${item.accent}20`,
                aspectRatio: "1/1",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                padding: 12,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: item.accent,
                  opacity: 0.15,
                  filter: "blur(16px)",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: item.accent,
                  display: "block",
                  marginBottom: 2,
                  position: "relative",
                }}
              >
                {item.style}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  position: "relative",
                }}
              >
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
