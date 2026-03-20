# AVACAR — Specification Addendum v2.1

**Additions to:** AVACAR Unified Platform UX Specification v2.0
**Focus:** Design Studio, Design Marketplace, AI Design Generation, Shop Portal, and additional missing features
**Last Updated:** March 9, 2026

---

## Table of Contents

A1. [Design Studio (Canvas Mode)](#a1-design-studio-canvas-mode)
A2. [Design Marketplace (Full Storefront)](#a2-design-marketplace-full-storefront)
A3. [AI Design Generation](#a3-ai-design-generation)
A4. [Shop Portal (Certified Shop Dashboard)](#a4-shop-portal)
A5. [Installation Tracking](#a5-installation-tracking)
A6. [Material & Film E-Commerce](#a6-material--film-e-commerce)
A7. [AR Camera Preview](#a7-ar-camera-preview)
A8. [Referral & Rewards Program](#a8-referral--rewards-program)
A9. [Community Events & Challenges](#a9-community-events--challenges)
A10. [Updated Screen Map](#a10-updated-screen-map)
A11. [Updated Phasing](#a11-updated-phasing)

---

## A1. Design Studio (Canvas Mode)

### Why This Matters

The current AVACAR spec treats the configurator as a shopping experience — pick a product tile, get a quote. That's enough for casual users who want "Satin Black on my M4." But it completely misses the **creative tool** that IS Zeno today. The Design Studio is what transforms AVACAR from a quoting tool into a creative platform.

The name AVACAR is a play on "avatar" — your car is your avatar, your expression. The Design Studio is where that expression happens.

### Who Uses the Design Studio

- **Enthusiasts** who want to design a custom livery, race-inspired wrap, or unique look
- **Designers/Creators** who build and sell designs on the marketplace (creator economy)
- **Commercial clients** who need a branded vehicle wrap (plumber van, food truck, delivery fleet)
- **Wrap shops** who use it as a client-facing design tool (replacing Illustrator/Photoshop in-meeting)

### Entry Points

The Design Studio is a **mode within the Customize step**, not a separate flow. Users reach it by:

1. **From Customize screen:** Tap a "Design Studio" toggle/button that switches from product-tile-picker to canvas mode
2. **From a purchased marketplace design:** "Edit This Design" opens it in the studio
3. **From a saved build:** "Edit Design" in the Garage
4. **From a post:** "Remix This Build" in the social feed (loads the design in the studio for modification)

### Interface Layout

The Design Studio is a **fullscreen experience** — the bottom tab bar hides, the top bar minimizes to just a back button and save/export actions. Maximum screen real estate for the canvas.

#### Desktop / Tablet Layout (Landscape)

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back │ DESIGN STUDIO │ Undo Redo │ Save │ Share │ Export     │
├───────┬─────────────────────────────────────────┬───────────────┤
│       │                                         │               │
│ Tools │                                         │  Layer Panel  │
│       │                                         │               │
│ [Color│         VEHICLE CANVAS                  │  D022 - LOGO  │
│  Pick]│                                         │  D021 - STRIPE│
│       │     [3D vehicle with applied             │  D020 - TEXT  │
│ [Text]│      design, interactive,                │  D019 - BG    │
│       │      rotatable]                          │               │
│ [Decal│                                         │  [+ New Layer]│
│  Lib] │                                         │  [Group]      │
│       │                                         │  [Mirror]     │
│ [Shape│                                         │               │
│  Tool]│                                         │               │
│       │                                         │               │
│ [Import│                                        │               │
│  ]    │                                         │               │
│       │                                         │               │
│ [AI ✨]│                                        │               │
│       │                                         │               │
├───────┴─────────────────────────────────────────┴───────────────┤
│ Decal Library: [▢] [△] [★] [🏁] [🔥] [arrows] [stripes] ...   │
│ Category: ALL ▾  │  Tags: ALL ▾  │  Search...  │  Import       │
└─────────────────────────────────────────────────────────────────┘
```

#### Mobile Layout (Portrait)

On mobile, the Design Studio is simplified but still functional:

```
┌──────────────────────────────────┐
│ ← │ STUDIO │ Undo │ Save │ ⋮    │
├──────────────────────────────────┤
│                                  │
│                                  │
│      VEHICLE CANVAS              │
│      (pinch-zoom, rotate,        │
│       drag to pan)               │
│                                  │
│                                  │
├──────────────────────────────────┤
│ [Color][Text][Decal][AI✨][More] │  ← Tool bar (horizontal scroll)
├──────────────────────────────────┤
│                                  │
│  Context panel:                  │
│  - If Color selected: picker     │
│  - If Decal selected: library    │
│  - If Text selected: input +     │
│    font picker                   │
│  - If AI selected: prompt input  │
│  - Layers: swipe up sheet        │
│                                  │
└──────────────────────────────────┘
```

### Core Tools

#### 1. Base Color & Finish

The foundation layer. Before any decals, the user sets the vehicle's base wrap color and finish.

- **Color picker:** Full spectrum picker with hex input (same as Zeno today)
- **Finish selector:** Gloss | Satin | Matte | Chrome | Brushed | Carbon Fiber
- **Preset swatches:** Quick access to popular colors (Satin Black, Nardo Gray, Miami Blue, etc.)
- **Brand-matched colors:** "3M Satin Black" vs "Avery Satin Black" — select by manufacturer to match real-world films
- **Apply to:** All Sides | Current Side — option to have different colors per panel
- **Coverage:** Full Body | Partial (same coverage chips from the configurator wraps tab)

#### 2. Decal Library

A browsable, searchable library of pre-made graphic elements that users drag onto the vehicle canvas.

**Categories:**
- Geometric: Stripes, arrows, chevrons, triangles, hexagons, dots
- Racing/Motorsport: Number plates, start grids, checkered patterns, racing stripes
- Abstract: Splatter, flow, fractal, wave patterns
- Commercial: Logo placeholder frames, contact info layouts, "Call Now" templates, QR code frames
- National: Flags, cultural patterns
- Nature: Flames, lightning, water, organic shapes
- Typography: Pre-designed text layouts ("POWERED BY", "RACING TEAM", etc.)

**Each decal:**
- Thumbnail preview in the library grid
- Tap to place on vehicle canvas at default position/size
- On canvas: drag to reposition, pinch to resize, rotate handle
- Properties: Width, Height, X position, Y position, Rotation, Opacity
- Color: Each element within the decal can have its color changed (if the decal supports it — depends on how layers are grouped)

**Filtering:** Category dropdown + Tags dropdown + Free text search

**Import:** Upload custom SVG, PNG, or AI files to use as decals. These go into a "My Uploads" section of the library.

#### 3. Text Tool (Text-to-Vector)

Directly type text onto the vehicle surface. This is the feature that makes commercial wrap design possible without leaving the app.

- **Tap canvas to place text cursor** at a position
- **Text input field:** Type anything (company name, phone number, website, tagline)
- **Font selector:** Large font library (200+ fonts, curated for vehicle graphics). Categories: Sans-Serif, Serif, Script, Display, Stencil, Racing, Handwritten
- **Custom font upload:** Upload .ttf or .otf files
- **Properties:** Font size, weight, color (picker), letter spacing, line height, alignment
- **Convert to Vector:** Button that converts the live text into an editable vector decal on the canvas — this means it can be moved, scaled, and grouped just like any decal, but originally came from typed text
- **Pre-made text layouts:** "PHONE: ___", "WEBSITE: ___", "EST. 20__" — tap to place, edit the text

#### 4. Shape Tool

Basic vector shapes for quick design building blocks:
- Rectangle, Rounded Rectangle, Circle, Triangle, Line, Star, Polygon
- Properties: Fill color, stroke color, stroke width, corner radius, opacity
- Drag to draw on canvas, resize with handles

#### 5. Layer Management

Every element on the canvas is a layer. Layers can be grouped, reordered, locked, hidden, or deleted.

**Layer panel (right side on desktop, bottom sheet on mobile):**
- List of all layers, top to bottom (top = front, bottom = back)
- Each layer row: Visibility toggle (eye icon), Lock toggle (lock icon), Name, Delete (X)
- Tap layer to select it on canvas
- Drag layers to reorder
- **Group:** Select multiple layers → "Create Group" — grouped elements move/scale together. Critical for commercial designs where a logo might be 3 separate colored elements that must stay together
- **Ungroup:** Break a group back into individual layers
- **Mirror:** Apply the current side's design to the opposite side of the vehicle (left ↔ right). Toggle: "Mirror" on/off. When on, changes to one side auto-apply to the other.

**Layer naming:** Auto-generated (D001, D002...) but user can rename by tapping the name.

**Layer properties (when selected):**
```
Width:    115.17 cm
Height:   125.41 cm
X:        33.17
Y:        31.6
Rotation: 0°
Opacity:  100%
```

#### 6. AI Design Generator (Magic Wand — `✨`)

The AI tool within the Design Studio. User describes what they want, AI generates it.

**Prompt input:** "Create a racing livery with blue and white stripes and a large number 7"

**Flow:**
1. User taps the AI tool (sparkle icon)
2. Prompt input field appears (full-width, with mic button for voice)
3. User types or speaks their design description
4. Optional: Select style tags (Racing | Minimal | Commercial | Abstract | Camo | Artistic)
5. "Generate" button
6. AI generates 2-4 design variations (displayed as a grid of thumbnails)
7. User selects one → it's applied to the vehicle as a set of layers
8. User can edit, recolor, reposition any element after generation
9. "Regenerate" button to try again with the same or modified prompt

**Under the hood:** This uses the Nano Banana / Gemini pipeline to generate a wrap design, which is then vectorized and separated into layers for the canvas. If full vectorization isn't available yet, it can be applied as a single rasterized layer that the user can reposition and scale.

**Commercial template mode:** For commercial wraps (vans, trucks), the AI pre-fills placeholder elements:
- "[YOUR LOGO HERE]" — replaceable placeholder
- "[PHONE NUMBER]" — editable text
- "[WEBSITE]" — editable text
- "[SERVICES LIST]" — editable text block

The user replaces these with their actual business info using the Text Tool. This is the "ready to go with quick few touches" experience from our marketplace discussions.

#### 7. Vehicle View Controls

- **Rotation:** Swipe/drag to rotate the 3D vehicle
- **Zoom:** Pinch or scroll to zoom in/out
- **View presets:** Side | Front | Rear | ¾ | Top-down | 360°
- **Current Side indicator:** Shows which panel/side is active for editing
- **Environment toggle:** Change the background scene (parking lot, showroom, street, studio white)

#### 8. Export & Production

For users who want to take their design to a real wrap shop:

- **Share to Feed:** Post the render to the social feed
- **Save to Garage:** Save the design to user's garage
- **Download Image:** High-res render (4K) as PNG/JPEG
- **Download Video:** 360° spin video of the design
- **Export Production Files:** (Premium/paid feature) Export vector files (SVG/AI/PDF) with layer separation, panel measurements, and print specifications. This is what wrap shops need to actually produce the wrap.
- **Get Quote:** Jump to the Quote flow with the design pre-loaded, priced based on complexity (full wrap + decals + coverage area)

### Design Studio — Design Principles

- **Non-destructive:** Every edit can be undone. Layers preserve original elements. Nothing is flattened until export.
- **Vehicle-aware:** Decals wrap around the vehicle's 3D contours. Elements placed on the hood curve with the hood. This is Zeno's core technology.
- **Real-time preview:** Every change (color, decal position, text edit) updates the 3D render instantly.
- **Progressive complexity:** A casual user can just pick a base color and one decal. A power user can build a 50-layer commercial livery. The interface accommodates both without overwhelming either.
- **Touch-first, desktop-enhanced:** Works on mobile (simplified) but shines on tablet/desktop where screen real estate allows the full panel layout.

---

## A2. Design Marketplace (Full Storefront)

### Overview

The current spec's Phase 5 ("Sell Your Designs") only covers publishing designs as templates. It's missing the entire BUY side — the storefront where users discover, preview, and purchase designs from creators. This is the WrapStock competitor.

### Marketplace Screen (Consumer Side)

Accessible from: Explore tab → "Design Store" section, or dedicated tab in future nav expansion.

#### Browse & Discovery

**Hero Section:**
- Featured designs carousel (editorial picks, weekly highlights)
- "New This Week" row
- "Popular This Month" row

**Category Navigation:**

By Vehicle Type:
- Cars (Compact, Sedan, SUV, Sports, Luxury, Classic)
- Commercial (Small Van, Medium Van, Box Truck, Food Truck, Delivery, Service)
- Specialty (Race Car, Drift Car, Show Car, Off-Road, Motorcycle)

By Application:
- Full Wraps (complete coverage)
- Partial Wraps (¾, half, quarter)
- Accent Kits (stripes, roof, hood, pillars, mirrors)
- Decal Kits (graphics packages)
- Commercial Templates (business branding)

By Style:
- Racing/Motorsport (Rally, Track/GT, Drift, Touring, Vintage)
- Urban/Street (Graffiti, Camo, Geometric, Minimalist)
- Commercial/Professional (Corporate, Service Industry, Retail, Food, Medical)
- Artistic/Creative (Illustrated, Abstract, Nature, Character)
- Specialty Finish (Color Shift, Chrome, Textured, Matte)

**Filters:** Price range, Rating (stars), Vehicle compatibility, New vs. Popular, Free vs. Paid

**Search:** Free text search across design names, tags, creator names, vehicle types

#### Design Card (In Grid)

Each design in the marketplace grid shows:
- Preview render image (design applied to a vehicle)
- Design name
- Creator: avatar + username
- Price (or "Free" badge)
- Rating: stars + review count
- Like count (heart)
- Vehicle compatibility badges (sedan, SUV, van, etc.)
- Application type badge (Full Wrap, Partial, Decal Kit)

Card styling: Same card system as social feed (`#111116` bg, `#1A1A22` border, 12px radius)

#### Design Detail Page

Tapping a design card opens the full detail:

**Hero:** Large render of the design on a vehicle. Swipeable gallery showing multiple angles (side, front, ¾, rear).

**Design Info:**
- Name, style tags, application type
- Creator section: avatar + username + "View Profile" + follow button + creator rating
- Price (large, bold, cyan) + "Buy This Design" CTA
- Rating: stars + written reviews
- Compatibility: list of vehicle types this design works on

**Description:** Creator's description of the design, inspiration, recommended colors/finishes.

**What's Included:**
- Checklist of deliverables: "Vector files (AI/SVG)", "Layer-separated", "Print-ready (TIFF)", "Editable text elements", "X decal groups"
- Coverage: "Full body wrap" or "Hood + roof accent" etc.

**Customization Preview:**
- Color variant swatches (if the creator published multiple colorways)
- "Try on My Car" button → loads the design in the configurator with user's vehicle photo
- "Edit in Design Studio" → opens design in studio after purchase for full customization

**Actions:**
- `[Buy This Design]` — primary CTA. Charges user, credits creator.
- `[Try on My Car]` — preview only (watermarked) before purchase
- `[Request Changes]` — opens custom commission flow (see below)
- `[Save to Wishlist]` — bookmark for later
- `[Share]` — share design link

#### Request Changes (Custom Commission System)

When a buyer likes a design but wants modifications, they can request changes directly from the creator.

**Flow:**
1. Buyer taps "Request Changes" on a design detail page
2. **Request form:**
   - Which design they're referencing (pre-filled)
   - What changes they want (free text): "Change the blue to red, replace the logo with mine, add my phone number"
   - Attach files if needed (their logo, reference images)
   - Budget range they're comfortable with (slider: $50 → $500+)
3. Request sent to the creator as a notification
4. **Creator responds** with:
   - Acceptance + their quoted price + estimated turnaround
   - OR counter-offer with different price
   - OR decline (they're busy)
5. **Buyer accepts** the quote → payment is held in escrow
6. **Creator delivers** the modified design → buyer reviews
7. **Buyer approves** → payment released to creator (minus platform commission)
8. If buyer rejects → revision cycle (up to 2 revisions included, then additional cost)

This creates a **bespoke design economy** within the platform. It's Fiverr for vehicle wrap design, embedded directly where the customer is already shopping.

#### Creator Dashboard (Seller Side)

Creators who publish designs need analytics and management tools:

- **My Designs:** List of published designs with status (Active, Draft, Under Review)
- **Sales Analytics:** Total revenue, sales per design, trending designs, conversion rate
- **Earnings:** Available balance, pending payments, payout history, payout method setup
- **Orders:** Incoming "Request Changes" commissions, active jobs, completed jobs
- **Reviews:** Read and respond to buyer reviews
- **Design Upload Flow:** (see below)

#### Design Upload / Publish Flow

**Step 1 — Upload Design Files:**
- Upload vector files (AI, SVG, EPS) or raster (TIFF, PNG at 300+ DPI)
- System validates file quality and dimensions
- If vector: auto-detects layers and groups
- If raster: flags as "non-editable" (buyers can't modify in studio)

**Step 2 — Configure Layers (Vector Only):**
- Map each layer/group to a category: Background, Primary Graphic, Secondary Graphic, Text (Editable), Logo (Replaceable), Accent
- Mark which elements are color-changeable by the buyer
- Mark which text elements are editable by the buyer
- Mark which elements are "replaceable" (e.g., logo placeholder)

**Step 3 — Set Details:**
- Design name
- Description + inspiration notes
- Category and tags (from the taxonomy above)
- Vehicle compatibility (multi-select)
- Application type (full, partial, accent, decal)

**Step 4 — Generate Previews:**
- System renders the design on 3-5 different vehicles automatically
- Creator can choose which to use as the listing images
- Creator can upload additional custom renders

**Step 5 — Set Pricing:**
- Price input (minimum $5, suggested ranges based on similar designs)
- Or "Free" toggle
- Optional: "Accept custom commissions?" toggle
- If yes: set minimum commission price

**Step 6 — Review & Publish:**
- Preview how the listing will look in the marketplace
- Submit for review (platform reviews for quality, appropriateness)
- Published after approval (or instantly if creator is verified/established)

#### Revenue Model

| Tier | Creator Gets | Platform Gets |
|------|-------------|---------------|
| Standard Creator | 70% | 30% |
| Verified Creator (50+ sales) | 75% | 25% |
| Top Creator (200+ sales) | 80% | 20% |

Custom commissions (Request Changes): Same split applied to the quoted price.

Free designs: Creator earns nothing directly, but builds followers and reputation. Platform uses free designs as user acquisition tools.

---

## A3. AI Design Generation

### Overview

AI isn't just a tool within the Design Studio — it's a platform capability that appears in multiple places.

### Where AI Appears

**1. In Design Studio (Canvas Mode):**
- The `✨` tool described in A1
- User prompts → design generated → applied as editable layers
- For power users and creators

**2. In Feed (One-Tap Apply):**
- "Try This Build on My Car" already exists
- NEW: "AI Suggest a Build" — user uploads their car, AI suggests a complete build (wrap color + design + wheels) based on the car's style and the user's taste (learned from likes and saved builds)

**3. In Explore (Prompt-to-Preview):**
- "Describe your dream build" input field at top of Explore
- User types: "Matte army green G-Wagon with black wheels and a subtle military stencil pattern"
- AI generates a preview render
- "Love it? Try it on your car →"

**4. In Commercial Templates (Auto-Generate Branding):**
- User enters: Business name, phone, website, services, logo upload
- AI generates 3-5 complete branded vehicle wrap designs
- User picks one → edits in studio → gets quote → books install

### AI Pipeline (Technical)

```
User Prompt
    ↓
Prompt Engineering Layer (adds vehicle context, style constraints)
    ↓
Nano Banana Pro API (generates rasterized design image)
    ↓
┌─── Path A: Quick Preview ───┐
│ Upscale (Real-ESRGAN/Topaz) │
│ Apply to vehicle as texture  │
│ Show in configurator         │
└─────────────────────────────┘

┌─── Path B: Production Ready ──┐
│ Upscale (Real-ESRGAN/Topaz)   │
│ Vectorize (image → SVG)       │
│ Auto-separate layers           │
│ Import to Design Studio        │
│ User edits freely              │
│ Export production files         │
└────────────────────────────────┘

┌─── Path C: Bulk Generation (Internal) ──┐
│ ComfyUI automation pipeline             │
│ 200-500 designs/day                     │
│ Cost: $0.10-0.50/design vs $100 manual  │
│ Feeds marketplace with starter library   │
│ Quality reviewed before publishing       │
└──────────────────────────────────────────┘
```

---

## A4. Shop Portal (Certified Shop Dashboard)

### Why This Is Missing

The v2 spec has a Brand Dashboard for wheel manufacturers (HRE, Vossen) but nothing for certified wrap shops. Shops are the fulfillment layer — they receive bookings, respond to quotes, do the actual work. They need their own portal.

### Shop Portal Access

- URL: `avacar.com/shop` or in-app at `/shop-dashboard`
- Login: Separate from consumer accounts. Shop admin account.
- Mobile-responsive but primarily desktop (shops work from computers)

### Shop Portal Screens

#### Overview Dashboard

- **Today's bookings:** List of appointments with customer name, vehicle, build summary, time
- **Pending quotes:** Customers waiting for final pricing (from the "Find a Shop → Book" flow)
- **Active jobs:** In-progress installations with status
- **Revenue this month:** Total booking value, completed vs. pending
- **Rating snapshot:** Current star rating + recent reviews

#### Bookings Management

- **Incoming requests:** New booking requests from AVACAR users
  - Each shows: Customer name, vehicle, build config (wrap + wheels + tint + etc.), estimated value range, requested date/time, customer's uploaded photo
  - Shop actions: `[Accept + Set Final Price]` | `[Suggest Alternative Time]` | `[Decline]`
- **Confirmed bookings:** Calendar view of upcoming appointments
- **History:** Past completed bookings

#### Quote Builder

When a shop accepts a booking request, they set the final quote:

- Pre-filled with customer's build config and estimated range
- Shop adjusts line items to their actual pricing
- Can add items the customer didn't include ("We recommend ceramic coating for $400")
- Can add notes ("We'll need the car for 3 days")
- `[Send Quote to Customer]` — customer receives notification with final pricing
- Customer can accept or decline

#### Portfolio Management

- Upload photos of completed work (organized by service type)
- Each portfolio entry: Before/after photos, vehicle info, services performed, optional price
- These photos appear on the shop's public profile in the consumer app
- Can tag AVACAR builds (link a completed photo to the original AVACAR booking)

#### Shop Profile Editor

- Business name, logo, description
- Address + map pin
- Hours of operation
- Services offered (checkboxes: wraps, tint, PPF, wheels, body kits, accessories, ceramic coating)
- Price tier: $ / $$ / $$$
- Team bios (optional)
- Certifications (3M Certified, XPEL Certified, etc.)

#### Reviews

- Read all reviews left by customers
- Respond publicly to reviews (builds trust)
- Flag inappropriate reviews for platform review

#### Analytics

- Monthly booking volume
- Revenue trend
- Most requested services
- Customer satisfaction score
- Repeat customer rate
- Average booking value
- Source: "How customers found you" (search, referral, branded page)

---

## A5. Installation Tracking

### The Gap

After a customer books a shop, the current flow ends at "Booking Confirmed!" The customer has zero visibility into what happens next. This is the Uber/DoorDash tracking experience applied to vehicle services.

### Flow (After Booking Confirmed)

**Customer sees in their Profile → Bookings:**

```
Active Booking: Elite Wraps Co.
Vehicle: 2024 BMW M4 Competition
Build: Satin Black Wrap · Vossen HF-5 · 20% Tint
────────────────────────────────────────────
Status: [████████░░░░░░░░░░] In Progress

Timeline:
✅ Booking Confirmed ................... Mar 10
✅ Final Quote Accepted ($5,200) ....... Mar 11
✅ Vehicle Drop-off .................... Mar 14, 9AM
🔵 Prep & Disassembly ................. Mar 14 (today)
○  Wrap Application ................... Mar 15-16
○  Wheel Installation ................. Mar 17
○  Tint Application ................... Mar 17
○  Final QC & Reassembly .............. Mar 18
○  Ready for Pickup ................... Mar 18, 5PM
```

**Shop updates status from their portal** by tapping the current step and marking it complete. Optionally attaches a progress photo at each step.

**Customer notifications:**
- Push notification when status changes
- "Your wrap application has started! [View progress photo]"
- "Your car is ready for pickup! [View final photos]"

**After pickup:**
- Customer prompted to: Leave a review, Post the build to their feed, Add to Garage
- "Post Your Build" auto-creates a feed post with the before/after photos

---

## A6. Material & Film E-Commerce

### The Opportunity

The configurator lets users select "Satin Black (3M 2080)" but there's no way to buy the actual film. For DIY users or shops that want to source material, this is a missed revenue opportunity.

### Implementation

**Within the Quote screen:**

Below the current quote summary, add a section:

```
────────────────────────────────────────────
Need the materials? Order direct.

3M 2080 Satin Black — 5ft × 60ft roll
$899  [Add to Cart]

XPEL Prime XR Plus — 20% — Pre-cut for BMW M4
$349  [Add to Cart]

Vossen HF-5 — 20×9.5 front, 20×10.5 rear — Satin Bronze
$3,200  [Add to Cart]
────────────────────────────────────────────
```

**E-commerce integration options:**
- Direct sales (AVACAR stocks and ships — high margin, high complexity)
- Affiliate links (link to manufacturer/distributor sites — low effort, commission revenue)
- Partner marketplace (verified distributors sell through AVACAR — marketplace model)

**V1 approach:** Start with affiliate links. When user taps "Buy Film," they're directed to the manufacturer's or a distributor's website with an AVACAR referral code. Revenue: 5-15% affiliate commission.

**V2 approach:** Build a proper materials marketplace where distributors list their inventory and AVACAR handles the transaction. Revenue: 10-20% marketplace commission.

---

## A7. AR Camera Preview

### Future Feature (Phase 3+)

**Concept:** Open camera → point at your parked car → see the wrap/wheels/modifications applied in real-time through AR.

**How it works:**
1. User selects a build (from configurator, feed post, or marketplace design)
2. Taps "See in AR" button
3. Camera opens with AR overlay
4. AI detects the vehicle in the camera frame
5. The selected modifications are overlaid in real-time as the user walks around the car
6. Tap shutter button to capture AR photo → save to gallery or post to feed

**Technical approach:** ARKit (iOS) + ARCore (Android) for vehicle surface detection. AI model for vehicle recognition and panel mapping. Shader-based overlay for wrap color/design application.

**Why it matters:** This is the ultimate "try before you buy" for consumers standing in front of their car in their driveway. It also generates incredible shareable content for the social feed.

**Deprioritized because:** AR vehicle recognition at this quality is technically challenging and not yet reliable enough for production. Spec it now, build it when the tech matures.

---

## A8. Referral & Rewards Program

### Why Include It

The social platform only grows if users invite other users. A referral program turns every satisfied customer into a growth channel.

### Mechanics

- Every user gets a unique referral code/link
- When a referred user signs up AND completes their first build (or booking): referrer earns credits
- Credits can be used toward: design purchases on the marketplace, material purchases, or service discounts at certified shops
- Tiers: Refer 5 friends → Silver status (5% discount). Refer 25 → Gold (10%). Refer 100 → Platinum (15% + early access to features).

### In-App Placement

- Profile screen: "Refer a Friend" section with unique link + share button
- Post-booking confirmation: "Share AVACAR with friends and earn credits"
- Garage: "Your referral stats" card

---

## A9. Community Events & Challenges

### Why Include It

Events and challenges drive engagement spikes, create content, and give people a reason to keep posting.

### Types

**Design Challenges (Weekly/Monthly):**
- "This week's challenge: Best Satin Black build"
- Users post their builds with a challenge hashtag
- Community votes (likes = votes)
- Winner gets: Featured on home feed, marketplace credits, badge on profile

**Car Meet Integration:**
- AVACAR-sponsored or community-organized car meets
- "RSVP" feature in app
- Post-event photo dump to feed
- "I was at [Event Name]" badge

**Brand Challenges:**
- Sponsored by partners (3M, Avery, HRE)
- "Design the best build using 3M 2080 Satin Dark Gray"
- Prize: Free wrap installation at a certified shop
- Drives awareness for both the brand and the platform

### In-App Placement

- Explore tab: "Active Challenges" section at top
- Feed: Challenge posts tagged with the challenge badge
- Profile: Earned badges from participated/won challenges

---

## A10. Updated Screen Map

Add these to the existing screen map from the v2 spec:

```
Consumer App (additions)
├── Design Studio (Canvas Mode) .............. A1
│   ├── Tool Bar (Color, Text, Decal, Shape, AI, Import)
│   ├── Vehicle Canvas (3D interactive)
│   ├── Layer Panel (groups, reorder, lock, hide)
│   ├── Decal Library (browse, search, filter)
│   ├── AI Generator (prompt → designs)
│   └── Export (image, video, production files)
│
├── Design Marketplace ...................... A2
│   ├── Browse (categories, filters, search)
│   ├── Design Detail (preview, buy, try on car)
│   ├── Request Changes (custom commission flow)
│   ├── Creator Dashboard (sales, earnings, orders)
│   ├── Design Upload (publish flow)
│   └── Wishlist
│
├── AI Design Features ...................... A3
│   ├── Studio AI Tool (prompt → layers)
│   ├── Explore AI Suggest ("describe your dream build")
│   └── Commercial Auto-Generate (business info → branding designs)
│
├── Installation Tracking ................... A5
│   ├── Active Booking Status (timeline + progress)
│   ├── Progress Photos
│   └── Post-Install Prompt (review + share)
│
├── Materials Shop .......................... A6
│   ├── Product Listings (film, wheels, accessories)
│   └── Cart → Checkout (or affiliate redirect)
│
├── Challenges & Events ..................... A9
│   ├── Active Challenges
│   ├── Challenge Detail (rules, entries, voting)
│   └── Car Meet Events (RSVP, photos)
│
└── Shop Portal (separate auth) ............ A4
    ├── Overview Dashboard
    ├── Bookings Management
    ├── Quote Builder
    ├── Portfolio Management
    ├── Shop Profile Editor
    ├── Reviews
    └── Analytics
```

---

## A11. Updated Phasing

Revised phasing incorporating Design Studio and marketplace:

### V1 — Commerce Engine
- Full product library (6 categories: Wraps, Wheels, Tint, PPF, Body Kits, Accessories)
- Accurate quoting + PDF export
- Shop fulfillment (booking flow)
- Basic Design Studio (color + finish picker on 3D vehicle — what Zeno already does for solid colors)

### V1.5 — Social Layer
- Social feed as home screen
- User accounts + profiles
- Likes + comments
- Post creation (real photos + renders)

### V2 — Creative Tools + Engagement
- **Full Design Studio (canvas mode with decals, text, layers, shapes)**
- **Design Marketplace (browse + buy + sell)**
- Budget Builds
- Avacar Garage
- Zeno Certified Shop onboarding
- **Shop Portal (certified shop dashboard)**
- **Installation tracking**

### V2.5 — AI + Creator Economy
- **AI Design Generation (Nano Banana integration in studio + explore)**
- **Request Changes (custom commission system)**
- Creator verification + tiered commissions
- Design challenges + community events

### V3 — Marketplace Expansion + Advanced
- P2P Marketplace (sell parts/accessories peer-to-peer)
- Material & Film E-Commerce (buy actual wrap film)
- B2B/B2C Consignment Marketplace
- Referral & Rewards Program
- AR Camera Preview
- Fleet management (business accounts with multiple vehicles)

---

*End of Addendum v2.1*
*Extends: AVACAR Unified Platform UX Specification v2.0*
*These sections should be integrated into the master spec as new chapters.*
