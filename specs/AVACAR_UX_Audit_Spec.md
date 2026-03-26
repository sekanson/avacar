# AVACAR UX Audit & Polish — Full Site Review

**Dispatch to: Claude Code (CC) via cc-dispatch.sh**
**Target: avacar.vercel.app**
**Stack: Next.js 15 (App Router) / TypeScript / Tailwind / Lucide React / Clerk (bypassed) / Vercel**
**Priority: HIGH — this is a UX-critical pass before any new features**

---

## Context

The full AVACAR site has been built from the master spec. This task is a comprehensive UX/UI audit and polish pass. The goal is to make every page feel intuitive for a non-technical car enthusiast who has never used an AI tool before. They should never feel lost, never wonder "what do I do next?", and never encounter a dead end.

**The user we're designing for:** A car enthusiast in their 20s-30s who is NOT tech-savvy. They know what looks cool. They don't know what AI is, what a prompt is, or what Nano Banana means. If they have to think about how to use the platform, we've failed. Think: someone who uses Instagram and TikTok daily but has never opened Photoshop.

---

## Audit Checklist — Go Page by Page

For every page/route in the current build, evaluate and fix the following. Do NOT skip any page.

### A. Navigation Clarity

- [ ] Can a first-time user tell where they are at all times? The current page/section should be visually highlighted in the nav (active state — bold, underline, accent color, or filled icon).
- [ ] Is the primary action on every page immediately obvious? There should be ONE dominant CTA above the fold. Not two competing buttons. Not a wall of equal-weight options.
- [ ] Does the mobile bottom nav have exactly 5 items max? If more than 5, consolidate. Recommended: `Home` | `Explore` | `+ Create` (center, accent-colored) | `Catalog` | `Garage`
- [ ] Is the `+ Create` / main action button visually distinct? It should be the loudest element in the nav — accent color (#44CCFF or the platform accent), slightly larger, or elevated. This is the button that starts the magic.
- [ ] Can the user get back to the homepage from anywhere in 1 tap? Logo click → home. Always. No exceptions.
- [ ] Are there any dead-end pages? Every page should have either a clear next action or a way to continue exploring. No page should end with just content and nothing to do.

### B. Feature Overload / Clutter

- [ ] Does any page show more than 3 categories of content above the fold? If yes, simplify. Progressive disclosure — show the most important thing first, let them scroll or tap for more.
- [ ] Are there any pages with more than 6 clickable options visible simultaneously (not counting nav)? If yes, group them visually or collapse into expandable sections. Use cards, not lists.
- [ ] Is every label/button written in plain language? Audit ALL button text, section headers, and labels for jargon. Replace any technical language:
  - ❌ "Generate" → ✅ "See it on your car" or "Try this look"
  - ❌ "Render" → ✅ "Your build" or "Your car"
  - ❌ "AI Generation" → ✅ never say this anywhere consumer-facing
  - ❌ "Preset" → ✅ "Style" or "Look" or just the name of the thing
  - ❌ "Pipeline" or "Model" → ✅ never say this
  - ❌ "Parameters" → ✅ never say this
  - ❌ "Prompt" → ✅ "Describe what you want" (only in custom/power-user areas)
  - ❌ "Credits" or "Tokens" → ✅ do not use anywhere for now
- [ ] Remove or hide any developer-facing text, debug info, placeholder lorem ipsum, or "coming soon" badges that are still visible.

### C. Preset Flow — The 3-Step Test

For every preset/tool flow in the app, verify it passes the 3-step test:

```
Step 1: Upload your car (or select from library)
Step 2: Pick a look/style/product (tap a visual card)
Step 3: See the result
```

If any flow has more than 3 steps before the user sees a result, reduce it. Specifically:

- [ ] Can the user go from "I just opened this tool" to "I see my car transformed" in 3 taps or fewer?
- [ ] Is the upload step frictionless? Big drop zone, clear "Upload a photo of your car" label, camera icon, example silhouette showing what kind of photo works best.
- [ ] After uploading, does the preset/style selection appear immediately? No intermediate screens, no settings panels, no "configure your generation."
- [ ] After selecting a preset, does the generation start automatically? No "confirm" button. No "are you sure?" modal. Tap preset → loading state → result.
- [ ] Is there a loading state that feels good? Not a blank screen. Show the user's original photo with a shimmer/pulse effect, or a progress animation, or "✨ Working on your build..." text.
- [ ] After the result appears, are the next actions clear? The result screen should show:
  - The before/after (slider or toggle)
  - "🔮 Try another look" (go back to presets)
  - "🛒 Shop this build" (if real products were used)
  - "💾 Save to My Garage"
  - "📤 Share"
  - Product badges showing what was used (e.g., "HRE P101 · Brushed Dark Clear")

### D. Preset Grid UX

- [ ] Is "**+ Create your own**" the first card in every preset grid? Dashed border, `+` icon, subtle but always present.
- [ ] Does every preset card have a visual thumbnail? No text-only cards. Every option should be a picture that shows what the result will look like.
- [ ] Are preset cards large enough to tap comfortably on mobile? Minimum 100px × 100px tap target. Ideally larger.
- [ ] Do the preset grids have filter pills above them? `All` | `Popular` | `[Category]` | `[Category]`. These should be horizontally scrollable on mobile.
- [ ] Is the currently selected filter visually distinguished? Filled/accent-colored pill vs outlined/muted for unselected.

### E. Homepage Dashboard

- [ ] Does the homepage answer "what do I want to do?" immediately? The first thing visible should be intent-driven, not a feature showcase.
- [ ] Is the tool launcher row (Upload Car, Swap Wheels, etc.) horizontally scrollable on mobile and does not wrap awkwardly?
- [ ] Does "My Garage / Recent Builds" show real content if available, and a friendly empty state if not? Empty state should say something like "No builds yet — let's make your first one!" with a CTA button, not just a blank space.
- [ ] Does the "Get Inspired" section show visual template cards with preview thumbnails? Not text links. Visual cards.
- [ ] Is there a "Trending" or community section on the homepage that shows real community builds (or featured/curated builds if community is still sparse)?

### F. Community Feed & Explore

- [ ] Does every build post have "🔮 Try On My Car" and "🛒 Shop This Build" as visible action buttons? These are the viral loop triggers. They cannot be hidden in a menu.
- [ ] Can users tap a build to see what products/presets were used? Product badges should be visible on the post card, and tapping opens detail.
- [ ] Is the Explore page a clean masonry grid? No clutter. Images first. Filter tabs above.
- [ ] Do filter tabs work and visually indicate the active filter?

### G. Product Catalog

- [ ] Can users browse the catalog without being forced into a build flow? The catalog should be independently browsable.
- [ ] Does every product card have a "Try On My Car" button? This is the bridge from browsing to building.
- [ ] Are filters visual where possible? Color filters should use swatches, not text labels. Finish types should show preview chips.
- [ ] Do curated collections exist and are they visually prominent? They should be cards with preview thumbnails + collection name + item count.

### H. My Garage

- [ ] Does My Garage show saved builds as a visual grid of thumbnails? Not a list. Not a table. Visual cards.
- [ ] Does each saved build card show: thumbnail, car name/make, products used (as small badges), date?
- [ ] Is there a clear "New Build" CTA if the garage is empty or at the top of the page?
- [ ] Can users share a build directly from My Garage? Share icon on each card.

### I. Visual Design & Polish

- [ ] Is the color scheme consistent? Dark background (#0C0C10 or similar), with the accent color used sparingly for CTAs and active states. Not every element should be accent-colored.
- [ ] Is typography consistent? One display font for headings, one body font for text. Check for mixed font sizes, weights, or families that look unintentional.
- [ ] Are images/thumbnails loading with proper aspect ratios? No stretched, squished, or cropped-wrong images.
- [ ] Do interactive elements have hover states (desktop) and tap feedback (mobile)? Buttons should visually respond to interaction.
- [ ] Is spacing consistent? Check for pages where padding/margins feel tighter or looser than the rest of the site.
- [ ] Are there any orphaned components — sections that look disconnected from the rest of the page flow?
- [ ] Does the site feel premium and automotive? Think: dark, clean, minimal. Inspired by luxury car configurators, not bright SaaS dashboards. The aesthetic should say "car culture" not "software product."

### J. Responsive / Mobile

- [ ] Test every page at 375px width (iPhone SE/small) and 390px (iPhone 14). Nothing should overflow, overlap, or become unreadable.
- [ ] Are touch targets minimum 44px × 44px on mobile?
- [ ] Does horizontal scrolling work smoothly for tool launcher rows, preset grids, and filter pills?
- [ ] Is the bottom nav fixed and always visible on mobile? It should never scroll away.
- [ ] Are modals/sheets mobile-friendly? They should slide up from bottom on mobile, not appear as centered desktop modals.

---

## How to Execute

1. Open every route in the current build at avacar.vercel.app
2. Go through each section (A through J) of this checklist
3. For each issue found, fix it directly in the code
4. If a fix requires a design decision that isn't covered here, default to: **simpler is better, fewer options is better, bigger tap targets are better, less text is better**
5. After all fixes, do one final pass on mobile (375px viewport) to catch anything that broke
6. Push to GitHub → Vercel auto-deploys

**Do not add new features.** This is a polish and audit pass only. The goal is to make what exists feel effortless, not to add more.

---

## The Ultimate Test

When you're done, imagine handing the phone to someone who:
- Has never used AI
- Does not know what xix3D, Zeno, or Nano Banana is
- Loves their car and saw an AVACAR ad on Instagram
- Tapped the link and landed on the homepage

Can they go from "I just arrived" to "holy shit that's my car looking amazing" in under 60 seconds, without reading a single tutorial?

If yes, the audit passes. If not, keep polishing.
