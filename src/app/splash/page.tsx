"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Camera, Palette, Shield, MapPin } from "lucide-react";

const features = [
  { icon: Camera, label: "AI Detection" },
  { icon: Palette, label: "200+ Wraps" },
  { icon: Shield, label: "PPF & Tint" },
  { icon: MapPin, label: "Certified Shops" },
];

export default function SplashPage() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
        minHeight: "100dvh",
      }}
    >
      {/* Top nav */}
      <div className="sp-nav">
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "var(--on-surface)",
            letterSpacing: "-0.02em",
          }}
        >
          AVACAR
        </div>
        <button
          className="sp-cta"
          style={{ padding: "8px 20px", fontSize: 13, borderRadius: 10 }}
          onClick={() => router.push("/onboarding")}
        >
          Get Started
        </button>
      </div>

      {/* Background glow */}
      <div className="sp-glow" />

      {/* Main content */}
      <div
        className="splash-content"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 24px 0",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Pill badge */}
        <div className="sp-pill">
          <div className="sp-pill-dot" />
          AI-powered car customization
        </div>

        {/* Heading */}
        <h1 className="sp-h1">See your car customized before you commit</h1>

        {/* Subtitle */}
        <p className="sp-sub">
          Upload a photo, choose your mods, get real pricing from certified
          shops. From inspiration to installation.
        </p>

        {/* CTA buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            className="sp-cta"
            onClick={() => router.push("/onboarding")}
          >
            Get Started <ArrowRight size={16} />
          </button>
          <button className="sp-ghost" onClick={() => router.push("/feed")}>
            Browse builds <ArrowRight size={14} />
          </button>
        </div>

        {/* Preview card mockup */}
        <div
          style={{
            width: "100%",
            maxWidth: 360,
            marginTop: 40,
            position: "relative",
          }}
        >
          {/* Glow behind preview */}
          <div
            style={{
              position: "absolute",
              inset: -40,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, var(--primary-alpha-08) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Card */}
          <div
            style={{
              position: "relative",
              background: "var(--surface-card)",
              borderRadius: 16,
              padding: 16,
              boxShadow: "var(--sp-preview-shadow)",
            }}
          >
            {/* Mock top row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--primary)",
                }}
              />
              <div
                style={{
                  width: 60,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--surface-high)",
                }}
              />
              <div style={{ flex: 1 }} />
              <div
                style={{
                  width: 40,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--surface-high)",
                }}
              />
            </div>

            {/* Mock image area */}
            <div
              style={{
                height: 120,
                borderRadius: 10,
                background:
                  "linear-gradient(135deg, var(--ghost-border) 0%, var(--surface-low) 100%)",
                margin: "4px 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at 60% 50%, var(--primary-alpha-06) 0%, transparent 70%)",
                }}
              />
            </div>

            {/* Mock card row 1 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: "var(--surface-high)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    width: "70%",
                    height: 8,
                    borderRadius: 4,
                    background: "var(--surface-high)",
                  }}
                />
                <div
                  style={{
                    width: "50%",
                    height: 8,
                    borderRadius: 4,
                    background: "var(--surface-high)",
                  }}
                />
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--success)",
                }}
              />
            </div>

            {/* Mock card row 2 */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 0",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  background: "var(--surface-high)",
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <div
                  style={{
                    width: "60%",
                    height: 8,
                    borderRadius: 4,
                    background: "var(--surface-high)",
                  }}
                />
                <div
                  style={{
                    width: "40%",
                    height: 8,
                    borderRadius: 4,
                    background: "var(--surface-high)",
                  }}
                />
              </div>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  background: "var(--primary)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Feature badges row */}
      <div
        style={{
          padding: 24,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 24,
          position: "relative",
          zIndex: 1,
        }}
      >
        {features.map((f) => (
          <div key={f.label} className="sp-feature">
            <div className="sp-feature-icon">
              <f.icon size={14} style={{ color: "var(--primary)" }} />
            </div>
            {f.label}
          </div>
        ))}
      </div>
    </div>
  );
}
