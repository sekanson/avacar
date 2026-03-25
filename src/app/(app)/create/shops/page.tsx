"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockShops } from "@/lib/data/shops";
import type { Shop, ProductCategory } from "@/lib/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<ProductCategory, string> = {
  wrap: "Wrap",
  wheel: "Wheels",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessory: "Accessories",
};

const PRICE_TIER_LABELS: Record<number, string> = { 1: "$", 2: "$$", 3: "$$$" };

const TIER_COLORS: Record<string, string> = {
  standard: "#6B7280",
  certified: "#44CCFF",
  elite: "#FBBF24",
};

type SortMode = "closest" | "top-rated" | "best-value";

// ── Shop Logo Placeholder ─────────────────────────────────────────────────────

function ShopAvatar({ name, tier }: { name: string; tier: string }) {
  const color = TIER_COLORS[tier] ?? "#6B7280";
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-card"
      style={{
        width: 48,
        height: 48,
        background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
        border: `1.5px solid ${color}44`,
      }}
    >
      <span className="font-display font-bold text-display-xs" style={{ color }}>
        {name[0]}
      </span>
    </div>
  );
}

// ── Tier Badge ────────────────────────────────────────────────────────────────

function TierBadge({ tier }: { tier: string }) {
  const color = TIER_COLORS[tier] ?? "#6B7280";
  const label = tier.charAt(0).toUpperCase() + tier.slice(1);
  return (
    <span
      className="text-body-xs font-medium px-2 py-0.5 rounded-chip"
      style={{
        color,
        background: `${color}18`,
        border: `1px solid ${color}33`,
      }}
    >
      {label}
    </span>
  );
}

// ── Shop Card ─────────────────────────────────────────────────────────────────

function ShopCard({ shop, onClick }: { shop: Shop; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-card p-4 flex items-start gap-3 transition-colors active:bg-surface-hover"
      style={{
        background: "#14141A",
        border: "1px solid #2A2A36",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      <ShopAvatar name={shop.name} tier={shop.tier} />

      <div className="flex-1 min-w-0">
        {/* Name + tier + price */}
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="text-display-xs font-display text-text-primary leading-tight">
            {shop.name}
          </span>
          <TierBadge tier={shop.tier} />
          <span className="text-body-xs text-warning ml-auto flex-shrink-0">
            {PRICE_TIER_LABELS[shop.priceTier] ?? "$"}
          </span>
        </div>

        {/* Location + distance */}
        <div className="flex items-center gap-1 mb-1.5">
          <MapPin size={11} className="text-text-tertiary flex-shrink-0" />
          <span className="text-body-xs text-text-secondary truncate">
            {shop.city}, {shop.stateProvince} · {shop.distanceKm} km away
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star size={12} className="text-warning flex-shrink-0" fill="#FBBF24" strokeWidth={0} />
          <span className="text-data-sm text-text-primary">{shop.avgRating.toFixed(1)}</span>
          <span className="text-body-xs text-text-tertiary">({shop.reviewCount})</span>
        </div>

        {/* Service chips */}
        <div className="flex flex-wrap gap-1.5">
          {shop.services.slice(0, 4).map((svc) => (
            <span
              key={svc}
              className="text-body-xs text-text-tertiary px-2 py-0.5 rounded-chip"
              style={{ background: "#1C1C24", border: "1px solid #2A2A36" }}
            >
              {SERVICE_LABELS[svc] ?? svc}
            </span>
          ))}
          {shop.services.length > 4 && (
            <span className="text-body-xs text-text-tertiary">+{shop.services.length - 4}</span>
          )}
        </div>
      </div>

      <ChevronRight size={16} className="text-text-tertiary flex-shrink-0 mt-1" />
    </button>
  );
}

// ── Chip Selector ─────────────────────────────────────────────────────────────

function ChipSelector<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: T }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            "text-body-sm px-3 py-1.5 rounded-chip transition-colors flex-shrink-0",
            value === opt.value
              ? "bg-cyan-muted text-cyan border border-cyan"
              : "text-text-secondary border border-surface-border"
          )}
          style={value !== opt.value ? { background: "#1C1C24" } : undefined}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ── Map Placeholder ───────────────────────────────────────────────────────────

function MapPlaceholder() {
  return (
    <div
      className="relative rounded-card flex items-center justify-center overflow-hidden"
      style={{ height: 280, background: "#1C1C24", border: "1px solid #2A2A36" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, #2A2A36 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.7,
        }}
      />
      {/* Subtle radial fade */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #1C1C24 100%)",
        }}
      />
      {/* Center content */}
      <div className="relative flex flex-col items-center gap-2 text-center">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ background: "rgba(68,204,255,0.12)", border: "1px solid rgba(68,204,255,0.25)" }}
        >
          <MapPin size={22} className="text-cyan" />
        </div>
        <p className="text-body-sm text-text-secondary">Map view coming soon</p>
        <p className="text-body-xs text-text-tertiary">Showing shops near Los Angeles, CA</p>
      </div>
    </div>
  );
}

