"use client";

import { useRouter } from "next/navigation";
import { Car, Plus, ChevronRight, Calendar, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

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
    gradient: "linear-gradient(135deg, #0a0a12, #14141A)",
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
    gradient: "linear-gradient(135deg, #0a080e, #18102a)",
    accent: "#A78BFA",
  },
];

const MOCK_SAVED_BUILDS = [
  {
    id: "sb1",
    car: "2022 GR86",
    style: "Matte Black Wrap",
    price: "$1,400–$1,800",
    status: "Draft",
    gradient: "linear-gradient(135deg, #0a0a12, #1a1a2e)",
    accent: "#44CCFF",
  },
  {
    id: "sb2",
    car: "2021 M3",
    style: "Carbon Kit + PPF",
    price: "$4,200–$5,600",
    status: "Quoted",
    gradient: "linear-gradient(135deg, #0a080e, #180d24)",
    accent: "#A78BFA",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function GaragePage() {
  const router = useRouter();
  // Sprint 1: show mock vehicles. Sprint 2: pull from Supabase.
  const hasVehicles = true;

  return (
    <div style={{ background: "#0C0C10", minHeight: "100vh", paddingBottom: 24 }}>
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
        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 22,
            color: "#FFFFFF",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          My Garage
        </h1>
        <button
          onClick={() => router.push("/create")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            height: 36,
            padding: "0 14px",
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
          Add
        </button>
      </div>

      {!hasVehicles ? (
        /* Empty state */
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
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(68,204,255,0.06)",
              border: "1px solid rgba(68,204,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Car size={36} color="#6B6B7B" />
          </div>

          <div>
            <h2
              style={{
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                fontWeight: 800,
                fontSize: 22,
                color: "#FFFFFF",
                letterSpacing: "-0.03em",
                margin: "0 0 6px",
              }}
            >
              Your garage is empty
            </h2>
            <p style={{ fontSize: 14, color: "#A0A0B0", margin: 0, lineHeight: 1.5 }}>
              Upload your car to start building
            </p>
          </div>

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
              boxShadow: "0 0 28px rgba(68,204,255,0.40)",
              marginTop: 8,
            }}
          >
            Add a Vehicle
          </button>
        </motion.div>
      ) : (
        <div style={{ padding: "20px 20px 0" }}>
          {/* Vehicles section */}
          <h2
            style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800,
              fontSize: 11,
              color: "#A0A0B0",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Vehicles
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
            {MOCK_VEHICLES.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                style={{
                  background: "#14141A",
                  borderRadius: 16,
                  border: "1px solid #2A2A36",
                  padding: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  cursor: "pointer",
                }}
              >
                {/* Car gradient thumb */}
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: 12,
                    background: v.gradient,
                    border: `1px solid ${v.accent}30`,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: v.accent,
                      opacity: 0.2,
                      filter: "blur(12px)",
                      position: "absolute",
                    }}
                  />
                  <Car size={26} color={v.accent} style={{ position: "relative" }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 800,
                      fontSize: 15,
                      color: "#FFFFFF",
                      margin: "0 0 3px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {v.year} {v.make} {v.model}
                  </p>
                  <p style={{ fontSize: 12, color: "#A0A0B0", margin: "0 0 8px" }}>
                    {v.color}
                  </p>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Wrench size={11} color="#6B6B7B" />
                      <span style={{ fontSize: 11, color: "#6B6B7B" }}>
                        {v.builds} build{v.builds !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={11} color="#6B6B7B" />
                      <span style={{ fontSize: 11, color: "#6B6B7B" }}>{v.lastModified}</span>
                    </div>
                  </div>
                </div>

                <ChevronRight size={18} color="#2A2A36" />
              </motion.div>
            ))}
          </div>

          {/* Saved Builds section */}
          <h2
            style={{
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              fontSize: 11,
              color: "#A0A0B0",
              margin: "0 0 12px",
            }}
          >
            Saved Builds
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_SAVED_BUILDS.map((build, i) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                style={{
                  background: "#14141A",
                  borderRadius: 16,
                  border: "1px solid #2A2A36",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                }}
              >
                {/* Accent strip */}
                <div
                  style={{
                    width: 4,
                    background: build.accent,
                    flexShrink: 0,
                  }}
                />

                {/* Gradient thumb */}
                <div
                  style={{
                    width: 56,
                    flexShrink: 0,
                    background: build.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: build.accent,
                      opacity: 0.25,
                      filter: "blur(8px)",
                    }}
                  />
                </div>

                {/* Details */}
                <div
                  style={{
                    flex: 1,
                    padding: "12px 14px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#FFFFFF",
                        margin: 0,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {build.car}
                    </p>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: build.accent,
                        background: `${build.accent}18`,
                        border: `1px solid ${build.accent}30`,
                        borderRadius: 999,
                        padding: "2px 8px",
                      }}
                    >
                      {build.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 12, color: "#A0A0B0", margin: 0 }}>{build.style}</p>
                  <p
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: build.accent,
                      margin: 0,
                    }}
                  >
                    {build.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
