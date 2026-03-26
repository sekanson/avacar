"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check, Calendar, MapPin, Palette, Car, CreditCard } from "lucide-react";

interface BookingData {
  shopName: string;
  shopAddress: string;
  shopCity: string;
  date: string;
  time: string;
  designName: string;
  vehicle: string;
  depositPaid: number;
}

const FALLBACK: BookingData = {
  shopName: "WrapsbyAlex",
  shopAddress: "123 Auto Row, Mississauga, ON",
  shopCity: "Mississauga, ON",
  date: "Saturday, April 5",
  time: "10:00 AM",
  designName: "Midnight Fury — GT-R R35",
  vehicle: "2022 Toyota GR86",
  depositPaid: 200,
};

export default function BookingConfirmedPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<BookingData>(FALLBACK);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("avacar-pending-booking");
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as Partial<BookingData>;
          setBooking({ ...FALLBACK, ...parsed });
        } catch {
          // use fallback
        }
      }
    }
  }, []);

  const details = [
    { icon: Calendar, label: `${booking.date} at ${booking.time}` },
    { icon: MapPin, label: `${booking.shopName} · ${booking.shopAddress}` },
    { icon: Palette, label: booking.designName },
    { icon: Car, label: booking.vehicle },
    { icon: CreditCard, label: `Deposit paid: $${booking.depositPaid}` },
  ];

  const nextSteps = [
    "The shop will confirm your appointment within 24 hours",
    "They'll review your design files and car details",
    "Arrive at your appointment — the rest is magic ✨",
  ];

  return (
    <div
      className="min-h-screen flex flex-col items-center px-5 py-12 overflow-y-auto"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
        className="flex-shrink-0 mb-6"
      >
        <div
          className="flex items-center justify-center"
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "rgba(68,204,255,0.15)",
            border: "2px solid rgba(68,204,255,0.5)",
            boxShadow: "0 0 40px rgba(68,204,255,0.25)",
          }}
        >
          <Check size={40} strokeWidth={2.5} style={{ color: "#44CCFF" }} />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.35 }}
        className="text-center mb-8"
      >
        <h1
          className="font-display font-bold text-text-primary"
          style={{ fontSize: 28 }}
        >
          You&apos;re Booked!
        </h1>
        <p className="text-text-secondary mt-2" style={{ fontSize: 16 }}>
          {booking.shopName} is expecting you.
        </p>
      </motion.div>

      {/* Booking card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.35 }}
        className="w-full max-w-sm mb-6"
      >
        <div
          className="rounded-[1.5rem] overflow-hidden"
          style={{ background: "var(--color-surface)" }}
        >
          {details.map(({ icon: Icon, label }, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3"
              style={{
                borderBottom:
                  i < details.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <Icon size={16} style={{ color: "#44CCFF", flexShrink: 0, marginTop: 2 }} />
              <span className="text-[14px] text-text-primary leading-snug">{label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35 }}
        className="w-full max-w-sm mb-8"
      >
        <p className="text-[11px] text-text-tertiary uppercase tracking-wider mb-3">
          What Happens Next
        </p>
        <div
          className="rounded-[1.5rem] p-4 space-y-3"
          style={{ background: "var(--color-surface)" }}
        >
          {nextSteps.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div
                className="flex-shrink-0 flex items-center justify-center font-bold text-[11px]"
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: "rgba(68,204,255,0.15)",
                  color: "#44CCFF",
                  border: "1px solid rgba(68,204,255,0.3)",
                  marginTop: 1,
                }}
              >
                {i + 1}
              </div>
              <p className="text-[13px] text-text-secondary leading-snug">{step}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.35 }}
        className="w-full max-w-sm space-y-3"
      >
        <button
          onClick={() => router.push("/feed")}
          className="w-full font-display font-bold rounded-2xl flex items-center justify-center gap-2 transition-opacity active:opacity-80"
          style={{
            height: 52,
            background: "linear-gradient(135deg, #44CCFF 0%, #0099CC 100%)",
            color: "#000",
            fontSize: 15,
            boxShadow: "0 4px 24px rgba(68,204,255,0.35)",
          }}
        >
          🏠 Back to Feed
        </button>
        <button
          onClick={() => {
            // Share to feed — placeholder
            router.push("/feed");
          }}
          className="w-full font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all active:opacity-80"
          style={{
            height: 52,
            background: "transparent",
            border: "1px solid var(--color-border)",
            color: "var(--color-text-secondary)",
            fontSize: 15,
          }}
        >
          📤 Share to Feed
        </button>
        <button
          className="w-full text-center text-[13px] text-text-tertiary py-2"
          onClick={() => {/* Add to Calendar */}}
        >
          Add to Calendar
        </button>
      </motion.div>
    </div>
  );
}
