"use client";

import Link from "next/link";
import { useState } from "react";
import { Upload, User, Settings } from "lucide-react";

/* ─── Data ─── */
const STATS = [
  { value: "$2,847", label: "Revenue", sub: "This Mo." },
  { value: "42",     label: "Designs",  sub: "Listed"    },
  { value: "1,247",  label: "Sales",    sub: "Total"     },
  { value: "★4.9",   label: "Rating",   sub: "Average"   },
];

const RECENT_SALES = [
  { design: "Midnight Fury",  buyer: "@carbro",    license: "Personal",   amount: 149,   date: "Mar 24" },
  { design: "Arctic Storm",   buyer: "@driftking", license: "Commercial", amount: 498,   date: "Mar 23" },
  { design: "Cherry Bomb",    buyer: "@newbie22",  license: "Personal",   amount: 129,   date: "Mar 22" },
  { design: "Neon Circuit",   buyer: "@jdmfan",   license: "Personal",   amount: 89,    date: "Mar 21" },
  { design: "Phantom Edge",   buyer: "@euroboy",  license: "Exclusive",  amount: 1314,  date: "Mar 20" },
];

const TOP_DESIGNS = [
  { name: "Midnight Fury",  views: "2.4K", sales: 42, img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=267&fit=crop&q=70&fm=webp" },
  { name: "Arctic Storm",   views: "1.8K", sales: 31, img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&h=267&fit=crop&q=70&fm=webp" },
  { name: "Cherry Bomb",    views: "1.2K", sales: 24, img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=267&fit=crop&q=70&fm=webp" },
];

const LICENSE_COLOR: Record<string, string> = {
  Personal:   "rgba(68,204,255,0.15)",
  Commercial: "rgba(167,139,250,0.15)",
  Exclusive:  "rgba(52,211,153,0.15)",
};
const LICENSE_TEXT: Record<string, string> = {
  Personal:   "#44CCFF",
  Commercial: "#A78BFA",
  Exclusive:  "#34D399",
};

/* ─── Stat Card ─── */
function StatCard({ stat }: { stat: typeof STATS[0] }) {
  return (
    <div style={{ background: "var(--color-surface)", borderRadius: 16, padding: 20 }}>
      <p style={{ fontSize: 28, fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 2px", fontFamily: "var(--font-manrope, Manrope, sans-serif)", letterSpacing: "-0.03em" }}>
        {stat.value}
      </p>
      <p style={{ fontSize: 12, fontWeight: 500, color: "var(--color-text-secondary)", margin: "0 0 2px" }}>{stat.label}</p>
      <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: 0 }}>{stat.sub}</p>
    </div>
  );
}

/* ─── Main Page ─── */
export default function SellerDashboardPage() {
  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100%", padding: "24px 20px 100px" }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
          Seller Dashboard
        </p>
        <h1 style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)", fontWeight: 800, fontSize: 24, color: "var(--color-text-primary)", letterSpacing: "-0.04em", margin: 0 }}>
          Welcome back, WrapsbyAlex
        </h1>
      </div>

      {/* ── Stat Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 32 }}>
        {STATS.map((s) => <StatCard key={s.label} stat={s} />)}
      </div>

      {/* ── Recent Sales ── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
          Recent Sales
        </p>
        <div style={{ background: "var(--color-surface)", borderRadius: 16, overflow: "hidden" }}>
          {RECENT_SALES.map((sale, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                borderBottom: i < RECENT_SALES.length - 1 ? "1px solid var(--color-border)" : "none",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {sale.design}
                </p>
                <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: 0 }}>{sale.buyer} · {sale.date}</p>
              </div>
              <span style={{ padding: "3px 10px", borderRadius: 100, background: LICENSE_COLOR[sale.license], fontSize: 11, fontWeight: 700, color: LICENSE_TEXT[sale.license], flexShrink: 0 }}>
                {sale.license}
              </span>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", margin: 0, flexShrink: 0 }}>
                ${sale.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top Designs ── */}
      <div style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
          Top Designs
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {TOP_DESIGNS.map((d) => (
            <div key={d.name} style={{ background: "var(--color-surface)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ position: "relative", aspectRatio: "3/2" }}>
                <img src={d.img} alt={d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: 8, left: 8, right: 8 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#fff", margin: "0 0 2px" }}>{d.name}</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: 0 }}>{d.views} views · {d.sales} sales</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 16px" }}>
          Quick Actions
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link
            href="/marketplace/upload"
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 14,
              background: "linear-gradient(135deg, rgba(68,204,255,0.12), rgba(0,127,255,0.12))",
              textDecoration: "none",
            }}
          >
            <Upload size={18} color="#44CCFF" />
            <span style={{ fontSize: 14, fontWeight: 700, color: "#44CCFF" }}>Upload New Design →</span>
          </Link>
          <Link
            href="/marketplace/designers/wrapsbyalex"
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 14,
              background: "var(--color-surface)",
              textDecoration: "none",
            }}
          >
            <User size={18} color="var(--color-text-secondary)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>View My Profile →</span>
          </Link>
          <button
            style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 18px", borderRadius: 14,
              background: "var(--color-surface)",
              border: "none", cursor: "pointer", width: "100%",
            }}
          >
            <Settings size={18} color="var(--color-text-secondary)" />
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>Manage Designs →</span>
          </button>
        </div>
      </div>
    </div>
  );
}
