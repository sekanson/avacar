"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);

interface ProductTileProps {
  product: {
    id: string;
    name: string;
    brandName: string;
    thumbnailUrl: string;
    priceMin?: number;
    priceMax?: number;
    category: string;
    metadata: Record<string, unknown>;
  };
  selected?: boolean;
  onSelect: () => void;
  className?: string;
}

export function ProductTile({ product, selected = false, onSelect, className }: ProductTileProps) {
  const priceLabel =
    product.priceMin !== undefined && product.priceMax !== undefined
      ? product.priceMin === product.priceMax
        ? formatPrice(product.priceMin)
        : `${formatPrice(product.priceMin)} – ${formatPrice(product.priceMax)}`
      : null;

  const colorHex =
    product.category === "wrap" && typeof product.metadata?.color_hex === "string"
      ? product.metadata.color_hex
      : null;

  return (
    <motion.button
      onClick={onSelect}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full text-left bg-surface rounded-card border overflow-hidden",
        "transition-shadow duration-normal",
        selected
          ? "border-cyan shadow-glow-cyan"
          : "border-surface-border hover:border-surface-hover",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-square bg-surface-elevated">
        <Image
          src={product.thumbnailUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, 25vw"
        />
        {/* Selected checkmark */}
        {selected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-avatar bg-cyan flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-text-inverse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1">
        {/* Name + optional color dot */}
        <div className="flex items-center gap-1.5 min-w-0">
          {colorHex && (
            <span
              className="w-3 h-3 rounded-avatar flex-shrink-0 border border-surface-border"
              style={{ backgroundColor: colorHex }}
            />
          )}
          <p className="text-body-md font-medium text-text-primary line-clamp-1">{product.name}</p>
        </div>

        <p className="text-body-sm text-text-tertiary">{product.brandName}</p>

        {priceLabel && (
          <p className="text-body-sm text-cyan font-mono">{priceLabel}</p>
        )}
      </div>
    </motion.button>
  );
}
