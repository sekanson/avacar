# AVACAR Marketplace — User Experience Addendum
## Clarifying the Three Audiences

**From:** Hammad  
**To:** Mirmi  
**Date:** March 2026  
**Read alongside:** AVACAR_Marketplace_Unified_Spec_v2.md

---

## IMPORTANT CORRECTION TO PREVIOUS SPEC

The previous marketplace spec was written with designers and sellers in mind too heavily. **The primary user of the AVACAR marketplace is a regular person who owns a car and wants to do something cool with it.** Everything else — designer tools, seller flows, brand storefronts — exists to serve that person. Do not let the seller/designer complexity bleed into the consumer experience.

---

## THE THREE AUDIENCES — WHO THEY ARE AND WHAT THEY DO

### Audience 1: Regular Consumers (PRIMARY — design everything for them first)

This is someone like your friend who has a 2023 Civic and saw a sick wrap on Instagram and wants to know what it would look like on their car. They are not a wrap shop. They are not a graphic designer. They don't know what EPS files are. They just want their car to look amazing.

**What they come to the Marketplace for:**
- Browse cool wrap designs and liveries (like browsing an app store or Netflix)
- See what a design looks like on their actual car before committing
- Find out how much it costs all-in (design + installation)
- Buy the design and book a shop to install it — one seamless flow
- Buy physical products they can DIY install (accessories, smaller items)
- Find professional products like wheels, PPF, tint through a trusted source
- Get inspired by what other car owners have done

**What they should NEVER have to see or deal with:**
- EPS / TIFF / AI file formats — this is professional jargon, hide it
- License type selection (Personal vs Commercial) — consumers always get Personal, auto-selected, no choice needed
- Designer upload flows
- Wholesale pricing
- Seller dashboards
- Any B2B language

**The consumer journey through the Marketplace:**

```
Browse Feed → see a sick livery on someone's car
                    ↓
Tap "Try On My Car" → AI applies it to their car photo
                    ↓
Loves it → taps "Get This Look"
                    ↓
Marketplace Design page → simplified view:
  [Their car with design applied — hero image]
  [Design name + creator credit]
  [Total cost estimate: Design ($149) + Installation ($400–800)]
  [One button: "Get This Built →"]
                    ↓
Find a Zeno Certified shop near them → select date
                    ↓
Shop receives: their car photo + the design + their contact
                    ↓
Shop confirms quote → consumer pays deposit
                    ↓
Gets it done → posts to Feed → inspires the next person
```

**This entire journey should feel like ordering on DoorDash — not like shopping on a B2B procurement platform.**

---

### Audience 2: Designers and Shops (SECONDARY)

These are the people who create and sell designs on AVACAR. They include:
- Individual graphic designers who make vehicle wrap artwork
- Wrap shops who want to sell their signature styles
- Design studios producing large catalogs
- Enthusiasts who create designs for their community

**What they come to the Marketplace for:**
- Upload and sell their designs to a global audience
- Get discovered by consumers and shops who want their work
- Earn passive income from designs they've already made
- Reach shops who need fresh content for their portfolio
- Get custom design requests from consumers

**What they see that consumers don't:**
- Seller dashboard (behind a separate login/account type toggle)
- Upload flow with file format requirements
- Pricing controls and license management
- Analytics (views, sales, revenue)
- Order management for custom requests

**Key rule:** Seller tools are behind a "Switch to Seller Mode" toggle in account settings. By default, every account is in consumer mode. A designer who is also a buyer should never feel like they're in a professional tool when they're just browsing.

---

### Audience 3: Brands and Manufacturers (TERTIARY)

These are companies like HRE Wheels, 3M, Avery Dennison, XPEL, Vossen, Inozetek, Liberty Walk. They sell physical products — wheels, vinyl films, PPF, body kits — not digital design files.

**What they come to the Marketplace for:**
- List their product catalog where car enthusiasts are already shopping
- Have their products appear in AI visualizations (when a consumer picks "Satin Black," it shows 3M 1080 Satin Black specifically)
- Get data on which of their products are being visualized, saved, and purchased
- Partner with AVACAR for featured placement and sponsored sections

**What consumers see from brands:**
- Products in the Products tab with real photos and accurate color swatches
- Brand storefronts they can browse ("Shop HRE Wheels")
- Their products tagged in community builds in the Feed
- "Visualize on My Car" on every product — same AI flow as for designs

**What brands see (in their brand portal at `/brand-portal`):**
- Analytics dashboard (how many times their products were visualized, saved, purchased)
- Product catalog management
- Sponsored placement options
- Zeno Certified shops that carry their products

---

## HOW THIS CHANGES THE MARKETPLACE UI

### The default view — always consumer-first

When anyone opens `/marketplace` without being logged in, or when logged in as a consumer, they see:

