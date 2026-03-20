"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  ChevronRight,
  Bell,
  Moon,
  HelpCircle,
  LogOut,
  UserPen,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function ProfilePage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const { savedBuilds } = useAppStore();
  const avatarLetter = "U";

  const settingsRows = [
    { icon: UserPen, label: "Edit Profile", path: "/profile/edit" },
    { icon: Bell, label: "Notifications", path: "/profile/notifications" },
    { icon: HelpCircle, label: "Help & Support", path: "/profile/help" },
  ];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "24px 20px 100px" }}>
      {/* Profile header */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, marginBottom: 24 }}>
        {/* Avatar with camera overlay */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--primary-alpha-15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 28,
              color: "var(--primary)",
              fontFamily: "var(--font-manrope), Manrope, sans-serif",
            }}
          >
            {avatarLetter}
          </div>
          <button
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--surface-card)",
              border: "2px solid var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <Camera size={13} style={{ color: "var(--muted)" }} />
          </button>
        </div>

        {/* Name + username */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-manrope), Manrope, sans-serif",
              fontWeight: 700,
              fontSize: 20,
              color: "var(--on-surface)",
              margin: 0,
            }}
          >
            Your Name
          </h2>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "2px 0 0" }}>
            @username
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          background: "var(--surface-card)",
          borderRadius: 12,
          boxShadow: "var(--shadow-card)",
          marginBottom: 24,
        }}
      >
        {[
          { label: "Posts", value: savedBuilds.length.toString() },
          { label: "Followers", value: "248" },
          { label: "Following", value: "89" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "14px 0",
              borderRight: i < 2 ? "1px solid var(--ghost-border)" : undefined,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-manrope), Manrope, sans-serif",
                fontWeight: 700,
                fontSize: 18,
                color: "var(--on-surface)",
              }}
            >
              {stat.value}
            </span>
            <span style={{ fontSize: 11, color: "var(--muted)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Settings rows */}
      <div>
        {settingsRows.map((row) => (
          <div
            key={row.label}
            className="prow"
            onClick={() => router.push(row.path)}
            role="button"
            tabIndex={0}
          >
            <row.icon size={20} style={{ color: "var(--muted)", flexShrink: 0 }} />
            <span
              style={{
                flex: 1,
                fontSize: 15,
                fontWeight: 500,
                color: "var(--on-surface)",
              }}
            >
              {row.label}
            </span>
            <ChevronRight size={18} style={{ color: "var(--outline)" }} />
          </div>
        ))}

        {/* Dark Mode toggle row */}
        <div className="prow" role="button" tabIndex={0} onClick={() => setDarkMode((v) => !v)}>
          <Moon size={20} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <span
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: 500,
              color: "var(--on-surface)",
            }}
          >
            Dark Mode
          </span>
          <div
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              background: darkMode ? "var(--primary)" : "var(--surface-high)",
              position: "relative",
              transition: "background .2s",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "var(--surface-card)",
                position: "absolute",
                top: 3,
                left: darkMode ? 23 : 3,
                transition: "left .2s",
                boxShadow: "0 1px 3px rgba(0,0,0,.15)",
              }}
            />
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "var(--ghost-border)", margin: "8px 0" }} />

        {/* Log Out */}
        <div
          className="prow"
          role="button"
          tabIndex={0}
          onClick={() => router.push("/auth/login")}
        >
          <LogOut size={20} style={{ color: "var(--error)", flexShrink: 0 }} />
          <span
            style={{
              flex: 1,
              fontSize: 15,
              fontWeight: 500,
              color: "var(--error)",
            }}
          >
            Log Out
          </span>
          <ChevronRight size={18} style={{ color: "var(--outline)" }} />
        </div>
      </div>
    </div>
  );
}
