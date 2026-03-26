# AVACAR QC Report & Fix Instructions
## All Screens — March 2026

**From:** Hammad (Creative Director)  
**To:** Mirmi  
**Priority:** Complete ALL items marked 🔴 before showing any screen externally. Items marked 🟡 are important but can follow. Items marked 🟢 are polish — do last.

---

## GLOBAL ISSUES (apply to every screen)

These must be fixed everywhere before touching individual screens.

### G1 🔴 Product/build images are not loading
Almost every card across Feed, Explore, Marketplace, and Profile shows dark empty boxes instead of images. This is the single most damaging issue — the platform looks broken. 

**Fix:** Audit every image `src` reference in the codebase. Any external URL that is 404ing needs to be replaced with a reliable placeholder. Use `https://images.unsplash.com` for car photography placeholders — search terms like "car wrap", "modified car", "sports car" return good results. Every card that has an image slot must show something. Empty dark boxes are not acceptable in any QC pass.

### G2 🔴 AVA.CAR wordmark inconsistency
The logo renders differently across screens:
- Image 1 (Feed): `AVA.CAR` with a dot separator — correct and looks great
- Image 4 (Profile): `AVA.CAR` — correct  
- Image 5 (Marketplace): `AVA.CAR` — correct
- Earlier screenshots showed `AVAC`, `AV` truncated versions

**Fix:** The wordmark must be `AVA.CAR` — always, everywhere, never truncated. Lock the min-width of the logo container so it cannot collapse. The dot is part of the brand identity.

### G3 🔴 Studio button is completely non-functional
The Studio tab in the nav links to `/upload` which either 404s or shows the broken upload screen from before. This is the most important page on the platform and it does not work.

**Fix:** See Section 4 (Studio) below for the complete redesign spec. This must be prioritised as a standalone task immediately after the global fixes.

### G4 🟡 Right panel appears on screens where it should not
The "Trending Popular Builds" + "Builders to Follow" right panel shows on Garage, Profile, and Marketplace. This panel is appropriate for Feed and Explore only.

**Fix:**
- Feed: ✅ show right panel
- Explore: ✅ show right panel  
- Studio: ❌ no right panel (fullscreen experience)
- Garage: ❌ no right panel (replace with nothing — let content breathe)
- Profile: ❌ no right panel (replace with nothing)
- Marketplace: ❌ no right panel (replace with nothing — the page is wide enough without it)

### G5 🟡 Section overline labels need consistent treatment
Across all screens, overline labels ("AVACAR MARKETPLACE", "BROWSE BY CATEGORY", "NEAR YOU", "MY COLLECTION") are inconsistently sized, colored, and spaced.

**Fix:** All overline labels must follow one rule:
```css
font-size: 10px;
font-weight: 700;
letter-spacing: 0.2em;
text-transform: uppercase;
color: #007FFF;  /* cyan always */
margin-bottom: 6px;
```
Never use white or grey for overline labels. Cyan only.

### G6 🟡 Page-level top padding is too tight
On most screens the content starts immediately below the fixed header/filter bar with almost no breathing room. The first content element collides with the navigation chrome.

**Fix:** Every page's main content area needs `padding-top: 24px` minimum before the first element. On pages with a hero section, the hero itself provides this — don't double-pad.

---

## SCREEN 1: FEED (Image 1)

Overall: This is the strongest screen. The layout is correct, the right panel is working, the hero CTA is good. Specific fixes below.

### F1 🔴 Build style tiles have no images
"Street Stealth", "Chrome Royale", "Track Day", "Clean Luxury" — all four are dark rectangles. These need background car images at 25–35% opacity behind the text.

**Fix:** Add a background image to each tile. Suggested placeholder images:
- Street Stealth: dark matte black car, night photography
- Chrome Royale: chrome/silver car in studio lighting
- Track Day: race-spec car on track
- Clean Luxury: white or silver premium car in clean environment

