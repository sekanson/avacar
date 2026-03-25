"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: [
    "bg-cyan text-background font-semibold",
    "hover:bg-cyan-hover hover:shadow-glow-cyan",
    "active:bg-cyan-pressed",
  ].join(" "),
  secondary: [
    "bg-surface-elevated text-text-primary",
    "border border-surface-border",
    "hover:bg-surface-hover",
  ].join(" "),
  ghost: [
    "bg-transparent text-text-secondary",
    "hover:bg-surface hover:text-text-primary",
  ].join(" "),
  danger: [
    "bg-error/15 text-error",
    "border border-error/30",
    "hover:bg-error/25",
  ].join(" "),
  outline: [
    "bg-transparent text-cyan",
    "border border-cyan/40",
    "hover:bg-cyan-subtle",
  ].join(" "),
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-9 px-4 text-body-sm font-medium rounded-button gap-1.5",
  md: "h-12 px-6 text-body-md font-semibold rounded-button gap-2",
  lg: "h-14 px-8 text-body-lg font-semibold rounded-button gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  iconRight,
  loading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "inline-flex items-center justify-center",
        "transition-all duration-fast",
        "select-none",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        (disabled || loading) && "opacity-50 pointer-events-none",
        className
      )}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 14 : size === "lg" ? 20 : 16} className="animate-spin" />
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}
      {children}
      {!loading && iconRight && (
        <span className="flex items-center">{iconRight}</span>
      )}
    </button>
  );
}

export default Button;
