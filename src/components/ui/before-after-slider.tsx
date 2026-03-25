"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  initialPosition = 50,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(initialPosition);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const raw = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, raw)));
  }, []);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    updatePosition(e.clientX);

    const onMove = (ev: MouseEvent) => {
      if (dragging.current) updatePosition(ev.clientX);
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [updatePosition]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragging.current = true;
    updatePosition(e.touches[0].clientX);

    const onMove = (ev: TouchEvent) => {
      if (dragging.current) updatePosition(ev.touches[0].clientX);
    };
    const onEnd = () => {
      dragging.current = false;
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd);
  }, [updatePosition]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-card select-none cursor-col-resize"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {/* After image (base layer) */}
      <div className="relative w-full aspect-video">
        <Image
          src={afterImage}
          alt={afterLabel}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt={beforeLabel}
          fill
          className="object-cover"
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-cyan pointer-events-none"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
          "w-10 h-10 rounded-full bg-cyan",
          "flex items-center justify-center",
          "shadow-glow-cyan pointer-events-none"
        )}
        style={{ left: `${position}%` }}
      >
        <GripVertical size={18} strokeWidth={2.5} className="text-background" />
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 pointer-events-none">
        <span className="px-2 py-1 rounded-chip bg-black/60 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3 pointer-events-none">
        <span className="px-2 py-1 rounded-chip bg-black/60 text-white text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">
          {afterLabel}
        </span>
      </div>
    </div>
  );
}

export default BeforeAfterSlider;
