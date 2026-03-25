import { cn } from "@/lib/utils/cn";

// ── Generic skeleton text block ──────────────────────────────────────────────

interface SkeletonTextProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonText({ width = "100%", height = "1rem", className }: SkeletonTextProps) {
  return (
    <div
      className={cn("skeleton rounded-chip", className)}
      style={{ width, height }}
    />
  );
}

// ── Post card skeleton ────────────────────────────────────────────────────────
// Matches: avatar + username row, square image, action row

export function SkeletonPostCard({ className }: { className?: string }) {
  return (
    <div className={cn("bg-surface rounded-card overflow-hidden border border-surface-border", className)}>
      {/* Header: avatar + username */}
      <div className="flex items-center gap-3 p-3">
        <div className="skeleton w-9 h-9 rounded-avatar flex-shrink-0" />
        <div className="flex flex-col gap-1.5 flex-1">
          <SkeletonText width="40%" height="0.75rem" />
          <SkeletonText width="25%" height="0.625rem" />
        </div>
      </div>

      {/* Image: 1:1 aspect ratio */}
      <div className="skeleton w-full aspect-square" />

      {/* Action row */}
      <div className="flex items-center gap-4 p-3">
        <div className="skeleton w-6 h-6 rounded-image flex-shrink-0" />
        <div className="skeleton w-6 h-6 rounded-image flex-shrink-0" />
        <div className="skeleton w-6 h-6 rounded-image flex-shrink-0" />
        <div className="flex-1" />
        <SkeletonText width="30%" height="0.625rem" />
      </div>
    </div>
  );
}

// ── Product tile skeleton ─────────────────────────────────────────────────────
// Matches: square image top, name + price below

export function SkeletonProductTile({ className }: { className?: string }) {
  return (
    <div className={cn("bg-surface rounded-card overflow-hidden border border-surface-border", className)}>
      {/* Square image */}
      <div className="skeleton w-full aspect-square" />

      {/* Info */}
      <div className="p-3 flex flex-col gap-2">
        <SkeletonText width="80%" height="0.75rem" />
        <SkeletonText width="50%" height="0.625rem" />
        <SkeletonText width="35%" height="0.75rem" />
      </div>
    </div>
  );
}

// ── Shop card skeleton ────────────────────────────────────────────────────────
// Horizontal: logo circle on left + text lines on right

export function SkeletonShopCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface rounded-card border border-surface-border p-4 flex items-center gap-4",
        className
      )}
    >
      {/* Logo circle */}
      <div className="skeleton w-12 h-12 rounded-avatar flex-shrink-0" />

      {/* Text lines */}
      <div className="flex flex-col gap-2 flex-1 min-w-0">
        <SkeletonText width="55%" height="0.875rem" />
        <SkeletonText width="70%" height="0.625rem" />
        <SkeletonText width="40%" height="0.625rem" />
      </div>
    </div>
  );
}
