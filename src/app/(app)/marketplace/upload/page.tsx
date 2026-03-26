"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, Palette, FileText, X, CheckCircle, ChevronRight, Info } from "lucide-react";

/* ─── Step 1: Start ─── */
function StepStart({ onUpload }: { onUpload: () => void }) {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 24px", textAlign: "center" }}>
      <button
        onClick={() => router.push("/marketplace/designs")}
        style={{ display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", color: "var(--color-text-secondary)", fontSize: 14, marginBottom: 48 }}
      >
        <ArrowLeft size={16} /> Back to Marketplace
      </button>

      <div style={{ width: 72, height: 72, borderRadius: 20, background: "rgba(68,204,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Upload size={36} color="#44CCFF" />
      </div>
      <h1 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 900, fontSize: 28, color: "var(--color-text-primary)", letterSpacing: "-0.04em", margin: "0 0 8px" }}>
        Upload Your Design
      </h1>
      <p style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: 36, maxWidth: 380 }}>
        Share your work with car enthusiasts worldwide.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%", maxWidth: 420 }}>
        {/* Create in Studio */}
        <button
          onClick={() => router.push("/create")}
          style={{
            background: "var(--color-surface)",
            borderRadius: 20,
            padding: "20px 24px",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 16,
            transition: "transform 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(68,204,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Palette size={24} color="#44CCFF" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Create in Studio</p>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0, lineHeight: 1.4 }}>Design something new using our AI-powered tools</p>
          </div>
          <ChevronRight size={18} color="var(--color-text-tertiary)" />
        </button>

        {/* Upload Files */}
        <button
          onClick={onUpload}
          style={{
            background: "var(--color-surface)",
            borderRadius: 20,
            padding: "20px 24px",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            display: "flex",
            alignItems: "center",
            gap: 16,
            transition: "transform 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(68,204,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FileText size={24} color="#44CCFF" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Upload Files</p>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0, lineHeight: 1.4 }}>I have existing design files ready to sell</p>
          </div>
          <ChevronRight size={18} color="var(--color-text-tertiary)" />
        </button>
      </div>
    </div>
  );
}

/* ─── Step 2: Upload Files ─── */
const MOCK_FILES = [
  { name: "midnight-fury-v2.eps", size: "4.2 MB" },
  { name: "midnight-fury-preview.png", size: "1.8 MB" },
];

function StepUpload({ onNext }: { onNext: () => void }) {
  return (
    <div style={{ padding: "0 24px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Step 2 of 5</p>
      <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 22, color: "var(--color-text-primary)", letterSpacing: "-0.03em", margin: "0 0 20px" }}>Upload Your Files</h2>

      {/* Drop zone */}
      <div
        style={{
          height: 200, borderRadius: 16,
          border: "2px dashed rgba(68,204,255,0.4)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          gap: 8, cursor: "pointer", marginBottom: 20,
          background: "rgba(68,204,255,0.03)",
          transition: "background 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(68,204,255,0.07)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(68,204,255,0.03)")}
      >
        <Upload size={32} color="#44CCFF" />
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>Drop your files here or click to browse</p>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>Accepted: EPS, AI, PDF, TIFF, PNG · Max 500MB</p>
      </div>

      {/* Uploaded files */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {MOCK_FILES.map((f) => (
          <div
            key={f.name}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: 12,
              background: "var(--color-surface)",
            }}
          >
            <CheckCircle size={16} color="#34D399" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>{f.name}</p>
              <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>{f.size}</p>
            </div>
            <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
              <X size={14} color="var(--color-text-tertiary)" />
            </button>
          </div>
        ))}
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#44CCFF", fontWeight: 600 }}>
          + Add more files
        </button>
      </div>

      <button onClick={onNext} style={ctaStyle}>Continue →</button>
    </div>
  );
}

/* ─── Step 3: Design Info ─── */
function StepInfo({ onNext }: { onNext: () => void }) {
  const [tags] = useState(["racing", "livery", "GT-R"]);

  return (
    <div style={{ padding: "0 24px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Step 3 of 5</p>
      <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 22, color: "var(--color-text-primary)", letterSpacing: "-0.03em", margin: "0 0 20px" }}>Design Info</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Design Name *</label>
          <input defaultValue="Midnight Fury V2" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Category *</label>
          <select defaultValue="Racing" style={inputStyle}>
            {["Racing", "Street", "Commercial", "Abstract", "Minimal", "JDM", "Euro", "Other"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Wrap Type *</label>
          <select defaultValue="Full Wrap" style={inputStyle}>
            {["Full Wrap", "Partial", "Stripes", "Spot Decals", "Commercial", "Racing"].map((o) => <option key={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Tags</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, padding: "10px 14px", background: "var(--color-surface)", borderRadius: 12 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 100, background: "rgba(68,204,255,0.12)", fontSize: 12, fontWeight: 600, color: "#44CCFF" }}>
                {tag}
                <X size={10} style={{ cursor: "pointer" }} />
              </span>
            ))}
            <input placeholder="Add tag..." style={{ background: "none", border: "none", outline: "none", fontSize: 12, color: "var(--color-text-secondary)", minWidth: 80 }} />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <textarea
            defaultValue="Aggressive racing livery inspired by Super GT. Features asymmetric patterns with bold color blocking."
            rows={3}
            style={{ ...inputStyle, resize: "vertical" }}
          />
        </div>
      </div>

      <button onClick={onNext} style={ctaStyle}>Continue →</button>
    </div>
  );
}

/* ─── Step 4: Pricing ─── */
function StepPricing({ onNext }: { onNext: () => void }) {
  const [personal, _setPersonal] = useState(149);
  const [freePreview, setFreePreview] = useState(false);

  const commercial = Math.round(personal * 2);
  const exclusive = Math.round(personal * 6);
  const earnPersonal = (personal * 0.7).toFixed(2);
  const earnCommercial = (commercial * 0.7).toFixed(2);

  return (
    <div style={{ padding: "0 24px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Step 4 of 5</p>
      <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 22, color: "var(--color-text-primary)", letterSpacing: "-0.03em", margin: "0 0 20px" }}>Pricing</h2>

      {/* Suggested price card */}
      <div style={{ background: "var(--color-surface-elevated)", borderRadius: 16, padding: "16px 20px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 12 }}>
        <Info size={16} color="#44CCFF" style={{ marginTop: 2, flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: 15, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px" }}>💡 Suggested price: $149</p>
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 4px" }}>Based on similar designs in this category</p>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "#44CCFF", padding: 0 }}>How we calculate this →</button>
        </div>
      </div>

      {/* Price inputs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
        {[
          { label: "Personal License", value: `$${personal}`, editable: true },
          { label: "Commercial License", value: `$${commercial}`, editable: false, note: "Auto 2×" },
          { label: "Exclusive License", value: `$${exclusive}`, editable: false, note: "Auto 6×" },
        ].map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "var(--color-surface)", borderRadius: 12 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", margin: 0 }}>{item.label}</p>
              {item.note && <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>{item.note}</p>}
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: "#44CCFF", margin: 0 }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Free preview checkbox */}
      <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, cursor: "pointer" }}>
        <input type="checkbox" checked={freePreview} onChange={(e) => setFreePreview(e.target.checked)} style={{ accentColor: "#44CCFF", width: 16, height: 16 }} />
        <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>Offer free preview version (drives discoverability)</span>
      </label>

      {/* Earnings breakdown */}
      <div style={{ background: "var(--color-surface)", borderRadius: 16, padding: "16px 20px", marginBottom: 24 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Your earnings: 70% of every sale</p>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "0 0 12px" }}>AVA.CAR keeps: 30%</p>
        <div style={{ height: 1, background: "var(--color-border)", marginBottom: 12 }} />
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>Personal sale: You earn <strong style={{ color: "#34D399" }}>${earnPersonal}</strong></p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>Commercial sale: You earn <strong style={{ color: "#34D399" }}>${earnCommercial}</strong></p>
      </div>

      <button onClick={onNext} style={ctaStyle}>Continue →</button>
    </div>
  );
}

/* ─── Step 5: Review ─── */
function StepReview({ onSubmit }: { onSubmit: () => void }) {
  return (
    <div style={{ padding: "0 24px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24 }}>Step 5 of 5</p>
      <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 22, color: "var(--color-text-primary)", letterSpacing: "-0.03em", margin: "0 0 20px" }}>Review & Submit</h2>

      {/* Preview card */}
      <div style={{ background: "var(--color-surface)", borderRadius: 24, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp"
            alt="Midnight Fury V2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ padding: "16px 18px" }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>Midnight Fury V2</p>
          <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: "0 0 8px" }}>by @wrapsbyalex · SHOP</p>
          <p style={{ fontSize: 14, fontWeight: 700, color: "#44CCFF", margin: "0 0 12px" }}>From $149</p>
          <button style={{ padding: "8px 18px", borderRadius: 100, background: "rgba(68,204,255,0.12)", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#44CCFF" }}>
            🔮 Try On My Car
          </button>
        </div>
      </div>

      {/* Details summary */}
      <div style={{ background: "var(--color-surface)", borderRadius: 16, padding: "16px 20px", marginBottom: 24 }}>
        {[
          ["Category", "Racing"],
          ["Wrap Type", "Full Wrap"],
          ["Tags", "racing, livery, GT-R"],
          ["Files", "2 files (6.0 MB total)"],
          ["License", "Personal $149 / Commercial $298 / Exclusive $894"],
        ].map(([label, value]) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, gap: 16 }}>
            <p style={{ fontSize: 13, color: "var(--color-text-tertiary)", margin: 0, flexShrink: 0 }}>{label}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: 0, textAlign: "right" }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Submit */}
      <button onClick={onSubmit} style={{ ...ctaStyle, height: 56, fontSize: 16 }}>Submit for Review →</button>
      <button style={{ width: "100%", marginTop: 12, padding: "14px", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "var(--color-text-secondary)" }}>
        ← Back to edit
      </button>
      <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.6, marginTop: 16 }}>
        Our team reviews submissions within 24 hours.{"\n"}You&apos;ll be notified when your design is live.
      </p>
    </div>
  );
}

/* ─── Success ─── */
function StepSuccess() {
  const router = useRouter();
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
      <h2 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 900, fontSize: 28, color: "var(--color-text-primary)", letterSpacing: "-0.04em", margin: "0 0 8px" }}>Submitted!</h2>
      <p style={{ fontSize: 15, color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: 340, marginBottom: 32 }}>
        Your design is under review. We&apos;ll notify you within 24 hours when it goes live.
      </p>
      <button
        onClick={() => router.push("/marketplace/dashboard")}
        style={ctaStyle}
      >
        View Dashboard →
      </button>
    </div>
  );
}

