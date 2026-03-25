"use client";

import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
}

export function TopBar({
  title,
  showBack = false,
  onBack,
  rightAction,
  transparent = false,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-[20]",
        "h-top-bar-h",
        "flex items-center justify-between",
        "px-2",
        !transparent && "bg-background/80 backdrop-blur-[12px] border-b border-surface-border/50"
      )}
    >
      {/* Left: back button or spacer */}
      <div className="w-11 flex items-center justify-start">
        {showBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className={cn(
              "w-11 h-11 flex items-center justify-center",
              "text-text-primary rounded-button",
              "hover:bg-surface-hover transition-colors duration-fast"
            )}
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* Center: title */}
      {title && (
        <h1 className="font-display text-display-xs text-text-primary text-center flex-1 px-2 truncate">
          {title}
        </h1>
      )}

      {/* Right: action or spacer */}
      <div className="w-11 flex items-center justify-end">
        {rightAction}
      </div>
    </header>
  );
}

export default TopBar;
