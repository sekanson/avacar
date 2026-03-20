"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Paintbrush,
  Circle,
  Sun,
  Shield,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import { wraps, wheels, tints, ppf } from "@/data/products";
import type { Product } from "@/types";

// ─── Tab config ──────────────────────────────────────────────────────────────
type TabId = "wraps" | "wheels" | "tint" | "ppf";

const TABS: { id: TabId; label: string; icon: typeof Paintbrush }[] = [
  { id: "wraps", label: "WRAPS", icon: Paintbrush },
  { id: "wheels", label: "WHEELS", icon: Circle },
  { id: "tint", label: "TINT", icon: Sun },
  { id: "ppf", label: "PPF", icon: Shield },
];

const TAB_DATA: Record<TabId, Product[]> = {
  wraps,
  wheels,
  tint: tints,
  ppf,
};

const CATEGORY_KEY: Record<TabId, "wrap" | "wheels" | "tint" | "ppf"> = {
  wraps: "wrap",
  wheels: "wheels",
  tint: "tint",
  ppf: "ppf",
};

function formatPrice(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `$${n}`;
}

// ─── Product Tile ─────────────────────────────────────────────────────────────

function ProductTile({
  product,
  isSelected,
  onSelect,
}: {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        position: "relative",
        height: 100,
        background: isSelected ? "var(--primary-alpha-12)" : "var(--surface-low)",
        borderRadius: 12,
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        border: isSelected ? "2px solid var(--primary)" : "2px solid transparent",
        transition: "all 0.15s",
        padding: 8,
      }}
    >
      {/* Badge */}
      {isSelected && (
        <div
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 18,
            height: 18,
            borderRadius: 9,
            background: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check size={10} style={{ color: "var(--on-primary)" }} strokeWidth={3} />
        </div>
      )}

      {/* Color swatch or icon */}
      {product.colorHex ? (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: product.colorHex,
            border: "2px solid var(--ghost-border)",
          }}
        />
      ) : (
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "var(--primary-alpha-08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Shield size={14} style={{ color: "var(--primary)" }} />
        </div>
      )}

      {/* Name */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: "var(--on-surface)",
          textAlign: "center",
          lineHeight: 1.2,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "100%",
        }}
      >
        {product.name}
      </span>

      {/* Price */}
      <span style={{ fontSize: 10, color: "var(--muted)", fontWeight: 500 }}>
        {formatPrice(product.priceMin)}-{formatPrice(product.priceMax)}
      </span>
    </button>
  );
}

// ─── Customize Page ──────────────────────────────────────────────────────────

export default function CustomizePage() {
  const router = useRouter();
  const { currentBuild, setProduct, getBuildTotal, detectedVehicle, currentVehicle } = useAppStore();

  useEffect(() => {
    if (!detectedVehicle && !currentVehicle) {
      router.replace("/upload");
    }
  }, [detectedVehicle, currentVehicle, router]);
  const [activeTab, setActiveTab] = useState<TabId>("wraps");

  const products = TAB_DATA[activeTab];
  const categoryKey = CATEGORY_KEY[activeTab];
  const selectedProduct = currentBuild[categoryKey] as Product | undefined;
  const total = getBuildTotal();
  const hasSelections = total.min > 0;

  const handleSelect = useCallback(
    (product: Product) => {
      const key = CATEGORY_KEY[activeTab];
      const current = currentBuild[key] as Product | undefined;
      if (current?.id === product.id) {
        setProduct(key, null);
      } else {
        setProduct(key, product);
      }
    },
    [activeTab, currentBuild, setProduct]
  );

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", display: "flex", flexDirection: "column" }}>
      {/* Topbar */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--ghost-border)" }}>
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", background: "transparent", cursor: "pointer" }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} strokeWidth={2} />
        </button>
        <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          Customize Build
        </h1>
      </div>

      {/* Category Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--ghost-border)" }}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "12px 0",
                textAlign: "center",
                cursor: "pointer",
                borderBottom: `2px solid ${isActive ? "var(--primary)" : "transparent"}`,
                background: "transparent",
                border: "none",
                borderBottomWidth: 2,
                borderBottomStyle: "solid",
                borderBottomColor: isActive ? "var(--primary)" : "transparent",
                transition: "all 0.15s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                <Icon size={14} style={{ color: isActive ? "var(--primary)" : "var(--muted)" }} />
                <span style={{ fontSize: 12, fontWeight: isActive ? 600 : 500, color: isActive ? "var(--primary)" : "var(--muted)" }}>
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      <div style={{ flex: 1, overflow: "auto", padding: 20 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 10,
          }}
        >
          {products.map((product) => (
            <ProductTile
              key={product.id}
              product={product}
              isSelected={selectedProduct?.id === product.id}
              onSelect={() => handleSelect(product)}
            />
          ))}
        </div>
      </div>

      {/* Running Total + CTA */}
      <div
        style={{
          padding: "12px 20px 28px",
          borderTop: "1px solid var(--ghost-border)",
          background: "var(--bg)",
        }}
      >
        {hasSelections && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 14px",
              background: "var(--primary-alpha-04)",
              borderRadius: 10,
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--muted)" }}>Running Total</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--primary)" }}>
              ${total.min.toLocaleString()} - ${total.max.toLocaleString()}
            </span>
          </div>
        )}
        <button
          onClick={() => router.push("/rendering")}
          disabled={!hasSelections}
          className={hasSelections ? "btn btn-primary" : "btn btn-disabled"}
          style={{ width: "100%", borderRadius: 14, fontSize: 15 }}
        >
          Get Quote
        </button>
      </div>
    </div>
  );
}