```
[HERO — cinematic car, bold headline, "Start Browsing" CTA]

[DESIGNS section — the creative marketplace]
  Headline: "Find Your Look"
  Subhead: "Browse 50,000+ designs. Try any of them on your car."
  [Grid of best-looking designs — large images, creator credit, price]
  [See All Designs →]

[PRODUCTS section — physical goods]  
  Headline: "Real Products, Real Brands"
  Subhead: "Wraps, wheels, PPF, tint — from the brands that build the best."
  [Brand logos row] [Product cards — trending items]
  [Shop All Products →]

[SHOPS section — service directory]
  Headline: "Find Someone to Build It"
  Subhead: "Zeno Certified installers near you. Vetted, rated, ready."
  [Map preview + nearest 3 shops]
  [Find Shops Near Me →]
```

**There is no "Upload Your Design" button on the landing page by default.** That is a seller feature. The consumer never sees it unless they toggle to Seller Mode.

### The Designs browse page — simplified for consumers

The filter sidebar in the old Zeno marketplace had options like "Format: EPS / AI / TIFF / PDF." A consumer has no idea what any of this means and does not care. The format filter is hidden entirely for consumers.

**Consumer-facing filters only:**
- Style: Racing · Street · JDM · Euro · Commercial · Minimal · Abstract
- Vehicle: [Year] [Make] [Model] — show me designs that fit my car
- Color: Visual swatches
- Price: Free · Under $100 · $100–$200 · $200+
- Sort: Most Popular · Newest · Highest Rated

**Hidden from consumers (visible only in Seller Mode):**
- File format filter
- Seller type filter
- License type filter

### Design card — consumer view vs seller view

**Consumer sees:**
```
┌──────────────────────────┐
│  [Design image]          │
│                          │
├──────────────────────────┤
│ Race Livery — Supra A90  │
│ by @wraplord             │
│ From $149 installed      │ ← shows combined cost
│ [Try On My Car]          │ ← primary CTA, always cyan
└──────────────────────────┘
```

**Seller/designer sees (same card, extra details):**
```
┌──────────────────────────┐
│  [Design image]          │
│  [DESIGNER badge]        │
├──────────────────────────┤
│ Race Livery — Supra A90  │
│ by @wraplord             │
│ $149 · EPS + TIFF        │ ← shows file format
│ [Try On My Car] [Buy]    │
└──────────────────────────┘
```

### Design detail page — consumer view

The full detail page spec in v2.0 was written for professional buyers. For consumers, simplify the right panel significantly:

**Consumer sees on right panel:**
```
[Their car with design applied — if they came via "Try On My Car"]
 OR
[Hero design image]

Race Livery — Supra A90
by @wraplord ★4.9

"See it on your car first"
[Try On My Car →] ← large, cyan, primary

───────────────────────────
WHAT THIS COSTS ALL-IN
Design file:        $149
Professional install: $400–800 est.
Total estimate:     $549–$949

[Get This Built →] ← the single most important button
                     routes to shop finder pre-loaded with this design
───────────────────────────
or

[Just buy the file →] ← smaller, for DIYers
[Save for later →] ← bookmark/wishlist
```

**A consumer should never have to choose between Personal, Commercial, and Exclusive licenses.** They always get Personal. Auto-select it. Only show license options to accounts flagged as Commercial/Shop.

### Products tab — consumer view

Product pages are mostly the same as specced in v1.0. The one change: replace all B2B language.

| v1.0 language (remove) | Consumer language (use instead) |
|---|---|
| "Add to Cart" | "Add to Cart" ✓ (this one is fine) |
| "Compatible vehicles" | "Works on your car? [Check]" |
| "MAP pricing" | (hide entirely) |
| "Wholesale available" | (hide, only show in Pro account) |
| "SKU" | (hide entirely) |
| "Net-30 terms" | (hide, Pro account only) |

---

## THE ONE FLOW THAT MATTERS MOST

If Mirmi only perfects one thing in the entire Marketplace, it should be this:

**Consumer sees a design in the feed → taps "Try On My Car" → sees it on their car → taps "Get This Built" → selects a shop → deposits $200 → goes home → gets their car wrapped → posts it to the Feed.**

Every other feature in the Marketplace is secondary to making this loop work flawlessly. The license types, the file formats, the seller analytics, the brand portals — all of that matters, but none of it matters if a regular person can't go from "I love that wrap" to "it's booked" in under 5 minutes.

Build that flow first. Make it feel like magic. Then layer everything else on top.

---

## BUILD PRIORITY (updated)

**Phase 1 — Consumer flow only**
1. Marketplace landing page (consumer view, no seller tools visible)
2. Designs browse page (consumer filters only)
3. Design detail page (simplified consumer panel)
4. "Get This Built" → Shop finder → Booking flow
5. Products tab (consumer-facing, no wholesale/B2B)

**Phase 2 — Creator tools**
6. Seller Mode toggle in account settings
7. Designer upload flow (5 steps from v2.0 spec)
8. Seller dashboard and analytics
9. Designer/Shop profile pages

**Phase 3 — Brand integration**
10. Brand storefront pages
11. Brand portal (separate login, analytics dashboard)
12. Sponsored placement system
13. Product catalog management for brands

---

*End of Marketplace User Experience Addendum*  
*This addendum corrects and extends AVACAR_Marketplace_Unified_Spec_v2.md. Read both together.*
