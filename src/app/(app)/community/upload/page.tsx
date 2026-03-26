"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;
type Direction = 1 | -1;

interface FormData {
  // Step 1
  filesUploaded: boolean;
  aiRenders: boolean;
  // Step 2
  designName: string;
  description: string;
  compatibleVehicles: string[];
  coverageType: string;
  styleTags: string[];
  colorPalette: string[];
  // Step 3
  isFree: boolean;
  price: string;
  licenseType: string;
  attributionRequired: boolean;
  // Step 4
  termsAccepted: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const VEHICLES = ["BMW M4", "Toyota Supra", "Honda Civic", "G-Wagon", "Porsche 911", "Nissan GT-R", "Universal"];
const COVERAGE_TYPES = ["Full Wrap", "Partial Wrap", "Hood Only", "Racing Stripe"];
const STYLE_TAGS = ["Murdered Out", "Racing Livery", "Color Shift", "JDM Street", "Clean Euro", "Camo"];
const COLORS = [
  { name: "Black", hex: "#1A1A1A" },
  { name: "White", hex: "#F0F0F0" },
  { name: "Red", hex: "#E63946" },
  { name: "Blue", hex: "#2196F3" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Silver", hex: "#C0C0C0" },
];

const PLACEHOLDER_CAR = "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp";

const STEP_LABELS = ["Upload Files", "Design Details", "Pricing", "Review & Publish"];

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: "100vh",
    background: "#0C0C10",
    padding: "24px 16px 80px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
  },
  container: {
    width: "100%",
    maxWidth: "640px",
    margin: "0 auto",
  },
  title: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#E8E8F0",
    margin: "0 0 4px",
  },
  stepLabel: {
    fontSize: "13px",
    color: "#6B6B82",
    margin: "0 0 16px",
  },
  progressTrack: {
    width: "100%",
    height: "3px",
    background: "#2A2A36",
    borderRadius: "9999px",
    overflow: "hidden",
    marginBottom: "32px",
  },
  card: {
    background: "#14141A",
    border: "1px solid #2A2A36",
    borderRadius: "12px",
    padding: "24px",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#E8E8F0",
    margin: "0 0 20px",
  },
  label: {
    display: "block" as const,
    fontSize: "13px",
    fontWeight: 600,
    color: "#9999AA",
    marginBottom: "8px",
    letterSpacing: "0.03em",
    textTransform: "uppercase" as const,
  },
  input: {
    background: "#14141A",
    border: "1px solid #2A2A36",
    borderRadius: "8px",
    color: "#E8E8F0",
    padding: "10px 14px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
  },
  textarea: {
    background: "#14141A",
    border: "1px solid #2A2A36",
    borderRadius: "8px",
    color: "#E8E8F0",
    padding: "10px 14px",
    width: "100%",
    fontSize: "14px",
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  },
  chip: (active: boolean) => ({
    padding: "6px 14px",
    borderRadius: "9999px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    border: `1px solid ${active ? "#44CCFF" : "#2A2A36"}`,
    background: active ? "rgba(68,204,255,0.12)" : "#1C1C24",
    color: active ? "#44CCFF" : "#9999AA",
    transition: "all 0.15s ease",
    userSelect: "none" as const,
  }),
  radioChip: (active: boolean) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: 500,
    cursor: "pointer",
    border: `1px solid ${active ? "#44CCFF" : "#2A2A36"}`,
    background: active ? "rgba(68,204,255,0.10)" : "#1C1C24",
    color: active ? "#44CCFF" : "#9999AA",
    transition: "all 0.15s ease",
    userSelect: "none" as const,
  }),
  btnPrimary: {
    background: "#44CCFF",
    color: "#0C0C10",
    border: "none",
    borderRadius: "8px",
    padding: "11px 24px",
    fontSize: "14px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  },
  btnSecondary: {
    background: "transparent",
    color: "#9999AA",
    border: "1px solid #2A2A36",
    borderRadius: "8px",
    padding: "11px 24px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  divider: {
    height: "1px",
    background: "#2A2A36",
    margin: "20px 0",
  },
  helperText: {
    fontSize: "12px",
    color: "#6B6B82",
    margin: "6px 0 0",
  },
  accentText: {
    color: "#44CCFF",
    fontWeight: 700,
  },
};