Apply as CSS `background-image` with:
```css
background-image: url('...');
background-size: cover;
background-position: center;
```
Then overlay a semi-transparent dark gradient: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))` so text remains legible.

### F2 🔴 Trending build cards have no images
The five trending build cards (2023 Supra, 2022 GT500, 2021 M3, 2022 Civic Type R, 2023 RS7) are all dark empty cards. Same issue as G1 — wire in placeholder images.

### F3 🟡 Hero section feels generic
The headline "Design Your Dream Ride" with cyan accent on "Dream Ride" is good copy. But the section has no supporting visual — it's just text floating on the dark background. 

**Fix:** Add a subtle background element to the hero. Options in order of preference:
1. A faint cinematic car silhouette at very low opacity (15%) positioned to the right
2. A gradient blob/glow effect in deep blue that adds depth without distracting
3. A small, high-quality car thumbnail image positioned right of the text

The "Start Building" button gradient is correct. Keep it.

### F4 🟡 Trending card badge positioning
The "#1 TRENDING", "#2 TRENDING" etc. badges are centered in the card image area rather than anchored to the top. On cards with actual images these will overlay the content awkwardly.

**Fix:** Absolutely position the badge:
```css
position: absolute;
top: 10px;
left: 10px;
```
Not centered. Top-left corner, always.

### F5 🟡 Build style tile text hierarchy
The overline ("MATTE · DARK") and title ("Street Stealth") are close in visual weight.

**Fix:** 
- Overline: 9px, weight 500, letter-spacing 0.2em, opacity 0.6, uppercase
- Title: 18px, weight 700, no letter spacing
More size contrast between them creates the editorial feel.

### F6 🟡 "Ready to make it real?" section spacing
The Find Shops section at the bottom has good copy but the location pin icon, overline, headline, body, and CTA button feel vertically cramped.

**Fix:** Increase internal padding to `p-8` (32px). The section itself should feel premium — it's the moment a user commits to actually doing the build. Give it room.

### F7 🟢 Filter pill "All" active state is cyan
Correct color. However the inactive pills have a slightly visible border that creates a subtle line feel. 

**Fix:** Remove borders from inactive pills. Background `surface-container-high`, no border, no outline.

### F8 🟢 "See All" link on Trending Builds
The link exists which is good. Ensure it routes to `/explore?filter=trending` not just `/explore`.

---

## SCREEN 2: EXPLORE (Image 2)

Overall: Strong structure. Featured Builds grid is excellent. Trending Shops section at the bottom is a great addition that wasn't in the original spec — keep it. Image loading is the main issue.

### E1 🔴 Featured Build card images not loading
All six featured build cards (2023 GR86, 2022 M4 Comp, 2021 GT-R R35, 2023 WRX, 2022 RS6 Avant, 2023 Supra A90) show as dark empty rectangles. Same fix as G1 — wire in real car photography.

### E2 🔴 Trending Shop card images not loading
The four shop cards (WrapsbyAlex, CarbonWerks, RimCity, ArmorShield) show letter avatars with no background images. The letter avatar is a fine fallback, but the card itself should have a background showing their best work.

**Fix:** Each shop card should have a background image (their portfolio photo) at low opacity behind the letter avatar and info. If no real photo, use a blurred car photography placeholder.

### E3 🟡 Featured Build grid is not true masonry
The 2×3 grid is uniform height — all cards are the same size. This looks like a photo grid, not an editorial gallery.

**Fix:** Convert to true variable-height masonry. The spec calls for Pinterest-style layout where cards have different heights. Implementation options:
1. CSS `columns: 2` with `break-inside: avoid` on each card — simplest
2. CSS Grid with `grid-auto-rows` and explicit span values per card
3. Masonry JS library (Masonry.js via CDN)

Suggested height variation: first row cards taller (~280px), second row shorter (~200px), alternating. Never two adjacent cards the same height.

### E4 🟡 Category chip "BODY KITS" and "ACCESSORIES" truncating
These chip labels appear to be cut off on smaller viewports. 

**Fix:** Ensure the chip row is horizontally scrollable with `overflow-x: auto; white-space: nowrap` and `scrollbar-width: none`. Never truncate chip labels — scroll instead.

### E5 🟡 Featured Build card — price positioning
Price (e.g. "$1,400") is right-aligned at the bottom of the card. Good placement. But "Quote on request" on the M4 Comp card is in red/orange — this reads as an error state.

**Fix:** "Quote on request" should be in `on-surface-variant` (muted grey) or cyan, not red. Red signals error. Use:
```css
color: var(--on-surface-variant);
font-style: italic;
```

### E6 🟡 Build category chip on card (WRAPS, BODY KITS, TINT etc.)
The category badge is centered on the card image. It should be top-left or top-right, not centered — centered looks accidental.

**Fix:** Position absolutely, `top: 12px; left: 12px`. Give it a glassmorphic background:
```css
background: rgba(0,0,0,0.5);
backdrop-filter: blur(8px);
padding: 4px 10px;
border-radius: 999px;
font-size: 10px;
font-weight: 700;
letter-spacing: 0.1em;
text-transform: uppercase;
color: #fff;
```

### E7 🟡 Trending Shops section (new — great addition)
The shop cards show letter avatar, shop name, rating, review count, and city. This is good and follows the spec. Two issues:
1. Shop card corner radius is too sharp — use `border-radius: 1.5rem` to match the card system
2. The star icon color is yellow — on the dark background this is fine, but ensure it uses the design token `#EF9F27` (amber) not generic yellow

