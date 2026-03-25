"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, Search, Plus, Car, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "feed",    label: "Feed",    href: "/feed",    icon: Home  },
  { id: "explore", label: "Explore", href: "/explore", icon: Search },
  { id: "create",  label: "",        href: "/create",  icon: Plus,  isCenter: true },
  { id: "garage",  label: "Garage",  href: "/garage",  icon: Car   },
  { id: "profile", label: "Profile", href: "/profile", icon: User  },
];

// Full-screen routes: no tab bar
const HIDE_TABBAR = ["/create/detect", "/create/render"];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideTabBar = HIDE_TABBAR.some((r) => pathname.startsWith(r));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className={cn("flex-1", !hideTabBar && "pb-20")}>
        {children}
      </main>

      {!hideTabBar && (
        <nav
          className="fixed bottom-0 inset-x-0 z-20 flex items-center justify-around px-2 safe-bottom"
          style={{
            height: "5rem",
            background: "rgba(12,12,16,0.92)",
            backdropFilter: "blur(16px)",
            borderTop: "1px solid #2A2A36",
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive =
              tab.href === "/create"
                ? pathname.startsWith("/create")
                : pathname.startsWith(tab.href);

            if (tab.isCenter) {
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: "#44CCFF",
                    marginTop: -16,
                    boxShadow: "0 0 24px rgba(68,204,255,0.45)",
                    flexShrink: 0,
                  }}
                  aria-label="Create"
                >
                  <Icon size={24} style={{ color: "#0C0C10" }} />
                </Link>
              );
            }

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 min-w-[44px] py-2 transition-colors",
                  isActive ? "text-cyan" : "text-text-tertiary"
                )}
              >
                <Icon size={22} />
                <span className="text-body-xs font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
