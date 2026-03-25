"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ArrowRight,
  Download,
  Edit3,
  Tag,
  Circle,
  Paintbrush,
  Sun,
  Shield,
  Wrench,
  Sparkles,
} from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";
import { cn } from "@/lib/utils/cn";
import type { ProductCategory } from "@/lib/types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCents(cents: number): string {
  const d = cents / 100;
  if (d >= 1000) return `$${(d / 1000).toFixed(d % 1000 === 0 ? 0 : 1)}k`;
  return `$${d.toFixed(0)}`;
}

function categoryIcon(cat: ProductCategory) {
  const props = { size: 16 };
  switch (cat) {
    case "wrap":      return <Paintbrush {...props} />;
    case "wheel":     return <Circle {...props} />;
    case "tint":      return <Sun {...props} />;
    case "ppf":       return <Shield {...props} />;
    case "bodykit":   return <Wrench {...props} />;
    case "accessory": return <Sparkles {...props} />;
  }
}

const CATEGORY_COLORS: Record<ProductCategory, string> = {
  wrap:      "#44CCFF",
  wheel:     "#A78BFA",
  tint:      "#6B7280",
  ppf:       "#34D399",
  bodykit:   "#F97316",
  accessory: "#EC4899",
};

// ─── Before/After Slider ──────────────────────────────────────────────────────

function BeforeAfterSlider({ renderUrl }: { renderUrl: string | null }) {
  const [position, setPosition] = useState(50);

  return (
    <div
      className="w-full rounded-card overflow-hidden relative select-none"
      style={{ aspectRatio: "16/9", cursor: "ew-resize" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setPosition(Math.max(5, Math.min(95, x)));
      }}
      onTouchMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
        setPosition(Math.max(5, Math.min(95, x)));
      }}
    >
      {/* "After" layer (full) */}
      {renderUrl ? (
        <img
          src={renderUrl}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)",
          }}
        />
      )}

      {/* "Before" layer (clipped to left) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #1C1C24 0%, #14141A 100%)",
            minWidth: "100vw",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(68,204,255,0.2)"
              strokeWidth="1"
            >
              <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M7 17h10" />
            </svg>
          </div>
        </div>
      </div>

      {/* Divider handle */}
      <div
        className="absolute top-0 bottom-0 flex items-center justify-center"
        style={{ left: `${position}%`, transform: "translateX(-50%)", zIndex: 10 }}
      >
        <div
          style={{
            width: 2,
            height: "100%",
            background: "rgba(255,255,255,0.6)",
            position: "absolute",
          }}
        />
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            zIndex: 1,
            position: "relative",
            flexShrink: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 7H1M10 7h3M4 7L2 5M4 7L2 9M10 7l2-2M10 7l2 2" stroke="#0C0C10" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <span
        className="absolute bottom-3 left-3 text-body-xs font-medium px-2 py-0.5 rounded-chip"
        style={{ background: "rgba(0,0,0,0.6)", color: "#A0A0B0" }}
      >
        Before
      </span>
      <span
        className="absolute bottom-3 right-3 text-body-xs font-medium px-2 py-0.5 rounded-chip"
        style={{ background: "rgba(68,204,255,0.2)", color: "#44CCFF" }}
      >
        After
      </span>
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────

