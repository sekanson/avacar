# AVACAR — Design Tokens & Tailwind Configuration

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** AVACAR_Unified_UX_Spec_v2.md (Design System section), AVACAR_Mirmi_Execution_Brief.md

---

## Overview

This document contains every design token in code-ready format. Copy these directly into the codebase. Do not deviate from these values — they are the single source of truth for AVACAR's visual identity.

---

## 1. Tailwind Config

File: `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
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
          wrap: "#44CCFF",     // cyan
          wheel: "#A78BFA",    // purple
          tint: "#6B7280",     // grey
          ppf: "#34D399",      // green
          bodykit: "#F97316",  // orange
          accessory: "#EC4899", // pink
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
        // Display scale (Manrope)
        "display-2xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-xl": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "800" }],
        "display-lg": ["1.875rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "700" }],
        "display-md": ["1.5rem", { lineHeight: "1.25", letterSpacing: "-0.01em", fontWeight: "700" }],
        "display-sm": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "display-xs": ["1.125rem", { lineHeight: "1.35", letterSpacing: "-0.005em", fontWeight: "600" }],
        
        // Body scale (Inter)
        "body-lg": ["1rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-md": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-sm": ["0.75rem", { lineHeight: "1.5", fontWeight: "400" }],
        "body-xs": ["0.6875rem", { lineHeight: "1.4", fontWeight: "400" }],
        
        // Data scale (JetBrains Mono)
        "data-lg": ["1rem", { lineHeight: "1.4", fontWeight: "500" }],
        "data-md": ["0.875rem", { lineHeight: "1.4", fontWeight: "500" }],
        "data-sm": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      
      // ── SPACING ─────────────────────────────────────────
      spacing: {
        // Layout
        "page-x": "1rem",       // 16px — horizontal page padding (mobile)
        "page-x-lg": "1.5rem",  // 24px — horizontal page padding (tablet+)
        "section-gap": "2rem",   // 32px — gap between sections
        "card-padding": "1rem",  // 16px — internal card padding
        "tab-bar-h": "5rem",    // 80px — bottom tab bar height
        "top-bar-h": "3.5rem",  // 56px — top navigation bar height
      },
      
      // ── BORDER RADIUS ───────────────────────────────────
      borderRadius: {
        "card": "1rem",        // 16px — cards, modals, sheets
        "button": "0.75rem",   // 12px — buttons
        "chip": "624rem",      // pill shape — tags, chips, badges
        "input": "0.75rem",    // 12px — inputs, selects
        "image": "0.75rem",    // 12px — thumbnails, avatars
        "avatar": "624rem",    // circle
        "sheet": "1.5rem",     // 24px — bottom sheets (top corners only)
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
```

---

## 2. CSS Custom Properties

File: `app/globals.css`

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700;800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  /* Core */
  --color-bg: #0C0C10;
  --color-surface: #14141A;
  --color-surface-elevated: #1C1C24;
  --color-surface-hover: #22222C;
  --color-border: #2A2A36;
  
  /* Brand */
  --color-cyan: #44CCFF;
  --color-cyan-hover: #5DD6FF;
  --color-cyan-pressed: #33BBEE;
  --color-cyan-muted: rgba(68, 204, 255, 0.15);
  --color-cyan-subtle: rgba(68, 204, 255, 0.08);
  
  /* Text */
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #A0A0B0;
  --color-text-tertiary: #6B6B7B;
  --color-text-disabled: #4A4A5A;
  
  /* Transition */
  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
  
  /* Z-index scale */
  --z-base: 0;
  --z-dropdown: 10;
  --z-sticky: 20;
  --z-overlay: 30;
  --z-modal: 40;
  --z-sheet: 50;
  --z-toast: 60;
  --z-tooltip: 70;
}

/* Global resets */
* {
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-primary);
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling (dark) */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: var(--color-text-tertiary);
}

/* Skeleton loading base class */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface) 25%,
    var(--color-surface-elevated) 50%,
    var(--color-surface) 75%
  );
  background-size: 400% 100%;
  animation: skeleton 1.5s ease-in-out infinite;
}
```

---

## 3. Framer Motion Presets

File: `lib/motion.ts`

```typescript
import { Variants } from "framer-motion";

// Page transitions (200ms fade as per spec)
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" },
};

