"use client";

import { X, Trash2, ShoppingCart } from "lucide-react";

const MOCK_CART = [
  {
    id: "c1",
    name: "Midnight Fury",
    subtitle: "Race Livery",
    license: "Personal",
    price: 149,
    thumb: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&q=70&fm=webp",
  },
  {
    id: "c2",
    name: "HRE FF15 Wheels",
    subtitle: "Brushed Dark Clear",
    license: null,
    price: 4800,
    thumb: "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=120&h=120&fit=crop&q=70&fm=webp",
  },
];

const TAX_RATE = 0.13;

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
  const subtotal = MOCK_CART.reduce((sum, item) => sum + item.price, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            zIndex: 200,
          }}
        />
      )}

      {/* Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(400px, 100vw)",
          background: "var(--color-surface)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 16px",
            borderBottom: "1px solid var(--color-border, rgba(255,255,255,0.08))",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingCart size={18} color="var(--color-text-primary)" />
            <span
              style={{
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                fontWeight: 800,
                fontSize: 16,
                color: "var(--color-text-primary)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Your Cart ({MOCK_CART.length})
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--color-surface-elevated, rgba(255,255,255,0.06))",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--color-text-secondary)",
            }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_CART.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  background: "var(--color-surface-elevated, rgba(255,255,255,0.04))",
                  borderRadius: 16,
                  padding: 12,
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#111",
                  }}
                >
                  <img
                    src={item.thumb}
                    alt={item.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--color-text-primary)",
                      margin: 0,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: "2px 0 0" }}>
                    {item.subtitle}
                  </p>
                  {item.license && (
                    <p style={{ fontSize: 11, color: "var(--color-text-tertiary)", margin: "2px 0 0" }}>
                      License: {item.license}
                    </p>
                  )}
                  <p
                    style={{
                      fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                      fontWeight: 700,
                      fontSize: 14,
                      color: "var(--color-text-primary)",
                      margin: "6px 0 0",
                    }}
                  >
                    ${item.price.toLocaleString()}
                  </p>
                </div>

                {/* Remove */}
                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-text-tertiary)",
                    padding: 4,
                    flexShrink: 0,
                  }}
                  aria-label="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div style={{ marginTop: 20, display: "flex", gap: 8 }}>
            <input
              type="text"
              placeholder="Enter promo code"
              style={{
                flex: 1,
                height: 44,
                borderRadius: 10,
                border: "1px solid var(--color-border, rgba(255,255,255,0.1))",
                background: "var(--color-surface-elevated, rgba(255,255,255,0.04))",
                color: "var(--color-text-primary)",
                padding: "0 14px",
                fontSize: 13,
                outline: "none",
              }}
            />
            <button
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 10,
                background: "var(--color-surface-elevated, rgba(255,255,255,0.08))",
                border: "1px solid var(--color-border, rgba(255,255,255,0.1))",
                color: "var(--color-text-primary)",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              Apply
            </button>
          </div>

          {/* Summary */}
          <div
            style={{
              marginTop: 20,
              borderTop: "1px solid var(--color-border, rgba(255,255,255,0.08))",
              paddingTop: 16,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Subtotal</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 14, color: "var(--color-text-secondary)" }}>Estimated tax</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }}>
                ${tax.toLocaleString()}
              </span>
            </div>
            <div
              style={{
                borderTop: "1px solid var(--color-border, rgba(255,255,255,0.08))",
                paddingTop: 12,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "var(--color-text-primary)",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "var(--color-text-primary)",
                }}
              >
                ${total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div
          style={{
            padding: "16px 20px 28px",
            borderTop: "1px solid var(--color-border, rgba(255,255,255,0.08))",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            flexShrink: 0,
          }}
        >
          <button
            style={{
              width: "100%",
              height: 48,
              borderRadius: 12,
              background: "none",
              border: "1.5px solid var(--color-border, rgba(255,255,255,0.15))",
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            View Full Cart
          </button>
          <button
            style={{
              width: "100%",
              height: 56,
              borderRadius: 12,
              background: "linear-gradient(135deg, #44CCFF, #0099cc)",
              border: "none",
              color: "#0C0C10",
              fontFamily: "var(--font-manrope, Manrope, sans-serif)",
              fontSize: 16,
              fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(68,204,255,0.35)",
            }}
          >
            Checkout →
          </button>
        </div>
      </div>
    </>
  );
}
