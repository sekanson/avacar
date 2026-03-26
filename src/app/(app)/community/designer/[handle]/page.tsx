"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Mock Designer Data ─── */
type DesignerData = {
  handle: string; name: string; verified: boolean; bio: string; bioLong?: string;
  specialty: string[]; stats: { designs: number; followers: string; following: number; sales: number };
  socialLinks: Record<string, string>; coverImage: string; joinedYear: number;
};
const MOCK_DESIGNERS: Record<string, DesignerData> = {
  "livery.king": {
    handle: "livery.king",
    name: "Livery King",
    verified: true,
    bio: "Professional automotive graphic designer. 10+ years wrapping exotic cars. Based in LA.",
    bioLong: "Professional automotive graphic designer with over a decade of experience creating custom liveries for exotic and performance vehicles. Based in Los Angeles, I've worked with private collectors, motorsport teams, and luxury dealerships to craft unique wrap identities. My specialty lies in murdered-out aesthetics and racing-inspired graphics that turn heads on both the track and the street.",
    specialty: ["Racing Livery", "Murdered Out", "Luxury"],
    stats: { designs: 47, followers: "12.4K", following: 234, sales: 892 },
    socialLinks: { instagram: "livery.king", twitter: "liveryking" },
    coverImage: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1200&q=80",
    joinedYear: 2021,
  },
  "wraplabs": {
    handle: "wraplabs",
    name: "Wrap Labs Studio",
    verified: true,
    bio: "Design studio specializing in color-shift and clean euro aesthetics. Available for commissions.",
    bioLong: "Wrap Labs Studio is a boutique automotive design collective focused on color-shift wraps, clean euro aesthetics, and minimal race-inspired graphics. We approach each project as a collaboration between the vehicle's design language and the owner's personality. Our studio is currently accepting commissions for full liveries and partial packages.",
    specialty: ["Color Shift", "Clean Euro"],
    stats: { designs: 31, followers: "8.7K", following: 89, sales: 541 },
    socialLinks: { instagram: "wraplabs" },
    coverImage: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=80",
    joinedYear: 2022,
  },
  "neon.designs": {
    handle: "neon.designs",
    name: "Neon Designs Co",
    verified: true,
    bio: "Racing and JDM livery specialist. Created designs for motorsport teams globally.",
    bioLong: "Neon Designs Co is a globally recognized livery studio with a portfolio spanning professional motorsport and street culture. From GT3 race liveries to JDM street kits, our work has been featured in automotive publications and on circuits across three continents. We bring the same professional rigor to every design regardless of budget.",
    specialty: ["Racing Livery", "JDM Street"],
    stats: { designs: 58, followers: "21.1K", following: 412, sales: 1243 },
    socialLinks: { instagram: "neon.designs", twitter: "neondesigns" },
    coverImage: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&q=80",
    joinedYear: 2020,
  },
};

