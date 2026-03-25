"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function EditProfilePage() {
  const router = useRouter();
  const { showToast } = useAppStore();

  const [displayName, setDisplayName] = useState("Alex Rivera");
  const [username, setUsername] = useState("@alexbuilds");
  const [bio, setBio] = useState("Car enthusiast. Wrap lover. Always building.");

  const handleSave = () => {
    if (!displayName.trim()) {
      showToast("Display name is required");
      return;
    }
    showToast("Profile saved!");
    router.back();
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
          gap: 12,
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
          Edit Profile
        </span>
      </div>

      <div style={{ padding: "28px 20px 40px" }}>
        {/* Avatar */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <div style={{ position: "relative" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "var(--primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 700,
                color: "var(--on-primary)",
              }}
            >
              A
            </div>
            <button
              style={{
                position: "absolute",
                bottom: 0,
                right: -4,
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: "var(--surface-card)",
                border: "1px solid var(--ghost-border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
              aria-label="Change avatar"
            >
              <Camera size={14} color="var(--primary)" />
            </button>
          </div>
        </div>

        {/* Display Name */}
        <div style={{ marginBottom: 18 }}>
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
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your name"
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

        {/* Username */}
        <div style={{ marginBottom: 18 }}>
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
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@username"
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

        {/* Bio */}
        <div style={{ marginBottom: 32 }}>
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
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell us about yourself..."
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

        {/* Save button */}
        <button
          onClick={handleSave}
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
          Save Changes
        </button>
      </div>
    </div>
  );
}
