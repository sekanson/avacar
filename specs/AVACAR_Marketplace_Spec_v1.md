# AVACAR Marketplace & Shop Network
## Full Feature Specification v1.0

**Prepared for:** Mirmi (AI Development Agent)  
**Author:** Hammad, xix3D Creative Director  
**Date:** March 2026  
**Depends on:** AVACAR_Master_Platform_Spec_v3.md, AVACAR_Design_System_v2.md

---

## 0. WHAT THIS IS

The AVACAR Marketplace is not an afterthought commerce layer bolted onto a social app. It is the economic engine of the entire platform. Every piece of content in the feed — every build, every AI render, every tagged product — is a direct entry point into this Marketplace.

Think of it as three things unified under one roof:

1. **Consumer Store** — wraps, wheels, PPF, tint, body kits, accessories. Shop like Revzilla but for car aesthetics, with AI visualization on every product.
2. **Professional Supply** — vinyl rolls, application tools, squeegees, primers, laminates, training courses. The B2B supply side for wrap shops and installers.
3. **Service Directory** — find and book Zeno Certified shops, filtered by service type, location, rating, and specialization.

The AI visualizer ties all three together. You don't browse products in the abstract — you see them on your actual car before you buy.

---

## 1. INFORMATION ARCHITECTURE

```
/marketplace
├── /marketplace                     → Landing (homepage of store)
├── /marketplace/products            → Full product catalog
│   ├── /marketplace/products/wraps  → Wrap films
│   ├── /marketplace/products/ppf    → Paint protection film
│   ├── /marketplace/products/tint   → Window tint
│   ├── /marketplace/products/wheels → Wheels & rims
│   ├── /marketplace/products/body-kits → Body kits & aero
│   ├── /marketplace/products/accessories → Misc accessories
│   └── /marketplace/products/[slug] → Individual product page
│
├── /marketplace/supplies            → Professional supplies
│   ├── /marketplace/supplies/vinyl  → Vinyl rolls (bulk)
│   ├── /marketplace/supplies/tools  → Application tools
│   ├── /marketplace/supplies/ppf-film → PPF rolls
│   └── /marketplace/supplies/[slug] → Individual supply page
│
├── /marketplace/brands              → Brand directory
│   └── /marketplace/brands/[slug]   → Brand storefront
│
├── /marketplace/shops               → Shop finder
│   └── /marketplace/shops/[slug]    → Shop profile
│
├── /marketplace/training            → Courses & certification
│   └── /marketplace/training/[slug] → Individual course
│
└── /marketplace/cart                → Cart & checkout
```

---

## 2. MARKETPLACE LANDING PAGE (`/marketplace`)

**Purpose:** The front door. Sets the tone — this is not Amazon. This is the world's best automotive customization store.

**Layout (mobile-first):**

```
[HERO BANNER]
  Headline: "Everything Your Car Needs"
  Subhead: "Real products from real brands. Visualize before you buy."
  CTA: "Shop Now" (cyan pill)

[CATEGORY QUICK LINKS — horizontal scroll chips]
  Wraps · Wheels · PPF · Tint · Body Kits · Supplies · Training

[FEATURED BRANDS — horizontal scroll]
  [Brand logo cards: 3M · Avery · HRE · Vossen · Brixton · Inozetek · XPEL · Liberty Walk]

[TRENDING PRODUCTS — "What's Hot Right Now"]
  Horizontal scroll of product cards (4 visible, scroll for more)

[SHOP BY BUILD STYLE — 4 visual tiles]
  Clean OEM+ · Full Send JDM · Euro Spec · Track Monster
  (Each links to pre-filtered product catalog for that aesthetic)

[FEATURED BUILD — editorial card]
  A community build with all products tagged and shoppable
  "This build used: [product chips]" → each links to product page

[FIND A SHOP — CTA section]
  "Ready to get it done?"
  Search bar: "Enter your city or postal code"
  → links to /marketplace/shops with geo filter applied

[PROFESSIONAL SUPPLIES — small section]
  "Are you a shop or installer?"
  [Browse Supplies] [Browse Training]
```

