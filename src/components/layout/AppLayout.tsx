"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, User, Bell, Sun, Moon, Camera, Sparkles, Car } from "lucide-react";
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
  { id: "feed",    href: "/feed",    icon: Home,     label: "Feed"    },
  { id: "explore", href: "/explore", icon: Compass,  label: "Explore" },
  { id: "design",  href: "/upload",  icon: Sparkles, label: "Studio"  },
  { id: "garage",  href: "/garage",  icon: Car,      label: "Garage"  },
  { id: "profile", href: "/profile", icon: User,     label: "Profile" },
];

function getActiveTab(pathname: string): NavTab | null {
  if (pathname === "/feed" || pathname === "/") return "feed";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname.startsWith("/garage")) return "garage";
  if (pathname === "/profile") return "profile";
  if (
    pathname.startsWith("/upload") ||
    pathname.startsWith("/customize") ||
    pathname.startsWith("/rendering") ||
    pathname.startsWith("/confirm-vehicle") ||
    pathname.startsWith("/detecting")
  ) return "design";
  return null;
}

/* ─── Theme hook ─── */
function useTheme() {
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

  return { darkMode, toggleTheme };
}

/* ─── Mobile TopBar ─── */
function TopBar() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

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

/* ─── Mobile TabBar — 5 tabs, Design Studio center elevated ─── */
function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveTab } = useAppStore();

  const activeTab = getActiveTab(pathname);

  const handleTabPress = (tab: TabConfig) => {
    setActiveTab(tab.id);
    router.push(tab.href);
  };

  return (
    <nav className="tabbar">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        const isCenter = tab.id === "design";
        const Icon = tab.icon;

        if (isCenter) {
          return (
            <button
              key={tab.id}
              onClick={() => handleTabPress(tab)}
              aria-label={tab.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
                flex: "0 0 auto",
                padding: "0 8px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  background: "#007FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -14,
                  boxShadow: "0 4px 20px rgba(0,127,255,0.4)",
                }}
              >
                <Icon size={22} color="#fff" strokeWidth={2} />
              </div>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "#007FFF",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => handleTabPress(tab)}
            className={`tab-item${isActive ? " active" : ""}`}
            aria-label={tab.label}
          >
            <Icon
              size={22}
              className="tab-icon"
              color={isActive ? "var(--accent, #007FFF)" : "var(--on-surface-variant)"}
              strokeWidth={2}
            />
            <span
              className="tab-label"
              style={{ opacity: isActive ? 1 : 0.6 }}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

/* ─── Desktop Sidebar ─── */
function DesktopSidebar({
  pathname,
  darkMode,
  onToggleTheme,
}: {
  pathname: string;
  darkMode: boolean;
  onToggleTheme: () => void;
}) {
  const router = useRouter();
  const { setActiveTab } = useAppStore();
  const activeTab = getActiveTab(pathname);

  const handleNav = (tab: TabConfig) => {
    setActiveTab(tab.id);
    router.push(tab.href);
  };

  return (
    <aside className="desktop-sidebar">
      {/* Logo */}
      <div className="desktop-sidebar-logo">
        <span>AVACAR</span>
      </div>

      {/* Nav items */}
      <nav className="desktop-sidebar-nav">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => handleNav(tab)}
              className={`desktop-nav-item${isActive ? " active" : ""}`}
            >
              <Icon size={20} strokeWidth={2} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Upload CTA */}
      <button
        className="desktop-upload-btn"
        onClick={() => router.push("/upload")}
      >
        <Camera size={18} />
        <span>Upload My Car</span>
      </button>

      {/* Footer */}
      <div className="desktop-sidebar-footer">
        <button
          className="tbb"
          onClick={() => router.push("/notifications")}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        <button
          className="tbb"
          onClick={onToggleTheme}
          aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </aside>
  );
}