/* ─── All Designs ─── */
const ALL_DESIGNS = [
  { id: "1",  name: "Carbon Ghost",    handle: "livery.king",  price: 75,     image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", vehicle: "BMW M4",       style: "Murdered Out" },
  { id: "9",  name: "Night Crawler",   handle: "livery.king",  price: "free", image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80", vehicle: "Toyota Supra", style: "Murdered Out" },
  { id: "17", name: "Street King",     handle: "livery.king",  price: 40,     image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", vehicle: "Honda Civic",  style: "JDM Street" },
  { id: "20", name: "Gold Rush",       handle: "livery.king",  price: 175,    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", vehicle: "BMW M4",       style: "Racing Livery" },
  { id: "2",  name: "Neon Drift Kit",  handle: "wraplabs",     price: "free", image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80", vehicle: "Toyota Supra", style: "JDM Street" },
  { id: "16", name: "Prism Shift",     handle: "wraplabs",     price: 130,    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", vehicle: "Toyota Supra", style: "Color Shift" },
  { id: "6",  name: "Sunset Race",     handle: "neon.designs", price: 180,    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80", vehicle: "Nissan GT-R",  style: "Racing Livery" },
  { id: "14", name: "Inferno Racing",  handle: "neon.designs", price: 200,    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80", vehicle: "Porsche 911",  style: "Racing Livery" },
  { id: "20b",name: "Gold Rush",       handle: "neon.designs", price: 175,    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80", vehicle: "BMW M4",       style: "Racing Livery" },
];

const MOCK_REVIEWS = [
  { avatar: "J", name: "Jake M.", rating: 5, date: "Mar 15, 2026", text: "Incredible attention to detail. The template files are production-ready and the install guide saved me hours." },
  { avatar: "A", name: "Aisha T.", rating: 5, date: "Feb 20, 2026", text: "Best designer on the platform. My car gets stopped everywhere. Worth every penny." },
  { avatar: "R", name: "Ryder C.", rating: 4, date: "Jan 30, 2026", text: "Very clean work. Communication was fast and the final result exceeded my expectations." },
];

/* ─── Stars ─── */
function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span style={{ color: "#FFD700", fontSize: size }}>
      {"★".repeat(Math.round(rating))}
      {"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

/* ─── Mini Design Card ─── */
function MiniDesignCard({ design }: { design: (typeof ALL_DESIGNS)[0] }) {
  const isFree = design.price === "free";
  return (
    <Link
      href={`/community/design/${design.id}`}
      style={{
        background: "#14141A",
        borderRadius: 12,
        overflow: "hidden",
        textDecoration: "none",
        display: "block",
        border: "1px solid #2A2A36",
      }}
    >
      <div style={{ aspectRatio: "3/2", overflow: "hidden" }}>
        <img
          src={design.image}
          alt={design.name}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>
      <div style={{ padding: "10px 12px 12px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.9)", lineHeight: 1.3 }}>
          {design.name}
        </p>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{design.vehicle}</p>
        <p
          style={{
            fontSize: 12,
            fontWeight: 700,
            fontFamily: isFree ? "inherit" : "monospace",
            color: "#44CCFF",
            marginTop: 6,
          }}
        >
          {isFree ? "FREE" : `$${design.price}`}
        </p>
      </div>
    </Link>
  );
}

/* ─── Commission Modal ─── */
function CommissionModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", car: "", description: "" });

  const handleSend = () => {
    setSent(true);
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
          background: "rgba(0,0,0,0.75)",
          zIndex: 998,
          backdropFilter: "blur(4px)",
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 999,
          background: "#14141A",
          borderRadius: 20,
          padding: "28px 24px",
          width: "calc(100vw - 40px)",
          maxWidth: 480,
          border: "1px solid #2A2A36",
        }}
      >
        {sent ? (
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "rgba(68,204,255,0.15)",
                border: "2px solid #44CCFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                margin: "0 auto 16px",
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              Request Sent!
            </h3>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
              The designer will review your commission request and get back to you within 48 hours.
            </p>
            <button
              onClick={onClose}
              style={{
                marginTop: 20,
                padding: "10px 28px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.7)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#fff",
                marginBottom: 4,
                letterSpacing: "-0.02em",
              }}
            >
              Commission Request
            </h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>
              Describe your project and the designer will reach out.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {[
                { key: "name", label: "Your Name", placeholder: "e.g. Alex Johnson" },
                { key: "email", label: "Email", placeholder: "you@example.com" },
                { key: "car", label: "Car Model", placeholder: "e.g. 2023 BMW M4 Competition" },
              ].map((field) => (
                <div key={field.key}>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      marginBottom: 6,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type="text"
                    value={form[field.key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      height: 42,
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid #2A2A36",
                      color: "#fff",
                      fontSize: 14,
                      padding: "0 14px",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.5)",
                    marginBottom: 6,
                    letterSpacing: "0.04em",
                  }}
                >
                  Project Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe the style, colors, and any references you have..."
                  rows={4}
                  style={{
                    width: "100%",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid #2A2A36",
                    color: "#fff",
                    fontSize: 14,
                    padding: "10px 14px",
                    outline: "none",
                    resize: "vertical",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSend}
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
                marginBottom: 10,
              }}
            >
              Send Request
            </button>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.35)",
                fontSize: 13,
                cursor: "pointer",
                padding: "8px 0",
              }}
            >
              Cancel
            </button>
          </>
        )}
      </motion.div>
    </>
  );
}

/* ─── Main Page ─── */
export default function DesignerProfilePage() {
  const params = useParams();
  const handle = typeof params?.handle === "string" ? params.handle : "livery.king";
  const designer = MOCK_DESIGNERS[handle] ?? MOCK_DESIGNERS["livery.king"];

  const [activeTab, setActiveTab] = useState<"designs" | "reviews" | "about">("designs");
  const [activeFilter, setActiveFilter] = useState("All Designs");
  const [followed, setFollowed] = useState(false);
  const [commissionOpen, setCommissionOpen] = useState(false);

  // Filter designs for this designer
  const designerDesigns = ALL_DESIGNS.filter((d) => d.handle === designer.handle);

  // Unique styles for filter
  const styles = ["All Designs", ...Array.from(new Set(designerDesigns.map((d) => d.style)))];

  const filteredDesigns =
    activeFilter === "All Designs"
      ? designerDesigns
      : designerDesigns.filter((d) => d.style === activeFilter);

  const initials = designer.name
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avgRating = 4.8;

  return (
    <div style={{ background: "#0C0C10", minHeight: "100%", paddingBottom: 100 }}>

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

      {/* ── Cover Image ── */}
      <div style={{ position: "relative", height: 200, overflow: "hidden", marginTop: 12 }}>
        <img
          src={designer.coverImage}
          alt="Cover"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, #0C0C10 0%, transparent 55%)",
          }}
        />
      </div>

      {/* ── Profile Header ── */}
      <div style={{ padding: "0 20px", marginTop: -44 }}>

        {/* Avatar — overlapping cover */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #44CCFF, #007FFF)",
            border: "3px solid #0C0C10",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            fontWeight: 800,
            color: "#fff",
            marginBottom: 12,
            flexShrink: 0,
          }}
        >
          {initials}
        </div>

        {/* Name + verified */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {designer.name}
          </h1>
          {designer.verified && (
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#44CCFF",
                background: "rgba(68,204,255,0.15)",
                border: "1px solid #44CCFF44",
                padding: "2px 8px",
                borderRadius: 100,
              }}
            >
              ✓ Verified
            </span>
          )}
        </div>

        {/* Handle */}
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
          @{designer.handle}
        </p>

        {/* Bio */}
        <p
          style={{
            fontSize: 14,
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.6,
            marginBottom: 18,
            maxWidth: 560,
          }}
        >
          {designer.bio}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginBottom: 18,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "Designs", value: designer.stats.designs },
            { label: "Followers", value: designer.stats.followers },
            { label: "Following", value: designer.stats.following },
            { label: "Sales", value: designer.stats.sales },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#fff",
                  margin: 0,
                  letterSpacing: "-0.02em",
                }}
              >
                {stat.value}
              </p>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: "2px 0 0" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
          <button
            onClick={() => setFollowed((f) => !f)}
            style={{
              height: 40,
              padding: "0 24px",
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
              background: followed
                ? "rgba(255,255,255,0.08)"
                : "linear-gradient(135deg, #44CCFF, #007FFF)",
              color: followed ? "rgba(255,255,255,0.7)" : "#fff",
              fontSize: 14,
              fontWeight: 700,
              transition: "all 0.2s",
            }}
          >
            {followed ? "Following" : "Follow"}
          </button>
          <button
            onClick={() => setCommissionOpen(true)}
            style={{
              height: 40,
              padding: "0 24px",
              borderRadius: 100,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.15s",
            }}
          >
            Commission Me
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          padding: "0 20px",
          marginBottom: 24,
        }}
      >
        {(["designs", "reviews", "about"] as const).map((tab) => {
          const labels: Record<string, string> = {
            designs: "Designs",
            reviews: "Reviews",
            about: "About",
          };
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 16px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: activeTab === tab ? "#44CCFF" : "rgba(255,255,255,0.4)",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? "2px solid #44CCFF" : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.15s",
                textTransform: "uppercase",
              }}
            >
              {labels[tab]}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      <div style={{ padding: "0 20px" }}>

        {/* DESIGNS TAB */}
        {activeTab === "designs" && (
          <>
            {/* Style filter chips */}
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 20,
              }}
            >
              {styles.map((s) => (
                <button
                  key={s}
                  onClick={() => setActiveFilter(s)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 100,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    background: activeFilter === s ? "#44CCFF" : "rgba(255,255,255,0.07)",
                    color: activeFilter === s ? "#0C0C10" : "rgba(255,255,255,0.6)",
                    border: activeFilter === s ? "none" : "1px solid #2A2A36",
                    transition: "all 0.15s",
                  } as React.CSSProperties}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Design grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 14,
              }}
            >
              {filteredDesigns.map((d) => (
                <MiniDesignCard key={d.id} design={d} />
              ))}
            </div>

            {filteredDesigns.length === 0 && (
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "40px 0" }}>
                No designs in this style.
              </p>
            )}
          </>
        )}

        {/* REVIEWS TAB */}
        {activeTab === "reviews" && (
          <>
            {/* Average rating summary */}
            <div
              style={{
                background: "#14141A",
                borderRadius: 16,
                border: "1px solid #2A2A36",
                padding: "20px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    fontSize: 44,
                    fontWeight: 800,
                    color: "#fff",
                    letterSpacing: "-0.03em",
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  {avgRating}
                </p>
                <Stars rating={avgRating} size={16} />
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>
                  {MOCK_REVIEWS.length} reviews
                </p>
              </div>
              <div
                style={{ height: 60, width: 1, background: "rgba(255,255,255,0.08)" }}
              />
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>
                Consistently rated for quality templates, fast communication, and outstanding results.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {MOCK_REVIEWS.map((review) => (
                <div
                  key={review.name}
                  style={{
                    background: "#14141A",
                    borderRadius: 12,
                    border: "1px solid #2A2A36",
                    padding: "16px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "rgba(255,255,255,0.8)",
                        flexShrink: 0,
                      }}
                    >
                      {review.avatar}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.9)",
                          }}
                        >
                          {review.name}
                        </span>
                        <Stars rating={review.rating} />
                      </div>
                      <p
                        style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.35)",
                          marginTop: 1,
                        }}
                      >
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.65,
                    }}
                  >
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ABOUT TAB */}
        {activeTab === "about" && (
          <div style={{ maxWidth: 600 }}>

            {/* Long bio */}
            <div
              style={{
                background: "#14141A",
                borderRadius: 16,
                border: "1px solid #2A2A36",
                padding: "20px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#44CCFF",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                About
              </p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
                {designer.bioLong}
              </p>
            </div>

            {/* Specialties */}
            <div
              style={{
                background: "#14141A",
                borderRadius: 16,
                border: "1px solid #2A2A36",
                padding: "20px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#44CCFF",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Specialties
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {designer.specialty.map((s: string) => (
                  <span
                    key={s}
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.75)",
                      background: "rgba(255,255,255,0.07)",
                      border: "1px solid #2A2A36",
                      padding: "6px 14px",
                      borderRadius: 100,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Member since + social */}
            <div
              style={{
                background: "#14141A",
                borderRadius: 16,
                border: "1px solid #2A2A36",
                padding: "20px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#44CCFF",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Details
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Member since</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                    {designer.joinedYear}
                  </span>
                </div>
                {designer.socialLinks.instagram && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Instagram</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF" }}>
                      @{designer.socialLinks.instagram}
                    </span>
                  </div>
                )}
                {designer.socialLinks.twitter && (
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Twitter</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#44CCFF" }}>
                      @{designer.socialLinks.twitter}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Earnings blurb */}
            <div
              style={{
                background: "#14141A",
                borderRadius: 16,
                border: "1px solid #2A2A36",
                padding: "20px",
                marginBottom: 20,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  color: "#44CCFF",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Creator Earnings
              </p>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 14, lineHeight: 1.5 }}>
                This creator has earned with AVACAR
              </p>

              {/* Chart placeholder */}
              <div
                style={{
                  height: 72,
                  borderRadius: 10,
                  background: "rgba(68,204,255,0.05)",
                  border: "1px solid #44CCFF22",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-around",
                  padding: "0 12px 12px",
                  gap: 6,
                }}
              >
                {[40, 60, 45, 75, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background: `rgba(68,204,255,${0.2 + i * 0.1})`,
                      borderRadius: "4px 4px 0 0",
                    }}
                  />
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 8, textAlign: "center" }}>
                Last 7 months
              </p>
            </div>

            {/* Commission CTA */}
            <button
              onClick={() => setCommissionOpen(true)}
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
              }}
            >
              Commission Me
            </button>
          </div>
        )}
      </div>

      {/* ── Commission Modal ── */}
      <AnimatePresence>
        {commissionOpen && (
          <CommissionModal onClose={() => setCommissionOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
