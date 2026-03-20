# AVACAR — Mirmi Execution Brief

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 9, 2026
**Priority:** Start building immediately

---

## What You Have

You've been given two specification documents:

1. **AVACAR_Unified_UX_Spec_v2.md** — The master product spec covering the full platform: consumer app (social feed + commerce engine), B2B marketing website, brand dashboard, embeddable widget, design system, component library, all user flows, and phasing.

2. **AVACAR_Spec_Addendum_v2.1.md** — Additions covering the Design Studio (canvas mode), Design Marketplace (full storefront + creator economy), AI design generation, Shop Portal, installation tracking, material e-commerce, AR preview, referral program, and community events.

**Treat these two documents as ONE combined spec.** The addendum extends the base spec — it doesn't replace anything, it fills gaps.

---

## What We're Building

AVACAR is two products:

**Product 1 — Consumer App:** A social-first car culture platform. Instagram for car builds with a Shopify checkout underneath. Users see a feed, get inspired, upload their car, customize it (wraps, wheels, tint, PPF, body kits, accessories), get a quote, find a shop, book installation. Eventually: design studio, design marketplace, P2P marketplace, virtual garage.

**Product 2 — B2B Website (avacar.com):** A marketing site + dashboard for wheel manufacturers who buy our embeddable "See It On Your Car" widget. Separate product, separate audience, lower priority for now.

**We are building Product 1 first. The consumer app.**

---

## Existing Reference

There is an existing prototype (HTML, single-file, ~570 lines) that demonstrates the v1 commerce flow. It is NOT production code — it's a clickable prototype built for stakeholder demos. But it establishes:

- The exact design language (colors, typography, component styles, spacing)
- The commerce flow: Splash → Onboarding → Home → Upload → Detect (AI) → Confirm → Customize → Render → Quote → Find Shop → Book → Confirm
- The dark theme with `#0C0C10` bg, `#44CCFF` cyan accent, Inter font
- Component patterns: `.btn-primary`, `.btn-secondary`, `.chip`, `.ptile`, `.shop-card`, etc.

**Use the prototype as your visual reference.** The design system section in the spec documents the exact values. Match them precisely.

---

## Tech Stack

Build with:

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS + CSS custom properties for the design system tokens
- **Animation:** Framer Motion
- **Auth:** Clerk (Google, Apple, Email sign-in)
- **State:** Zustand (client) + React Query / TanStack Query (server)
- **Database:** Supabase (PostgreSQL + Auth + Realtime + Storage)
- **File Storage:** Supabase Storage (user photos, renders, design files)
- **Charts (dashboard):** Recharts
- **Deployment:** Vercel
- **Font Stack:** Manrope (display/headings via Google Fonts), Inter (body via Google Fonts), JetBrains Mono (monospace/data via Google Fonts)

---

## Build Order — What To Build and When

### Sprint 1: Foundation + Core Commerce Flow

**Goal:** Rebuild the prototype as a real Next.js app with proper routing, components, and data layer.

**Build these screens in this order:**

1. **Layout shell** — App wrapper with bottom tab navigation (`Feed | Explore | [+] | Garage | Profile`), top bar component, page transitions (200ms fade)
2. **Splash screen** — AVACAR branding, "Get Started" + "I have an account" CTAs
3. **Onboarding flow** — 3 screens with dot pagination (reuse prototype content)
4. **Auth screens** — Signup (Google/Apple/Email), Login, Forgot Password — wire up Clerk
5. **Home screen (pre-social)** — Use the current prototype home layout (Upload hero + Trending Builds + Categories) as a placeholder until the social feed is built. This gets the app functional immediately.
6. **Upload flow** — Camera/gallery upload, file handling, image preview
7. **Vehicle detection** — AI detection screen with loading animation. Wire up Claude API for vehicle identification (make/model/year/color/body). Fallback to manual entry.
8. **Confirm vehicle** — Display detected info, allow editing
9. **Customize screen** — **6 tabs** (Wraps, Wheels, Tint, PPF, Body Kits, Accessories). Product tile grid, brand filter row, coverage selector (wraps), build tags, running total. This is the most complex screen — reference the spec carefully for each tab's products and structure.
10. **Rendering screen** — Processing animation (spinner, progress bar, status text cycling)
11. **Quote screen** — Itemized pricing for all 6 categories, before/after slider, Download PDF button, Edit Build button
12. **Find a Shop** — Map placeholder + shop list with cards (name, distance, rating, price tier)
13. **Shop Profile** — Reviews, services, available time slots, Book button
14. **Booking flow** — Review → Processing → Confirmed + email preview

