"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Plus, Car, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const tabs = [
  { id: "feed",    label: "Feed",    href: "/feed",    icon: Home,   isCenter: false },
  { id: "explore", label: "Explore", href: "/explore", icon: Search, isCenter: false },
  { id: "create",  label: "",        href: "/create",  icon: Plus,   isCenter: true  },
  { id: "garage",  label: "Garage",  href: "/garage",  icon: Car,    isCenter: false },
  { id: "profile", label: "Profile", href: "/profile", icon: User,   isCenter: false },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-[20]",
        "h-tab-bar-h",
        "bg-background/90 backdrop-blur-[12px]",
        "border-t border-surface-border",
        "flex items-center justify-around",
        "px-2"
      )}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href || pathname.startsWith(tab.href + "/");

        if (tab.isCenter) {
          return (
            <Link
              key={tab.id}
              href={tab.href}
              aria-label="Create"
              className="flex flex-col items-center justify-center min-w-[44px] min-h-[44px]"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full",
                  "bg-cyan text-background",
                  "flex items-center justify-center",
                  "shadow-glow-cyan",
                  "-mt-5"
                )}
              >
                <Icon size={22} strokeWidth={2.5} />
              </div>
            </Link>
          );
        }

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn(
              "flex flex-col items-center justify-center gap-0.5",
              "min-w-[44px] min-h-[44px]",
              "transition-colors duration-fast",
              isActive ? "text-cyan" : "text-text-tertiary"
            )}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-body-xs font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default TabBar;
