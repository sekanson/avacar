"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { useAppStore } from "@/store/appStore";
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

function getColorHex(colorName: string): string {
  const found = COLOR_OPTIONS.find((c) => c.name.toLowerCase() === colorName.toLowerCase());
  return found?.hex ?? "#71717A";
}

// ─── Step Bar ────────────────────────────────────────────────────────────────

function StepBar() {
  const steps = [
    { label: "Design", state: "active" as const },
    { label: "Quote", state: "future" as const },
    { label: "Book", state: "future" as const },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
      {steps.map((step, idx) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {idx > 0 && <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: step.state === "active" ? "var(--primary)" : "var(--surface-high)" }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.state === "active" ? "var(--primary)" : "var(--muted)", whiteSpace: "nowrap" }}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ label, value, colorHex }: { label: string; value: string; colorHex?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0" }}>
      <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 500 }}>{label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {colorHex && (
          <span style={{ width: 14, height: 14, borderRadius: "50%", background: colorHex, border: "1px solid var(--ghost-border)", flexShrink: 0 }} />
        )}
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{value}</span>
      </div>
    </div>
  );
}

// ─── Confirm Vehicle Page ────────────────────────────────────────────────────

export default function ConfirmVehiclePage() {
  const router = useRouter();
  const { detectedVehicle, uploadedPhoto, setCurrentVehicle } = useAppStore();

  const vehicle = detectedVehicle;

  useEffect(() => {
    if (!detectedVehicle) router.replace("/upload");
  }, [detectedVehicle, router]);

  if (!vehicle) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div className="skel" style={{ width: 200, height: 24 }} />
      </div>
    );
  }

  const handleConfirm = () => {
    setCurrentVehicle(vehicle);
    router.push("/customize");
  };

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column", paddingBottom: 32 }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", boxShadow: "0 1px 0 rgba(0,0,0,0.06)" }}>
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          Confirm Vehicle
        </h1>
      </div>

      <StepBar />

      {/* Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px", gap: 20 }}>
        {/* Car image */}
        <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-card)", height: 180, background: "var(--surface-low)" }}>
          {uploadedPhoto ? (
            <img src={uploadedPhoto} alt="Your car" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 14 }}>
              No photo
            </div>
          )}
        </div>

        {/* AI Detected badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 12px",
            borderRadius: 100,
            background: "var(--success-alpha-10)",
            boxShadow: "0 0 0 1px var(--success-alpha-20)",
          }}>
            <Check size={12} style={{ color: "var(--success)" }} strokeWidth={2.5} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--success)" }}>AI Detected</span>
          </div>
        </div>

        {/* Vehicle name */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h2>

        {/* Detected info rows */}
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: "4px 16px", boxShadow: "var(--shadow-card)" }}>
          <InfoRow label="Make" value={vehicle.make} />
          <InfoRow label="Model" value={vehicle.model} />
          <InfoRow label="Year" value={String(vehicle.year)} />
          <InfoRow label="Color" value={vehicle.color} colorHex={getColorHex(vehicle.color)} />
          <InfoRow label="Body Type" value={vehicle.bodyType} />
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={handleConfirm} className="btn btn-primary" style={{ borderRadius: 14, fontSize: 15, width: "100%" }}>
          Confirm &amp; Continue
        </button>
        <button
          onClick={() => router.push("/upload")}
          className="btn btn-secondary"
          style={{ borderRadius: 14, fontSize: 14, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
        >
          <RotateCcw size={15} strokeWidth={2} />
          Not right? Retry
        </button>
      </div>
    </div>
  );
}