### E8 🟢 Explore page search bar
There are now two search bars — the global one in the top nav and a second one in the Explore page body. This is redundant.

**Fix:** Remove the in-page search bar on Explore. The global search bar handles all discovery. The space can be used for a featured editorial tagline instead, or simply removed to let the filter chips be the first element after the "Explore" headline.

---

## SCREEN 3: GARAGE (Image 3)

Overall: Good structure. The Vehicles list with car rows and Saved Builds section is clean. Main issues are missing images and the page feeling too sparse/incomplete.

### GA1 🔴 Vehicle cards have no images
Both car rows (2022 Toyota GR86, 2021 BMW M3 Competition) show a small cyan car icon as the only visual. These should show the actual car photo — either user-uploaded or a stock OEM photo pulled from a database.

**Fix:** 
- If user has uploaded a car photo: show it as a thumbnail (80×60px, `border-radius: 0.75rem`, `object-fit: cover`)
- If no photo uploaded: show an OEM stock image matched to year/make/model. Use a car stock photo API or hardcode placeholder images for mock data
- The cyan car icon fallback is acceptable only as a last resort, and should be much larger (48px) if used

### GA2 🔴 Saved Build thumbnails not loading
Both saved build rows (2022 GR86 Matte Black Wrap, 2021 M3 Carbon Kit + PPF) show a blurred/dark tiny thumbnail. The image is loading but appears corrupted or extremely dark.

**Fix:** Check the image source URL. The thumbnail should be the AI-generated render for that build — a clear, properly-lit 80×60px image. If the render isn't available, show the OEM car photo instead.

### GA3 🟡 Page is too sparse — bottom half is all empty space
After the two saved builds, there is a massive empty area. On a real populated account this would fill with more content, but even in the empty state it should feel intentional.

**Fix:** Add two elements below the saved builds:

1. **"Start a new design" prompt card:**
```
[✦ icon]
Design a new build
Pick a style preset and see your car transformed in 30 seconds
[Design My Car →] (cyan button)
```

2. **"Explore builds for your cars" section:**
Show 3–4 community builds that match the user's saved car makes (GR86 builds, M3 builds). Label: "INSPIRATION · FOR YOUR CARS". This creates a personalized feed within the Garage and keeps users engaged.

### GA4 🟡 "VEHICLES" and "SAVED BUILDS" section headers
These are plain white text labels with no visual weight distinction from the content below them.

