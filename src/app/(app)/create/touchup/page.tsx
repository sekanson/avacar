"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, HelpCircle } from "lucide-react";

const FEATURES = [
  { icon: "🎯", title: "Region-based editing", desc: "Paint the area, pick the change" },
  { icon: "🛞", title: "Swap individual parts", desc: "Wheels, hood, bumper, spoiler" },
  { icon: "🎨", title: "Material changes", desc: "Carbon fiber, chrome, matte finishes" },
];

export default function TouchUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <div style={{
      background: "var(--color-bg)",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        background: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <button
          onClick={() => router.back()}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--color-text-secondary)", fontSize: 14 }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <span style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 800,
          fontSize: 14,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--color-text-primary)",
        }}>
          Touch Up
        </span>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)" }}>
          <HelpCircle size={20} />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px 32px" }}>
        {/* Illustration */}
        <div style={{
          width: 120,
          height: 120,
          borderRadius: "50%",
          background: "var(--color-surface-elevated)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
        }}>
          <span style={{ fontSize: 80, opacity: 0.3, filter: "drop-shadow(0 0 12px #44CCFF)" }}>🖌️</span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 900,
          fontSize: 28,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.03em",
          margin: "0 0 12px",
          textAlign: "center",
        }}>
          Touch Up — Coming Soon
        </h1>
        <p style={{
          fontSize: 15,
          color: "var(--color-text-secondary)",
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: 320,
          margin: "0 0 40px",
        }}>
          Paint over any area of your build to make targeted edits.
          Swap just the wheels. Change just the hood. Add carbon fiber to the roof.
        </p>

        {/* Feature cards */}
        <div style={{ width: "100%", maxWidth: 400, display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "1rem",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <span style={{ fontSize: 24 }}>{f.icon}</span>
              <div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px" }}>{f.title}</p>
                <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify CTA */}
        <div style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--color-surface)",
          border: "1px solid rgba(68,204,255,0.2)",
          borderRadius: "1.5rem",
          padding: "20px 20px",
          marginBottom: 20,
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
          onClick={() => router.push("/create")}
          style={{ fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer" }}
        >
          ← Back to Studio
        </button>
      </div>
    </div>
  );
}
