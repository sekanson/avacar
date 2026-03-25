# AVACAR — API Routes Specification

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** AVACAR_Database_Schema.md, AVACAR_Mirmi_Execution_Brief.md

---

## Overview

All API routes live in Next.js App Router at `/app/api/`. Use Route Handlers (the `route.ts` convention). All responses return JSON. All authenticated routes verify the Clerk session via `auth()` from `@clerk/nextjs/server`.

**Conventions Mirmi must follow:**
- RESTful naming: `/api/[resource]` for collections, `/api/[resource]/[id]` for single items
- Always return `{ data, error, meta }` shape
- HTTP status codes: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error
- Pagination: `?page=1&limit=20` → response includes `meta: { page, limit, total, totalPages }`
- Filtering: query params (e.g. `?category=wrap&brand=3m`)
- Sorting: `?sort=created_at&order=desc`
- All write operations require authentication
- Input validation via Zod schemas (define in `/lib/validations/`)
- Database queries via Supabase client (define in `/lib/supabase/`)
- Monetary values: always INTEGER (cents) in DB and API, convert to display format on frontend only

**Standard response shape:**
```typescript
// Success
{ data: T, meta?: { page, limit, total, totalPages } }

// Error
{ error: { code: string, message: string, details?: any } }
```

---

## Sprint 1 Routes — Foundation + Commerce

### Auth & Users

#### `POST /api/webhooks/clerk`
**Purpose:** Clerk webhook — syncs new users to Supabase `users` table on signup.
**Auth:** Webhook signature verification (Svix)
**Body:** Clerk webhook payload
**Action:** On `user.created` → INSERT into `users` with `clerk_id`, `email`, `display_name`, `avatar_url`. On `user.updated` → UPDATE matching row. On `user.deleted` → soft delete.

#### `GET /api/users/me`
**Auth:** Required
**Returns:** Current user's full profile from `users` table.

#### `PATCH /api/users/me`
**Auth:** Required
**Body:** `{ username?, display_name?, bio?, location?, website?, avatar_url?, preferences? }`
**Validation:** `username` must be unique, 3-30 chars, alphanumeric + underscores only. `bio` max 300 chars.
**Returns:** Updated user object.

#### `GET /api/users/[username]`
**Auth:** Optional
**Returns:** Public profile for a user. Include `follower_count`, `following_count`, `post_count`, `build_count`. If authenticated, include `is_following: boolean`.

#### `POST /api/users/me/avatar`
**Auth:** Required
**Body:** `FormData` with image file
**Action:** Upload to Supabase Storage `avatars` bucket, update `avatar_url` on user record.
**Returns:** `{ data: { avatar_url } }`

---

### Vehicles

#### `POST /api/vehicles`
**Auth:** Required
**Body:** `FormData` with `photo` (image file)
**Action:**
1. Upload photo to Supabase Storage `vehicle-photos` bucket
2. Call Claude API for vehicle detection (send image, ask for make/model/year/color/body type)
3. Parse Claude response
4. INSERT into `vehicles` with detection results + `detection_confidence` + `detection_raw`
5. Return vehicle object with detected info
**Returns:** `{ data: { id, make, model, year, color, body_type, photo_url, detection_confidence } }`

#### `GET /api/vehicles`
**Auth:** Required
**Returns:** All vehicles for current user, sorted by `created_at DESC`.

#### `GET /api/vehicles/[id]`
**Auth:** Required (owner only)
**Returns:** Single vehicle with all builds attached.

#### `PATCH /api/vehicles/[id]`
**Auth:** Required (owner only)
**Body:** `{ make?, model?, year?, color?, body_type?, trim?, nickname? }`
**Purpose:** User corrects/overrides detection results.

#### `DELETE /api/vehicles/[id]`
**Auth:** Required (owner only)
**Action:** Soft delete (`deleted_at = now()`).

#### `POST /api/vehicles/detect`
**Auth:** Required
**Body:** `{ image_url: string }` (already uploaded image)
**Purpose:** Re-run vehicle detection on an existing photo without creating a new vehicle record.
**Returns:** `{ data: { make, model, year, color, body_type, confidence, raw } }`

**Claude API integration for vehicle detection — prompt template:**
```
Analyze this vehicle image. Return a JSON object with:
{
  "make": "manufacturer name",
  "model": "model name",
  "year": estimated year or year range,
  "color": "exterior color",
  "body_type": "sedan|coupe|suv|truck|hatchback|convertible|wagon|van|minivan|crossover|sports_car|supercar|hypercar|pickup|other",
  "confidence": 0.0-1.0,
  "notes": "any relevant details"
}
If you cannot identify the vehicle, set confidence to 0 and provide your best guess with notes explaining uncertainty.
```

---

### Products

