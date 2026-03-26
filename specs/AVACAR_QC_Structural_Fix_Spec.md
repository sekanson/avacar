# AVACAR — Comprehensive QC & Structural Fix Spec

**Dispatch to: Claude Code (CC) via cc-dispatch.sh**
**Target: avacar.vercel.app**
**Stack: Next.js 15 (App Router) / TypeScript / Tailwind / Lucide React / Clerk (bypassed) / Vercel**
**Priority: CRITICAL — ship-blocking issues**

---

## Context

The full site has been built from the master spec. After visual QC review, there are critical issues across broken images, layout problems, redundant navigation, missing features, and visual inconsistency. This is one unified dispatch covering everything — visual fixes, structural changes, and missing features.

**The user we're designing for:** A car enthusiast in their 20s-30s who owns a Honda Civic and wants to see what other people did to THEIR car, get inspired, try looks on their own car, and talk to the community. They are NOT tech-savvy. Every extra click, every confusing nav element, every broken image is a reason to leave and never come back.

**The north star test:** Can someone go from "I just opened this app" to "I'm looking at sick Honda Civic builds and trying a look on MY Civic" in under 60 seconds?

---

## PART 1: CRITICAL — Broken Images

This is the #1 ship-blocking issue. Broken images make the entire platform look abandoned.

### Fix List

- [ ] **Homepage "Murdered Out" card** — broken image icon visible in top-left of the card. Fix the image source/path.
- [ ] **Studio > Scenes > "Tokyo Night" card** — shows alt text "Tokyo Night" instead of image. Fix image source.
- [ ] **Studio > Styles > "Murdered Out" card** — broken image, same issue as homepage.
- [ ] **Shop Finder > CarbonWerks GTA card** — shows alt text "CarbonWerks GTA" where the hero image should be. Fix or provide a fallback placeholder image.
- [ ] **Explore Feed > @wrapsbyalex post** — shows alt text instead of the build image. The feed post has the text "Finally did the Murdered Out look on my G-Wagon" but the image is broken.
- [ ] **Product Catalog — wrap color swatches showing as flat rectangles.** The following products show as solid color blocks instead of on-car renders: 3M 2080 Matte Black, 3M 1080 Satin Black, Avery SW900 Gloss Nardo Gray, Avery SW900 Color Shift Cosmic Blue, Avery SW900 Satin Miami Blue, Inozetek Super Gloss Deep Black, Inozetek Super Matte Army Green, Inozetek Super Matte Rose Gold, HEXIS Bodyfence Gloss White, HEXIS Carbon Fiber 3D, HEXIS Skintac Chrome Silver, SunTek Color PPF Satin Black, 3M 1080 Satin Gold, Hexis (white/cream swatch).

**For wrap products:** Every wrap product card MUST show the color/finish applied to a reference car — not a flat color swatch. Use the same BMW M4 or Porsche renders that already exist for the wheel products, but with the wrap color applied. If real on-car renders aren't available, at minimum show the color swatch as a gradient/textured card with a small car silhouette overlay — never a flat solid rectangle.

**Global fallback rule:** If any image fails to load, show a dark placeholder card with a subtle car silhouette icon and the product/preset name — never show the browser's broken image icon or raw alt text.

---

## PART 2: CRITICAL — Content Width & Layout

The site stretches too wide on desktop monitors. Content feels sparse and hard to scan.

### Fix

- [ ] **Add a max-width container of `max-w-7xl` (1280px) to the main content area on ALL pages.** Center it with `mx-auto`. The left sidebar stays fixed. The main content area is constrained.
- [ ] **Specifically fix these pages** that currently stretch edge-to-edge:
  - Explore/Feed page — the feed column should be ~650px max, with the trending sidebar at ~300px, matching Twitter/Instagram's proportions
  - Settings page — settings rows should not stretch to full viewport width
  - Notifications page — same, constrain to center column
  - Shop Finder — shop cards should be in a constrained grid, not full-bleed
  - Build History page — constrain content area
  - My Workshop / Templates pages — constrain content area
- [ ] **The homepage can remain wider** since it has a visual grid layout that benefits from more horizontal space, but still cap at `max-w-[1440px]`.

---

## PART 3: CRITICAL — Navigation Simplification

