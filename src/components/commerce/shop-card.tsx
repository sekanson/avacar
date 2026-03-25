import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const CATEGORY_LABEL: Record<string, string> = {
  wrap: "Wrap",
  wheel: "Wheel",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessory: "Accessory",
};

const CATEGORY_COLOR: Record<string, string> = {
  wrap:      "bg-category-wrap/15 text-category-wrap",
  wheel:     "bg-category-wheel/15 text-category-wheel",
  tint:      "bg-category-tint/15 text-category-tint",
  ppf:       "bg-category-ppf/15 text-category-ppf",
  bodykit:   "bg-category-bodykit/15 text-category-bodykit",
  accessory: "bg-category-accessory/15 text-category-accessory",
};

const TIER_BADGE: Record<string, string> = {
  standard: "bg-tier-standard/15 text-tier-standard",
  certified: "bg-tier-certified/15 text-tier-certified",
  elite: "bg-tier-elite/15 text-tier-elite",
};

const TIER_LABEL: Record<string, string> = {
  standard: "Standard",
  certified: "Certified",
  elite: "Elite",
};

function PriceTier({ tier }: { tier: number }) {
  return (
    <span className="text-body-xs font-mono text-text-tertiary">
      {"$".repeat(Math.min(tier, 4))}
      <span className="text-surface-border">{"$".repeat(Math.max(0, 4 - tier))}</span>
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3",
            i < Math.round(rating) ? "text-warning fill-warning" : "text-surface-border fill-surface-border"
          )}
        />
      ))}
    </div>
  );
}

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    city: string;
    stateProvince: string;
    distanceKm?: number;
    avgRating: number;
    reviewCount: number;
    priceTier: number;
    tier: string;
    services: string[];
  };
  onPress: () => void;
  className?: string;
}

export function ShopCard({ shop, onPress, className }: ShopCardProps) {
  const initials = shop.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const distanceLabel =
    shop.distanceKm !== undefined
      ? shop.distanceKm < 1
        ? `${Math.round(shop.distanceKm * 1000)} m`
        : `${shop.distanceKm.toFixed(1)} km`
      : null;

  return (
    <button
      onClick={onPress}
      className={cn(
        "w-full text-left flex items-start gap-4 p-4 bg-surface rounded-card border border-surface-border",
        "hover:border-surface-hover hover:bg-surface-hover active:scale-[0.98]",
        "transition-all duration-fast",
        className
      )}
    >
      {/* Logo */}
      <div className="relative w-12 h-12 rounded-image overflow-hidden flex-shrink-0 bg-surface-elevated">
        {shop.logoUrl ? (
          <Image
            src={shop.logoUrl}
            alt={shop.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-muted to-surface-elevated text-cyan text-body-md font-medium">
            {initials}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        {/* Row 1: name + tier badge */}
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-body-md font-medium text-text-primary truncate">{shop.name}</p>
          <span
            className={cn(
              "flex-shrink-0 px-2 py-0.5 rounded-chip text-body-xs font-medium",
              TIER_BADGE[shop.tier] ?? "bg-surface-elevated text-text-secondary"
            )}
          >
            {TIER_LABEL[shop.tier] ?? shop.tier}
          </span>
        </div>

        {/* Row 2: location + distance */}
        <div className="flex items-center gap-1 text-body-sm text-text-secondary">
          <MapPin className="w-3 h-3 flex-shrink-0 text-text-tertiary" />
          <span>{shop.city}, {shop.stateProvince}</span>
          {distanceLabel && (
            <>
              <span className="text-text-tertiary">·</span>
              <span>{distanceLabel}</span>
            </>
          )}
        </div>

        {/* Row 3: stars + review count + price tier */}
        <div className="flex items-center gap-2">
          <StarRating rating={shop.avgRating} />
          <span className="text-body-xs text-text-tertiary">
            ({shop.reviewCount.toLocaleString()})
          </span>
          <span className="text-text-tertiary">·</span>
          <PriceTier tier={shop.priceTier} />
        </div>

        {/* Row 4: service chips */}
        {shop.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {shop.services.slice(0, 5).map((svc) => (
              <span
                key={svc}
                className={cn(
                  "px-2 py-0.5 rounded-chip text-body-xs",
                  CATEGORY_COLOR[svc] ?? "bg-surface-elevated text-text-secondary"
                )}
              >
                {CATEGORY_LABEL[svc] ?? svc}
              </span>
            ))}
            {shop.services.length > 5 && (
              <span className="px-2 py-0.5 rounded-chip text-body-xs bg-surface-elevated text-text-tertiary">
                +{shop.services.length - 5}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}
