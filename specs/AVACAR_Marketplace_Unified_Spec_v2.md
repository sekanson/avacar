# AVACAR Marketplace — Unified Specification v2.0
## Merging the Zeno Design Marketplace + Brand Product Marketplace

**From:** Hammad  
**To:** Mirmi  
**Date:** March 2026  
**Depends on:** AVACAR_Master_Platform_Spec_v3.md, AVACAR_Design_System_v2.md, AVACAR_Marketplace_Spec_v1.md

---

## 0. THE BIG DECISION — ONE MARKETPLACE, TWO SECTIONS

**Do not build two separate marketplaces.** Everything lives under `/marketplace`.

The current marketplace spec (v1) covered brand products — HRE wheels, 3M vinyl, XPEL PPF. The Zeno marketplace covered designer-uploaded custom liveries and wrap designs. These are NOT competitors. They are complements. A user browsing a race livery design immediately wants to know what vinyl it's printed on, who makes it, and who can install it. A user browsing HRE wheels sees a race build and wants that livery. The cross-sell is the product.

**The unified marketplace has two primary modes, switchable via top-level tabs:**

```
/marketplace  →  [DESIGNS tab]  [PRODUCTS tab]  [SHOPS tab]  [TRAINING tab]
```

- **DESIGNS** — The Zeno marketplace: custom liveries, wrap graphics, full designs, race wraps, commercial designs. Created by designers, shops, and the community. Buyers get production-ready files (EPS, TIFF, AI). With AI, they can now apply any design to their own car photo first.
- **PRODUCTS** — The brand marketplace: real physical products. 3M vinyl rolls, HRE wheels, XPEL PPF, Avery wrap film, ceramic tint, body kits, accessories, professional supplies.
- **SHOPS** — Find and book Zeno Certified installers.
- **TRAINING** — Courses and certifications.

The landing page (`/marketplace` with no tab) shows a curated mix of both — trending designs, trending products, featured brands, featured designers — all coexisting on one editorial surface.

---

## 1. QC OF THE OLD ZENO MARKETPLACE SCREENS

These screens were well designed for the time. Before building anything new, understand what worked and what to carry forward.

### 1.1 Marketplace Browse / Grid (Images 2, 3, 5)

**What worked:**
- The 4-column product grid is clean and information-dense without feeling cramped
- Card anatomy (image hero, seller name, designer/shop badge, price) is exactly right
- Filter sidebar with Vehicle Type, Wrap Type, Make & Model, Color, Price, Format is comprehensive — carry all of these forward
- Color swatch filter (Image 3) is a premium touch — visual color selection beats dropdowns
- DESIGNER and SHOP badges on cards are critical — they tell the buyer who made this and why that matters. Keep them.
- Results count ("RESULTS 204") + Sort By gives the user orientation immediately
- BUY / SELL / OWN bottom tab bar (Image 3) is an interesting marketplace mode switcher — consider adapting this

**What to improve:**
- The filter sidebar is a left panel on desktop which is correct, but on mobile it must become a bottom sheet (current approach buries filters)
- "Abandoned Universal Truck" is test data — placeholder names leak through. Every card in production must show real design names.
- The color swatch filter circles (Image 3) are too small (16px) — increase to 24px with a 2px gap and cyan ring on selected state
- The price range slider ends at "Unlimited" — set a max display value like "$500+" instead
- "RANDOM" as a filter category at the bottom of the sidebar is confusing — replace with "Surprise Me" as a button, not a filter section
- The green checkmark on one card (Image 3, row 3 col 2) means "purchased" — this is correct but needs a more visible indicator. Use a "✓ Owned" badge with cyan background in the card bottom-left.
- On hover, cards should show a quick "Preview on My Car" overlay button — this is the AI superpower that the old Zeno marketplace lacked entirely

### 1.2 Design Detail Page (Images 1, 6, 7)

