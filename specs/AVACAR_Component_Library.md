# AVACAR — Component Library Specification

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** AVACAR_Design_Tokens.md, AVACAR_Unified_UX_Spec_v2.md

---

## Overview

All reusable components live in `/components/`. Organize by category:

```
/components
  /ui          → Primitives (Button, Input, Avatar, Chip, Badge, etc.)
  /layout      → Layout shells (AppShell, TabBar, TopBar, PageContainer, BottomSheet)
  /feed        → Social feed components (PostCard, CommentList, LikeButton, etc.)
  /commerce    → Commerce flow (ProductTile, BuildSummary, QuoteCard, ShopCard, etc.)
  /vehicle     → Vehicle-related (VehicleCard, DetectionResult, UploadZone, etc.)
  /shared      → Cross-cutting (EmptyState, ErrorState, SkeletonLoader, etc.)
```

Every component must:
- Be a React functional component with TypeScript
- Accept all relevant props with proper types
- Have sensible defaults
- Support `className` override via Tailwind merge (`cn()` utility)
- Handle loading / empty / error states where applicable

---

## UI Primitives

### Button

File: `/components/ui/button.tsx`

```typescript
interface ButtonProps {
  variant: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;       // Leading icon
  iconRight?: React.ReactNode;  // Trailing icon
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
}
```

**Visual rules:**
- `primary`: `bg-cyan text-background` → hover: `bg-cyan-hover` → pressed: `bg-cyan-pressed`. Shadow: `glow-cyan` on hover.
- `secondary`: `bg-surface-elevated text-text-primary border border-surface-border` → hover: `bg-surface-hover`
- `ghost`: `bg-transparent text-text-secondary` → hover: `bg-surface text-text-primary`
- `danger`: `bg-error/15 text-error border border-error/30` → hover: `bg-error/25`
- `outline`: `bg-transparent text-cyan border border-cyan/40` → hover: `bg-cyan-subtle`
- Loading state: replace content with a spinner (16px, `animate-spin`), keep button dimensions stable
- Disabled: `opacity-50 pointer-events-none`
- Transition: `transition-all duration-fast`

---

### Input

File: `/components/ui/input.tsx`

```typescript
interface InputProps {
  type?: "text" | "email" | "password" | "number" | "search" | "tel" | "url";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;         // Leading icon inside field
  iconRight?: React.ReactNode;    // Trailing icon (e.g. clear, eye toggle)
  disabled?: boolean;
  required?: boolean;
  className?: string;
}
```

**Visual rules:**
- Default: `bg-surface border border-surface-border text-text-primary placeholder:text-text-tertiary`
- Focus: `border-cyan ring-1 ring-cyan/30`
- Error: `border-error ring-1 ring-error/30` + error text below in `text-error text-body-sm`
- Label: `text-text-secondary text-body-sm font-medium mb-1.5`
- Height: 48px (`h-12`)
- Border radius: `rounded-input` (12px)

---

### TextArea

File: `/components/ui/textarea.tsx`

Same props as Input (minus `type`) plus `rows?: number` and `maxLength?: number`. Show character count when `maxLength` is set.

---

### Avatar

File: `/components/ui/avatar.tsx`

```typescript
interface AvatarProps {
  src?: string | null;
  alt: string;
  size: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;   // Initials to show if no image
  isVerified?: boolean; // Show cyan check badge
  isOnline?: boolean;   // Green dot indicator
  className?: string;
}
```

**Size mapping:** xs=24px, sm=32px, md=40px, lg=64px, xl=96px.
**Fallback:** If no `src`, show initials on `bg-surface-elevated` with `text-text-tertiary`.
**Verified badge:** Small cyan circle with white check, positioned bottom-right, overlapping the avatar edge.

---

### Chip

File: `/components/ui/chip.tsx`

```typescript
interface ChipProps {
  label: string;
  variant?: "default" | "active" | "category";
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  onClick?: () => void;
  categoryColor?: string; // hex color for category variant
  className?: string;
}
```

**Visual rules:**
- Default: `bg-surface-elevated text-text-secondary border border-surface-border rounded-chip`
- Active: `bg-cyan-muted text-cyan border border-cyan/30`
- Category: uses `categoryColor` as the accent (background at 15% opacity, text at full)
- Height: 32px, padding: 6px 12px, font: Inter 500 13px

---

### Badge

File: `/components/ui/badge.tsx`

```typescript
interface BadgeProps {
  label: string;
  variant: "default" | "success" | "warning" | "error" | "info" | "tier";
  size?: "sm" | "md";
  tier?: "standard" | "certified" | "elite"; // for tier variant
}
```

Tier badges use the tier colors from the design tokens.

---

### Toggle

File: `/components/ui/toggle.tsx`

```typescript
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
}
```

- Track: 44px × 24px, `bg-surface-border` (off) → `bg-cyan` (on)
- Thumb: 20px circle, white, `transition-transform duration-fast`

---

### Slider

File: `/components/ui/slider.tsx`

