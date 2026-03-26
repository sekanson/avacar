"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Data ─────────────────────────────────────────────────────────────────────

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020"];

const MAKES_MODELS: Record<string, string[]> = {
  Toyota:   ["Supra", "GR86", "Camry", "Corolla"],
  BMW:      ["M3", "M4", "M5", "5 Series"],
  Porsche:  ["911", "Cayman", "Macan", "Taycan"],
  Honda:    ["Civic Type R", "Accord", "CR-V", "NSX"],
  Nissan:   ["GT-R", "370Z", "Sentra", "Frontier"],
  Audi:     ["RS7", "RS5", "A4", "TT"],
  Mercedes: ["AMG C63", "AMG GT", "E-Class", "S-Class"],
  Tesla:    ["Model 3", "Model S", "Model X", "Model Y"],
  Ford:     ["GT500", "Mustang", "F-150", "Focus RS"],
  Dodge:    ["Challenger", "Charger", "Viper", "Durango"],
};

const MAKES = Object.keys(MAKES_MODELS);

const INTERESTS = [
  { emoji: "🎨", label: "Wraps" },
  { emoji: "🛞", label: "Wheels" },
  { emoji: "🛡️", label: "PPF" },
  { emoji: "🪟", label: "Tint" },
  { emoji: "🏎️", label: "Body Kits" },
  { emoji: "⬇️", label: "Lowering" },
  { emoji: "🏁", label: "Track Builds" },
  { emoji: "🌊", label: "JDM" },
  { emoji: "🇪🇺", label: "Euro" },
  { emoji: "🖤", label: "Murdered Out" },
  { emoji: "🔧", label: "DIY" },
  { emoji: "📸", label: "Content" },
];

const BUILDERS = [
  {
    handle: "wrapsbyalex",
    location: "Mississauga",
    rating: "4.9",
    thumbs: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?w=120&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=120&h=80&fit=crop&q=70&fm=webp",
    ],
  },
  {
    handle: "graphicflow",
    location: "Toronto",
    rating: "4.8",
    thumbs: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=120&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=120&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=120&h=80&fit=crop&q=70&fm=webp",
    ],
  },
  {
    handle: "jdm.wraps",
    location: "Vancouver",
    rating: "4.7",
    thumbs: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=80&fit=crop&q=70&fm=webp",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=120&h=80&fit=crop&q=70&fm=webp",
    ],
  },
];

// ─── Shared UI ─────────────────────────────────────────────────────────────────

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            width: i === current ? 20 : 8,
            height: 8,
            borderRadius: 999,
            background: i <= current ? "#44CCFF" : "rgba(255,255,255,0.12)",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function CyanButton({
  onClick,
  disabled,
  children,
  large,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: "100%",
        height: large ? 60 : 52,
        borderRadius: 14,
        background: disabled ? "rgba(68,204,255,0.2)" : "linear-gradient(135deg, #44CCFF, #0099cc)",
        border: "none",
        color: disabled ? "rgba(68,204,255,0.4)" : "#0C0C10",
        fontFamily: "var(--font-manrope, Manrope, sans-serif)",
        fontSize: large ? 17 : 15,
        fontWeight: 800,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 0 24px rgba(68,204,255,0.30)",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      {children}
    </button>
  );
}

// ─── Screens ──────────────────────────────────────────────────────────────────

function Screen1({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, padding: "0 32px", gap: 20 }}>
      <img
        src="/logo/avacar-logo-white.png"
        alt="AVA.CAR"
        style={{ height: 28, width: "auto", marginBottom: 8 }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 800,
            fontSize: 28,
            color: "#fff",
            letterSpacing: "-0.03em",
            margin: "0 0 10px",
          }}
        >
          Welcome to AVA.CAR
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>
          Let&apos;s personalize your experience.
        </p>
      </div>
      <div style={{ width: "100%", marginTop: 16 }}>
        <CyanButton onClick={onNext}>Continue →</CyanButton>
      </div>
    </div>
  );
}

function Screen2({ onNext }: { onNext: () => void }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [skipped, setSkipped] = useState(false);

  const models = make ? (MAKES_MODELS[make] ?? []) : [];
  const canContinue = skipped || (year !== "" && make !== "" && model !== "");

  const selectStyle: React.CSSProperties = {
    flex: 1,
    height: 48,
    borderRadius: 12,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: 14,
    padding: "0 12px",
    outline: "none",
    appearance: "none" as const,
    cursor: "pointer",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 24px" }}>
      <ProgressDots total={5} current={1} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 24 }}>
        <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.03em", margin: 0, textAlign: "center" }}>
          What do you drive?
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <select
            value={year}
            onChange={(e) => { setYear(e.target.value); setSkipped(false); }}
            style={{ ...selectStyle, maxWidth: 90 }}
          >
            <option value="">Year</option>
            {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
          <select
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(""); setSkipped(false); }}
            style={selectStyle}
          >
            <option value="">Make</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select
            value={model}
            onChange={(e) => { setModel(e.target.value); setSkipped(false); }}
            style={selectStyle}
            disabled={!make}
          >
            <option value="">Model</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <button
          onClick={() => { setSkipped(true); setYear(""); setMake(""); setModel(""); }}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 14, cursor: "pointer", textAlign: "center" }}
        >
          Or skip for now →
        </button>
      </div>
      <CyanButton onClick={onNext} disabled={!canContinue}>Continue →</CyanButton>
    </div>
  );
}

