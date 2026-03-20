"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, AlertCircle, ArrowRight, ChevronDown } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import type { Vehicle } from "@/types";

const STATUS_TEXTS = [
  "Detecting make & model...",
  "Reading body type...",
  "Identifying color...",
  "Processing year...",
  "Almost done...",
] as const;

const COLOR_OPTIONS = [
  { name: "White", hex: "#F4F4F5" },
  { name: "Black", hex: "#191c1e" },
  { name: "Gray", hex: "#71717A" },
  { name: "Silver", hex: "#C4C4CC" },
  { name: "Blue", hex: "#3B82F6" },
  { name: "Red", hex: "#EF4444" },
  { name: "Green", hex: "#22C55E" },
  { name: "Yellow", hex: "#EAB308" },
  { name: "Orange", hex: "#F97316" },
] as const;

const BODY_TYPES = ["Sedan", "Coupe", "SUV", "Truck", "Hatchback", "Convertible"] as const;
const MAKES = ["BMW", "Mercedes", "Audi", "Porsche", "Tesla", "Ford", "Toyota", "Honda", "Nissan", "Ferrari", "Lamborghini", "McLaren"];

// ─── Step Bar ────────────────────────────────────────────────────────────────

function StepBar() {
  const steps = [
    { label: "Design", active: true },
    { label: "Quote", active: false },
    { label: "Book", active: false },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
      {steps.map((step, idx) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {idx > 0 && <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: step.active ? "var(--primary)" : "var(--surface-high)" }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.active ? "var(--primary)" : "var(--muted)", whiteSpace: "nowrap" }}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Manual Entry Form ────────────────────────────────────────────────────────

function ManualEntryForm({ onSubmit }: { onSubmit: (v: Vehicle) => void }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("White");
  const [bodyType, setBodyType] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!make.trim() || !model.trim() || !year || !bodyType) return;
    const yearNum = parseInt(year, 10);
    if (isNaN(yearNum) || yearNum < 1990 || yearNum > 2026) return;
    onSubmit({ make: make.trim(), model: model.trim(), year: yearNum, color, bodyType });
  };

  const isValid = make.trim() && model.trim() && year && bodyType;

  return (
    <div style={{ padding: "0 20px 40px", display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Make</label>
        <input list="makes-list" value={make} onChange={(e) => setMake(e.target.value)} placeholder="e.g. BMW" className="real-input" />
        <datalist id="makes-list">{MAKES.map((m) => <option key={m} value={m} />)}</datalist>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Model</label>
        <input value={model} onChange={(e) => setModel(e.target.value)} placeholder="e.g. M4 Competition" className="real-input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Year</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 2024" min={1990} max={2026} className="real-input" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Color</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {COLOR_OPTIONS.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 100,
                border: `1.5px solid ${color === c.name ? "var(--primary)" : "var(--outline-variant)"}`,
                background: color === c.name ? "var(--primary-alpha-08)" : "transparent",
                cursor: "pointer",
              }}
            >
              <span style={{ width: 12, height: 12, borderRadius: "50%", background: c.hex, border: "1px solid var(--ghost-border)" }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: color === c.name ? "var(--primary)" : "var(--muted)" }}>{c.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Body Type</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {BODY_TYPES.map((bt) => (
            <button key={bt} onClick={() => setBodyType(bt)} className={`chip${bodyType === bt ? " active" : ""}`}>
              {bt}
            </button>
          ))}
        </div>
      </div>
      <button onClick={handleSubmit} disabled={!isValid} className={isValid ? "btn btn-primary" : "btn btn-disabled"} style={{ marginTop: 4, borderRadius: 14 }}>
        Continue
        <ArrowRight size={16} strokeWidth={2} />
      </button>
    </div>
  );
}

// ─── Detecting Page ──────────────────────────────────────────────────────────

export default function DetectingPage() {
  const router = useRouter();
  const { uploadedPhoto, setDetectedVehicle } = useAppStore();

  const [statusIdx, setStatusIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showManual, setShowManual] = useState(false);
  const hasRun = useRef(false);

  useEffect(() => {
    if (error || showManual) return;
    const interval = setInterval(() => setStatusIdx((i) => (i + 1) % STATUS_TEXTS.length), 1500);
    return () => clearInterval(interval);
  }, [error, showManual]);

  useEffect(() => {
    if (error || showManual) return;
    const start = Date.now();
    const duration = 5000;
    let animId: number;
    const tick = () => {
      const pct = Math.min(((Date.now() - start) / duration) * 100, 95);
      setProgress(pct);
      if (pct < 95) animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [error, showManual]);

  const runDetection = useCallback(async () => {
    if (!uploadedPhoto) {
      setError("No photo found. Please go back and upload your car.");
      return;
    }
    const base64 = uploadedPhoto.replace(/^data:image\/[a-z]+;base64,/, "");
    try {
      const res = await fetch("/api/detect-vehicle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64 }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error ?? `HTTP ${res.status}`);
      }
      const data = await res.json();
      setProgress(100);
      setDetectedVehicle(data.vehicle);
      await new Promise((r) => setTimeout(r, 400));
      router.push("/confirm-vehicle");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(`Couldn't detect vehicle automatically. ${msg}`);
      setShowManual(true);
    }
  }, [uploadedPhoto, setDetectedVehicle, router]);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;
    runDetection();
  }, [runDetection]);

  const handleManualSubmit = (vehicle: Vehicle) => {
    setDetectedVehicle(vehicle);
    router.push("/confirm-vehicle");
  };

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--ghost-border)" }}>
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          Detecting Vehicle
        </h1>
      </div>

      <StepBar />

      {!showManual ? (
        /* Analysis animation */
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 32px", gap: 24 }}>
          {/* Car image placeholder */}
          {uploadedPhoto && (
            <div style={{ width: 200, height: 130, borderRadius: 14, overflow: "hidden", border: "1px solid var(--ghost-border)", boxShadow: "var(--shadow-card)" }}>
              <img src={uploadedPhoto} alt="Your car" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}

          {/* Spinner */}
          <div className="spinner" style={{ width: 40, height: 40 }} />

          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", textAlign: "center", letterSpacing: "-0.02em" }}>
            AI is analyzing your vehicle...
          </h2>

          <p style={{ fontSize: 14, color: "var(--muted)", textAlign: "center" }}>
            {STATUS_TEXTS[statusIdx]}
          </p>

          {/* Progress bar */}
          <div style={{ width: "100%", maxWidth: 280 }}>
            <div className="pbar" style={{ width: "100%" }}>
              <div className="pfill" style={{ width: `${progress}%`, transition: "width 0.1s linear" }} />
            </div>
            <p style={{ textAlign: "center", color: "var(--muted)", marginTop: 8, fontSize: 11 }}>
              {Math.round(progress)}%
            </p>
          </div>

          <button
            onClick={() => setShowManual(true)}
            style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 12, marginTop: 8, background: "none", border: "none", cursor: "pointer" }}
          >
            Enter manually
            <ChevronDown size={12} strokeWidth={2} />
          </button>
        </div>
      ) : (
        /* Manual entry fallback */
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px 20px 20px" }}>
            {error && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, borderRadius: 12, padding: 12, marginBottom: 16, background: "var(--error-alpha-08)", border: "1px solid var(--error-alpha-15)" }}>
                <AlertCircle size={16} style={{ color: "var(--error)", flexShrink: 0, marginTop: 2 }} />
                <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--error)" }}>{error}</p>
              </div>
            )}
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>Enter Vehicle Details</h2>
            <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Tell us about your car so we can customize it.</p>
          </div>
          <ManualEntryForm onSubmit={handleManualSubmit} />
        </div>
      )}
    </div>
  );
}
