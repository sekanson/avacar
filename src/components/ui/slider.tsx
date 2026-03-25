"use client";

import { cn } from "@/lib/utils/cn";

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export function Slider({
  value,
  min,
  max,
  step = 1,
  onChange,
  label,
  showValue = false,
  formatValue,
}: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  const displayValue = formatValue ? formatValue(value) : String(value);

  return (
    <div className="flex flex-col gap-2">
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-body-sm text-text-secondary font-medium">{label}</span>
          )}
          {showValue && (
            <span className="text-data-sm text-cyan font-medium">{displayValue}</span>
          )}
        </div>
      )}

      <div className="relative flex items-center h-5">
        {/* Track background */}
        <div className="absolute inset-x-0 h-1.5 rounded-full bg-surface-border" />

        {/* Filled portion */}
        <div
          className="absolute left-0 h-1.5 rounded-full bg-cyan transition-none"
          style={{ width: `${pct}%` }}
        />

        {/* Native range input (transparent, layered on top for interaction) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            "[&::-webkit-slider-thumb]:opacity-100",
          )}
          style={{ margin: 0, padding: 0 }}
        />

        {/* Visual thumb */}
        <div
          className="absolute w-5 h-5 rounded-full bg-cyan shadow-glow-cyan pointer-events-none"
          style={{
            left: `calc(${pct}% - 10px)`,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        />
      </div>
    </div>
  );
}

export default Slider;
