"use client";

import { cn } from "@/lib/utils/cn";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
  disabled = false,
}: ToggleProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-3",
        "cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {/* Text */}
      {(label || description) && (
        <div className="flex-1">
          {label && (
            <p className="text-body-md text-text-primary font-medium">{label}</p>
          )}
          {description && (
            <p className="text-body-sm text-text-secondary mt-0.5">{description}</p>
          )}
        </div>
      )}

      {/* Track */}
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-11 h-6 rounded-full",
          "transition-all duration-fast",
          "flex-shrink-0",
          checked ? "bg-cyan" : "bg-surface-border"
        )}
      >
        {/* Thumb */}
        <div
          className={cn(
            "absolute top-0.5 left-0.5",
            "w-5 h-5 rounded-full bg-white",
            "shadow-sm",
            "transition-transform duration-fast",
            checked ? "translate-x-5" : "translate-x-0"
          )}
        />
      </div>
    </label>
  );
}

export default Toggle;
