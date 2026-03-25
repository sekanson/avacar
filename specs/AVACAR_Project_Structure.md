# AVACAR — Project Structure & Setup Guide

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** All AVACAR docs

---

## Initial Setup

### 1. Create the Next.js project

```bash
npx create-next-app@latest avacar --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*"
cd avacar
```

### 2. Install dependencies

```bash
# Core
npm install @clerk/nextjs @supabase/supabase-js @supabase/ssr zustand @tanstack/react-query framer-motion

# UI
npm install lucide-react clsx tailwind-merge

# Utilities
npm install zod date-fns sharp

# Development
npm install -D @types/node tsx
```

### 3. Environment variables

File: `.env.local`

```
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Claude API (for vehicle detection)
ANTHROPIC_API_KEY=sk-ant-...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Folder Structure

```
avacar/
├── app/
│   ├── (auth)/                    # Auth group (no tab bar)
│   │   ├── sign-in/
│   │   │   └── [[...sign-in]]/
│   │   │       └── page.tsx
│   │   ├── sign-up/
│   │   │   └── [[...sign-up]]/
│   │   │       └── page.tsx
│   │   ├── onboarding/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # Auth layout (centered, no nav)
│   │
│   ├── (app)/                     # Main app group (has tab bar)
│   │   ├── feed/
│   │   │   └── page.tsx           # Social feed (Sprint 2, placeholder in Sprint 1)
│   │   ├── explore/
│   │   │   └── page.tsx           # Discovery/search
│   │   ├── create/
│   │   │   ├── page.tsx           # Upload entry point
│   │   │   ├── detect/
│   │   │   │   └── page.tsx       # Vehicle detection
│   │   │   ├── confirm/
│   │   │   │   └── page.tsx       # Confirm vehicle details
│   │   │   ├── customize/
│   │   │   │   └── page.tsx       # 6-tab customization screen
│   │   │   ├── render/
│   │   │   │   └── page.tsx       # Rendering progress
│   │   │   ├── quote/
│   │   │   │   └── page.tsx       # Quote summary
│   │   │   ├── shops/
│   │   │   │   └── page.tsx       # Find a shop
│   │   │   ├── shop/
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Shop profile
│   │   │   └── book/
│   │   │       ├── page.tsx       # Booking flow
│   │   │       └── confirmed/
│   │   │           └── page.tsx   # Booking confirmation
│   │   ├── garage/
│   │   │   ├── page.tsx           # Vehicle list
│   │   │   └── [vehicleId]/
│   │   │       └── page.tsx       # Vehicle detail + build history
│   │   ├── profile/
│   │   │   ├── page.tsx           # Own profile
│   │   │   └── edit/
│   │   │       └── page.tsx       # Edit profile
│   │   ├── user/
│   │   │   └── [username]/
│   │   │       └── page.tsx       # Public user profile
│   │   ├── post/
│   │   │   └── [postId]/
│   │   │       └── page.tsx       # Post detail
│   │   ├── notifications/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx             # App layout (AppShell with TabBar)
│   │
│   ├── api/
│   │   ├── webhooks/
│   │   │   └── clerk/
│   │   │       └── route.ts
│   │   ├── users/
│   │   │   ├── me/
│   │   │   │   ├── route.ts       # GET, PATCH
│   │   │   │   ├── avatar/
│   │   │   │   │   └── route.ts   # POST
│   │   │   │   └── saves/
│   │   │   │       └── route.ts   # GET
│   │   │   └── [username]/
│   │   │       ├── route.ts       # GET
│   │   │       ├── follow/
│   │   │       │   └── route.ts   # POST, DELETE
│   │   │       ├── followers/
│   │   │       │   └── route.ts   # GET
│   │   │       └── following/
│   │   │           └── route.ts   # GET
│   │   ├── vehicles/
│   │   │   ├── route.ts           # GET, POST
│   │   │   ├── detect/
│   │   │   │   └── route.ts       # POST
│   │   │   └── [id]/
│   │   │       └── route.ts       # GET, PATCH, DELETE
│   │   ├── products/
│   │   │   ├── route.ts           # GET
│   │   │   ├── brands/
│   │   │   │   └── route.ts       # GET
│   │   │   └── [id]/
│   │   │       └── route.ts       # GET
│   │   ├── builds/
│   │   │   ├── route.ts           # GET, POST
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET, PATCH, DELETE
│   │   │       ├── items/
│   │   │       │   ├── route.ts   # POST
│   │   │       │   └── [itemId]/
│   │   │       │       └── route.ts # PATCH, DELETE
│   │   │       ├── render/
│   │   │       │   └── route.ts   # POST
│   │   │       └── quote/
│   │   │           ├── route.ts   # GET
│   │   │           └── pdf/
│   │   │               └── route.ts # GET
│   │   ├── shops/
│   │   │   ├── route.ts           # GET
│   │   │   └── [slug]/
│   │   │       ├── route.ts       # GET
│   │   │       └── reviews/
│   │   │           └── route.ts   # GET
│   │   ├── bookings/
│   │   │   ├── route.ts           # GET, POST
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET, PATCH
│   │   │       └── tracking/
│   │   │           └── route.ts   # GET, POST
│   │   ├── feed/
│   │   │   └── route.ts           # GET
│   │   ├── explore/
│   │   │   └── route.ts           # GET
│   │   ├── posts/
│   │   │   ├── route.ts           # POST
│   │   │   └── [id]/
│   │   │       ├── route.ts       # GET, PATCH, DELETE
│   │   │       ├── like/
│   │   │       │   └── route.ts   # POST, DELETE
│   │   │       ├── save/
│   │   │       │   └── route.ts   # POST, DELETE
│   │   │       └── comments/
│   │   │           └── route.ts   # GET, POST
│   │   ├── comments/
│   │   │   └── [id]/
│   │   │       └── route.ts       # DELETE
│   │   ├── notifications/
│   │   │   ├── route.ts           # GET
│   │   │   └── mark-read/
│   │   │       └── route.ts       # POST
│   │   └── reports/
│   │       └── route.ts           # POST
│   │
│   ├── globals.css
│   ├── layout.tsx                 # Root layout (Clerk + QueryClient providers)
│   └── page.tsx                   # Splash / landing (redirect to /feed if authed)
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── avatar.tsx
│   │   ├── chip.tsx
│   │   ├── badge.tsx
│   │   ├── toggle.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── before-after-slider.tsx
│   │   └── index.ts               # Barrel export
│   ├── layout/
│   │   ├── app-shell.tsx
│   │   ├── top-bar.tsx
│   │   ├── tab-bar.tsx
│   │   ├── bottom-sheet.tsx
│   │   ├── page-container.tsx
│   │   └── index.ts
│   ├── feed/
│   │   ├── post-card.tsx
│   │   ├── like-button.tsx
│   │   ├── comment-list.tsx
│   │   ├── comment-input.tsx
│   │   └── index.ts
│   ├── commerce/
│   │   ├── product-tile.tsx
│   │   ├── build-summary.tsx
│   │   ├── quote-card.tsx
│   │   ├── shop-card.tsx
│   │   ├── coverage-selector.tsx
│   │   └── index.ts
│   ├── vehicle/
│   │   ├── upload-zone.tsx
│   │   ├── detection-result.tsx
│   │   ├── vehicle-card.tsx
│   │   └── index.ts
│   ├── shared/
│   │   ├── empty-state.tsx
│   │   ├── error-state.tsx
│   │   ├── skeleton-loader.tsx
│   │   ├── infinite-scroll.tsx
│   │   ├── toast.tsx
│   │   └── index.ts
│   └── providers/
│       ├── query-provider.tsx     # TanStack Query provider
│       ├── toast-provider.tsx
│       └── index.ts
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client (for route handlers)
│   │   └── admin.ts               # Service role client (webhooks)
│   ├── validations/
│   │   ├── user.ts
│   │   ├── vehicle.ts
│   │   ├── product.ts
│   │   ├── build.ts
│   │   ├── shop.ts
│   │   ├── booking.ts
│   │   ├── post.ts
│   │   ├── comment.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── use-user.ts            # Current user hook
│   │   ├── use-vehicles.ts
│   │   ├── use-products.ts
│   │   ├── use-builds.ts
│   │   ├── use-feed.ts
│   │   ├── use-notifications.ts
│   │   └── use-toast.ts
│   ├── stores/
│   │   ├── build-store.ts         # Active build state (Zustand)
│   │   ├── ui-store.ts            # UI state (bottom sheets, modals)
│   │   └── toast-store.ts
│   ├── utils/
│   │   ├── cn.ts                  # clsx + tailwind-merge utility
│   │   ├── pricing.ts             # Cent conversion, build totals
│   │   ├── claude.ts              # Claude API wrapper
│   │   ├── dates.ts               # date-fns helpers
│   │   └── storage.ts             # Supabase storage helpers
│   ├── motion.ts                  # Framer Motion presets
│   ├── types/
│   │   ├── database.ts            # Supabase generated types (or manual)
│   │   ├── api.ts                 # API response types
│   │   └── index.ts
│   └── seed/
│       ├── index.ts
│       ├── brands.ts
│       ├── products-wraps.ts
│       ├── products-wheels.ts
│       ├── products-tint.ts
│       ├── products-ppf.ts
│       ├── products-bodykits.ts
│       ├── products-accessories.ts
│       ├── shops.ts
│       ├── users.ts
│       ├── vehicles.ts
│       ├── builds.ts
│       └── posts.ts
│
├── public/
│   ├── logo.svg                   # AVACAR logo
│   ├── logo-icon.svg              # AVACAR icon mark
│   └── og-image.png               # Social sharing image
│
├── .env.local
├── tailwind.config.ts             # From AVACAR_Design_Tokens.md
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Pages | `page.tsx` | `app/(app)/feed/page.tsx` |
| Layouts | `layout.tsx` | `app/(app)/layout.tsx` |
| API routes | `route.ts` | `app/api/vehicles/route.ts` |
| Components | `kebab-case.tsx` | `components/ui/before-after-slider.tsx` |
| Hooks | `use-kebab-case.ts` | `lib/hooks/use-vehicles.ts` |
| Stores | `kebab-case-store.ts` | `lib/stores/build-store.ts` |
| Types | `kebab-case.ts` | `lib/types/database.ts` |
| Validations | `kebab-case.ts` | `lib/validations/vehicle.ts` |
| Utilities | `kebab-case.ts` | `lib/utils/pricing.ts` |

