import { cn } from "@/lib/utils/cn";

interface BadgeProps {
  label: string;
  variant?: "default" | "success" | "warning" | "error" | "info" | "tier";
  size?: "sm" | "md";
  tier?: "standard" | "certified" | "elite";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default:  "bg-surface-elevated text-text-secondary border border-surface-border",
  success:  "bg-success/15 text-success border border-success/30",
  warning:  "bg-warning/15 text-warning border border-warning/30",
  error:    "bg-error/15 text-error border border-error/30",
  info:     "bg-cyan-muted text-cyan border border-cyan/30",
  tier:     "", // handled by tier prop
};

const tierClasses: Record<NonNullable<BadgeProps["tier"]>, string> = {
  standard: "bg-[#6B7280]/15 text-[#6B7280] border border-[#6B7280]/30",
  certified: "bg-cyan-muted text-cyan border border-cyan/30",
  elite:    "bg-[#FBBF24]/15 text-[#FBBF24] border border-[#FBBF24]/30",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[10px] leading-4",
  md: "px-2.5 py-1 text-body-sm",
};

export function Badge({
  label,
  variant = "default",
  size = "sm",
  tier,
}: BadgeProps) {
  const colorClass =
    variant === "tier" && tier
      ? tierClasses[tier]
      : variantClasses[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-chip font-medium",
        sizeClasses[size],
        colorClass
      )}
    >
      {label}
    </span>
  );
}

export default Badge;