---

## 3. PRODUCT CATALOG (`/marketplace/products`)

### 3.1 Catalog Page

**Filters (left panel desktop, bottom sheet on mobile):**
- Category (multi-select chips)
- Brand (multi-select)
- Price range (slider)
- Compatible vehicle (year/make/model selector)
- Finish type (matte / satin / gloss / chrome / color-shift / carbon)
- Color family (visual color swatches, not dropdowns)
- In stock only (toggle)
- Sort: Popular / Newest / Price Low-High / Price High-Low

**Product grid:**
- Mobile: 2 columns
- Desktop: 3-4 columns
- Each card:
  ```
  [Product image — square, 1:1]
  [Brand logo — small, top-left overlay]
  [Product name]
  [Finish/color variant dots — up to 5 shown, +N more]
  [Price range — "from $X"]
  [Visualize on My Car → cyan text button]
  ```

### 3.2 Product Page (`/marketplace/products/[slug]`)

This is the most important page in the Marketplace. It must do four things: show the product beautifully, let users visualize it on their car, make it easy to buy, and connect them to a shop that installs it.

**Full layout:**

```
[IMAGE GALLERY — swipeable, full-width on mobile]
  [Main product image]
  [Swatch variations — tap to change main image]
  [← →] navigation dots

[PRODUCT HEADER]
  [Brand logo + name]  ← links to brand storefront
  [Product full name]
  [Rating: ★4.8 (142 reviews)]
  [Price: from $XX / sq ft] or [from $XXX / set]

[VARIANT SELECTOR]
  Finish: [Matte] [Satin] [Gloss] [Chrome] — pill chips
  Color: [Visual swatch grid — 20+ colors]
  Size: [Roll width / Wheel diameter] — dropdown

[PRIMARY ACTIONS — sticky on mobile]
  [🔮 Visualize on My Car] ← CYAN, full width, primary
  [Add to Cart] ← ghost button, secondary
  [Save to Wishlist] ← icon button, tertiary

[PRODUCT DESCRIPTION]
  Key specs in a clean grid (no bullet walls):
  Material · Finish · Durability · Install difficulty · Warranty

[BUILDS USING THIS PRODUCT]
  "See it in real builds"
  Mini feed — 6 posts from community that tagged this product
  Each has "Try This Build" → Design Studio

[PRICE COMPARISON]
  "Buy from:"
  [Vendor 1 · $XX · In Stock · Ships in 2 days]
  [Vendor 2 · $XX · In Stock · Ships in 5 days]
  [Vendor 3 · $XX · Special order]

[PROFESSIONAL INSTALLATION]
  "Need this installed?"
  [Find Zeno Certified Shops Near You] → /marketplace/shops
  with this product pre-filtered

[BRAND INFO — collapsible]
  About [Brand Name] + link to their storefront

[REVIEWS — paginated]
  Rating breakdown + written reviews
  Filter: Most Recent / Highest Rated / With Photos
  Each review: star rating, photo (optional), verified buyer badge
```

### 3.3 Product Categories & What's In Each

**Wraps:**
- Cast vinyl wrap films (3M 1080, Avery SW, Hexis, Oracal 970)
- Color PPF (XPEL Stealth, SunTek Color, LLumar)
- Chrome / metallic wraps
- Carbon fiber wraps
- Custom print / design wraps

**PPF (Paint Protection Film):**
- Full clear PPF (XPEL Ultimate, SunTek Ultra, LLumar FormulaOne)
- Matte PPF
- Self-healing films
- Pre-cut kits (per vehicle, per zone)
- Bulk rolls for shops

**Window Tint:**
- Ceramic tint (brand + VLT% selector)
- Carbon tint
- Dyed tint
- Windshield tint strips

**Wheels:**
- By brand (HRE, Vossen, Brixton, BBS, Rays, Enkei, etc.)
- By style (monoblock, multi-piece, forged, cast)
- By diameter (18"–24")
- By finish (polished, brushed, gloss black, gunmetal, bronze, etc.)
- Compatible vehicle filter is CRITICAL here

