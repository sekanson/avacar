"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Sparkles, MapPin } from "lucide-react";
import { useAppStore } from "@/store/appStore";

const slides = [
  {
    icon: Camera,
    headline: "See it before you commit",
    description:
      "Upload a photo of your car and see it customized with wraps, wheels, tint, and PPF.",
    accent: "AI-powered visualization",
  },
  {
    icon: Sparkles,
    headline: "A community of builders",
    description:
      'Browse builds from other enthusiasts. Tap \u201cTry This Build\u201d to apply any design to your car.',
    accent: "Follow \u00b7 Like \u00b7 Share",
  },
  {
    icon: MapPin,
    headline: "Get a quote, book a shop",
    description:
      "Get real pricing from certified installers. Browse the marketplace for parts and designs.",
    accent: "2,000+ certified shops",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { setHasSeenOnboarding } = useAppStore();
  const [index, setIndex] = useState(0);

  const slide = slides[index];
  const isLast = index === slides.length - 1;
  const Icon = slide.icon;

  const goNext = () => {
    if (isLast) {
      handleComplete();
      return;
    }
    setIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setHasSeenOnboarding(true);
    router.push("/feed");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        position: "relative",
        background: "var(--bg)",
        minHeight: "100dvh",
      }}
    >
      {/* Skip button */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "14px 20px 0",
        }}
      >
        <button
          onClick={handleSkip}
          style={{
            background: "none",
            border: "none",
            color: "var(--outline)",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "var(--font-manrope), 'Manrope', sans-serif",
          }}
        >
          Skip
        </button>
      </div>

      {/* Slide content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
          gap: 24,
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 28,
            background: "var(--primary-alpha-12)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={36} style={{ color: "var(--primary)" }} />
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "var(--on-surface)",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          {slide.headline}
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 15,
            color: "var(--on-surface-variant)",
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 300,
          }}
        >
          {slide.description}
        </div>

        {/* Accent text */}
        <div
          style={{
            fontSize: 15,
            color: "var(--primary)",
            fontWeight: 600,
          }}
        >
          {slide.accent}
        </div>
      </div>

      {/* Bottom: dots + button */}
      <div
        style={{
          padding: "0 24px 52px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* Dot pagination */}
        <div style={{ display: "flex", gap: 6 }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === index ? "var(--primary)" : "#c4c7cc",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.25s ease, background 0.2s ease",
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          className="btn btn-primary"
          style={{ width: "100%" }}
          onClick={goNext}
        >
          {isLast ? (
            <>
              <Camera size={14} /> Upload a Photo
            </>
          ) : (
            "Next"
          )}
        </button>
      </div>
    </div>
  );
}
