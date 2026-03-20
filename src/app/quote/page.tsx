"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Share2,
  Plus,
} from "lucide-react";
import { useAppStore } from "@/store/appStore";
import type { Product, ProductCategory } from "@/types";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  wrap: "Wrap",
  wheels: "Wheels",
  tint: "Tint",
  ppf: "PPF",
  bodykit: "Body Kit",
  accessories: "Accessories",
};

const ALL_CATEGORIES: ProductCategory[] = ["wrap", "wheels", "tint", "ppf", "bodykit", "accessories"];

function formatPrice(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

// ─── Step Bar ────────────────────────────────────────────────────────────────

function StepBar() {
  const steps = [
    { label: "Design", state: "done" as const },
    { label: "Quote", state: "active" as const },
    { label: "Book", state: "future" as const },
  ];
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "12px 20px" }}>
      {steps.map((step, idx) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1 }}>
          {idx > 0 && <div style={{ flex: 1, height: 2, background: step.state === "done" || step.state === "active" ? "var(--success)" : "var(--surface-high)", borderRadius: 1 }} />}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: step.state === "done" ? "var(--success)" : step.state === "active" ? "var(--primary)" : "var(--surface-high)" }} />
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: step.state === "done" ? "var(--success)" : step.state === "active" ? "var(--primary)" : "var(--muted)", whiteSpace: "nowrap" }}>
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step.state === "done" ? "var(--success)" : "var(--surface-high)", borderRadius: 1 }} />}
        </div>
      ))}
    </div>
  );
}

// ─── Quote Row ───────────────────────────────────────────────────────────────

function QuoteRow({
  category,
  product,
  onAdd,
}: {
  category: ProductCategory;
  product: Product | Product[] | undefined;
  onAdd: () => void;
}) {
  const label = CATEGORY_LABELS[category];

  if (!product) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px dashed var(--outline-variant)",
          opacity: 0.6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", minWidth: 68 }}>
            {label}
          </span>
          <span style={{ fontSize: 13, color: "var(--outline)" }}>Not selected</span>
        </div>
        <button
          onClick={onAdd}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "var(--primary-alpha-08)",
            border: "1px solid var(--primary-alpha-15)",
            borderRadius: 8,
            padding: "5px 10px",
            color: "var(--primary)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={11} strokeWidth={2.5} />
          Add
        </button>
      </div>
    );
  }

  const products = Array.isArray(product) ? product : [product];
  const totalMin = products.reduce((s, p) => s + p.priceMin, 0);
  const totalMax = products.reduce((s, p) => s + p.priceMax, 0);
  const displayName = products.length === 1
    ? `${products[0].brand} ${products[0].name}`
    : `${products[0].name} + ${products.length - 1} more`;

  return (
    <div
      style={{
        padding: "12px 14px",
        borderRadius: 12,
        background: "var(--surface-card)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 600, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 3 }}>
            {label}
          </span>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)", display: "block", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {displayName}
          </span>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span style={{ fontSize: 14, color: "var(--primary)", whiteSpace: "nowrap", fontWeight: 600 }}>
            {formatPrice(totalMin)} - {formatPrice(totalMax)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Quote Page ──────────────────────────────────────────────────────────────

export default function QuotePage() {
  const router = useRouter();
  const { uploadedPhoto, currentVehicle, currentBuild, getBuildTotal, showToast } = useAppStore();

  useEffect(() => {
    if (!currentVehicle) {
      router.replace("/upload");
    }
  }, [currentVehicle, router]);

  const total = getBuildTotal();
  const isEmpty = Object.values(currentBuild).every((v) => !v || (Array.isArray(v) && v.length === 0));

  const vehicleName = currentVehicle
    ? `${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}`
    : "Your Vehicle";

  return (
    <div className="cx" style={{ minHeight: "100dvh", background: "var(--bg)", paddingBottom: 100 }}>
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
          Your Build Quote
        </h1>
      </div>

      <StepBar />

      {/* Car image + name */}
      <div style={{ padding: "16px 20px" }}>
        {uploadedPhoto && (
          <div style={{ borderRadius: 14, overflow: "hidden", height: 180, marginBottom: 16, border: "1px solid var(--ghost-border)", boxShadow: "var(--shadow-card)" }}>
            <img src={uploadedPhoto} alt="Your car" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--on-surface)", letterSpacing: "-0.02em" }}>
          {vehicleName}
        </h2>
      </div>

      {/* Build summary line items */}
      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        {ALL_CATEGORIES.map((cat) => (
          <QuoteRow
            key={cat}
            category={cat}
            product={
              cat === "accessories"
                ? (currentBuild.accessories as Product[] | undefined)
                : (currentBuild[cat as keyof typeof currentBuild] as Product | undefined)
            }
            onAdd={() => router.push("/customize")}
          />
        ))}
      </div>

      {/* Total */}
      <div style={{ padding: "0 20px", marginBottom: 24 }}>
        <div style={{ background: "var(--surface-card)", borderRadius: 14, padding: "18px 16px", boxShadow: "var(--shadow-card)" }}>
          {isEmpty ? (
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <p style={{ color: "var(--muted)", fontSize: 13 }}>No items in your build yet.</p>
              <button onClick={() => router.push("/customize")} className="btn btn-primary" style={{ marginTop: 12, width: "100%", borderRadius: 14 }}>
                Start Building
                <ArrowRight size={14} strokeWidth={2.5} />
              </button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 10, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>
                Total Estimate
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "var(--primary)", letterSpacing: "-0.02em" }}>
                  {formatPrice(total.min)}
                </span>
                <span style={{ fontSize: 18, color: "var(--primary)", opacity: 0.7 }}>-</span>
                <span style={{ fontSize: 28, fontWeight: 700, color: "var(--primary)", letterSpacing: "-0.02em" }}>
                  {formatPrice(total.max)}
                </span>
              </div>
              <p style={{ fontSize: 11, color: "var(--muted)", fontStyle: "italic", marginTop: 4 }}>
                Prices may vary based on vehicle size and condition.
              </p>
            </>
          )}
        </div>
      </div>

      {/* CTA Buttons */}
      {!isEmpty && (
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={() => router.push("/find-shop")} className="btn btn-primary" style={{ width: "100%", borderRadius: 14, fontSize: 15 }}>
            Find a Shop
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => showToast("PDF generation coming soon")}
              className="btn btn-secondary"
              style={{ flex: 1, borderRadius: 14, fontSize: 13 }}
            >
              <Download size={15} strokeWidth={2} />
              Save
            </button>
            <button
              onClick={() => showToast("Share coming soon")}
              className="btn btn-secondary"
              style={{ flex: 1, borderRadius: 14, fontSize: 13 }}
            >
              <Share2 size={15} strokeWidth={2} />
              Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