**Body Kits & Aero:**
- Liberty Walk, Rocket Bunny, KUHL Racing, Varis, etc.
- Front lips, side skirts, rear diffusers, spoilers
- Full wide-body kits
- Carbon fiber components

**Accessories:**
- Interior accents
- Emblems / badging
- Tow hooks
- License plate frames
- Antenna delete kits
- Lug nuts & wheel locks

---

## 4. PROFESSIONAL SUPPLIES (`/marketplace/supplies`)

**This section is for shops and installers. The UI should acknowledge this audience while remaining accessible to serious DIYers.**

**Banner at top of this section:**
```
[Are you a professional installer?]
[Create a Pro Account for wholesale pricing and bulk ordering]
[Sign Up Free →]
```

### 4.1 Supply Categories

**Vinyl & Film (Bulk Rolls):**
- Wrap films by the roll (50ft, 100ft)
- PPF by the roll
- Window tint rolls
- Overlaminate / clear coat films
- Bulk pricing tiers (1 roll / 5 rolls / 10+ rolls)

**Application Tools:**
- Squeegees (soft, hard, felt-edge — by brand: GT, Fusion, Knifeless)
- Wrap gloves
- Magnets and clips
- Heat guns and heat lamps
- Knifeless tape (Finishing Line, Stretch, Design Line)
- Cutting tools and blades
- Wrap stands and frames
- Positioning spray

**Surface Prep:**
- Isopropyl alcohol wipes
- Panel prep solution
- Clay bar kits
- Adhesion promoter
- Primer for bumpers/plastics

**PPF-Specific Tools:**
- Slip solution
- PPF squeegees
- Heat gun (low-temp)
- Edge sealer
- Stretching tools

**Shop Equipment:**
- Plotters and printers (for custom prints)
- Wrap tables
- Lighting setups
- Infrared thermometers

### 4.2 Pro Account Features

When a shop creates a Pro Account (free, requires Zeno Certified status OR application):
- Wholesale pricing (10–30% below retail)
- Bulk order discounts (tiered — see Section 9)
- Net-30 payment terms (for verified accounts)
- Order history and re-order in one click
- Saved shopping lists
- Dedicated account manager (Elite tier shops)
- Priority shipping

---

## 5. BRAND STOREFRONTS (`/marketplace/brands/[slug]`)

Every brand partner gets a branded page that feels like a mini-site within AVACAR.

**Layout:**

```
[BRAND HERO — full-width banner, brand provides assets]
[Brand logo + tagline]

[BRAND STATS ROW]
  X Products · X Builds on AVACAR · ★ X.X avg rating

[FEATURED PRODUCTS — curated by brand, 4-6 products]

[NEW ARRIVALS — latest additions to their catalog]

[BUILDS IN THE WILD]
  "Community builds using [Brand]"
  Live feed of AVACAR posts tagged with this brand's products
  Infinite scroll — this is the most powerful brand section

[ABOUT — collapsible paragraph]

[ZENO CERTIFIED SHOPS]
  "Certified [Brand] Installers"
  Map + list of shops that carry / specialize in this brand
  → links to /marketplace/shops with brand filter

[WHERE TO BUY]
  Official retailers and distributors
```

**Brand tiers (what they get):**

| Tier | Monthly Fee | Products | AI Visualizer | Storefront | Analytics | Sponsored Placement |
|---|---|---|---|---|---|---|
| Listed | Free | Up to 10 | No | Basic | No | No |
| Integrated | $499/mo | Unlimited | Yes | Full | Yes | No |
| Featured Partner | $1,499/mo | Unlimited | Yes | Premium | Advanced | Yes |

---

## 6. SHOP FINDER (`/marketplace/shops`)

This is the physical-world execution layer. Users come here after designing their car — they want to know who can build it.

### 6.1 Shop Finder Page

**Layout:**

