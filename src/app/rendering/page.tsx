"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Car } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function RenderingPage() {
  const router = useRouter();
  const { currentBuild } = useAppStore();

  useEffect(() => {
    if (!currentBuild.wrap && !currentBuild.wheels && !currentBuild.tint && !currentBuild.ppf) {
      router.replace("/upload");
    }
  }, [currentBuild, router]);

  const [progress, setProgress] = useState(0);
  const DURATION_MS = 4000;
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Status messages
  const statusMessages = [
    "Calculating wrap options...",
    "Finding certified shops near you...",
    "Pulling live pricing...",
    "Almost ready...",
  ];

  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    startTimeRef.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - (startTimeRef.current ?? now);
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => router.push("/quote"), 320);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [statusMessages.length]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Spinning rings + car */}
      <div style={{ position: "relative", width: 120, height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Outer ring */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "3px solid var(--primary-alpha-15)",
            borderTopColor: "var(--primary)",
            animation: "spin 1.5s linear infinite",
          }}
        />
        {/* Inner ring */}
        <div
          style={{
            position: "absolute",
            inset: 12,
            borderRadius: "50%",
            border: "2px solid var(--primary-alpha-08)",
            borderBottomColor: "var(--primary-alpha-40)",
            animation: "spin 2.5s linear infinite reverse",
          }}
        />
        {/* Center icon */}
        <div style={{ position: "relative", zIndex: 2, animation: "carPulse 2s ease-in-out infinite" }}>
          <Car size={36} style={{ color: "var(--primary)" }} strokeWidth={1.5} />
        </div>
      </div>

      {/* Text */}
      <h2 style={{ marginTop: 32, fontSize: 20, fontWeight: 700, color: "var(--on-surface)", textAlign: "center", letterSpacing: "-0.02em" }}>
        Preparing your quote...
      </h2>

      <p style={{ marginTop: 10, fontSize: 13, color: "var(--muted)", textAlign: "center", height: 20 }}>
        {statusMessages[statusIndex]}
      </p>

      {/* Pulsing dots */}
      <div style={{ marginTop: 32, display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--primary)",
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 20, width: "85%", maxWidth: 300 }}>
        <div className="pbar" style={{ width: "100%" }}>
          <div className="pfill" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
        </div>
      </div>

      {/* Cancel */}
      <button
        onClick={() => router.push("/customize")}
        style={{
          position: "absolute",
          bottom: 48,
          background: "none",
          border: "none",
          color: "var(--muted)",
          fontSize: 13,
          cursor: "pointer",
          fontWeight: 500,
          padding: "8px 16px",
        }}
      >
        Cancel
      </button>
    </div>
  );
}