#### `GET /api/products`
**Auth:** None
**Query params:**
- `category` (required): `wrap|wheel|tint|ppf|body_kit|accessory`
- `brand`: brand slug (e.g. `3m`, `hre`)
- `search`: text search on name/description
- `finish`: for wraps — `gloss|matte|satin|metallic|chrome|color_shift|textured`
- `color_family`: for wraps — `red|blue|green|black|white|grey|silver|gold|...`
- `diameter`: for wheels — `18|19|20|21|22|...`
- `min_price`, `max_price`: in cents
- `page`, `limit`, `sort`, `order`
**Returns:** Paginated product list with brand info joined.

#### `GET /api/products/[id]`
**Auth:** None
**Returns:** Single product with full metadata, brand info, related products (same brand + category).

#### `GET /api/products/brands`
**Auth:** None
**Query params:** `category` (optional — filter brands by category)
**Returns:** List of brands, optionally filtered by category.

---

### Builds

#### `POST /api/builds`
**Auth:** Required
**Body:** `{ vehicle_id: UUID, title?: string }`
**Returns:** New build object with `status: 'draft'`.

#### `GET /api/builds`
**Auth:** Required
**Query params:** `vehicle_id`, `status`, `page`, `limit`
**Returns:** Current user's builds, optionally filtered.

#### `GET /api/builds/[id]`
**Auth:** Required (owner or public build)
**Returns:** Full build with all `build_items` joined with `products`.

#### `PATCH /api/builds/[id]`
**Auth:** Required (owner only)
**Body:** `{ title?, status?, is_public?, notes?, tags? }`

#### `DELETE /api/builds/[id]`
**Auth:** Required (owner only)
**Action:** Soft delete.

---

### Build Items

#### `POST /api/builds/[id]/items`
**Auth:** Required (build owner)
**Body:** `{ product_id: UUID, category: product_category, options: JSONB }`
**Action:** INSERT build_item, recalculate `builds.total_estimate` (SUM of all item prices).
**Returns:** Created item.

#### `PATCH /api/builds/[id]/items/[itemId]`
**Auth:** Required (build owner)
**Body:** `{ product_id?, options?, price_estimate? }`
**Action:** UPDATE item, recalculate build total.

#### `DELETE /api/builds/[id]/items/[itemId]`
**Auth:** Required (build owner)
**Action:** DELETE item, recalculate build total.

---

### Rendering

#### `POST /api/builds/[id]/render`
**Auth:** Required (build owner)
**Body:** `{ vehicle_photo_url: string, build_items: BuildItem[] }`
**Action:**
1. Set `builds.status = 'in_progress'`
2. Call rendering pipeline (Nano Banana / ComfyUI — implementation TBD, use placeholder for now)
3. Store result in Supabase Storage `renders` bucket
4. Update `builds.render_url`, `builds.render_before_url`, `builds.render_after_url`
5. Set `builds.status = 'quoted'`
**Returns:** `{ data: { render_url, before_url, after_url } }`

**For Sprint 1:** Mock the render with a 3-second delay and return the original photo. Real AI rendering integration comes later. The flow and UI should be fully built regardless.

---

### Quote / PDF Export

#### `GET /api/builds/[id]/quote`
**Auth:** Required (build owner)
**Returns:** Structured quote object:
```typescript
{
  data: {
    build_id: string,
    vehicle: { make, model, year, color },
    items: [
      { category, product_name, brand, options_summary, price_estimate }
    ],
    subtotal: number, // cents
    tax_estimate: number,
    total: number,
    generated_at: string
  }
}
```

#### `GET /api/builds/[id]/quote/pdf`
**Auth:** Required (build owner)
**Returns:** PDF binary (Content-Type: application/pdf). Generate using a PDF library (e.g. `@react-pdf/renderer` or `jspdf`). Branded with AVACAR logo, itemized breakdown, before/after images.

---

### Shops

#### `GET /api/shops`
**Auth:** None
**Query params:**
- `lat`, `lng`, `radius` (km) — location-based search
- `services`: comma-separated categories (e.g. `wrap,ppf`)
- `tier`: `standard|certified|elite`
- `min_rating`: float
- `search`: text search
- `page`, `limit`, `sort`
**Returns:** Paginated shop list, sorted by distance if lat/lng provided.

#### `GET /api/shops/[slug]`
**Auth:** None
**Returns:** Full shop profile with hours, services, certifications, recent posts (builds done at this shop), reviews.

#### `GET /api/shops/[slug]/reviews`
**Auth:** None
**Query params:** `page`, `limit`, `sort`
**Returns:** Paginated reviews for this shop.

---

### Bookings

