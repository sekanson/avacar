"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBuildStore } from "@/lib/stores/build-store";

const STATUS_MESSAGES = [
  "Applying wrap color...",
  "Mounting wheels...",
  "Rendering lighting...",
  "Finalizing your build...",
];

// A real working car image for the mock render
const MOCK_RENDER_URL =
  "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80";

export default function RenderPage() {
  const router = useRouter();
  const { setRenderUrl } = useBuildStore();
  const [progress, setProgress] = useState(0);
  const [msgIdx, setMsgIdx] = useState(0);

  // Cycle status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, STATUS_MESSAGES.length - 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Animate progress to 100 over ~3.5 s
  useEffect(() => {
    let frame: ReturnType<typeof requestAnimationFrame>;
    let start: number | null = null;
    const DURATION = 3500;

    function step(ts: number) {
      if (!start) start = ts;
      const elapsed = ts - start;
      const raw = Math.min(elapsed / DURATION, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - raw, 2);
      setProgress(eased * 100);
      if (raw < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setRenderUrl(MOCK_RENDER_URL);
        setTimeout(() => router.push("/create/quote"), 400);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [router, setRenderUrl]);

  const circumference = 2 * Math.PI * 52; // r=52
  const strokeDash = circumference - (progress / 100) * circumference;

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(68,204,255,0.1) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient particle dots (static, purely decorative) */}
      {[
        { top: "15%", left: "10%", size: 3 },
        { top: "25%", right: "12%", size: 2 },
        { top: "70%", left: "8%", size: 2 },
        { top: "75%", right: "15%", size: 3 },
        { top: "45%", left: "5%", size: 1.5 },
        { top: "55%", right: "6%", size: 1.5 },
      ].map((dot, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            ...dot,
            width: dot.size,
            height: dot.size,
            borderRadius: "50%",
            background: "#44CCFF",
            opacity: 0.25 + (i % 3) * 0.1,
          }}
        />
      ))}

      {/* Circular progress */}
      <div className="relative flex items-center justify-center mb-10" style={{ width: 140, height: 140 }}>
        {/* Track */}
        <svg
          width="140"
          height="140"
          viewBox="0 0 120 120"
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="6"
          />
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke="url(#renderGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDash}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />
          <defs>
            <linearGradient id="renderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#44CCFF" />
              <stop offset="100%" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center: percentage */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="text-display-md font-display text-text-primary font-bold">
            {Math.round(progress)}
          </span>
          <span className="text-body-xs text-text-tertiary -mt-1">%</span>
        </div>
      </div>

      {/* Heading */}
      <h1
        className="font-display text-display-lg text-text-primary text-center mb-2 px-6"
        style={{ letterSpacing: "-0.015em" }}
      >
        Rendering your build
      </h1>

      {/* Status */}
      <p
        className="text-body-md text-cyan text-center mb-10 transition-all duration-500"
        style={{ minHeight: "1.5rem" }}
      >
        {STATUS_MESSAGES[msgIdx]}
      </p>

      {/* Step dots */}
      <div className="flex gap-2">
        {STATUS_MESSAGES.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === msgIdx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i <= msgIdx ? "#44CCFF" : "rgba(255,255,255,0.12)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