**What worked:**
- Large hero image (left) + purchase panel (right) split layout is correct and matches industry standards (Etsy, Creative Market)
- Multi-angle thumbnail strip below the hero is essential — designers need to show all sides
- "VIEW IN 3D" button is Zeno's superpower — the AVACAR equivalent is "Try On My Car"
- FOLLOW button on the seller, with follower count — social layer built into commerce, exactly right
- Upvote/downvote (👍 4 / 👎 0) + view count (196) — good engagement signals
- TIFF and EPS file format icons showing what the buyer gets is excellent transparency
- "Request Changes" button next to Buy Now — this unlocks a whole service layer (custom adaptations)
- License detail link — professional, essential
- "OTHER DESIGNS BY ARTIST" section at bottom — strong cross-sell and creator discovery
- Comments section (Image 7) — community validation is powerful for purchase decisions

**What to improve:**
- The description placeholder text ("This is such a cool design. You should seriously buy it. Seriously. Pleaseeeeeeeeeeee") is test data — replace with a proper description template prompt for designers
- "Buy Now - $124" button is plain blue — upgrade to the AVACAR cyan gradient treatment
- "Request Changes" button is dark/grey — should be a proper ghost button with border
- File format icons (TIFF, EPS) are small and ambiguous to non-professionals. Add a tooltip or label: "Includes: Print-ready EPS + TIFF files, compatible with all vehicles"
- The design compatibility tags ("Full Wrap" and "Realistic") are bottom-left below the thumbnail strip — move them to be more prominent, near the price. They're purchase-decision information, not metadata footnotes.
- Views (196) are displayed correctly but there's no "saves/favorites" count visible on the detail page — add this
- "SS Customs" seller has a "SHOP" badge — good. But the seller avatar area needs more: show their rating (★4.9), total designs (42 designs), and a "Verified Seller" indicator if applicable
- The right panel (price, buy, request changes) doesn't scroll with the page — on long pages this means the CTA disappears. Make the right panel `position: sticky; top: 24px` so it stays visible as the user scrolls through thumbnails and "other designs"

### 1.3 Seller/Shop Profile on Marketplace (Image 5)

**What worked:**
- Profile banner with seller's best work shown as hero image — excellent
- Following/Followers count + bio
- Filter sidebar persists even on profile view — correct (helps narrow their portfolio)
- Shop badge prominently displayed

**What to improve:**
- The Pinterest logo appearing as the seller avatar (Image 5) is obviously test/placeholder data — the seller avatar must be the shop's actual logo or a generated initial avatar
- "Sekanskin" bio text ("We are such a cool company. Please follow our company.") is placeholder — replace with a proper bio field prompt
- The social link icons (4 white squares below the bio) are blank — either show real social links with proper icons (Instagram, TikTok, website) or hide this row entirely when empty
- The banner/header height could be taller — currently it's fairly thin. Expand to 180px to give designers more hero space to show their work
- No "Featured Designs" section at the top of their portfolio — add a pinned/featured row showing their 3 best works before the filtered grid

### 1.4 Cart / Checkout Panel (Image 8)

**What worked:**
- Floating panel design (not a new page) is fast and frictionless
- Cart line items with image thumbnail, name, price, license type, and remove button — all correct
- Summary with price, taxes, total — clean
- "View Cart" + "Checkout" dual CTA — right approach

**What to improve:**
- Four identical "Tika Halo Wrap" items in the cart at $124 each but total shows $129 — this is a bug in test data. Make totals consistent.
- The cart panel background is fully opaque white-ish on a dark page — it should match the dark AVACAR theme. Use `surface-container-lowest` background with proper dark theme.
- "PURCHASES" page visible in the background (left side) while the cart modal is open — this should be dimmed/blurred behind the modal overlay. Apply `backdrop-filter: blur(8px)` and `background: rgba(0,0,0,0.5)` to the overlay.
- The cart items all show the same GT40-style car thumbnail — this is test data. In production, each design shows its own correct thumbnail.
- "License: Personal" label under each item is important — carry this forward. Professional buyers need to know exactly what license they're purchasing.
- Add a promo code field above the Summary section — it's expected in any cart.
- The small grey dot at the very bottom center of the screen (Image 8) is a UI artifact — remove it.

---

## 2. THE NEW AVACAR UNIFIED MARKETPLACE — FULL SPEC