```typescript
interface SliderProps {
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}
```

Track: `bg-surface-border` with filled portion in `bg-cyan`. Thumb: 20px circle with `bg-cyan` and `shadow-glow-cyan`.

---

### Tabs

File: `/components/ui/tabs.tsx`

```typescript
interface TabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode; count?: number }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: "underline" | "pill";
  scrollable?: boolean; // horizontal scroll for many tabs
}
```

- Underline: Active tab has `text-cyan` with a 2px cyan bottom border. Inactive: `text-text-tertiary`.
- Pill: Active tab has `bg-cyan-muted text-cyan`. Inactive: `bg-transparent text-text-tertiary`.
- Scrollable: horizontal scroll with hidden scrollbar, for the 6 customize tabs.

---

### Before/After Slider

File: `/components/ui/before-after-slider.tsx`

```typescript
interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number; // 0-100, default 50
}
```

Draggable divider line with a cyan circular handle. Smooth drag interaction. Show labels at top-left and top-right.

---

## Layout Components

### AppShell

File: `/components/layout/app-shell.tsx`

The root layout wrapper. Renders:
- `<TopBar />` at the top
- `{children}` in the middle (scrollable content area)
- `<TabBar />` at the bottom

Content area respects: `padding-bottom: var(--tab-bar-h)` to avoid tab bar overlap.

---

### TopBar

File: `/components/layout/top-bar.tsx`

```typescript
interface TopBarProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightAction?: React.ReactNode; // e.g. settings icon, share button
  transparent?: boolean;         // for overlay on images
}
```

- Height: 56px
- Background: `bg-background/80 backdrop-blur-nav` (glassmorphism)
- Sticky top with `z-sticky`
- Back button: `ChevronLeft` icon, 44px touch target
- Title: `font-display text-display-xs` centered

---

### TabBar

File: `/components/layout/tab-bar.tsx`

5 tabs: Feed | Explore | [+] Create | Garage | Profile

- Height: 80px (includes safe area padding on iOS)
- Background: `bg-background/90 backdrop-blur-nav`
- Border top: `border-t border-surface-border`
- Active icon: `text-cyan`, label `text-cyan text-body-xs font-medium`
- Inactive icon: `text-text-tertiary`, label `text-text-tertiary text-body-xs`
- Center "+" button: 48px cyan circle, elevated with `shadow-glow-cyan`
- Fixed bottom, `z-sticky`

---

### BottomSheet

File: `/components/layout/bottom-sheet.tsx`

```typescript
interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  snapPoints?: number[];  // percentage heights, e.g. [50, 90]
  children: React.ReactNode;
}
```

- Overlay: `bg-black/60 backdrop-blur-overlay`
- Sheet: `bg-surface-elevated rounded-t-sheet`
- Handle: 4px × 40px centered pill, `bg-surface-border`
- Drag to dismiss support via Framer Motion `drag="y"`
- Animation: `bottomSheet` preset from motion.ts

---

### PageContainer

File: `/components/layout/page-container.tsx`

```typescript
interface PageContainerProps {
  children: React.ReactNode;
  padded?: boolean;       // default true, adds horizontal page padding
  scrollable?: boolean;   // default true
  className?: string;
}
```

Standardizes page padding, max-width, and scroll behavior.

---

## Feed Components (Sprint 2)

### PostCard

File: `/components/feed/post-card.tsx`

```typescript
interface PostCardProps {
  post: {
    id: string;
    author: { username: string; avatar_url: string; is_verified: boolean };
    image_urls: string[];
    caption: string;
    tags: string[];
    like_count: number;
    comment_count: number;
    is_liked: boolean;
    is_saved: boolean;
    created_at: string;
    show_price: boolean;
    total_cost?: number;
    shop?: { name: string; slug: string };
  };
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onSave: () => void;
  onTryBuild: () => void;
  onAuthorPress: () => void;
}
```

**Layout (top to bottom):**
1. Author row: Avatar (sm) + username + verified badge + "•" + relative time + `MoreHorizontal` menu
2. Image carousel (swipeable, 1:1 aspect ratio, dot indicators at bottom if multiple)
3. Action row: Heart | Comment | Share (left) … Bookmark (right)
4. Like count: "**X likes**" in bold
5. Caption: **username** + caption text, truncated to 2 lines with "more" toggle
6. Tags row: scrollable chips for build tags
7. Comment preview: "View all X comments" link
8. "Try This Build" CTA: small outline button

---

### LikeButton

File: `/components/feed/like-button.tsx`

Animated heart with `heartPop` motion preset. Filled red when liked, outline when not. Optimistic UI update.

---

### CommentList

File: `/components/feed/comment-list.tsx`

Flat list with optional nesting (replies indented). Each comment: Avatar (xs) + username + text + relative time + like count. Reply button. Input at bottom pinned above keyboard.

---

## Commerce Components (Sprint 1)

### ProductTile

File: `/components/commerce/product-tile.tsx`

