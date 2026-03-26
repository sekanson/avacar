"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Info,
  ChevronRight,
  LogOut,
  Moon,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Shield,
  Store,
  LayoutDashboard,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Toggle ───────────────────────────────────────────────────────────────────

function Toggle({
  value,
  onChange,
  accent = "#44CCFF",
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  accent?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      style={{
        width: 48,
        height: 26,
        borderRadius: 999,
        background: value ? accent : "var(--color-border)",
        border: "none",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.2s",
        flexShrink: 0,
        padding: 0,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "#FFFFFF",
          position: "absolute",
          top: 3,
          left: value ? 25 : 3,
          transition: "left 0.2s",
          boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
        }}
      />
    </button>
  );
}

// ─── Row components ───────────────────────────────────────────────────────────

function SettingRow({
  icon: Icon,
  label,
  sublabel,
  onPress,
  accent = "#A0A0B0",
  danger = false,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  accent?: string;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onPress}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        background: "none",
        border: "none",
        borderBottom: "1px solid var(--color-border)",
        cursor: "pointer",
        textAlign: "left",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: danger ? "rgba(248,113,113,0.10)" : "rgba(68,204,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={danger ? "#F87171" : accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: 15,
            fontWeight: 500,
            color: danger ? "#F87171" : "var(--color-text-primary)",
            margin: 0,
          }}
        >
          {label}
        </p>
        {sublabel && (
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "1px 0 0" }}>{sublabel}</p>
        )}
      </div>
      <ChevronRight size={17} color="var(--color-border)" />
    </button>
  );
}

