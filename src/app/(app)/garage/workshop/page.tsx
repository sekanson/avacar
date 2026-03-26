"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const WORKFLOW_TEMPLATES = [
  {
    icon: "📋",
    title: "Client Wrap Proposal",
    desc: "Upload car → 3 color options → pricing → share",
  },
  {
    icon: "📸",
    title: "Social Media Pack",
    desc: "Upload car → 5 scenes → export Instagram-ready",
  },
  {
    icon: "🔄",
    title: "Before/After Portfolio",
    desc: "Stock + modified → comparison content",
  },
];

export default function WorkshopPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "32px 20px" }}>
      <p style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#44CCFF",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        margin: "0 0 16px",
      }}>
        My Workshop
      </p>

      <h1 style={{
        fontFamily: "var(--font-manrope, Manrope, sans-serif)",
        fontWeight: 900,
        fontSize: 26,
        color: "var(--color-text-primary)",
        letterSpacing: "-0.03em",
        margin: "0 0 12px",
        lineHeight: 1.2,
      }}>
        Collaborative Workspaces — Coming Soon
      </h1>

      <p style={{
        fontSize: 15,
        color: "var(--color-text-secondary)",
        lineHeight: 1.6,
        margin: "0 0 36px",
        maxWidth: 360,
      }}>
        Create multi-variation builds for clients. Compare side-by-side.
        Share presentation links. Convert builds to shop orders.
      </p>

      {/* Workflow template cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
        {WORKFLOW_TEMPLATES.map((t) => (
          <div
            key={t.title}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "1.5rem",
              padding: "20px",
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
            }}
          >
            <span style={{ fontSize: 28 }}>{t.icon}</span>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>{t.title}</p>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.4 }}>{t.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Notify CTA */}
      <div style={{
        background: "var(--color-surface)",
        border: "1px solid rgba(68,204,255,0.2)",
        borderRadius: "1.5rem",
        padding: "20px",
        marginBottom: 24,
      }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 12px", textAlign: "center" }}>
          Notify Me When Ready
        </p>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              height: 44,
              borderRadius: 12,
              border: "1px solid var(--color-border)",
              background: "var(--color-bg)",
              color: "var(--color-text-primary)",
              padding: "0 14px",
              fontSize: 14,
              outline: "none",
            }}
          />
          <button
            style={{
              height: 44,
              padding: "0 18px",
              borderRadius: 12,
              background: "rgba(68,204,255,0.12)",
              color: "#44CCFF",
              border: "1px solid rgba(68,204,255,0.25)",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Notify Me
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push("/garage")}
        style={{ fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer" }}
      >
        ← Back to Garage
      </button>
    </div>
  );
}
