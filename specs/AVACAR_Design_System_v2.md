# AVACAR Design System v2.0
## "The Pristine Atelier"

**Prepared for:** Mirmi (AI Development Agent)  
**Author:** Hammad, xix3D Creative Director  
**Last updated:** March 2026  
**Status:** Canonical — supersedes all prior design docs

---

## 0. CRITICAL READING — START HERE

This document governs every pixel of AVACAR. It is the single source of truth for visual design.

**Platform priority: Mobile-first.** AVACAR is a social platform. The overwhelming majority of users will be on their phones. Every layout decision, spacing choice, and interaction pattern must be designed for a 390px screen first, then adapted upward to tablet and desktop. If a component looks great on desktop but cramped on mobile, it is wrong.

**Two modes required:** Every screen ships with both a dark mode and a light mode. Dark is the default and primary experience. Light mode is a clean, premium alternative. Neither is an afterthought.

**Fonts are pre-loaded in the codebase:**
- Manrope (all weights 200–800) — the only typeface used
- Material Symbols Outlined — icon set

**Tailwind config is pre-defined** in the existing HTML. All tokens below match those definitions. Do not introduce arbitrary hex values outside the token system.

---

## 1. CREATIVE NORTH STAR

**"The Pristine Atelier"**

Borrowed from high-end automotive design and luxury watchmaking: clarity, precision, and material honesty are paramount. The interface is treated as a gallery space — elements layered with depth, primary actions glowing with tech-forward energy. Precision instrument. Minimalist yet deeply sophisticated.

This is not a consumer app aesthetic. It is not bubbly, not pastel, not rounded-toy. It is a surface that respects the cars it showcases.

**Key design moves that define the Atelier feel:**
- No 1px solid borders. Ever. Separation is achieved through background shifts only.
- Extreme whitespace on light mode. If it feels empty, it's probably right.
- Editorial asymmetry: text blocks and images intentionally offset, not centered and balanced.
- Scale contrast in typography: giant display type paired with tiny label caps.
- Cyan (`#007FFF`) is used like a laser — once per screen to signal the single most important action.

---

## 2. COLOR TOKENS

### 2.1 Light Mode Palette

These are defined in the Tailwind config and must be referenced by token name, not raw hex.

| Token | Hex | Usage |
|---|---|---|
| `background` | `#f7f9fb` | Page background |
| `surface` | `#f7f9fb` | Default surface |
| `surface-container-lowest` | `#ffffff` | Cards, elevated elements |
| `surface-container-low` | `#f2f4f6` | Subtle container fills |
| `surface-container` | `#eceef0` | Mid-level containers |
| `surface-container-high` | `#e6e8ea` | Higher-emphasis containers |
| `surface-container-highest` | `#e0e3e5` | Maximum container elevation |
| `surface-dim` | `#d8dadc` | Dimmed/recessed surfaces |
| `on-surface` | `#191c1e` | Primary text (deep blue-black, NOT pure black) |
| `on-surface-variant` | `#414754` | Secondary/supporting text |
| `primary` | `#005ab7` | Brand blue, section headers, active states |
| `primary-container` | `#0072e5` | Gradient endpoint, deeper blue |
| `secondary-container` | `#d6e4f7` | Chip/tag fills |
| `on-secondary-container` | `#586676` | Chip/tag text |
| `outline-variant` | `#c1c6d7` | Ghost borders (used at 15% opacity only) |
| `cyan` | `#007FFF` | THE magic accent — FABs, primary CTAs, "Try On My Car", active nav |
| `inverse-surface` | `#2d3133` | Dark surfaces in light mode (icon panel, etc.) |

### 2.2 Dark Mode Palette

Dark mode uses the same Tailwind token names but resolves to inverted values. In JSX/Next.js, implement via `dark:` Tailwind prefix. In plain HTML, via `class="dark"` on the `<html>` element.