function ToggleRow({
  icon: Icon,
  label,
  sublabel,
  value,
  onChange,
  accent = "#44CCFF",
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  value: boolean;
  onChange: (v: boolean) => void;
  accent?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "rgba(68,204,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={17} color={accent} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>{label}</p>
        {sublabel && (
          <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "1px 0 0" }}>{sublabel}</p>
        )}
      </div>
      <Toggle value={value} onChange={onChange} accent={accent} />
    </div>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <p
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: "var(--color-text-tertiary)",
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        padding: "20px 16px 8px",
        margin: 0,
      }}
    >
      {title}
    </p>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SettingsPage() {
  const router = useRouter();

  // Notification toggles
  const [pushNotifs, setPushNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  const [buildAlerts, setBuildAlerts] = useState(true);
  const [shopAlerts, setShopAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  // Privacy toggles
  const [publicProfile, setPublicProfile] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Creator mode
  const [creatorMode, setCreatorMode] = useState(false);
  const [sellerType, setSellerType] = useState("Individual Designer");

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 40, maxWidth: 1280, margin: "0 auto" }}>
      {/* TopBar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: 56,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 20px",
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={17} color="var(--color-text-secondary)" />
        </button>
        <h1
          style={{
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
            fontWeight: 900,
            fontSize: 20,
            color: "var(--color-text-primary)",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Settings
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* ── Account ───────────────────────────────────────────────── */}
        <SectionHeader title="Account" />
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <SettingRow
            icon={User}
            label="Edit Profile"
            sublabel="Update name, bio, photo"
            onPress={() => router.push("/profile/edit")}
            accent="#44CCFF"
          />
          <SettingRow
            icon={Lock}
            label="Change Password"
            sublabel="Last changed 3 months ago"
            accent="#44CCFF"
          />
          <ToggleRow
            icon={Moon}
            label="Dark Mode"
            sublabel="Always on for AVACAR"
            value={darkMode}
            onChange={setDarkMode}
          />
        </div>

        {/* ── Creator Mode ──────────────────────────────────────────── */}
        <div style={{ padding: "20px 16px 8px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
            Creator Mode
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <ToggleRow
            icon={Store}
            label="Sell on AVA.CAR"
            sublabel="List and sell your designs, reach car enthusiasts worldwide."
            value={creatorMode}
            onChange={setCreatorMode}
            accent="#44CCFF"
          />
          {creatorMode && (
            <div style={{ padding: "16px 16px 20px", borderTop: "1px solid var(--color-border)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Seller type
                </label>
                <select
                  value={sellerType}
                  onChange={(e) => setSellerType(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "var(--color-surface-elevated)", color: "var(--color-text-primary)", fontSize: 14, outline: "none", cursor: "pointer" }}
                >
                  {["Individual Designer", "Shop", "Studio"].map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: "var(--color-text-tertiary)", letterSpacing: "0.04em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Display name
                </label>
                <input
                  defaultValue="WrapsbyAlex"
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", background: "var(--color-surface-elevated)", color: "var(--color-text-primary)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <button
                style={{ width: "100%", height: 44, borderRadius: 100, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #44CCFF, #007FFF)", color: "#fff", fontSize: 14, fontWeight: 800, fontFamily: "var(--font-manrope, Manrope, sans-serif)" }}
              >
                Save Changes
              </button>
              <button
                onClick={() => router.push("/marketplace/dashboard")}
                style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: "100%", padding: "10px", background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#44CCFF" }}
              >
                <LayoutDashboard size={15} />
                View Seller Dashboard →
              </button>
            </div>
          )}
        </div>

        {/* ── Brand Management ──────────────────────────────────────── */}
        <div style={{ padding: "20px 16px 8px" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", letterSpacing: "0.06em", textTransform: "uppercase", margin: 0 }}>
            Brand Management
          </p>
        </div>
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <Link
            href="/marketplace/brand-portal"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 14,
              padding: "14px 16px",
              borderBottom: "1px solid var(--color-border)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "rgba(68,204,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Building2 size={17} color="#44CCFF" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)", margin: 0 }}>
                Brand Portal
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-tertiary)", margin: "1px 0 0" }}>
                Manage your product catalog, analytics, and sponsored placements.
              </p>
            </div>
            <ChevronRight size={17} color="var(--color-border)" />
          </Link>
        </div>

        {/* ── Notifications ─────────────────────────────────────────── */}
        <SectionHeader title="Notifications" />
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <ToggleRow
            icon={Smartphone}
            label="Push Notifications"
            sublabel="Likes, follows, quotes"
            value={pushNotifs}
            onChange={setPushNotifs}
          />
          <ToggleRow
            icon={Mail}
            label="Email Notifications"
            sublabel="Summary emails"
            value={emailNotifs}
            onChange={setEmailNotifs}
          />
          <ToggleRow
            icon={Bell}
            label="Build Alerts"
            sublabel="When your build is ready"
            value={buildAlerts}
            onChange={setBuildAlerts}
          />
          <ToggleRow
            icon={Bell}
            label="Shop Alerts"
            sublabel="New shops near you"
            value={shopAlerts}
            onChange={setShopAlerts}
          />
          <ToggleRow
            icon={Mail}
            label="Marketing Emails"
            sublabel="Tips, trends, promos"
            value={marketingEmails}
            onChange={setMarketingEmails}
            accent="#A78BFA"
          />
        </div>

        {/* ── Privacy ───────────────────────────────────────────────── */}
        <SectionHeader title="Privacy" />
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <ToggleRow
            icon={Eye}
            label="Public Profile"
            sublabel="Anyone can see your builds"
            value={publicProfile}
            onChange={setPublicProfile}
            accent="#34D399"
          />
          <ToggleRow
            icon={EyeOff}
            label="Show Activity Status"
            value={showActivity}
            onChange={setShowActivity}
            accent="#34D399"
          />
          <SettingRow
            icon={Shield}
            label="Blocked Users"
            sublabel="Manage your block list"
            accent="#44CCFF"
          />
        </div>

        {/* ── About ─────────────────────────────────────────────────── */}
        <SectionHeader title="About" />
        <div
          style={{
            background: "var(--color-surface)",
            borderRadius: 16,
            border: "1px solid var(--color-border)",
            margin: "0 16px",
            overflow: "hidden",
          }}
        >
          <SettingRow
            icon={Info}
            label="About AVACAR"
            sublabel="Version 1.0"
            accent="#44CCFF"
          />
          <SettingRow
            icon={Info}
            label="Privacy Policy"
            accent="#A0A0B0"
          />
          <SettingRow
            icon={Info}
            label="Terms of Service"
            accent="#A0A0B0"
          />
        </div>

        {/* ── Sign Out ──────────────────────────────────────────────── */}
        <div style={{ padding: "24px 16px 0" }}>
          <button
            onClick={() => router.push("/auth/login")}
            style={{
              width: "100%",
              height: 52,
              borderRadius: 12,
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              cursor: "pointer",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 15,
              fontWeight: 800,
              color: "#F87171",
              transition: "background 0.2s",
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}