### 2.1 Marketplace Landing Page (`/marketplace`)

**First element: Mode tabs**
```
[DESIGNS] [PRODUCTS] [SHOPS] [TRAINING]
```
These are large, prominent tabs directly below the top nav. Active tab: cyan underline + slightly larger text. The landing page shows a curated mix by default.

**Hero section:**
```
[Full-width cinematic car with a race livery applied]
[Gradient overlay left-to-right: dark to transparent]

AVACAR MARKETPLACE                  ← cyan overline, 10px caps
Everything For Your Car             ← 48px bold white
Browse 50,000+ designs, real products from top brands,
and certified local shops.          ← 16px muted subhead

[Browse Designs →]  [Shop Products →]   ← two pill buttons
```

**Trending Designs section** (below hero):
```
TRENDING DESIGNS                    ← cyan overline
What's Hot This Week                ← 28px bold
[See All →]

[Horizontal scroll of 5 design cards]
```

Each design card:
```
┌─────────────────────────┐
│  [Car with design image]│
│  [★ rating top-right]   │
├─────────────────────────┤
│ Race Livery Pack        │
│ @designer_name [SHOP]   │
│ $149        [Try On →]  │
└─────────────────────────┘
```

**Featured Brands section:**
```
FEATURED BRANDS
Top Manufacturers
[3M] [Avery Dennison] [HRE Wheels] [XPEL] [Vossen] [Brixton] [Inozetek] [Liberty Walk]
```

**Trending Products section:**
```
TRENDING PRODUCTS
What Builders Are Buying
[5 product cards horizontal scroll]
```

**Shop by Style section (from v1):**
```
SHOP BY STYLE
Find Your Aesthetic
[Street Stealth] [Chrome Royale] [Track Day] [Clean Luxury]  ← 2×2 image tiles
```

**Community Build section (from v1):**
```
COMMUNITY BUILD
@wrapsbyalex's BMW M4 → design chips + product chips
[image]
```

**Find a Shop + Pro section (from v1 — keep as-is).**

---

### 2.2 DESIGNS Tab (`/marketplace/designs`)

This is the Zeno marketplace reimagined for AVACAR. Designers (individuals, shops, studios) upload and sell their work. Buyers get production-ready files AND can use AI to preview any design on their own car first.

**Page layout:**

```
[Search bar: "Search designs, styles, vehicles..."]

[Filter chips — horizontal scroll:]
All · Racing · Street · Commercial · Abstract · Minimal · JDM · Euro · Custom

[Left filter sidebar — desktop / bottom sheet — mobile:]
  Vehicle Type: Cars / Trucks / Vans / Box Trucks / Motorcycles
  Wrap Type: Full Wrap / Partial / Spot Decals / Stripes / Commercial / Racing
  Make & Model: [Year range] [Make] [Model]
  Color: [Visual color swatch grid — 24px circles]
  Price: Free / On Sale / [slider $0 — $500+]
  File Format: EPS / AI / TIFF / PDF / All
  Seller Type: Individual Designer / Shop / Studio / Verified
  Sort By: Trending / Newest / Best Rated / Price ↑ / Price ↓

[Results count] [Sort by dropdown — right aligned]

[Product grid — 4 col desktop / 2 col mobile]
```

**Design card (grid view):**
```
┌─────────────────────────────┐
│  [Design hero image]        │
│  [★ X.X top-right]          │
│  [DESIGNER/SHOP badge]      │
│  [✓ Owned — if purchased]   │
├─────────────────────────────┤
│ Design Name                 │
│ @seller · [Badge]           │
│ $149    [Try On My Car →]   │
└─────────────────────────────┘
```

**On hover (desktop):**
- Scale card 1.02x
- "🔮 Try On My Car" overlay button appears centered on the image
- Quick stats fade in: views, saves, ratings

**"Try On My Car" from design browse:**
This is the AI superpower the old Zeno marketplace never had. When a user taps "Try On My Car" on any design card:
1. If they have a car saved in Garage: opens Studio with that design pre-loaded on their car photo → generates AI render in ~15 seconds
2. If no car saved: bottom sheet appears "Add your car to try this on" → quick add flow → then generates

