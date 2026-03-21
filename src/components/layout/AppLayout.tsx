"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, Plus, LayoutGrid, User, Bell, Sun, Moon } from "lucide-react";
import { useAppStore } from "@/store/appStore";
import type { NavTab } from "@/types";
import { useState, useEffect } from "react";

// Routes that render full-screen without chrome
const FULL_SCREEN_ROUTES = new Set([
  "/splash",
  "/onboarding",
  "/auth/signup",
  "/auth/login",
  "/auth/forgot",
  "/upload",
  "/detecting",
  "/confirm-vehicle",
  "/rendering",
  "/booking-confirmed",
  "/booking-review",
  "/feed/create",
  "/notifications",
]);

// Routes that start with these prefixes are also full-screen
const FULL_SCREEN_PREFIXES = ["/feed/", "/shop/", "/profile/"] as const;

interface TabConfig {
  id: NavTab;
  href: string;
  icon: React.ElementType;
  label: string;
}

const TABS: TabConfig[] = [
  { id: "feed", href: "/feed", icon: Home, label: "Feed" },
  { id: "explore", href: "/explore", icon: Compass, label: "Explore" },
  { id: "garage", href: "/garage", icon: LayoutGrid, label: "Garage" },
  { id: "profile", href: "/profile", icon: User, label: "Profile" },
];

function TopBar() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("avacar-theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
    localStorage.setItem("avacar-theme", next ? "dark" : "light");
  };

  return (
    <header className="topbar">
      <div className="flex items-center gap-1">
        <span className="topbar-title">AVACAR</span>
      </div>
      <div className="flex gap-0.5">
        <button
          className="tbb"
          onClick={() => router.push("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <button
          className="tbb"
          onClick={toggleTheme}
          aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}

function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveTab } = useAppStore();

  const getActiveTab = (): NavTab | null => {
    if (pathname === "/feed" || pathname === "/") return "feed";
    if (pathname.startsWith("/explore")) return "explore";
    if (pathname.startsWith("/garage")) return "garage";
    if (pathname === "/profile") return "profile";
    return null;
  };

  const activeTab = getActiveTab();

  const handleTabPress = (tab: TabConfig) => {
    setActiveTab(tab.id);
    router.push(tab.href);
  };

  return (
    <nav className="tabbar" style={{ position: "relative" }}>
      {/* FAB Upload button */}
      <div
        style={{
          position: "absolute",
          top: -28,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <button
          onClick={() => router.push("/upload")}
          aria-label="Upload car photo"
          style={{
            width: 56,
            height: 56,
            borderRadius: 28,
            background: "var(--accent, #007FFF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(0,127,255,.35)",
            transition: "transform .2s",
            color: "#fff",
          }}
        >
          <Plus size={24} />
        </button>
      </div>

      {/* First two tabs */}
      {TABS.slice(0, 2).map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabPress(tab)}
            className={`tab-item${isActive ? " active" : ""}`}
            aria-label={tab.label}
          >
            <Icon
              size={24}
              className="tab-icon"
              color={isActive ? "var(--primary)" : "var(--muted)"}
              strokeWidth={2}
            />
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}

      {/* Spacer for FAB */}
      <div style={{ width: 64 }} aria-hidden="true" />

      {/* Last two tabs */}
      {TABS.slice(2).map((tab) => {
        const isActive = activeTab === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => handleTabPress(tab)}
            className={`tab-item${isActive ? " active" : ""}`}
            aria-label={tab.label}
          >
            <Icon
              size={24}
              className="tab-icon"
              color={isActive ? "var(--primary)" : "var(--muted)"}
              strokeWidth={2}
            />
            <span className="tab-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isFullScreen =
    FULL_SCREEN_ROUTES.has(pathname) ||
    (pathname !== "/feed" &&
      pathname !== "/profile" &&
      FULL_SCREEN_PREFIXES.some((prefix) => pathname.startsWith(prefix)));

  return (
    <div className="phone">
      {!isFullScreen && <TopBar />}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", minHeight: 0 }}>
        {children}
      </main>
      {!isFullScreen && <TabBar />}
      <Toast />
    </div>
  );
}

function Toast() {
  const { toast } = useAppStore();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}
