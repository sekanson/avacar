"use client";

import { usePathname, useRouter } from "next/navigation";
import { Home, Compass, User, Bell, Sun, Moon, Sparkles, Car, Smartphone, Store, ShoppingCart } from "lucide-react";
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
  if (pathname.startsWith("/marketplace")) return null; // handled separately in sidebar
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
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();
  const isMarketplace = pathname.startsWith("/marketplace");

  return (
    <header className="topbar">
      <div className="flex items-center gap-1">
        <span className="topbar-title">{isMarketplace ? "Shop" : "AVACAR"}</span>
      </div>
      <div className="flex gap-0.5">
        <button
          className="tbb"
          onClick={() => router.push("/marketplace/cart")}
          aria-label="Cart"
          style={{ color: pathname === "/marketplace/cart" ? "var(--accent)" : undefined }}
        >
          <ShoppingCart size={20} />
        </button>
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

/* ─── Desktop Top Nav ─── */
const FEED_CATEGORIES = ["All", "Wraps", "Wheels", "Tint", "PPF", "Suspension", "Performance"];

function DesktopTopNav({
  darkMode,
  onToggleTheme,
  mobilePreview,
  onToggleMobilePreview,
}: {
  darkMode: boolean;
  onToggleTheme: () => void;
  mobilePreview: boolean;
  onToggleMobilePreview: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCat, setActiveCat] = useState("All");
  const isFeed = pathname === "/feed" || pathname === "/";

  return (
    <div className="desktop-topnav">
      {/* Row 1: search + actions */}
      <div className="desktop-topnav-row1">
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <input
            className="desktop-topnav-search"
            type="search"
            placeholder="Search builds, cars, people..."
            aria-label="Search"
            style={{ width: "100%", maxWidth: 560 }}
          />
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
          <button className="tbb" onClick={onToggleMobilePreview} aria-label="Toggle mobile preview" title="Mobile preview" style={{ color: mobilePreview ? "var(--accent)" : undefined }}>
            <Smartphone size={18} />
          </button>
          <button className="tbb" onClick={() => router.push("/marketplace/cart")} aria-label="Cart">
            <ShoppingCart size={18} />
          </button>
          <button className="tbb" onClick={() => router.push("/notifications")} aria-label="Notifications">
            <Bell size={20} />
          </button>
          <button className="tbb" onClick={onToggleTheme} aria-label={`Toggle ${darkMode ? "light" : "dark"} mode`}>
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      {/* Row 2: category pills — only on feed */}
      {isFeed && (
        <div className="desktop-topnav-pills">
          {FEED_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`topnav-pill${activeCat === cat ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Desktop Sidebar ─── */
function DesktopSidebar({
  pathname,
}: {
  pathname: string;
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
      <div className="desktop-sidebar-inner">
        {/* Logo — AV collapsed, AVACAR on hover */}
        <button className="desktop-sidebar-logo" onClick={() => router.push("/feed")} aria-label="AVACAR home">
          <span className="sidebar-logo-text" style={{
            fontFamily: "var(--font-manrope), Manrope, sans-serif",
            fontSize: 17,
            fontWeight: 900,
            fontStyle: "italic",
            letterSpacing: "-0.03em",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}>
            <span className="sidebar-logo-short" style={{ color: "var(--primary)" }}>AV</span>
            <span className="sidebar-logo-rest" style={{ color: "var(--primary)" }}>ACAR</span>
          </span>
        </button>

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
          {/* Shop — desktop sidebar only */}
          <button
            onClick={() => router.push("/marketplace")}
            className={`desktop-nav-item${pathname.startsWith("/marketplace") ? " active" : ""}`}
          >
            <Store size={20} strokeWidth={2} />
            <span>Shop</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="desktop-sidebar-footer">
          <span style={{ fontSize: 11, color: "var(--on-surface-variant)" }}>© 2026 AVACAR</span>
        </div>
      </div>
    </aside>
  );
}

/* ─── Desktop Right Panel ─── */
function RightPanel() {
  const suggestedBuilds = [
    { username: "wrapsbyalex", car: "2024 BMW M4", tag: "Satin Black Wrap", avatar: "W" },
    { username: "gta.wraps", car: "2024 Porsche 911", tag: "Satin Ceramic + PPF", avatar: "G" },
    { username: "chromedelete_co", car: "2025 Tesla Model 3", tag: "Full Chrome Delete", avatar: "C" },
    { username: "ppf.obsessed", car: "2024 BMW M3", tag: "Full XPEL PPF", avatar: "P" },
  ];

  const trendingTags = ["satin-black", "ceramic-tint", "chrome-delete", "full-ppf", "widebody"];

  return (
    <aside className="desktop-right-panel">

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
  const { darkMode, toggleTheme } = useTheme();
  const [mobilePreview, setMobilePreview] = useState(false);

  const isFullScreen =
    FULL_SCREEN_ROUTES.has(pathname) ||
    (pathname !== "/feed" &&
      pathname !== "/profile" &&
      FULL_SCREEN_PREFIXES.some((prefix) => pathname.startsWith(prefix)));

  const showRightPanel = false; // Right panel removed per design update

  if (isFullScreen) {
    return (
      <div className="phone">
        <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", minHeight: 0 }}>
          {children}
        </main>
        <Toast />
      </div>
    );
  }

  return (
    <div className="phone">
      {/* MOBILE-only chrome (hidden on desktop via CSS) */}
      <div className="mobile-only-chrome">
        <TopBar />
      </div>

      {/* DESKTOP-only sidebar (hidden on mobile via CSS) */}
      <div className="desktop-only-chrome">
        <DesktopSidebar
          pathname={pathname}
        />
      </div>

      {/* MOBILE content wrapper (hidden on desktop via CSS) */}
      <main className="mobile-only-chrome" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto", minHeight: 0 }}>
        {children}
      </main>

      {/* DESKTOP content area (hidden on mobile via CSS) */}
      <div className="desktop-only-chrome desktop-main">
        <DesktopTopNav
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          mobilePreview={mobilePreview}
          onToggleMobilePreview={() => setMobilePreview(p => !p)}
        />
        <div className={showRightPanel && !mobilePreview ? "desktop-three-col" : "desktop-two-col"}>
          <div className={mobilePreview ? "desktop-content desktop-mobile-preview" : "desktop-content"}>
            {children}
          </div>
          {showRightPanel && !mobilePreview && <RightPanel />}
        </div>
      </div>

      {/* MOBILE tab bar (hidden on desktop via CSS) */}
      <div className="mobile-only-chrome">
        <TabBar />
      </div>

      <Toast />
    </div>
  );
}