| Token | Dark Hex | Notes |
|---|---|---|
| `background` | `#0C0C10` | AVACAR's signature near-black |
| `surface` | `#0f1015` | Slightly lifted surface |
| `surface-container-lowest` | `#13141a` | Deepest card bg |
| `surface-container-low` | `#1a1b22` | Standard card bg |
| `surface-container` | `#1f2029` | Mid container |
| `surface-container-high` | `#252630` | Elevated container |
| `surface-container-highest` | `#2c2d38` | Max elevation |
| `on-surface` | `#e2e3e8` | Primary text (cool white) |
| `on-surface-variant` | `#9a9caa` | Secondary text |
| `primary` | `#007FFF` | Cyan is primary in dark mode |
| `primary-container` | `#0057cc` | Deeper blue |
| `secondary-container` | `#1e2a3a` | Dark chip fills |
| `on-secondary-container` | `#a0b4cc` | Dark chip text |
| `outline-variant` | `#2e3040` | Ghost borders in dark |
| `cyan` | `#007FFF` | Same — never changes |
| `inverse-surface` | `#e2e3e8` | Light elements on dark |

### 2.3 Color Usage Rules

**The No-Line Rule:** Never use `border: 1px solid [any color]` for layout sectioning. The only exception is the "Ghost Border" fallback (see Section 4). Containers are defined by background color shifts alone.

**Cyan is a laser, not paint:** `#007FFF` appears once per screen on its most critical element. On the Feed, it's the "Try On My Car" button. In the Studio, it's the GENERATE button. On the nav, it's the active item. Using it on two things simultaneously destroys its power.

**Button gradient:** Primary buttons use `linear-gradient(45deg, #005ab7, #0072e5)` in light mode. In dark mode: `linear-gradient(45deg, #0057cc, #007FFF)`. This is the "signature texture" — it adds tactility and premium feel.

**Text color:** Never use `#000000`. Always use `on-surface` (`#191c1e` light / `#e2e3e8` dark). The nuance matters.

---

## 3. TYPOGRAPHY

**One font: Manrope.** Geometric, precise, tech-forward. Every weight from 200 to 800 is loaded.

### 3.1 Type Scale

| Name | Size | Weight | Letter-spacing | Line-height | Usage |
|---|---|---|---|---|---|
| `display-lg` | `3.5rem` (56px) | 800 | `-0.02em` | `1.0` | Marketing hero text, manifesto statements |
| `display-md` | `2.75rem` (44px) | 800 | `-0.02em` | `1.05` | Section hero headlines |
| `headline-lg` | `2rem` (32px) | 700 | `-0.01em` | `1.2` | Page titles |
| `headline-md` | `1.5rem` (24px) | 700 | `0` | `1.3` | Card headers, modal titles |
| `title-lg` | `1.375rem` (22px) | 600 | `0` | `1.4` | Section anchors |
| `title-md` | `1.125rem` (18px) | 600 | `0` | `1.5` | Sub-section titles |
| `title-sm` | `0.875rem` (14px) | 600 | `0` | `1.5` | Button text, nav items |
| `body-lg` | `1rem` (16px) | 400 | `0` | `1.6` | Body copy (workhorse) |
| `body-md` | `0.875rem` (14px) | 400 | `0` | `1.6` | Secondary body copy |
| `label-sm` | `0.625rem` (10px) | 700 | `0.2em` | `1.4` | Caps labels, section identifiers |
| `caption` | `0.75rem` (12px) | 400 | `0` | `1.5` | Supporting captions, timestamps |

### 3.2 Editorial Asymmetry Rule

Pair extremes deliberately. A `display-lg` headline next to a `label-sm` caption creates intentional tension — this is what makes AVACAR feel custom rather than templated. Do not be afraid of the contrast. A `label-sm` in ALL CAPS with `tracking-[0.3em]` is a section identifier, not a title. Don't inflate it.

### 3.3 Mobile type reductions

On screens under 430px, reduce display scales:
- `display-lg` → `2.5rem`
- `display-md` → `2rem`
- `headline-lg` → `1.75rem`

Body and label scales do not change.

---

## 4. ELEVATION & DEPTH

Depth is communicated through material stacking, not shadow darkness.

### 4.1 The Layering Principle

Stack surface tiers to create lift:
- Page: `background`
- Sections: `surface`
- Cards: `surface-container-lowest` (light) / `surface-container-low` (dark)
- Elevated cards: `surface-container-low` (light) / `surface-container` (dark)
- Active/focused elements: `surface-container-high`

Each step is a distinct material layer — like fine paper or frosted glass stacked physically.

### 4.2 Ambient Shadows

