"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown, Mail } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does AI detection work?",
    answer:
      "Our AI analyzes the photo you upload and identifies the vehicle's make, model, year, and color. It uses a trained image recognition model to detect the car within seconds, so you can start building right away.",
  },
  {
    question: "What if my car isn't detected?",
    answer:
      "If the AI can't identify your vehicle, you can manually enter the make, model, and year. This can happen with heavily modified vehicles or unusual angles. We're constantly improving detection accuracy.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "After configuring your build with wraps, wheels, tint, and other mods, tap 'Get Quote' to see nearby verified shops. Select a shop, pick a time slot, and you'll receive a detailed quote based on your build selections.",
  },
  {
    question: "Are shops verified?",
    answer:
      "Yes. Every shop on AVACAR goes through a verification process where we check their business license, portfolio of past work, insurance, and customer reviews before they can accept bookings on the platform.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "You can cancel a booking up to 24 hours before your scheduled appointment at no charge. Cancellations within 24 hours may be subject to a cancellation fee set by the shop. Check the shop's policy for details.",
  },
];

export default function HelpPage() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "12px 16px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--topbar-shadow)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
            background: "var(--surface-low)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} color="var(--on-surface)" />
        </button>
        <span style={{ fontSize: 14, fontWeight: 600, color: "var(--on-surface)" }}>
          Help &amp; FAQ
        </span>
      </div>

      <div style={{ padding: "12px 16px 40px" }}>
        {/* FAQ Accordion */}
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              style={{
                borderBottom: "1px solid var(--ghost-border)",
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 0",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    flex: 1,
                    paddingRight: 12,
                  }}
                >
                  {item.question}
                </span>
                <ChevronDown
                  size={18}
                  color="var(--muted)"
                  style={{
                    transition: "transform 0.2s",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    flexShrink: 0,
                  }}
                />
              </button>
              {isOpen && (
                <div
                  style={{
                    paddingBottom: 16,
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}

        {/* Contact section */}
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <p
            style={{
              fontSize: 13,
              color: "var(--muted)",
              marginBottom: 16,
            }}
          >
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="mailto:support@avacar.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: 14,
              background: "var(--primary)",
              color: "var(--on-primary)",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <Mail size={16} />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
