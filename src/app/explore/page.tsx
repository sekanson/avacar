"use client";

import { useState } from "react";
import { Search, Heart, MessageCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockFeedPosts as prebuilds } from "@/data/products";
import type { FeedPost } from "@/types";

const categories = ["All", "Wraps", "Wheels", "Tint", "PPF"];

function FeedCard({ post }: { post: FeedPost }) {
  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: 16,
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        border: "1px solid var(--ghost-border)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "12px 16px 8px",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--surface-low)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {post.user.username[0].toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--on-surface)",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.user.username}
          </span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            {post.car.year} {post.car.make} {post.car.model}
          </span>
        </div>
      </div>

      {/* Image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
        <Image
          src={post.imageUrl}
          alt={`${post.car.year} ${post.car.make} ${post.car.model}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 300px"
          unoptimized
        />
        {post.isRender && (
          <div
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "3px 8px",
              borderRadius: 999,
              fontSize: 9,
              fontWeight: 600,
              background: "var(--overlay-card)",
              color: "var(--primary)",
              backdropFilter: "blur(8px)",
            }}
          >
            <Sparkles size={9} />
            AI
          </div>
        )}
      </div>

      {/* Action row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 12px 4px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <Heart
            size={16}
            fill={post.isLiked ? "#dc2626" : "none"}
            color={post.isLiked ? "#dc2626" : "var(--muted)"}
          />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            {post.likes}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MessageCircle size={16} color="var(--muted)" />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            {post.comments}
          </span>
        </div>
        <div style={{ flex: 1 }} />
        <Link
          href="/upload"
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          Try This Build
        </Link>
      </div>

      {/* Tags */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          padding: "4px 12px 12px",
        }}
      >
        {post.buildTags.slice(0, 2).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              fontWeight: 500,
              padding: "3px 8px",
              borderRadius: 999,
              background: "var(--tag-bg)",
              color: "var(--primary)",
            }}
          >
            #{tag.replace(/\s+/g, "")}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = prebuilds.filter((p) => {
    const matchesCat =
      activeCategory === "All" ||
      p.buildTags.some((t) =>
        t.toLowerCase().includes(activeCategory.toLowerCase())
      );
    const matchesSearch =
      !searchQuery.trim() ||
      p.car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.buildTags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 100 }}>
      {/* Search */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ position: "relative" }}>
          <Search
            size={16}
            color="var(--outline)"
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
          <input
            type="text"
            placeholder="Search builds, brands, styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "11px 16px 11px 40px",
              borderRadius: 12,
              border: "1px solid var(--ghost-border)",
              background: "var(--input-bg)",
              fontSize: 14,
              color: "var(--on-surface)",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Category pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "14px 20px 0",
          overflowX: "auto",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "7px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              flexShrink: 0,
              background:
                activeCategory === cat
                  ? "var(--primary-alpha-15)"
                  : "var(--surface-card)",
              color:
                activeCategory === cat
                  ? "var(--primary)"
                  : "var(--on-surface-variant)",
              boxShadow:
                activeCategory !== cat
                  ? "inset 0 0 0 1px var(--ghost-border)"
                  : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 12,
          padding: "16px 20px 0",
        }}
      >
        {filtered.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p
          style={{
            textAlign: "center",
            color: "var(--muted)",
            fontSize: 14,
            padding: "40px 0",
          }}
        >
          No builds found.
        </p>
      )}
    </div>
  );
}