For floating elements (modals, nav bars, FABs):
```css
box-shadow: 0 4px 40px rgba(25, 28, 30, 0.04);   /* light mode */
box-shadow: 0 4px 60px rgba(0, 0, 0, 0.3);        /* dark mode */
```
Never use heavy drop shadows. Blur radius: 40px–60px. Opacity: 4%–6% light / 20%–30% dark.

### 4.3 Ghost Border (accessibility fallback only)

When a container needs definition for accessibility reasons, and background shift alone is insufficient:
```css
border: 1px solid rgba(193, 198, 215, 0.15);  /* outline-variant at 15% */
```
This is a suggestion of an edge, not a structural line. Used sparingly.

### 4.4 Interactive Glass

Glassmorphic panels use:
```css
background: rgba(255, 255, 255, 0.7);    /* light */
background: rgba(20, 21, 28, 0.7);       /* dark */
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
```
On user interaction (hover/focus): increase blur to 24px, add subtle `#007FFF` glow at 10% opacity to the ghost border.

### 4.5 Primary Glow (CTAs only)

The cyan FAB and primary buttons in dark mode should have:
```css
box-shadow: 0 0 40px rgba(0, 127, 255, 0.25);
```
Only on the single primary CTA per screen.

---

## 5. COMPONENTS

### 5.1 Buttons