```typescript
interface ProductTileProps {
  product: {
    id: string;
    name: string;
    brand_name: string;
    thumbnail_url: string;
    price_min?: number;
    price_max?: number;
    category: ProductCategory;
    metadata: Record<string, any>;
  };
  selected?: boolean;
  onSelect: () => void;
}
```

**Layout:**
- Card: `bg-surface rounded-card` with `border border-surface-border`
- Selected: `border-cyan shadow-glow-cyan`
- Thumbnail: top portion, 1:1 aspect, `rounded-t-card`
- Name: below image, `text-body-md font-medium`, truncated 1 line
- Brand: `text-body-sm text-text-tertiary`
- Price range: `text-body-sm text-cyan font-mono`
- For wraps: show a small color dot from `metadata.color_hex`
- For wheels: show diameter badge (e.g. "20"")
- Press animation: `cardTap` motion preset

---

### BuildSummary

File: `/components/commerce/build-summary.tsx`

Running total bar that sits at the bottom of the Customize screen. Shows:
- Item count by category (icon dots)
- Total estimate in large font: `$X,XXX`
- "Get Quote" primary button

Sticky bottom, `bg-surface-elevated/95 backdrop-blur-nav`, slides up when items are added.

---

### QuoteCard

File: `/components/commerce/quote-card.tsx`

Itemized breakdown card for the Quote screen. One section per category with:
- Category icon + name header
- Product name + brand + options summary
- Price on the right
- Divider between categories
- Subtotal, tax estimate, total at bottom in `font-mono font-bold`

---

### ShopCard

File: `/components/commerce/shop-card.tsx`

```typescript
interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    slug: string;
    logo_url: string;
    city: string;
    state_province: string;
    distance_km?: number;
    avg_rating: number;
    review_count: number;
    price_tier: number;
    tier: ShopTier;
    services: ProductCategory[];
  };
  onPress: () => void;
}
```

**Layout:**
- Horizontal card: logo (48px, rounded-image) on left
- Name + tier badge on first line
- Location + distance on second line (`text-text-secondary`)
- Rating stars + review count on third line
- Price tier ($, $$, $$$) indicator
- Services chips (small, using category colors)

---

### CoverageSelector

File: `/components/commerce/coverage-selector.tsx`

For wraps and PPF — visual selector showing the vehicle outline with selectable panels. Tap to toggle panels on/off. Active panels highlighted in cyan. Shows corresponding coverage label and price adjustment.

---

## Vehicle Components

### UploadZone

File: `/components/vehicle/upload-zone.tsx`

Large dashed-border drop zone with camera icon. Two CTAs: "Take Photo" (camera) and "Choose from Library" (gallery). Accepts image files, validates size (max 10MB) and format (jpg, png, webp, heic).

---

### DetectionResult

File: `/components/vehicle/detection-result.tsx`

Shows the uploaded photo with an overlay card displaying: Make, Model, Year, Color, Body Type. Each field is editable (tap to change). Confidence indicator (percentage bar). "Confirm" primary button, "Try Again" secondary.

---

### VehicleCard

File: `/components/vehicle/vehicle-card.tsx`

For the Garage. Shows vehicle photo thumbnail, nickname (or "Make Model Year"), number of builds, last modified date. Tap to expand into vehicle detail with build history.

---

## Shared Components

### EmptyState

File: `/components/shared/empty-state.tsx`

```typescript
interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}
```

Centered vertically. Icon at 48px in `text-text-tertiary`. Title in `text-display-sm`. Description in `text-body-md text-text-secondary`. Optional CTA button below.

---

### ErrorState

File: `/components/shared/error-state.tsx`

Same layout as EmptyState but with `AlertCircle` icon in `text-error`. "Try Again" button that calls a retry function.

---

### SkeletonLoader

File: `/components/shared/skeleton-loader.tsx`

Provides skeleton variants matching each major card type:
- `SkeletonPostCard` — matches PostCard layout
- `SkeletonProductTile` — matches ProductTile
- `SkeletonShopCard` — matches ShopCard
- `SkeletonText` — configurable width/height text block

All use the `.skeleton` CSS class for the shimmer animation.

---

### InfiniteScroll

File: `/components/shared/infinite-scroll.tsx`

```typescript
interface InfiniteScrollProps {
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  loader?: React.ReactNode;
}
```

Uses `IntersectionObserver` to trigger `onLoadMore` when a sentinel element enters viewport. Shows loader (default: spinner) while fetching.

---

### Toast

File: `/components/shared/toast.tsx`

Global toast notification system. Use Zustand store for state. Variants: success (green), error (red), info (cyan), warning (yellow). Auto-dismiss after 4 seconds. Swipe to dismiss. Uses `toast` motion preset.

---

**Mirmi: Build components as you encounter them in the sprint build order.** Don't build all components upfront — build each one when its parent screen needs it. But use this doc to ensure consistency when you do. Every component should look and behave exactly as described here.

---

*— Hammad*