**Fix:** Apply the global overline treatment (G5): 10px, cyan, uppercase, tracking-widest. Then the car name below it is 16px bold white. The contrast makes the sections readable.

### GA5 🟡 Saved build status badges
"Draft" (on the GR86 build) and "Quoted" (on the M3 build) are small pills on the right side of the row. These are a great detail. However:
- "Draft" is in a neutral grey — fine
- "Quoted" is in cyan — this competes with the cyan accent used for CTAs

**Fix:** 
- Draft: `background: surface-container-high`, `color: on-surface-variant`
- Quoted: `background: rgba(0,127,255,0.15)`, `color: #007FFF`, `border: 1px solid rgba(0,127,255,0.3)` — a cyan ghost pill, not solid cyan

### GA6 🟡 Price ranges on saved builds
"$1,400–$1,800" and "$4,200–$5,600" are in cyan. Good. However they should be slightly smaller than the build title to maintain hierarchy.

**Fix:**
- Build title: 14px, weight 600, `on-surface`
- Build spec (e.g. "Matte Black Wrap"): 12px, weight 400, `on-surface-variant`
- Price: 12px, weight 600, cyan

### GA7 🟢 "+ Add" button top right
The cyan "+ Add" button is correctly placed. Consider renaming to "+ Add Car" so the action is unambiguous. As a pill button it should have `padding: 8px 16px`, not just `padding: 8px 12px` — it looks slightly cramped.

### GA8 🟢 Build log / last modified metadata
The small metadata under each vehicle row ("1 build · 2 weeks ago", "2 builds · 1 month ago") uses a calendar icon and wrench icon. These are good details. Ensure both icons use the same size (14px) and the same `on-surface-variant` color. Currently the calendar icon appears slightly larger than the wrench.

---

## SCREEN 4: PROFILE (Image 4)

Overall: Massively improved from the settings page it was before. The portfolio grid is the right direction. Several structural issues remain.

### P1 🔴 Portfolio grid images are all dark/empty
All four build cards (Supra Build, GT500 Build, M3 Build, RS7 Build) show nearly black images with just a tiny gradient of color visible at the bottom. The images are not rendering.

**Fix:** Same as G1. Wire in car photography placeholders for each card. These portfolio cards should be visually stunning — they are the showcase of a user's work. Each card should show a crisp, well-lit car photo. This is the most important visual element on the Profile page.

### P2 🔴 No cover/hero photo
The profile starts immediately with the avatar circle and name. There is no cover photo — the background is just the plain dark page color.

**Fix:** Add a full-width cover photo above the avatar. Dimensions: `width: 100%`, `height: 180px` (desktop), `border-radius: 0` (edge to edge). The cover can be:
- User-uploaded
- One of their best build photos (auto-selected from portfolio)
- A default AVACAR branded gradient as fallback

The avatar should overlap the bottom edge of the cover by ~50% — positioned absolutely at `bottom: -28px; left: 24px`.

### P3 🟡 Stats bar lacks visual separation
The three stats (12 POSTS, 847 FOLLOWERS, 234 FOLLOWING) sit in a container with subtle dividers. The container background matches the page too closely — it blends in.

**Fix:** The stats container should use `background: surface-container-low` to lift it slightly from the page. Add `border-radius: 1rem` and `padding: 16px`. Each stat should be: number in 24px bold white, label in 10px uppercase `on-surface-variant` below it.

### P4 🟡 Portfolio grid cards need build metadata
Each card currently shows:
- Category label in cyan ("Matte Black Wrap", "Carbon Kit") — top-left, good
- Build name ("Supra Build") — bottom-left, good

But missing:
- Car year/make/model below the build name
- Like count and save count at bottom-right (small, muted)

**Fix:** Add to the bottom overlay of each card:
```
[Left] Matte Black Wrap    [Right] ❤ 342  🔖 28
       Supra Build
       2023 Toyota GR86
```

