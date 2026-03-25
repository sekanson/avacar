"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Check, Zap } from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";
import { cn } from "@/lib/utils/cn";

const BODY_TYPES = ["Coupe", "Sedan", "SUV", "Truck", "Hatchback", "Convertible", "Van", "Wagon"];

export default function ConfirmVehiclePage() {
  const router = useRouter();
  const { vehicleImageUrl, currentBuild, setVehicle } = useBuildStore();

  const detected = currentBuild.vehicle;
  const [make, setMake] = useState(detected?.make ?? "Toyota");
  const [model, setModel] = useState(detected?.model ?? "Supra");
  const [year, setYear] = useState(String(detected?.year ?? "2022"));
  const [color, setColor] = useState(detected?.color ?? "Thermal Orange");
  const [bodyType, setBodyType] = useState(detected?.bodyType ?? "Coupe");

  const confidence = 94;

  function handleConfirm() {
    setVehicle({
      make: make.trim() || "Unknown",
      model: model.trim() || "Unknown",
      year: parseInt(year, 10) || 2020,
      color: color.trim() || "Unknown",
      bodyType: bodyType.trim() || "Sedan",
    });
    router.push("/create/customize");
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 flex-shrink-0"
        style={{ height: "3.5rem", borderBottom: "1px solid #2A2A36" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          Confirm Vehicle
        </span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-5 space-y-5 max-w-lg mx-auto">
          {/* Photo preview */}
          <div
            className="w-full rounded-card overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            {vehicleImageUrl ? (
              <img
                src={vehicleImageUrl}
                alt="Your vehicle"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, #1C1C24 0%, #14141A 100%)",
                  border: "1px solid #2A2A36",
                }}
              >
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(68,204,255,0.3)"
                  strokeWidth="1.5"
                >
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
            )}
          </div>

          {/* Confidence card */}
          <div
            className="rounded-card p-4 space-y-3"
            style={{ background: "#14141A", border: "1px solid #2A2A36" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-cyan" />
                <span className="text-body-sm font-medium text-text-secondary">
                  AI Confidence
                </span>
              </div>
              <span className="text-body-sm font-medium text-cyan font-mono">
                {confidence}%
              </span>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 3,
                background: "rgba(255,255,255,0.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: 3,
                  width: `${confidence}%`,
                  background: "linear-gradient(90deg, #44CCFF, #34D399)",
                  transition: "width 0.8s ease",
                }}
              />
            </div>
          </div>

          {/* Editable fields */}
          <div
            className="rounded-card overflow-hidden"
            style={{ border: "1px solid #2A2A36" }}
          >
            {[
              { label: "Make", value: make, onChange: setMake, placeholder: "e.g. Toyota" },
              { label: "Model", value: model, onChange: setModel, placeholder: "e.g. Supra" },
              { label: "Year", value: year, onChange: setYear, placeholder: "e.g. 2022", type: "number" },
              { label: "Color", value: color, onChange: setColor, placeholder: "e.g. Thermal Orange" },
            ].map((field, idx, arr) => (
              <div
                key={field.label}
                className="flex items-center px-4"
                style={{
                  background: "#14141A",
                  borderBottom: idx < arr.length - 1 ? "1px solid #2A2A36" : "none",
                  height: 56,
                }}
              >
                <span
                  className="text-body-sm text-text-tertiary"
                  style={{ width: 72, flexShrink: 0 }}
                >
                  {field.label}
                </span>
                <input
                  type={field.type ?? "text"}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent text-body-md text-text-primary outline-none text-right"
                  style={{ caretColor: "#44CCFF" }}
                />
              </div>
            ))}

            {/* Body type select */}
            <div
              className="flex items-center px-4"
              style={{ background: "#14141A", height: 56 }}
            >
              <span
                className="text-body-sm text-text-tertiary"
                style={{ width: 72, flexShrink: 0 }}
              >
                Body Type
              </span>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                className="flex-1 bg-transparent text-body-md text-text-primary outline-none text-right"
                style={{ colorScheme: "dark", cursor: "pointer" }}
              >
                {BODY_TYPES.map((bt) => (
                  <option key={bt} value={bt} style={{ background: "#1C1C24" }}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pb-4">
            <button
              onClick={handleConfirm}
              className="w-full h-14 rounded-button font-display font-semibold text-body-lg text-background flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: "#44CCFF",
                boxShadow: "0 0 24px rgba(68,204,255,0.35)",
              }}
            >
              <Check size={18} />
              Confirm &amp; Continue
            </button>

            <button
              onClick={() => router.push("/create")}
              className="w-full h-12 rounded-button font-medium text-body-md text-text-secondary border border-surface-border hover:border-cyan/40 hover:text-text-primary transition-all"
            >
              Re-upload Photo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
