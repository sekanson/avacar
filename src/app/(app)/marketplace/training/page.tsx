"use client";

import { useState } from "react";
import { GraduationCap, Bell } from "lucide-react";

export default function TrainingPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleNotify() {
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Icon */}
      <div
        className="flex items-center justify-center mb-6"
        style={{
          width: 72,
          height: 72,
          borderRadius: "1.25rem",
          background: "rgba(68,204,255,0.12)",
          border: "1px solid rgba(68,204,255,0.25)",
        }}
      >
        <GraduationCap size={34} style={{ color: "#44CCFF" }} />
      </div>

      {/* Overline */}
      <p
        className="font-semibold tracking-[0.15em] uppercase mb-3"
        style={{ fontSize: 11, color: "#44CCFF" }}
      >
        Training
      </p>

      {/* Headline */}
      <h1
        className="font-display font-bold text-text-primary mb-3"
        style={{ fontSize: 26, lineHeight: 1.2 }}
      >
        Coming Soon
      </h1>

      {/* Body */}
      <p
        className="text-text-secondary mb-10 max-w-xs"
        style={{ fontSize: 15, lineHeight: 1.6 }}
      >
        Professional courses and certifications for wrap installers. Level up your skills and earn your Zeno badge.
      </p>

      {/* Notify form */}
      {submitted ? (
        <div
          className="flex items-center gap-2 px-5 py-3 rounded-2xl"
          style={{ background: "rgba(68,204,255,0.1)", border: "1px solid rgba(68,204,255,0.3)" }}
        >
          <Bell size={16} style={{ color: "#44CCFF" }} />
          <p className="text-[14px] text-cyan font-medium">You&apos;re on the list!</p>
        </div>
      ) : (
        <div className="w-full max-w-sm flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 rounded-2xl px-4 text-[14px] text-text-primary placeholder:text-text-tertiary outline-none"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              height: 48,
            }}
            onKeyDown={(e) => e.key === "Enter" && handleNotify()}
          />
          <button
            onClick={handleNotify}
            className="flex-shrink-0 font-semibold rounded-2xl px-5 transition-opacity active:opacity-80"
            style={{
              height: 48,
              background: "linear-gradient(135deg, #44CCFF 0%, #0099CC 100%)",
              color: "#000",
              fontSize: 14,
            }}
          >
            Notify Me
          </button>
        </div>
      )}
    </div>
  );
}
