import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "var(--bg)",
        "surface": "var(--surface)",
        "surface-low": "var(--surface-low)",
        "surface-container": "var(--surface-container)",
        "surface-high": "var(--surface-high)",
        "surface-card": "var(--surface-card)",
        "primary": "var(--primary)",
        "on-primary": "var(--on-primary)",
        "on-surface": "var(--on-surface)",
        "on-surface-variant": "var(--on-surface-variant)",
        "muted": "var(--muted)",
        "outline": "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        "tag-bg": "var(--tag-bg)",
        "tag-color": "var(--tag-color)",
        "success": "var(--success)",
        "error": "var(--error)",
        "warning": "var(--warning)",
        "accent": "var(--accent)",
      },
      fontFamily: {
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      borderRadius: {
        btn: "100px",
        card: "14px",
        chip: "9999px",
        tile: "12px",
        input: "12px",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-375px 0" },
          "100%": { backgroundPosition: "375px 0" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-in": "fadeIn 0.2s ease",
        spin: "spin 1s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
