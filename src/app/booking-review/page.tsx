"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Car, MapPin, Star, Clock, AlertCircle, Mail } from "lucide-react";
import { useAppStore } from "@/store/appStore";

function generateConfirmationCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "AVC-" + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function BookingReviewPage() {
  const router = useRouter();
  const {
    currentVehicle,
    currentBuild,
    selectedShop,
    selectedSlot,
    getBuildTotal,
    setCurrentBooking,
  } = useAppStore();

  const [isLoading, setIsLoading] = useState(false);
  const total = getBuildTotal();

  const vehicle = currentVehicle ?? { make: "BMW", model: "M4", year: 2024, color: "Black", bodyType: "Coupe" };
  const shop = selectedShop ?? {
    id: "shop-1", name: "Elite Wraps Co.", rating: 4.9, reviewCount: 142,
    address: "1420 W Olympic Blvd", city: "Los Angeles, CA", priceTier: 3 as const,
    distance: 1.2, specialties: [], description: "", certifications: [],
    portfolioImages: [], reviews: [], timeSlots: [],
  };
  const slot = selectedSlot ?? { date: "Thu Mar 12", time: "9:00 AM", available: true };

  const buildItems = [
    currentBuild.wrap && { label: "Wrap", name: `${currentBuild.wrap.name} (${currentBuild.wrap.brand})`, priceMin: currentBuild.wrap.priceMin, priceMax: currentBuild.wrap.priceMax },
    currentBuild.wheels && { label: "Wheels", name: currentBuild.wheels.name, priceMin: currentBuild.wheels.priceMin, priceMax: currentBuild.wheels.priceMax },
    currentBuild.tint && { label: "Tint", name: currentBuild.tint.name, priceMin: currentBuild.tint.priceMin, priceMax: currentBuild.tint.priceMax },
    currentBuild.ppf && { label: "PPF", name: currentBuild.ppf.name, priceMin: currentBuild.ppf.priceMin, priceMax: currentBuild.ppf.priceMax },
    currentBuild.bodykit && { label: "Body Kit", name: currentBuild.bodykit.name, priceMin: currentBuild.bodykit.priceMin, priceMax: currentBuild.bodykit.priceMax },
  ].filter(Boolean) as { label: string; name: string; priceMin: number; priceMax: number }[];

  const handleConfirm = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    const code = generateConfirmationCode();
    setCurrentBooking({
      shop,
      build: { vehicle, selections: currentBuild, totalMin: total.min, totalMax: total.max },
      selectedSlot: slot,
      status: "confirmed",
      confirmationCode: code,
      createdAt: new Date().toISOString(),
    });
    router.push("/booking-confirmed");
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
          borderBottom: "1px solid var(--ghost-border)",
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
          Review Booking
        </h1>
      </div>

      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Build Summary Card */}
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Car size={16} style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--on-surface)" }}>Your Build</h2>
          </div>

          {/* Vehicle */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid var(--ghost-border)" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary-alpha-08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Car size={18} style={{ color: "var(--primary)" }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{vehicle.year} {vehicle.make} {vehicle.model}</p>
              <p style={{ fontSize: 11, color: "var(--muted)" }}>{vehicle.color} - {vehicle.bodyType}</p>
            </div>
          </div>

          {/* Build items */}
          {buildItems.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {buildItems.map((item) => (
                <div key={item.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em", marginRight: 8 }}>{item.label}</span>
                    <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                    ${item.priceMin.toLocaleString()}-{item.priceMax.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: "var(--muted)", fontStyle: "italic" }}>No products selected</p>
          )}

          {/* Total */}
          {total.min > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--ghost-border)" }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Total Estimate</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: "var(--primary)", fontVariantNumeric: "tabular-nums" }}>
                ${total.min.toLocaleString()}-{total.max.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* Shop Card */}
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <MapPin size={16} style={{ color: "var(--primary)" }} />
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--on-surface)" }}>Shop</h2>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 700, color: "var(--on-surface)" }}>{shop.name}</p>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{shop.address}, {shop.city}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
                <Star size={11} style={{ color: "var(--warning)" }} fill="var(--warning)" />
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--on-surface)" }}>{shop.rating}</span>
                <span style={{ fontSize: 11, color: "var(--muted)" }}>({shop.reviewCount})</span>
              </div>
            </div>
            <button onClick={() => router.back()} style={{ fontSize: 12, color: "var(--primary)", background: "none", border: "none", cursor: "pointer" }}>Change</button>
          </div>

          <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--ghost-border)", display: "flex", alignItems: "center", gap: 10 }}>
            <Clock size={15} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{slot.date} at {slot.time}</p>
              <button onClick={() => router.back()} style={{ fontSize: 11, color: "var(--primary)", background: "none", border: "none", cursor: "pointer", marginTop: 2, padding: 0 }}>
                Change time
              </button>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)", display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--on-surface-variant)" }}>
            <AlertCircle size={14} style={{ color: "var(--warning)", flexShrink: 0 }} />
            <span>Estimated duration: <strong style={{ color: "var(--on-surface)" }}>2-4 days</strong> depending on build complexity</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--on-surface-variant)" }}>
            <AlertCircle size={14} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span>No deposit required. Final quote from shop within 24 hours.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--muted)", paddingTop: 8, borderTop: "1px solid var(--ghost-border)" }}>
            <Mail size={13} style={{ color: "var(--muted)", flexShrink: 0 }} />
            <span>Confirmation sent to your registered email</span>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: "16px 20px",
          background: "var(--topbar-bg)",
          borderTop: "1px solid var(--ghost-border)",
          backdropFilter: "blur(20px)",
          maxWidth: 400,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <button
          onClick={handleConfirm}
          disabled={isLoading}
          className="btn btn-primary"
          style={{ width: "100%", borderRadius: 14, opacity: isLoading ? 0.6 : 1 }}
        >
          {isLoading ? (
            <>
              <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
              Confirming...
            </>
          ) : (
            "Confirm Booking"
          )}
        </button>
        <button
          onClick={() => router.push("/home")}
          style={{ width: "100%", fontSize: 12, color: "var(--muted)", textAlign: "center", padding: 4, background: "none", border: "none", cursor: "pointer" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
