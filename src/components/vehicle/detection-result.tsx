"use client";

import { useState } from "react";
import Image from "next/image";
import { RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface DetectionData {
  make: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  confidence: number;
}

interface VehicleDetectionResultProps {
  imageUrl: string;
  detection: DetectionData;
  onConfirm: (updated: Omit<DetectionData, "confidence">) => void;
  onRetry: () => void;
}

const BODY_TYPES = ["Sedan", "SUV", "Truck", "Coupe", "Hatchback", "Convertible", "Van", "Wagon", "Other"];

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "select";
  options?: string[];
}

function EditableField({ label, value, onChange, type = "text", options }: EditableFieldProps) {
  const [editing, setEditing] = useState(false);

  const handleBlur = () => setEditing(false);

  return (
    <div className="flex flex-col gap-1">
      <span className="text-body-xs text-text-tertiary uppercase tracking-wide">{label}</span>
      {editing && type === "select" && options ? (
        <select
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className="bg-surface-elevated border border-cyan rounded-input text-body-md text-text-primary px-3 py-1.5 outline-none"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : editing ? (
        <input
          autoFocus
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className="bg-surface-elevated border border-cyan rounded-input text-body-md text-text-primary px-3 py-1.5 outline-none"
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          className="text-left text-body-md text-text-primary hover:text-cyan transition-colors duration-fast border-b border-dashed border-surface-border hover:border-cyan/50 pb-0.5 w-fit"
        >
          {value || <span className="text-text-tertiary italic">Tap to edit</span>}
        </button>
      )}
    </div>
  );
}

export function VehicleDetectionResult({
  imageUrl,
  detection,
  onConfirm,
  onRetry,
}: VehicleDetectionResultProps) {
  const [fields, setFields] = useState({
    make: detection.make,
    model: detection.model,
    year: detection.year,
    color: detection.color,
    bodyType: detection.bodyType,
  });

  const confidence = Math.round(detection.confidence * 100);

  const updateField =
    <K extends keyof typeof fields>(key: K) =>
    (value: string) => {
      setFields((prev) => ({
        ...prev,
        [key]: key === "year" ? parseInt(value, 10) || prev.year : value,
      }));
    };

  const handleConfirm = () => onConfirm(fields);

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Vehicle photo */}
      <div className="relative w-full aspect-video rounded-card overflow-hidden bg-surface">
        <Image
          src={imageUrl}
          alt="Detected vehicle"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 600px"
        />
      </div>

      {/* Detection card */}
      <div className="bg-surface rounded-card border border-surface-border p-4 flex flex-col gap-4">
        {/* Confidence bar */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-body-xs text-text-tertiary uppercase tracking-wide">
              AI Confidence
            </span>
            <span className={cn(
              "text-body-sm font-mono font-medium",
              confidence >= 80 ? "text-success" : confidence >= 60 ? "text-warning" : "text-error"
            )}>
              {confidence}%
            </span>
          </div>
          <div className="h-1.5 bg-surface-elevated rounded-chip overflow-hidden">
            <div
              className={cn(
                "h-full rounded-chip transition-all duration-slow",
                confidence >= 80 ? "bg-success" : confidence >= 60 ? "bg-warning" : "bg-error"
              )}
              style={{ width: `${confidence}%` }}
            />
          </div>
        </div>

        {/* Editable fields */}
        <div className="grid grid-cols-2 gap-4">
          <EditableField label="Make" value={fields.make} onChange={updateField("make")} />
          <EditableField label="Model" value={fields.model} onChange={updateField("model")} />
          <EditableField label="Year" value={String(fields.year)} onChange={updateField("year")} type="number" />
          <EditableField label="Color" value={fields.color} onChange={updateField("color")} />
          <div className="col-span-2">
            <EditableField
              label="Body Type"
              value={fields.bodyType}
              onChange={updateField("bodyType")}
              type="select"
              options={BODY_TYPES}
            />
          </div>
        </div>

        <p className="text-body-xs text-text-tertiary">Tap any field to edit</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <button
          onClick={handleConfirm}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-button bg-cyan text-text-inverse font-medium text-body-md hover:bg-cyan-hover active:bg-cyan-pressed transition-colors duration-fast"
        >
          <Check className="w-4 h-4" />
          Confirm Vehicle
        </button>
        <button
          onClick={onRetry}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-button border border-surface-border text-body-md text-text-secondary hover:border-cyan hover:text-cyan transition-colors duration-fast"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
}