### P5 🟡 "Builds" and "Posts" tabs underline indicator
The active tab ("Builds") has a cyan underline which is correct. However the tab text size is too large (appears to be ~16px) and should be `title-sm` (14px, weight 600).

### P6 🟡 Follow button placement
The "Follow" button sits to the right of the avatar area, horizontally aligned near the middle of the profile header. It should be top-right of the content area, not floating mid-left.

**Fix:** The Follow button should be in the top-right of the profile header section, aligned to the same row as the settings gear icon. Settings gear: top-right corner. Follow button: immediately left of settings gear.

### P7 🟡 Profile grid is uniform height — not masonry
Same issue as Explore (E3). The 2-column grid has uniform card heights. The profile portfolio should feel like an ArtStation showcase, not a grid of identical tiles.

**Fix:** Use the same masonry treatment as Explore. Alternate between taller cards (~320px) and shorter cards (~200px). The first card in each column should be the same height; subsequent cards alternate.

### P8 🟢 Bio text emoji
The bio "Car enthusiast. Building dreams one wrap at a time. 🚗" uses an emoji. This is fine for placeholder copy but the emoji appears slightly large next to the text. Ensure emoji renders at 14px matching the body text.

### P9 🟢 Settings gear icon
Top-right gear icon for profile settings is correct. Ensure it routes to a settings page, not the profile edit page — those are two different things. Profile edit (name, bio, photo) should be a separate modal or `/profile/edit` route. Settings (dark mode, notifications, account) is `/settings`.

---

## SCREEN 5: MARKETPLACE (Image 5)

Overall: The best screen in terms of following the spec. The hero image fix worked — the BMW behind the headline looks excellent. The community build section now has a real image (BMW at sunset) which is beautiful. The Find a Shop section at the bottom is correct. Remaining issues are mostly polish.

### M1 🔴 Trending product card images still showing broken icons
The five product cards in "Trending Products" show a grey settings/gear icon (⚙) as a placeholder instead of actual product images. Avery SW900 Gloss Nardo Gray showing a gear icon is not acceptable.

**Fix:** Replace the gear icon placeholders with proper color swatch representations. For vinyl/wrap products:
- Show a solid color rectangle matching the product color (Nardo Gray = `#6E6E72`, Matte Black = `#1a1a1a`, Gloss Black = `#0d0d0d`)
- Add a subtle gloss/texture overlay to differentiate matte vs gloss vs satin finishes
- For wheels (HRE FF15, HRE P101): use a wheel silhouette image or a clean grey placeholder with the brand initials

### M2 🔴 "Browse By Category" — Wraps chip icon is missing
The first category chip has an icon area that shows nothing (empty space before "Wheels"). Check the icon import for the Wraps chip.

**Fix:** Use a consistent icon approach across all category chips. Recommended: Material Symbol icons inside each chip. `palette` for Wraps, `tire_repair` for Wheels, `shield` for PPF, `wb_sunny` for Tint, `car_repair` for Body Kits, `category` for Accessories, `school` for Training.

### M3 🟡 Hero section — text over image readability
The BMW image behind the headline is great. However on the headline "Everything Your Car Needs" the white text has limited contrast against the lighter parts of the car image (the headlights area).

**Fix:** Strengthen the dark gradient overlay behind the text:
```css
background: linear-gradient(
  to right,
  rgba(0,0,0,0.85) 0%,
  rgba(0,0,0,0.6) 50%,
  rgba(0,0,0,0.1) 100%
);
```
Text lives in the left 50% of the hero — make the left side very dark while the right side shows the car clearly.

### M4 🟡 "Shop by Style" tiles have images but they're too dark
The four aesthetic tiles (Clean OEM+, Full Send JDM, Euro Spec, Track Monster) now have faint background images — this is correct and much better than solid colors. But the images are barely visible, appearing at ~10% opacity when they should be ~25–35%.

**Fix:** Increase the background image opacity. The image should be clearly recognizable as a car and that aesthetic, with the dark gradient overlay ensuring text legibility. Target: `opacity: 0.35` on the image layer.

