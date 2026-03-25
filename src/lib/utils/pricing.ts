// Convert cents to formatted dollar string
export function formatCents(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

// Format price range
export function formatPriceRange(minCents: number, maxCents: number): string {
  if (minCents === maxCents) return formatCents(minCents);
  return `${formatCents(minCents)} – ${formatCents(maxCents)}`;
}

// Calculate build total from selected items
export function calculateBuildTotal(items: { priceMin: number; priceMax: number }[]): {
  min: number;
  max: number;
} {
  return items.reduce(
    (acc, item) => ({
      min: acc.min + item.priceMin,
      max: acc.max + item.priceMax,
    }),
    { min: 0, max: 0 }
  );
}

// Format price tier as dollar signs
export function formatPriceTier(tier: number): string {
  return "$".repeat(Math.min(Math.max(tier, 1), 4));
}
