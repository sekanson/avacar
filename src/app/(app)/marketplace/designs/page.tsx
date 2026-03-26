"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Star } from "lucide-react";

/* ─── Data ─── */
const DESIGNS = [
  { slug: "midnight-fury",  name: "Midnight Fury",  car: "GT-R R35",         seller: "@wraplord",        price: 149, rating: 4.9, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "carbon-stealth", name: "Carbon Stealth", car: "M4 Comp",          seller: "@graphicflow",     price: 199, rating: 4.8, img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "neon-circuit",   name: "Neon Circuit",   car: "Civic Type R",     seller: "@jdm.wraps",       price: 89,  rating: 4.7, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "arctic-storm",   name: "Arctic Storm",   car: "RS6 Avant",        seller: "@eurostyle",       price: 249, rating: 5.0, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "tokyo-drift",    name: "Tokyo Drift",    car: "Supra A90",        seller: "@drift.kings",     price: 179, rating: 4.6, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "venom-strike",   name: "Venom Strike",   car: "Corvette C8",      seller: "@ameri.wraps",     price: 159, rating: 4.5, img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "phantom-edge",   name: "Phantom Edge",   car: "Audi RS7",         seller: "@darkside.design", price: 219, rating: 4.9, img: "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "solar-flare",    name: "Solar Flare",    car: "Porsche 911",      seller: "@sunburn.studio",  price: 299, rating: 4.8, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "cherry-bomb",    name: "Cherry Bomb",    car: "Dodge Charger",    seller: "@muscle.wraps",    price: 129, rating: 4.4, img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "ice-queen",      name: "Ice Queen",      car: "Tesla Model 3",    seller: "@ev.wraps",        price: 99,  rating: 4.7, img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "samurai",        name: "Samurai",        car: "Nissan Z",         seller: "@jdm.wraps",       price: 189, rating: 4.8, img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=267&fit=crop&q=70&fm=webp" },
  { slug: "spectre",        name: "Spectre",        car: "McLaren 720S",     seller: "@hyper.design",    price: 349, rating: 5.0, img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=267&fit=crop&q=70&fm=webp" },
];

const STYLE_FILTERS = ["Racing", "Street", "JDM", "Euro", "Commercial", "Minimal", "Abstract"];
const PRICE_FILTERS  = ["Free", "Under $100", "$100–$200", "$200+"];
const SORT_OPTIONS   = ["Most Popular", "Newest", "Highest Rated"];
const COLOR_SWATCHES = [
  { label: "Black",  hex: "#111" },
  { label: "White",  hex: "#f5f5f5" },
  { label: "Red",    hex: "#e03" },
  { label: "Blue",   hex: "#06f" },
  { label: "Green",  hex: "#0a0" },
  { label: "Yellow", hex: "#fc0" },
  { label: "Orange", hex: "#f70" },
  { label: "Purple", hex: "#80f" },
];

/* ─── Mode Tabs ─── */
const MODE_TABS = [
  { id: "designs",  label: "Designs",  href: "/marketplace/designs" },
  { id: "products", label: "Products", href: "/marketplace/products" },
  { id: "shops",    label: "Shops",    href: "/marketplace/shops" },
  { id: "training", label: "Training", href: "/marketplace/training" },
];

/* ─── Design Card ─── */
function DesignCard({ design }: { design: typeof DESIGNS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/marketplace/designs/${design.slug}`}
      style={{
        background: "var(--color-surface)",
        borderRadius: 24,
        overflow: "hidden",
        textDecoration: "none",
        display: "block",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "3/2", overflow: "hidden" }}>
        <img
          src={design.img}
          alt={design.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Rating badge */}
        <div
          style={{
            position: "absolute", top: 10, right: 10,
            background: "rgba(0,0,0,0.65)", backdropFilter: "blur(8px)",
            borderRadius: 100, padding: "3px 8px",
            fontSize: 11, fontWeight: 700, color: "#fff",
          }}
        >
          ★ {design.rating}
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(2px)",
            }}
          >
            <span
              style={{
                fontSize: 13, fontWeight: 700, color: "#44CCFF",
                background: "rgba(0,0,0,0.8)", padding: "8px 18px",
                borderRadius: 100, border: "1px solid #44CCFF44",
                display: "flex", alignItems: "center", gap: 5,
              }}
            >
              <Sparkles size={13} /> Try On My Car
            </span>
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: "12px 14px 14px" }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
          {design.name} — {design.car}
        </p>
        <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", marginTop: 3 }}>by {design.seller}</p>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF", marginTop: 6 }}>From ${design.price} installed</p>
        <p style={{ fontSize: 12, color: "#44CCFF", marginTop: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}><Sparkles size={11} /> Try On My Car</p>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
export default function DesignsBrowsePage() {
  const router = useRouter();
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedColor,  setSelectedColor]  = useState<string | null>(null);
  const [selectedPrice,  setSelectedPrice]  = useState<string | null>(null);
  const [selectedSort,   setSelectedSort]   = useState("Most Popular");
  const [mobileChip,     setMobileChip]     = useState("All");

  const toggleStyle = (s: string) =>
    setSelectedStyles((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const resetFilters = () => {
    setSelectedStyles([]);
    setSelectedColor(null);
    setSelectedPrice(null);
    setSelectedSort("Most Popular");
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", paddingBottom: 100 }}>

      {/* ── Mode Tabs ── */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 20px",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {MODE_TABS.map((tab) => {
          const isActive = tab.id === "designs";
          return (
            <Link
              key={tab.id}
              href={tab.href}
              style={{
                flexShrink: 0, padding: "14px 18px",
                fontSize: 14, fontWeight: 600,
                color: isActive ? "#44CCFF" : "var(--color-text-tertiary)",
                textDecoration: "none",
                borderBottom: isActive ? "2px solid #44CCFF" : "2px solid transparent",
                transition: "all 0.15s",
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      {/* ── Mobile filter chips ── */}
      <div className="mobile-only-chrome" style={{ padding: "12px 0 0" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 4px" }}>
          {["All", ...STYLE_FILTERS].map((chip) => (
            <button
              key={chip}
              onClick={() => setMobileChip(chip)}
              style={{
                flexShrink: 0, padding: "7px 16px", borderRadius: 100,
                fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer",
                background: mobileChip === chip ? "#44CCFF" : "var(--color-surface)",
                color: mobileChip === chip ? "#0C0C10" : "var(--color-text-secondary)",
                transition: "all 0.15s",
              }}
            >
              {chip}
            </button>
          ))}
          <button
            style={{
              flexShrink: 0, padding: "7px 16px", borderRadius: 100,
              fontSize: 13, fontWeight: 600, border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "var(--color-text-secondary)", cursor: "pointer",
            }}
          >
            Filters ⋯
          </button>
        </div>
      </div>

      {/* ── Body: sidebar + grid ── */}
      <div
        style={{
          display: "flex",
          gap: 24,
          padding: "20px 20px 0",
          alignItems: "flex-start",
        }}
      >
        {/* Filter Sidebar — desktop only */}
        <aside
          className="desktop-only-chrome"
          style={{
            width: 240,
            flexShrink: 0,
            flexDirection: "column",
            background: "var(--color-surface)",
            borderRadius: 16,
            padding: "20px",
            position: "sticky",
            top: 80,
          }}
        >
          {/* Style */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Style
            </p>
            {STYLE_FILTERS.map((s) => (
              <label
                key={s}
                style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, cursor: "pointer" }}
              >
                <input
                  type="checkbox"
                  checked={selectedStyles.includes(s)}
                  onChange={() => toggleStyle(s)}
                  style={{ accentColor: "#44CCFF" }}
                />
                <span style={{ fontSize: 13, color: selectedStyles.includes(s) ? "#44CCFF" : "var(--color-text-secondary)" }}>
                  {s}
                </span>
              </label>
            ))}
          </div>

          {/* Vehicle */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Vehicle
            </p>
            {["Year", "Make", "Model"].map((field) => (
              <select
                key={field}
                style={{
                  width: "100%", marginBottom: 8, padding: "8px 10px",
                  borderRadius: 8, border: "none",
                  background: "var(--color-surface-elevated)",
                  color: "var(--color-text-secondary)",
                  fontSize: 13, outline: "none", cursor: "pointer",
                }}
              >
                <option value="">{field}</option>
              </select>
            ))}
          </div>

          {/* Color */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Color
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {COLOR_SWATCHES.map((c) => (
                <button
                  key={c.label}
                  onClick={() => setSelectedColor(selectedColor === c.label ? null : c.label)}
                  title={c.label}
                  style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: c.hex, border: "none", cursor: "pointer",
                    outline: selectedColor === c.label ? "2px solid #44CCFF" : "none",
                    outlineOffset: 2,
                    transition: "outline 0.15s",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Price
            </p>
            {PRICE_FILTERS.map((p) => (
              <label key={p} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, cursor: "pointer" }}>
                <input
                  type="radio"
                  name="price"
                  checked={selectedPrice === p}
                  onChange={() => setSelectedPrice(p)}
                  style={{ accentColor: "#44CCFF" }}
                />
                <span style={{ fontSize: 13, color: selectedPrice === p ? "#44CCFF" : "var(--color-text-secondary)" }}>
                  {p}
                </span>
              </label>
            ))}
          </div>

          {/* Sort */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Sort
            </p>
            {SORT_OPTIONS.map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, cursor: "pointer" }}>
                <input
                  type="radio"
                  name="sort"
                  checked={selectedSort === s}
                  onChange={() => setSelectedSort(s)}
                  style={{ accentColor: "#44CCFF" }}
                />
                <span style={{ fontSize: 13, color: selectedSort === s ? "#44CCFF" : "var(--color-text-secondary)" }}>
                  {s}
                </span>
              </label>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={resetFilters}
            style={{
              width: "100%", padding: "9px", borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "transparent", color: "var(--color-text-secondary)",
              fontSize: 13, fontWeight: 600, cursor: "pointer",
            }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Grid column */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", letterSpacing: "0.05em" }}>
              RESULTS <span style={{ color: "#44CCFF" }}>204</span>
            </p>
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              style={{
                padding: "6px 12px", borderRadius: 8, border: "none",
                background: "var(--color-surface)",
                color: "var(--color-text-secondary)",
                fontSize: 13, outline: "none", cursor: "pointer",
              }}
            >
              {SORT_OPTIONS.map((s) => <option key={s} value={s}>Sort by: {s}</option>)}
            </select>
          </div>

          {/* Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {DESIGNS.map((design, idx) => (
              <div key={design.slug} style={{ position: "relative" }}>
                {idx === 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 10,
                      background: "rgba(239,159,39,0.15)",
                      color: "#EF9F27",
                      fontSize: 10,
                      fontWeight: 700,
                      borderRadius: 999,
                      padding: "2px 8px",
                    display: "flex", alignItems: "center", gap: 4,
                    }}
                  >
                    <Star size={10} fill="#EF9F27" /> Featured
                  </div>
                )}
                <DesignCard design={design} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Floating Upload Button */}
      <button
        onClick={() => router.push("/marketplace/upload")}
        aria-label="Upload design"
        style={{
          position: "fixed",
          bottom: 88,
          right: 20,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #44CCFF, #007FFF)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 0 20px rgba(68,204,255,0.5), 0 4px 16px rgba(0,0,0,0.4)",
          zIndex: 50,
          fontSize: 26,
          color: "#fff",
          fontWeight: 300,
          lineHeight: 1,
        }}
      >
        +
      </button>
    </div>
  );
}