/* ─── Shared styles ─── */
const ctaStyle: React.CSSProperties = {
  width: "100%",
  height: 52,
  borderRadius: 100,
  border: "none",
  cursor: "pointer",
  background: "linear-gradient(135deg, #44CCFF, #007FFF)",
  color: "#fff",
  fontSize: 15,
  fontWeight: 800,
  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
  letterSpacing: "-0.01em",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 700,
  color: "var(--color-text-tertiary)",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: "none",
  background: "var(--color-surface)",
  color: "var(--color-text-primary)",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

/* ─── Progress Bar ─── */
function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: 4, padding: "0 24px", marginBottom: 32 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: 3, borderRadius: 100,
            background: i < step ? "#44CCFF" : "var(--color-surface)",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
}

/* ─── Main Page ─── */
export default function UploadPage() {
  const [step, setStep] = useState(0); // 0=start, 1=upload, 2=info, 3=pricing, 4=review, 5=success

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", maxWidth: 640, margin: "0 auto", paddingTop: 48, paddingBottom: 80 }}>
      {step > 0 && step < 5 && <ProgressBar step={step} total={5} />}

      {step === 0 && <StepStart onUpload={() => setStep(1)} />}
      {step === 1 && <StepUpload onNext={() => setStep(2)} />}
      {step === 2 && <StepInfo onNext={() => setStep(3)} />}
      {step === 3 && <StepPricing onNext={() => setStep(4)} />}
      {step === 4 && <StepReview onSubmit={() => setStep(5)} />}
      {step === 5 && <StepSuccess />}
    </div>
  );
}