The user sees exactly what this livery/design would look like on their actual car before buying. This eliminates purchase anxiety and dramatically increases conversion.

**Design detail page (`/marketplace/designs/[slug]`):**

```
LAYOUT: Left 65% image / Right 35% purchase panel

LEFT SIDE:
  [Hero image — large, high quality, 4:3]
  [Thumbnail strip — all angles, horizontally scrollable]
  [Seller info row:]
    [Avatar] [Seller name] [Badge: SHOP/DESIGNER/STUDIO]
    [★ X.X · X designs · X followers]
    [FOLLOW button] [VIEW IN 3D* button]
    [Views count] [👍 X] [👎 X] [♡ Save] [Share]
  [Compatibility tags: Full Wrap · Realistic]
  [Section tabs: MORE DESIGNS | COMMENTS (X) | REVIEWS (X)]
    More Designs: grid of other works by this seller
    Comments: threaded discussion
    Reviews: verified purchase reviews with rating breakdown

RIGHT SIDE (sticky):
  [Design name — 24px bold]
  [Short description — 3 lines, expandable]
  [File includes: EPS · TIFF · AI — with clear labels]
  [Vehicle compatibility: Works with 2,400+ vehicles]
  [License type selector: Personal / Commercial / Exclusive]
    Personal: $149 — For personal use, one vehicle
    Commercial: $299 — For shop use, unlimited prints
    Exclusive: $899 — Removed from marketplace after purchase
  [Buy Now — $149 → cyan gradient full width]
  [🔮 Try On My Car — ghost button, full width]
  [🛒 Add to Cart — text link]
  [Request Custom Changes — grey ghost button]
    → Opens a brief form: describe changes, budget, timeline
  [LICENSE DETAIL — small text link]
```

*"VIEW IN 3D" — this is the Zeno desktop app integration. On web AVACAR, this becomes "Try in 3D Studio" which opens the full 3D configurator if available, or falls back to the AI photo try-on.

---

### 2.3 PRODUCTS Tab (`/marketplace/products`)

This is unchanged from Marketplace Spec v1.0. Refer to that document for the full spec. Key points:

- Physical products from partner brands (3M, Avery, HRE, XPEL, Vossen, Inozetek, etc.)
- Wraps, PPF, wheels, tint, body kits, accessories
- Professional supplies (vinyl rolls, tools, application supplies)
- Every product has "Visualize on My Car" which opens Studio with that product pre-loaded
- Products link to brand storefronts
- Price comparison across vendors

The main addition in v2: **product cards can now also link to related designs**. Example: browsing 3M Satin Black vinyl → below the product you see "Popular designs using this vinyl: [3 design cards]". This creates a bridge between the two marketplace sections.

---

### 2.4 Designer/Seller Profiles (`/marketplace/designers/[slug]`)

Every seller — whether individual designer, wrap shop, or studio — gets a profile page within the marketplace. This is separate from their main AVACAR social profile (which lives at `/profile/[username]`) but they link to each other.

```
[BANNER — 200px tall, seller's hero work as background]
[Dark gradient overlay]

[Seller avatar — 72px, overlaps banner bottom]
[Seller name] [Badge: DESIGNER / SHOP / STUDIO / VERIFIED]
[Bio — 2 lines max]
[Social links: Instagram · TikTok · Website]
[Stats: X Designs · ★ X.X avg · X Sales · X Followers]
[FOLLOW] [MESSAGE] [SHARE]

[FEATURED row — 3 pinned designs]

[Filter by this seller's designs:]
  [All] [Full Wrap] [Partial] [Stripes] [Commercial]
  [Sort: Trending / Newest / Best Rated]

[Design grid — 4 col desktop / 2 col mobile]
```

---

### 2.5 Seller/Designer Upload Flow

Any verified user can become a seller. The upload flow is a critical path — it must be frictionless but thorough enough to maintain quality.

**Step 1: Start**
```
[Upload Your Design]     ← headline
[Create in Studio] ← primary — takes them to Design Studio
[Upload Files]     ← secondary — for designers with existing work
```

