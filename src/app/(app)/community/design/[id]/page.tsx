"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Mock Data ─── */
type DesignData = {
  id: string; name: string; designer: { handle: string; name: string; verified: boolean; sales: number; rating: number };
  price: number | "free"; image: string; vehicle: string; style: string; coverage: string;
  desc: string; tags: string[]; colors: string[]; reviews: number;
};
const MOCK_DESIGNS: Record<string, DesignData> = {
  "1": {
    id: "1",
    name: "Carbon Ghost",
    designer: { handle: "livery.king", name: "Livery King", verified: true, sales: 892, rating: 4.9 },
    price: 75,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
    vehicle: "BMW M4",
    style: "Murdered Out",
    coverage: "Full Wrap",
    desc: "A stunning murdered-out carbon ghost livery with ultra-matte finish. Perfect for the BMW M4. Includes all panels, mirrors, and spoiler template.",
    tags: ["BMW", "M4", "Murdered Out", "Carbon", "Matte"],
    colors: ["Matte Black", "Carbon Grey"],
    reviews: 47,
  },
  "2": {
    id: "2",
    name: "Neon Drift Kit",
    designer: { handle: "wraplabs", name: "Wrap Labs Studio", verified: true, sales: 541, rating: 4.7 },
    price: "free",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    vehicle: "Toyota Supra",
    style: "JDM Street",
    coverage: "Partial Wrap",
    desc: "JDM-style neon drift kit for the Toyota Supra. Hood, roof, and trunk stripe package.",
    tags: ["Supra", "JDM", "Neon", "Drift"],
    colors: ["Neon Blue", "Electric Purple"],
    reviews: 28,
  },
};

const MOCK_REVIEWS = [
  { avatar: "M", name: "Marcus L.", rating: 5, date: "Mar 12, 2026", text: "Absolutely stunning quality. The installer matched it perfectly and my M4 looks completely transformed." },
  { avatar: "S", name: "Sofia R.", rating: 5, date: "Feb 28, 2026", text: "Tried it on my car using the preview tool and bought immediately. The template files are incredibly detailed." },
  { avatar: "D", name: "Devlin K.", rating: 4, date: "Feb 14, 2026", text: "Great design, very clean execution. Installation guide was thorough. Would definitely buy again." },
];

