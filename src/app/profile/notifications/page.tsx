"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Heart, MessageCircle, Store, Rss } from "lucide-react";

interface NotifSetting {
  id: string;
  icon: React.ElementType;
  label: string;
  sublabel: string;
  defaultOn: boolean;
}

const NOTIFICATION_SETTINGS: NotifSetting[] = [
  {
    id: "new-followers",
    icon: UserPlus,
    label: "New Followers",
    sublabel: "When someone follows your profile",
    defaultOn: true,
  },
  {
    id: "build-likes",
    icon: Heart,
    label: "Build Likes",
    sublabel: "When someone likes your build",
    defaultOn: true,
  },
  {
    id: "build-comments",
    icon: MessageCircle,
    label: "Build Comments",
    sublabel: "When someone comments on your build",
    defaultOn: true,
  },
  {
    id: "shop-responses",
    icon: Store,
    label: "Shop Responses",
    sublabel: "Replies from shops on your quotes",
    defaultOn: true,
  },
  {
    id: "new-builds-following",
    icon: Rss,
    label: "New Builds from Following",
    sublabel: "When people you follow post new builds",
    defaultOn: false,
  },
];

export default function NotificationSettingsPage() {
  const router = useRouter();

  const [toggles, setToggles] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    NOTIFICATION_SETTINGS.forEach((s) => {
      initial[s.id] = s.defaultOn;
    });
    return initial;
  });

  const handleToggle = (id: string) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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

      <div style={{ padding: "12px 16px 40px" }}>
        {NOTIFICATION_SETTINGS.map((setting) => {
          const Icon = setting.icon;
          const isOn = toggles[setting.id];
          return (
            <div
              key={setting.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid var(--ghost-border)",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: "var(--surface-card)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Icon size={18} color="var(--primary)" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    display: "block",
                  }}
                >
                  {setting.label}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: "var(--muted)",
                    display: "block",
                    marginTop: 2,
                  }}
                >
                  {setting.sublabel}
                </span>
              </div>
              <button
                onClick={() => handleToggle(setting.id)}
                aria-label={`Toggle ${setting.label}`}
                style={{
                  width: 48,
                  height: 28,
                  borderRadius: 14,
                  border: "none",
                  cursor: "pointer",
                  background: isOn ? "var(--primary)" : "var(--outline)",
                  position: "relative",
                  transition: "background 0.2s",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: 3,
                    left: isOn ? 23 : 3,
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,.2)",
                  }}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
