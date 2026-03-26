"use client";

import { useRouter } from "next/navigation";
import { Clock, Sparkles } from "lucide-react";

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", padding: "32px 20px" }}>
      <p style={{
        fontSize: 10, fontWeight: 700, color: "#44CCFF",
        letterSpacing: "0.15em", textTransform: "uppercase", margin: "0 0 8px",
      }}>
        Build History
      </p>
      <h1 style={{
        fontFamily: "var(--font-manrope, Manrope, sans-serif)",
        fontWeight: 900, fontSize: 26, color: "var(--color-text-primary)",
        letterSpacing: "-0.03em", margin: "0 0 40px",
      }}>
        Your Creations
      </h1>

      {/* Empty state */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center", padding: "40px 24px", gap: 16,
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "rgba(68,204,255,0.06)", border: "1px solid rgba(68,204,255,0.14)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Clock size={36} color="var(--color-text-tertiary)" />
        </div>
        <div>
          <h2 style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 800, fontSize: 20, color: "var(--color-text-primary)",
            letterSpacing: "-0.03em", margin: "0 0 8px",
          }}>
            No builds yet
          </h2>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.6, maxWidth: 280 }}>
            Your creation history will appear here once you start building.
          </p>
        </div>
        <button
          onClick={() => router.push("/create")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            height: 48, padding: "0 28px", borderRadius: 12,
            background: "#44CCFF", color: "#0C0C10",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontSize: 14, fontWeight: 800, border: "none", cursor: "pointer",
            boxShadow: "0 0 24px rgba(68,204,255,0.35)", marginTop: 8,
          }}
        >
          <Sparkles size={16} />
          Start Building →
        </button>
      </div>
    </div>
  );
}