/* ─── Desktop Right Panel ─── */
function RightPanel() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

  const suggestedBuilds = [
    { username: "wrapsbyalex", car: "2024 BMW M4", tag: "Satin Black Wrap", avatar: "W" },
    { username: "gta.wraps", car: "2024 Porsche 911", tag: "Satin Ceramic + PPF", avatar: "G" },
    { username: "chromedelete_co", car: "2025 Tesla Model 3", tag: "Full Chrome Delete", avatar: "C" },
    { username: "ppf.obsessed", car: "2024 BMW M3", tag: "Full XPEL PPF", avatar: "P" },
  ];

  const trendingTags = ["satin-black", "ceramic-tint", "chrome-delete", "full-ppf", "widebody"];

  return (
    <aside className="desktop-right-panel">
      <div className="desktop-right-panel-actions">
        <button className="tbb" onClick={() => router.push("/notifications")} aria-label="Notifications">
          <Bell size={18} />
        </button>
        <button className="tbb" onClick={toggleTheme} aria-label="Toggle theme">
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>

      <div className="rp-card rp-hero-card">
        <p className="rp-overline">Start Building</p>
        <p className="rp-title">Design your car, get quoted</p>
        <p className="rp-sub">Upload a photo and see your build come to life</p>
        <button
          className="desktop-upload-btn"
          onClick={() => router.push("/upload")}
          style={{ width: "100%", marginTop: 12 }}
        >
          <Camera size={16} />
          Upload My Car
        </button>
      </div>

      <div className="rp-card">
        <p className="rp-overline">Trending</p>
        <p className="rp-title" style={{ marginBottom: 12 }}>Popular Builds</p>
        {trendingTags.map((tag) => (
          <div key={tag} className="rp-trend-row">
            <span className="rp-trend-tag">#{tag}</span>
          </div>
        ))}
      </div>

      <div className="rp-card">
        <p className="rp-overline">Discover</p>
        <p className="rp-title" style={{ marginBottom: 12 }}>Builders to Follow</p>
        {suggestedBuilds.map((b) => (
          <div key={b.username} className="rp-user-row">
            <div className="rp-avatar">{b.avatar}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p className="rp-username">@{b.username}</p>
              <p className="rp-usertag">{b.car} · {b.tag}</p>
            </div>
            <button className="rp-follow-btn">Follow</button>
          </div>
        ))}
      </div>

      <div className="rp-footer">
        <span>Privacy</span><span>Terms</span><span>About</span>
        <span style={{ width: "100%", marginTop: 4, display: "block" }}>© 2026 AVACAR</span>
      </div>
    </aside>
  );
}

/* ─── Toast ─── */
function Toast() {
  const { toast } = useAppStore();
  if (!toast) return null;
  return <div className="toast">{toast}</div>;
}

/* ─── Main Layout ─── */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDesktop, setIsDesktop] = useState(false);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isFullScreen =
    FULL_SCREEN_ROUTES.has(pathname) ||
    (pathname !== "/feed" &&
      pathname !== "/profile" &&
      FULL_SCREEN_PREFIXES.some((prefix) => pathname.startsWith(prefix)));

  const showRightPanel =
    isDesktop && !isFullScreen && (pathname === "/feed" || pathname.startsWith("/explore"));

  return (
    <div className="phone">
      {/* MOBILE chrome */}
      {!isDesktop && !isFullScreen && <TopBar />}

      {/* DESKTOP sidebar */}
      {isDesktop && !isFullScreen && (
        <DesktopSidebar
          pathname={pathname}
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
        />
      )}

      {/* Content area */}
      {isDesktop && !isFullScreen ? (
        <div className="desktop-main">
          <div className={showRightPanel ? "desktop-three-col" : "desktop-two-col"}>
            <div className="desktop-content">
              {children}
            </div>
            {showRightPanel && <RightPanel />}
          </div>
        </div>
      ) : (
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", minHeight: 0 }}>
          {children}
        </main>
      )}

      {/* MOBILE tab bar */}
      {!isDesktop && !isFullScreen && <TabBar />}

      <Toast />
    </div>
  );
}
