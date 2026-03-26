"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Home, Compass, User, Bell, Sun, Moon, Sparkles, Car,
  Smartphone, Store, ShoppingCart, MapPin, Plus,
  Wrench, Disc3, Palette, Globe, Paintbrush, Film, Camera, MessageCircle,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { useState, useEffect, useRef, useCallback } from "react";
import CartPanel from "@/components/commerce/CartPanel";

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
  "/create/book/confirmed",
  "/feed/create",
  "/notifications",
  "/create",
  "/create/customize",
  "/create/detect",
  "/create/render",
  "/create/touchup",
  "/create/video",
  "/marketplace/upload",
]);

// Routes that start with these prefixes are also full-screen
const FULL_SCREEN_PREFIXES = ["/feed/", "/shop/", "/profile/"] as const;

// ─── Mobile Tab Config ────────────────────────────────────────────────────────

type MobileTabId = "feed" | "explore" | "create" | "catalog" | "garage";

interface MobileTabConfig {
  id: MobileTabId;
  href: string;
  icon: React.ElementType;
  label: string;
  isCenter?: boolean;
}

const MOBILE_TABS: MobileTabConfig[] = [
  { id: "feed",    href: "/feed",        icon: Home,     label: "Home"    },
  { id: "explore", href: "/explore",     icon: Compass,  label: "Explore" },
  { id: "create",  href: "/create",      icon: Sparkles, label: "Create",  isCenter: true },
  { id: "catalog", href: "/marketplace", icon: Store,    label: "Catalog" },
  { id: "garage",  href: "/garage",      icon: Car,      label: "Garage"  },
];

const SHEET_TOOLS = [
  { Icon: Sparkles,   label: "Quick Build",   href: "/create" },
  { Icon: Disc3,      label: "Swap Wheels",   href: "/create/customize?category=modify&sub=wheels" },
  { Icon: Palette,    label: "Change Wrap",   href: "/create/customize?category=modify&sub=wraps" },
  { Icon: Globe,      label: "Scene",         href: "/create/customize?category=scenes" },
  { Icon: Sparkles,   label: "Style Explorer",href: "/create/customize?category=styles" },
  { Icon: Paintbrush, label: "Touch Up",      href: "/create/touchup" },
  { Icon: Film,       label: "Car Motion",    href: "/create/video" },
  { Icon: Camera,     label: "Content",       href: "/create" },
];

function getMobileActiveTab(pathname: string): MobileTabId | null {
  if (pathname === "/feed" || pathname === "/") return "feed";
  if (pathname.startsWith("/explore")) return "explore";
  if (pathname.startsWith("/garage")) return "garage";
  if (pathname.startsWith("/marketplace")) return "catalog";
  if (pathname.startsWith("/create")) return "create";
  return null;
}

/* ─── Theme hook ─── */
function useTheme() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("avacar-theme");
    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("avacar-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("avacar-theme", "light");
    }
  };

  return { darkMode, toggleTheme };
}