**Primary Action Button**
- Shape: `border-radius: 9999px` (pill)
- Background: gradient `linear-gradient(45deg, #005ab7, #0072e5)` light / `linear-gradient(45deg, #0057cc, #007FFF)` dark
- Text: `on-primary` (#ffffff), `title-sm` weight, `tracking-widest`, uppercase
- Padding: `py-4 px-8` mobile / `py-4 px-10` desktop
- Hover: `scale(1.02)`, transition 150ms
- Shadow: `0 8px 20px rgba(0, 90, 183, 0.2)` light / `0 8px 30px rgba(0, 127, 255, 0.3)` dark
- Width: full-width on mobile, auto on desktop

**Secondary Ghost Button**
- Shape: pill
- Background: transparent
- Border: ghost border using `primary` at 20% opacity
- Text: `primary`, `title-sm`, tracking-widest, uppercase
- Hover: `bg-primary/5`

**Tertiary / Text Button**
- No background, no border
- Text: `primary` color
- Underline on hover

**FAB (Floating Action Button) — The Digital Heart**
- Size: 56px × 56px (mobile) / 64px × 64px (desktop)
- Background: `#007FFF` — always, both modes
- Icon: Material Symbol, filled, white
- Shadow: `0 0 40px rgba(0, 127, 255, 0.3)` — ambient glow
- Pulse animation: `animate-pulse` on the glow layer (not the button itself)
- Position: `fixed bottom-24 right-6` (mobile, above bottom nav) / `fixed bottom-8 right-8` (desktop)
- **This is the "Try On My Car" trigger on Feed, and GENERATE in Studio**

### 5.2 Input Fields

- Background: `surface-container-high` — solid fill, no borders
- Shape: `border-radius: 1rem` (lg)
- Padding: `px-5 py-4`
- Label: `label-sm` in `primary` color, uppercase, tracking-wide, displayed above field
- Placeholder: `on-surface-variant`, 60% opacity
- Focus state: background shifts to `surface-container-highest`, 2px `primary` glow ring
- No underline-only inputs. No full-outline inputs. Solid background only.

### 5.3 Cards

- Background: `surface-container-lowest` on `surface` background (light) / `surface-container-low` on `background` (dark)
- Border-radius: `1.5rem` (xl) — the "soft-tech" silhouette
- Shadow: ambient only (see 4.2)
- Padding: `p-6` mobile / `p-8` desktop
- No divider lines inside cards. Use `spacing-6` (1.5rem) vertical gaps between content rows.
- Hover state: slight background lift (surface-container-lowest → surface-container-low), ghost border appears

**Post/Build Card (Feed-specific):**
- No outer padding — image goes edge-to-edge to card boundary
- Image aspect ratio: 4:3 default, 16:9 for video posts
- Image corner radius matches card: `xl` (1.5rem) on top two corners, 0 on bottom (bleeds to content)
- Content area below image: `p-4` padding, white/dark surface
- Parts chip row: horizontal scroll, `pb-2` for scroll affordance

### 5.4 Chips & Tags

- Shape: `border-radius: 9999px` (full pill)
- Background: `secondary-container`
- Text: `on-secondary-container`, `label-sm` weight, uppercase, tracking-widest
- Padding: `px-4 py-2`
- Active state: `primary` background, `on-primary` text
- They should feel like physical buttons on a luxury dashboard — tactile, premium

### 5.5 Bottom Navigation (Mobile — PRIMARY nav surface)

This is the most important nav element. Desktop has a sidebar. Mobile has only the bottom nav.

```
[Feed] [Explore] [✦ Design] [Garage] [Profile]
```

- Background: glassmorphic — `surface-container-lowest` at 85% opacity, `backdrop-blur: 20px`
- Height: 72px + safe area inset (use `pb-safe` or `padding-bottom: env(safe-area-inset-bottom)`)
- Border-radius: `1.5rem 1.5rem 0 0` (rounded top corners only)
- Shadow: `0 -4px 40px rgba(25, 28, 30, 0.06)`
- Active item: `cyan` icon + label, background pill `surface-container-high`
- Inactive items: `on-surface-variant` at 60% opacity
- Center item (✦ Design Studio): elevated, cyan, slightly scaled `scale(1.1)`, no label or label "Studio"
- Position: `fixed bottom-0 left-0 right-0 z-50`

### 5.6 Top Navigation Bar (Mobile)

- Height: 56px
- Background: glassmorphic (matches bottom nav style)
- Position: fixed top
- Left: hamburger menu icon + AVACAR wordmark
- Right: notifications (cyan dot badge if unread) + optional search icon
- The wordmark: Manrope, font-black (800), italic, tracking-tighter, uppercase

### 5.7 Top Navigation Bar (Desktop)

- Height: 64px
- Left: AVACAR wordmark
- Center: search bar (expands on focus)
- Right: nav links + notification bell
- Sticky, glassmorphic background

### 5.8 Left Sidebar (Desktop only — hidden on mobile)

- Width: 240px
- Fixed position
- Background: `surface-container-lowest` (light) / `surface-container-low` (dark)
- Nav items: icon + label, active state uses cyan left accent bar + `surface-container-high` background
- Bottom: "Design My Car" CTA button (full-width, primary gradient, pill)

---

## 6. ICONOGRAPHY

**Set:** Material Symbols Outlined  
**Weight:** 300  
**Fill:** 0 (outlined by default), 1 (filled for active/selected states)  
**Size:** 24px standard, 20px in dense contexts, 28px for FAB

```css
font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
```

**Core icons for AVACAR:**

| Icon | Context |
|---|---|
| `home` | Feed nav |
| `search` | Explore nav |
| `auto_awesome` | Design Studio nav (✦) |
| `directions_car` | Garage nav |
| `person` | Profile nav |
| `notifications` | Top bar |
| `palette` | Wraps/design |
| `tire_repair` | Wheels |
| `speed` | Performance |
| `electric_car` | EV |
| `precision_manufacturing` | Builds |
| `local_car_wash` | PPF/detail |
| `settings_input_component` | Parts/specs |
| `add` | Create/FAB |
| `favorite` | Like/heart |
| `bookmark` | Save |
| `comment` | Comments |
| `share` | Share |
| `store` | Marketplace |
| `event` | Events |
| `newspaper` | News |
| `group` | Scenes |
| `verified` | Certified badge |

---

## 7. IMAGERY GUIDELINES

### 7.1 Photography aesthetic

**Dark mode:** "Dark Fidelity" and "Chiaroscuro"
- High contrast, deep atmospheric shadows
- Cars photographed against near-black or deeply shadowed environments
- Form over environment — the car is the subject, background falls away
- Dramatic side lighting that reveals body lines
- Monochrome or heavily desaturated editorial tones

**Light mode:** "High Fidelity" and "Clean Shadows"
- Soft directional lighting, high micro-contrast
- Clean studio-white or architectural grey backgrounds
- Emphasize material quality — paint reflections, surface detail
- Soft shadows that define form without drama

### 7.2 AI-generated renders

- Must look like the user's actual car, not a generic model
- Same angle, same body color as the source photo
- Modifications are applied photorealistically
- Output 3 variations — present in a swipeable card format on mobile

### 7.3 Image treatment in feed

- Full-bleed to card edges (no padding on image)
- Subtle dark gradient overlay at bottom of card images (for text readability)
- Hover/tap: slight scale `1.02`, transition 300ms
- Grayscale for "explore" thumbnails that haven't been interacted with, full color on hover/tap

---

## 8. MOBILE-FIRST PAGE LAYOUTS

Each page must work at 390px width first. Breakpoints:
- `sm`: 430px
- `md`: 768px (tablet)
- `lg`: 1024px (desktop)
- `xl`: 1280px (wide desktop)

### 8.1 Feed (Home)

**Mobile layout:**
```
[Fixed top nav — 56px]
[Story/Progress strip — 80px horizontal scroll]
[Filter pills — horizontal scroll, sticky below top nav]
[Post cards — full width, edge-to-edge]
  [Image — 4:3, full width]
  [Parts chips — horizontal scroll]
  [Engagement row: ❤ 💬 🔖 | Try On My Car →]
  [Caption — 2 lines truncated]
[Fixed bottom nav — 72px]
[FAB (Design My Car) — bottom-right, above nav]
```

**Desktop additions:**
- Left sidebar (240px, fixed)
- Right sidebar (280px, fixed): "Start Building" CTA, trending tags, builders to follow
- Center content column: max-width 680px, centered

### 8.2 Explore

**Mobile:**
```
[Fixed top: search bar + filter pills]
[Masonry grid — 2 columns, gapless or 4px gap]
[Each card: image fills cell, category chip overlay, heart count]
[Infinite scroll]
```

**Desktop:** 3–4 column masonry

### 8.3 Design Studio

**Mobile (fullscreen, no bottom nav during active session):**
```
[Back arrow top-left | Car selector top-center | Save top-right]
[Car photo — fills 65% of screen height]
[Bottom panel (slides up):]
  [Preset chips — horizontal scroll]
  [Products row — horizontal scroll]
  [GENERATE button — full width, cyan gradient, pill]
[Close/back cancels studio session]
```

**No standard navigation visible during generation — full immersion.**

### 8.4 Garage

**Mobile:**
```
[Page header: "My Garage" + Add car button]
[Car cards — single column or 2-column grid]
  [Car hero image — 16:9]
  [Year Make Model | Current spec summary]
  [Design / Build Log / Share buttons]
[Add a Car CTA — sticky bottom if no cars yet]
```

### 8.5 Marketplace

**Mobile:**
```
[Search bar + category filter pills]
[Product grid — 2 columns]
  [Product image — square]
  [Brand logo | Product name]
  [Price | Visualize on My Car button]
[Product detail (full-screen sheet):]
  [Image gallery — swipeable]
  [Name, brand, price]
  [Finish/variant selector — chips]
  [Add to Cart | Visualize on My Car (cyan)]
  [Price comparison row]
  [Builds using this — mini feed]
```

### 8.6 Scenes

**Mobile:**
```
[Scene header — full-width hero image with overlay]
[Scene name | Member count | Join button]
[Tabs: Feed | Builds | Events | Members]
[Standard feed/grid depending on tab]
```

### 8.7 Profile

**Mobile:**
```
[Cover image — full width, 3:2 ratio]
[Avatar (overlaps cover, bottom-left) + Follow button (bottom-right)]
[Name | @handle | Location]
[Stats row: Builds · Followers · Following]
[Tabs: Builds | Garage | Saved | Activity]
[Masonry grid of builds]
```

### 8.8 News

**Mobile:**
```
[Section header: "Automotive News"]
[Tabs: Latest | Trending | For You]
[News cards — full width]
  [Thumbnail image — 16:9]
  [Source badge + time]
  [Headline — 2 lines max]
  [▲ upvote count | 💬 comments | → share]
[Comment thread (expandable, Reddit-style)]
```

### 8.9 Shop Profile (Zeno Certified)

**Mobile:**
```
[Hero banner — full width]
[Zeno Certified badge + Shop name]
[Rating | Response time | Location]
[Specialties — chip row]
[Book Now (cyan) | Message buttons]
[Portfolio grid — 2 columns, masonry]
[Reviews — card stack]
```

---

## 9. DARK MODE IMPLEMENTATION

### 9.1 Strategy

Dark mode is the **default and primary** AVACAR experience. Light mode is a premium alternative.

In Next.js, implement with `next-themes`. The `<html>` element receives `class="dark"` or `class="light"`. All Tailwind dark: prefixes apply automatically.

### 9.2 Dark mode color overrides

In `globals.css` or `tailwind.config.js`, define semantic color tokens that resolve differently per mode. The key overrides:

```css
/* Dark mode overrides (applied when html.dark) */
.dark {
  --background: #0C0C10;
  --surface: #0f1015;
  --surface-container-lowest: #13141a;
  --surface-container-low: #1a1b22;
  --surface-container: #1f2029;
  --surface-container-high: #252630;
  --surface-container-highest: #2c2d38;
  --on-surface: #e2e3e8;
  --on-surface-variant: #9a9caa;
  --primary: #007FFF;
  --secondary-container: #1e2a3a;
  --on-secondary-container: #a0b4cc;
  --outline-variant: #2e3040;
}
```

### 9.3 Dark mode specific rules

- Images: slightly reduce brightness (`brightness-90`) and increase contrast (`contrast-105`) for better dark mode rendering
- Glassmorphic panels: use dark base (`rgba(20, 21, 28, 0.7)`)
- Shadows: heavier and more opaque (see Section 4.2)
- The icon panel (dark bg with light icons) **inverts** in light mode — light panel becomes dark-on-dark in dark mode — use `surface-container-highest` fill instead of `on-surface` fill
- Cyan glow effects (`box-shadow: 0 0 40px rgba(0,127,255,0.25)`) are **dark mode only** — remove in light mode

### 9.4 Mode toggle

A mode toggle must be accessible from:
- Settings page
- Profile menu (accessible from top nav)
- On the Design System / dev page (top nav)

Toggle icon: `dark_mode` / `light_mode` Material Symbol. Animate transition with 200ms ease-in-out.

---

## 10. ANIMATION & MOTION

### 10.1 Principles

Motion should feel like a precision instrument, not a toy. Subtle, purposeful, never decorative.

- Duration: 150ms for micro-interactions (button press, icon swap), 300ms for component transitions, 500ms for page transitions
- Easing: `cubic-bezier(0.4, 0, 0.2, 1)` (Material standard) for most transitions
- No bounce, no spring, no overshoot — automotive precision only

### 10.2 Key animations

**Feed scroll:** Standard scroll, no snap — let users scroll freely like Instagram

**Post image reveal:** Fade in at `opacity: 0 → 1` over 300ms as it enters viewport

**"Try On My Car" button:** Gentle pulse on the cyan glow (not the button itself) — `animation: pulse 3s ease-in-out infinite` at very low opacity (0.15 → 0.3)

**Generate loading:** Skeleton shimmer on the car image placeholder while generating. Then crossfade to result.

**Bottom nav active state:** Icon fills (`FILL: 0 → 1`), label fades in, background pill scales in `scale(0.8 → 1)` — all over 200ms

**Page transitions:** Slide from right on navigate forward, slide right on back (native mobile feel)

**Studio open:** Bottom panel slides up from `translateY(100%) → translateY(0)` over 400ms

---

## 11. THE "TRY ON MY CAR" BUTTON — DETAILED SPEC

This is the most important interactive element on the entire platform. It appears on every Feed post.

**Visual:**
- Background: `#007FFF` (cyan, always — both modes)
- Text: "🔮 Try On My Car" — white, `title-sm`, font-weight 600
- Or compact: "Try On My Car →" without emoji for clean contexts
- Shape: pill (`border-radius: 9999px`)
- Padding: `py-3 px-5` (mobile)
- Glow: `box-shadow: 0 4px 20px rgba(0, 127, 255, 0.3)` — dark mode only
- Width: auto, right-aligned in the engagement row

**Behavior:**
- Tap → if user has a car in Garage: opens Design Studio with build pre-loaded
- Tap → if no car saved: bottom sheet slides up with "Add your car" quick flow
- After add: auto-generates and returns to Studio
- Loading state: button label changes to "Generating..." with a subtle spinner

**This button must NEVER be hidden, disabled, or removed from the post card.**

---

## 12. COMPONENT: POST CARD — FULL SPEC

The fundamental unit of the Feed. Every build lives in a post card.

```
┌─────────────────────────────────────┐
│ [Avatar 36px] [Name · Car]  [···]  │  ← header, p-4
├─────────────────────────────────────┤
│                                     │
│        [IMAGE — full bleed]         │  ← 4:3 ratio
│                                     │
│  [#tag1] [#tag2] [#tag3]           │  ← chips, p-3 absolute overlay bottom
└─────────────────────────────────────┘
│ ← Parts chip row (horizontal scroll) │  ← p-3
│ [3M Satin Black ×] [HRE FF15 ×]    │
├─────────────────────────────────────┤
│ ❤ 2.4k   💬 84   🔖    [Try On My Car →]  │  ← engagement, p-3
├─────────────────────────────────────┤
│ Caption text here, 2 lines...       │  ← p-3, body-md
└─────────────────────────────────────┘
```

- Card background: `surface-container-lowest` (light) / `surface-container-low` (dark)
- Card border-radius: `xl` (1.5rem)
- Image corner-radius: `xl` on top two corners, 0 on bottom (bleeds to content below)
- No dividers between sections — vertical spacing only
- The parts chip row is horizontally scrollable, masks at edges with a gradient fade
- Engagement numbers: `body-md` weight, `on-surface-variant`
- "Try On My Car" button: right-aligned, cyan

---

## 13. DO's AND DON'Ts

### Do

- Embrace extreme white space in light mode. Empty is premium.
- Use asymmetrical layouts — offset text and images intentionally.
- Use `lg` (1rem) or `xl` (1.5rem) border-radius on all containers.
- Treat cyan as a laser — one instance per screen, on the most important action.
- Design mobile first. Build at 390px. Scale up.
- Keep surface tiers consistent — always lift from background → surface → container tiers.
- Use `on-surface` (#191c1e / #e2e3e8) for text, never pure black or pure white.
- Make the bottom nav feel premium and tactile — it's the user's primary navigation.

### Don't

- Don't use 1px solid borders for layout separation. Ever.
- Don't use cyan on more than one element per screen.
- Don't use Material Design standard drop shadows (harsh, offset, dark).
- Don't crowd more than 3 primary actions into view simultaneously.
- Don't use pure black (#000000) or pure white (#ffffff) for text.
- Don't design desktop-first and shrink for mobile. Invert the process.
- Don't hide the "Try On My Car" button. It is sacred.
- Don't use bounce or spring animations — precision instruments don't bounce.
- Don't use divider lines inside cards or lists.
- Don't use Glassmorphism for structural content — only for floating overlays.

---

## 14. DESIGN SYSTEM PAGE REFERENCE

The Stitch-generated design system page (both modes) shows the correct visual rendering of these tokens. Key notes from reviewing both:

**Dark mode page (screen_1_.png):**
- Overall: correctly dark, surfaces stacked properly
- Typography card: correct scale contrast — huge display type next to tiny label caps
- Material palette: dark swatches with correct blue-blacks and cyan
- Glass card: subtle, correctly rendered with ambient light spots
- Buttons: gradient primary (blue to deeper blue), ghost secondary — both correct
- Icon panel: dark background with light icons — correct inversion
- Imagery section: "Dark Fidelity" / "Chiaroscuro" labels — use these exact terms when briefing creative
- Digital Heart CTA: gradient blue card with cyan FAB — the template for all CTA moments

**Light mode page (screen.png):**
- Background shifts to the clinical off-white (#f7f9fb) — correctly clean
- Cards lift slightly to pure white (#ffffff)
- Typography unchanged — Manrope scales are identical
- Palette shifts to lighter grays — the surface tier system is visible
- Icon panel: becomes the inverse-surface (near-black) block — correct
- The same gradient blue CTA card works in light mode too — kept as-is
- "High Fidelity" / "Clean Shadows" imagery labels — use for light mode creative briefing

**Both modes share:**
- The same Manrope typeface at identical scale
- The same cyan (#007FFF) for all interactive highlights
- The same bottom navigation structure
- The same card shapes, radius, and glassmorphic components
- The same button system (gradient primary, ghost secondary)

**The dark mode design system page IS the source of truth for visual fidelity.** When in doubt, reference it.

---

*End of AVACAR Design System v2.0*  
*This document governs all visual decisions. Any deviation requires explicit approval from Hammad before implementation.*