#### `POST /api/bookings`
**Auth:** Required
**Body:**
```typescript
{
  shop_id: UUID,
  build_id: UUID,
  preferred_date: string, // ISO date
  preferred_time_slot: 'morning' | 'afternoon' | 'any',
  notes?: string
}
```
**Action:** Create booking with `status: 'pending'`. Send notification to shop owner.
**Returns:** Booking object.

#### `GET /api/bookings`
**Auth:** Required
**Returns:** Current user's bookings (as customer). Include shop info and build info joined.

#### `GET /api/bookings/[id]`
**Auth:** Required (booking owner or shop owner)
**Returns:** Full booking with installation tracking timeline.

#### `PATCH /api/bookings/[id]`
**Auth:** Required (shop owner only for status changes, customer for notes/date changes before confirmation)
**Body:** `{ status?, confirmed_date?, confirmed_time?, quoted_total?, shop_notes? }`

#### `GET /api/bookings/[id]/tracking`
**Auth:** Required (booking owner or shop owner)
**Returns:** Array of `installation_tracking` entries for this booking, sorted chronologically.

#### `POST /api/bookings/[id]/tracking`
**Auth:** Required (shop owner/employee only)
**Body:** `{ step: installation_step, note?: string, photos?: FormData }`
**Action:** INSERT tracking entry, upload photos to Storage, send notification to customer.

---

## Sprint 2 Routes — Social Layer

### Feed

#### `GET /api/feed`
**Auth:** Required
**Query params:** `page`, `limit`, `type` (post_type filter)
**Returns:** Paginated feed of posts from users the current user follows + featured/trending posts. Posts include: author info (avatar, username, is_verified), image_urls, caption, tags, like_count, comment_count, `is_liked` (by current user), `is_saved` (by current user).
**Algorithm (v1, simple):** Chronological feed of followed users' posts, interleaved with featured posts every 5th position. Trending = most likes in last 7 days.

#### `GET /api/explore`
**Auth:** Optional
**Query params:** `category`, `search`, `sort` (`trending|recent|popular`), `page`, `limit`
**Returns:** Discovery feed — all public posts, searchable and filterable. No follow-based filtering.

---

### Posts

#### `POST /api/posts`
**Auth:** Required
**Body:** `FormData` with:
- `images[]`: image files (1-10)
- `caption`: text
- `build_id?`: UUID (link to a build)
- `shop_id?`: UUID (tag a shop)
- `type`: post_type
- `tags[]`: string array (product/brand tags)
- `show_price`: boolean
**Action:** Upload images to `post-media` bucket, INSERT post.
**Returns:** Created post.

#### `GET /api/posts/[id]`
**Auth:** Optional
**Returns:** Full post with author, build details (if linked), shop (if tagged), comments (first page), `is_liked`, `is_saved`.

#### `PATCH /api/posts/[id]`
**Auth:** Required (author only)
**Body:** `{ caption?, tags?, show_price? }`

#### `DELETE /api/posts/[id]`
**Auth:** Required (author only)
**Action:** Soft delete.

---

### Likes

#### `POST /api/posts/[id]/like`
**Auth:** Required
**Action:** INSERT into `likes` (unique constraint handles duplicates). Trigger updates `like_count`. Send notification to post author.
**Returns:** `{ data: { liked: true } }`

#### `DELETE /api/posts/[id]/like`
**Auth:** Required
**Action:** DELETE from `likes`. Trigger decrements `like_count`.
**Returns:** `{ data: { liked: false } }`

---

### Comments

#### `GET /api/posts/[id]/comments`
**Auth:** Optional
**Query params:** `page`, `limit`
**Returns:** Paginated flat comment list with author info. Top-level comments first, replies nested under parent.

#### `POST /api/posts/[id]/comments`
**Auth:** Required
**Body:** `{ body: string, parent_id?: UUID }`
**Action:** INSERT comment. Send notification to post author (and parent comment author if reply).
**Returns:** Created comment.

#### `DELETE /api/comments/[id]`
**Auth:** Required (author only)
**Action:** Soft delete (`is_active = false`).

---

### Follows

#### `POST /api/users/[username]/follow`
**Auth:** Required
**Action:** INSERT into `follows`. Send notification to followed user.
**Returns:** `{ data: { following: true } }`

#### `DELETE /api/users/[username]/follow`
**Auth:** Required
**Action:** DELETE from `follows`.
**Returns:** `{ data: { following: false } }`

#### `GET /api/users/[username]/followers`
**Auth:** Optional
**Returns:** Paginated follower list.

#### `GET /api/users/[username]/following`
**Auth:** Optional
**Returns:** Paginated following list.

---

### Saves

#### `POST /api/posts/[id]/save`
**Auth:** Required
**Body:** `{ collection?: string }`
**Returns:** `{ data: { saved: true } }`

#### `DELETE /api/posts/[id]/save`
**Auth:** Required
**Returns:** `{ data: { saved: false } }`

