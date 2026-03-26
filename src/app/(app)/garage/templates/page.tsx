"use client";

import { useRouter } from "next/navigation";

const TEMPLATES = [
  {
    id: "t1",
    icon: "📋",
    name: "Client Wrap Proposal",
    desc: "Upload client's car, generate 3-5 wrap color options, add pricing, share presentation link.",
    steps: ["Upload", "Colors", "Price", "Share"],
    href: "/create",
  },
  {
    id: "t2",
    icon: "📸",
    name: "Social Media Content Pack",
    desc: "Upload car, generate 5 preset scenes, auto-format for IG Story + Feed + TikTok.",
    steps: ["Upload", "Scenes", "Format", "Export"],
    href: "/create/customize?category=content",
  },
  {
    id: "t3",
    icon: "🎨",
    name: "Batch Color Swatches",
    desc: "Upload car, auto-generate in every color of a brand's lineup. Complete comparison sheet.",
    steps: ["Upload", "Brand", "Generate All", "Export"],
    href: "/create",
  },
  {
    id: "t4",
    icon: "🔄",
    name: "Before/After Portfolio",
    desc: "Upload stock photos and modified photos, generate professional comparison content.",
    steps: ["Before", "After", "Layout", "Export"],
    href: "/create",
  },
  {
    id: "t5",
    icon: "🛞",
    name: "Wheel Fitment Preview",
    desc: "Upload client's car, apply 5 different wheel options, generate comparison.",
    steps: ["Upload", "Wheels ×5", "Compare", "Share"],
    href: "/create/customize?category=modify&sub=wheels",
  },
  {
    id: "t6",
    icon: "🏪",
    name: "Shop Portfolio Builder",
    desc: "Generate a portfolio page of your best work for your shop profile.",
    steps: ["Select Builds", "Layout", "Publish"],
    href: "/marketplace/designers/wrapsbyalex",
  },
];

export default function TemplatesPage() {
  const router = useRouter();

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 40 }}>
      {/* Ambient glow */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(68,204,255,0.05) 0%, transparent 60%)",
      }} />

      {/* Header */}
      <div style={{ padding: "28px 20px 0", position: "relative", zIndex: 1 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, color: "#44CCFF",
          letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px",
        }}>
          Workflow Templates
        </p>
        <h1 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 900, fontSize: 26, color: "var(--color-text-primary)",
          letterSpacing: "-0.04em", margin: "0 0 6px", lineHeight: 1.15,
        }}>
          Ready-Made Workflows for Pros
        </h1>
        <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: "0 0 28px", lineHeight: 1.5 }}>
          Multi-step templates that save hours on client work.
        </p>
      </div>

      {/* Template grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        padding: "0 20px", position: "relative", zIndex: 1,
      }}>
        {TEMPLATES.map((t) => (
          <div
            key={t.id}
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 20, padding: "16px 14px 14px",
              display: "flex", flexDirection: "column", gap: 8,
            }}
          >
            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: "50%",
              background: "var(--color-surface-elevated)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 2,
            }}>
              {t.icon}
            </div>

            {/* Name */}
            <p style={{
              fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)",
              margin: 0, lineHeight: 1.3,
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            }}>
              {t.name}
            </p>

            {/* Description */}
            <p style={{
              fontSize: 12, color: "var(--color-text-secondary)",
              margin: 0, lineHeight: 1.5,
            }}>
              {t.desc}
            </p>

            {/* Steps */}
            <p style={{ fontSize: 11, color: "#44CCFF", margin: 0, fontWeight: 600, lineHeight: 1.6 }}>
              {t.steps.join(" → ")}
            </p>

            {/* CTA */}
            <button
              onClick={() => router.push(t.href)}
              style={{
                fontSize: 13, fontWeight: 700, color: "#44CCFF",
                background: "none", border: "none", cursor: "pointer",
                padding: 0, textAlign: "left", marginTop: 4,
              }}
            >
              Use Template →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
