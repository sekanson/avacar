# AVACAR — Unified Platform UX Specification v2.0

**Product:** AVACAR by xix3D
**Document Purpose:** Single source of truth for Mirmi to build the AVACAR platform — consumer app, B2B website, brand dashboard, and embeddable widget
**Design System:** Zeno Design System v2.0 (Manrope display / Inter body / JetBrains Mono monospace)
**Theme:** Dark-first, premium automotive aesthetic — Behance/Awwwards-level quality
**Last Updated:** March 9, 2026

---

## Table of Contents

### Part I — Platform Vision & Architecture
1. [Product Overview](#1-product-overview)
2. [Platform Architecture](#2-platform-architecture)
3. [Build Priority & Phasing](#3-build-priority--phasing)
4. [Design System](#4-design-system)

### Part II — Consumer App (Social-First Platform)
5. [App Structure & Navigation](#5-app-structure--navigation)
6. [Phase 1: Social Feed (The Front Door)](#6-phase-1-social-feed)
7. [Commerce Engine (Upload → Customize → Quote → Book)](#7-commerce-engine)
8. [Phase 2: Budget Builds](#8-phase-2-budget-builds)
9. [Phase 3: Avacar Garage](#9-phase-3-avacar-garage)
10. [Phase 4: P2P Marketplace](#10-phase-4-p2p-marketplace)
11. [Phase 5: Sell Your Designs](#11-phase-5-sell-your-designs)
12. [Phase 6: B2B/B2C Consignment Marketplace](#12-phase-6-b2bb2c-consignment-marketplace)
13. [Zeno Certified Shop Network](#13-zeno-certified-shop-network)

### Part III — B2B Website (avacar.com Marketing & Dashboard)
14. [B2B Site Architecture](#14-b2b-site-architecture)
15. [Marketing Pages](#15-marketing-pages)
16. [Live Demo Experience](#16-live-demo-experience)
17. [Brand Dashboard](#17-brand-dashboard)
18. [The Embeddable Widget](#18-the-embeddable-widget)

### Part IV — Technical & Implementation
19. [Responsive & Mobile Strategy](#19-responsive--mobile-strategy)
20. [Micro-Interactions & Animation Guide](#20-micro-interactions--animation-guide)
21. [Technical Implementation Notes](#21-technical-implementation-notes)
22. [Analytics Events](#22-analytics-events)

---

# PART I — PLATFORM VISION & ARCHITECTURE

---

## 1. Product Overview

### What AVACAR Is

AVACAR is a dual-sided automotive aftermarket platform:

**Consumer side:** A social-first car culture platform where enthusiasts discover, design, share, and purchase vehicle modifications. The experience is Instagram for car builds with a Shopify checkout underneath. Users log in and see a feed first, shop second. When they're ready to buy, the configurator and booking flow activate.

**B2B side:** An AI-powered "See It On Your Car" widget sold to wheel manufacturers (HRE, Brixton, Vossen, etc.) as a SaaS product. Brands embed the widget on their product pages so consumers can upload a photo and instantly see the brand's wheels on their car.

### The Core Philosophy

> *"Social first, shop second. It's the aftermarket platform. But it's a social forum first. Like, look at my new build — you can get it too."* — Tiago

- **Social first, shop second.** The feed IS the product. Commerce activates when users are ready.
- **Ad-free.** No sponsored content. No promoted posts. Revenue comes from transactions, not attention.
- **Instagram feel + Shopify checkout.** Users browse, get inspired, then "try it on" and buy.
- **Every build is content.** Completed customizations auto-generate feed posts. The platform feeds itself.
- **Community drives conversion.** Users sharing where they got work done, how much it cost, and tagging shops is more powerful than any ad.

### The Business Model

**Consumer App Revenue:**
- Marketplace commissions (15-30% on design sales)
- Shop lead fees / booking commissions
- Premium consumer tiers (future)
- P2P marketplace transaction fees (future)

**B2B Widget Revenue (AVACAR for Brands):**
- $5,000 flat onboarding fee per brand
- Monthly subscription: Boutique ($499), Studio ($999), Flagship ($1,999)
- Overage renders: $0.45–$0.65 per render

---

## 2. Platform Architecture

### The Two Products

```
AVACAR Platform
├── Consumer App (social + commerce)
│   ├── Social Feed (home screen)
│   ├── Explore / Discovery
│   ├── Upload → Customize → Quote → Book (commerce engine)
│   ├── Avacar Garage (retention)
│   ├── P2P Marketplace
│   ├── Design Marketplace (creator economy)
│   └── Zeno Certified Shop Network
│
└── B2B Product (avacar.com)
    ├── Marketing Website (brand acquisition)
    ├── Brand Dashboard (analytics, catalog, widget config)
    └── Embeddable Widget (lives on brand websites)
```

### How They Connect

The B2B widget drives consumers FROM brand websites INTO the consumer platform:

```
Brand's Website (e.g., hrewheels.com)
  └── AVACAR Widget ("See It On Your Car")
        └── Consumer sees render
              ├── "Buy Now" → stays on brand's site
              └── "Try More Brands on Zeno Vision" → enters consumer app
                    └── Deeper exploration, social sharing, shop booking
```

---

## 3. Build Priority & Phasing

### V1 — Commerce Engine (Must Be Fully Functioning First)

Before any social features, v1 must deliver:

- **Full product library:** Wraps, Color PPF, Tints, Wheels, Body Kits, Accessories — all categories populated with real products, brands, and options
- **All pricing set up:** Accurate price ranges for every product category and combination
- **Accurate quoting:** Can quote a full job (wrap + wheels + tint + PPF + body kit + accessories) with itemized pricing
- **Shop fulfillment:** At least some test shops connected and bookable
- **Core flow complete:** Upload → AI Detect → Customize → Quote → Find Shop → Book

### V1.5 — Social Layer (Changes the Front Door)

Once commerce is solid, the app structure inverts:

- **Phase 1: Social Feed** — Home screen becomes a feed. Upload moves to center CTA. (HIGHEST PRIORITY after v1)
- **Phase 1B: User Accounts & Profiles** — Public profiles, follow/unfollow, identity layer
- **Phase 1C: Likes & Comments** — Engagement on posts

### V2 — Engagement & Retention Features

- **Phase 2: Budget Builds** — Suggested complete builds based on budget slider
- **Phase 3: Avacar Garage** — Virtual trophy room, AI-updated 3D garage scene
- **Parallel: Zeno Certified Shop Onboarding** — Verified shop profiles, reviews, portfolio

### V3 — Marketplace & Creator Economy

- **Phase 4: P2P Marketplace** — Sell wheels, wrap film, accessories peer-to-peer
- **Phase 5: Sell Your Designs** — Publish configurator builds as purchasable templates
- **Phase 6: B2B/B2C Consignment** — Shop-to-shop and consumer-to-shop sales

---

## 4. Design System

### Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / H1 | Manrope | 700–800 | Hero headlines, section titles, dashboard stats |
| Headings / H2–H4 | Manrope | 500–600 | Section headers, card titles |
| Body | Inter | 400–500 | Paragraphs, descriptions, UI labels |
| Monospace / Data | JetBrains Mono | 400 | Code snippets, embed codes, analytics numbers, prices |

### Type Scale

```
Hero:      64px / 72px line-height / -0.02em tracking (desktop), 40px (mobile)
H1:        48px / 56px (desktop), 32px (mobile)
H2:        36px / 44px (desktop), 28px (mobile)
H3:        24px / 32px (desktop), 22px (mobile)
H4:        20px / 28px
Body L:    18px / 28px
Body:      16px / 24px
Body S:    14px / 20px
Caption:   12px / 16px
Overline:  11px / 16px / 0.08em tracking / uppercase
```

### Color Palette

**Core Backgrounds:**
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-primary` | `#0C0C10` | App background (consumer), page background |
| `--bg-elevated` | `#111116` | Cards, panels, shop cards |
| `--bg-surface` | `#141418` | Inputs, secondary surfaces, product tiles |
| `--bg-hover` | `#1A1A22` | Hover states, borders |
| `--border-subtle` | `#1A1A22` | Dividers, card borders |
| `--border-default` | `#2A2A34` | Input borders, chip borders |

**Text:**
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FFFFFF` | Headlines, primary content |
| `--text-heading` | `#E4E4E7` | Card titles, secondary headings |
| `--text-secondary` | `#C4C4CC` | Body text within cards |
| `--text-muted` | `#A1A1AA` | Secondary labels |
| `--text-tertiary` | `#8B8B98` | Descriptions, timestamps |
| `--text-faint` | `#52525B` | Placeholders, disabled text |
| `--text-ghost` | `#3F3F46` | Ghost states, empty icons |
| `--text-border` | `#2A2A34` | Barely visible elements |

**Brand Accents:**
| Token | Hex | Usage |
|-------|-----|-------|
| `--accent-cyan` | `#44CCFF` | Primary CTA, active states, links, brand color |
| `--accent-green` | `#22C55E` | Success, completion, confirmed bookings |
| `--accent-gradient` | `linear-gradient(135deg, #44CCFF, #46FF81)` | Premium CTAs (B2B site) |
| `--accent-amber` | `#F59E0B` | Stars/ratings, warnings |
| `--accent-red` | `#EF4444` | Errors, destructive actions, logout |
| `--accent-purple` | `#7C3AED` | Render/creative actions |

**Glassmorphic Properties:**
```css
--glass-bg: rgba(255, 255, 255, 0.03);
--glass-border: rgba(255, 255, 255, 0.06);
--glass-blur: 20px;
```

### Component Library

**Buttons (from prototype, maintain exactly):**
- `.btn-primary`: `background: #44CCFF; color: #0C0C10` — Main CTA
- `.btn-secondary`: `background: #1A1A22; color: #E4E4E7; border: 1px solid #2A2A34` — Secondary action
- `.btn-dark`: `background: #E4E4E7; color: #0C0C10` — Apple-style auth buttons
- `.btn-outline`: `transparent bg; border: 1.5px solid #2A2A34; color: #A1A1AA` — Tertiary action
- `.btn-danger`: `background: rgba(239,68,68,0.1); color: #EF4444` — Destructive
- `.btn-disabled`: `background: #1A1A22; color: #3F3F46` — Disabled state
- All: 12px border-radius, 14px vertical padding, 15px font-size, 600 weight
- Hover: opacity 0.88. Active: scale(0.97). Transition: 150ms.

**Cards:**
- Background: `#111116` with `1px solid #1A1A22` border
- Border-radius: 12px
- Hover: `border-color: #44CCFF; background: #141420; box-shadow: 0 2px 12px rgba(68,204,255,0.06)`

**Chips/Tags:**
- Height: 30px, radius: 15px, padding: 0 14px
- Default: `bg: #141418; border: 1px solid #2A2A34; color: #A1A1AA`
- Active: `bg: #44CCFF; color: #0C0C10; font-weight: 600`
- Hover: `border-color: #44CCFF; color: #44CCFF`

**Product Tiles (`.ptile`):**
- 80px height, `bg: #141418`, radius: 10px
- Border: 1.5px solid `#1A1A22`
- Selected: `border-color: #44CCFF; bg: rgba(68,204,255,0.08)` with checkmark badge
- Bounce animation on selection

**Inputs:**
- Height: 44px, `bg: #141418`, `border: 1px solid #2A2A34`, radius: 10px
- Font: 13px Inter, `color: #E4E4E7`
- Focus: `border-color: #44CCFF`

**Step Bar:**
- Horizontal progress: Upload → Customize → Quote → Book
- Steps: 9px font, 600 weight, uppercase-ish
- Colors: default `#3F3F46`, active `#44CCFF`, done `#22C55E`
- Connecting lines: `#2A2A34` default, colored when active/done

**Toast Notifications:**
- Position: absolute, bottom 100px, centered
- `bg: #44CCFF; color: #0C0C10; radius: 10px; font: 12px 600`
- Animation: slide up + fade in (300ms), auto-dismiss after 1.5s

### Spacing Scale

```
4px  — micro (icon gaps)
6px  — chip gaps, tag gaps
8px  — xs (grid gaps, inline spacing)
10px — grid gaps (product tiles, cards)
12px — sm (card internal gaps, chip rows)
14px — card padding
16px — section padding, input padding
20px — page padding (scroll containers)
24px — large section gaps
32px — between major sections
40px — onboarding padding
```

### Elevation

```
Level 0: flat (page bg #0C0C10)
Level 1: card bg #111116 with 1px border — standard cards
Level 2: #141418 — inputs, product tiles, nested surfaces
Level 3: modal overlay rgba(0,0,0,0.7) — modals, bottom sheets
```

### Icons

Use Lucide icon set (stroke-based, 2px stroke, round caps and joins). The prototype already defines 40+ icons as inline SVGs. Maintain this set and extend as needed. Default icon color: `#52525B` for inactive, `#44CCFF` for active, `#A1A1AA` for interactive.

---

# PART II — CONSUMER APP (SOCIAL-FIRST PLATFORM)

---

## 5. App Structure & Navigation

### Bottom Tab Navigation

After Phase 1 (social layer), the navigation restructures from the current prototype to:

```
┌─────────────────────────────────────────────┐
│   Feed    Explore    [+]    Garage   Profile │
│    🏠       🧭       ⊕       🚗       👤    │
└─────────────────────────────────────────────┘
```

| Tab | Icon | Label | Destination | Notes |
|-----|------|-------|-------------|-------|
| Feed | `home` | Feed | Social feed (home screen) | NEW — replaces old home |
| Explore | `compass` | Explore | Discovery + search | Existing, enhanced |
| Upload | `plus` (custom) | — | Triggers upload flow | Center floating CTA, visually distinct (larger, cyan accent circle). This is the bridge from social to commerce. |
| Garage | `car` | Garage | User's virtual garage | Replaces old "Gallery" |
| Profile | `user` | Profile | User profile + settings | Existing, enhanced |

**Pre-Phase-1 (current prototype):** `Home | Explore | Gallery | Profile` — Upload is a hero block on Home. Keep this for v1 until the social feed is ready.

### Screen Map (Complete)

```
Consumer App
├── Splash → Onboarding (3 screens) → Home
│
├── Feed (home after Phase 1)
│   ├── Feed Post Card (in-feed)
│   └── Post Detail (expanded)
│       ├── Full build breakdown
│       ├── Comments
│       └── "Try This Build on My Car" → Upload flow
│
├── Explore
│   ├── Search + category filters
│   ├── Trending builds list
│   ├── Build detail (expanded)
│   │   └── "Apply to My Car" → Upload flow
│   └── Budget Builds (Phase 2)
│       └── Budget slider → suggested builds
│
├── Upload (center CTA) → Commerce Engine
│   ├── Upload photo
│   ├── Detecting vehicle (AI)
│   ├── Confirm / Edit vehicle
│   ├── Customize (tabbed: Wraps | Wheels | Tint | PPF | Body Kits | Accessories)
│   │   ├── Coverage selector (wraps)
│   │   ├── Brand filter row
│   │   ├── Product tile grid
│   │   ├── Product info modal
│   │   └── Running total + build tags
│   ├── Rendering (AI processing)
│   ├── Quote (itemized + before/after slider)
│   │   ├── Download PDF
│   │   └── Edit Build → back to Customize
│   ├── Find a Shop (map + list)
│   │   ├── Shop Profile (reviews, slots, services)
│   │   └── Book appointment
│   ├── Booking Review → Confirm
│   └── Post to Feed (after save/book)
│
├── Garage (Phase 3)
│   ├── 3D garage scene with user's cars
│   ├── Vehicle list
│   ├── Build history per vehicle
│   └── Before/after per modification
│
├── Profile
│   ├── Avatar, username, bio
│   ├── Posted builds grid (public)
│   ├── Followers / Following counts
│   ├── My Garage link
│   ├── Booking History
│   ├── Notification Settings
│   ├── Payment Methods
│   ├── Help & Support
│   └── Logout
│
├── Marketplace (Phase 4)
│   ├── Browse listings (categories, filters)
│   ├── Listing detail
│   ├── Create listing
│   └── Message seller
│
├── Design Store (Phase 5)
│   ├── Browse designs
│   ├── Design detail + preview
│   ├── Buy / Apply design
│   └── Publish my design
│
├── Auth
│   ├── Signup (Google / Apple / Email)
│   ├── Login
│   └── Forgot Password
│
└── Shared
    ├── Share Build (Instagram / iMessage / WhatsApp / Copy Link / Download)
    ├── Generate Share Card (canvas export)
    └── Notifications
```

---

## 6. Phase 1: Social Feed

**Priority: HIGHEST — This changes the entire app structure.**

### 6A — Feed Core (New Home Screen)

**What it replaces:** The current home screen (Upload hero + Trending Builds + Categories grid). That content moves to Explore and the Upload CTA.

#### Feed Screen Layout

```
┌──────────────────────────────────┐
│ AVACAR                      🔔   │  ← Top bar (same as current)
├──────────────────────────────────┤
│                                  │
│  ┌──────────────────────────┐    │
│  │ 👤 @wraplord             │    │  ← User avatar + username
│  │                          │    │
│  │ ┌──────────────────────┐ │    │
│  │ │                      │ │    │
│  │ │   [Car Photo/Render] │ │    │  ← Full-width image
│  │ │                      │ │    │
│  │ └──────────────────────┘ │    │
│  │                          │    │
│  │ Satin Black · Vossen HF5 │    │  ← Build spec tags
│  │ · 20% Tint               │    │
│  │                          │    │
│  │ ❤️ 342  💬 28            │    │  ← Like + comment counts
│  │                          │    │
│  │ [Try This Build]         │    │  ← CTA button (outlined)
│  └──────────────────────────┘    │
│                                  │
│  ┌──────────────────────────┐    │
│  │ 👤 @customsonly          │    │  ← Next post...
│  │ ...                      │    │
│  └──────────────────────────┘    │
│                                  │
├──────────────────────────────────┤
│ Feed  Explore  [+]  Garage  Prof │  ← Bottom tabs
└──────────────────────────────────┘
```

#### Feed Post Card Structure

Each post card in the feed contains:
- **Header row:** User avatar (32px circle) + username (13px, `--text-heading`, 500 weight) + timestamp (10px, `--text-faint`)
- **Image:** Full-width within card, aspect ratio preserved (landscape or portrait). Border-radius: 8px. Background: `#141418` while loading.
- **Build spec tags:** Horizontal wrap of `.build-tag` chips below image — e.g., "Satin Black Wrap", "Vossen HF-5", "20% Tint". Each tag: 10px font, cyan-tinted bg `rgba(68,204,255,0.08)`, border `rgba(68,204,255,0.15)`, text `#44CCFF`
- **Engagement row:** Heart icon (tap to toggle, `#EF4444` when liked) + like count + comment icon + comment count. All 12px, `--text-tertiary`
- **CTA:** "Try This Build" button — `.btn-outline` style, compact (10px font, 32px height). On tap → loads this build config into the Upload → Customize flow.

Card styling: `bg: #111116`, `border: 1px solid #1A1A22`, `border-radius: 12px`, `margin-bottom: 12px`. Full-width within 20px page padding.

#### Post Detail Screen

Tapping a post card navigates to the expanded detail view:

- **Top bar:** Back button + post title (truncated username's build name)
- **Large image:** Full-width, no border-radius at top (bleeds to edges)
- **User info section:** Avatar + username + follow button (if not self)
- **Full build breakdown:** Every product listed with brand and price
  ```
  Wrap:     Satin Black (3M 2080)        $2,800 – $3,500
  Wheels:   Vossen HF-5 20"              $2,200 – $2,800
  Tint:     20% Dark (XPEL Prime XR)     $400 – $600
  PPF:      —
  Body Kit: —
  ```
- **Shop tag:** If the user tagged a shop: "Done at [Elite Wraps Co.] · 4.9★" — tappable, goes to shop profile
- **Cost breakdown:** If user chose to share: total price with "Shared by @username" note
- **Comments section:** Flat list of comments (avatar + username + timestamp + text). Comment input fixed at bottom.
- **Action buttons:**
  - `[Try This Build on My Car]` — primary, full-width. Loads the build config and goes to Upload flow.
  - `[Share]` — secondary, goes to share screen

#### Post Types

Posts can be one of two types:
1. **Real photo posts:** User uploads a photo of their actual completed build (phone camera photo of their real car after modification)
2. **Render posts:** User shares an AVACAR render from the configurator (what their car WOULD look like)

Both are valid. Mark render posts with a small "AVACAR Render" badge on the image (bottom-right, semi-transparent).

#### Post Creation Flow

A user can create a post from two entry points:
1. **From Profile:** "New Post" button
2. **After saving/booking a build:** "Share to Feed?" prompt

**Creation steps:**
1. Choose image source: Upload a real photo OR select a saved AVACAR render from their gallery
2. Add caption (optional textarea, 280 char limit)
3. Tag the shop (optional — search from Zeno Certified shops list)
4. Tag products used (auto-populated from build config if it's a render, manual tagging if it's a real photo)
5. Share price? (toggle — off by default, respects privacy)
6. `[Post to Feed]` button

### 6B — User Accounts & Profiles

**Public profile per user:**
- Avatar (tappable to change — camera icon overlay, same as current prototype)
- Username (unique, chosen at signup)
- Bio (optional, max 160 chars)
- Stats row: `X posts · Y followers · Z following`
- Posted builds: grid view (3-column masonry, tappable to expand)
- "My Garage" link → navigates to Garage tab
- Follow/Unfollow button (visible when viewing other users' profiles)

**Profile is viewable by other users.** Tapping a username anywhere in the app (feed, comments, shop reviews) navigates to that user's profile.

### 6C — Likes & Comments

**Likes:**
- Heart icon on feed post cards and post detail
- Tap to toggle (filled red `#EF4444` when liked, outline `#52525B` when not)
- Count visible next to icon
- Subtle scale animation on tap (bounce to 1.2 then back to 1.0, 200ms)

**Comments:**
- Flat list on post detail screen (no nested replies for v1)
- Each comment: avatar (24px) + username (11px, 600 weight, `--text-heading`) + timestamp (10px, `--text-faint`) + text (12px, `--text-tertiary`)
- Comment input fixed at bottom of post detail: text input + send button
- Users can discuss where they got work done, how much it cost, recommend shops — this IS the social value

---

## 7. Commerce Engine

**This is the existing v1 flow. It stays intact as the core transaction pipeline. The social feed wraps around it but never replaces it.**

### Product Categories (V1 — ALL SIX REQUIRED)

The current prototype has 4 categories. **V1 must ship with 6:**

| Tab | Icon | Category Key | Products |
|-----|------|-------------|----------|
| Wraps | `palette` | `wrap` | Full body wraps + partial (hood, roof, mirrors, front). Brands: 3M, Avery, XPEL, Inozetek. Colors as swatches. |
| Wheels | `wheel` | `wheels` | Aftermarket wheels. Brands: Vossen, Rotiform, Forgiato, HRE, BBS. |
| Tint | `blinds` | `tint` | Window tint levels. Brands: XPEL, 3M, LLumar. Levels: 5% Limo, 20% Dark, 35% Medium, 50% Light, 70% Ceramic. |
| PPF | `shield` | `ppf` | Paint protection film. Brands: XPEL, 3M, SunTek. Options: Ultimate Plus, Stealth, Pro Series, Full Body. |
| **Body Kits** | `columns` | `bodykit` | **NEW.** Lip kits, spoilers, diffusers, fender flares, wide-body kits. Brands: Liberty Walk, Vorsteiner, Novitec, RWB. |
| **Accessories** | `sparkles` | `accessories` | **NEW.** Chrome delete, badge delete, caliper paint, exhaust tips, splitters, canards, mirror caps, antenna delete. |

#### Body Kits Tab — Detail

**Coverage/Type selector (like wraps coverage):**
- Front lip
- Side skirts
- Rear diffuser
- Spoiler/wing
- Wide-body kit (full)
- Fender flares

**Brand filter row:** All | Liberty Walk | Vorsteiner | Novitec | RWB | Generic

**Product tiles:** Each with icon + name. Selecting "Wide-body Kit (full)" auto-selects all sub-components. Individual pieces can be mixed.

**Pricing:** Range-based like other categories. Example: Front lip $400–$800, Full wide-body $8,000–$25,000.

#### Accessories Tab — Detail

**Type selector (coverage-chip style):**
- Chrome Delete
- Badge Delete
- Caliper Paint
- Exhaust Tips
- Mirror Caps
- Antenna Delete
- Splitter/Canards

**Each accessory:** Simple tile with name + price range. No brand filtering needed for v1 — these are service-based items.

**Pricing:** Lower range items. Chrome delete $300–$600, Caliper paint $200–$400, etc.

#### Updated Customize Screen Tab Bar

```
┌────────────────────────────────────────────────────────┐
│  WRAPS  │  WHEELS  │  TINT  │  PPF  │  KITS  │  ACC   │
└────────────────────────────────────────────────────────┘
```

6 tabs in a horizontally scrollable row if screen is narrow. Each tab shows a selection dot (`.sel-dot`) when that category has a product selected.

#### Updated Quote & PDF

The quote screen and PDF generation must handle all 6 categories:
```
Full Body Wrap — Satin Black (3M)         $2,800 – $3,500
Wheels — Vossen HF-5 20"                  $2,200 – $2,800
Window Tint — 20% Dark                    $400 – $600
PPF — XPEL Ultimate Plus                  $1,800 – $2,400
Body Kit — Front Lip + Side Skirts        $1,200 – $1,800
Accessories — Chrome Delete + Calipers    $500 – $1,000
────────────────────────────────────────────────────
Total Estimate                            $8,900 – $12,100
```

### Commerce Flow (Existing, Maintained)

The step-by-step flow remains identical to the prototype:

1. **Upload** — Take photo or choose from gallery
2. **Detecting** — AI analyzes vehicle (Claude API: make, model, year, color, body)
3. **Confirm** — User confirms detected vehicle or edits manually
4. **Customize** — Tabbed product selector (now 6 categories). Build tags + running total at bottom.
5. **Rendering** — AI processing animation (spinner + progress bar + "Applying [Product]" status)
6. **Quote** — Itemized pricing + before/after slider + Download PDF + Edit Build
7. **Find a Shop** — Map + list + filters (distance, rating, price)
8. **Shop Profile** — Reviews, services, available time slots
9. **Booking Review** — Summary of build + shop + appointment
10. **Confirmed** — Success screen + Add to Calendar + email preview to shop

**After confirmation, NEW flow addition:**
11. **"Share to Feed?"** prompt — User can post their build to the social feed with one tap

---

## 8. Phase 2: Budget Builds

**New section accessible from Explore tab.**

### Budget Builds Screen

- **Entry:** New section card on Explore page, or dedicated sub-tab
- **Budget slider:** Drag to set range ($500 → $10,000+). Styled as a custom range input with cyan track and thumb.
- **Results:** Scrollable list of complete build packages that fit within the budget

**Each suggested build card:**
- Render preview image (sample car with the build applied)
- Build name (e.g., "Clean & Simple — Under $3K")
- Product list as tags: "Satin Black Wrap · 20% Tint · Chrome Delete"
- Total estimated cost (bold, cyan)
- `[Try This on My Car]` button → loads build config into Upload flow

**Sources:**
- Editorially curated builds (staff picks)
- Algorithmically assembled from product library (cheapest-first combos)
- Community-popular builds (most-liked feed posts in that budget range)

---

## 9. Phase 3: Avacar Garage

**Each user gets a virtual garage — their trophy room.**

### Garage Screen

- **Hero:** Persistent 3D garage environment image (same base for everyone). When user adds vehicles or completes builds/purchases, AI updates the render to show their car(s) with customizations parked inside the garage.
- **Vehicle list:** Below the garage image, list of all user's vehicles (same as current "My Garage" but enhanced)
- **Each vehicle card:** Photo thumbnail + name + build summary + tap to expand
- **Expanded vehicle:** Full build history, before/after of each modification, date of each change

**Features:**
- "Add Vehicle" → links to Upload flow
- View each car's build history timeline
- See before/after of every modification
- Share garage as a single image (canvas export showing the 3D garage with all cars)

**Retention mechanic:** Users keep coming back to see and improve their garage. Every purchase or completed build automatically updates the garage scene.

**Accessible from:** Bottom nav Garage tab + profile page link

---

## 10. Phase 4: P2P Marketplace

**"Facebook Marketplace for car parts."**

### Marketplace Screen

- **Categories:** Wheels, wrap film rolls, accessories, parts, miscellaneous
- **Filters:** Price range, condition (New / Like New / Used), location/distance, category
- **Search bar:** Free text search

**Each listing card:**
- Photo(s) — first image as thumbnail
- Title
- Price (bold)
- Condition badge (green for New, amber for Used)
- Seller: username + profile link
- Location: city/distance

**Listing detail:**
- Photo gallery (swipeable)
- Full description
- Condition, brand, specifications
- Seller profile section (avatar, username, rating if available, member since)
- `[Message Seller]` button → opens DM/chat
- `[Save Listing]` bookmark

**Create listing (from Profile):**
- Upload photos (up to 6)
- Title, description, category dropdown, condition selector
- Price input
- Location (auto-detect or manual)
- `[Publish Listing]`

**V1:** No in-app payments. Buyer and seller connect via messaging, handle transaction externally. Stripe integration comes later.

---

## 11. Phase 5: Sell Your Designs

**Turn creative users into micro-entrepreneurs.**

### How It Works

1. User creates a build in the configurator (selects wraps, wheels, tint, PPF, body kits, accessories)
2. After saving, they see option: "Publish as Design Template"
3. They set a price (or free) and add a description
4. Design goes into the Design Store

### Design Store Screen

- Browse published designs (grid of preview cards)
- Filter by: vehicle type, budget range, style tags, popularity
- Each design card: render preview + creator username + price + like count

### Design Detail

- Full render preview
- Complete product list with brands and specs
- Creator profile link
- Price (or "Free")
- `[Buy This Design]` → charges the buyer, credits the creator (minus platform cut)
- `[Apply to My Car]` → loads into Upload flow with all products pre-selected

### Revenue Split

- Creator receives 70–80% of design sale price
- Platform takes 20–30% commission
- Free designs are allowed (creator chooses)

---

## 12. Phase 6: B2B/B2C Consignment Marketplace

**Longest-term feature. Build infrastructure incrementally.**

### Expansion of P2P Marketplace

- **Shop sellers:** Shops can list surplus inventory (wrap film rolls, used wheels from trade-ins, accessories). They get a "Zeno Certified Shop" badge on their listings.
- **Consumer-to-shop:** "I have 3M Satin Black film I didn't use — any shop want it?" Consumers can list items specifically targeting shop buyers.
- **Filters expand:** Seller type (Consumer / Shop), product category, location

### Build Order

1. Start with listings + messaging (same as P2P)
2. Add shop seller verification
3. Add payment processing (Stripe)
4. Add escrow / transaction protection

---

## 13. Zeno Certified Shop Network

**Parallel track — runs alongside all phases. The more shops on the platform, the more valuable every feature becomes.**

### Shop Profiles (Verified)

Each certified shop gets:
- Verified profile with "Zeno Certified" badge (green checkmark)
- Portfolio: photos of completed work (swipeable gallery)
- Reviews: star rating + written reviews from customers
- Services: which categories they handle (wraps, wheels, tint, PPF, body kits, all)
- Pricing tier: $ / $$ / $$$ indicator
- Availability: bookable time slots
- Location: address + map + distance from user
- Contact: phone, hours

### Certification Benefits (for shops)

- Appear in "Find a Shop" results
- Receive booking requests from AVACAR users
- Get tagged in user posts (free marketing)
- Access to leads and analytics (future dashboard)

### Onboarding

- Shop applies via form (business name, services, location, portfolio photos)
- xix3D team verifies legitimacy
- Shop receives certified badge + profile setup assistance
- Training on how to respond to quotes and bookings

---

# PART III — B2B WEBSITE (avacar.com Marketing & Dashboard)

---

## 14. B2B Site Architecture

```
avacar.com/
├── / ............................ Homepage (hero + value prop + social proof)
├── /how-it-works ............... Product deep-dive
├── /demo ....................... Interactive live demo
├── /pricing .................... Plans + ROI calculator
├── /case-studies ............... Brand success stories
│   └── /case-studies/:slug ..... Individual case study
├── /partners ................... Brand logos + integrations
├── /contact .................... Sales inquiry + calendar booking
├── /get-started ................ Self-serve onboarding form
│
├── /login ...................... Brand client login
├── /dashboard .................. Brand dashboard root
│   ├── /dashboard/overview ..... Key metrics
│   ├── /dashboard/analytics .... Deep analytics
│   ├── /dashboard/catalog ...... Wheel catalog management
│   ├── /dashboard/widget ....... Widget config + embed code
│   ├── /dashboard/settings ..... Account, billing, team
│   └── /dashboard/support ...... Help + tickets
│
├── /try/:brand-slug ............ Standalone consumer page
├── /blog ....................... Content marketing
│   └── /blog/:slug
│
└── /legal/ ..................... Privacy, Terms, Cookies
```

### Navigation

**Public:** `Logo` | How It Works | Demo | Pricing | Case Studies | `[Get Started]`
**Dashboard:** `Logo` | Overview | Analytics | Catalog | Widget | Settings | `[Avatar]`

---

## 15. Marketing Pages

### 15.1 Homepage (`/`)

**Purpose:** Convert brand decision-makers in under 60 seconds.

**Sections (top to bottom):**

1. **Hero (viewport height):**
   - Background: `#0A0A0A` with floating cyan and green glow orbs
   - Overline: `AI-POWERED WHEEL VISUALIZATION` (cyan)
   - Headline: `Your Wheels. Their Car. Instantly.`
   - Subheadline: "Give your customers the power to see your wheels on their actual vehicle."
   - CTAs: `[Try Live Demo]` (gradient) + `[See How It Works]` (outline)
   - Trust line: "Trusted by HRE Wheels, Brixton Forged, and more" with grayscale logos
   - Hero visual: Looping animation of car photo → wheel applied → finished render

2. **Problem / Solution (two columns):**
   - Left: "Your customers can't picture it" — generic wheel catalog, desaturated
   - Right: "Until now" — vibrant AVACAR render result

3. **How It Works — 3 steps:**
   - 01: Upload a Photo → 02: AI Renders the Wheels → 03: They Buy. You Win.
   - Three cards with number, icon, title, description, inline visual

4. **Widget in Context:**
   - Browser mockup showing widget embedded on a product page
   - Interactive: widget modal opens on scroll

5. **Results & Social Proof:**
   - Stat cards: `3.2×` time-on-page, `47%` higher add-to-cart, `< 8 sec` render time
   - Testimonial carousel

6. **Brand Logos Ticker:**
   - Infinite horizontal scroll, grayscale, color on hover

7. **Pricing Teaser:**
   - "Plans That Scale With Your Traffic"
   - Plan name pills: Boutique | Studio | Flagship
   - `[View Pricing →]`

8. **Final CTA Block:**
   - Gradient mesh background
   - "Ready to let your customers see the difference?"
   - `[Book a Demo]` + `[Try it yourself →]`

9. **Footer**

### 15.2 How It Works (`/how-it-works`)

Walk through the full experience from both perspectives:

**Customer journey (5 steps):** Product page → Upload → AI Processing → Result (finishes + more wheels) → Share & Convert

**Brand journey (4 steps):** Onboarding call → Catalog build (2-3 weeks) → Widget installation (single `<script>` tag) → Go live

**Timeline visual:** Week 1: Kickoff → Week 2-3: Render library → Week 3-4: Integration + testing → Week 4: Live

### 15.3 Pricing (`/pricing`)

**$5,000 One-Time Setup** card at top (covers catalog + integration)

**Three plan cards:**
| | Boutique | Studio | Flagship |
|---|---|---|---|
| Price | $499/mo | $999/mo | $1,999/mo |
| Annual | $4,990/yr | $9,990/yr | $19,990/yr |
| Renders/mo | 500 | 1,500 | 4,000 |
| Visitors est. | ~2,000 | ~6,000 | ~15,000 |
| Overage | $0.65/render | $0.55/render | $0.45/render |
| Analytics | Basic | Full | Full + export |
| Support | Email | Priority | Dedicated |
| White-label | +$299/mo | +$299/mo | Included |

**ROI Calculator:** Interactive. Inputs: monthly visitors, avg wheel price, current conversion rate. Outputs: recommended plan, projected lift, ROI multiple.

**FAQ accordion:** What counts as a render? Does the widget ever stop? Can I upgrade/downgrade? What about new wheel releases?

### 15.4 Other Pages

**Case Studies (`/case-studies`):** Grid of brand success stories. Template: Challenge → Solution → Results (3 stat cards) → Quote → Gallery → CTA.

**Demo (`/demo`):** Full immersive experience. Select a wheel → upload photo (or use demo car) → see render → conversion prompt. This IS the widget running standalone.

**Get Started (`/get-started`):** 3-step form (Your Brand → Your Catalog → Let's Go). Captures brand name, website, catalog size, platform, preferred plan.

**Contact (`/contact`):** Form + embedded calendar booking (Calendly/Cal.com).

**Blog (`/blog`):** Content marketing, SEO play. Categories: Product Updates, Industry Insights, Customer Stories, How-To.

---

## 16. Live Demo Experience

The `/demo` page is the single most important conversion page for brands.

**Flow:**
1. Choose a demo wheel (horizontal scroll of pre-loaded wheels) or "Use Demo Mode"
2. Upload your photo OR pick from 3 demo cars (BMW M4, Porsche 911, Tesla Model 3)
3. Processing animation (same as widget)
4. Result with finish selector
5. Conversion prompt: "Want this on your website? [Talk to Sales] | [Start Setup]"

---

## 17. Brand Dashboard

### 17.1 Overview (`/dashboard/overview`)

- **Greeting:** "Welcome back, [Brand Name]"
- **4 metric cards:** Renders (X / cap, with progress bar) | Conversion rate (% + trend) | Avg time on widget (sec + trend) | Top wheel (name + thumb)
- **Line chart:** Daily renders over 30 days (toggle: Renders | Visitors | Conversions)
- **Recent activity feed:** "BMW M4 owner viewed HX104 in 3 finishes — 2 min ago"
- **Quick actions:** Update Widget | Add New Wheels | View Full Analytics

### 17.2 Analytics (`/dashboard/analytics`)

- Date range picker (Today, 7D, 30D, 90D, Custom)
- Tabs: Overview | Renders | Wheels | Visitors | Conversions
- Conversion funnel visualization: Widget Opened → Photo Uploaded → Render Viewed → Finish Changed → CTA Clicked → Purchase
- Charts for render volume, wheel popularity, finish popularity, device breakdown, source pages

### 17.3 Catalog (`/dashboard/catalog`)

- Searchable grid of wheel model cards
- Each card: thumbnail, model name, series, finish count badge, active/inactive toggle
- Expand: all renders, all finishes as swatch grid, fitment data
- `[Request New Wheel]` form for new additions

### 17.4 Widget Settings (`/dashboard/widget`)

- **Live preview panel (left 60%):** Real-time preview of widget as it would appear. Toggle between button / upload / processing / results. Toggle desktop / mobile.
- **Settings panel (right 40%):**
  - Appearance: CTA text, button color, style (solid/outline/gradient), theme (auto/dark/light), corner radius, "Powered by" visibility
  - Behavior: default wheel, show finishes, show share, CTA text + link behavior
  - Embed code: `<script>` tag in JetBrains Mono with copy button + platform-specific instructions

### 17.5 Settings (`/dashboard/settings`)

- Profile (brand name, logo, website, contact, notification prefs)
- Billing (current plan + usage meter, upgrade/downgrade, payment methods, invoice history)
- Team (members table, invite, roles: Admin / Viewer)
- Integrations (Shopify, Google Analytics, webhooks)

### 17.6 Support (`/dashboard/support`)

- Search bar, FAQ articles, ticket form, ticket history, live chat widget

---

## 18. The Embeddable Widget

### Widget Delivery

Single `<script>` tag on CDN. Shadow DOM for CSS isolation. Preact or vanilla JS. < 200kb.

```html
<script
  src="https://cdn.avacar.com/widget.js"
  data-brand="hre-wheels"
  data-theme="auto"
  data-position="product-page"
  async
></script>
```

### Widget States

**State 0 — CTA Button:** "See It On Your Car" button on brand's product page. Styled per dashboard config. Hover: glow + scale(1.02).

**State 1 — Upload Modal:** Backdrop blur overlay. Glassmorphic container. Brand logo + wheel name. Upload zone (drag-drop, camera on mobile). Helper tip. "Powered by AVACAR" footer.

**State 2 — Processing:** Uploaded photo with frosted overlay + rotating border. Custom wheel spinner. Status text cycling: "Analyzing vehicle..." → "Detecting wheels..." → "Rendering [Wheel Name]..." → "Applying [Finish Name]..." Progress steps.

**State 3 — Results:** Main render (landscape/portrait adaptive). Wheel info bar. Finish selector (horizontal swatches, cyan ring on active). 3-4 more wheels from catalog. Action buttons: Buy Now | Share | Try Another Photo. Optional: Request a Quote.

**State 4 — Finish Gallery (optional):** Grid overlay of all finishes. Tap to select → returns to results.

### Widget Error States

- Upload failed: red alert, retry button
- Render failed: red alert, retry + "upload different photo"
- No wheels detected: amber alert with tips
- Consumer experience is NEVER interrupted by brand-side cap limits

### Standalone Consumer Page (`/try/:brand-slug`)

Full-screen, immersive. AVACAR logo (left) + Brand logo (right). Widget experience directly on page (not in modal). Bottom: "Want this for your brand? [Learn More]"

---

# PART IV — TECHNICAL & IMPLEMENTATION

---

## 19. Responsive & Mobile Strategy

### Breakpoints

```
Mobile:  320px → 767px
Tablet:  768px → 1023px
Desktop: 1024px → 1439px
Wide:    1440px+
```

### Mobile-Specific

- Consumer app: mobile-first (this IS a mobile app experience)
- B2B site: responsive (decision-makers browse on desktop and mobile)
- Dashboard: bottom tab bar on mobile, sidebar on desktop
- Touch targets: minimum 44x44px
- Increased input height on mobile: 56px

### Performance Targets

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Widget script: < 200kb
- Render delivery: < 10 seconds

---

## 20. Micro-Interactions & Animation Guide

### Scroll Reveals (B2B marketing pages)

- Elements: fade in + translateY(20px → 0)
- Stagger: 100ms between grouped items
- Trigger: IntersectionObserver at 15% visibility
- Duration: 500ms, easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Component Animations

- **Buttons:** Hover: opacity 0.88. Active: scale(0.97). Transition: 150ms.
- **Cards:** Hover: `border-color: #44CCFF`, `box-shadow: 0 2px 12px rgba(68,204,255,0.06)`. Transition: 150ms.
- **Product tile selection:** Bounce animation (scale 1 → 0.92 → 1, 200ms). Checkmark badge appears.
- **Inputs:** Focus: `border-color: #44CCFF`. Error: shake (3x, 300ms).
- **Modals:** Backdrop fade (200ms) + container scale(0.95→1) + opacity(0→1) (300ms spring).
- **Toast:** Slide up from bottom (300ms), auto-dismiss fade-out after 1.5s.
- **Feed post like:** Heart icon scale bounce (1→1.2→1, 200ms) + color fill (#EF4444).
- **Feed scroll:** Standard native scroll momentum. Skeleton loading for initial load (shimmer animation on gray blocks).
- **Processing spinner:** Wheel-shaped SVG rotating (2s per rotation). Glow pulse (0→40px box-shadow, 2s cycle).

### Background Ambient (B2B site only)

- Glow orbs: two radial gradients (cyan, green), floating on 15-20s CSS keyframe paths, subtle scale pulse
- Dot grid: static at 5% opacity
- Gradient mesh on CTA sections: multi-color, slow hue shift (30s cycle)

### Consumer App — Keep It Fast

The consumer app should feel native, not animated. Animations should be:
- Transitions between screens: 200ms fade
- Loading states: skeleton shimmer
- Selection feedback: instant (bounce + color change)
- NO ambient background animations — save those for the B2B marketing site

---

## 21. Technical Implementation Notes

### Consumer App Stack

- **Framework:** Next.js 14+ (App Router) or React Native (if pursuing native mobile)
- **For web-first PWA approach:** Next.js + Tailwind CSS + Framer Motion
- **Auth:** NextAuth.js or Clerk (Google, Apple, Email)
- **State:** Zustand (client) + React Query (server)
- **Database:** PostgreSQL (Supabase or PlanetScale)
- **File storage:** Cloudflare R2 or S3 (user photos, renders)
- **AI Detection:** Anthropic Claude API (vehicle identification from photos)
- **AI Rendering:** Nano Banana Pro API (wheel/wrap visualization)
- **Real-time:** WebSockets or Supabase Realtime (for comments, notifications)

### B2B Website Stack

- **Framework:** Next.js 14+ (App Router) — SSR for marketing, SPA for dashboard
- **Styling:** Tailwind CSS + CSS custom properties
- **Charts:** Recharts for dashboard analytics
- **CMS (blog):** Contentful, Sanity, or MDX
- **Deployment:** Vercel

### Widget Architecture

- Single JS file on CDN: `cdn.avacar.com/widget.js`
- Shadow DOM for CSS isolation
- Framework: Preact (~3kb) or vanilla JS
- Communication: PostMessage API
- Configuration: inline `<script>` attributes or global config object

### API Endpoints

```
# Consumer App
POST /api/v1/auth/signup
POST /api/v1/auth/login
GET  /api/v1/feed                    — Social feed (paginated)
POST /api/v1/posts                   — Create post
POST /api/v1/posts/:id/like          — Like/unlike
POST /api/v1/posts/:id/comments      — Add comment
GET  /api/v1/users/:id               — Public profile
POST /api/v1/users/:id/follow        — Follow/unfollow
POST /api/v1/upload                  — Upload car photo
POST /api/v1/detect                  — AI vehicle detection
POST /api/v1/render                  — AI build render
GET  /api/v1/products/:category      — Product catalog
GET  /api/v1/shops                   — Shop search/list
GET  /api/v1/shops/:id               — Shop profile
POST /api/v1/bookings                — Create booking
GET  /api/v1/garage                  — User's garage
POST /api/v1/marketplace/listings    — Create listing
GET  /api/v1/marketplace             — Browse listings
GET  /api/v1/designs                 — Browse design templates
POST /api/v1/designs                 — Publish design

# Widget
POST /api/v1/widget/render           — Render request
GET  /api/v1/widget/render/:id       — Poll status / get result
GET  /api/v1/widget/catalog/:brand   — Brand's wheel catalog
POST /api/v1/widget/analytics        — Log widget events
POST /api/v1/widget/share            — Generate sharable link

# Dashboard
GET  /api/v1/dashboard/overview      — Key metrics
GET  /api/v1/dashboard/analytics     — Detailed analytics
GET  /api/v1/dashboard/catalog       — Manage wheels
PUT  /api/v1/dashboard/widget        — Update widget config
GET  /api/v1/dashboard/billing       — Billing info
```

---

## 22. Analytics Events

### Consumer App

| Event | Properties |
|-------|-----------|
| `app_open` | source, device |
| `feed_scroll` | posts_viewed_count |
| `post_view` | post_id, post_type (real/render) |
| `post_like` | post_id |
| `post_comment` | post_id |
| `post_create` | type, has_shop_tag, shared_price |
| `profile_view` | user_id, is_own |
| `follow` | user_id |
| `upload_photo` | device, method (camera/gallery) |
| `vehicle_detected` | make, model, year, success |
| `product_selected` | category, product_name, brand |
| `build_complete` | categories_used, total_estimate |
| `quote_generated` | item_count, total_range |
| `quote_pdf_downloaded` | vehicle, total |
| `shop_viewed` | shop_id, distance |
| `booking_created` | shop_id, build_value |
| `share_action` | method (instagram/imessage/whatsapp/link/image) |
| `garage_viewed` | vehicle_count |
| `explore_search` | query, category_filter |
| `budget_build_used` | budget_range, build_applied |
| `marketplace_listing_created` | category, price |
| `design_purchased` | design_id, price |

### Widget

| Event | Properties |
|-------|-----------|
| `widget_button_impression` | brand, page_url |
| `widget_opened` | brand, wheel_id |
| `photo_uploaded` | brand, device_type |
| `render_requested` | brand, wheel_id, finish_id |
| `render_completed` | brand, duration_ms |
| `finish_changed` | brand, from_finish, to_finish |
| `more_wheels_tapped` | brand, new_wheel_id |
| `share_clicked` | brand, method |
| `cta_clicked` | brand, cta_type (buy/cart/quote) |
| `widget_closed` | brand, at_state (upload/processing/results) |

### Dashboard

| Event | Properties |
|-------|-----------|
| `dashboard_login` | brand |
| `dashboard_page_view` | page |
| `widget_settings_changed` | setting_name, new_value |
| `catalog_action` | action (add/remove/toggle), wheel_id |
| `support_ticket_created` | category |

---

## Appendix A: Key Principles (Repeat for Emphasis)

1. **Social first, shop second.** The feed IS the product. Commerce activates when users are ready.
2. **Ad-free.** Revenue from transactions, not attention. No sponsored content, ever.
3. **Instagram feel + Shopify checkout.** Browse → get inspired → "try it on" → buy.
4. **Every build is content.** Completed customizations auto-generate feed posts.
5. **Community drives conversion.** Users sharing where, how much, and tagging shops > any ad.
6. **Speed is everything.** Pre-cache, progressive loading, instant feedback. Match native app feel.
7. **One-tap magic.** Every interaction should feel effortless. "Try This Build" = one tap.
8. **Mobile native.** 80%+ usage will be mobile. Design for thumb. Vertical-first.
9. **Premium but approachable.** Dark, clean, no clutter. But not intimidating.
10. **Ship v1 commerce first, THEN social.** Don't skip ahead. The social layer wraps around a working commerce engine.

## Appendix B: Naming & Conventions

```
Pages/Routes:  kebab-case (how-it-works, case-studies)
Components:    PascalCase (FeedPostCard, ProductTile, ShopProfile)
CSS classes:   lowercase-hyphen or abbreviated (btn-primary, ptile, chip)
API endpoints: /api/v1/resource-name (REST, lowercase-hyphen)
Images:        kebab-case (hero-render-bmw-m4.webp)
CSS vars:      --category-name (--bg-primary, --accent-cyan)
```

## Appendix C: Accessibility

- WCAG 2.1 AA minimum
- Color contrast: 4.5:1 body text, 3:1 large text
- All images: descriptive alt text
- All interactive elements: keyboard accessible
- Focus indicators: cyan outline
- Screen reader: ARIA labels on modals, live regions for processing
- `prefers-reduced-motion`: disable ambient animations, instant transitions
- Widget: keyboard-navigable (Tab through all elements, Escape closes modal)

---

*End of AVACAR Unified Platform UX Specification v2.0*
*Single source of truth for Mirmi — xix3D Inc.*
*Consolidates: Original UX spec (March 9) + Social Expansion Plan + Team Notes (March 7) + Prototype v11 audit*