### M5 🟡 Community Build section is fixed — minor issues remain
The BMW at sunset image is beautiful and loading correctly. Two small issues:

1. The "This build used:" label and product chips below the image are in a plain left-aligned row. Add more spacing between the image and these product tags — currently they feel attached to the image.

**Fix:** Add `margin-top: 16px` between the build image and the "This build used:" section. The product chips should use the standard chip treatment: `surface-container-high` background, `on-surface-variant` text, pill shape.

2. The build attribution "@wrapsbyalex · 2024 BMW M4" and "Satin Black + HRE FF15" headline are overlaid on the image bottom-left which is correct. However the font weight on "Satin Black + HRE FF15" is too light — increase to 700.

### M6 🟡 Featured Brands — letter circles need brand colors
The brand abbreviation circles (3M, Av, HR, XP, Vo, Ro, BB, He) all use the same blue gradient. Each brand should have its own color.

**Fix:**
- 3M: `#FF0000` (3M red)
- Avery Dennison: `#004B8D` (Avery blue)  
- HRE Wheels: `#1a1a1a` (matte black, gold text)
- XPEL: `#000000` (black)
- Vossen: `#C9A84C` (gold)
- Rotiform: `#2d2d2d` (dark grey)
- BBS: `#CC0000` (BBS red)
- Hexis: `#003087` (dark blue)

### M7 🟡 "Find a Shop" section — input field styling
The "Enter your city or postal code..." input field has a light border that violates the No-Line Rule from the design system.

**Fix:** Remove the border. Set the input background to `surface-container-high` (the solid fill treatment). On focus, shift background to `surface-container-highest` with a cyan glow ring:
```css
background: var(--surface-container-high);
border: none;
border-radius: 1rem;
padding: 14px 18px;
outline: none;
```
Focus state: `box-shadow: 0 0 0 2px #007FFF40`

### M8 🟡 "Browse Supplies" and "Browse Training" CTAs at bottom
These two are rendered as plain text links at the very bottom. They need to be proper ghost buttons.

**Fix:**
```
[Browse Supplies]   [Browse Training]
```
Each as a ghost pill button: `border: 1px solid rgba(255,255,255,0.15)`, `border-radius: 999px`, `padding: 10px 24px`, `font-size: 13px`, `font-weight: 600`, `color: on-surface-variant`. On hover: border brightens to `rgba(255,255,255,0.3)`, background `rgba(255,255,255,0.05)`.

### M9 🟢 Section spacing
"What's Hot Right Now" → "Trending Products" and "Shop by Style" → "Find Your Aesthetic" all have good spacing. The one exception is between the Community Build image and the Find a Shop section — these feel slightly merged. Add `margin-top: 48px` between them.

### M10 🟢 "See all →" links
Several sections have "See all →" links in the top right. These are correctly styled in cyan. Ensure the arrows are `→` (→) not `>` (>) — the arrow is more premium.

---

## SECTION 4: STUDIO — COMPLETE REDESIGN SPEC

This screen is currently broken and must be rebuilt from scratch. The existing upload screen does not reflect the AVACAR brand or the design system at all.

The Studio is the most important screen on the platform. It is where the magic happens. It must feel like stepping into a portal — immersive, focused, no distraction.

### Studio Overview

The Studio is a **fullscreen, modal-style experience** — when a user enters it, the sidebar and all navigation disappear. The user is in a creative space. Exiting returns them to where they came from.

### Studio: Step 1 — Upload / Select Car

**Full screen. Dark background `#0C0C10`.**