function Screen3({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (label: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 24px" }}>
      <ProgressDots total={5} current={2} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
            What interests you?
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>Pick all that apply</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
          {INTERESTS.map(({ emoji, label }) => {
            const isActive = selected.has(label);
            return (
              <button
                key={label}
                onClick={() => toggle(label)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  padding: "14px 8px",
                  borderRadius: 14,
                  border: "none",
                  background: isActive ? "#44CCFF" : "rgba(255,255,255,0.06)",
                  color: isActive ? "#0C0C10" : "rgba(255,255,255,0.65)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontSize: 20,
                }}
              >
                <span>{emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#0C0C10" : "rgba(255,255,255,0.6)" }}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <CyanButton onClick={onNext}>Continue →</CyanButton>
    </div>
  );
}

function Screen4({ onNext }: { onNext: () => void }) {
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const toggle = (handle: string) => {
    setFollowing((prev) => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 24px" }}>
      <ProgressDots total={5} current={3} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 20 }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 26, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 6px" }}>
            Builders to follow
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", margin: 0 }}>Get inspired by the community</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {BUILDERS.map((b) => {
            const isFollowing = following.has(b.handle);
            return (
              <div
                key={b.handle}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 16,
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #44CCFF33, #44CCFF11)",
                        border: "1.5px solid #44CCFF44",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#44CCFF",
                        flexShrink: 0,
                      }}
                    >
                      {b.handle[0].toUpperCase()}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff", margin: 0 }}>@{b.handle}</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", margin: "2px 0 0" }}>
                        {b.location} · ★{b.rating}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggle(b.handle)}
                    style={{
                      height: 32,
                      padding: "0 16px",
                      borderRadius: 999,
                      background: isFollowing ? "rgba(68,204,255,0.12)" : "#44CCFF",
                      border: isFollowing ? "1px solid #44CCFF44" : "none",
                      color: isFollowing ? "#44CCFF" : "#0C0C10",
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      flexShrink: 0,
                    }}
                  >
                    {isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {b.thumbs.map((src, i) => (
                    <div key={i} style={{ flex: 1, height: 52, borderRadius: 8, overflow: "hidden" }}>
                      <img
                        src={src}
                        alt=""
                        loading="lazy"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CyanButton onClick={onNext}>Continue →</CyanButton>
    </div>
  );
}

function Screen5({ onStudio, onFeed }: { onStudio: () => void; onFeed: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "32px 24px" }}>
      <ProgressDots total={5} current={4} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, textAlign: "center" }}>
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(68,204,255,0.1)",
            border: "1.5px solid rgba(68,204,255,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            boxShadow: "0 0 40px rgba(68,204,255,0.2)",
          }}
        >
          ✦
        </div>
        <div>
          <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 28, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 10px" }}>
            You&apos;re all set!
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.6 }}>
            Let&apos;s see your car transformed.
          </p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <CyanButton onClick={onStudio} large>✦ Open Studio</CyanButton>
        <button
          onClick={onFeed}
          style={{
            width: "100%",
            height: 52,
            borderRadius: 14,
            background: "none",
            border: "1.5px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.7)",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Browse the Feed →
        </button>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [screen, setScreen] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goNext = () => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setScreen((s) => s + 1);
      setAnimating(false);
    }, 200);
  };

  return (
    <div
      style={{
        minHeight: "100dvh",
        background: "var(--color-bg, #0C0C10)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(68,204,255,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateX(24px)" : "translateX(0)",
          transition: "opacity 0.2s, transform 0.2s",
          position: "relative",
          zIndex: 1,
          maxWidth: 480,
          width: "100%",
          margin: "0 auto",
        }}
      >
        {screen === 0 && <Screen1 onNext={goNext} />}
        {screen === 1 && <Screen2 onNext={goNext} />}
        {screen === 2 && <Screen3 onNext={goNext} />}
        {screen === 3 && <Screen4 onNext={goNext} />}
        {screen === 4 && (
          <Screen5
            onStudio={() => router.push("/create")}
            onFeed={() => router.push("/feed")}
          />
        )}
      </div>
    </div>
  );
}