/* ─── Mobile TopBar ─── */
function TopBar({ onToggleCart }: { onToggleCart: () => void }) {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <header className="topbar">
      <div className="flex items-center gap-1">
        <img
          src={darkMode ? "/logo/avacar-logo-white.png" : "/logo/avacar-logo-black.png"}
          alt="AVA.CAR"
          style={{ height: 20, width: "auto" }}
        />
      </div>
      <div className="flex gap-0.5">
        <button className="tbb" onClick={onToggleCart} aria-label="Cart">
          <ShoppingCart size={20} />
        </button>
        <button className="tbb" onClick={() => router.push("/notifications")} aria-label="Notifications">
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

/* ─── Mobile TabBar — 5 tabs, +Create center opens bottom sheet ─── */
function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { setActiveTab } = useAppStore();
  const [sheetOpen, setSheetOpen] = useState(false);

  const activeTab = getMobileActiveTab(pathname);

  const handleTabPress = (tab: MobileTabConfig) => {
    if (tab.isCenter) {
      setSheetOpen(true);
      return;
    }
    setActiveTab(tab.id as Parameters<typeof setActiveTab>[0]);
    router.push(tab.href);
  };

  const handleSheetTool = (href: string) => {
    setSheetOpen(false);
    router.push(href);
  };

  return (
    <>
      <nav className="tab-bar">
        {MOBILE_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          if (tab.isCenter) {
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
                    background: "#44CCFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: -14,
                    boxShadow: "0 4px 20px rgba(68,204,255,0.4)",
                  }}
                >
                  <Icon size={22} color="#0C0C10" strokeWidth={2} />
                </div>
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "#44CCFF",
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
              className={`tab-bar-item${isActive ? " active" : ""}`}
              aria-label={tab.label}
            >
              <Icon
                size={22}
                color={isActive ? "var(--color-cyan)" : "var(--color-text-tertiary)"}
                strokeWidth={2}
              />
              <span style={{ fontSize: 10, fontWeight: 500, opacity: isActive ? 1 : 0.6 }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Sheet */}
      {sheetOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setSheetOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              zIndex: 200,
            }}
          />
          {/* Sheet */}
          <div
            style={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              background: "var(--color-surface)",
              borderRadius: "24px 24px 0 0",
              zIndex: 201,
              paddingBottom: 32,
            }}
          >
            {/* Handle */}
            <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
              <div style={{
                width: 40,
                height: 4,
                borderRadius: 999,
                background: "var(--color-border)",
              }} />
            </div>
            {/* Tool grid — 2 rows of 4 */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              padding: "12px 20px 0",
            }}>
              {SHEET_TOOLS.map((tool) => {
                const ToolIcon = tool.Icon;
                return (
                <button
                  key={tool.label}
                  onClick={() => handleSheetTool(tool.href)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 4px",
                  }}
                >
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "var(--color-surface-elevated)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                    <ToolIcon size={22} color="var(--color-text-secondary)" strokeWidth={2} />
                  </div>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: "var(--color-text-secondary)",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}>
                    {tool.label}
                  </span>
                </button>
              );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* ─── Desktop Top Nav ─── */
const FEED_CATEGORIES = ["All", "Wraps", "Wheels", "Tint", "PPF", "Suspension", "Performance"];

function DesktopTopNav({
  darkMode,
  onToggleTheme,
  mobilePreview,
  onToggleMobilePreview,
  onToggleCart,
}: {
  darkMode: boolean;
  onToggleTheme: () => void;
  mobilePreview: boolean;
  onToggleMobilePreview: () => void;
  onToggleCart: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeCat, setActiveCat] = useState("All");
  const [searchFocused, setSearchFocused] = useState(false);
  const showCategoryPills = pathname.startsWith("/explore");

  return (
    <div className="desktop-topnav">
      <div className="desktop-topnav-row1">
        <button
          onClick={() => router.push("/feed")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0 8px 0 0", flexShrink: 0 }}
          aria-label="AVACAR home"
        >
          <img
            src={darkMode ? "/logo/avacar-logo-white.png" : "/logo/avacar-logo-black.png"}
            alt="AVACAR"
            style={{ height: 20, width: "auto" }}
          />
        </button>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", position: "relative" }}>
          <input
            className="desktop-topnav-search"
            type="search"
            placeholder="Search wheels, wraps, or describe your build..."
            aria-label="Search"
            style={{ width: "100%", maxWidth: 560 }}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
          />
          {searchFocused && (
            <div style={{
              position: "absolute", top: "100%", left: "50%", transform: "translateX(-50%)",
              width: "100%", maxWidth: 560, marginTop: 6,
              background: "var(--color-surface)", borderRadius: 12,
              padding: 12, boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              zIndex: 100, border: "1px solid var(--color-border)",
            }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#44CCFF", margin: "0 0 8px" }}>🔍 Try:</p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>&ldquo;HRE P101&rdquo;</span> → find the product
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "0 0 6px" }}>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>&ldquo;matte black G-Wagon Tokyo&rdquo;</span> → create
              </p>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>
                <span style={{ color: "var(--color-text-primary)", fontWeight: 600 }}>&ldquo;@wrapsbyalex&rdquo;</span> → find creator
              </p>
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 4 }}>
          <button
            className="tbb"
            onClick={onToggleMobilePreview}
            aria-label="Toggle mobile preview"
            title="Mobile preview"
            style={{ color: mobilePreview ? "var(--accent)" : undefined }}
          >
            <Smartphone size={18} />
          </button>
          <button className="tbb" onClick={() => router.push("/messages")} aria-label="Messages">
            <MessageCircle size={18} />
          </button>
          <button className="tbb" onClick={onToggleCart} aria-label="Cart">
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

      {showCategoryPills && (
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

function DesktopSidebar({ pathname }: { pathname: string }) {
  const router = useRouter();

  const mainItems = [
    { id: "home",    href: "/feed",              icon: Home,     label: "Home",    isActive: pathname === "/feed" || pathname === "/" },
    { id: "explore", href: "/explore",           icon: Compass,  label: "Explore", isActive: pathname.startsWith("/explore") },
    { id: "create",  href: "/create",            icon: Plus,     label: "Create",  isActive: pathname.startsWith("/create"), isAccent: true },
    { id: "catalog", href: "/marketplace",       icon: Store,    label: "Catalog", isActive: pathname.startsWith("/marketplace") },
    { id: "garage",  href: "/garage",            icon: Car,      label: "My Garage",isActive: pathname.startsWith("/garage") },
    { id: "shop",    href: "/marketplace/shops", icon: MapPin,   label: "Shop",    isActive: pathname === "/marketplace/shops" },
    { id: "profile", href: "/profile",           icon: User,     label: "Profile", isActive: pathname === "/profile" },
  ];

  return (
    <aside className="desktop-sidebar">
      <div className="desktop-sidebar-inner">
        <nav className="desktop-sidebar-nav">
          {mainItems.map((item) => {
            const Icon = item.icon;

            if (item.isAccent) {
              return (
                <button
                  key={item.id}
                  onClick={() => router.push(item.href)}
                  className="desktop-nav-item"
                  style={{
                    background: "rgba(68,204,255,0.12)",
                    border: "1px solid rgba(68,204,255,0.25)",
                    color: "#44CCFF",
                    borderRadius: 10,
                    margin: "4px 0",
                    fontWeight: 800,
                  }}
                >
                  <Icon size={18} strokeWidth={2.5} color="#44CCFF" />
                  <span style={{ color: "#44CCFF" }}>{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`desktop-nav-item${item.isActive ? " active" : ""}`}
              >
                <Icon size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
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
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { darkMode, toggleTheme } = useTheme();
  const [mobilePreview, setMobilePreview] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Forward wheel events from anywhere in desktop-body to the content scroller
  const handleBodyWheel = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // Don't intercept if already scrolling inside right panel or content itself
    if (target.closest('.desktop-right-panel') || target.closest('.desktop-content')) return;
    if (contentRef.current) {
      contentRef.current.scrollTop += e.deltaY;
    }
  }, []);

  const isFullScreen =
    FULL_SCREEN_ROUTES.has(pathname) ||
    (pathname !== "/feed" &&
      pathname !== "/profile" &&
      FULL_SCREEN_PREFIXES.some((prefix) => pathname.startsWith(prefix)));

  const showRightPanel = pathname.startsWith("/explore");
  const isFeedLayout = pathname === "/feed" || pathname === "/" || pathname.startsWith("/explore");
  const isFullWidthLayout = pathname.startsWith("/marketplace") || pathname.startsWith("/garage") || pathname.startsWith("/profile");
  const contentColClass = isFeedLayout ? "desktop-two-col" : isFullWidthLayout ? "desktop-full-col" : "desktop-two-col";

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
      {/* MOBILE-only chrome */}
      <div className="mobile-only-chrome">
        <TopBar onToggleCart={() => setCartOpen(p => !p)} />
      </div>

      <main className="mobile-only-chrome" style={{ flex: 1, display: "block", overflow: "auto", minHeight: 0 }}>
        {children}
      </main>

      {/* DESKTOP layout */}
      <div className="desktop-only-chrome desktop-shell">
        <DesktopTopNav
          darkMode={darkMode}
          onToggleTheme={toggleTheme}
          mobilePreview={mobilePreview}
          onToggleMobilePreview={() => setMobilePreview(p => !p)}
          onToggleCart={() => setCartOpen(p => !p)}
        />
        <div className="desktop-body" onWheel={handleBodyWheel}>
          <DesktopSidebar pathname={pathname} />
          <div className={showRightPanel && !mobilePreview ? "desktop-three-col" : contentColClass}>
            <div
              ref={contentRef}
              className={mobilePreview ? "desktop-content desktop-mobile-preview" : "desktop-content"}
              style={isFeedLayout && !mobilePreview ? { maxWidth: 680, flex: '1 1 auto', marginLeft: 'auto', marginRight: 'auto', minHeight: 0 } : undefined}
            >
              {children}
            </div>
            {showRightPanel && !mobilePreview && <RightPanel />}
          </div>
        </div>
      </div>

      {/* MOBILE tab bar */}
      <div className="mobile-only-chrome">
        <TabBar />
      </div>

      <CartPanel isOpen={cartOpen} onClose={() => setCartOpen(false)} />
      <Toast />
    </div>
  );
}