```
[SEARCH BAR]
  "Find shops near..." with location autocomplete

[FILTERS — horizontal chips on mobile, sidebar on desktop]
  Service: [Wraps] [PPF] [Tint] [Wheels] [Body Kits] [Ceramic Coating] [Detailing]
  Distance: 10mi / 25mi / 50mi / Any
  Rating: ★4.0+ / ★4.5+ / ★5.0 only
  Availability: Available this week / Available this month
  Certified Tier: [Certified] [Certified Pro] [Elite Partner]
  Brand Specialization: (brand chips)

[VIEW TOGGLE]
  [Map View] [List View]

MAP VIEW:
  Pins on map, tap pin → mini shop card floats up from bottom
  Mini card: name, rating, top 2 services, "View Shop" button

LIST VIEW:
  Shop cards stacked vertically
  Each card:
    [Shop hero photo]
    [Shop name] [Zeno Certified badge]
    [★ X.X · X reviews] [X mi away]
    [Service chips: Wraps · PPF · Tint]
    [Starting from $XXX]
    [Book Now →] [View Profile →]
```

### 6.2 Shop Profile Page (`/marketplace/shops/[slug]`)

```
[HERO — shop's best work photo, full width]

[SHOP HEADER]
  [Shop logo/avatar]
  [Shop Name]
  [Zeno Certified {tier} badge]
  [★ X.X (X reviews)] [X mi from you]
  [Response time: Usually within 2hrs]

[ACTION BUTTONS]
  [Book Now — cyan, primary]
  [Message Shop — ghost]
  [Share — icon]

[ABOUT]
  Short bio from shop. Years in business. Team size.

[SERVICES & PRICING]
  Service cards — each with:
    Service name (e.g., "Full Vehicle Wrap")
    Starting from price
    Typical turnaround
    [Book This Service →]

[BRANDS THEY WORK WITH]
  Logo row of brand partners

[PORTFOLIO — masonry grid]
  Their best completed builds
  Each tappable → full post with parts list
  "AI Render → Reality" paired posts (before render / after install)

[AVAILABILITY CALENDAR]
  Simple month view, green = available, grey = booked
  Tap available day → booking flow begins

[REVIEWS]
  Sortable: Most Recent / Highest / Lowest / With Photos
  Each review: star rating, car type, build done, text, photos
  Verified purchase badge

[LOCATION]
  Embedded map
  Address, hours, parking notes

[SIMILAR SHOPS]
  3 other Zeno Certified shops in the area
```

### 6.3 Booking Flow (consumer side)

This is the core commerce moment — user goes from design to booked appointment.

```
STEP 1 — SELECT SERVICE
  User selects which service(s) they want
  Pre-populated from their AI render if arriving from Studio
  Can add/remove services

STEP 2 — YOUR DESIGN
  Shows the AI render they created
  "This is what you're booking"
  Parts list confirmation (which products to use)
  "Change design" option

STEP 3 — SELECT DATE & TIME
  Calendar view of shop availability
  User picks preferred slot
  "Flexible" option for shop to confirm best time

STEP 4 — YOUR DETAILS
  Name (pre-filled from profile)
  Phone number
  Car details (pre-filled from Garage)
  Notes to shop (optional text area)
  "How did you design this?" — select from: AVACAR Feed, Designed it myself, Shop recommendation

STEP 5 — QUOTE & DEPOSIT
  Shop's itemized quote (auto-generated from selected services)
  OR "Awaiting shop quote" if custom work
  Deposit amount (typically 20–50%, shop sets this)
  Payment via Stripe
  "Place Booking" — cyan, full width

CONFIRMATION SCREEN
  Booking reference number
  Shop contact details
  "Add to Calendar" button
  "Share your upcoming build" → pre-written social post
  Deep link back to Feed
```

---

## 7. TRAINING & CERTIFICATION (`/marketplace/training`)

This is the professional development layer. Shops and aspiring installers come here to learn, get certified, and advance their careers.

**This section is inspired by platforms like Skillshare, TWI (The Wrap Institute), and Coursera — but built into the AVACAR ecosystem.**

### 7.1 Training Landing Page

