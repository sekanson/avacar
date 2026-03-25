"use client";

import { useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils/cn";
import { SkeletonPostCard } from "./skeleton-loader";

interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  loader?: React.ReactNode;
  className?: string;
}

export function InfiniteScroll({
  hasMore,
  isLoading,
  onLoadMore,
  children,
  loader,
  className,
}: InfiniteScrollProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore && !isLoading) {
        onLoadMore();
      }
    },
    [hasMore, isLoading, onLoadMore]
  );

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: "200px",
      threshold: 0,
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [handleIntersection]);

  const defaultLoader = (
    <div className="flex flex-col gap-4 pt-4">
      <SkeletonPostCard />
      <SkeletonPostCard />
      <SkeletonPostCard />
    </div>
  );

  return (
    <div className={cn("flex flex-col", className)}>
      {children}

      {/* Sentinel element for intersection observer */}
      <div ref={sentinelRef} className="h-px" aria-hidden="true" />

      {/* Loading state */}
      {isLoading && (loader ?? defaultLoader)}

      {/* End of list indicator */}
      {!hasMore && !isLoading && (
        <div className="py-8 flex items-center justify-center">
          <div className="h-px w-16 bg-surface-border" />
          <span className="mx-4 text-body-xs text-text-tertiary">You&apos;re all caught up</span>
          <div className="h-px w-16 bg-surface-border" />
        </div>
      )}
    </div>
  );
}
