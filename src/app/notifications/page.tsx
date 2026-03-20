"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, MessageCircle, Calendar, UserPlus } from "lucide-react";

interface Notification {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  text: string;
  time: string;
  unread: boolean;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    icon: Heart,
    iconColor: "#FF3B6F",
    text: "wrapsbyalex liked your build",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    icon: MessageCircle,
    iconColor: "var(--primary)",
    text: "jdm.mike commented on your M4 build",
    time: "5h ago",
    unread: true,
  },
  {
    id: "3",
    icon: Calendar,
    iconColor: "#34C759",
    text: "Booking confirmed at Elite Wraps Co.",
    time: "1d ago",
    unread: false,
  },
  {
    id: "4",
    icon: UserPlus,
    iconColor: "#A855F7",
    text: "porsche.daily started following you",
    time: "2d ago",
    unread: false,
  },
];

export default function NotificationsPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--topbar-shadow)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "var(--surface-low)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} color="var(--on-surface)" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>
          Notifications
        </span>
      </div>

      <div style={{ padding: "4px 0" }}>
        {MOCK_NOTIFICATIONS.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              No notifications yet
            </span>
          </div>
        ) : (
          MOCK_NOTIFICATIONS.map((notif) => {
            const Icon = notif.icon;
            return (
              <div
                key={notif.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  background: notif.unread
                    ? "var(--surface-card)"
                    : "transparent",
                  borderBottom: "1px solid var(--ghost-border)",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: "var(--surface-low)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} color={notif.iconColor} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: notif.unread ? 600 : 400,
                      color: "var(--on-surface)",
                      display: "block",
                      lineHeight: 1.4,
                    }}
                  >
                    {notif.text}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      marginTop: 2,
                      display: "block",
                    }}
                  >
                    {notif.time}
                  </span>
                </div>
                {notif.unread && (
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "var(--primary)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
