"use client";

import { cn } from "@/lib/utils/cn";
import { TopBar } from "./top-bar";
import { TabBar } from "./tab-bar";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode;
  hideTabBar?: boolean;
  hideTopBar?: boolean;
  transparentTopBar?: boolean;
}

export function AppShell({
  children,
  title,
  showBack,
  onBack,
  rightAction,
  hideTabBar = false,
  hideTopBar = false,
  transparentTopBar = false,
}: AppShellProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {!hideTopBar && (
        <TopBar
          title={title}
          showBack={showBack}
          onBack={onBack}
          rightAction={rightAction}
          transparent={transparentTopBar}
        />
      )}

      <main
        className={cn(
          "flex-1 flex flex-col overflow-y-auto",
          !hideTabBar && "pb-tab-bar-h"
        )}
      >
        {children}
      </main>

      {!hideTabBar && <TabBar />}
    </div>
  );
}

export default AppShell;
