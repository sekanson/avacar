"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, ArrowLeft, Loader2, RotateCcw, Info } from "lucide-react";
import { useAppStore } from "@/store/appStore";

// ─── Step Bar ─────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Design", active: true },
  { label: "Quote", active: false },
  { label: "Book", active: false },
] as const;

function StepBar() {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px", gap: 0 }}>
      {STEPS.map((step, idx) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {idx > 0 && (
            <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />
          )}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: step.active ? "var(--primary)" : "var(--surface-high)",
              }}
            />
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: step.active ? "var(--primary)" : "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              {step.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div style={{ flex: 1, height: 2, background: "var(--surface-high)", borderRadius: 1 }} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Upload Page ──────────────────────────────────────────────────────────────

export default function UploadPage() {
  const router = useRouter();
  const { setUploadedPhoto } = useAppStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const processFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleRetake = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleAnalyze = async () => {
    if (!preview) return;
    setIsAnalyzing(true);
    setUploadedPhoto(preview);
    await new Promise((r) => setTimeout(r, 300));
    router.push("/detecting");
  };

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileChange} />

      {/* Topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          borderBottom: "1px solid var(--ghost-border)",
        }}
      >
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          Upload
        </h1>
      </div>

      {/* Step Bar */}
      <StepBar />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "16px 20px", gap: 20 }}>
        {preview ? (
          /* Preview */
          <div
            style={{
              position: "relative",
              height: 260,
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid var(--ghost-border)",
            }}
          >
            <img src={preview} alt="Uploaded car" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", bottom: 12, left: 12 }}>
              <button
                onClick={handleRetake}
                className="btn-outline"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 14px",
                  fontSize: 13,
                  borderRadius: 10,
                }}
              >
                <RotateCcw size={13} strokeWidth={2} />
                Retake
              </button>
            </div>
          </div>
        ) : (
          /* Upload zone */
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
              height: 260,
              borderRadius: 14,
              border: `2px dashed ${isDragging ? "var(--primary)" : "var(--outline-variant)"}`,
              background: isDragging ? "var(--primary-alpha-04)" : "transparent",
              transition: "all 0.2s",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "var(--primary-alpha-08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={32} style={{ color: "var(--primary)" }} strokeWidth={1.5} />
            </div>
            <div style={{ textAlign: "center", padding: "0 24px" }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>
                Take a photo or choose from gallery
              </p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                Best results: side angle, good lighting
              </p>
            </div>
          </div>
        )}

        {/* Buttons when no preview */}
        {!preview && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="btn btn-primary"
              style={{ borderRadius: 14, fontSize: 15 }}
            >
              <Camera size={18} strokeWidth={1.8} />
              Take Photo
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary"
              style={{ borderRadius: 14, fontSize: 15 }}
            >
              <ImagePlus size={18} strokeWidth={1.8} />
              Choose from Gallery
            </button>
          </div>
        )}

        {/* Tips */}
        {!preview && (
          <div
            style={{
              borderRadius: 12,
              padding: "12px 16px",
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              background: "var(--primary-alpha-04)",
              border: "1px solid var(--primary-alpha-10)",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                background: "var(--primary-alpha-10)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Info size={14} style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>For best results</p>
              <p style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.5, marginTop: 2 }}>
                Use a clear side or 3/4 angle shot in good lighting. Avoid obstructions.
              </p>
            </div>
          </div>
        )}

        {/* Analyze button */}
        {preview && (
          <div>
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="btn btn-primary"
              style={{ borderRadius: 14, fontSize: 15, width: "100%" }}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Vehicle"
              )}
            </button>
            <p style={{ textAlign: "center", color: "var(--muted)", marginTop: 12, fontSize: 11 }}>
              Our AI will detect your make, model, year &amp; color
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
