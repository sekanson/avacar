"use client";

import { cn } from "@/lib/utils/cn";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "underline" | "pill";
  scrollable?: boolean;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  variant = "underline",
  scrollable = false,
}: TabsProps) {
  return (
    <div
      className={cn(
        "flex",
        variant === "underline" && "border-b border-surface-border",
        variant === "pill" && "gap-1 p-1 bg-surface rounded-button",
        scrollable && "overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      )}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              "inline-flex items-center gap-1.5 shrink-0",
              "transition-all duration-fast",
              "select-none",
              variant === "underline" && [
                "px-4 py-3 text-body-sm font-medium",
                "border-b-2 -mb-px",
                isActive
                  ? "text-cyan border-cyan"
                  : "text-text-tertiary border-transparent hover:text-text-secondary",
              ],
              variant === "pill" && [
                "px-3 py-1.5 text-body-sm font-medium rounded-button",
                isActive
                  ? "bg-cyan-muted text-cyan"
                  : "bg-transparent text-text-tertiary hover:text-text-secondary",
              ]
            )}
          >
            {tab.icon && <span className="flex items-center">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] font-semibold px-1.5 py-0.5 rounded-chip",
                  isActive
                    ? "bg-cyan/20 text-cyan"
                    : "bg-surface-elevated text-text-tertiary"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default Tabs;
