"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// ── Mock data ──────────────────────────────────────────────────────────────────

const SHOPS = [
  {
    id: "wrapsbyalex",
    name: "WrapsbyAlex",
    city: "Mississauga, ON",
    rating: 4.9,
    reviews: 342,
    badges: ["Zeno Certified", "3M Preferred"],
    services: ["Wraps", "PPF", "Tint", "Chrome Delete"],
    priceRange: "$450–$650",
    nextAvailable: "Tomorrow, 10:00 AM",
    category: "wrap",
    hero: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=800&q=80&fm=webp",
  },
  {
    id: "carbonwerks-gta",
    name: "CarbonWerks GTA",
    city: "Toronto, ON",
    rating: 4.8,
    reviews: 218,
    badges: ["Zeno Certified"],
    services: ["Wraps", "PPF", "Carbon Fiber"],
    priceRange: "$500–$750",
    nextAvailable: "Friday, 2:00 PM",
    category: "wrap",
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
  },
  {
    id: "armorshield-pro",
    name: "ArmorShield Pro",
    city: "Brampton, ON",
    rating: 4.7,
    reviews: 156,
    badges: ["Zeno Certified", "XPEL Preferred"],
    services: ["PPF", "Wraps", "Tint"],
    priceRange: "$400–$600",
    nextAvailable: "Next Monday",
    category: "ppf",
    hero: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
  },
  {
    id: "tint-masters",
    name: "Tint Masters",
    city: "Oakville, ON",
    rating: 4.6,
    reviews: 89,
    badges: ["PPF Certified"],
    services: ["Tint", "PPF", "Nano Ceramic"],
    priceRange: "$200–$400",
    nextAvailable: "Today, 3:00 PM",
    category: "tint",
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
  },
  {
    id: "rimcity-custom",
    name: "RimCity Custom",
    city: "Vaughan, ON",
    rating: 4.8,
    reviews: 267,
    badges: ["Zeno Certified"],
    services: ["Wheels", "Suspension", "Spacers", "Coilovers"],
    priceRange: "$800–$2,000",
    nextAvailable: "Saturday, 11:00 AM",
    category: "wheels",
    hero: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80&fm=webp",
  },
  {
    id: "jdm-garage",
    name: "JDM Garage",
    city: "Scarborough, ON",
    rating: 4.5,
    reviews: 134,
    badges: ["Performance Certified"],
    services: ["Full Builds", "Performance", "Tuning", "Wraps"],
    priceRange: "$1,000–$5,000",
    nextAvailable: "Next Wednesday",
    category: "body",
    hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&fm=webp",
  },
];

const FILTER_CHIPS = [
  { label: "All", value: "all" },
  { label: "Wraps", value: "wrap" },
  { label: "PPF", value: "ppf" },
  { label: "Tint", value: "tint" },
  { label: "Wheels", value: "wheels" },
  { label: "Body Kits", value: "body" },
];

// ── Badge ──────────────────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  const isZeno = label.includes("Zeno");
  return (
    <span
      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
      style={{
        background: isZeno ? "rgba(68,204,255,0.12)" : "rgba(251,191,36,0.12)",
        color: isZeno ? "#44CCFF" : "#FBBF24",
        border: `1px solid ${isZeno ? "rgba(68,204,255,0.3)" : "rgba(251,191,36,0.3)"}`,
      }}
    >
      {label}
    </span>
  );
}

// ── Shop card ──────────────────────────────────────────────────────────────────

function ShopCard({
  shop,
  onSelect,
}: {
  shop: (typeof SHOPS)[0];
  onSelect: () => void;
}) {
  return (
    <div
      className="rounded-[1.5rem] overflow-hidden flex flex-col"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Hero */}
      <div className="relative" style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
        <img
          src={shop.hero}
          alt={shop.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="px-3 pt-3 pb-4 flex flex-col gap-2 flex-1">
        {/* Name + avatar */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-[12px] flex-shrink-0"
            style={{ background: "rgba(68,204,255,0.15)", color: "#44CCFF" }}
          >
            {shop.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary text-[13px] truncate">{shop.name}</p>
            <div className="flex items-center gap-1">
              <Star size={10} fill="#FBBF24" strokeWidth={0} />
              <span className="text-[11px] text-text-secondary">
                {shop.rating} · {shop.reviews} · {shop.city}
              </span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1">
          {shop.badges.slice(0, 2).map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[13px] font-bold text-cyan">{shop.priceRange}</span>
          <span className="text-[11px] text-text-tertiary">{shop.nextAvailable}</span>
        </div>

        {/* CTA */}
        <button
          onClick={onSelect}
          className="w-full rounded-xl font-semibold text-[13px] transition-opacity active:opacity-80"
          style={{
            height: 36,
            background: "linear-gradient(135deg, #44CCFF 0%, #0099CC 100%)",
            color: "#000",
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShopsDirectoryPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = SHOPS.filter((s) => {
    const matchesFilter = activeFilter === "all" || s.category === activeFilter;
    const matchesQuery =
      query === "" ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.city.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="min-h-screen pb-8" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <div className="px-4 pt-6 pb-4">
        <h1 className="font-display font-bold text-text-primary text-[22px] mb-1">
          Find a Shop
        </h1>
        <p className="text-[14px] text-text-secondary">
          Book your install with a certified installer near you
        </p>
      </div>

      {/* Search */}
      <div className="px-4 mb-4">
        <div
          className="flex items-center gap-3 px-4 rounded-2xl"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            height: 48,
          }}
        >
          <Search size={16} className="text-text-tertiary flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your city or postal code..."
            className="flex-1 bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-4 -mb-1">
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip.value;
          return (
            <button
              key={chip.value}
              onClick={() => setActiveFilter(chip.value)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all"
              style={{
                background: isActive ? "#44CCFF" : "var(--color-surface-elevated)",
                color: isActive ? "#000" : "var(--color-text-secondary)",
                border: isActive ? "none" : "1px solid var(--color-border)",
              }}
            >
              {chip.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="px-4 pt-2">
        <p className="text-[12px] text-text-tertiary mb-4">
          {filtered.length} shop{filtered.length !== 1 ? "s" : ""} found
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onSelect={() => router.push(`/create/book?shop=${shop.id}`)}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-secondary text-[15px] mb-2">No shops found</p>
            <button
              onClick={() => { setQuery(""); setActiveFilter("all"); }}
              className="text-cyan text-[14px]"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
