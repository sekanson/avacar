"use client";

import { cn } from "@/lib/utils/cn";

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  maxLength?: number;
  className?: string;
}

export function Textarea({
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  disabled = false,
  required = false,
  rows = 4,
  maxLength,
  className,
}: TextareaProps) {
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {label && (
        <label className="text-body-sm text-text-secondary font-medium mb-1.5">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        rows={rows}
        maxLength={maxLength}
        className={cn(
          "w-full rounded-input",
          "bg-surface border border-surface-border",
          "text-body-md text-text-primary",
          "placeholder:text-text-tertiary",
          "outline-none resize-none",
          "px-4 py-3",
          "transition-all duration-fast",
          "focus:border-cyan focus:ring-1 focus:ring-cyan/30",
          error && "border-error ring-1 ring-error/30",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      />

      <div className="flex items-start justify-between mt-1.5">
        <div>
          {error && (
            <p className="text-body-sm text-error">{error}</p>
          )}
          {hint && !error && (
            <p className="text-body-sm text-text-tertiary">{hint}</p>
          )}
        </div>
        {maxLength !== undefined && (
          <p className={cn(
            "text-body-sm ml-auto shrink-0",
            value.length >= maxLength ? "text-error" : "text-text-tertiary"
          )}>
            {value.length}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}

export default Textarea;
