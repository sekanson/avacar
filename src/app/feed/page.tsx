"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Sparkles, Upload, HelpCircle, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockFeedPosts } from "@/data/feedPosts";
import { mockPrebuilds as prebuilds } from "@/data/products";
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

function timeUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Ended";
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h left`;
  return `${Math.floor(hrs / 24)}d left`;
}

function PollBars({ post }: { post: FeedPost }) {
  if (!post.poll) return null;
  const opts = post.poll.options;
  const total = opts.reduce((s, o) => s + o.votes, 0);
  const maxVotes = Math.max(...opts.map((o) => o.votes));

  return (
    <div style={{ padding: "12px 16px 4px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {opts.map((opt) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isLeading = opt.votes === maxVotes;
          return (
            <div key={opt.id}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 8,
                  overflow: "hidden",
                  height: 36,
                  background: "var(--surface-low)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${pct}%`,
                    background: isLeading
                      ? "var(--primary-alpha-15)"
                      : "var(--surface-low)",
                    borderRadius: 8,
                    transition: "width 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 12px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: isLeading ? 600 : 400,
                      color: isLeading ? "var(--primary)" : "var(--on-surface-variant)",
                    }}
                  >
                    {opt.text}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: isLeading ? "var(--primary)" : "var(--muted)",
                    }}
                  >
                    {pct}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 8 }}>
        {total.toLocaleString()} votes · {timeUntil(post.poll.endsAt)}
      </p>
    </div>
  );
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
  const postType = post.postType ?? "image";
  const isTextType = postType === "text" || postType === "question" || postType === "poll";

  const cardBg = isTextType ? "var(--surface)" : "var(--surface-card)";

  return (
    <div
      style={{
        background: cardBg,
        borderRadius: 24,
        boxShadow: "var(--shadow-card)",
        overflow: "hidden",
        padding: isTextType ? "0 0 4px" : undefined,
      }}
    >
      {/* Reply-to indicator */}
      {post.replyTo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px 0",
            fontSize: 12,
            color: "var(--muted)",
          }}
        >
          <MessageCircle size={12} color="var(--muted)" />
          <span>
            Replying to{" "}
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              @{post.replyTo.username}
            </span>
          </span>
        </div>
      )}

      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: post.replyTo ? "8px 16px 8px" : "12px 16px 8px",
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
          {post.car ? (
            <span style={{ fontSize: 11, color: "var(--muted)" }}>
              {post.car.year} {post.car.make} {post.car.model}
            </span>
          ) : (
            <span style={{ fontSize: 11, color: "var(--muted)" }}>
              {timeAgo(post.createdAt)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {postType === "question" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                padding: "3px 8px",
                borderRadius: 999,
                background: "var(--primary-alpha-10)",
                fontSize: 10,
                fontWeight: 600,
                color: "var(--primary)",
              }}
            >
              <HelpCircle size={10} />
              Question
            </div>
          )}
          {post.car && (
            <span style={{ fontSize: 11, color: "var(--outline)" }}>
              {timeAgo(post.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Image (image/build_share posts only) */}
      {(postType === "image" || postType === "build_share") && post.imageUrl && (
        <Link href={`/feed/${post.id}`}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
            <Image
              src={post.imageUrl}
              alt={post.car ? `${post.car.year} ${post.car.make} ${post.car.model}` : post.caption}
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
      )}

      {/* Caption / text body */}
      <div style={{ padding: isTextType ? "4px 16px 8px" : "10px 16px 4px" }}>
        <Link href={`/feed/${post.id}`} style={{ textDecoration: "none" }}>
          <p
            style={{
              fontSize: isTextType ? 15 : 13,
              lineHeight: 1.6,
              color: "var(--on-surface)",
              margin: 0,
              fontWeight: isTextType ? 400 : 400,
            }}
          >
            {post.caption}
          </p>
        </Link>
      </div>

      {/* Poll bars */}
      {postType === "poll" && <PollBars post={post} />}

      {/* Action row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "6px 16px 8px",
        }}
      >
        <button
          onClick={onLike}
          aria-label={liked ? "Unlike" : "Like post"}
          aria-pressed={liked}
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

        {/* Thread count or comment count */}
        {post.threadCount && post.threadCount > 0 ? (
          <Link
            href={`/feed/${post.id}`}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              textDecoration: "none",
              fontSize: 12,
              color: "var(--primary)",
              fontWeight: 500,
            }}
          >
            <MessageCircle size={20} color="var(--primary)" />
            {post.threadCount} replies
            <ChevronRight size={14} color="var(--primary)" style={{ marginLeft: -2 }} />
          </Link>
        ) : (
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
        )}

        <button
          aria-label="Share post"
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

        {(postType === "image" || postType === "build_share") && (
          <>
            <div style={{ flex: 1 }} />
            <Link
              href={`/upload?from=feed&postId=${post.id}`}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "var(--primary)",
                textDecoration: "none",
              }}
            >
              Try This Build
            </Link>
          </>
        )}
      </div>

      {/* Hashtag pills (image posts only) */}
      {(postType === "image" || postType === "build_share") && post.buildTags.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "2px 16px 14px",
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
      )}
    </div>
  );
}

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
        paddingBottom: 24,
        background: "var(--bg)",
        minHeight: "100vh",
        overflow: "auto",
        maxWidth: 620,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* Editorial header */}
      <div style={{ padding: "28px 16px 0" }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--primary)",
            marginBottom: 6,
          }}
        >
          Community
        </p>
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "var(--on-surface)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          Build Gallery
        </h1>
      </div>

      {/* Category pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "16px 16px 0",
          overflowX: "auto",
          scrollbarWidth: "none",
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
                feedCat === cat ? "var(--primary-alpha-15)" : "var(--surface-card)",
              color:
                feedCat === cat ? "var(--primary)" : "var(--on-surface-variant)",
              boxShadow:
                feedCat !== cat ? "inset 0 0 0 1px var(--ghost-border)" : "none",
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
          margin: "16px 16px 0",
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
              color: feedTab === tab ? "var(--on-surface)" : "var(--muted)",
              boxShadow: feedTab === tab ? "0 1px 3px rgba(0,0,0,.08)" : "none",
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
          gap: 12,
          padding: "16px 16px 0",
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

      {/* Upload FAB */}
      <Link
        href="/upload"
        style={{
          position: "fixed",
          bottom: 80,
          right: 20,
          zIndex: 50,
          width: 52,
          height: 52,
          borderRadius: 999,
          background: "var(--primary-gradient)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "var(--fab-shadow)",
          textDecoration: "none",
        }}
      >
        <Upload size={20} color="#fff" />
      </Link>
    </div>
  );
}