**Data layer for Sprint 1:**
- Product catalog (wraps, wheels, tint, PPF, body kits, accessories) stored in Supabase
- Price ranges per product
- Vehicle detection via Claude API
- Booking records in Supabase
- User accounts via Clerk → synced to Supabase

### Sprint 2: Social Feed Layer

**Goal:** Invert the app. Home screen becomes a social feed. The commerce flow stays intact underneath.

1. **Feed screen** — Scrollable vertical feed of build posts. Post card component (avatar, username, image, build tags, likes, comments, "Try This Build" CTA). Skeleton loading. Paginated fetch from Supabase.
2. **Post detail screen** — Expanded view with full build breakdown, shop tag, cost (if shared), comments list, "Try This Build on My Car" button
3. **Post creation flow** — Choose image (upload real photo or select saved render), add caption, tag shop, tag products, share price toggle, publish
4. **User profiles** — Public profile page (avatar, username, bio, stats, build grid). Follow/unfollow.
5. **Likes** — Heart toggle on posts with optimistic UI update
6. **Comments** — Flat comment list on post detail, comment input at bottom
7. **Explore enhancements** — Search, category filters, trending builds (feed-style cards)
8. **Update Home tab** — Replace placeholder home with the social feed. Move "Upload Your Car" to the center `[+]` CTA in the tab bar.

### Sprint 3: Garage + Shop Portal + Tracking

1. **Garage screen** — Vehicle list (current builds), add vehicle button, build history per vehicle, before/after per modification
2. **Shop Portal** — Separate authenticated area for certified shops: overview dashboard, bookings management, quote builder, portfolio management, profile editor, reviews, analytics
3. **Installation tracking** — Status timeline with steps, progress photo display, push notifications on status change
4. **Post-install prompt** — After pickup: leave review, post to feed, add to garage

### Sprint 4: Design Studio

1. **Design Studio (canvas mode)** — Fullscreen experience within Customize. Tool bar, vehicle canvas, layer panel.
2. **Base color + finish tool** — Color picker, finish selector, manufacturer-matched colors, coverage options
3. **Decal library** — Browsable grid with categories, search, filter. Tap to place on canvas. Drag/resize/rotate.
4. **Text tool** — Text input on canvas, font selector, convert to vector decal
5. **Layer management** — Layer list, reorder, group, ungroup, lock, hide, mirror, rename
6. **Shape tool** — Basic vector shapes
7. **Export** — Save to garage, share to feed, download image, download video (360° spin), export production files

### Sprint 5: Design Marketplace + AI

1. **Design Marketplace (browse)** — Category navigation, design cards, filters, search
2. **Design detail page** — Gallery, creator info, pricing, "Buy", "Try on My Car", "Request Changes"
3. **Design upload/publish flow** — For creators: upload files, configure layers, set details/pricing, preview, submit
4. **Creator dashboard** — Sales analytics, earnings, orders, reviews
5. **Request Changes flow** — Custom commission: request form → creator responds → escrow → delivery → approval
6. **AI Design Generator** — `✨` tool in studio: prompt input → generate variations → apply to vehicle
7. **Explore AI** — "Describe your dream build" prompt field → AI generates preview