function Toast({ message, onDone }: { message: string; onDone: () => void }) {
  useState(() => { setTimeout(onDone, 3000); });
  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-card text-body-sm font-medium text-text-primary animate-slide-up"
      style={{ background: "#1C1C24", border: "1px solid #2A2A36", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", whiteSpace: "nowrap" }}
    >
      {message}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function QuotePage() {
  const router = useRouter();
  const { currentBuild, renderUrl } = useBuildStore();
  const [toast, setToast] = useState<string | null>(null);

  const items = Object.values(currentBuild.items).filter(Boolean);

  const subtotalMin = items.reduce((s, i) => s + (i?.product.priceMin ?? 0), 0);
  const subtotalMax = items.reduce((s, i) => s + (i?.product.priceMax ?? 0), 0);
  const TAX_RATE = 0.08;
  const taxMin = Math.round(subtotalMin * TAX_RATE);
  const taxMax = Math.round(subtotalMax * TAX_RATE);
  const totalMin = subtotalMin + taxMin;
  const totalMax = subtotalMax + taxMax;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 flex-shrink-0"
        style={{ height: "3.5rem", borderBottom: "1px solid #2A2A36" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          Your Quote
        </span>
        <span className="text-body-xs text-text-tertiary">Valid 30 days</span>
      </header>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-5 space-y-5 max-w-lg mx-auto pb-8">
          {/* Before/After slider */}
          <BeforeAfterSlider renderUrl={renderUrl} />

          {/* Vehicle info pill */}
          {currentBuild.vehicle && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-card"
              style={{ background: "#14141A", border: "1px solid #2A2A36" }}
            >
              <div
                className="w-8 h-8 rounded-button flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(68,204,255,0.1)" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#44CCFF" strokeWidth="1.8">
                  <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1l2-4h12l2 4h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <div>
                <p className="text-body-sm font-medium text-text-primary">
                  {currentBuild.vehicle.year} {currentBuild.vehicle.make} {currentBuild.vehicle.model}
                </p>
                <p className="text-body-xs text-text-tertiary">
                  {currentBuild.vehicle.color} · {currentBuild.vehicle.bodyType}
                </p>
              </div>
            </div>
          )}

          {/* Line items */}
          <div
            className="rounded-card overflow-hidden"
            style={{ border: "1px solid #2A2A36" }}
          >
            <div className="px-4 py-3" style={{ borderBottom: "1px solid #2A2A36" }}>
              <p className="text-body-sm font-medium text-text-secondary">
                Selected Items ({items.length})
              </p>
            </div>

            {items.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-body-md text-text-tertiary">No items selected</p>
                <button
                  onClick={() => router.push("/create/customize")}
                  className="mt-3 text-body-sm text-cyan"
                >
                  Add items →
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                if (!item) return null;
                const { product } = item;
                const color = CATEGORY_COLORS[product.category];
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                      borderBottom: idx < items.length - 1 ? "1px solid #2A2A36" : "none",
                    }}
                  >
                    {/* Category icon */}
                    <div
                      className="w-9 h-9 rounded-button flex items-center justify-center flex-shrink-0"
                      style={{ background: `${color}18`, color }}
                    >
                      {categoryIcon(product.category)}
                    </div>

                    {/* Name + brand */}
                    <div className="flex-1 min-w-0">
                      <p className="text-body-sm font-medium text-text-primary truncate">
                        {product.name}
                      </p>
                      <p className="text-body-xs text-text-tertiary">
                        {product.brandName}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className="text-body-sm font-mono font-medium"
                        style={{ color }}
                      >
                        {formatCents(product.priceMin)}
                      </p>
                      <p className="text-body-xs text-text-tertiary font-mono">
                        – {formatCents(product.priceMax)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}

            {/* Totals */}
            {items.length > 0 && (
              <div
                className="px-4 pt-3 pb-4 space-y-2"
                style={{ borderTop: "1px solid #2A2A36", background: "#1C1C24" }}
              >
                {[
                  { label: "Subtotal", min: subtotalMin, max: subtotalMax },
                  { label: "Tax est. (8%)", min: taxMin, max: taxMax },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between">
                    <span className="text-body-sm text-text-tertiary">{row.label}</span>
                    <span className="text-body-sm font-mono text-text-secondary">
                      {formatCents(row.min)} – {formatCents(row.max)}
                    </span>
                  </div>
                ))}
                <div
                  className="flex items-center justify-between pt-2"
                  style={{ borderTop: "1px solid #2A2A36" }}
                >
                  <span className="text-body-md font-semibold text-text-primary">Total</span>
                  <span className="text-body-md font-mono font-bold text-cyan">
                    {formatCents(totalMin)} – {formatCents(totalMax)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => router.push("/create/shops")}
              className="w-full h-14 rounded-button font-display font-semibold text-body-lg text-background flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: "#44CCFF",
                boxShadow: "0 0 24px rgba(68,204,255,0.35)",
              }}
            >
              Find a Shop
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => setToast("PDF generation coming soon!")}
              className="w-full h-12 rounded-button font-medium text-body-md flex items-center justify-center gap-2 transition-all active:scale-95"
              style={{
                background: "transparent",
                border: "1.5px solid #2A2A36",
                color: "#A0A0B0",
              }}
            >
              <Download size={16} />
              Download Quote PDF
            </button>

            <button
              onClick={() => router.push("/create/customize")}
              className="w-full h-12 rounded-button font-medium text-body-md text-text-tertiary flex items-center justify-center gap-2 hover:text-text-secondary transition-colors"
            >
              <Edit3 size={15} />
              Edit Build
            </button>
          </div>

          <p className="text-body-xs text-text-tertiary text-center">
            Quote valid for 30 days · Prices are estimates and may vary by shop
          </p>
        </div>
      </div>

      {toast && <Toast message={toast} onDone={() => setToast(null)} />}
    </div>
  );
}
