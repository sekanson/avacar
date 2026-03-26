"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, Image as ImageIcon, Lightbulb } from "lucide-react";

const DEMO_CARS = [
  {
    label: "2023 Toyota GR86",
    img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&q=80&fm=webp",
    param: "gr86",
  },
  {
    label: "2024 BMW M4",
    img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80&fm=webp",
    param: "m4",
  },
  {
    label: "2022 Porsche 911",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&q=80&fm=webp",
    param: "911",
  },
];

export default function StudioUploadPage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: "100dvh", background: "var(--color-bg)",
      display: "flex", flexDirection: "column", position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(68,204,255,0.08) 0%, transparent 60%)",
      }} />

      {/* Back button */}
      <button onClick={() => router.back()} style={{
        position: "absolute", top: 16, left: 16, zIndex: 10,
        background: "none", border: "none", cursor: "pointer",
        color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 4,
        fontSize: 14,
      }}>
        <ArrowLeft size={18} /> Back
      </button>

      {/* Main content */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "72px 24px 0", position: "relative", zIndex: 1,
        gap: 28, maxWidth: 400, margin: "0 auto", width: "100%",
      }}>
        {/* Car silhouette */}
        <div style={{ width: 160, height: 80, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
          <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
            <path d="M20 45 Q20 35 35 30 L55 20 Q65 15 75 15 L100 15 Q110 15 115 20 L130 30 Q145 35 145 45"
              stroke="#44CCFF" strokeWidth="1.5" fill="none" />
            <circle cx="45" cy="48" r="8" stroke="#44CCFF" strokeWidth="1.5" fill="none" />
            <circle cx="120" cy="48" r="8" stroke="#44CCFF" strokeWidth="1.5" fill="none" />
            <line x1="15" y1="50" x2="150" y2="50" stroke="#44CCFF" strokeWidth="0.5" opacity="0.3" />
          </svg>
        </div>

        {/* Headline */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{
            fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)", margin: "0 0 8px",
          }}>Upload Your Car</h1>
          <p style={{ fontSize: 14, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
            {"We'll transform it in seconds. Side angle works best."}
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
          <button onClick={() => router.push("/create/customize")} style={{
            width: "100%", height: 56, borderRadius: 999,
            background: "linear-gradient(135deg, #44CCFF 0%, #007FFF 100%)",
            color: "#0C0C10", fontWeight: 700, fontSize: 16, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            boxShadow: "0 0 24px rgba(68,204,255,0.3)",
          }}>
            <Camera size={20} /> Take a Photo
          </button>

          <button onClick={() => router.push("/create/customize")} style={{
            width: "100%", height: 56, borderRadius: 999,
            background: "transparent", color: "var(--color-text-primary)",
            fontWeight: 600, fontSize: 16, cursor: "pointer",
            border: "1px solid var(--color-border)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          }}>
            <ImageIcon size={20} /> Choose from Gallery
          </button>
        </div>

        {/* OR divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
          <span style={{ fontSize: 12, color: "var(--color-text-tertiary)", fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: 1, background: "var(--color-border)" }} />
        </div>

        {/* Demo cars */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0, textAlign: "center" }}>
            Try with a demo car
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            {DEMO_CARS.map((car) => (
              <button
                key={car.param}
                onClick={() => router.push(`/create/customize?demo=${car.param}`)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                }}
              >
                <img
                  src={car.img}
                  alt={car.label}
                  loading="lazy"
                  style={{
                    width: 100, height: 64, objectFit: "cover",
                    borderRadius: 10, display: "block",
                    border: "1px solid var(--color-border)",
                  }}
                />
                <span style={{ fontSize: 9, color: "var(--color-text-tertiary)", fontWeight: 600, maxWidth: 100, textAlign: "center", lineHeight: 1.3 }}>
                  {car.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom tip card */}
      <div style={{
        margin: "28px 24px 32px", padding: "16px 20px",
        background: "var(--color-surface)", borderRadius: 16,
        display: "flex", gap: 12, alignItems: "flex-start",
        position: "relative", zIndex: 1,
        maxWidth: 400, alignSelf: "center", width: "calc(100% - 48px)",
      }}>
        <Lightbulb size={18} style={{ color: "#44CCFF", flexShrink: 0, marginTop: 2 }} />
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px" }}>
            For best results
          </p>
          <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: 0, lineHeight: 1.5 }}>
            Clear side or ¾ angle · Good daylight · No obstructions · Single car in frame
          </p>
        </div>
      </div>
    </div>
  );
}
