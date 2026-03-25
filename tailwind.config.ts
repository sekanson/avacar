import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ── COLORS ──────────────────────────────────────────
      colors: {
        // Core
        background: "#0C0C10",
        surface: {
          DEFAULT: "#14141A",
          elevated: "#1C1C24",
          hover: "#22222C",
          border: "#2A2A36",
        },

        // Brand
        cyan: {
          DEFAULT: "#44CCFF",
          hover: "#5DD6FF",
          pressed: "#33BBEE",
          muted: "rgba(68, 204, 255, 0.15)",
          subtle: "rgba(68, 204, 255, 0.08)",
        },

        // Text
        text: {
          primary: "#FFFFFF",
          secondary: "#A0A0B0",
          tertiary: "#6B6B7B",
          disabled: "#4A4A5A",
          inverse: "#0C0C10",
        },

        // Semantic
        success: {
          DEFAULT: "#34D399",
          muted: "rgba(52, 211, 153, 0.15)",
        },
        warning: {
          DEFAULT: "#FBBF24",
          muted: "rgba(251, 191, 36, 0.15)",
        },
        error: {
          DEFAULT: "#F87171",
          muted: "rgba(248, 113, 113, 0.15)",
        },
        info: {
          DEFAULT: "#44CCFF",
          muted: "rgba(68, 204, 255, 0.15)",
        },

        // Category accent colors (for product tabs)
        category: {
          wrap: "#44CCFF",
          wheel: "#A78BFA",
          tint: "#6B7280",
          ppf: "#34D399",
          bodykit: "#F97316",
          accessory: "#EC4899",
        },

        // Shop tier badges
        tier: {
          standard: "#6B7280",
          certified: "#44CCFF",
          elite: "#FBBF24",
        },
      },

      // ── TYPOGRAPHY ──────────────────────────────────────
      fontFamily: {
        display: ["Manrope", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },

      fontSize: {
        "display-2xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-xl": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        "display-md": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-xs": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body-lg": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-xs": ["0.6875rem", { lineHeight: "1.4", fontWeight: "400" }],
        "data-lg": ["1rem", { lineHeight: "1.4", fontWeight: "500" }],
        "data-md": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        "data-sm": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },

      // ── SPACING ─────────────────────────────────────────
      spacing: {
        "page-x": "1rem",
        "page-x-lg": "1.5rem",
        "section-gap": "2rem",
        "card-padding": "1rem",
        "tab-bar-h": "5rem",
        "top-bar-h": "3.5rem",
      },

      // ── BORDER RADIUS ───────────────────────────────────
      borderRadius: {
        "card": "1rem",
        "button": "0.75rem",
        "chip": "624rem",
        "input": "0.75rem",
        "image": "0.75rem",
        "avatar": "624rem",
        "sheet": "1.5rem",
      },

      // ── SHADOWS ─────────────────────────────────────────
      boxShadow: {
        "card": "0 2px 8px rgba(0, 0, 0, 0.3)",
        "elevated": "0 4px 16px rgba(0, 0, 0, 0.4)",
        "sheet": "0 -4px 24px rgba(0, 0, 0, 0.5)",
        "glow-cyan": "0 0 20px rgba(68, 204, 255, 0.25)",
        "glow-cyan-strong": "0 0 30px rgba(68, 204, 255, 0.4)",
      },

      // ── ANIMATION ───────────────────────────────────────
      transitionDuration: {
        "fast": "150ms",
        "normal": "200ms",
        "slow": "300ms",
        "page": "200ms",
      },

      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(68, 204, 255, 0.25)" },
          "50%": { boxShadow: "0 0 30px rgba(68, 204, 255, 0.5)" },
        },
        "skeleton": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },

      animation: {
        "fade-in": "fade-in 200ms ease-out",
        "slide-up": "slide-up 300ms ease-out",
        "slide-in-right": "slide-in-right 300ms ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "skeleton": "skeleton 1.5s ease-in-out infinite",
      },

      // ── BACKDROP BLUR ───────────────────────────────────
      backdropBlur: {
        "nav": "16px",
        "sheet": "24px",
        "overlay": "8px",
      },
    },
  },
  plugins: [],
};

export default config;