// ─── Step 1: Upload Files ─────────────────────────────────────────────────────

function StepUploadFiles({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <p style={s.stepTitle}>Upload your design files</p>

      {/* Drop zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); onChange({ filesUploaded: true }); }}
        style={{
          border: `2px dashed ${dragOver ? "#44CCFF" : "#2A2A36"}`,
          borderRadius: "12px",
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: dragOver ? "rgba(68,204,255,0.04)" : "#1C1C24",
          transition: "all 0.2s ease",
          marginBottom: "16px",
        }}
      >
        <div style={{ fontSize: "36px", marginBottom: "12px" }}>📁</div>
        <p style={{ color: "#E8E8F0", fontSize: "15px", fontWeight: 600, margin: "0 0 6px" }}>
          Drop your design files here
        </p>
        <p style={{ color: "#6B6B82", fontSize: "13px", margin: "0 0 16px" }}>or click to browse</p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".ai,.psd,.svg,.png,.jpg,.jpeg"
          multiple
          style={{ display: "none" }}
          onChange={() => onChange({ filesUploaded: true })}
        />
        <button
          onClick={(e) => { e.stopPropagation(); onChange({ filesUploaded: !data.filesUploaded }); }}
          style={{
            ...s.btnSecondary,
            fontSize: "13px",
            padding: "8px 18px",
          }}
        >
          {data.filesUploaded ? "✓ Simulated Upload" : "Simulate Upload"}
        </button>
      </div>

      {/* AI Renders toggle */}
      <div
        style={{
          ...s.card,
          padding: "16px",
          marginBottom: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: "14px", color: "#E8E8F0", fontWeight: 600 }}>
            Generate renders with AI
          </span>
          <button
            onClick={() => onChange({ aiRenders: !data.aiRenders })}
            style={{
              width: "44px",
              height: "24px",
              borderRadius: "12px",
              border: "none",
              background: data.aiRenders ? "#44CCFF" : "#2A2A36",
              cursor: "pointer",
              position: "relative",
              transition: "background 0.2s ease",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: "3px",
                left: data.aiRenders ? "23px" : "3px",
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.2s ease",
              }}
            />
          </button>
        </div>
        {data.aiRenders && (
          <p style={{ ...s.helperText, margin: 0, color: "#9999AA", fontSize: "13px" }}>
            Generate 3 photorealistic renders of your design on vehicles
          </p>
        )}
      </div>

      {/* Preview */}
      {data.filesUploaded && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "16px" }}
        >
          <p style={{ ...s.label }}>Preview</p>
          <div
            style={{
              borderRadius: "10px",
              overflow: "hidden",
              border: "1px solid #2A2A36",
              height: "160px",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={PLACEHOLDER_CAR}
              alt="Design preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </motion.div>
      )}

      {/* Requirements */}
      <div style={{ background: "#1C1C24", borderRadius: "8px", padding: "12px 14px" }}>
        <p style={{ ...s.label, marginBottom: "8px" }}>File Requirements</p>
        {[
          "Accepted formats: AI, PSD, SVG, PNG, JPG",
          "Maximum file size: 50MB",
          "Minimum resolution: 2000px width",
        ].map((req) => (
          <p key={req} style={{ ...s.helperText, margin: "4px 0" }}>
            • {req}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Step 2: Design Details ───────────────────────────────────────────────────

function StepDesignDetails({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const toggle = (arr: string[], val: string): string[] =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p style={{ ...s.stepTitle, margin: 0 }}>Tell us about your design</p>

      {/* Design name */}
      <div>
        <label style={s.label}>Design Name</label>
        <input
          type="text"
          placeholder="e.g. Tokyo Midnight Wrap"
          value={data.designName}
          onChange={(e) => onChange({ designName: e.target.value })}
          style={s.input}
        />
      </div>

      {/* Description */}
      <div>
        <label style={s.label}>Description</label>
        <textarea
          rows={3}
          placeholder="Describe your design — inspiration, techniques, use cases..."
          value={data.description}
          onChange={(e) => onChange({ description: e.target.value })}
          style={s.textarea}
        />
      </div>

      {/* Compatible vehicles */}
      <div>
        <label style={s.label}>Compatible Vehicles</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {VEHICLES.map((v) => (
            <span
              key={v}
              style={s.chip(data.compatibleVehicles.includes(v))}
              onClick={() => onChange({ compatibleVehicles: toggle(data.compatibleVehicles, v) })}
            >
              {v}
            </span>
          ))}
        </div>
      </div>

      {/* Coverage type */}
      <div>
        <label style={s.label}>Coverage Type</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {COVERAGE_TYPES.map((c) => (
            <span
              key={c}
              style={s.radioChip(data.coverageType === c)}
              onClick={() => onChange({ coverageType: c })}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Style tags */}
      <div>
        <label style={s.label}>Style Tags</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {STYLE_TAGS.map((t) => (
            <span
              key={t}
              style={s.chip(data.styleTags.includes(t))}
              onClick={() => onChange({ styleTags: toggle(data.styleTags, t) })}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Color palette */}
      <div>
        <label style={s.label}>Color Palette</label>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          {COLORS.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => onChange({ colorPalette: toggle(data.colorPalette, c.name) })}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: c.hex,
                border: `2px solid ${data.colorPalette.includes(c.name) ? "#44CCFF" : "#2A2A36"}`,
                cursor: "pointer",
                transition: "border-color 0.15s ease",
                padding: 0,
                outline: data.colorPalette.includes(c.name) ? "2px solid rgba(68,204,255,0.3)" : "none",
              }}
            />
          ))}
          <button
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#1C1C24",
              border: "2px dashed #2A2A36",
              cursor: "pointer",
              fontSize: "16px",
              color: "#6B6B82",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
            title="Custom color"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3: Pricing ──────────────────────────────────────────────────────────

function StepPricing({
  data,
  onChange,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
}) {
  const priceNum = parseFloat(data.price) || 0;
  const earnings = (priceNum * 0.7).toFixed(2);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <p style={{ ...s.stepTitle, margin: 0 }}>Set your price</p>

      {/* Free / Paid toggle */}
      <div
        style={{
          display: "flex",
          background: "#1C1C24",
          borderRadius: "10px",
          padding: "4px",
          border: "1px solid #2A2A36",
        }}
      >
        {(["Free", "Paid"] as const).map((opt) => {
          const active = opt === "Free" ? data.isFree : !data.isFree;
          return (
            <button
              key={opt}
              onClick={() => onChange({ isFree: opt === "Free" })}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                fontSize: "14px",
                fontWeight: 700,
                cursor: "pointer",
                background: active ? "#44CCFF" : "transparent",
                color: active ? "#0C0C10" : "#6B6B82",
                transition: "all 0.2s ease",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {data.isFree ? (
        <div style={{ ...s.card, padding: "16px 20px" }}>
          <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#E8E8F0", fontWeight: 600 }}>
            🚀 Free designs get 3× more downloads
          </p>
          <p style={s.helperText}>
            Free uploads help build your reputation and grow your audience on AVACAR.
          </p>
          <div style={s.divider} />
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              fontSize: "14px",
              color: "#E8E8F0",
            }}
          >
            <input
              type="checkbox"
              checked={data.attributionRequired}
              onChange={(e) => onChange({ attributionRequired: e.target.checked })}
              style={{ accentColor: "#44CCFF", width: "16px", height: "16px" }}
            />
            Attribution required (credit me when using this design)
          </label>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Price input */}
          <div>
            <label style={s.label}>Price</label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6B6B82",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={data.price}
                onChange={(e) => onChange({ price: e.target.value })}
                style={{ ...s.input, paddingLeft: "28px" }}
              />
            </div>
          </div>

          {/* Earnings preview */}
          <div style={{ ...s.card, padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "14px", color: "#9999AA" }}>You earn 70%</span>
              <span style={{ fontSize: "22px", ...s.accentText }}>
                ${earnings}
              </span>
            </div>
            <p style={{ ...s.helperText, marginTop: "6px" }}>
              AVACAR takes a 30% platform fee to cover hosting, payments, and distribution.
            </p>
          </div>

          {/* License tier */}
          <div>
            <label style={s.label}>License</label>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {["Personal Use Only", "Commercial Use Allowed"].map((lic) => (
                <label
                  key={lic}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: data.licenseType === lic ? "#E8E8F0" : "#9999AA",
                    background: data.licenseType === lic ? "rgba(68,204,255,0.06)" : "#1C1C24",
                    border: `1px solid ${data.licenseType === lic ? "#44CCFF" : "#2A2A36"}`,
                    borderRadius: "8px",
                    padding: "12px 14px",
                    transition: "all 0.15s ease",
                  }}
                  onClick={() => onChange({ licenseType: lic })}
                >
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      border: `2px solid ${data.licenseType === lic ? "#44CCFF" : "#2A2A36"}`,
                      background: data.licenseType === lic ? "#44CCFF" : "transparent",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {data.licenseType === lic && (
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0C0C10" }} />
                    )}
                  </span>
                  {lic}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 4: Review & Publish ─────────────────────────────────────────────────

function StepReview({
  data,
  onChange,
  onPublish,
  published,
}: {
  data: FormData;
  onChange: (patch: Partial<FormData>) => void;
  onPublish: () => void;
  published: boolean;
}) {
  const router = useRouter();

  if (published) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", padding: "32px 0" }}
      >
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#E8E8F0", margin: "0 0 8px" }}>
          Design Published!
        </h2>
        <p style={{ color: "#9999AA", fontSize: "14px", margin: "0 0 24px" }}>
          {data.designName || "Your design"} is now live on AVACAR.
        </p>
        <button
          onClick={() => router.push("/community")}
          style={{ ...s.btnPrimary, padding: "12px 28px", fontSize: "15px" }}
        >
          View your design →
        </button>
      </motion.div>
    );
  }

  const price = data.isFree ? "Free" : data.price ? `$${data.price}` : "—";
  const license = data.isFree
    ? data.attributionRequired ? "Attribution Required" : "Free"
    : data.licenseType || "—";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <p style={{ ...s.stepTitle, margin: 0 }}>Review & Publish</p>

      {/* Summary card */}
      <div style={{ ...s.card, padding: 0, overflow: "hidden" }}>
        <div style={{ height: "180px", overflow: "hidden" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={PLACEHOLDER_CAR}
            alt="Design thumbnail"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ padding: "16px 20px" }}>
          <p style={{ fontSize: "16px", fontWeight: 700, color: "#E8E8F0", margin: "0 0 4px" }}>
            {data.designName || "Untitled Design"}
          </p>
          {data.compatibleVehicles.length > 0 && (
            <p style={{ fontSize: "13px", color: "#9999AA", margin: "0 0 12px" }}>
              {data.compatibleVehicles.join(", ")}
            </p>
          )}
          <div style={s.divider} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {[
              { label: "Coverage", value: data.coverageType || "—" },
              { label: "License", value: license },
              { label: "Style", value: data.styleTags[0] || "—" },
              { label: "Price", value: price },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ ...s.helperText, margin: "0 0 2px" }}>{label}</p>
                <p style={{ fontSize: "13px", color: "#E8E8F0", margin: 0, fontWeight: 600 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Terms */}
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          cursor: "pointer",
          fontSize: "13px",
          color: "#9999AA",
          lineHeight: "1.5",
        }}
      >
        <input
          type="checkbox"
          checked={data.termsAccepted}
          onChange={(e) => onChange({ termsAccepted: e.target.checked })}
          style={{ accentColor: "#44CCFF", width: "16px", height: "16px", marginTop: "2px", flexShrink: 0 }}
        />
        I confirm this is my original work, I hold the rights to publish it, and I agree to AVACAR&apos;s
        content and licensing terms.
      </label>

      {/* Publish button */}
      <button
        onClick={onPublish}
        disabled={!data.termsAccepted}
        style={{
          ...s.btnPrimary,
          width: "100%",
          padding: "14px",
          fontSize: "16px",
          borderRadius: "10px",
          opacity: data.termsAccepted ? 1 : 0.4,
          cursor: data.termsAccepted ? "pointer" : "not-allowed",
        }}
      >
        Publish Design
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const DEFAULT_FORM: FormData = {
  filesUploaded: false,
  aiRenders: false,
  designName: "",
  description: "",
  compatibleVehicles: [],
  coverageType: "",
  styleTags: [],
  colorPalette: [],
  isFree: true,
  price: "",
  licenseType: "Personal Use Only",
  attributionRequired: false,
  termsAccepted: false,
};

export default function UploadDesignPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [direction, setDirection] = useState<Direction>(1);
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM);
  const [published, setPublished] = useState(false);

  const handleChange = (patch: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  };

  const goToStep = (next: Step) => {
    setDirection(next > currentStep ? 1 : -1);
    setCurrentStep(next);
  };

  const handleNext = () => {
    if (currentStep < 4) goToStep((currentStep + 1) as Step);
  };

  const handleBack = () => {
    if (currentStep > 1) goToStep((currentStep - 1) as Step);
  };

  const handlePublish = () => {
    setPublished(true);
  };

  const progress = (currentStep / 4) * 100;

  const slideVariants = {
    initial: (dir: Direction) => ({ x: dir * 300, opacity: 0 }),
    animate: { x: 0, opacity: 1 },
    exit: (dir: Direction) => ({ x: dir * -300, opacity: 0 }),
  };

  return (
    <div style={s.page}>
      <div style={s.container}>
        {/* Header */}
        <div style={{ marginBottom: "8px" }}>
          <h1 style={s.title}>Upload Design</h1>
          <p style={s.stepLabel}>
            Step {currentStep} of 4 — {STEP_LABELS[currentStep - 1]}
          </p>
          <div style={s.progressTrack}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={{ height: "100%", background: "#44CCFF", borderRadius: "9999px" }}
            />
          </div>
        </div>

        {/* Step content */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <div style={s.card}>
                {currentStep === 1 && (
                  <StepUploadFiles data={formData} onChange={handleChange} />
                )}
                {currentStep === 2 && (
                  <StepDesignDetails data={formData} onChange={handleChange} />
                )}
                {currentStep === 3 && (
                  <StepPricing data={formData} onChange={handleChange} />
                )}
                {currentStep === 4 && (
                  <StepReview
                    data={formData}
                    onChange={handleChange}
                    onPublish={handlePublish}
                    published={published}
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons (hidden on step 4 or after publish) */}
        {currentStep < 4 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "20px",
              gap: "12px",
            }}
          >
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              style={{
                ...s.btnSecondary,
                opacity: currentStep === 1 ? 0.3 : 1,
                cursor: currentStep === 1 ? "not-allowed" : "pointer",
              }}
            >
              Back
            </button>
            <button onClick={handleNext} style={s.btnPrimary}>
              {currentStep === 3 ? "Review →" : "Next →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