---

## cn() Utility

File: `lib/utils/cn.ts`

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

This is used in every component for merging Tailwind classes with overrides.

---

## Root Layout

File: `app/layout.tsx`

```typescript
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import "./globals.css";

export const metadata = {
  title: "AVACAR — Customize Your Car",
  description: "AI-powered car customization platform. Wraps, wheels, tint, PPF, body kits — visualize it, price it, book it.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#44CCFF",
          colorBackground: "#14141A",
          colorInputBackground: "#1C1C24",
          colorText: "#FFFFFF",
          colorTextSecondary: "#A0A0B0",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="en">
        <body className="bg-background text-text-primary font-body antialiased">
          <QueryProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

---

## Git Conventions

- Branch naming: `sprint-{n}/{feature-name}` (e.g. `sprint-1/upload-flow`, `sprint-2/social-feed`)
- Commits: conventional commits (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`)
- Deploy: Push to `main` → Vercel auto-deploys

---

## What To Build First

**Refer to AVACAR_Mirmi_Execution_Brief.md for the exact build order.** But here's the startup checklist:

1. Scaffold the project with the commands above
2. Copy `tailwind.config.ts` from AVACAR_Design_Tokens.md
3. Copy `globals.css` from AVACAR_Design_Tokens.md
4. Copy `lib/motion.ts` from AVACAR_Design_Tokens.md
5. Create `lib/utils/cn.ts`
6. Create the root `layout.tsx` above
7. Create the `(app)/layout.tsx` with `AppShell` (TabBar + TopBar skeleton)
8. Start Sprint 1, Screen 1: Layout shell with bottom tab navigation

**Then follow the Execution Brief screen by screen.**

---

*— Hammad*
