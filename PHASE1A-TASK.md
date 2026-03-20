# AVACAR Phase 1A — Social Feed (New Home Screen)

## Project
Repo: /home/techs/avacar
Branch: feature/social-feed (already checked out)
Framework: Next.js (App Router), TypeScript, Tailwind CSS
Current home: src/app/page.tsx (landing page) + src/app/home/page.tsx

## Goal
Transform AVACAR's home screen into a social feed. This is the highest priority change — it fundamentally restructures the app.

## Design System (STRICT — do not deviate)
- Background: #0C0C10
- Accent: #44CCFF
- Card background: #141418
- Dark theme throughout
- Premium feel — clean spacing, subtle borders (#ffffff0f), no clutter
- Font: existing (Manrope/Geist)

## What to Build

### 1. Feed Screen — new `src/app/feed/page.tsx` (becomes new home)
Scrollable vertical feed of build posts. Each post card (full-width):
- User avatar (circle, 36px) + username + timestamp top-left
- Car photo / build render — full width, 16:9 or 4:3 ratio, rounded corners
- Build spec tags below image: pill tags like "Satin Black Wrap · Vossen HF-5 · 20% Tint" in #44CCFF
- Bottom row: heart icon + like count, comment icon + count, "Try This Build" button (small, outlined)
- Card bg: #141418, subtle border, 12px radius, 16px gap between cards

### 2. Post Detail Screen — `src/app/feed/[id]/page.tsx`
Full detail view when tapping a post:
- Larger image at top
- User info + follow button
- Full build breakdown: each product with brand + price in a list
- Shop tag (if any)
- Cost breakdown section (if shared)
- Flat comments list (avatar, username, timestamp, text)
- Comment input fixed at bottom
- "Try This Build on My Car" CTA button → links to /upload
- Share button (top right)

### 3. Navigation Restructure — update `src/components/layout/AppLayout.tsx`
New bottom tabs (5 items):
1. Feed (home icon) → /feed
2. Explore → /explore  
3. Upload (center, floating circular CTA, #44CCFF fill) → /upload
4. Garage → /garage
5. Profile → /profile

Remove any old nav that pointed to /home as root.

### 4. Update Root Route — `src/app/page.tsx`
Change root redirect from current landing/home to /feed for logged-in users, or show the existing landing/splash for logged-out users (keep existing landing page intact at /splash or /home).

### 5. Mock Data — `src/data/feedPosts.ts`
Create 8-10 realistic mock feed posts with:
- user: { id, username, avatar (use placeholder like https://i.pravatar.cc/150?u=username) }
- car: { make, model, year, image (use a placeholder or existing /images/ assets) }
- buildSpecs: string[] (e.g. ["Satin Black Wrap", "Vossen HF-5 Wheels", "20% Ceramic Tint"])
- likes: number
- comments: number
- shopName?: string
- totalCost?: number
- sharedCost: boolean
- caption: string
- timestamp: string

### 6. Post Creation Entry Point
Add a "Post Your Build" button on the Profile page (`src/app/profile/page.tsx`) that links to a simple post creation screen `src/app/feed/create/page.tsx`:
- Upload photo option (UI only, no backend)
- Caption input
- Build tags input (comma separated)
- Shop tag input
- Toggle: share cost? 
- "Post" button (saves to local state / mock for now)

## Rules
- Use existing Tailwind config + design tokens already in the project
- Mobile-first (390px viewport)
- Keep ALL existing routes intact (/upload, /customize, /quote, /booking-review, etc.)
- No backend required — use mock data from feedPosts.ts
- Use Zustand store (src/store/appStore.ts) for any state needed
- Use TypeScript throughout, no `any` types
- NO breaking changes to existing pages
