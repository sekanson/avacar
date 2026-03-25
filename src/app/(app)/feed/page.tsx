"use client";

import { useRouter } from "next/navigation";
import { Bell, ChevronRight, MapPin, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const TRENDING_BUILDS = [
  {
    id: "1",
    car: "2023 Supra",
    style: "Matte Black Wrap",
    priceRange: "$1,200–$1,800",
    gradient: "linear-gradient(135deg, #0a0a12 0%, #1a1a2e 50%, #16213e 100%)",
    accent: "#44CCFF",
  },
  {
    id: "2",
    car: "2022 GT500",
    style: "Carbon Fiber Kit",
    priceRange: "$2,400–$3,600",
    gradient: "linear-gradient(135deg, #0d0d0d 0%, #1a0a0a 50%, #2d1515 100%)",
    accent: "#F87171",
  },
  {
    id: "3",
    car: "2021 M3",
    style: "Chrome Delete",
    priceRange: "$800–$1,200",
    gradient: "linear-gradient(135deg, #070712 0%, #0e1121 50%, #131726 100%)",
    accent: "#34D399",
  },
  {
    id: "4",
    car: "2022 Civic Type R",
    style: "Track Day Build",
    priceRange: "$1,600–$2,400",
    gradient: "linear-gradient(135deg, #0a0c0a 0%, #0c1a0c 50%, #0f2010 100%)",
    accent: "#FBBF24",
  },
  {
    id: "5",
    car: "2023 RS7",
    style: "Clean Luxury PPF",
    priceRange: "$3,200–$4,800",
    gradient: "linear-gradient(135deg, #0a080e 0%, #140e1e 50%, #1a1228 100%)",
    accent: "#A78BFA",
  },
];

const BUILD_STYLES = [
  {
    id: "street",
    title: "Street Stealth",
    tag: "Matte · Dark",
    gradient: "linear-gradient(135deg, #0a0a12, #1a1a2e)",
    border: "rgba(68,204,255,0.2)",
  },
  {
    id: "chrome",
    title: "Chrome Royale",
    tag: "Metallic · Mirror",
    gradient: "linear-gradient(135deg, #1a1a1a, #2e2e2e)",
    border: "rgba(255,255,255,0.15)",
  },
  {
    id: "track",
    title: "Track Day",
    tag: "Aggressive · Racing",
    gradient: "linear-gradient(135deg, #1a0505, #2d0a0a)",
    border: "rgba(248,113,113,0.25)",
  },
  {
    id: "luxury",
    title: "Clean Luxury",
    tag: "Subtle · Premium",
    gradient: "linear-gradient(135deg, #080a12, #10141e)",
    border: "rgba(167,139,250,0.2)",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeedPage() {
  const router = useRouter();

  return (
    <div
      style={{
        background: "#0C0C10",
        minHeight: "100vh",
        paddingBottom: 24,
      }}
    >
      {/* ── TopBar ─────────────────────────────────────────────────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "rgba(12,12,16,0.80)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 22,
            letterSpacing: "-0.04em",
            color: "#FFFFFF",
          }}
        >
          <span style={{ color: "#44CCFF" }}>A</span>VACAR
        </span>
        <button
          aria-label="Notifications"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "#14141A",
            border: "1px solid #2A2A36",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => router.push("/notifications")}
        >
          <Bell size={18} color="#A0A0B0" />
          {/* unread dot */}
          <span
            style={{
              position: "absolute",
              top: 9,
              right: 9,
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#44CCFF",
              border: "2px solid #0C0C10",
            }}
          />
        </button>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: "linear-gradient(180deg, #14141A 0%, #0C0C10 100%)",
          borderRadius: "0 0 2rem 2rem",
          padding: "36px 24px 40px",
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(68,204,255,0.08)",
            border: "1px solid rgba(68,204,255,0.2)",
            borderRadius: 999,
            padding: "4px 12px",
            marginBottom: 16,
          }}
        >
          <Flame size={12} color="#44CCFF" />
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#44CCFF",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Sprint 1
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: "clamp(28px, 8vw, 40px)",
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            margin: "0 0 12px",
          }}
        >
          Design Your
          <br />
          <span style={{ color: "#44CCFF" }}>Dream Ride</span>
        </h1>

        <p
          style={{
            fontSize: 15,
            color: "#A0A0B0",
            margin: "0 0 28px",
            lineHeight: 1.6,
            maxWidth: 300,
          }}
        >
          Upload your car, customize it, and book installation.
        </p>

        <button
          onClick={() => router.push("/create")}
          style={{
            height: 52,
            padding: "0 32px",
            borderRadius: 12,
            background: "#44CCFF",
            color: "#0C0C10",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontSize: 15,
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 0 32px rgba(68,204,255,0.40)",
            letterSpacing: "-0.01em",
          }}
        >
          Start Building
          <ChevronRight size={18} />
        </button>
      </motion.div>

      {/* ── Trending Builds ────────────────────────────────────────────────── */}
      <section style={{ marginBottom: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800,
              fontSize: 20,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            Trending Builds 🔥
          </h2>
          <button
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#44CCFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            See All
          </button>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            overflowX: "auto",
            padding: "4px 20px 8px",
            scrollbarWidth: "none",
          }}
        >
          {TRENDING_BUILDS.map((build, i) => (
            <motion.div
              key={build.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                flexShrink: 0,
                width: 200,
                height: 260,
                borderRadius: 16,
                background: "#14141A",
                border: "1px solid #2A2A36",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
              }}
              onClick={() => router.push("/create")}
            >
              {/* Gradient image area */}
              <div
                style={{
                  flex: 1,
                  background: build.gradient,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Glowing accent orb */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    background: build.accent,
                    opacity: 0.18,
                    filter: "blur(20px)",
                    position: "absolute",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: build.accent,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    position: "relative",
                    zIndex: 1,
                    padding: "4px 10px",
                    background: `${build.accent}18`,
                    border: `1px solid ${build.accent}30`,
                    borderRadius: 999,
                  }}
                >
                  #{i + 1} Trending
                </span>
              </div>

              {/* Card details */}
              <div style={{ padding: "12px 14px 14px" }}>
                <p
                  style={{
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontWeight: 800,
                    fontSize: 14,
                    color: "#FFFFFF",
                    margin: "0 0 2px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {build.car}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#A0A0B0",
                    margin: "0 0 8px",
                  }}
                >
                  {build.style}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: build.accent,
                    }}
                  >
                    {build.priceRange}
                  </span>
                  <button
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#0C0C10",
                      background: build.accent,
                      border: "none",
                      borderRadius: 999,
                      padding: "4px 10px",
                      cursor: "pointer",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Try This
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Build Styles ───────────────────────────────────────────────────── */}
      <section style={{ padding: "0 20px", marginBottom: 32 }}>
        <h2
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 800,
            fontSize: 20,
            color: "#FFFFFF",
            letterSpacing: "-0.03em",
            margin: "0 0 16px",
          }}
        >
          Build Styles
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {BUILD_STYLES.map((style, i) => (
            <motion.button
              key={style.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.35 }}
              onClick={() => router.push("/create")}
              style={{
                height: 160,
                borderRadius: 16,
                background: style.gradient,
                border: `1px solid ${style.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-end",
                padding: "14px 16px",
                cursor: "pointer",
                textAlign: "left",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Subtle glow top-right */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: style.border,
                  filter: "blur(18px)",
                }}
              />
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#6B6B7B",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                  position: "relative",
                }}
              >
                {style.tag}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#FFFFFF",
                  letterSpacing: "-0.03em",
                  position: "relative",
                }}
              >
                {style.title}
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── Find a Shop CTA ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        style={{ padding: "0 20px" }}
      >
        <div
          style={{
            background: "#1C1C24",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #2A2A36",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Glow behind */}
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -20,
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: "rgba(68,204,255,0.12)",
              filter: "blur(30px)",
            }}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 8,
            }}
          >
            <MapPin size={16} color="#44CCFF" />
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#44CCFF",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Near You
            </span>
          </div>

          <h3
            style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800,
              fontSize: 20,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              margin: "0 0 6px",
            }}
          >
            Ready to make it real?
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "#A0A0B0",
              margin: "0 0 20px",
              lineHeight: 1.5,
            }}
          >
            Connect with certified installers near you.
          </p>

          <button
            onClick={() => router.push("/create")}
            style={{
              height: 46,
              padding: "0 24px",
              borderRadius: 12,
              background: "rgba(68,204,255,0.12)",
              color: "#44CCFF",
              border: "1px solid rgba(68,204,255,0.25)",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              position: "relative",
            }}
          >
            Find Shops Near Me
            <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
