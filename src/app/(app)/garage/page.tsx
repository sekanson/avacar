"use client";

import { useRouter } from "next/navigation";
import { Car, Plus, Wrench, Calendar, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_VEHICLES = [
  {
    id: "v1",
    year: 2022,
    make: "Toyota",
    model: "GR86",
    color: "White",
    builds: 1,
    lastModified: "2 weeks ago",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&fm=webp",
    accent: "#44CCFF",
  },
  {
    id: "v2",
    year: 2021,
    make: "BMW",
    model: "M3 Competition",
    color: "Brooklyn Grey",
    builds: 2,
    lastModified: "1 month ago",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
    accent: "#A78BFA",
  },
  {
    id: "v3",
    year: 2023,
    make: "Toyota",
    model: "Supra A90",
    color: "Phantom Matte Grey",
    builds: 0,
    lastModified: "Just added",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&fm=webp",
    accent: "#34D399",
  },
];

const MOCK_SAVED_BUILDS = [
  {
    id: "sb1",
    car: "2022 GR86",
    style: "Matte Black Wrap",
    price: "$1,400–$1,800",
    status: "Draft" as const,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&fm=webp",
    accent: "#44CCFF",
  },
  {
    id: "sb2",
    car: "2021 M3",
    style: "Carbon Kit + PPF",
    price: "$4,200–$5,600",
    status: "Quoted" as const,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&fm=webp",
    accent: "#A78BFA",
  },
  {
    id: "sb3",
    car: "2023 Supra",
    style: "Murdered Out Look",
    price: "$2,100–$2,800",
    status: "Draft" as const,
    image: "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=800&q=80&fm=webp",
    accent: "#34D399",
  },
  {
    id: "sb4",
    car: "2021 M3",
    style: "HRE P101 Wheels",
    price: "$3,200",
    status: "Booked" as const,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&fm=webp",
    accent: "#FBBF24",
  },
];

const STATUS_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  Draft:    { color: "var(--color-text-secondary)", bg: "var(--color-surface-elevated)", border: "transparent" },
  Quoted:   { color: "#44CCFF", bg: "rgba(68,204,255,0.12)", border: "rgba(68,204,255,0.3)" },
  Booked:   { color: "#34D399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)" },
  Installed:{ color: "#A78BFA", bg: "rgba(167,139,250,0.12)", border: "rgba(167,139,250,0.3)" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function GaragePage() {
  const router = useRouter();
  const hasVehicles = true;

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 96 }}>
      {/* TopBar */}
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
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
        }}
      >
        <h1 style={{
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          fontWeight: 900,
          fontSize: 22,
          color: "var(--color-text-primary)",
          letterSpacing: "-0.04em",
          margin: 0,
        }}>
          My Garage
        </h1>
        <button
          onClick={() => router.push("/create")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 36,
            padding: "0 16px",
            borderRadius: 999,
            background: "#44CCFF",
            color: "#0C0C10",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontSize: 13,
            fontWeight: 800,
            border: "none",
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(68,204,255,0.35)",
          }}
        >
          <Plus size={15} />
          Add Car
        </button>
      </div>

      {!hasVehicles ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 32px",
            gap: 16,
            textAlign: "center",
          }}
        >
          <div style={{
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(68,204,255,0.06)", border: "1px solid rgba(68,204,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Car size={36} color="var(--color-text-tertiary)" />
          </div>
          <div>
            <h2 style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800, fontSize: 22, color: "var(--color-text-primary)",
              letterSpacing: "-0.03em", margin: "0 0 6px",
            }}>
              No builds yet
            </h2>
            <p style={{ fontSize: 14, color: "#A0A0B0", margin: 0, lineHeight: 1.5 }}>
              {"Let's make your first one!"}
            </p>
          </div>
          <button
            onClick={() => router.push("/create")}
            style={{
              height: 52, padding: "0 32px", borderRadius: 12,
              background: "#44CCFF", color: "#0C0C10",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 15, fontWeight: 800, border: "none", cursor: "pointer",
              boxShadow: "0 0 28px rgba(68,204,255,0.40)", marginTop: 8,
            }}
          >
            Add a Vehicle
          </button>
        </motion.div>
      ) : (
        <div style={{ padding: "24px 20px 0" }}>

          {/* ── Vehicles Grid ── */}
          <h2 style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 700, fontSize: 10, color: "#44CCFF",
            letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 14px",
          }}>
            Vehicles
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: 14,
            marginBottom: 36,
          }}>
            {MOCK_VEHICLES.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                onClick={() => router.push("/garage")}
                style={{
                  background: "var(--color-surface)",
                  borderRadius: 18,
                  border: `1px solid ${v.accent}22`,
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
              >
                {/* Hero image */}
                <div style={{ width: "100%", aspectRatio: "16/10", position: "relative", overflow: "hidden" }}>
                  <img
                    src={v.image}
                    alt={`${v.year} ${v.make} ${v.model}`}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  {/* accent gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(to top, ${v.accent}33 0%, transparent 50%)`,
                  }} />
                </div>

                {/* Card body */}
                <div style={{ padding: "12px 14px" }}>
                  <p style={{
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontWeight: 800, fontSize: 14, color: "var(--color-text-primary)",
                    margin: "0 0 3px", letterSpacing: "-0.02em",
                  }}>
                    {v.year} {v.make} {v.model}
                  </p>
                  <p style={{ fontSize: 12, color: "#A0A0B0", margin: "0 0 10px" }}>{v.color}</p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Wrench size={12} color="var(--color-text-tertiary)" />
                      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>
                        {v.builds} build{v.builds !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={12} color="var(--color-text-tertiary)" />
                      <span style={{ fontSize: 11, color: "var(--color-text-tertiary)" }}>{v.lastModified}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Add car card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: MOCK_VEHICLES.length * 0.08, duration: 0.35 }}
              onClick={() => router.push("/create")}
              style={{
                background: "rgba(68,204,255,0.04)",
                borderRadius: 18,
                border: "1.5px dashed rgba(68,204,255,0.25)",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                minHeight: 160,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "rgba(68,204,255,0.1)", border: "1px solid rgba(68,204,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Plus size={20} color="#44CCFF" />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF" }}>Add a car</span>
            </motion.div>
          </div>

          {/* ── Saved Builds Grid ── */}
          <h2 style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            fontSize: 10, color: "#44CCFF", margin: "0 0 14px",
          }}>
            Saved Builds
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 12,
            marginBottom: 36,
          }}>
            {MOCK_SAVED_BUILDS.map((build, i) => {
              const statusStyle = STATUS_STYLE[build.status] || STATUS_STYLE.Draft;
              return (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.24 + i * 0.08, duration: 0.35 }}
                  onClick={() => router.push("/create")}
                  style={{
                    background: "var(--color-surface)",
                    borderRadius: 16,
                    border: "1px solid var(--color-border)",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  {/* Build image */}
                  <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", overflow: "hidden" }}>
                    <img
                      src={build.image}
                      alt={build.car}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {/* Accent top strip */}
                    <div style={{
                      position: "absolute", top: 0, left: 0, right: 0, height: 3,
                      background: build.accent,
                    }} />
                    {/* Status badge */}
                    <div style={{
                      position: "absolute", top: 10, right: 8,
                      fontSize: 10, fontWeight: 700,
                      color: statusStyle.color,
                      background: statusStyle.bg,
                      border: `1px solid ${statusStyle.border}`,
                      borderRadius: 999,
                      padding: "3px 8px",
                      backdropFilter: "blur(8px)",
                    }}>
                      {build.status}
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: "10px 12px 12px" }}>
                    <p style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 700, fontSize: 13, color: "var(--color-text-primary)",
                      margin: "0 0 3px", letterSpacing: "-0.02em",
                    }}>
                      {build.car}
                    </p>
                    <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>
                      {build.style}
                    </p>
                    <p style={{ fontSize: 12, fontWeight: 700, color: "#44CCFF", margin: 0 }}>
                      {build.price}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Design a new build prompt */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.35 }}
            style={{
              background: "var(--color-surface)",
              borderRadius: 16,
              border: "1px solid var(--color-border)",
              padding: 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 12,
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(68,204,255,0.08)", border: "1px solid rgba(68,204,255,0.18)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Sparkles size={24} color="#44CCFF" />
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                fontWeight: 800, fontSize: 16, color: "var(--color-text-primary)",
                margin: "0 0 6px", letterSpacing: "-0.02em",
              }}>
                Design a new build
              </p>
              <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
                Pick a look and see your car transformed in 30 seconds
              </p>
            </div>
            <button
              onClick={() => router.push("/create")}
              style={{
                height: 44, padding: "0 24px", borderRadius: 999,
                background: "#44CCFF", color: "#0C0C10",
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                fontSize: 14, fontWeight: 800, border: "none", cursor: "pointer",
                boxShadow: "0 0 20px rgba(68,204,255,0.35)",
              }}
            >
              Design My Car →
            </button>
          </motion.div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => router.push("/create")}
        style={{
          position: "fixed",
          bottom: 88,
          right: 20,
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: "#44CCFF",
          color: "#0C0C10",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(68,204,255,0.45)",
          zIndex: 50,
        }}
        aria-label="New Build"
      >
        <Plus size={22} strokeWidth={2.5} />
      </button>
    </div>
  );
}
