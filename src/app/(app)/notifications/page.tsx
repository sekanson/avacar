"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, Heart, MapPin, Star, UserPlus, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

// ─── Mock Data ────────────────────────────────────────────────────────────────

type NotifType = "like" | "follow" | "shop" | "quote" | "system";

interface Notification {
  id: string;
  type: NotifType;
  text: string;
  time: string;
  unread: boolean;
  initial: string;
  gradient: string;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "n1",
    type: "like",
    text: "Jordan liked your Supra Build",
    time: "2m ago",
    unread: true,
    initial: "J",
    gradient: "linear-gradient(135deg, #003d8f, #005ab7)",
  },
  {
    id: "n2",
    type: "follow",
    text: "wrapsbyalex started following you",
    time: "14m ago",
    unread: true,
    initial: "W",
    gradient: "linear-gradient(135deg, #0a080e, #1a1030)",
  },
  {
    id: "n3",
    type: "shop",
    text: "New certified shop near you — CarbonWerks in Mississauga",
    time: "1h ago",
    unread: true,
    initial: "C",
    gradient: "linear-gradient(135deg, #1a0505, #3d0e0e)",
  },
  {
    id: "n4",
    type: "quote",
    text: "Your quote for M3 Chrome Delete is ready",
    time: "3h ago",
    unread: false,
    initial: "Q",
    gradient: "linear-gradient(135deg, #081408, #0e2010)",
  },
  {
    id: "n5",
    type: "system",
    text: "Your GT500 Build was featured in Trending 🔥",
    time: "1d ago",
    unread: false,
    initial: "A",
    gradient: "linear-gradient(135deg, #0a0a12, #14141A)",
  },
];

const ICON_MAP: Record<NotifType, React.ElementType> = {
  like: Heart,
  follow: UserPlus,
  shop: MapPin,
  quote: Wrench,
  system: Star,
};

const ACCENT_MAP: Record<NotifType, string> = {
  like: "#F87171",
  follow: "#44CCFF",
  shop: "#34D399",
  quote: "#FBBF24",
  system: "#A78BFA",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markOneRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <div style={{ background: "var(--color-bg)", minHeight: "100vh", paddingBottom: 24 }}>
      {/* TopBar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "rgba(12,12,16,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(42,42,54,0.50)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#0C0C10",
                  background: "#44CCFF",
                  borderRadius: 999,
                  padding: "2px 8px",
                  minWidth: 22,
                  textAlign: "center",
                }}
              >
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#44CCFF",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      <div style={{ padding: "12px 16px 0" }}>
        {notifications.map((notif, i) => {
          const Icon = ICON_MAP[notif.type];
          const accent = ACCENT_MAP[notif.type];

          return (
            <motion.button
              key={notif.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              onClick={() => markOneRead(notif.id)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 12px",
                borderRadius: 14,
                background: notif.unread ? "rgba(68,204,255,0.04)" : "transparent",
                border: notif.unread ? "1px solid rgba(68,204,255,0.10)" : "1px solid transparent",
                marginBottom: 8,
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.2s",
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: notif.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    fontWeight: 900,
                    fontSize: 16,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {notif.initial}
                </div>
                {/* Type badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: accent,
                    border: "2px solid #0C0C10",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icon size={10} color="#0C0C10" />
                </div>
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: notif.unread ? 600 : 400,
                    color: notif.unread ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                    margin: "0 0 3px",
                    lineHeight: 1.4,
                  }}
                >
                  {notif.text}
                </p>
                <span style={{ fontSize: 12, color: "var(--color-text-tertiary)" }}>{notif.time}</span>
              </div>

              {/* Unread dot */}
              {notif.unread && (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#44CCFF",
                    flexShrink: 0,
                    boxShadow: "0 0 8px rgba(68,204,255,0.60)",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