**Step 2: Upload**
- Drag & drop zone for EPS, AI, PDF, TIFF, PNG files
- Max file size: 500MB
- Show: file name, format detected, ✓ valid / ✗ invalid
- Multiple files allowed (different formats of same design)

**Step 3: Design Info**
```
Design Name *           [text field]
Category *              [dropdown: Racing / Street / Commercial / Abstract / Minimal / JDM / Euro / Other]
Tags                    [chip input: type + enter]
Description             [textarea, 500 char max]
Wrap Type *             [Full Wrap / Partial / Stripes / Spot Decals / Commercial / Racing]
```

**Step 4: Vehicle Compatibility**
```
Works with:
[✓] All vehicles (universal design)
[ ] Specific vehicles only

If specific:
  [Add vehicle: Year range · Make · Model]
  + Add another vehicle
```

**Step 5: Preview & 3D**
- System auto-generates a preview by applying the design to a neutral vehicle in 3D
- Designer can select which vehicle to preview on (from a list of popular models)
- Shows 4 angles: front, rear, driver side, passenger side
- Designer approves or flags issues before proceeding

**Step 6: Pricing**
```
Suggested price: $149     ← AI-suggested based on complexity and market
                           [How we calculate this ↗]

Set your price:
Personal License    [$___] 
Commercial License  [$___]   (auto-suggests 2× personal)
Exclusive License   [$___]   (auto-suggests 6× personal)

[ ] Offer free version (drives discoverability, upsell to paid)

Your earnings: 70% of every sale
AVACAR keeps: 30%
```

**Step 7: Review & Submit**
- Preview the listing as it will appear to buyers
- "Submit for Review" — AVACAR team reviews within 24 hours for quality/IP issues
- Designer notified via email + notification when approved or rejected (with reason)

---

### 2.6 AI Integration — "Try On My Car" for Designs

This is what separates AVACAR from the old Zeno marketplace. In Zeno, you could load a design into the 3D configurator on a generic vehicle. In AVACAR, you apply it to a photo of YOUR actual car using AI.

**The flow:**
1. User taps "Try On My Car" on any design
2. If car photo saved in Garage: AI applies the design to their car photo in ~15 seconds
3. User sees 2-3 variations (full wrap, partial, color options if applicable)
4. User can adjust — change the colorway, apply only to hood, etc.
5. From here: Buy the design → Get a quote from a Zeno shop to install it → Share to Feed

**What the AI does:**
- Reads the design file's structure (zones, colors, patterns)
- Maps the design onto the car's geometry from the photo
- Renders it photorealistically with correct lighting, reflections, and shadowing
- Maintains the user's car's body lines and features

**Technical note for Mirmi:** This AI step uses Nano Banana (the existing AI generation pipeline). The design file is passed as a reference/style input, the car photo is the base, and the model generates the wrapped car. This is the same flow as the existing Studio — the difference is the design input comes from the marketplace listing rather than a product selection.

---

### 2.7 Design Studio Integration

**Critical context:** Zeno's Design Studio is a professional-grade 3D wrap configurator used by wrap shops. It allows:
- 1,000+ 3D vehicle models
- 1,000+ vinyl options from 3M, Avery, etc.
- Import custom designs (EPS, PNG, etc.) and place them on the 3D car
- Adjust placement, scale, rotation
- Overlay text as decals
- Export 4K renders and print-ready files

**For AVACAR web, the Design Studio becomes a core page:**

`/studio` — this is currently the broken upload screen. It needs to evolve into a full web-based design tool.

**The AVACAR Studio has two modes:**

**Mode 1: AI Mode (consumer-facing, already specced)**
- Upload a photo of your car
- Pick a preset or product
- AI generates the result
- This is what Mirmi has been building

**Mode 2: 3D Design Mode (professional-facing, new)**
- Select your vehicle from the 1,000+ model database
- Apply vinyl colors from the brand catalog
- Import or browse designs from the Marketplace
- Add text decals and graphics
- Adjust placement manually
- Export 4K render or print-ready files
- Share directly to Feed or save to Garage

