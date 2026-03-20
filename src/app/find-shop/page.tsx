"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, MapPin, ArrowRight } from "lucide-react";
import { shops } from "@/data/products";
import type { Shop, ProductCategory } from "@/types";

const PRICE_TIER_LABELS: Record<1 | 2 | 3, string> = { 1: "$", 2: "$$", 3: "$$$" };

const SPECIALTY_LABELS: Record<ProductCategory, string> = {
  wrap: "Wrap",
  wheels: "Wheels",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessories: "Accessories",
};

// ─── Step Bar ────────────────────────────────────────────────────────────────

function StepBar() {
  const steps: { label: string; state: string }[] = [
    { label: "Design", state: "done" },
    { label: "Quote", state: "done" },
    { label: "Book", state: "active" },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
      {steps.map((step, idx) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {idx > 0 && <div style={{ flex: 1, height: 2, background: step.state !== "future" ? "var(--success)" : "var(--surface-high)", borderRadius: 1 }} />}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: step.state === "done" ? "var(--success)" : step.state === "active" ? "var(--primary)" : "var(--surface-high)" }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.state === "done" ? "var(--success)" : step.state === "active" ? "var(--primary)" : "var(--muted)", whiteSpace: "nowrap" }}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step.state === "done" ? "var(--success)" : "var(--surface-high)", borderRadius: 1 }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Filter Chips ────────────────────────────────────────────────────────────

type RatingFilter = "all" | "4.5+";
type DistanceFilter = "all" | "5mi";
type PriceFilter = "all" | 1 | 2 | 3;

interface FilterState {
  rating: RatingFilter;
  distance: DistanceFilter;
  price: PriceFilter;
}

function FilterStrip({ filters, onChange }: { filters: FilterState; onChange: (f: FilterState) => void }) {
  return (
    <div style={{ display: "flex", gap: 8, padding: "0 20px", overflowX: "auto" }}>
      <button className={`chip ${filters.rating === "4.5+" ? "active" : ""}`} onClick={() => onChange({ ...filters, rating: filters.rating === "4.5+" ? "all" : "4.5+" })}>
        4.5+
      </button>
      <button className={`chip ${filters.distance === "5mi" ? "active" : ""}`} onClick={() => onChange({ ...filters, distance: filters.distance === "5mi" ? "all" : "5mi" })}>
        &lt; 5 mi
      </button>
      {([1, 2, 3] as const).map((tier) => (
        <button key={tier} className={`chip ${filters.price === tier ? "active" : ""}`} onClick={() => onChange({ ...filters, price: filters.price === tier ? "all" : tier })}>
          {PRICE_TIER_LABELS[tier]}
        </button>
      ))}
    </div>
  );
}

// ─── Shop Card ────────────────────────────────────────────────────────────────

function ShopCard({ shop, onClick }: { shop: Shop; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--surface-card)",
        borderRadius: 14,
        padding: 16,
        boxShadow: "var(--shadow-card)",
        cursor: "pointer",
        display: "flex",
        gap: 14,
        transition: "box-shadow 0.15s",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "var(--primary-alpha-08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--primary)" }}>{shop.name[0]}</span>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>{shop.name}</span>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
            <span style={{ fontSize: 13, color: "var(--warning)", fontWeight: 600 }}>{PRICE_TIER_LABELS[shop.priceTier]}</span>
            <ArrowRight size={14} style={{ color: "var(--outline)" }} strokeWidth={2} />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
          <MapPin size={11} style={{ color: "var(--muted)" }} strokeWidth={1.8} />
          <span style={{ fontSize: 11, color: "var(--muted)" }}>{shop.address}, {shop.city} - {shop.distance} mi</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
          <Star size={12} style={{ color: "var(--warning)" }} fill="var(--warning)" strokeWidth={0} />
          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>{shop.rating}</span>
          <span style={{ fontSize: 11, color: "var(--muted)" }}>({shop.reviewCount} reviews)</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
          {shop.specialties.slice(0, 3).map((spec) => (
            <span
              key={spec}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "var(--on-surface-variant)",
                background: "var(--surface-low)",
                borderRadius: 5,
                padding: "2px 8px",
              }}
            >
              {SPECIALTY_LABELS[spec]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Find Shop Page ──────────────────────────────────────────────────────────

export default function FindShopPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({ rating: "all", distance: "all", price: "all" });

  const filteredShops = useMemo(() => {
    return shops.filter((s) => {
      if (filters.rating === "4.5+" && s.rating < 4.5) return false;
      if (filters.distance === "5mi" && s.distance > 5) return false;
      if (filters.price !== "all" && s.priceTier !== filters.price) return false;
      return true;
    });
  }, [filters]);

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 100 }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--ghost-border)" }}>
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>Find a Shop</h1>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 1 }}>Los Angeles, CA</p>
        </div>
      </div>

      <StepBar />

      {/* Filters */}
      <div style={{ paddingTop: 8, paddingBottom: 12 }}>
        <FilterStrip filters={filters} onChange={setFilters} />
      </div>

      {/* Results count */}
      <div style={{ padding: "0 20px", marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontSize: 13, color: "var(--muted)" }}>
          {filteredShops.length} shop{filteredShops.length !== 1 ? "s" : ""} found
        </span>
        <span style={{ fontSize: 12, color: "var(--muted)" }}>Sorted by distance</span>
      </div>

      {/* Shop list */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredShops.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--muted)", fontSize: 14 }}>
            No shops match your filters.
            <br />
            <button
              onClick={() => setFilters({ rating: "all", distance: "all", price: "all" })}
              style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, marginTop: 8, background: "none", border: "none", cursor: "pointer" }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          filteredShops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} onClick={() => router.push(`/shop/${shop.id}`)} />
          ))
        )}
      </div>
    </div>
  );
}
