"use client";

import { cn } from "@/lib/utils/cn";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export function Input({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  error,
  hint,
  icon,
  iconRight,
  disabled = false,
  required = false,
  className,
}: InputProps) {
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {label && (
        <label className="text-body-sm text-text-secondary font-medium mb-1.5">
          {label}
          {required && <span className="text-error ml-0.5">*</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {icon && (
          <span className="absolute left-3 flex items-center text-text-tertiary pointer-events-none">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full h-12 rounded-input",
            "bg-surface border border-surface-border",
            "text-body-md text-text-primary",
            "placeholder:text-text-tertiary",
            "outline-none",
            "transition-all duration-fast",
            "focus:border-cyan focus:ring-1 focus:ring-cyan/30",
            error && "border-error ring-1 ring-error/30",
            disabled && "opacity-50 cursor-not-allowed",
            icon ? "pl-10 pr-4" : "px-4",
            iconRight ? "pr-10" : ""
          )}
        />

        {iconRight && (
          <span className="absolute right-3 flex items-center text-text-tertiary">
            {iconRight}
          </span>
        )}
      </div>

      {error && (
        <p className="text-body-sm text-error mt-1.5">{error}</p>
      )}
      {hint && !error && (
        <p className="text-body-sm text-text-tertiary mt-1.5">{hint}</p>
      )}
    </div>
  );
}

export default Input;