**The Studio nav tab needs a mode switcher:**
```
[AI Mode] ←→ [3D Design Mode]
```

**For now (Phase 1), Mirmi should:**
1. Build AI Mode properly (the upload → generate → result flow specced in QC Report v1, Section 4)
2. Add a "3D Studio (Coming Soon)" placeholder in the mode switcher
3. The 3D mode is Phase 2 and depends on the Zeno 3D engine being web-ported

---

## 3. NAVIGATION CHANGES

The marketplace tab expansion means navigation needs updating across all surfaces.

### Bottom Nav (Mobile) — unchanged
```
[Feed] [Explore] [✦ Studio] [Garage] [Profile]
```
Marketplace is accessed via cart icon in top bar (mobile) — not a bottom nav item.

### Desktop Sidebar — add Marketplace
```
[Feed]
[Explore]  
[✦ Studio]
[Garage]
[Marketplace]  ← ADD THIS
[Profile]
[Settings]
```

### Marketplace internal tabs (top of marketplace page)
```
[Designs] [Products] [Shops] [Training]
```
These are page-level tabs, not global navigation. They appear only within `/marketplace/*` routes.

---

## 4. SELLER TIERS & ECONOMICS

| Tier | Who | Monthly Fee | Commission | Features |
|---|---|---|---|---|
| Free Designer | Any verified user | $0 | 30% to AVACAR | Up to 10 designs listed, basic analytics |
| Pro Designer | Active sellers | $9.99/mo | 25% to AVACAR | Unlimited listings, full analytics, featured placement eligibility, priority review |
| Studio | Design studios | $49/mo | 20% to AVACAR | Team accounts, bulk upload, API access, white-label option |
| Zeno Shop | Certified installers | Included in ZCN | 15% to AVACAR | Shop badge, installation upsell, verified installer status |

**Buyer licenses:**
- Personal: $49–$299 (one vehicle, personal use)
- Commercial: 2× Personal price (shop use, unlimited prints)
- Exclusive: 6× Personal price (removed from marketplace after purchase)

**Payout:** Sellers receive 70–85% (depending on tier) of every sale, paid monthly via Stripe. Minimum payout: $25.

---

## 5. WHAT TO SEND MIRMI

**Send her this document AND the 8 images of the old Zeno marketplace.** She needs to see the Zeno screens to understand the design language and feature depth of what she's building toward. They are reference material, not assets to copy pixel-for-pixel.

**Tell her:**

*"The 8 images attached are from the old Zeno desktop marketplace — this was a B2B tool for wrap shops. We are rebuilding this concept for AVACAR as a web-based consumer + professional marketplace. The design language needs to be updated to match the AVACAR Design System v2.0 (dark Pristine Atelier aesthetic, Manrope font, cyan accents, no borders), but the features, card structure, filter system, design detail page, and seller profile concept are all directionally correct and should inform what you build.*

*The key new addition the old Zeno marketplace never had: the AI "Try On My Car" button on every design card. Any design can be applied to a user's car photo using AI before they buy. This is the core competitive advantage.*

*Build in this order:*
1. *Marketplace landing page (unified — Designs + Products together)*
2. *Designs tab — browse grid with filters*
3. *Design detail page*
4. *Seller upload flow (5 steps)*
5. *Seller profile page*
6. *Products tab — reuse from marketplace v1 spec*
7. *AI Try On My Car integration for designs*
8. *Studio 3D mode — Phase 2, placeholder only for now*"*

---

## 6. THINGS TO NOT BUILD YET

- The actual 3D web renderer (requires porting Zeno's Unreal Engine pipeline — this is a major engineering project)
- NFT or blockchain ownership of designs (not relevant)
- Print-on-demand fulfillment (designs are file downloads only for now)
- Designer subscription billing (implement basic free tier first, add paid tiers after launch)
- The "RANDOM" filter (remove from filter sidebar, replace with "Surprise Me" button that picks a random design)

---

*End of AVACAR Marketplace Unified Spec v2.0*  
*This document supersedes the relevant sections of AVACAR_Marketplace_Spec_v1.md. Send to Mirmi with all 8 Zeno marketplace images attached.*