/* ─── Stars ─── */
function Stars({ rating }: { rating: number }) {
  return (
    <span style={{ color: "#FFD700", fontSize: 13 }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

/* ─── Purchase Modal ─── */
function PurchaseModal({
  design,
  onClose,
  onComplete,
}: {
  design: DesignData;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [purchased, setPurchased] = useState(false);
  const isFree = design.price === "free";

  const handlePurchase = () => {
    setPurchased(true);
    setTimeout(() => {
      onComplete();
      onClose();
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          zIndex: 998,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal — slide up on mobile, fade-in centered on desktop */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#14141A",
          borderRadius: "20px 20px 0 0",
          padding: "24px 24px 40px",
          maxWidth: 520,
          margin: "0 auto",
        }}
        className="purchase-modal"
      >
        {/* Drag handle */}
        <div
          style={{
            width: 40,
            height: 4,
            background: "rgba(255,255,255,0.15)",
            borderRadius: 100,
            margin: "0 auto 20px",
          }}
        />

        {purchased ? (
          /* Success state */
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(68,204,255,0.15)",
                border: "2px solid #44CCFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                margin: "0 auto 16px",
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              {isFree ? "Design Downloaded!" : "Design Purchased!"}
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>
              Check your profile to access it.
            </p>
          </div>
        ) : (
          <>
            {/* Thumbnail + name */}
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 20 }}>
              <img
                src={design.image}
                alt={design.name}
                style={{ width: 72, height: 54, objectFit: "cover", borderRadius: 10 }}
              />
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>{design.name}</p>
                <p style={{ fontSize: 13, color: "#44CCFF", fontFamily: "monospace", marginTop: 2 }}>
                  {isFree ? "FREE" : `$${design.price}`}
                </p>
              </div>
            </div>

            {/* What's included */}
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#44CCFF",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              What&apos;s included
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "High-res wrap template file",
                "Installation guide PDF",
                "3 color variations",
                "Lifetime updates",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span style={{ color: "#44CCFF", fontSize: 16, lineHeight: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <button
              onClick={handlePurchase}
              style={{
                width: "100%",
                height: 52,
                borderRadius: 100,
                background: "linear-gradient(135deg, #44CCFF, #0099cc)",
                color: "#0C0C10",
                fontWeight: 700,
                fontSize: 16,
                border: "none",
                cursor: "pointer",
              }}
            >
              {isFree ? "Download Free" : "Complete Purchase"}
            </button>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                marginTop: 12,
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.4)",
                fontSize: 14,
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              Cancel
            </button>
          </>
        )}
      </motion.div>

      <style>{`
        @media (min-width: 640px) {
          .purchase-modal {
            bottom: auto !important;
            top: 50% !important;
            left: 50% !important;
            right: auto !important;
            transform: translateY(-50%) translateX(-50%) !important;
            border-radius: 20px !important;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

/* ─── Main Page ─── */
export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === "string" ? params.id : "1";
  const design = MOCK_DESIGNS[id] ?? MOCK_DESIGNS["1"];

  const [activeThumb, setActiveThumb] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const isFree = design.price === "free";

  // Three thumbnails from the same image
  const thumbnails = [design.image, design.image + "&sat=-20", design.image + "&blur=1"];

  return (
    <div
      style={{
        background: "#0C0C10",
        minHeight: "100%",
        paddingBottom: 100,
      }}
    >
      {/* Back nav */}
      <div style={{ padding: "16px 20px 0" }}>
        <Link
          href="/community"
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ← Back to Community
        </Link>
      </div>

      {/* ── Main Layout: 60/40 desktop, stacked mobile ── */}
      <div
        style={{
          display: "flex",
          gap: 32,
          padding: "20px 20px 0",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* ── Left Column (60%) ── */}
        <div style={{ flex: "3 1 380px", minWidth: 0 }}>

          {/* Hero image */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              aspectRatio: "4/3",
              background: "#14141A",
            }}
          >
            <img
              src={design.image}
              alt={design.name}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Thumbnail row */}
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 12,
            }}
          >
            {thumbnails.map((thumb, i) => (
              <button
                key={i}
                onClick={() => setActiveThumb(i)}
                style={{
                  flex: 1,
                  aspectRatio: "4/3",
                  borderRadius: 10,
                  overflow: "hidden",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  opacity: activeThumb === i ? 1 : 0.5,
                  outline: activeThumb === i ? "2px solid #44CCFF" : "none",
                  outlineOffset: 2,
                  transition: "opacity 0.15s, outline 0.15s",
                }}
              >
                <img
                  src={design.image}
                  alt={`View ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>

          {/* Try on my car CTA */}
          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 100,
              background: "linear-gradient(135deg, #44CCFF, #0099cc)",
              color: "#0C0C10",
              fontWeight: 700,
              fontSize: 16,
              border: "none",
              cursor: "pointer",
              marginTop: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            🔮 Try on my car
          </button>
        </div>

        {/* ── Right Column (40%) ── */}
        <div
          style={{
            flex: "2 1 280px",
            minWidth: 260,
            background: "#14141A",
            borderRadius: 20,
            padding: "24px",
            border: "1px solid #2A2A36",
          }}
        >
          {/* Design name */}
          <h1
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            {design.name}
          </h1>

          {/* Designer row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #44CCFF33, #44CCFF11)",
                border: "1.5px solid #44CCFF44",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: "#44CCFF",
                flexShrink: 0,
              }}
            >
              {design.designer.name[0]}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                <Link
                  href={`/community/designer/${design.designer.handle}`}
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.8)",
                    textDecoration: "none",
                  }}
                >
                  @{design.designer.handle}
                </Link>
                {design.designer.verified && (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#44CCFF",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </span>
                )}
                <Stars rating={design.designer.rating} />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                  {design.designer.rating}
                </span>
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                {design.designer.sales} sales
              </p>
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            {isFree ? (
              <span
                style={{
                  display: "inline-block",
                  fontSize: 22,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: "#fff",
                  background: "rgba(68,204,255,0.15)",
                  border: "1px solid #44CCFF44",
                  padding: "4px 14px",
                  borderRadius: 8,
                  letterSpacing: "0.05em",
                }}
              >
                FREE
              </span>
            ) : (
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 800,
                  fontFamily: "monospace",
                  color: "#44CCFF",
                  letterSpacing: "-0.02em",
                }}
              >
                ${design.price}
              </span>
            )}
          </div>

          {/* Buy / Download button */}
          {purchased ? (
            <div
              style={{
                background: "rgba(68,204,255,0.1)",
                border: "1px solid #44CCFF44",
                borderRadius: 12,
                padding: "14px 16px",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 14, fontWeight: 700, color: "#44CCFF" }}>
                ✓ Design purchased! Check your profile.
              </p>
            </div>
          ) : (
            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 100,
                background: "linear-gradient(135deg, #44CCFF, #0099cc)",
                color: "#0C0C10",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                marginBottom: 20,
              }}
            >
              {isFree ? "Download Free" : "Buy this design"}
            </button>
          )}

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 18 }} />

          {/* Description */}
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              marginBottom: 18,
            }}
          >
            {design.desc}
          </p>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginBottom: 20,
            }}
          >
            {design.tags.map((tag: string) => (
              <span
                key={tag}
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  padding: "4px 12px",
                  borderRadius: 100,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Details table */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              borderRadius: 12,
              border: "1px solid #2A2A36",
              overflow: "hidden",
              marginBottom: 20,
            }}
          >
            {[
              { label: "Vehicle", value: design.vehicle },
              { label: "Style", value: design.style },
              { label: "Coverage", value: design.coverage },
              { label: "Colors", value: design.colors.join(", ") },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderBottom: i < 3 ? "1px solid #2A2A36" : "none",
                }}
              >
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Get it installed */}
          <div
            style={{
              background: "rgba(68,204,255,0.06)",
              border: "1px solid #44CCFF22",
              borderRadius: 12,
              padding: "16px",
              marginBottom: 20,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)", marginBottom: 6 }}>
              Get it installed
            </p>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 12, lineHeight: 1.5 }}>
              Find a certified AVACAR installer near you
            </p>
            <Link
              href="/marketplace/shops"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 700,
                color: "#44CCFF",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: 100,
                border: "1px solid #44CCFF44",
                background: "rgba(68,204,255,0.1)",
              }}
            >
              Find Installers →
            </Link>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", marginBottom: 20 }} />

          {/* Reviews section */}
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "#44CCFF",
              textTransform: "uppercase",
              marginBottom: 14,
            }}
          >
            Reviews ({design.reviews})
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {MOCK_REVIEWS.map((review) => (
              <div
                key={review.name}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: 12,
                  border: "1px solid #2A2A36",
                  padding: "14px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "rgba(255,255,255,0.8)",
                      flexShrink: 0,
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
                        {review.name}
                      </span>
                      <Stars rating={review.rating} />
                    </div>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>
                      {review.date}
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Purchase Modal ── */}
      <AnimatePresence>
        {modalOpen && (
          <PurchaseModal
            design={design}
            onClose={() => setModalOpen(false)}
            onComplete={() => setPurchased(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
