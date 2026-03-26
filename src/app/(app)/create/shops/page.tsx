"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, MapPin, Star, Map, Navigation } from "lucide-react";

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
    hero: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fm=webp",
  },
  {
    id: "armorshield-pro",
    name: "ArmorShield Pro",
    city: "Brampton, ON",
    rating: 4.7,
    reviews: 156,
    badges: ["Zeno Certified", "XPEL Preferred"],
    services: ["PPF", "Wraps", "Tint", "Ceramic Coat"],
    priceRange: "$400–$600",
    nextAvailable: "Next Monday",
    hero: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&fm=webp",
  },
];

// ── Badge chip ─────────────────────────────────────────────────────────────────

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
      {isZeno ? "🏆 " : "✦ "}{label}
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
      className="rounded-[1.5rem] overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* Hero */}
      <div className="relative" style={{ height: 200, overflow: "hidden" }}>
        <img
          src={shop.hero}
          alt={shop.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5) 100%)",
          }}
        />
      </div>

      {/* Info */}
      <div className="px-4 pt-4 pb-5 space-y-3">
        {/* Name row */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-base"
            style={{
              background: "rgba(68,204,255,0.15)",
              color: "#44CCFF",
              border: "1.5px solid rgba(68,204,255,0.3)",
            }}
          >
            {shop.name[0]}
          </div>
          <div>
            <p className="font-display font-bold text-text-primary leading-tight">
              {shop.name}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star size={12} fill="#FBBF24" strokeWidth={0} className="text-yellow-400" />
              <span className="text-[13px] font-semibold text-text-primary">
                {shop.rating}
              </span>
              <span className="text-[12px] text-text-tertiary">
                · {shop.reviews} reviews · {shop.city}
              </span>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          {shop.badges.map((b) => (
            <Badge key={b} label={b} />
          ))}
        </div>

        {/* Services */}
        <p className="text-[13px] text-text-secondary">
          <span className="text-text-tertiary">Services: </span>
          {shop.services.join(" · ")}
        </p>

        {/* Price + availability */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-0.5">
              Est. for your build
            </p>
            <p className="text-[15px] font-bold text-cyan">{shop.priceRange}</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-0.5">
              Next available
            </p>
            <p className="text-[13px] text-text-primary">{shop.nextAvailable}</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onSelect}
          className="w-full font-display font-semibold text-[15px] rounded-2xl flex items-center justify-center gap-2 transition-opacity active:opacity-80"
          style={{
            height: 48,
            background: "linear-gradient(135deg, #44CCFF 0%, #0099CC 100%)",
            color: "#000",
            boxShadow: "0 4px 20px rgba(68,204,255,0.35)",
          }}
        >
          Select This Shop
          <span style={{ fontSize: 18 }}>→</span>
        </button>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ShopsPage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [mapView, setMapView] = useState(false);

  function handleSelectShop(shopId: string) {
    router.push(`/create/book?shop=${shopId}`);
  }

  return (
    <div className="min-h-screen pb-24" style={{ background: "var(--color-bg)" }}>
      {/* Header */}
      <header
        className="flex items-center gap-3 px-4 sticky top-0 z-20"
        style={{
          height: "3.5rem",
          background: "rgba(12,12,16,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-text-secondary"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="font-display font-bold text-text-primary flex-1 text-center tracking-wide uppercase text-[13px]">
          Find a Shop
        </span>
        <button
          onClick={() => setMapView((v) => !v)}
          className="w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
          style={{
            background: mapView ? "rgba(68,204,255,0.15)" : "transparent",
            color: mapView ? "#44CCFF" : "var(--color-text-tertiary)",
          }}
        >
          <Map size={18} />
        </button>
      </header>

      <div className="px-4 pt-5 space-y-5">
        {/* Build summary card */}
        <div
          className="rounded-2xl p-3 flex items-center gap-3"
          style={{
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&q=80&fm=webp"
            alt="Design preview"
            loading="lazy"
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-text-primary text-[14px] truncate">
              Midnight Fury — GT-R R35
            </p>
            <p className="text-[12px] text-text-tertiary mt-0.5">
              2022 Toyota GR86 · Full Wrap
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[10px] text-text-tertiary uppercase tracking-wider">
              Est. cost
            </p>
            <p className="text-[14px] font-bold text-cyan">$549–$949</p>
          </div>
        </div>

        {/* Location input */}
        <div className="space-y-2">
          <div
            className="flex items-center gap-3 px-4 rounded-2xl"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              height: 48,
            }}
          >
            <MapPin size={18} style={{ color: "#44CCFF", flexShrink: 0 }} />
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your city or postal code..."
              className="flex-1 bg-transparent outline-none text-[14px] text-text-primary placeholder:text-text-tertiary"
            />
          </div>
          <button
            className="flex items-center gap-1.5 text-[12px] text-cyan pl-1"
            onClick={() => setLocation("Mississauga, ON")}
          >
            <Navigation size={12} />
            Use my location
          </button>
        </div>

        {/* Results label */}
        <div className="flex items-center justify-between">
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider">
            Shops near you
          </p>
          <p className="text-[12px] text-text-tertiary">{SHOPS.length} found</p>
        </div>

        {/* Shop cards */}
        <div className="space-y-4">
          {SHOPS.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onSelect={() => handleSelectShop(shop.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