// Stagger children (for lists, grids)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// Bottom sheet (slide up from bottom)
export const bottomSheet: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { y: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};

// Modal (scale + fade)
export const modal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
};

// Tab content (slide direction)
export const tabSlide = (direction: "left" | "right"): Variants => ({
  enter: { x: direction === "right" ? 16 : -16, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: direction === "right" ? -16 : 16, opacity: 0, transition: { duration: 0.15 } },
});

// Like heart animation (scale bounce)
export const heartPop = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 0.9, 1.1, 1],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Card press (subtle scale on tap)
export const cardTap = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 },
};

// Overlay backdrop
export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Toast notification (slide in from top)
export const toast: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

// Skeleton pulse (for loading states)
export const skeletonPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};
```

---

## 4. Icon Set

Use **Lucide React** (`lucide-react`) as the icon library. Here are the standard icon mappings:

| Context | Icon | Size |
|---------|------|------|
| Tab: Feed | `Home` | 24px |
| Tab: Explore | `Search` (or `Compass`) | 24px |
| Tab: Create (+) | `Plus` (inside circle) | 28px |
| Tab: Garage | `Car` | 24px |
| Tab: Profile | `User` | 24px |
| Like | `Heart` (outline) / `Heart` (filled, red) | 20px |
| Comment | `MessageCircle` | 20px |
| Share | `Share2` | 20px |
| Save/Bookmark | `Bookmark` | 20px |
| Camera | `Camera` | 24px |
| Upload | `Upload` | 24px |
| Settings | `Settings` | 24px |
| Notification bell | `Bell` | 24px |
| Back arrow | `ChevronLeft` | 24px |
| Close | `X` | 24px |
| Filter | `SlidersHorizontal` | 20px |
| Sort | `ArrowUpDown` | 20px |
| Map pin | `MapPin` | 20px |
| Star (rating) | `Star` | 16px |
| Check / Success | `Check` | 20px |
| Edit | `Pencil` | 16px |
| Delete / Trash | `Trash2` | 16px |
| More options | `MoreHorizontal` | 20px |
| External link | `ExternalLink` | 16px |
| Download | `Download` | 20px |
| Eye (visibility) | `Eye` / `EyeOff` | 16px |
| Lock | `Lock` | 16px |
| Calendar | `Calendar` | 20px |
| Clock | `Clock` | 16px |
| Phone | `Phone` | 16px |
| Navigation/Directions | `Navigation` | 20px |
| Info | `Info` | 16px |
| Warning | `AlertTriangle` | 20px |
| Error | `AlertCircle` | 20px |

**Icon color defaults:**
- Active tab: `text-cyan`
- Inactive tab: `text-text-tertiary`
- Interactive icons: `text-text-secondary` → `text-text-primary` on hover
- Liked heart: `text-red-500` (filled)

---

## 5. Component Sizing Quick Reference

| Component | Height | Padding | Border Radius | Font |
|-----------|--------|---------|---------------|------|
| Button (primary) | 48px | 16px 24px | 12px | Inter 600 14px |
| Button (secondary) | 48px | 16px 24px | 12px | Inter 600 14px |
| Button (small) | 36px | 8px 16px | 8px | Inter 500 13px |
| Input field | 48px | 12px 16px | 12px | Inter 400 14px |
| Chip / Tag | 32px | 6px 12px | 9999px (pill) | Inter 500 13px |
| Avatar (sm) | 32px | — | 9999px | — |
| Avatar (md) | 40px | — | 9999px | — |
| Avatar (lg) | 64px | — | 9999px | — |
| Avatar (xl) | 96px | — | 9999px | — |
| Product tile | auto | 12px | 16px | — |
| Tab bar | 80px | — | — | — |
| Top bar | 56px | — | — | — |
| Bottom sheet handle | 4px × 40px | — | 9999px | — |

---

## 6. Breakpoints

AVACAR is mobile-first. These are the responsive breakpoints:

| Name | Width | Target |
|------|-------|--------|
| `sm` | 640px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktop |

**Key responsive behaviors:**
- Tab bar → visible on `sm` and below, converts to sidebar on `lg+`
- Product grid → 2 columns on mobile, 3 on `md`, 4 on `lg+`
- Feed → single column always (max-width 600px centered on desktop)
- Customize screen → single column mobile, side panel on `lg+`

---

*— Hammad*