The current nav has three problems: redundant paths (sidebar + page tabs go to same place), dropdowns that add clicks, and icon-only sidebar that's unreadable.

### A. Simplify the Left Sidebar

**Current sidebar (too complex):**
```
Home
Explore
Create ▾
  Quick Build
  Swap Wheels
  Change Wrap
  Scene My Car
  Style Explorer
  Touch Up
  Car in Motion
Catalog ▾
  Wheels
  Wraps
  Body Kits
  Tints & PPF
  Collections
  Designs
My Stuff ▾
  My Garage
  My Workshop
  Templates
  History
Shop
Profile
```

**New sidebar (flat, no dropdowns, 7 items max):**
```
Home
Explore
+ Create          ← accent colored, this is the primary CTA
Catalog
My Garage
Shop
Profile
```

- [ ] **Remove ALL dropdown sub-menus from the sidebar.** No expand/collapse. Every sidebar item is a single tap that takes you to a page.
- [ ] **"Create" takes you to the Studio page** which has its own internal tabs (Modify | Scenes | Styles | Content). The tool selection (Quick Build, Swap Wheels, Change Wrap, etc.) lives inside the Studio page as tool launcher cards — not in the sidebar.
- [ ] **"Catalog" takes you to the Catalog page** which has its own internal tabs (Products | Designs | Collections). Sub-categories (Wheels, Wraps, Body Kits, etc.) are filter pills on that page — not sidebar sub-items.
- [ ] **"My Garage" replaces "My Stuff"** as a single flat item. Workshop and Templates are tabs INSIDE My Garage — not separate sidebar items.
- [ ] **Style the "Create" button differently** — accent color background (#44CCFF), slightly larger, or a `+` icon prefix. It's the main action and should be visually louder than the other nav items.

### B. Always Show Labels

- [ ] **On desktop:** The sidebar should ALWAYS show icon + text label. Never collapse to icon-only as default. If screen width is < 1024px, collapse to icons but show labels on hover with a tooltip.
- [ ] **On mobile:** Bottom nav with 5 items, each with icon + small label underneath:
  ```
  [🏠 Home]  [🔍 Explore]  [✨ Create]  [📦 Catalog]  [🚗 Garage]
  ```
  Shop and Profile move to a hamburger or top-right icons on mobile.

### C. Remove Redundant Top Tabs

- [ ] **Catalog page:** Remove the "Products | Shops | Training" top tab bar. "Shops" is already accessible from the sidebar (Shop). "Training" can live inside Shop or Settings. Products IS the catalog — no tab needed.
- [ ] **Marketplace page:** Remove the "Designs | Products | Shops | Training" top tab bar. Designs and Products should be filter tabs within the catalog content area, not a separate top-level navigation layer.
- [ ] **Rule: Only ONE navigation layer should be visible at a time.** Sidebar handles global navigation (which section am I in?). Page-level tabs handle local navigation within that section (which sub-view am I looking at?). Never both doing the same job.

---

## PART 4: HIGH — Vehicle-Centric Social

This is the missing soul of the community. Users should discover and follow VEHICLES, not just product categories.

### A. Vehicle Tags on Every Build

- [ ] **Every build post in the feed should display a vehicle tag** — e.g., `🚗 2024 BMW M4`, `🚗 Honda Civic`, `🚗 G-Wagon`. This tag is tappable and leads to a vehicle page showing all builds for that vehicle.
- [ ] **The build creation flow should require tagging your vehicle** (Year, Make, Model) when you save/post a build. This data already exists in My Garage — auto-populate from there.

### B. Vehicle Pages

- [ ] **Create a vehicle page** (e.g., `/vehicle/honda-civic` or `/vehicle/bmw-m4`) that shows:
  - Vehicle name + hero image at top
  - "Follow this vehicle" button
  - Stats: "342 builds · 1.2K followers"
  - Masonry grid of all community builds tagged with this vehicle
  - Popular mods for this vehicle (most common wheels, wraps, styles used)
  - "Try a look on YOUR [Vehicle Name]" CTA

### C. Explore Page Filter Update

- [ ] **Add vehicle filters to the Explore page.** Current filter pills are product-type only (Wraps, Wheels, Tint, PPF, Suspension, Performance). Add a second row or a "Vehicles" filter section:
  ```
  Row 1 (Categories): [All] [Wraps] [Wheels] [Styles] [Scenes]
  Row 2 (Vehicles):    [All Cars] [Honda Civic] [BMW M4] [G-Wagon] [Supra] [More ▾]
  ```
  The vehicle filters should be the most popular vehicles on the platform, dynamically ordered by build count.

### D. Follow System Expansion

- [ ] **Users should be able to follow four things:**
  1. **Creators** (@wrapsbyalex) — already works
  2. **Vehicles** (Honda Civic, BMW M4) — NEW
  3. **Styles/Tags** (#murderedout, #jdm) — the hashtags in the trending sidebar should be followable
  4. **Brands** (HRE, Inozetek) — NEW
- [ ] **The "Following" tab on the Explore page** should aggregate content from all four follow types into one personalized feed.

---

## PART 5: HIGH — Messaging / DMs

The platform has social features (follow, like, comment) but no way to actually have a conversation. This breaks the community loop and the commerce flow.

### A. User-to-User DMs

- [ ] **Add a Messages icon to the top-right nav bar** (next to the cart and notification bell). Tapping opens a messages panel/page.
- [ ] **Messages page** (`/messages`): Left column = conversation list. Right column = active conversation. Standard messaging UI (like Instagram DMs).
- [ ] **On any user's profile, add a "Message" button** next to the "Follow" button.
- [ ] **On any feed post, add a "Send to" / share-via-DM option** so users can share builds with each other.

### B. User-to-Shop Messaging

- [ ] **On every shop card (Shop Finder page), add a "Message Shop" button** alongside "Book Now". Users need to be able to ask questions before committing to a booking.
- [ ] **Inside the booking flow, add a "Questions? Message this shop" link** below the price breakdown.
- [ ] **Shop messages appear in the same Messages inbox** but in a separate "Shops" tab so they don't get mixed with personal DMs.

### C. Build Commenting Enhancement

- [ ] **The feed posts already show comment counts** (💬 12) but verify that tapping opens an actual comment thread — not just a count. Comments should be threaded (reply to a specific comment) and show inline under the post.

---

## PART 6: HIGH — My Garage Visual Upgrade

My Garage currently looks like a text list. It should look like a visual gallery.

### Fix

- [ ] **Vehicles section:** Show each vehicle as a card with a large thumbnail (the car photo), vehicle name, color, build count, and last modified date. Use the same card style as the Profile page's "Builds" grid. NOT a text row with a tiny thumbnail.
- [ ] **Saved Builds section:** Same — large visual cards showing the build render as a thumbnail, with the build name, modification type, price estimate, and status badge (Draft, Quoted, Booked, Installed) overlaid.
- [ ] **The overall layout should be a 2-3 column grid of cards**, not a single-column list of rows.
- [ ] **The "Design a new build" CTA at the bottom** is good — keep it, but also add a floating `+ New Build` FAB (floating action button) in the bottom-right corner so the CTA is always accessible without scrolling.

---

## PART 7: MEDIUM — Explore Feed Population

An empty feed kills the platform on sight. Seed it with real-looking content.

### Fix

- [ ] **Create 15-20 seed posts for the Explore feed.** Use the car images that already exist across the site (homepage preset thumbnails, catalog product renders, profile build images, shop hero images). Each seed post should have:
  - A username (use the existing fake usernames: @wrapsbyalex, @gta.wraps, @chromedelet, @ppf.obsessed, @driftking, @euroboy, @jdmfan, plus 8-10 more)
  - A vehicle tag (2024 BMW M4, 2023 Toyota Supra, 2022 Porsche 911, etc.)
  - A caption (1-2 sentences, car enthusiast tone)
  - Product badges (real product names from the catalog)
  - Engagement numbers (hearts: 50-500 range, comments: 5-50 range, views: 1K-25K range)
  - "Try On My Car" and "Shop This Build" buttons
- [ ] **Ensure the "Following" and "Trending" tabs also show content** — not empty states. "Trending" should show the top 10 posts by engagement. "Following" can show a friendly empty state: "Follow creators, vehicles, or styles to fill your feed" with quick-follow suggestions.

---

## PART 8: MEDIUM — Product Catalog Polish

### Fix

- [ ] **Wrap products MUST show on-car renders**, not flat color rectangles. For every wrap product that currently shows a solid color swatch, either:
  - (Preferred) Show the wrap color applied to a reference car render
  - (Acceptable) Show a textured/gradient card that hints at the material finish (matte texture, satin sheen, chrome reflection, color-shift gradient) with the color name prominently displayed
  - (Not acceptable) Flat solid-color rectangle
- [ ] **Color variant dots** (visible under some products) are good — keep them, but make sure they're tappable to switch the product card's hero image to show that color.
- [ ] **Add "Curated Collections" row** to the top of the catalog page before the product grid: "Murdered Out Essentials", "Show Car Starter", "Euro Clean", "Off-Road Ready". Each collection is a horizontal card with a preview collage + name + item count.
- [ ] **The "Designs" tab** (community marketplace with rated designs) should be accessible from within the Catalog page as a tab, not as a completely separate page with different navigation.

---

## PART 9: MEDIUM — Visual Polish

### Fix

- [ ] **Workflow Templates page (My Workshop > Templates):** Each template card (Client Wrap Proposal, Social Media Content Pack, etc.) should have a preview thumbnail showing example output — not just an emoji icon + text. Show a small mockup of what the template produces.
- [ ] **Cart overlay:** Remove the duplicate "Enter promo code / Apply" row. There should be ONE promo code field for the entire cart, placed above the Subtotal line — not one per item.
- [ ] **Build History page:** Remove from visible navigation until functional. If it must stay, replace "coming soon" text with a proper empty state: illustration + "No builds yet — your creation history will appear here" + "Start Building →" CTA button.
- [ ] **Consistent badge colors:** Zeno Certified badges are cyan, 3M Preferred badges are green, XPEL Preferred is green, PPF Certified is green, Performance Certified is green. Verify consistency across all shop cards — some cards may have different badge styles.
- [ ] **Studio hero banner** (the yellow car banner at top of Scenes/Styles/Content pages): This is a nice touch but it's the same image on all three tabs. Consider making it dynamic — different hero per tab, or remove it to save vertical space and let the preset grid start higher.

---

## PART 10: LOW — Additional Improvements

These are nice-to-haves if time permits after the above is done.

- [ ] **Search bar functionality:** Verify the "Search wheels, wraps, or describe your build..." search bar actually does something. If it's non-functional, add at minimum a dropdown showing recent searches and trending searches when focused.
- [ ] **Notifications page:** Good content and structure, but add tappable actions — "Jordan liked your Supra Build" should link to the build. "Your quote for M3 Chrome Delete is ready" should link to the quote/booking. Every notification should be actionable, not just informational.
- [ ] **Settings page > "Version 1.0.0 — Sprint 1":** Remove sprint/version info from consumer-facing settings. Just show "Version 1.0" or remove entirely.
- [ ] **Dark Mode toggle in settings says "Always on for AVACAR":** Good — AVACAR should only be dark mode. Consider removing the toggle entirely since it's always on, or keep it but grey it out with a note.

---

## Execution Order

Do these in this exact order — each builds on the previous:

1. **Fix all broken images** (Part 1) — 30 min
2. **Add content width constraints** (Part 2) — 20 min
3. **Simplify navigation** (Part 3) — 45 min
4. **Upgrade My Garage to visual cards** (Part 6) — 30 min
5. **Seed the Explore feed** (Part 7) — 30 min
6. **Fix product catalog wrap renders** (Part 8) — 30 min
7. **Visual polish items** (Part 9) — 20 min
8. **Vehicle-centric social features** (Part 4) — 60 min
9. **Messaging/DMs** (Part 5) — 60 min
10. **Additional improvements** (Part 10) — 20 min

Total estimated: ~5-6 hours of CC work across multiple dispatches if needed.

---

## The Test When Done

Hand the phone to someone who owns a Honda Civic. They should be able to:

1. Open AVACAR and immediately see cool car builds (not broken images)
2. Filter or search for "Honda Civic" and see builds of their exact car
3. Follow "Honda Civic" so their feed shows Civic builds
4. Tap "Try On My Car" on a build they like
5. Upload their Civic photo and see it transformed in 3 taps
6. Save it, share it, and message the creator to ask about their build
7. Tap "Shop This Build" and message a shop to ask questions
8. Book an install

That's the full loop. Every fix in this spec serves that loop.
