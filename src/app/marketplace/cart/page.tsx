"use client";

import { useState } from "react";
import Link from "next/link";
import { mockCartItems } from "@/data/marketplace";
import type { CartItem } from "@/data/marketplace";
import { ArrowLeft, ShoppingCart, Minus, Plus, X } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const updateQty = (productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.productId === productId ? { ...item, qty: Math.max(0, item.qty + delta) } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  const isEmpty = items.length === 0;

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/marketplace/products" style={{ color: "var(--on-surface-variant)", display: "flex", alignItems: "center" }}>
          <ArrowLeft size={20} />
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
          Your Cart
          {!isEmpty && (
            <span
              style={{
                marginLeft: 8,
                fontSize: 13,
                fontWeight: 600,
                color: "var(--on-surface-variant)",
              }}
            >
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          )}
        </h1>
      </div>

      {/* Empty state */}
      {isEmpty && (
        <div style={{ textAlign: "center", padding: "80px 40px" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "var(--surface-low)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <ShoppingCart size={36} color="var(--on-surface-variant)" />
          </div>
          <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", marginBottom: 8, letterSpacing: "-0.01em" }}>
            Your cart is empty
          </p>
          <p style={{ fontSize: 14, color: "var(--on-surface-variant)", marginBottom: 28, lineHeight: 1.5 }}>
            Find something your car deserves.
          </p>
          <Link
            href="/marketplace/products"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              borderRadius: 100,
              background: "#007FFF",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              textDecoration: "none",
              letterSpacing: "0.04em",
              boxShadow: "0 4px 20px rgba(0,127,255,0.35)",
            }}
          >
            Browse Products
          </Link>
        </div>
      )}

      {!isEmpty && (
        <>
          {/* Cart items */}
          <div style={{ padding: "20px 20px 0" }}>
            {items.map((item) => (
              <div
                key={item.productId}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "16px",
                  background: "var(--surface-card)",
                  borderRadius: 16,
                  marginBottom: 10,
                  boxShadow: "var(--shadow-card)",
                  alignItems: "center",
                }}
              >
                {/* Product color swatch / image */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 12,
                    background: `radial-gradient(ellipse at 35% 35%, ${item.colorHex}cc, ${item.colorHex})`,
                    flexShrink: 0,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 55%)",
                    }}
                  />
                </div>

                {/* Product info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 2 }}>
                    {item.productName}
                  </p>
                  <p style={{ fontSize: 11, color: "var(--on-surface-variant)", marginBottom: 2 }}>
                    {item.brand} · {item.variantName}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)" }}>
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>

                {/* Qty controls + remove */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => removeItem(item.productId)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 2,
                      color: "var(--on-surface-variant)",
                    }}
                  >
                    <X size={14} />
                  </button>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0,
                      background: "var(--surface-low)",
                      borderRadius: 100,
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => updateQty(item.productId, -1)}
                      style={{
                        width: 30,
                        height: 30,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ width: 28, textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--on-surface)" }}>
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item.productId, 1)}
                      style={{
                        width: 30,
                        height: 30,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--on-surface-variant)",
                      }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <div style={{ padding: "4px 20px 0" }}>
            <Link
              href="/marketplace/products"
              style={{
                display: "block",
                textAlign: "center",
                padding: "12px",
                borderRadius: 100,
                background: "var(--surface-low)",
                color: "var(--on-surface)",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
              }}
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order summary */}
          <div
            style={{
              margin: "20px 20px 0",
              background: "var(--surface-card)",
              borderRadius: 16,
              padding: "20px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p style={{ fontSize: 15, fontWeight: 800, color: "var(--on-surface)", marginBottom: 16 }}>
              Order Summary
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Subtotal</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--on-surface)" }}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Shipping</span>
                <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Calculated at checkout</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Tax</span>
                <span style={{ fontSize: 13, color: "var(--on-surface-variant)" }}>Calculated at checkout</span>
              </div>
              {promoApplied && (
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13, color: "var(--success)" }}>Promo (AVACAR10)</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--success)" }}>
                    -${discount.toFixed(2)}
                  </span>
                </div>
              )}
            </div>

            {/* Promo code */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="real-input"
                style={{ flex: 1, height: 42, fontSize: 13 }}
              />
              <button
                onClick={() => {
                  if (promoCode === "AVACAR10") setPromoApplied(true);
                }}
                style={{
                  padding: "0 16px",
                  borderRadius: 100,
                  background: "var(--surface-low)",
                  color: "var(--on-surface)",
                  fontWeight: 600,
                  fontSize: 13,
                  border: "none",
                  cursor: "pointer",
                  flexShrink: 0,
                  height: 42,
                }}
              >
                Apply
              </button>
            </div>

            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingTop: 14,
                borderTop: "1px solid var(--ghost-border)",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)" }}>Total</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <div style={{ padding: "16px 20px 0" }}>
            <button
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 100,
                background: "#007FFF",
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0,127,255,0.35)",
                letterSpacing: "0.03em",
              }}
            >
              Proceed to Checkout
            </button>
          </div>

          {/* Installation add-on */}
          <div
            style={{
              margin: "16px 20px 0",
              padding: "18px",
              background: "var(--surface-card)",
              borderRadius: 16,
              boxShadow: "var(--shadow-card)",
              border: "none",
            }}
          >
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "var(--primary-alpha-08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 18,
                }}
              >
                🔧
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
                  Want this professionally installed?
                </p>
                <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 12, lineHeight: 1.5 }}>
                  Connect with a Zeno Certified shop after checkout. We&apos;ll match you with installers who specialize in your exact products.
                </p>
                <button
                  style={{
                    padding: "10px 16px",
                    borderRadius: 100,
                    background: "var(--primary-gradient)",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 12,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Find a Zeno Shop Near You →
                </button>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div style={{ padding: "20px 20px 0" }}>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {[
                { emoji: "🔒", label: "Secure Checkout" },
                { emoji: "🚚", label: "Free Shipping $500+" },
                { emoji: "↩️", label: "30-Day Returns" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    flex: 1,
                  }}
                >
                  <span style={{ fontSize: 18 }}>{badge.emoji}</span>
                  <span style={{ fontSize: 9, fontWeight: 600, color: "var(--on-surface-variant)", textAlign: "center", letterSpacing: "0.05em" }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
