"use client";

import { useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Calendar, Clock, FileText, Star, MapPin } from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";
import { cn } from "@/lib/utils/cn";
import { mockShops } from "@/lib/data/shops";
import type { Shop, ProductCategory } from "@/lib/types";

// ── Helpers ───────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  wrap: "Wrap",
  wheel: "Wheels",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessory: "Accessories",
};

const TIER_COLORS: Record<string, string> = {
  standard: "#6B7280",
  certified: "#44CCFF",
  elite: "#FBBF24",
};

function formatCents(cents: number): string {
  if (cents === 0) return "$0";
  return "$" + (cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

function getNextDays(count: number): Date[] {
  const days: Date[] = [];
  const now = new Date();
  for (let i = 1; i <= count; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    days.push(d);
  }
  return days;
}

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const TIME_SLOTS = ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM"];

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-display-xs font-display text-text-primary mb-3">{children}</h2>
  );
}

function ShopSummaryCard({ shop }: { shop: Shop }) {
  const tierColor = TIER_COLORS[shop.tier] ?? "#6B7280";
  const tierLabel = shop.tier.charAt(0).toUpperCase() + shop.tier.slice(1);

  return (
    <div
      className="rounded-card p-4 flex items-start gap-3"
      style={{ background: "#14141A", border: "1px solid #2A2A36" }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-card flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${tierColor}33 0%, ${tierColor}11 100%)`,
          border: `1.5px solid ${tierColor}44`,
        }}
      >
        <span className="text-display-xs font-display font-bold" style={{ color: tierColor }}>
          {shop.name[0]}
        </span>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-body-md font-semibold text-text-primary">{shop.name}</span>
          <span
            className="text-body-xs px-2 py-0.5 rounded-chip"
            style={{
              color: tierColor,
              background: `${tierColor}18`,
              border: `1px solid ${tierColor}33`,
            }}
          >
            {tierLabel}
          </span>
        </div>
        <div className="flex items-center gap-1 mb-1">
          <MapPin size={11} className="text-text-tertiary" />
          <span className="text-body-xs text-text-secondary truncate">{shop.address}</span>
        </div>
        <div className="flex items-center gap-1">
          <Star size={12} fill="#FBBF24" className="text-warning" strokeWidth={0} />
          <span className="text-data-sm text-text-primary">{shop.avgRating.toFixed(1)}</span>
          <span className="text-body-xs text-text-tertiary">({shop.reviewCount})</span>
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function BookPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currentBuild, getTotal } = useBuildStore();

  // Resolve shop from URL param or default to first
  const shopSlug = searchParams.get("shop") ?? "apex-customs";
  const shop = mockShops.find((s) => s.slug === shopSlug) ?? mockShops[0];

  const days = useMemo(() => getNextDays(7), []);
  const [selectedDay, setSelectedDay] = useState<Date | null>(days[0]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const total = getTotal();
  const buildItems = Object.entries(currentBuild.items);
  const vehicle = currentBuild.vehicle;

  const canConfirm = selectedDay !== null && selectedTime !== null;

  function handleConfirm() {
    if (!canConfirm) return;
    // Store booking details to localStorage for confirmed page
    const booking = {
      shopName: shop.name,
      shopAddress: shop.address,
      date: selectedDay
        ? `${DAY_NAMES[selectedDay.getDay()]}, ${MONTH_NAMES[selectedDay.getMonth()]} ${selectedDay.getDate()}`
        : "",
      time: selectedTime,
      notes,
      totalMin: total.min,
      totalMax: total.max,
      itemCount: buildItems.length,
      vehicle: vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : "Your Vehicle",
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("avacar-pending-booking", JSON.stringify(booking));
    }
    router.push("/create/book/confirmed");
  }

  return (
    <div className="min-h-screen bg-background pb-32">
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
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          Book Installation
        </span>
      </header>

      <div className="px-4 pt-4 space-y-6">
        {/* Review Your Booking */}
        <div>
          <SectionHeader>Review Your Booking</SectionHeader>

          {/* Shop */}
          <ShopSummaryCard shop={shop} />

          {/* Build summary */}
          {buildItems.length > 0 ? (
            <div
              className="rounded-card mt-3"
              style={{ background: "#14141A", border: "1px solid #2A2A36", overflow: "hidden" }}
            >
              <div className="px-4 py-3 border-b border-surface-border">
                <p className="text-body-xs text-text-tertiary uppercase tracking-wider">
                  Build Summary
                </p>
                {vehicle && (
                  <p className="text-body-sm text-text-secondary mt-0.5">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </p>
                )}
              </div>
              {buildItems.map(([cat, item]) => (
                <div
                  key={cat}
                  className="px-4 py-3 flex items-center justify-between border-b border-surface-border last:border-0"
                >
                  <div>
                    <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-0.5">
                      {CATEGORY_LABELS[cat as ProductCategory] ?? cat}
                    </p>
                    <p className="text-body-sm text-text-primary">
                      {item?.product.brandName} {item?.product.name}
                    </p>
                  </div>
                  <p className="text-data-sm text-cyan">
                    {formatCents(item?.product.priceMin ?? 0)}–{formatCents(item?.product.priceMax ?? 0)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div
              className="rounded-card mt-3 px-4 py-6 text-center"
              style={{ background: "#14141A", border: "1px dashed #2A2A36" }}
            >
              <p className="text-body-sm text-text-tertiary">No items in your build yet.</p>
              <button
                onClick={() => router.push("/create/customize")}
                className="text-body-sm text-cyan mt-2"
              >
                Add items
              </button>
            </div>
          )}

          {/* Total estimate */}
          {total.min > 0 && (
            <div
              className="rounded-card mt-3 px-4 py-4"
              style={{ background: "rgba(68,204,255,0.06)", border: "1px solid rgba(68,204,255,0.2)" }}
            >
              <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-1">
                Total Estimate
              </p>
              <p className="text-display-sm font-display text-cyan">
                {formatCents(total.min)}
                <span className="text-text-tertiary mx-1">–</span>
                {formatCents(total.max)}
              </p>
              <p className="text-body-xs text-text-tertiary mt-1">
                Final price confirmed at the shop
              </p>
            </div>
          )}
        </div>

        {/* Date Picker */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={16} className="text-cyan" />
            <SectionHeader>Select a Date</SectionHeader>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {days.map((day) => {
              const isSelected =
                selectedDay !== null &&
                day.toDateString() === selectedDay.toDateString();
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelectedDay(day)}
                  className={cn(
                    "flex flex-col items-center px-3 py-2.5 rounded-card flex-shrink-0 min-w-[60px] transition-colors",
                    isSelected
                      ? "bg-cyan-muted border border-cyan"
                      : "border border-surface-border"
                  )}
                  style={!isSelected ? { background: "#14141A" } : undefined}
                >
                  <span
                    className={cn(
                      "text-body-xs uppercase tracking-wider",
                      isSelected ? "text-cyan" : "text-text-tertiary"
                    )}
                  >
                    {DAY_NAMES[day.getDay()]}
                  </span>
                  <span
                    className={cn(
                      "text-display-xs font-display mt-0.5",
                      isSelected ? "text-cyan" : "text-text-primary"
                    )}
                  >
                    {day.getDate()}
                  </span>
                  <span
                    className={cn(
                      "text-body-xs",
                      isSelected ? "text-cyan opacity-80" : "text-text-tertiary"
                    )}
                  >
                    {MONTH_NAMES[day.getMonth()]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-cyan" />
            <SectionHeader>Select a Time</SectionHeader>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(isSelected ? null : slot)}
                  className={cn(
                    "py-3 rounded-button text-body-md font-medium transition-colors",
                    isSelected
                      ? "bg-cyan-muted text-cyan border border-cyan"
                      : "text-text-secondary border border-surface-border"
                  )}
                  style={!isSelected ? { background: "#14141A" } : undefined}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={16} className="text-cyan" />
            <SectionHeader>Notes for the Shop</SectionHeader>
          </div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional — let the shop know anything relevant about your vehicle or preferences..."
            rows={4}
            className="w-full text-body-md text-text-primary placeholder:text-text-tertiary rounded-input px-4 py-3 resize-none outline-none transition-colors"
            style={{
              background: "#14141A",
              border: "1px solid #2A2A36",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#44CCFF88";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "#2A2A36";
            }}
          />
          <p className="text-body-xs text-text-tertiary mt-1">Optional</p>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div
        className="fixed bottom-0 inset-x-0 px-4 py-3 z-20"
        style={{
          background: "rgba(12,12,16,0.95)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid #2A2A36",
          paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={handleConfirm}
          disabled={!canConfirm}
          className={cn(
            "w-full flex items-center justify-center font-display font-semibold rounded-button transition-all",
            canConfirm
              ? "text-text-inverse active:opacity-90"
              : "text-text-disabled"
          )}
          style={{
            height: 52,
            background: canConfirm ? "#44CCFF" : "#1C1C24",
            boxShadow: canConfirm ? "0 0 24px rgba(68,204,255,0.35)" : "none",
            border: canConfirm ? "none" : "1px solid #2A2A36",
          }}
        >
          {canConfirm ? "Confirm Booking" : "Select a date & time"}
        </button>
      </div>
    </div>
  );
}


export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <BookPageInner />
    </Suspense>
  );
}
