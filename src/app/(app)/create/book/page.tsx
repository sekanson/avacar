"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/cn";

// ── Shop data ──────────────────────────────────────────────────────────────────

const SHOPS: Record<string, { name: string; city: string; address: string; rating: number; reviews: number; badge: string }> = {
  "wrapsbyalex": {
    name: "WrapsbyAlex",
    city: "Mississauga, ON",
    address: "123 Auto Row, Mississauga, ON L5B 2C3",
    rating: 4.9,
    reviews: 342,
    badge: "Zeno Certified",
  },
  "carbonwerks-gta": {
    name: "CarbonWerks GTA",
    city: "Toronto, ON",
    address: "48 Industrial Pkwy, Toronto, ON M6P 1A4",
    rating: 4.8,
    reviews: 218,
    badge: "Zeno Certified",
  },
  "armorshield-pro": {
    name: "ArmorShield Pro",
    city: "Brampton, ON",
    address: "77 Shield Way, Brampton, ON L6T 3K9",
    rating: 4.7,
    reviews: 156,
    badge: "Zeno Certified",
  },
};

const DEFAULT_SHOP = SHOPS["wrapsbyalex"];

// ── Calendar helpers ───────────────────────────────────────────────────────────

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_HEADERS = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","1:00 PM","2:00 PM","3:00 PM"];

function buildCalendarCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // convert to Mon-start
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  return cells;
}

function isAvailable(year: number, month: number, day: number, today: Date): boolean {
  const d = new Date(year, month, day);
  const dow = d.getDay(); // 0=Sun, 6=Sat
  const isWeekend = dow === 0 || dow === 6;
  return !isWeekend && d > today;
}

// ── Inner page ─────────────────────────────────────────────────────────────────

function BookPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shop") ?? "wrapsbyalex";
  const shop = SHOPS[shopId] ?? DEFAULT_SHOP;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const cells = buildCalendarCells(year, month);

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const canBook = selectedDate !== null && selectedTime !== null;

  const selectedDateStr = selectedDate
    ? new Date(year, month, selectedDate).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  function handleBook() {
    if (!canBook) return;
    const booking = {
      shopName: shop.name,
      shopAddress: shop.address,
      shopCity: shop.city,
      date: selectedDateStr,
      time: selectedTime,
      notes,
      designName: "Midnight Fury — GT-R R35",
      vehicle: "2022 Toyota GR86",
      depositPaid: 200,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("avacar-pending-booking", JSON.stringify(booking));
    }
    router.push("/create/book/confirmed");
  }

  return (
    <div className="min-h-screen pb-40" style={{ background: "var(--color-bg)" }}>
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
          Book Your Install
        </span>
        <span className="text-[12px] text-text-tertiary">Step 2 of 3</span>
      </header>

      <div className="px-4 pt-5 space-y-6">

        {/* Shop card compact */}
        <div
          className="rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "var(--color-surface)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0"
            style={{ background: "rgba(68,204,255,0.15)", color: "#44CCFF", border: "1.5px solid rgba(68,204,255,0.3)" }}
          >
            {shop.name[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-text-primary text-[14px]">{shop.name}</span>
              <span
                className="text-[11px] px-2 py-0.5 rounded-full"
                style={{ background: "rgba(68,204,255,0.12)", color: "#44CCFF", border: "1px solid rgba(68,204,255,0.3)" }}
              >
                🏆 {shop.badge}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <Star size={11} fill="#FBBF24" strokeWidth={0} />
              <span className="text-[12px] text-text-secondary">{shop.rating} · {shop.reviews} reviews · {shop.city}</span>
            </div>
          </div>
        </div>

        {/* Your Build */}
        <div>
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-3">Your Build</p>
          <div
            className="rounded-2xl p-4 flex gap-3 items-start"
            style={{ background: "var(--color-surface)" }}
          >
            <img
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=120&q=80&fm=webp"
              alt="Design"
              loading="lazy"
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
            <div>
              <p className="font-semibold text-text-primary text-[14px]">Midnight Fury — GT-R R35</p>
              <p className="text-[12px] text-text-tertiary mt-0.5">2022 Toyota GR86</p>
              <p className="text-[12px] text-text-secondary mt-1">Full Wrap + Chrome Delete</p>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div>
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-3">Select a Date</p>
          <div
            className="rounded-2xl p-4"
            style={{ background: "var(--color-surface)" }}
          >
            <p className="font-display font-semibold text-text-primary text-[15px] mb-4 text-center">
              {MONTH_NAMES[month]} {year}
            </p>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_HEADERS.map((h) => (
                <div key={h} className="text-center text-[11px] font-semibold text-text-tertiary uppercase">
                  {h}
                </div>
              ))}
            </div>
            {/* Date cells */}
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, idx) => {
                if (day === null) return <div key={`blank-${idx}`} />;
                const available = isAvailable(year, month, day, today);
                const isSelected = selectedDate === day;
                const isPast = new Date(year, month, day) <= today;
                return (
                  <button
                    key={day}
                    disabled={!available}
                    onClick={() => setSelectedDate(isSelected ? null : day)}
                    className="flex items-center justify-center mx-auto transition-all"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      fontSize: 13,
                      fontWeight: isSelected ? 700 : 500,
                      background: isSelected
                        ? "#44CCFF"
                        : available
                        ? "rgba(68,204,255,0.08)"
                        : "transparent",
                      color: isSelected
                        ? "#000"
                        : available
                        ? "var(--color-text-primary)"
                        : "var(--color-text-disabled, #444)",
                      border: isSelected ? "none" : available ? "1px solid rgba(68,204,255,0.25)" : "none",
                      opacity: isPast && !isSelected ? 0.3 : 1,
                      cursor: available ? "pointer" : "default",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time slots */}
        <div>
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-3">Select a Time</p>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => setSelectedTime(isSelected ? null : slot)}
                  className="flex-shrink-0 px-4 py-2.5 rounded-2xl text-[13px] font-semibold transition-all"
                  style={{
                    background: isSelected ? "#44CCFF" : "var(--color-surface-elevated)",
                    color: isSelected ? "#000" : "var(--color-text-secondary)",
                    border: isSelected ? "none" : "1px solid var(--color-border)",
                    boxShadow: isSelected ? "0 2px 12px rgba(68,204,255,0.3)" : "none",
                  }}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-3">Notes for the Shop</p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g., small scratch on driver door, prefer matte finish..."
            rows={3}
            className="w-full text-[14px] text-text-primary placeholder:text-text-tertiary rounded-2xl px-4 py-3 resize-none outline-none transition-colors"
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#44CCFF66"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = "var(--color-border)"; }}
          />
        </div>

        {/* Price breakdown */}
        <div
          className="rounded-2xl p-4 space-y-3"
          style={{ background: "var(--color-surface)" }}
        >
          <p className="text-[11px] text-text-tertiary uppercase tracking-wider">Price Breakdown</p>
          <div className="space-y-2">
            <div className="flex justify-between text-[14px]">
              <span className="text-text-secondary">Design file</span>
              <span className="text-text-primary font-medium">$149</span>
            </div>
            <div className="flex justify-between text-[14px]">
              <span className="text-text-secondary">Installation</span>
              <span className="text-text-primary font-medium">$450–$650</span>
            </div>
          </div>
          <div
            style={{
              height: 1,
              background: "var(--color-border)",
              margin: "4px 0",
            }}
          />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[14px] font-semibold text-text-primary">Estimated total</span>
              <span className="text-[14px] font-bold text-cyan">$599–$799</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-secondary">Deposit due now</span>
              <span className="font-semibold text-text-primary">$200</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-text-tertiary">Remaining at pickup</span>
              <span className="text-text-tertiary">$399–$599</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sticky CTA */}
      <div
        className="fixed bottom-0 inset-x-0 px-4 z-30 space-y-3"
        style={{
          background: "rgba(12,12,16,0.97)",
          backdropFilter: "blur(16px)",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "0.875rem",
          paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom))",
        }}
      >
        <button
          onClick={handleBook}
          disabled={!canBook}
          className="w-full font-display font-bold text-[15px] rounded-2xl flex items-center justify-center transition-all active:opacity-80"
          style={{
            height: 56,
            background: canBook
              ? "linear-gradient(135deg, #44CCFF 0%, #0099CC 100%)"
              : "var(--color-surface-elevated)",
            color: canBook ? "#000" : "var(--color-text-disabled)",
            boxShadow: canBook ? "0 4px 24px rgba(68,204,255,0.4)" : "none",
            border: canBook ? "none" : "1px solid var(--color-border)",
          }}
        >
          {canBook ? "Book & Pay Deposit — $200" : "Select a date & time to continue"}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full text-center text-[13px] text-text-tertiary py-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: "var(--color-bg)" }} />}>
      <BookPageInner />
    </Suspense>
  );
}
