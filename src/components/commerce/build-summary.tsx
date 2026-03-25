"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);

interface BuildSummaryProps {
  itemCount: number;
  totalMin: number;
  totalMax: number;
  onGetQuote: () => void;
  className?: string;
}

export function BuildSummary({
  itemCount,
  totalMin,
  totalMax,
  onGetQuote,
  className,
}: BuildSummaryProps) {
  const priceLabel =
    totalMin === totalMax
      ? formatPrice(totalMin)
      : `${formatPrice(totalMin)} – ${formatPrice(totalMax)}`;

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          key="build-summary"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className={cn(
            "fixed bottom-0 left-0 right-0 z-50",
            "bg-surface-elevated/95 backdrop-blur-nav border-t border-surface-border",
            "p-4 pb-safe",
            className
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-body-sm text-text-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"} selected
            </span>
            <span className="text-data-lg font-mono text-cyan">{priceLabel}</span>
          </div>

          <button
            onClick={onGetQuote}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-button bg-cyan text-text-inverse font-medium text-body-md hover:bg-cyan-hover active:bg-cyan-pressed transition-colors duration-fast"
          >
            Get Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
