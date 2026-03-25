"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Sparkles } from "lucide-react";
import type { FeedPost } from "@/types";

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

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg, #005ab7, #0072e5)",
  "linear-gradient(135deg, #0057cc, #007FFF)",
  "linear-gradient(135deg, #007FFF, #0099ff)",
  "linear-gradient(135deg, #0066cc, #0089e0)",
  "linear-gradient(135deg, #003d8f, #005ab7)",
];

interface PostCardProps {
  post: FeedPost;
  liked: boolean;
  onLike: () => void;
}

export default function PostCard({ post, liked, onLike }: PostCardProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [captionExpanded, setCaptionExpanded] = useState(false);

  const postType = post.postType ?? "image";
  const hasImage = (postType === "image" || postType === "build_share") && !!post.imageUrl;
  const avatarGradient = AVATAR_GRADIENTS[post.user.username.charCodeAt(0) % AVATAR_GRADIENTS.length];
  const likeCount = post.likes + (liked && !post.isLiked ? 1 : 0);

  return (
    <div
      style={{
        background: "var(--surface-card)",
        borderRadius: "1.5rem",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Header — p-4 */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 16px 10px" }}>
        <div
          style={{
            width: 36, height: 36, borderRadius: "50%",
            background: avatarGradient,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0,
          }}
        >
          {post.user.username[0].toUpperCase()}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link
            href={`/profile/${post.user.username}`}
            style={{
              fontSize: 13, fontWeight: 700, color: "var(--on-surface)",
              textDecoration: "none", display: "block",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}
          >
            {post.user.username}
          </Link>
          {post.car ? (
            <span style={{ fontSize: 11, color: "var(--on-surface-variant)" }}>
              {post.car.year} {post.car.make} {post.car.model}
            </span>
          ) : (
            <span style={{ fontSize: 11, color: "var(--on-surface-variant)" }}>
              {timeAgo(post.createdAt)}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          {post.car && (
            <span style={{ fontSize: 11, color: "var(--on-surface-variant)", opacity: 0.6 }}>
              {timeAgo(post.createdAt)}
            </span>
          )}
          <button
            aria-label="More options"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: 4, color: "var(--on-surface-variant)",
              display: "flex", alignItems: "center",
            }}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* Image — full bleed, 4:3, no horizontal padding */}
      {hasImage && (
        <Link href={`/feed/${post.id}`} style={{ display: "block" }}>
          <div
            style={{
              position: "relative", width: "100%",
              aspectRatio: "4/3",
              overflow: "hidden",
            }}
          >
            <Image
              src={post.imageUrl!}
              alt={post.car ? `${post.car.year} ${post.car.make} ${post.car.model}` : post.caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 620px"
              unoptimized
            />
            {/* Bottom gradient overlay for tag chip readability */}
            <div
              style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                pointerEvents: "none",
              }}
            />
            {/* AI Render badge */}
            {post.isRender && (
              <div
                style={{
                  position: "absolute", top: 10, right: 10,
                  display: "flex", alignItems: "center", gap: 4,
                  padding: "4px 10px", borderRadius: 999,
                  fontSize: 10, fontWeight: 600,
                  background: "rgba(14,16,20,0.75)",
                  color: "#007FFF",
                  backdropFilter: "blur(8px)",
                }}
              >
                <Sparkles size={10} />
                AI Render
              </div>
            )}
            {/* Build tag chips — absolute overlay, bottom of image */}
            {post.buildTags.length > 0 && (
              <div
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  display: "flex", gap: 6, flexWrap: "wrap",
                  padding: "8px 12px 12px",
                }}
              >
                {post.buildTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 10, fontWeight: 700,
                      padding: "3px 10px", borderRadius: 999,
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      backdropFilter: "blur(6px)",
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #{tag.replace(/\s+/g, "")}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      )}

      {/* Parts chip row — horizontally scrollable with gradient fade masks */}
      {hasImage && post.buildSpecs && post.buildSpecs.length > 0 && (
        <div style={{ position: "relative", padding: "10px 0 2px" }}>
          {/* Left fade mask */}
          <div
            style={{
              position: "absolute", left: 0, top: 0, bottom: 0, width: 24,
              background: "linear-gradient(to right, var(--surface-card), transparent)",
              zIndex: 1, pointerEvents: "none",
            }}
          />
          {/* Right fade mask */}
          <div
            style={{
              position: "absolute", right: 0, top: 0, bottom: 0, width: 24,
              background: "linear-gradient(to left, var(--surface-card), transparent)",
              zIndex: 1, pointerEvents: "none",
            }}
          />
          <div
            style={{
              display: "flex", gap: 6,
              overflowX: "auto",
              scrollbarWidth: "none",
              padding: "0 12px",
            }}
          >
            {post.buildSpecs.map((spec) => (
              <span
                key={spec}
                style={{
                  flexShrink: 0,
                  fontSize: 11, fontWeight: 600,
                  padding: "5px 12px", borderRadius: 999,
                  background: "var(--surface-low)",
                  color: "var(--on-surface-variant)",
                  whiteSpace: "nowrap",
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Engagement row — ❤ 💬 🔖 | Try On My Car */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px" }}>
        {/* Like */}
        <button
          onClick={onLike}
          aria-label={liked ? "Unlike" : "Like"}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <Heart
            size={20}
            fill={liked ? "#ef4444" : "none"}
            color={liked ? "#ef4444" : "var(--on-surface-variant)"}
          />
          <span style={{ fontSize: 13, color: "var(--on-surface-variant)", fontWeight: 500 }}>
            {formatCount(likeCount)}
          </span>
        </button>

        {/* Comments */}
        <Link
          href={`/feed/${post.id}`}
          style={{ display: "flex", alignItems: "center", gap: 5, textDecoration: "none" }}
        >
          <MessageCircle size={20} color="var(--on-surface-variant)" />
          <span style={{ fontSize: 13, color: "var(--on-surface-variant)", fontWeight: 500 }}>
            {formatCount(post.comments)}
          </span>
        </Link>

        {/* Bookmark */}
        <button
          onClick={() => setBookmarked((b) => !b)}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
          style={{
            display: "flex", alignItems: "center",
            background: "none", border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <Bookmark
            size={20}
            fill={bookmarked ? "#007FFF" : "none"}
            color={bookmarked ? "#007FFF" : "var(--on-surface-variant)"}
          />
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Try On My Car — always visible on image posts, #007FFF always */}
        {hasImage && (
          <Link
            href={`/upload?from=feed&postId=${post.id}`}
            className="try-on-btn"
            style={{
              display: "inline-flex", alignItems: "center", gap: 5,
              padding: "7px 14px", borderRadius: 999,
              background: "#007FFF", color: "#fff",
              fontSize: 12, fontWeight: 600,
              textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            🔮 Try On My Car
          </Link>
        )}
      </div>

      {/* Caption — 2 lines truncated with expand */}
      <div style={{ padding: "2px 14px 14px" }}>
        <p
          style={{
            fontSize: 13, lineHeight: 1.6,
            color: "var(--on-surface)", margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: captionExpanded ? undefined : 2,
            WebkitBoxOrient: "vertical",
            overflow: captionExpanded ? "visible" : "hidden",
          } as React.CSSProperties}
        >
          {post.caption}
        </p>
        {!captionExpanded && post.caption.length > 90 && (
          <button
            onClick={() => setCaptionExpanded(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 12, color: "var(--on-surface-variant)", padding: 0, marginTop: 2,
            }}
          >
            ...more
          </button>
        )}
      </div>
    </div>
  );
}
