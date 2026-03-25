"use client";

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import Link from "next/link";
import PostCard from "@/components/ui/PostCard";
import { mockFeedPosts } from "@/data/feedPosts";
import { mockPrebuilds as prebuilds } from "@/data/products";

const CATEGORIES = ["All", "Wraps", "Wheels", "Tint", "PPF", "Suspension", "Performance"];

const STORY_USERS = [
  {
    id: "you",
    label: "Add Story",
    initial: "+",
    gradient: "var(--surface-low)",
    textColor: "var(--primary)",
    hasNew: false,
    isYours: true,
  },
  {
    id: "u1",
    label: "wrapsbyalex",
    initial: "W",
    gradient: "linear-gradient(135deg, #005ab7, #0072e5)",
    textColor: "var(--on-surface-variant)",
    hasNew: true,
    isYours: false,
  },
  {
    id: "u2",
    label: "gta.wraps",
    initial: "G",
    gradient: "linear-gradient(135deg, #0057cc, #007FFF)",
    textColor: "var(--on-surface-variant)",
    hasNew: true,
    isYours: false,
  },
  {
    id: "u3",
    label: "chromedelete",
    initial: "C",
    gradient: "linear-gradient(135deg, #007FFF, #0099ff)",
    textColor: "var(--on-surface-variant)",
    hasNew: false,
    isYours: false,
  },
  {
    id: "u4",
    label: "ppf.obsessed",
    initial: "P",
    gradient: "linear-gradient(135deg, #0066cc, #0089e0)",
    textColor: "var(--on-surface-variant)",
    hasNew: true,
    isYours: false,
  },
  {
    id: "u5",
    label: "m4_life",
    initial: "M",
    gradient: "linear-gradient(135deg, #003d8f, #005ab7)",
    textColor: "var(--on-surface-variant)",
    hasNew: false,
    isYours: false,
  },
];

export default function FeedPage() {
  const [feedCat, setFeedCat] = useState("All");
  const [feedTab, setFeedTab] = useState<"feed" | "trending">("feed");
  const [feedLikes, setFeedLikes] = useState<Record<string, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [feedTab, feedCat]);

  const toggleLike = (id: string) => {
    setFeedLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const posts = feedTab === "feed" ? mockFeedPosts : prebuilds;
  const filtered = posts.filter((p) => {
    if (feedCat === "All") return true;
    const cat = feedCat.toLowerCase();
    return p.buildTags.some((t) => t.toLowerCase().includes(cat));
  });

  return (
    <div
      ref={scrollRef}
      style={{
        flex: 1,
        overflowY: "auto",
        overflowX: "hidden",
        background: "var(--bg)",
        paddingBottom: 100,
        scrollbarWidth: "none",
        maxWidth: 620,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Story / Progress strip — 80px horizontal scroll */}
      <div
        className="story-strip-mobile"
        style={{
          gap: 16,
          overflowX: "auto",
          scrollbarWidth: "none",
          padding: "14px 16px 10px",
          alignItems: "flex-start",
        }}
      >
        {STORY_USERS.map((su) => (
          <button
            key={su.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
              background: "none",
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              padding: 0,
            }}
          >
            {/* Cyan ring for users with unwatched stories */}
            <div
              style={{
                padding: su.hasNew ? 2 : 0,
                borderRadius: "50%",
                background: su.hasNew ? "linear-gradient(135deg, #007FFF, #0072e5)" : "transparent",
              }}
            >
              <div
                style={{
                  width: su.hasNew ? 48 : 52,
                  height: su.hasNew ? 48 : 52,
                  borderRadius: "50%",
                  background: su.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: su.isYours ? 22 : 18,
                  fontWeight: 700,
                  color: su.isYours ? "var(--primary)" : "#fff",
                  border: su.hasNew ? "2px solid var(--bg)" : "none",
                }}
              >
                {su.initial}
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: su.textColor,
                maxWidth: 56,
                textAlign: "center",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {su.label}
            </span>
          </button>
        ))}
      </div>

      {/* Filter pills — sticky below top nav */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          background: "var(--bg)",
          paddingBottom: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            scrollbarWidth: "none",
            padding: "8px 16px",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFeedCat(cat)}
              style={{
                padding: "7px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                flexShrink: 0,
                background: feedCat === cat ? "var(--primary)" : "var(--surface-card)",
                color: feedCat === cat ? "#fff" : "var(--on-surface-variant)",
                transition: "all .15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Feed / Trending toggle */}
      <div
        style={{
          display: "flex",
          margin: "4px 16px 12px",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--surface-low)",
          padding: 3,
        }}
      >
        {(["feed", "trending"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFeedTab(tab)}
            style={{
              flex: 1,
              padding: "9px 0",
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              borderRadius: 10,
              background: feedTab === tab ? "var(--surface-card)" : "transparent",
              color: feedTab === tab ? "var(--on-surface)" : "var(--on-surface-variant)",
              boxShadow: feedTab === tab ? "0 1px 3px rgba(0,0,0,.08)" : "none",
              textTransform: "capitalize",
              transition: "all .2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Post cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 16px" }}>
        {filtered.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            liked={feedLikes[post.id] ?? post.isLiked}
            onLike={() => toggleLike(post.id)}
          />
        ))}
        {filtered.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "var(--on-surface-variant)",
              fontSize: 14,
              padding: "40px 0",
            }}
          >
            No builds match this filter.
          </p>
        )}
      </div>

      {/* FAB — mobile only, fixed above bottom nav */}
      <Link
        href="/upload"
        className="fab-glow mobile-fab"
        aria-label="Upload car photo"
        style={{
          position: "fixed",
          bottom: 88,
          right: 20,
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: 999,
          background: "#007FFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textDecoration: "none",
        }}
      >
        <Upload size={22} color="#fff" />
      </Link>
    </div>
  );
}
