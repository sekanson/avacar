import { Layers, Circle, Eye, Shield, Wrench, Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const formatPrice = (cents: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(cents / 100);

function formatRange(min: number, max: number): string {
  if (min === max) return formatPrice(min);
  return `${formatPrice(min)} – ${formatPrice(max)}`;
}

function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const cls = cn("w-4 h-4", className);
  switch (category) {
    case "wrap":      return <Layers className={cls} />;
    case "wheel":     return <Circle className={cls} />;
    case "tint":      return <Eye className={cls} />;
    case "ppf":       return <Shield className={cls} />;
    case "bodykit":   return <Wrench className={cls} />;
    case "accessory": return <Star className={cls} />;
    default:          return <Layers className={cls} />;
  }
}

const CATEGORY_COLOR: Record<string, string> = {
  wrap:      "text-category-wrap",
  wheel:     "text-category-wheel",
  tint:      "text-category-tint",
  ppf:       "text-category-ppf",
  bodykit:   "text-category-bodykit",
  accessory: "text-category-accessory",
};

interface QuoteItem {
  category: string;
  productName: string;
  brandName: string;
  options?: string;
  priceMin: number;
  priceMax: number;
}

interface QuoteCardProps {
  items: QuoteItem[];
  subtotal: { min: number; max: number };
  tax: { min: number; max: number };
  total: { min: number; max: number };
  className?: string;
}

export function QuoteCard({ items, subtotal, tax, total, className }: QuoteCardProps) {
  return (
    <div className={cn("bg-surface rounded-card border border-surface-border overflow-hidden", className)}>
      {/* Line items */}
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex items-start gap-3 p-4">
            {/* Category icon */}
            <div className={cn("mt-0.5 flex-shrink-0", CATEGORY_COLOR[item.category] ?? "text-text-tertiary")}>
              <CategoryIcon category={item.category} />
            </div>

            {/* Name + brand + options */}
            <div className="flex-1 min-w-0">
              <p className="text-body-md text-text-primary line-clamp-1">{item.productName}</p>
              <p className="text-body-sm text-text-tertiary">{item.brandName}</p>
              {item.options && (
                <p className="text-body-xs text-text-tertiary mt-0.5">{item.options}</p>
              )}
            </div>

            {/* Price */}
            <p className="text-body-sm text-text-secondary font-mono flex-shrink-0">
              {formatRange(item.priceMin, item.priceMax)}
            </p>
          </div>

          {index < items.length - 1 && (
            <div className="h-px bg-surface-border mx-4" />
          )}
        </div>
      ))}

      {/* Summary rows */}
      <div className="border-t border-surface-border">
        {/* Subtotal */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-body-sm text-text-secondary">Subtotal</span>
          <span className="text-body-sm font-mono text-text-secondary">
            {formatRange(subtotal.min, subtotal.max)}
          </span>
        </div>

        {/* Tax */}
        <div className="flex items-center justify-between px-4 pb-3">
          <span className="text-body-sm text-text-secondary">Est. Tax</span>
          <span className="text-body-sm font-mono text-text-secondary">
            {formatRange(tax.min, tax.max)}
          </span>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between px-4 py-4 border-t border-surface-border bg-surface-elevated">
          <span className="text-body-md font-medium text-text-primary">Total</span>
          <span className="text-display-sm font-mono font-bold text-cyan">
            {formatRange(total.min, total.max)}
          </span>
        </div>
      </div>
    </div>
  );
}
