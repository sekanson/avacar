"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface AvatarProps {
  src?: string | null;
  alt: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  className?: string;
}

const sizeMap: Record<NonNullable<AvatarProps["size"]>, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 64,
  xl: 96,
};

const badgeSizeMap: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

function getInitials(alt: string, fallback?: string): string {
  if (fallback) return fallback.slice(0, 2).toUpperCase();
  return alt
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({
  src,
  alt,
  size = "md",
  fallback,
  isVerified = false,
  isOnline = false,
  className,
}: AvatarProps) {
  const px = sizeMap[size];
  const badgeClass = badgeSizeMap[size];

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      style={{ width: px, height: px }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={px}
          height={px}
          className="rounded-avatar object-cover w-full h-full"
        />
      ) : (
        <div
          className="rounded-avatar bg-surface-elevated text-text-tertiary flex items-center justify-center w-full h-full"
          style={{ fontSize: px * 0.35 }}
        >
          <span className="font-semibold leading-none">
            {getInitials(alt, fallback)}
          </span>
        </div>
      )}

      {/* Verified badge */}
      {isVerified && !isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0",
            "rounded-full bg-cyan flex items-center justify-center",
            "ring-2 ring-background",
            badgeClass
          )}
        >
          <Check size={px * 0.12} strokeWidth={3} className="text-background" />
        </span>
      )}

      {/* Online indicator */}
      {isOnline && (
        <span
          className={cn(
            "absolute bottom-0 right-0",
            "rounded-full bg-success",
            "ring-2 ring-background",
            badgeClass
          )}
        />
      )}
    </div>
  );
}

export default Avatar;