```
[HERO]
  "Level Up Your Skills"
  "Courses from industry experts. Certifications recognized by brands."

[CATEGORIES]
  [Wrap Installation Basics]
  [Advanced Wrap Techniques]
  [PPF Installation]
  [Window Tint]
  [Ceramic Coating]
  [Business & Operations]
  [AI Tools for Shops]  ← AVACAR-specific

[FEATURED COURSE]
  Big editorial card with instructor photo, course name, rating, price

[COURSE GRID]
  Filterable by category, skill level, price, duration
```

### 7.2 Course Card

```
[Course thumbnail image]
[Category chip]
[Course title]
[Instructor: [Name] · [Credential]]
[★ X.X · X students]
[Duration · Skill level]
[Price: $XX] or [Free] or [Included with Pro Account]
[Enroll →]
```

### 7.3 Course Page

```
[HERO VIDEO — course trailer autoplay, muted]
[Course title + subtitle]
[Stats: X students · X lessons · X hours · Certificate included]
[Enroll Now — $XX — cyan CTA]
[Preview course syllabus — expandable list of lessons]

[INSTRUCTOR BIO]
[WHAT YOU'LL LEARN — 4-6 bullet outcomes]
[CURRICULUM — full lesson list with durations]
[REVIEWS]
[FAQ]
```

### 7.4 Certification System

AVACAR offers three certification tracks — recognized by partner brands (3M, Avery, XPEL, etc.):

| Certification | Prerequisite | Cost | Badge |
|---|---|---|---|
| AVACAR Installer Foundation | None | $199 | Bronze |
| AVACAR Certified Installer | Foundation cert | $399 | Silver |
| AVACAR Master Installer | 2yr experience + portfolio | $699 | Gold |

**Benefits of certification:**
- Badge displayed on shop profile
- Higher placement in shop search results
- Access to brand partner pricing
- Listed on brand websites as certified installer
- Included in AVACAR "Premium Shops" filter

---

## 8. CART & CHECKOUT (`/marketplace/cart`)

### 8.1 Cart Page

```
[Cart header: "Your Cart (X items)"]

[CART ITEMS — each row:]
  [Product image — 60px square]
  [Product name · Variant (color/size)]
  [Brand name]
  [Qty selector: − 1 +]
  [Price]
  [Remove ×]

[SAVED FOR LATER — collapsed section]

[ORDER SUMMARY]
  Subtotal
  Shipping (calculated at checkout)
  Tax (calculated at checkout)
  [Promo code field]
  [Total]

[CHECKOUT — cyan, full width]
[Continue Shopping — ghost]

[INSTALLATION ADD-ON — card below cart]
  "Want this professionally installed?"
  [Find a Zeno Shop Near You →]
  Selecting this adds to the booking flow post-checkout
```

### 8.2 Checkout Flow

Standard Stripe-powered checkout. Mobile-optimized.

Steps:
1. Shipping address (auto-fill from profile)
2. Shipping method (Standard / Express / Overnight)
3. Payment (Stripe — card, Apple Pay, Google Pay)
4. Order review
5. Place order → confirmation

**Post-checkout:**
- Order confirmation email with tracking
- "Visualize your order" CTA → opens Design Studio with purchased products pre-loaded
- "Find an installer" CTA → /marketplace/shops filtered to products bought
- Order tracked in Profile → Orders tab

### 8.3 Revenue Split Model

| Sale Type | AVACAR Cut | Brand/Vendor Gets |
|---|---|---|
| Product sold via AVACAR (affiliate) | 8–15% | 85–92% |
| Product sold directly on AVACAR | 20–30% | 70–80% |
| Service booking deposit | 10% | 90% |
| Supply/bulk order (Pro) | 5–10% | 90–95% |
| Course sale | 30% | 70% |

---

## 9. USER ACCOUNT TIERS

Three tiers govern what features are available and at what price.

### Consumer (Free)
- Browse full catalog
- Visualize on My Car (5 free generations/month)
- Save to wishlist
- Standard checkout
- Book shops
- Access training (free courses only)