```
[← Back arrow — top left, small, ghost]

[Progress stepper — top center]
  ● DESIGN  ——  ○ STYLE  ——  ○ GENERATE
  (dots connected by thin lines, active = cyan solid, inactive = grey hollow)

[Large centered content area]

  [Car silhouette illustration — SVG, ~200px wide, cyan tinted, very subtle]
  
  [Headline: "Upload Your Car"]          ← 28px, bold, white
  [Subhead: "We'll transform it in seconds. Side angle works best."]  ← 14px, muted
  
  [Primary button — full width, gradient, pill]
    📷  Take a Photo
  
  [Secondary button — ghost, full width, pill]
    🖼  Choose from Gallery
  
  [OR divider — thin line, "or" label centered, muted]
  
  [Tertiary option — text only, centered]
    → No photo? Pick a car from our database
  
  [Bottom tip card — surface-container-low, rounded-xl, subtle]
    💡  For best results
    Clear side or ¾ angle · Good daylight · No obstructions · Single car in frame
```

**Remove entirely:**
- The dashed border dropzone
- Any form-style container
- The "For best results" info block with the blue icon that looks like a material design card

### Studio: Step 2 — Style Selection

After uploading a car photo, the screen transitions to Style Selection.

```
[← Back]    [Step 2 of 3: STYLE]    [Skip →]

[Car photo — centered, large, ~60% of screen height]
[Subtle rounded corners: border-radius: 1.5rem]

[Scroll-up bottom panel:]

  [Section label: PRESETS]
  [Horizontal scrollable preset chips:]
    [Clean OEM+] [Full Send JDM] [Euro Spec] [Track Monster] [Luxury Stealth] [Slammed]

  [Section label: WRAPS — horizontal scrollable product chips]
    [3M Satin Black] [Avery Nardo Gray] [KPMF Rose Gold] [Inozetek Gloss Red] → + more

  [Section label: WHEELS — horizontal scrollable]
    [HRE FF15] [Vossen CV3] [BBS CH-R] → + more

  [Section label: ADD-ONS]
    [Chrome Delete ✓] [PPF Full] [Ceramic Tint 20%]

  [GENERATE button — full width, large, cyan gradient, 56px height, pill]
    ✦  Generate My Build
```

### Studio: Step 3 — Results

After generation (show skeleton loading for 3–8 seconds with progress bar):

```
[← Back to style]    [Generated Builds]    [Save All]

[3 result cards — horizontal swipeable row]
  Each card: 
    [Generated car image — 16:9]
    [Build label: "Option 1 — Clean OEM+"]
    [Parts used: chips]
    [Select this build →]

[Selected build — expanded below:]
  [Full-width image]
  [Part chips with prices]
  
  [Two action buttons:]
    [💾 Save to Garage]    [📤 Post to Feed]
  
  [Third action — below, most important:]
    [🔮 Get This Built — Find a Zeno Certified Shop Near You]
    → This is a full-width cyan gradient button
    → Routes to /marketplace/shops pre-filtered to selected services
```

---

## SUMMARY — PRIORITY ORDER FOR MIRMI

### Do immediately (before anything else):
1. Fix all broken images globally (G1) — this affects every single screen
2. Fix Studio routing — the Studio tab must go somewhere functional (G3)
3. Build the new Studio flow per Section 4 above

### Do next:
4. Add cover photo to Profile (P2)
5. Fix profile portfolio grid images (P1)
6. Fix Explore masonry grid (E3)
7. Remove right panel from Garage, Profile, Marketplace (G4)
8. Fix Marketplace product card placeholders — color swatches instead of gear icons (M1)

### Do after:
9. All the 🟡 items per screen in order of their screen number
10. All the 🟢 polish items last

---

## ONE MORE THING — Onboarding

Once Studio is fixed and all 🔴 items are resolved, the next major screen to build is **Onboarding**. This has not been built yet and is critical. When a new user opens AVACAR for the first time, they currently land cold on the Feed with no personalization. 

The onboarding flow is 5 screens maximum — see the Master Platform Spec v3.md, Section 6.1 for the full spec. Build it as a series of fullscreen steps (same treatment as Studio — no nav chrome). The last step of onboarding should flow directly into the Studio upload so the user's first experience is generating a design of their own car.

---

*End of QC Report*  
*All fixes should be verified with screenshots before marking complete. Send a full set of all 5 screens after each round of fixes.*
