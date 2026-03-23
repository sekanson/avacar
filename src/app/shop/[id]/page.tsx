"use client";

import { useState, use } from "react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Phone,
  Clock,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { shops } from "@/data/products";
import { useAppStore } from "@/store/appStore";
import type { TimeSlot } from "@/types";

const priceTierLabel = (tier: 1 | 2 | 3) => ["$", "$$", "$$$"][tier - 1];

export default function ShopProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { setSelectedShop, setSelectedSlot, showToast } = useAppStore();

  const shop = shops.find((s) => s.id === id) ?? shops[0];
  const [selectedSlot, setSlotState] = useState<TimeSlot | null>(null);

  const slotsByDate = shop.timeSlots.reduce<Record<string, TimeSlot[]>>(
    (acc, slot) => {
      if (!acc[slot.date]) acc[slot.date] = [];
      acc[slot.date].push(slot);
      return acc;
    },
    {}
  );

  const handleBook = () => {
    if (!selectedSlot) {
      showToast("Please select a time slot");
      return;
    }
    setSelectedShop(shop);
    setSelectedSlot(selectedSlot);
    router.push("/booking-review");
  };

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 120 }}>
      {/* Topbar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "16px 20px",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(20px)",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          {shop.name}
        </h1>
      </div>

      {/* Shop info card */}
      <div style={{ padding: 20 }}>
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: 20, boxShadow: "var(--shadow-card)" }}>
          {/* Name + avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 14,
                background: "var(--primary-gradient)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "var(--on-primary)",
              }}
            >
              {shop.name[0]}
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>{shop.name}</h2>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <Star size={13} style={{ color: "var(--warning)" }} fill="var(--warning)" />
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{shop.rating}</span>
                <span style={{ fontSize: 12, color: "var(--muted)" }}>({shop.reviewCount})</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--warning)" }}>{priceTierLabel(shop.priceTier)}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <MapPin size={14} style={{ color: "var(--muted)" }} />
            <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{shop.address}, {shop.city} - {shop.distance} mi</span>
          </div>

          {/* Hours */}
          {shop.hours && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Clock size={14} style={{ color: "var(--muted)" }} />
              <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{shop.hours}</span>
            </div>
          )}

          {/* Phone */}
          {shop.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Phone size={14} style={{ color: "var(--muted)" }} />
              <a href={`tel:${shop.phone}`} style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>{shop.phone}</a>
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.6 }}>{shop.description}</p>
      </div>

      {/* Certifications */}
      {shop.certifications.length > 0 && (
        <div style={{ padding: "0 20px", marginBottom: 24 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={15} style={{ color: "var(--primary)" }} />
            Certifications
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {shop.certifications.map((cert) => (
              <div
                key={cert}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 12px",
                  borderRadius: 100,
                  fontSize: 12,
                  fontWeight: 500,
                  background: "var(--success-alpha-08)",
                  color: "var(--success)",
                }}
              >
                <CheckCircle2 size={12} />
                {cert}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Time Slots */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 16 }}>Available Appointments</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(slotsByDate).map(([date, slots]) => (
            <div key={date}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>{date}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {slots.map((slot) => {
                  const isSelected = selectedSlot?.date === slot.date && selectedSlot?.time === slot.time;
                  return (
                    <button
                      key={`${slot.date}-${slot.time}`}
                      disabled={!slot.available}
                      onClick={() => setSlotState(slot)}
                      className={`chip ${isSelected ? "active" : ""}`}
                      style={{
                        opacity: slot.available ? 1 : 0.3,
                        textDecoration: slot.available ? "none" : "line-through",
                        cursor: slot.available ? "pointer" : "not-allowed",
                      }}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 16 }}>
          Reviews ({shop.reviewCount})
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {shop.reviews.map((review) => (
            <div key={review.id} style={{ background: "var(--surface-card)", borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--surface-low)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>
                    {review.author[0]}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>{review.author}</p>
                    {review.vehicle && <p style={{ fontSize: 10, color: "var(--muted)" }}>{review.vehicle}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={11} style={{ color: "var(--warning)" }} fill="var(--warning)" />
                  ))}
                  <span style={{ fontSize: 10, color: "var(--muted)", marginLeft: 4 }}>{review.date}</span>
                </div>
              </div>
              <p style={{ fontSize: 13, color: "var(--on-surface-variant)", lineHeight: 1.5 }}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky booking bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: 16,
          background: "var(--topbar-bg)",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          backdropFilter: "blur(20px)",
          maxWidth: 400,
          margin: "0 auto",
        }}
      >
        {selectedSlot && (
          <p style={{ fontSize: 12, color: "var(--muted)", textAlign: "center", marginBottom: 8 }}>
            {selectedSlot.date} at {selectedSlot.time}
          </p>
        )}
        <button
          onClick={handleBook}
          className={selectedSlot ? "btn btn-primary" : "btn btn-disabled"}
          style={{ width: "100%", borderRadius: 14 }}
        >
          {selectedSlot ? "Book This Shop" : "Select a Time Slot"}
        </button>
      </div>
    </div>
  );
}
