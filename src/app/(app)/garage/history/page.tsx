"use client";

import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();

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
        History
      </p>

      <h1 style={{
        fontFamily: "var(--font-manrope, Manrope, sans-serif)",
        fontWeight: 900,
        fontSize: 26,
        color: "var(--color-text-primary)",
        letterSpacing: "-0.03em",
        margin: "0 0 12px",
      }}>
        Build History
      </h1>

      <p style={{
        fontSize: 15,
        color: "var(--color-text-secondary)",
        lineHeight: 1.6,
        margin: "0 0 36px",
      }}>
        Your past creations and edits — coming soon.
      </p>

      <button
        onClick={() => router.push("/garage")}
        style={{ fontSize: 13, color: "var(--color-text-secondary)", background: "none", border: "none", cursor: "pointer" }}
      >
        ← Back to Garage
      </button>
    </div>
  );
}