#### `GET /api/users/me/saves`
**Auth:** Required
**Query params:** `collection`, `page`, `limit`
**Returns:** Paginated saved posts.

---

### Notifications

#### `GET /api/notifications`
**Auth:** Required
**Query params:** `page`, `limit`, `unread_only` (boolean)
**Returns:** Paginated notifications with actor info.

#### `POST /api/notifications/mark-read`
**Auth:** Required
**Body:** `{ notification_ids: UUID[] }` or `{ all: true }`
**Action:** Set `is_read = true` for specified notifications.

---

### Reports

#### `POST /api/reports`
**Auth:** Required
**Body:** `{ post_id?: UUID, comment_id?: UUID, user_id?: UUID, reason: report_reason, details?: string }`
**Action:** INSERT report. One of `post_id`, `comment_id`, or `user_id` must be provided.

---

## Sprint 4 Routes — Design Studio

#### `POST /api/designs`
**Auth:** Required
**Body:** `{ title, vehicle_id?, canvas_data: JSONB, tags?, vehicle_types? }`
**Returns:** Created design.

#### `GET /api/designs`
**Auth:** Required
**Returns:** Current user's saved designs.

#### `GET /api/designs/[id]`
**Auth:** Required (owner or public)
**Returns:** Full design with canvas_data.

#### `PATCH /api/designs/[id]`
**Auth:** Required (owner only)
**Body:** `{ title?, canvas_data?, tags?, is_public? }`

#### `POST /api/designs/[id]/export`
**Auth:** Required (owner only)
**Body:** `{ format: 'svg' | 'png' | 'pdf', resolution?: '1x' | '2x' | '4x' }`
**Action:** Generate export file, upload to Storage.
**Returns:** `{ data: { export_url } }`

---

## Sprint 5 Routes — Marketplace

#### `POST /api/marketplace/listings`
**Auth:** Required (creator only)
**Body:** `{ design_id, title, description, price, vehicle_types, application_type, style, customizable_layers }`

#### `GET /api/marketplace/listings`
**Auth:** None
**Query params:** `vehicle_type`, `application_type`, `style`, `min_price`, `max_price`, `search`, `sort` (`popular|recent|price_low|price_high`), `page`, `limit`

#### `GET /api/marketplace/listings/[id]`
**Auth:** Optional

#### `POST /api/marketplace/listings/[id]/purchase`
**Auth:** Required
**Body:** `{ payment_method_id: string }` (Stripe)
**Action:** Charge via Stripe, create `marketplace_orders` record, calculate platform fee per creator tier, initiate payout.

#### `POST /api/marketplace/listings/[id]/try-on`
**Auth:** Required
**Body:** `{ vehicle_id: UUID }`
**Purpose:** Preview this design on the user's car (the "Try on My Car" button from the spec).

#### `GET /api/creators/[username]`
**Auth:** None
**Returns:** Creator public profile with portfolio, listings, stats, reviews.

#### `POST /api/commissions`
**Auth:** Required
**Body:** `{ creator_id, listing_id?, description, reference_urls?, vehicle_id? }`

#### `GET /api/commissions`
**Auth:** Required
**Returns:** Commissions where user is buyer OR creator.

#### `PATCH /api/commissions/[id]`
**Auth:** Required (buyer or creator, depending on field)
**Body:** `{ status?, agreed_price?, final_design_id? }`

---

## Shared Utilities

### `/lib/supabase/client.ts`
Export browser Supabase client (for client components).

### `/lib/supabase/server.ts`
Export server Supabase client (for API routes and server components). Use `createServerClient` from `@supabase/ssr`.

### `/lib/supabase/admin.ts`
Export service role client (for webhooks and admin operations that bypass RLS).

### `/lib/validations/`
Zod schemas for every API body. One file per resource:
- `user.ts`, `vehicle.ts`, `product.ts`, `build.ts`, `shop.ts`, `booking.ts`, `post.ts`, `comment.ts`, `design.ts`, `marketplace.ts`, `commission.ts`

### `/lib/utils/pricing.ts`
Helper functions:
- `centsToDisplay(cents: number, currency?: string): string` → e.g. "$1,250.00"
- `displayToCents(display: string): number`
- `calculateBuildTotal(items: BuildItem[]): number`
- `calculatePlatformFee(amount: number, tier: CreatorTier): { fee: number, payout: number }`

### `/lib/utils/claude.ts`
Claude API wrapper for vehicle detection:
- `detectVehicle(imageUrl: string): Promise<VehicleDetection>`

---

**Mirmi: Build routes as you build screens.** When you build the Upload flow screen, build `POST /api/vehicles` at the same time. Don't build API routes in isolation — they should be wired up to working UI immediately.

---

*— Hammad*
