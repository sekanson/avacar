"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  Sparkles,
  Store,
  DollarSign,
  Send,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getFeedPostById } from "@/data/feedPosts";
import { useAppStore } from "@/store/appStore";
import type { PollOption } from "@/types";

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}

function timeUntil(dateStr: string): string {
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff <= 0) return "Poll ended";
  const hrs = Math.floor(diff / 3600000);
  if (hrs < 24) return `${hrs}h left`;
  return `${Math.floor(hrs / 24)}d left`;
}

function PollView({ options, endsAt }: { options: PollOption[]; endsAt: string }) {
  const total = options.reduce((s, o) => s + o.votes, 0);
  const maxVotes = Math.max(...options.map((o) => o.votes));
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {options.map((opt) => {
          const pct = total > 0 ? Math.round((opt.votes / total) * 100) : 0;
          const isLeading = opt.votes === maxVotes;
          return (
            <div key={opt.id}>
              <div
                style={{
                  position: "relative",
                  borderRadius: 10,
                  overflow: "hidden",
                  height: 44,
                  background: "var(--surface-low)",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: `${pct}%`,
                    background: isLeading ? "var(--primary-alpha-15)" : "var(--surface-low)",
                    borderRadius: 10,
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
                    padding: "0 14px",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: isLeading ? 600 : 400,
                      color: isLeading ? "var(--primary)" : "var(--on-surface-variant)",
                    }}
                  >
                    {opt.text}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
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
      <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10 }}>
        {total.toLocaleString()} votes · {timeUntil(endsAt)}
      </p>
    </div>
  );
}

export default function PostDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [commentText, setCommentText] = useState("");
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<import("@/types").FeedComment[]>([]);
  const [initialized, setInitialized] = useState(false);

  const showToast = useAppStore((s) => s.showToast);

  const post = getFeedPostById(params.id as string);

  if (post && !initialized) {
    setComments(post.commentsList);
    setInitialized(true);
  }

  if (!post) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>Post not found</p>
          <button
            onClick={() => router.push("/feed")}
            style={{
              marginTop: 16,
              padding: "10px 24px",
              borderRadius: 999,
              background: "var(--primary)",
              color: "var(--on-primary)",
              fontSize: 14,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  const isLiked = liked || post.isLiked;
  const postType = post.postType ?? "image";
  const isTextType = postType === "text" || postType === "question" || postType === "poll";

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", paddingBottom: 80 }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--topbar-shadow)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "var(--surface-low)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} color="var(--on-surface)" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>
          {isTextType ? "Post" : "Build Post"}
        </span>
        <button
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "var(--surface-low)",
            cursor: "pointer",
          }}
        >
          <Share2 size={18} color="var(--muted)" />
        </button>
      </div>

      {/* Reply-to banner */}
      {post.replyTo && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 20px",
            background: "var(--surface-low)",
            fontSize: 12,
            color: "var(--muted)",
            borderBottom: "1px solid var(--ghost-border)",
          }}
        >
          <ChevronRight size={12} />
          Replying to{" "}
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>
            @{post.replyTo.username}
          </span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", marginLeft: 4 }}>
            &ldquo;{post.replyTo.preview}&rdquo;
          </span>
        </div>
      )}

      {/* Image (image posts only) */}
      {!isTextType && post.imageUrl && (
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1" }}>
          <Image
            src={post.imageUrl}
            alt={post.car ? `${post.car.year} ${post.car.make} ${post.car.model}` : post.caption}
            fill
            className="object-cover"
            sizes="100vw"
            priority
            unoptimized
          />
          {post.isRender && (
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 11,
                fontWeight: 600,
                background: "var(--overlay-card)",
                color: "var(--primary)",
                backdropFilter: "blur(8px)",
              }}
            >
              <Sparkles size={11} />
              AI Render
            </div>
          )}
        </div>
      )}

      <div style={{ padding: "16px 20px 0" }}>
        {/* User info */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: "var(--surface-low)",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 16,
              flexShrink: 0,
            }}
          >
            {post.user.username[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Link
                href={`/profile/${post.user.username}`}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "var(--on-surface)",
                  textDecoration: "none",
                }}
              >
                {post.user.username}
              </Link>
              {postType === "question" && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    padding: "2px 7px",
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
            </div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              {post.car
                ? `${post.car.year} ${post.car.make} ${post.car.model} · ${timeAgo(post.createdAt)}`
                : timeAgo(post.createdAt)}
            </span>
          </div>
          <button
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "7px 18px",
              borderRadius: 999,
              background: "var(--primary-alpha-10)",
              color: "var(--primary)",
              border: "none",
              boxShadow: "0 0 0 1px var(--primary-alpha-20)",
              cursor: "pointer",
            }}
          >
            Follow
          </button>
        </div>

        {/* Caption */}
        {post.caption && (
          <p
            style={{
              fontSize: isTextType ? 17 : 14,
              color: "var(--on-surface)",
              lineHeight: 1.65,
              marginBottom: 16,
              fontWeight: isTextType ? 400 : 400,
            }}
          >
            {post.caption}
          </p>
        )}

        {/* Poll view */}
        {postType === "poll" && post.poll && (
          <PollView options={post.poll.options} endsAt={post.poll.endsAt} />
        )}

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 16,
            paddingBottom: 16,
            borderBottom: "1px solid var(--ghost-border)",
          }}
        >
          <button
            onClick={() => setLiked(!liked)}
            aria-label={isLiked ? "Unlike" : "Like post"}
            aria-pressed={isLiked}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <Heart
              size={22}
              fill={isLiked ? "#dc2626" : "none"}
              color={isLiked ? "#dc2626" : "var(--muted)"}
            />
            <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>
              {(post.likes + (liked && !post.isLiked ? 1 : 0)).toLocaleString()}
            </span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <MessageCircle size={22} color="var(--muted)" />
            <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>
              {comments.length}
            </span>
          </div>
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
            <Share2 size={22} color="var(--muted)" />
          </button>
        </div>

        {/* Build Specs (image posts only) */}
        {!isTextType && post.buildSpecs.length > 0 && (
          <>
            <h3
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--on-surface)",
                marginBottom: 12,
              }}
            >
              Build Specs
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
              {post.buildSpecs.map((spec) => (
                <div
                  key={spec}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: 12,
                    borderRadius: 10,
                    background: "var(--surface-low)",
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 13, color: "var(--on-surface)" }}>
                    {spec}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Shop tag */}
        {post.shopName && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 12,
              borderRadius: 10,
              background: "var(--surface-low)",
              marginBottom: 16,
            }}
          >
            <Store size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>
                Installed by
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>
                {post.shopName}
              </span>
            </div>
          </div>
        )}

        {/* Cost breakdown */}
        {post.sharedCost && post.totalCost && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 12,
              borderRadius: 10,
              background: "var(--success-alpha-08)",
              marginBottom: 16,
            }}
          >
            <DollarSign size={16} color="var(--success)" style={{ flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 12, color: "var(--muted)", display: "block" }}>
                Total Build Cost
              </span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>
                ${post.totalCost.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Thread / Comments */}
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--on-surface)",
            marginBottom: 16,
          }}
        >
          {post.threadCount && post.threadCount > 0
            ? `${post.threadCount} Replies`
            : `${comments.length} Comments`}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 16 }}>
          {comments.map((comment, idx) => (
            <div
              key={comment.id}
              style={{
                display: "flex",
                gap: 10,
                paddingLeft: 0,
                paddingTop: idx === 0 ? 0 : 12,
                paddingBottom: 12,
                borderBottom:
                  idx < comments.length - 1
                    ? "1px solid var(--ghost-border)"
                    : "none",
              }}
            >
              {/* Thread line indicator for replies */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    background: "var(--surface-low)",
                    color: "var(--primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  {comment.user.username[0].toUpperCase()}
                </div>
                {idx < comments.length - 1 && (
                  <div
                    style={{
                      width: 2,
                      flex: 1,
                      marginTop: 4,
                      background: "var(--primary-alpha-12)",
                      borderRadius: 1,
                      minHeight: 16,
                    }}
                  />
                )}
              </div>
              <div style={{ flex: 1, paddingLeft: 4 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--on-surface)",
                    }}
                  >
                    {comment.user.username}
                  </span>
                  <span style={{ fontSize: 10, color: "var(--outline)" }}>
                    {timeAgo(comment.createdAt)}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 14,
                    color: "var(--on-surface-variant)",
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  {comment.text}
                </p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p
              style={{
                fontSize: 13,
                color: "var(--muted)",
                textAlign: "center",
                padding: "12px 0",
              }}
            >
              No replies yet. Be the first!
            </p>
          )}
        </div>

        {/* Try This Build CTA (image posts only) */}
        {!isTextType && (
          <Link href={`/upload?from=feed&postId=${post.id}`} style={{ display: "block", marginBottom: 24 }}>
            <button
              style={{
                width: "100%",
                padding: "14px 0",
                borderRadius: 14,
                background: "var(--primary)",
                color: "var(--on-primary)",
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: "pointer",
              }}
            >
              Try This Build on My Car
            </button>
          </Link>
        )}
      </div>

      {/* Comment/reply input */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          background: "var(--tabbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          zIndex: 30,
        }}
      >
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add to the conversation..."
          style={{
            flex: 1,
            fontSize: 13,
            color: "var(--on-surface)",
            background: "var(--input-bg)",
            borderRadius: 999,
            padding: "10px 16px",
            border: "none",
            outline: "none",
          }}
        />
        <button
          disabled={!commentText.trim()}
          aria-label="Send reply"
          onClick={() => {
            if (!commentText.trim()) return;
            const newComment = {
              id: Date.now().toString(),
              user: { id: "me", username: "you", avatar: "" },
              text: commentText,
              createdAt: new Date().toISOString(),
            };
            setComments((prev) => [...prev, newComment]);
            setCommentText("");
            showToast("Reply posted!");
          }}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: commentText.trim() ? "pointer" : "default",
            background: commentText.trim() ? "var(--primary)" : "var(--primary-alpha-15)",
          }}
        >
          <Send
            size={16}
            color={commentText.trim() ? "var(--on-primary)" : "var(--primary)"}
          />
        </button>
      </div>
    </div>
  );
}
