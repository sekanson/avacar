"use client";

import { useParams, useRouter } from "next/navigation";
import { MapPin, Phone, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { mockShops, mockReviews } from "@/lib/data/shops";
import type { ProductCategory } from "@/lib/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const SERVICE_LABELS: Record<ProductCategory, string> = {
  wrap: "Wrap",
  wheel: "Wheels",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessory: "Accessories",
};

const SERVICE_COLORS: Record<ProductCategory, string> = {
  wrap: "#44CCFF",
  wheel: "#A78BFA",
  tint: "#6B7280",
  ppf: "#34D399",
  bodykit: "#F97316",
  accessory: "#EC4899",
};

const TIER_COLORS: Record<string, string> = {
  standard: "#6B7280",
  certified: "#44CCFF",
  elite: "#FBBF24",
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          fill={i <= rating ? "#FBBF24" : "none"}
          className={i <= rating ? "text-warning" : "text-text-tertiary"}
          strokeWidth={i <= rating ? 0 : 1.5}
        />
      ))}
    </div>
  );
}

function InfoCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-card p-4 space-y-3"
      style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
    >
      {children}
    </div>
  );
}

function PortfolioPlaceholder({ index }: { index: number }) {
  const gradients = [
    "linear-gradient(135deg, #44CCFF22 0%, #A78BFA22 100%)",
    "linear-gradient(135deg, #F9731622 0%, #FBBF2422 100%)",
    "linear-gradient(135deg, #34D39922 0%, #44CCFF22 100%)",
  ];
  return (
    <div
      className="rounded-card flex items-center justify-center"
      style={{
        height: 120,
        background: gradients[index % gradients.length],
        border: "1px solid var(--color-border)",
      }}
    >
      <span className="text-body-xs text-text-tertiary">Photo {index + 1}</span>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShopProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const shop = mockShops.find((s) => s.slug === slug) ?? mockShops[0];
  const tierColor = TIER_COLORS[shop.tier] ?? "#6B7280";
  const tierLabel = shop.tier.charAt(0).toUpperCase() + shop.tier.slice(1);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 sticky top-0 z-10"
        style={{
          height: "3.5rem",
          background: "rgba(12,12,16,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1 truncate">
          {shop.name}
        </span>
      </header>

      {/* Cover gradient */}
      <div
        className="h-48 w-full"
        style={{
          background: `linear-gradient(135deg, ${tierColor}18 0%, var(--color-surface-elevated) 60%, var(--color-surface) 100%)`,
        }}
      />

      {/* Shop identity */}
      <div className="px-4 -mt-8 mb-4">
        {/* Avatar overlapping cover */}
        <div
          className="w-16 h-16 rounded-card flex items-center justify-center mb-3"
          style={{
            background: `linear-gradient(135deg, ${tierColor}33 0%, ${tierColor}11 100%)`,
            border: `2px solid ${tierColor}55`,
            boxShadow: `0 4px 16px ${tierColor}22`,
          }}
        >
          <span className="text-display-md font-display font-bold" style={{ color: tierColor }}>
            {shop.name[0]}
          </span>
        </div>

        <h1 className="text-display-md font-display text-text-primary mb-1">{shop.name}</h1>

        {/* Tier badge */}
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span
            className="text-body-sm font-medium px-3 py-0.5 rounded-chip"
            style={{
              color: tierColor,
              background: `${tierColor}18`,
              border: `1px solid ${tierColor}44`,
            }}
          >
            {tierLabel}
          </span>
          <div className="flex items-center gap-1">
            <Star size={13} fill="#FBBF24" className="text-warning" strokeWidth={0} />
            <span className="text-data-sm text-text-primary">{shop.avgRating.toFixed(1)}</span>
            <span className="text-body-xs text-text-tertiary">({shop.reviewCount} reviews)</span>
          </div>
          {shop.distanceKm !== undefined && (
            <span className="text-body-xs text-text-secondary">{shop.distanceKm} km away</span>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4">
        {/* Address & Phone */}
        <InfoCard>
          {/* Address */}
          <div className="flex items-start gap-3">
            <div
              className="w-8 h-8 rounded-button flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(68,204,255,0.1)" }}
            >
              <MapPin size={15} className="text-cyan" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm text-text-primary">{shop.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(shop.address ?? "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-body-xs text-cyan mt-0.5 inline-flex items-center gap-1"
              >
                Get Directions
                <ChevronRight size={11} />
              </a>
            </div>
          </div>

          {/* Phone */}
          {shop.phone && (
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-button flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(68,204,255,0.1)" }}
              >
                <Phone size={15} className="text-cyan" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-body-sm text-text-primary">{shop.phone}</p>
                <a href={`tel:${shop.phone}`} className="text-body-xs text-cyan mt-0.5 inline-block">
                  Call Now
                </a>
              </div>
            </div>
          )}

          {/* Hours */}
          {shop.hours && shop.hours.length > 0 && (
            <div className="flex items-start gap-3">
              <div
                className="w-8 h-8 rounded-button flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(68,204,255,0.1)" }}
              >
                <Clock size={15} className="text-cyan" />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                {shop.hours.map((h) => (
                  <div key={h.day} className="flex items-center justify-between">
                    <span className="text-body-xs text-text-secondary">{h.day}</span>
                    <span
                      className={cn(
                        "text-body-xs",
                        h.hours === "Closed" ? "text-error" : "text-text-primary"
                      )}
                    >
                      {h.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </InfoCard>

        {/* Services */}
        <div>
          <h2 className="text-display-xs font-display text-text-primary mb-3">Services</h2>
          <div className="flex flex-wrap gap-2">
            {shop.services.map((svc) => {
              const color = SERVICE_COLORS[svc] ?? "#6B7280";
              return (
                <span
                  key={svc}
                  className="text-body-sm px-3 py-1.5 rounded-chip"
                  style={{
                    color,
                    background: `${color}18`,
                    border: `1px solid ${color}33`,
                  }}
                >
                  {SERVICE_LABELS[svc] ?? svc}
                </span>
              );
            })}
          </div>
        </div>

        {/* About */}
        {shop.about && (
          <div>
            <h2 className="text-display-xs font-display text-text-primary mb-2">About</h2>
            <p className="text-body-md text-text-secondary leading-relaxed">{shop.about}</p>
          </div>
        )}

        {/* Portfolio */}
        <div>
          <h2 className="text-display-xs font-display text-text-primary mb-3">Portfolio</h2>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <PortfolioPlaceholder key={i} index={i} />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-display-xs font-display text-text-primary">Reviews</h2>
            <div className="flex items-center gap-1">
              <Star size={14} fill="#FBBF24" className="text-warning" strokeWidth={0} />
              <span className="text-data-sm text-text-primary">{shop.avgRating.toFixed(1)}</span>
              <span className="text-body-xs text-text-tertiary">· {shop.reviewCount} total</span>
            </div>
          </div>

          <div className="space-y-3">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-card p-4"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
              >
                <div className="flex items-start gap-3 mb-2">
                  {/* Avatar initial */}
                  <div
                    className="w-8 h-8 rounded-avatar flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(68,204,255,0.12)" }}
                  >
                    <span className="text-body-xs font-bold text-cyan">
                      {review.author.name[0]}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-body-sm font-medium text-text-primary">
                        {review.author.name}
                      </span>
                      <span className="text-body-xs text-text-tertiary">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                </div>

                <p className="text-body-sm text-text-secondary mb-2">{review.text}</p>

                {review.vehicleInfo && (
                  <p className="text-body-xs text-text-tertiary">{review.vehicleInfo}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 px-4 py-3 z-20"
        style={{
          background: "rgba(12,12,16,0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--color-border)",
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={() => router.push(`/create/book?shop=${shop.slug}`)}
          className="w-full flex items-center justify-center gap-2 font-display font-semibold text-text-inverse rounded-button transition-colors active:opacity-90"
          style={{
            height: 52,
            background: "#44CCFF",
            boxShadow: "0 0 24px rgba(68,204,255,0.35)",
          }}
        >
          Book Installation
          <ChevronRight size={18} className="text-text-inverse" />
        </button>
      </div>
    </div>
  );
}