### Future Sprints (Spec'd But Not Yet)

- Budget Builds (budget slider → suggested complete builds)
- P2P Marketplace (sell parts/accessories)
- Material & Film E-Commerce
- B2B/B2C Consignment Marketplace
- AR Camera Preview
- Referral & Rewards Program
- Community Events & Challenges
- B2B Marketing Website + Brand Dashboard + Embeddable Widget

---

## Design System — Quick Reference

**Use these exact values. They are non-negotiable.**

```css
/* Backgrounds */
--bg-primary: #0C0C10;
--bg-elevated: #111116;
--bg-surface: #141418;
--bg-hover: #1A1A22;

/* Borders */
--border-subtle: #1A1A22;
--border-default: #2A2A34;

/* Text */
--text-primary: #FFFFFF;
--text-heading: #E4E4E7;
--text-secondary: #C4C4CC;
--text-muted: #A1A1AA;
--text-tertiary: #8B8B98;
--text-faint: #52525B;
--text-ghost: #3F3F46;

/* Accents */
--accent-cyan: #44CCFF;
--accent-green: #22C55E;
--accent-amber: #F59E0B;
--accent-red: #EF4444;
--accent-purple: #7C3AED;

/* Component Standards */
Buttons: 12px radius, 14px vertical padding, 15px font, 600 weight
Cards: #111116 bg, 1px solid #1A1A22, 12px radius
Chips: 30px height, 15px radius, 14px horizontal padding
Product tiles: 80px height, #141418 bg, 10px radius, 1.5px border
Inputs: 44px height, #141418 bg, 1px solid #2A2A34, 10px radius
Page padding: 20px
Transitions: 150ms ease
```

**Typography:**
```
Manrope 700-800 → Hero, H1, H2 (display)
Manrope 500-600 → H3, H4, card titles
Inter 400-500   → Body, labels, descriptions
JetBrains Mono 400 → Prices, data, code, embed snippets
```

---

## Quality Bar

This needs to be **Behance / Awwwards level.** Not "good for a startup." Not "functional MVP." This should look and feel like a premium product from day one. Reference the UI Polish / Micro-Interaction QC Guide from the Zeno CRM project — same standard applies here.

Specifically:
- Every transition should be smooth (no janky page jumps)
- Loading states must use skeleton shimmer (never blank screens)
- Selection feedback must be instant (bounce animation + color change)
- Dark theme must have proper depth (backgrounds layer correctly: #0C0C10 → #111116 → #141418)
- Typography hierarchy must be visually clear at every level
- Touch targets must be 44px minimum on mobile
- The app should feel native, not like a web wrapper

---

## Questions You Don't Need To Ask Me

- **"Should I use the exact hex values?"** — Yes. Exactly. No approximations.
- **"Can I change the component patterns?"** — No. Match the spec. If something doesn't work, flag it and I'll decide.
- **"Should the commerce flow match the prototype?"** — Yes, screen for screen, but in proper React/Next.js components with real data.
- **"What about the B2B website?"** — Not now. Consumer app first. The B2B spec is in the docs for later.
- **"Which product data should I seed?"** — Use realistic placeholder data. Real brand names (3M, Avery, XPEL, Vossen, HRE, etc.), real product names, realistic price ranges from the spec.

---

## How To Use These Docs

1. **Start with this brief** — it tells you what to build and in what order
2. **Reference AVACAR_Unified_UX_Spec_v2.md** for detailed screen-by-screen specs, user flows, navigation structure, and component details
3. **Reference AVACAR_Spec_Addendum_v2.1.md** for Design Studio, Marketplace, Shop Portal, and advanced features (Sprints 3-5)
4. **Reference the prototype HTML** for visual fidelity — match its look and feel exactly

Start Sprint 1 immediately. Build screen by screen in the order listed. Ship each screen as it's done — don't wait for the full sprint to be complete.

Let's go.

— Hammad