### Consumer Pro ($9.99/month)
- Unlimited AI generations
- Priority shop booking
- Early access to new products
- Access to all training courses
- No AVACAR commission on builds shared to feed
- Pro badge on profile

### Shop / Professional (Free to apply, Zeno Certified required)
- Access to /marketplace/supplies
- Wholesale pricing on supplies
- Unlimited AI renders for client presentations
- Shop profile and booking management
- Analytics dashboard
- Customer-facing booking page
- Training courses included

---

## 10. DESIGN SYSTEM NOTES FOR MIRMI

These are specific UI rules for the Marketplace screens that extend the Design System v2.

### Navigation
- Add **Marketplace** to the bottom nav (5th tab replacing Profile, move Profile into top-right avatar tap)
- Bottom nav becomes: Feed · Explore · Studio · Garage · Shop
- OR keep Profile and add Marketplace as a 6th item in sidebar only (desktop), accessible from Feed via top-right cart icon

Recommendation: **cart icon in top bar (mobile) + Marketplace in desktop sidebar**. Don't crowd the bottom nav.

### Product Images
- Always square (1:1) in grid views
- White or neutral background for product shots
- Hover/tap: scale 1.02, 200ms transition
- Color swatches: 20px circles, 3px gap, active state has cyan ring

### Price Display
- Always show "from $XX" for products with variants
- Show full price range "$XX – $XX" when useful
- Never hide the price — this is a commerce platform
- Sale prices: strikethrough original in `on-surface-variant`, sale price in red

### Empty States
- Empty cart: large cart icon, "Your cart is empty", "Browse Products" cyan CTA
- No shops found: map with no pins, "No shops in this area yet", "Be the first — Apply to join" CTA
- No products match filter: "Try removing some filters", show 3 suggested products

### Loading States
- Product grid: skeleton cards (2 columns, matching card shape)
- Product images: shimmer placeholder at correct aspect ratio
- Map: skeleton map tiles with pulsing pin placeholders

### Mobile-Specific Rules
- Filters are always a bottom sheet (slides up), never a sidebar on mobile
- Cart icon in top bar shows badge count when items in cart
- Checkout is a full-screen flow (no nav, no sidebar — same treatment as Studio)
- Product image gallery is swipeable with dot indicators
- "Visualize on My Car" button is always sticky at bottom of product page on mobile

---

## 11. BUILD ORDER FOR MIRMI

Don't build everything at once. This is the correct sequence:

**Phase 1 — Structure (build this now)**
1. Marketplace nav item + landing page skeleton
2. Product catalog page with filters and grid
3. Single product page with gallery, variants, add to cart
4. Brand storefront page (template — one brand)
5. Cart page

**Phase 2 — Shop Network**
6. Shop finder page (list view first, map view second)
7. Shop profile page
8. Booking flow (all 5 steps)

**Phase 3 — Supplies & Training**
9. Professional supplies catalog (reuses product catalog template)
10. Training landing page + course cards
11. Individual course page

**Phase 4 — Pro Accounts & Checkout**
12. Stripe checkout integration
13. Pro account signup flow
14. Order confirmation + tracking

---

## 12. KEY PHRASES & COPY GUIDELINES

The Marketplace voice should be confident and knowledgeable — like a friend who knows cars deeply, not a generic e-commerce store.

| Generic (don't use) | AVACAR voice (use this) |
|---|---|
| "Add to cart" | "Add to Cart" (same, just confident) |
| "Product description" | omit the label entirely |
| "Find a service provider" | "Find a Zeno Certified Shop" |
| "Complete your purchase" | "Place Order" |
| "Thank you for your order" | "You're all set. Here's what happens next." |
| "No results found" | "Nothing here yet — try adjusting your filters" |
| "Error processing payment" | "Something went wrong with your payment. Try again or use a different card." |
| "Subscribe to newsletter" | "Get build inspiration weekly" |

---

*End of AVACAR Marketplace & Shop Network Specification v1.0*  
*Start with Phase 1. Send screenshots after each phase for review before proceeding.*
