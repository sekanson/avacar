"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Sparkles, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockFeedPosts } from "@/data/feedPosts";
import { mockFeedPosts as prebuilds } from "@/data/products";
import type { FeedPost } from "@/types";

const categories = ["All", "Wraps", "Wheels", "Tint", "PPF"];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return `${Math.floor(days / 7)}w`;
}

function FeedCard({
  post,
  liked,
  onLike,
}: {
  post: FeedPost;
  liked: boolean;
  onLike: () => void;
}) {
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
          <Link
            href={`/profile/${post.user.username}`}
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--on-surface)",
              textDecoration: "none",
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {post.user.username}
          </Link>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>
            {post.car.year} {post.car.make} {post.car.model}
          </span>
        </div>
        <span style={{ fontSize: 11, color: "var(--outline)", flexShrink: 0 }}>
          {timeAgo(post.createdAt)}
        </span>
      </div>

      {/* Image */}
      <Link href={`/feed/${post.id}`}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
          <Image
            src={post.imageUrl}
            alt={`${post.car.year} ${post.car.make} ${post.car.model}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 500px"
            unoptimized
          />
          {post.isRender && (
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                borderRadius: 999,
                fontSize: 10,
                fontWeight: 600,
                background: "var(--overlay-card)",
                color: "var(--primary)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles size={10} />
              AI Render
            </div>
          )}
        </div>
      </Link>

      {/* Action row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "10px 16px 4px",
        }}
      >
        <button
          onClick={onLike}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Heart
            size={20}
            fill={liked ? "#dc2626" : "none"}
            color={liked ? "#dc2626" : "var(--muted)"}
          />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            {(post.likes + (liked && !post.isLiked ? 1 : 0)).toLocaleString()}
          </span>
        </button>
        <Link
          href={`/feed/${post.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            textDecoration: "none",
          }}
        >
          <MessageCircle size={20} color="var(--muted)" />
          <span style={{ fontSize: 12, color: "var(--muted)" }}>
            {post.comments}
          </span>
        </Link>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <Share2 size={20} color="var(--muted)" />
        </button>
        <div style={{ flex: 1 }} />
        <Link
          href="/upload"
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          Try This Build
        </Link>
      </div>

      {/* Hashtag pills */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          padding: "6px 16px 14px",
        }}
      >
        {post.buildTags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              fontWeight: 500,
              padding: "4px 10px",
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

export default function FeedPage() {
  const [feedCat, setFeedCat] = useState("All");
  const [feedTab, setFeedTab] = useState<"feed" | "trending">("feed");
  const [feedLikes, setFeedLikes] = useState<Record<string, boolean>>({});

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
    <div style={{ paddingBottom: 24, background: "var(--bg)", minHeight: "100vh" }}>
      {/* Hero banner */}
      <div
        style={{
          background: "var(--hero-gradient)",
          padding: "32px 20px 28px",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "var(--on-primary)",
            marginBottom: 6,
          }}
        >
          Design your build.
        </h1>
        <p
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,.75)",
            marginBottom: 16,
          }}
        >
          Share your car builds with the community
        </p>
        <Link
          href="/upload"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 999,
            background: "var(--on-primary)",
            color: "var(--primary)",
            fontSize: 13,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <Upload size={16} />
          Upload My Car
        </Link>
      </div>

      {/* Category pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "16px 20px 0",
          overflowX: "auto",
        }}
      >
        {categories.map((cat) => (
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
              background:
                feedCat === cat
                  ? "var(--primary-alpha-15)"
                  : "var(--surface-card)",
              color:
                feedCat === cat ? "var(--primary)" : "var(--on-surface-variant)",
              boxShadow:
                feedCat !== cat
                  ? "inset 0 0 0 1px var(--ghost-border)"
                  : "none",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feed / Trending toggle */}
      <div
        style={{
          display: "flex",
          margin: "16px 20px 0",
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
              background:
                feedTab === tab ? "var(--surface-card)" : "transparent",
              color:
                feedTab === tab ? "var(--on-surface)" : "var(--muted)",
              boxShadow:
                feedTab === tab ? "0 1px 3px rgba(0,0,0,.08)" : "none",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          padding: "16px 20px 0",
        }}
      >
        {filtered.map((post) => (
          <FeedCard
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
              color: "var(--muted)",
              fontSize: 14,
              padding: "40px 0",
            }}
          >
            No builds match this filter.
          </p>
        )}
      </div>
    </div>
  );
}
