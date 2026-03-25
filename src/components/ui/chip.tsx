"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ChipProps {
  label: string;
  variant?: "default" | "active" | "category";
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  categoryColor?: string;
  className?: string;
}

export function Chip({
  label,
  variant = "default",
  icon,
  removable = false,
  onRemove,
  onClick,
  categoryColor,
  className,
}: ChipProps) {
  const categoryStyle =
    variant === "category" && categoryColor
      ? {
          backgroundColor: `${categoryColor}26`, // 15% opacity hex
          color: categoryColor,
          borderColor: `${categoryColor}4D`, // ~30% opacity
        }
      : undefined;

  return (
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => e.key === "Enter" && onClick() : undefined}
      className={cn(
        "inline-flex items-center gap-1.5",
        "h-8 px-3 rounded-chip",
        "text-body-sm font-medium",
        "transition-colors duration-fast",
        "select-none",
        variant === "default" && [
          "bg-surface-elevated text-text-secondary",
          "border border-surface-border",
          onClick && "hover:bg-surface-hover cursor-pointer",
        ],
        variant === "active" && [
          "bg-cyan-muted text-cyan",
          "border border-cyan/30",
          onClick && "cursor-pointer",
        ],
        variant === "category" && [
          "border",
          onClick && "cursor-pointer",
        ],
        className
      )}
      style={categoryStyle}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      <span>{label}</span>
      {removable && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          aria-label={`Remove ${label}`}
          className="flex items-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={12} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
}

export default Chip;
