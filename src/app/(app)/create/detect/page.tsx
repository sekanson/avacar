"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBuildStore } from "@/lib/stores/build-store";

const STATUS_MESSAGES = [
  "Detecting make and model...",
  "Identifying color and trim...",
  "Checking body style...",
  "Almost there...",
];

// Mock detection result used when API isn't available
const MOCK_VEHICLE = {
  make: "Toyota",
  model: "Supra",
  year: 2022,
  color: "Thermal Orange",
  bodyType: "Coupe",
  trim: "GR",
};

export default function DetectPage() {
  const router = useRouter();
  const { vehicleImageUrl, setVehicle } = useBuildStore();
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  // Cycle status messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIdx((i) => Math.min(i + 1, STATUS_MESSAGES.length - 1));
    }, 900);
    return () => clearInterval(interval);
  }, []);

  // Animate progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 95) return p;
        return p + Math.random() * 8;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  // Kick off detection
  useEffect(() => {
    let cancelled = false;

    async function detect() {
      try {
        if (vehicleImageUrl) {
          const res = await fetch("/api/vehicles/detect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrl: vehicleImageUrl }),
          });
          if (res.ok) {
            const data = await res.json();
            if (!cancelled) {
              setVehicle(data.vehicle ?? MOCK_VEHICLE);
            }
          } else {
            if (!cancelled) setVehicle(MOCK_VEHICLE);
          }
        } else {
          // No image — still use mock
          await new Promise((r) => setTimeout(r, 3000));
          if (!cancelled) setVehicle(MOCK_VEHICLE);
        }
      } catch {
        if (!cancelled) setVehicle(MOCK_VEHICLE);
      } finally {
        if (!cancelled) {
          setProgress(100);
          setTimeout(() => router.push("/create/confirm"), 400);
        }
      }
    }

    // Minimum display time of 3.5 s even if API is fast
    const minWait = new Promise<void>((r) => setTimeout(r, 3500));
    Promise.all([detect(), minWait]).catch(() => {
      if (!cancelled) {
        setVehicle(MOCK_VEHICLE);
        setProgress(100);
        setTimeout(() => router.push("/create/confirm"), 400);
      }
    });

    return () => { cancelled = true; };
  }, [vehicleImageUrl, router, setVehicle]);

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center justify-center"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Radial glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(68,204,255,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      {/* Pulsing rings */}
      <div className="relative flex items-center justify-center mb-10" style={{ width: 160, height: 160 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              border: "1.5px solid rgba(68,204,255,0.35)",
              animation: `pulse-ring 2.4s ease-out ${i * 0.8}s infinite`,
              width: 80 + i * 40,
              height: 80 + i * 40,
            }}
          />
        ))}

        {/* Center icon circle */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(68,204,255,0.25) 0%, rgba(68,204,255,0.08) 100%)",
            border: "1.5px solid rgba(68,204,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 30px rgba(68,204,255,0.3)",
            animation: "pulse-glow 2s ease-in-out infinite",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Car SVG icon */}
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#44CCFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
            <circle cx="7" cy="17" r="2" />
            <circle cx="17" cy="17" r="2" />
            <path d="M7 17h10" />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h1
        className="font-display text-display-md text-text-primary text-center mb-2"
        style={{ letterSpacing: "-0.01em" }}
      >
        Analyzing your vehicle
      </h1>

      {/* Cycling status */}
      <p
        className="text-body-md text-cyan text-center mb-10 transition-all duration-500"
        style={{ minHeight: "1.5rem" }}
      >
        {STATUS_MESSAGES[msgIdx]}
      </p>

      {/* Progress bar */}
      <div
        style={{
          width: 240,
          height: 4,
          borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 2,
            background: "linear-gradient(90deg, #44CCFF, #A78BFA)",
            width: `${Math.min(progress, 100)}%`,
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-6">
        {STATUS_MESSAGES.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === msgIdx ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i <= msgIdx ? "#44CCFF" : "rgba(255,255,255,0.15)",
              transition: "all 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* Keyframes injected inline */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.85); opacity: 0.6; }
          70% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
