"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, X, ToggleLeft, ToggleRight } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const tagSuggestions = [
  "Wrap",
  "Wheels",
  "Tint",
  "PPF",
  "Widebody",
  "Chrome Delete",
  "Ceramic Coating",
  "Carbon Fiber",
];

export default function CreatePostPage() {
  const router = useRouter();
  const { showToast } = useAppStore();

  const [caption, setCaption] = useState("");
  const [buildTags, setBuildTags] = useState("");
  const [shopTag, setShopTag] = useState("");
  const [shareCost, setShareCost] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handlePost = () => {
    if (!caption.trim()) {
      showToast("Add a caption to your build");
      return;
    }
    showToast("Build posted!");
    router.push("/feed");
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
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
          Post Your Build
        </span>
        <button
          onClick={handlePost}
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "7px 18px",
            borderRadius: 999,
            border: "none",
            cursor: "pointer",
            background: caption.trim() ? "var(--primary)" : "var(--primary-alpha-15)",
            color: caption.trim() ? "var(--on-primary)" : "var(--primary)",
          }}
        >
          Post
        </button>
      </div>

      <div style={{ padding: "20px 20px 40px" }}>
        {/* Photo upload area */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 8,
              display: "block",
            }}
          >
            Build Photo
          </label>
          {hasPhoto ? (
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "16/10",
                borderRadius: 14,
                background: "var(--surface-low)",
                border: "1px solid var(--ghost-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <Camera
                  size={32}
                  color="var(--primary)"
                  style={{ marginBottom: 8 }}
                />
                <p style={{ fontSize: 13, color: "var(--muted)" }}>
                  Photo selected
                </p>
              </div>
              <button
                onClick={() => setHasPhoto(false)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "var(--surface-card)",
                  border: "1px solid var(--ghost-border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <X size={14} color="var(--muted)" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setHasPhoto(true)}
              style={{
                width: "100%",
                borderRadius: 14,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 0",
                background: "var(--surface-low)",
                border: "2px dashed var(--primary-alpha-20)",
                cursor: "pointer",
              }}
            >
              <Camera size={36} color="var(--outline)" style={{ marginBottom: 8 }} />
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                Tap to upload a photo
              </span>
              <span style={{ fontSize: 11, color: "var(--outline)", marginTop: 4 }}>
                JPG, PNG - Max 10MB
              </span>
            </button>
          )}
        </div>

        {/* Caption */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 8,
              display: "block",
            }}
          >
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Tell us about your build..."
            rows={3}
            style={{
              width: "100%",
              fontSize: 14,
              color: "var(--on-surface)",
              background: "var(--input-bg)",
              borderRadius: 12,
              padding: "12px 16px",
              border: "1px solid var(--ghost-border)",
              outline: "none",
              resize: "none",
              fontFamily: "inherit",
            }}
          />
        </div>

        {/* Tag selection */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 8,
              display: "block",
            }}
          >
            Build Tags
          </label>
          <div
            style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}
          >
            {tagSuggestions.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={{
                    padding: "7px 14px",
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    background: active
                      ? "var(--primary-alpha-15)"
                      : "var(--surface-card)",
                    color: active ? "var(--primary)" : "var(--on-surface-variant)",
                    boxShadow: !active
                      ? "inset 0 0 0 1px var(--ghost-border)"
                      : "none",
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={buildTags}
            onChange={(e) => setBuildTags(e.target.value)}
            placeholder="Or type custom tags, separated by commas"
            style={{
              width: "100%",
              fontSize: 14,
              color: "var(--on-surface)",
              background: "var(--input-bg)",
              borderRadius: 12,
              padding: "11px 16px",
              border: "1px solid var(--ghost-border)",
              outline: "none",
            }}
          />
        </div>

        {/* Shop tag */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 8,
              display: "block",
            }}
          >
            Shop
          </label>
          <input
            type="text"
            value={shopTag}
            onChange={(e) => setShopTag(e.target.value)}
            placeholder="e.g. Elite Wraps LA"
            style={{
              width: "100%",
              fontSize: 14,
              color: "var(--on-surface)",
              background: "var(--input-bg)",
              borderRadius: 12,
              padding: "11px 16px",
              border: "1px solid var(--ghost-border)",
              outline: "none",
            }}
          />
        </div>

        {/* Share cost toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderRadius: 12,
            background: "var(--surface-card)",
            border: "1px solid var(--ghost-border)",
            marginBottom: 32,
          }}
        >
          <div>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "var(--on-surface)",
                display: "block",
              }}
            >
              Share Build Cost
            </span>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>
              Let others see how much this build cost
            </span>
          </div>
          <button
            onClick={() => setShareCost(!shareCost)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            {shareCost ? (
              <ToggleRight size={32} color="var(--primary)" />
            ) : (
              <ToggleLeft size={32} color="var(--outline)" />
            )}
          </button>
        </div>

        {/* Post button */}
        <button
          onClick={handlePost}
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
          Post Build
        </button>
      </div>
    </div>
  );
}
