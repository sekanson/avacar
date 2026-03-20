"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle,
  Calendar,
  Share2,
  Car,
  MapPin,
  Clock,
  Home,
  Copy,
  Check,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function BookingConfirmedPage() {
  const router = useRouter();
  const { currentBooking, currentVehicle, showToast } = useAppStore();
  const [copied, setCopied] = useState(false);

  const booking = currentBooking;
  const vehicle = currentVehicle ?? booking?.build?.vehicle ?? {
    make: "BMW", model: "M4", year: 2024, color: "Black", bodyType: "Coupe",
  };
  const shop = booking?.shop ?? {
    name: "Elite Wraps Co.", address: "1420 W Olympic Blvd", city: "Los Angeles, CA",
  };
  const slot = booking?.selectedSlot ?? { date: "Thu Mar 12", time: "9:00 AM", available: true };
  const confirmCode = booking?.confirmationCode ?? "AVC-XXXXXX";
  const totalMin = booking?.build?.totalMin ?? 0;
  const totalMax = booking?.build?.totalMax ?? 0;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(confirmCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      showToast("Couldn't copy -- try manually");
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`AVACAR - ${vehicle.year} ${vehicle.make} ${vehicle.model} Drop-off`);
    const details = encodeURIComponent(`Booking ${confirmCode}\nShop: ${shop.name}\nAddress: ${shop.address}, ${shop.city}`);
    const location = encodeURIComponent(`${shop.address}, ${shop.city}`);
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", padding: "48px 20px 40px" }}>
      {/* Success icon */}
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "3px solid var(--success)",
          background: "var(--success-alpha-08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckCircle size={44} style={{ color: "var(--success)" }} strokeWidth={2} />
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--on-surface)", marginTop: 28, textAlign: "center", letterSpacing: "-0.02em" }}>
        Booking Confirmed!
      </h1>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 6, textAlign: "center" }}>
        You&apos;re all set. The shop has been notified.
      </p>

      {/* Confirmation code */}
      <div style={{ marginTop: 24, width: "100%", maxWidth: 340 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderRadius: 12,
            padding: "12px 16px",
            background: "var(--success-alpha-08)",
            border: "1px solid var(--success-alpha-20)",
          }}
        >
          <div>
            <p style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Confirmation Code</p>
            <p style={{ fontSize: 22, fontWeight: 700, color: "var(--success)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.06em", marginTop: 2 }}>
              {confirmCode}
            </p>
          </div>
          <button
            onClick={handleCopyCode}
            style={{ width: 36, height: 36, borderRadius: 8, background: "var(--success-alpha-10)", display: "flex", alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer" }}
          >
            {copied ? <Check size={16} style={{ color: "var(--success)" }} /> : <Copy size={16} style={{ color: "var(--muted)" }} />}
          </button>
        </div>
      </div>

      {/* Booking summary card */}
      <div style={{ marginTop: 16, width: "100%", maxWidth: 340, background: "var(--surface-card)", borderRadius: 14, padding: 16, boxShadow: "var(--shadow-card)" }}>
        {/* Vehicle */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 12, borderBottom: "1px solid var(--ghost-border)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-alpha-08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Car size={16} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
            <p style={{ fontSize: 11, color: "var(--muted)" }}>{vehicle.color} - {vehicle.bodyType}</p>
          </div>
          {totalMin > 0 && (
            <span style={{ fontSize: 12, color: "var(--primary)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>
              ${totalMin.toLocaleString()}-{totalMax.toLocaleString()}
            </span>
          )}
        </div>

        {/* Shop */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid var(--ghost-border)" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-alpha-08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <MapPin size={16} style={{ color: "var(--primary)" }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shop.name}</p>
            <p style={{ fontSize: 11, color: "var(--muted)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{shop.address}, {shop.city}</p>
          </div>
        </div>

        {/* Appointment */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, paddingTop: 12 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--primary-alpha-08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Clock size={16} style={{ color: "var(--primary)" }} />
          </div>
          <div>
            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>{slot.date} at {slot.time}</p>
            <p style={{ fontSize: 11, color: "var(--muted)" }}>Estimated 2-4 days</p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ marginTop: 24, width: "100%", maxWidth: 340, display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={() => router.push("/garage")} className="btn btn-primary" style={{ width: "100%", borderRadius: 14, fontSize: 15 }}>
          <Home size={16} />
          View My Garage
        </button>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleAddToCalendar} className="btn btn-secondary" style={{ flex: 1, borderRadius: 14, fontSize: 13 }}>
            <Calendar size={15} />
            Calendar
          </button>
          <button
            onClick={() => showToast("Share coming soon")}
            className="btn btn-secondary"
            style={{ flex: 1, borderRadius: 14, fontSize: 13 }}
          >
            <Share2 size={15} />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
