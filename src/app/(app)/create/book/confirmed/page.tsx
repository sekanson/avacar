"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, Car } from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";

interface PendingBooking {
  shopName: string;
  shopAddress: string;
  date: string;
  time: string | null;
  notes: string;
  totalMin: number;
  totalMax: number;
  itemCount: number;
  vehicle: string;
}

function formatCents(cents: number): string {
  if (cents === 0) return "$0";
  return "$" + (cents / 100).toLocaleString("en-US", { maximumFractionDigits: 0 });
}

// Generate a stable confirmation code once per mount
function generateCode(): string {
  return "AVC-" + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export default function BookingConfirmedPage() {
  const router = useRouter();
  const { currentBuild } = useBuildStore();
  const [booking, setBooking] = useState<PendingBooking | null>(null);
  const [confirmCode] = useState(generateCode);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem("avacar-pending-booking");
      if (raw) {
        try {
          setBooking(JSON.parse(raw) as PendingBooking);
        } catch {
          // Ignore parse errors
        }
      }
    }
  }, []);

  // Fallback values
  const shopName = booking?.shopName ?? "Apex Customs";
  const shopAddress = booking?.shopAddress ?? "2847 West Olympic Blvd, Los Angeles, CA 90006";
  const date = booking?.date ?? "Tomorrow";
  const time = booking?.time ?? "9:00 AM";
  const totalMin = booking?.totalMin ?? currentBuild.totalMin;
  const totalMax = booking?.totalMax ?? currentBuild.totalMax;
  const itemCount =
    booking?.itemCount ?? Object.keys(currentBuild.items).length;
  const vehicle =
    booking?.vehicle ??
    (currentBuild.vehicle
      ? `${currentBuild.vehicle.year} ${currentBuild.vehicle.make} ${currentBuild.vehicle.model}`
      : "Your Vehicle");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-12 gap-6 overflow-y-auto">
      {/* Success animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1,
        }}
        className="flex-shrink-0"
      >
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(52,211,153,0.12)",
            border: "2px solid rgba(52,211,153,0.4)",
            boxShadow: "0 0 32px rgba(52,211,153,0.2)",
          }}
        >
          <CheckCircle size={48} className="text-success" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-center"
      >
        <h1 className="text-display-lg font-display text-success">
          Booking Confirmed!
        </h1>
        <p className="text-body-md text-text-secondary mt-1">
          The shop has been notified of your appointment.
        </p>
      </motion.div>

      {/* Confirmation code */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <div
          className="rounded-card px-6 py-5 text-center"
          style={{
            background: "rgba(68,204,255,0.06)",
            border: "1px solid rgba(68,204,255,0.25)",
          }}
        >
          <p className="text-body-xs text-text-tertiary uppercase tracking-widest mb-2">
            Confirmation Code
          </p>
          <p
            className="font-mono text-3xl font-bold text-cyan tracking-widest"
            style={{ letterSpacing: "0.08em" }}
          >
            {confirmCode}
          </p>
          <p className="text-body-xs text-text-tertiary mt-2">
            Save this for reference
          </p>
        </div>
      </motion.div>

      {/* Details card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="w-full max-w-sm"
      >
        <div
          className="rounded-card overflow-hidden"
          style={{ background: "#14141A", border: "1px solid #2A2A36" }}
        >
          {/* Shop */}
          <div className="px-4 py-4 border-b border-surface-border">
            <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-1">Shop</p>
            <p className="text-body-md font-semibold text-text-primary">{shopName}</p>
            <p className="text-body-xs text-text-secondary mt-0.5">{shopAddress}</p>
          </div>

          {/* Date & Time */}
          <div className="px-4 py-4 border-b border-surface-border flex items-center gap-3">
            <Calendar size={18} className="text-cyan flex-shrink-0" />
            <div>
              <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-0.5">
                Appointment
              </p>
              <p className="text-body-md text-text-primary">
                {date} at {time}
              </p>
            </div>
          </div>

          {/* Build summary */}
          <div className="px-4 py-4 border-b border-surface-border flex items-center gap-3">
            <Car size={18} className="text-cyan flex-shrink-0" />
            <div>
              <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-0.5">
                Vehicle & Build
              </p>
              <p className="text-body-md text-text-primary">{vehicle}</p>
              <p className="text-body-xs text-text-secondary mt-0.5">
                {itemCount} item{itemCount !== 1 ? "s" : ""} selected
              </p>
            </div>
          </div>

          {/* Estimated cost */}
          <div className="px-4 py-4">
            <p className="text-body-xs text-text-tertiary uppercase tracking-wider mb-1">
              Estimated Cost
            </p>
            {totalMin > 0 ? (
              <p className="text-display-sm font-display text-cyan">
                {formatCents(totalMin)}
                <span className="text-text-tertiary mx-1">–</span>
                {formatCents(totalMax)}
              </p>
            ) : (
              <p className="text-body-md text-text-secondary">TBD at shop</p>
            )}
            <p className="text-body-xs text-text-tertiary mt-1">
              Final price confirmed at the shop
            </p>
          </div>
        </div>
      </motion.div>

      {/* Email notice */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="text-body-sm text-text-secondary text-center max-w-xs"
      >
        A confirmation has been sent to your email.
      </motion.p>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.3 }}
        className="w-full max-w-sm space-y-3"
      >
        <button
          onClick={() => router.push("/garage")}
          className="w-full flex items-center justify-center font-display font-semibold text-text-inverse rounded-button transition-colors active:opacity-90"
          style={{
            height: 52,
            background: "#44CCFF",
            boxShadow: "0 0 24px rgba(68,204,255,0.35)",
          }}
        >
          View in Garage
        </button>
        <button
          onClick={() => router.push("/feed")}
          className="w-full flex items-center justify-center font-display font-semibold text-text-secondary rounded-button transition-colors"
          style={{
            height: 52,
            background: "transparent",
            border: "1px solid #2A2A36",
          }}
        >
          Back to Feed
        </button>
      </motion.div>
    </div>
  );
}