// ── Filter chips ──────────────────────────────────────────────────────────────

type RatingFilter = "all" | "4.5+";
type DistanceFilter = "all" | "close";
type PriceFilter = "all" | 1 | 2 | 3;

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShopsPage() {
  const router = useRouter();
  const [sortMode, setSortMode] = useState<SortMode>("closest");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("all");
  const [distanceFilter, setDistanceFilter] = useState<DistanceFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");

  const sortOptions: { label: string; value: SortMode }[] = [
    { label: "Closest", value: "closest" },
    { label: "Top Rated", value: "top-rated" },
    { label: "Best Value", value: "best-value" },
  ];

  const filtered = useMemo(() => {
    let shops = [...mockShops];

    if (ratingFilter === "4.5+") shops = shops.filter((s) => s.avgRating >= 4.5);
    if (distanceFilter === "close") shops = shops.filter((s) => (s.distanceKm ?? 0) <= 5);
    if (priceFilter !== "all") shops = shops.filter((s) => s.priceTier === priceFilter);

    if (sortMode === "closest") shops.sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0));
    else if (sortMode === "top-rated") shops.sort((a, b) => b.avgRating - a.avgRating);
    else if (sortMode === "best-value") shops.sort((a, b) => a.priceTier - b.priceTier);

    return shops;
  }, [sortMode, ratingFilter, distanceFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 sticky top-0 z-10"
        style={{
          height: "3.5rem",
          background: "rgba(12,12,16,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid #2A2A36",
        }}
      >
        <button
          onClick={() => router.push("/create/quote")}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          Find a Shop
        </span>
        <span className="text-body-xs text-text-tertiary">Los Angeles, CA</span>
      </header>

      <div className="px-4 pt-4 space-y-4">
        {/* Map placeholder */}
        <MapPlaceholder />

        {/* Sort */}
        <div>
          <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-2">Sort by</p>
          <div className="overflow-x-auto">
            <ChipSelector options={sortOptions} value={sortMode} onChange={setSortMode} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {/* Rating */}
          <button
            onClick={() => setRatingFilter(ratingFilter === "4.5+" ? "all" : "4.5+")}
            className={cn(
              "text-body-xs px-3 py-1.5 rounded-chip flex-shrink-0 transition-colors",
              ratingFilter === "4.5+"
                ? "bg-warning/20 text-warning border border-warning/40"
                : "text-text-tertiary border border-surface-border"
            )}
            style={ratingFilter !== "4.5+" ? { background: "#1C1C24" } : undefined}
          >
            ★ 4.5+
          </button>

          {/* Distance */}
          <button
            onClick={() => setDistanceFilter(distanceFilter === "close" ? "all" : "close")}
            className={cn(
              "text-body-xs px-3 py-1.5 rounded-chip flex-shrink-0 transition-colors",
              distanceFilter === "close"
                ? "bg-cyan-muted text-cyan border border-cyan/40"
                : "text-text-tertiary border border-surface-border"
            )}
            style={distanceFilter !== "close" ? { background: "#1C1C24" } : undefined}
          >
            {"<"} 5 km
          </button>

          {/* Price tiers */}
          {([1, 2, 3] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setPriceFilter(priceFilter === tier ? "all" : tier)}
              className={cn(
                "text-body-xs px-3 py-1.5 rounded-chip flex-shrink-0 transition-colors",
                priceFilter === tier
                  ? "bg-cyan-muted text-cyan border border-cyan/40"
                  : "text-text-tertiary border border-surface-border"
              )}
              style={priceFilter !== tier ? { background: "#1C1C24" } : undefined}
            >
              {PRICE_TIER_LABELS[tier]}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="flex items-center justify-between">
          <h2 className="text-display-sm font-display text-text-primary">Shops Near You</h2>
          <span className="text-body-xs text-text-tertiary">{filtered.length} found</span>
        </div>

        {/* Shop list */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-16 gap-3 text-center">
            <p className="text-body-md text-text-secondary">No shops match your filters.</p>
            <button
              onClick={() => {
                setRatingFilter("all");
                setDistanceFilter("all");
                setPriceFilter("all");
              }}
              className="text-body-sm text-cyan"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((shop) => (
              <ShopCard
                key={shop.id}
                shop={shop}
                onClick={() => router.push(`/create/shop/${shop.slug}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
