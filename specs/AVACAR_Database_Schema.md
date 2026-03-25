# AVACAR — Database Schema (Supabase / PostgreSQL)

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** AVACAR_Unified_UX_Spec_v2.md, AVACAR_Spec_Addendum_v2.1.md, AVACAR_Mirmi_Execution_Brief.md

---

## Overview

This document defines every database table, column, type, relationship, index, and Row Level Security (RLS) policy for the AVACAR consumer app. All tables live in Supabase (PostgreSQL). Auth is handled by Clerk — Clerk user IDs are the foreign key reference for all user-owned data.

**Convention rules Mirmi must follow:**
- All table names: `snake_case`, plural (e.g. `vehicles`, `build_items`)
- All column names: `snake_case`
- All primary keys: `id UUID DEFAULT gen_random_uuid()`
- All tables get `created_at TIMESTAMPTZ DEFAULT now()` and `updated_at TIMESTAMPTZ DEFAULT now()`
- Soft deletes where noted: `deleted_at TIMESTAMPTZ NULL`
- Foreign keys use `_id` suffix (e.g. `user_id`, `vehicle_id`)
- Enums defined as PostgreSQL ENUM types
- All monetary values stored as `INTEGER` (cents), displayed as dollars on frontend

---

## Enums

```sql
CREATE TYPE vehicle_body AS ENUM (
  'sedan', 'coupe', 'suv', 'truck', 'hatchback', 'convertible',
  'wagon', 'van', 'minivan', 'crossover', 'sports_car', 'supercar',
  'hypercar', 'pickup', 'other'
);

CREATE TYPE build_status AS ENUM (
  'draft', 'in_progress', 'quoted', 'booked', 'in_shop', 'completed', 'cancelled'
);

CREATE TYPE booking_status AS ENUM (
  'pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show'
);

CREATE TYPE installation_step AS ENUM (
  'booking_confirmed', 'vehicle_received', 'prep_started', 'install_in_progress',
  'quality_check', 'ready_for_pickup', 'picked_up'
);

CREATE TYPE product_category AS ENUM (
  'wrap', 'wheel', 'tint', 'ppf', 'body_kit', 'accessory'
);

CREATE TYPE wrap_coverage AS ENUM (
  'full', 'partial_hood', 'partial_roof', 'partial_mirrors',
  'partial_bumpers', 'partial_trunk', 'partial_pillars', 'chrome_delete', 'custom'
);

CREATE TYPE tint_type AS ENUM (
  'ceramic', 'carbon', 'dyed', 'metallic', 'hybrid'
);

CREATE TYPE ppf_coverage AS ENUM (
  'full_body', 'full_front', 'partial_front', 'track_pack', 'high_impact', 'custom'
);

CREATE TYPE shop_tier AS ENUM (
  'standard', 'certified', 'elite'
);

CREATE TYPE post_type AS ENUM (
  'build_share', 'before_after', 'inspiration', 'question', 'review'
);

CREATE TYPE report_reason AS ENUM (
  'spam', 'inappropriate', 'copyright', 'misleading', 'harassment', 'other'
);

CREATE TYPE notification_type AS ENUM (
  'like', 'comment', 'follow', 'booking_update', 'build_complete',
  'shop_message', 'system', 'mention'
);

CREATE TYPE design_marketplace_status AS ENUM (
  'draft', 'pending_review', 'published', 'rejected', 'archived'
);

CREATE TYPE order_status AS ENUM (
  'pending', 'paid', 'delivered', 'refunded', 'disputed'
);

CREATE TYPE creator_tier AS ENUM (
  'starter', 'pro', 'elite'
);
```

---

## Sprint 1 Tables — Foundation + Commerce

### `users`

Synced from Clerk. Created via webhook on first sign-up.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  is_shop_owner BOOLEAN DEFAULT false,
  is_creator BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  onboarding_completed BOOLEAN DEFAULT false,
  preferences JSONB DEFAULT '{}',
  -- preferences shape: { units: 'imperial'|'metric', currency: 'USD'|'CAD'|..., notifications: {...} }
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_username ON users(username);
```

**RLS:**
- SELECT: Public (profiles are public)
- INSERT: Service role only (Clerk webhook)
- UPDATE: `auth.uid() = clerk_id` (own profile only)
- DELETE: Service role only

---

### `vehicles`

User's vehicles — both detected from uploads and manually added.

```sql
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER,
  color TEXT,
  body_type vehicle_body,
  trim TEXT,
  vin TEXT,
  nickname TEXT,
  photo_url TEXT NOT NULL,
  photo_storage_path TEXT NOT NULL,
  detection_confidence FLOAT,
  detection_raw JSONB,
  -- detection_raw: full Claude API response for vehicle identification
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_vehicles_user_id ON vehicles(user_id);
```

**RLS:**
- SELECT: Own vehicles only (`user_id = auth.uid()`) + public for shared builds
- INSERT/UPDATE/DELETE: Own vehicles only

---

### `product_brands`

Manufacturers of wraps, wheels, tint, PPF, body kits, accessories.

```sql
CREATE TABLE product_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  website TEXT,
  categories product_category[] NOT NULL,
  -- which categories this brand serves, e.g. ['wrap','ppf'] for 3M
  is_partner BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_product_brands_slug ON product_brands(slug);
CREATE INDEX idx_product_brands_categories ON product_brands USING GIN(categories);
```

---

### `products`

The unified product catalog. Every wrap color, wheel model, tint level, PPF option, body kit, and accessory.

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES product_brands(id) ON DELETE SET NULL,
  category product_category NOT NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  sku TEXT,
  thumbnail_url TEXT,
  image_urls TEXT[],
  
  -- PRICING (in cents)
  price_min INTEGER,
  price_max INTEGER,
  price_unit TEXT, -- 'per_sqft', 'per_window', 'per_panel', 'flat', 'each'
  
  -- CATEGORY-SPECIFIC METADATA (JSONB per category)
  metadata JSONB DEFAULT '{}',
  /*
    wrap: { finish: 'gloss'|'matte'|'satin'|'metallic'|'chrome'|'color_shift'|'textured',
            color_hex: '#...', color_family: 'red'|'blue'|..., series: '2080'|'1080'|... }
    wheel: { diameter_options: [19,20,21,22], width: '9.5', bolt_pattern: '5x114.3',
             finish: 'brushed'|'polished'|'matte_black'|..., pieces: 1|2|3,
             forged: true|false, weight_lbs: 22 }
    tint: { vlt: 5|15|20|35|50|70, type: 'ceramic'|'carbon'|...,
            heat_rejection: 0.60, uv_rejection: 0.99 }
    ppf: { thickness_mil: 8, self_healing: true, warranty_years: 10 }
    body_kit: { pieces: ['front_lip','side_skirts','rear_diffuser','wing'],
                material: 'carbon_fiber'|'frp'|'abs', vehicle_specific: true }
    accessory: { sub_type: 'exhaust'|'suspension'|'interior'|'lighting'|'performance' }
  */
  
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand_id ON products(brand_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_metadata ON products USING GIN(metadata);
```

---

### `builds`

A build is a user's customization session on a specific vehicle. One vehicle can have many builds.

```sql
CREATE TABLE builds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  status build_status DEFAULT 'draft',
  
  -- RENDER OUTPUT
  render_url TEXT,
  render_storage_path TEXT,
  render_before_url TEXT,
  render_after_url TEXT,
  
  -- PRICING SUMMARY (cents)
  total_estimate INTEGER DEFAULT 0,
  
  -- BUILD METADATA
  tags TEXT[],
  notes TEXT,
  is_public BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_builds_user_id ON builds(user_id);
CREATE INDEX idx_builds_vehicle_id ON builds(vehicle_id);
CREATE INDEX idx_builds_status ON builds(status);
CREATE INDEX idx_builds_is_public ON builds(is_public) WHERE is_public = true;
```

---

### `build_items`

Individual line items in a build. Each product selection = one row.

```sql
CREATE TABLE build_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  build_id UUID REFERENCES builds(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  category product_category NOT NULL,
  
  -- CUSTOMIZATION OPTIONS
  options JSONB DEFAULT '{}',
  /*
    wrap: { coverage: 'full'|'partial_...', panels: ['hood','roof',...] }
    wheel: { diameter: 20, front_offset: 35, rear_offset: 40, tire_size: '255/35R20' }
    tint: { windows: ['front','rear','sides','windshield'], vlt: 20 }
    ppf: { coverage: 'full_front'|..., panels: ['hood','fenders','bumper','mirrors'] }
    body_kit: { selected_pieces: ['front_lip','wing'] }
    accessory: { variant: '...', quantity: 1 }
  */
  
  -- PRICING (cents)
  price_estimate INTEGER DEFAULT 0,
  
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_build_items_build_id ON build_items(build_id);
CREATE INDEX idx_build_items_category ON build_items(category);
```

---

### `shops`

Installation shops / wrap shops.

```sql
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  logo_url TEXT,
  cover_url TEXT,
  photo_urls TEXT[],
  
  -- LOCATION
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state_province TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'CA',
  latitude FLOAT,
  longitude FLOAT,
  
  -- CONTACT
  phone TEXT,
  email TEXT,
  website TEXT,
  instagram TEXT,
  
  -- BUSINESS
  tier shop_tier DEFAULT 'standard',
  services product_category[] DEFAULT '{}',
  -- which services this shop offers
  certifications TEXT[],
  -- e.g. ['3M Certified','Avery Certified','XPEL Certified']
  
  -- PRICING & AVAILABILITY
  price_tier INTEGER DEFAULT 2, -- 1=budget, 2=mid, 3=premium
  lead_time_days INTEGER DEFAULT 7,
  accepts_bookings BOOLEAN DEFAULT true,
  
  -- STATS (denormalized, updated via triggers)
  avg_rating FLOAT DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  completed_jobs INTEGER DEFAULT 0,
  
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shops_slug ON shops(slug);
CREATE INDEX idx_shops_location ON shops USING GIST (
  ll_to_earth(latitude, longitude)
);
CREATE INDEX idx_shops_services ON shops USING GIN(services);
CREATE INDEX idx_shops_tier ON shops(tier);
```

---

### `shop_hours`

Operating hours per shop.

```sql
CREATE TABLE shop_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL, -- 0=Sunday, 6=Saturday
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_shop_hours_shop_id ON shop_hours(shop_id);
```

---

### `bookings`

When a user books an installation at a shop.

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE NOT NULL,
  build_id UUID REFERENCES builds(id) ON DELETE SET NULL,
  
  status booking_status DEFAULT 'pending',
  
  -- SCHEDULING
  preferred_date DATE,
  preferred_time_slot TEXT, -- 'morning', 'afternoon', 'any'
  confirmed_date DATE,
  confirmed_time TIME,
  
  -- PRICING (cents)
  quoted_total INTEGER,
  deposit_amount INTEGER,
  deposit_paid BOOLEAN DEFAULT false,
  
  -- DETAILS
  notes TEXT,
  shop_notes TEXT, -- internal notes from the shop
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_shop_id ON bookings(shop_id);
CREATE INDEX idx_bookings_status ON bookings(status);
```

---

### `installation_tracking`

Progress updates for an active booking/installation. The "Uber tracking" experience.

```sql
CREATE TABLE installation_tracking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  step installation_step NOT NULL,
  note TEXT,
  photo_urls TEXT[],
  updated_by UUID REFERENCES users(id),
  -- the shop employee who posted the update
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_installation_tracking_booking_id ON installation_tracking(booking_id);
```

---

## Sprint 2 Tables — Social Layer

### `posts`

Social feed posts — a user sharing a build, before/after, inspiration, question, or review.

```sql
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  build_id UUID REFERENCES builds(id) ON DELETE SET NULL,
  shop_id UUID REFERENCES shops(id) ON DELETE SET NULL,
  
  type post_type DEFAULT 'build_share',
  caption TEXT,
  image_urls TEXT[] NOT NULL,
  video_url TEXT,
  
  -- BUILD TAGS (denormalized for feed display)
  tags TEXT[],
  -- e.g. ['3M Satin Dark Grey', 'HRE S101', 'XPEL Ultimate Plus']
  
  -- STATS (denormalized, updated via triggers)
  like_count INTEGER DEFAULT 0,
  comment_count INTEGER DEFAULT 0,
  share_count INTEGER DEFAULT 0,
  save_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  
  -- COST SHARING
  show_price BOOLEAN DEFAULT false,
  total_cost INTEGER, -- cents, only visible if show_price = true
  
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_tags ON posts USING GIN(tags);
CREATE INDEX idx_posts_is_featured ON posts(is_featured) WHERE is_featured = true;
```

**RLS:**
- SELECT: Public (all active posts)
- INSERT: Authenticated users only
- UPDATE/DELETE: Own posts only

---

### `likes`

```sql
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX idx_likes_post_id ON likes(post_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
```

---

### `comments`

```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  -- NULL = top-level comment, set = reply
  body TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_comments_post_id ON comments(post_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
```

---

### `follows`

```sql
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(follower_id, following_id)
);

CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);
```

---

### `saves`

Users saving posts to their collection.

```sql
CREATE TABLE saves (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  collection TEXT DEFAULT 'default',
  -- future: users can organize saves into named collections
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, post_id)
);

CREATE INDEX idx_saves_user_id ON saves(user_id);
CREATE INDEX idx_saves_post_id ON saves(post_id);
```

---

### `notifications`

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title TEXT NOT NULL,
  body TEXT,
  
  -- REFERENCE (what triggered this notification)
  actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(user_id, is_read) WHERE is_read = false;
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

---

### `reports`

Content moderation reports.

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  reason report_reason NOT NULL,
  details TEXT,
  resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_reports_resolved ON reports(resolved) WHERE resolved = false;
```

---

## Sprint 3 Tables — Garage (extends `vehicles` and `builds`)

The Garage feature is built on top of existing `vehicles` and `builds` tables. No new tables needed — just frontend views that query:
- `vehicles` WHERE `user_id = current_user` — vehicle list
- `builds` WHERE `vehicle_id = selected_vehicle` — build history per vehicle
- `build_items` JOIN `products` — detailed mod list per build

---

## Sprint 4 Tables — Design Studio

### `designs`

Saved designs from the Design Studio canvas.

```sql
CREATE TABLE designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  preview_urls TEXT[],
  
  -- CANVAS DATA
  canvas_data JSONB NOT NULL,
  -- Full canvas state: layers, positions, transforms, colors, decals, text, shapes
  -- This is the "save file" — loading a design restores this exact state
  
  -- EXPORT
  export_svg_url TEXT,
  export_png_url TEXT,
  export_pdf_url TEXT,
  
  -- METADATA
  tags TEXT[],
  vehicle_types vehicle_body[],
  -- which body types this design fits
  
  is_template BOOLEAN DEFAULT false,
  is_public BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_designs_user_id ON designs(user_id);
CREATE INDEX idx_designs_is_public ON designs(is_public) WHERE is_public = true;
CREATE INDEX idx_designs_tags ON designs USING GIN(tags);
```

---

## Sprint 5 Tables — Design Marketplace

### `marketplace_listings`

Designs published to the marketplace for sale.

```sql
CREATE TABLE marketplace_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID REFERENCES designs(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT,
  preview_urls TEXT[] NOT NULL,
  
  -- PRICING (cents)
  price INTEGER NOT NULL,
  is_free BOOLEAN DEFAULT false,
  
  -- TAXONOMY (from spec)
  vehicle_types vehicle_body[],
  application_type TEXT[], -- 'full_wrap', 'partial', 'livery', 'decal_kit', 'accent'
  style TEXT[], -- 'racing', 'luxury', 'urban', 'organic', 'geometric', 'abstract', 'brand', 'military', 'retro'
  
  -- STATS
  download_count INTEGER DEFAULT 0,
  rating_avg FLOAT DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  
  status design_marketplace_status DEFAULT 'draft',
  
  -- LAYER CONFIG (what buyers can customize)
  customizable_layers JSONB DEFAULT '[]',
  /* Array of { layer_id, layer_name, editable_properties: ['color','position','scale'] } */
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_marketplace_listings_seller_id ON marketplace_listings(seller_id);
CREATE INDEX idx_marketplace_listings_status ON marketplace_listings(status);
CREATE INDEX idx_marketplace_listings_price ON marketplace_listings(price);
CREATE INDEX idx_marketplace_listings_vehicle_types ON marketplace_listings USING GIN(vehicle_types);
CREATE INDEX idx_marketplace_listings_style ON marketplace_listings USING GIN(style);
```

---

### `marketplace_orders`

Purchase records for marketplace designs.

```sql
CREATE TABLE marketplace_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES marketplace_listings(id) ON DELETE SET NULL NOT NULL,
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  
  status order_status DEFAULT 'pending',
  
  -- PRICING (cents)
  amount INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL, -- our cut
  seller_payout INTEGER NOT NULL, -- their cut
  
  stripe_payment_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_marketplace_orders_buyer_id ON marketplace_orders(buyer_id);
CREATE INDEX idx_marketplace_orders_seller_id ON marketplace_orders(seller_id);
CREATE INDEX idx_marketplace_orders_listing_id ON marketplace_orders(listing_id);
```

---

### `marketplace_reviews`

```sql
CREATE TABLE marketplace_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID REFERENCES marketplace_listings(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES marketplace_orders(id) ON DELETE SET NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_marketplace_reviews_listing_id ON marketplace_reviews(listing_id);
```

---

### `creator_profiles`

Extended profile data for Design Studio creators who sell on the marketplace.

```sql
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier creator_tier DEFAULT 'starter',
  -- starter: 70% rev share, pro: 75%, elite: 80%
  
  portfolio_urls TEXT[],
  specialties TEXT[],
  -- e.g. ['racing liveries', 'luxury wraps', 'anime itasha']
  
  stripe_connect_id TEXT,
  -- Stripe Connect account for payouts
  
  -- STATS (denormalized)
  total_sales INTEGER DEFAULT 0,
  total_revenue INTEGER DEFAULT 0, -- cents
  total_designs INTEGER DEFAULT 0,
  avg_rating FLOAT DEFAULT 0,
  
  accepts_commissions BOOLEAN DEFAULT false,
  commission_starting_price INTEGER, -- cents
  commission_turnaround_days INTEGER,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_creator_profiles_user_id ON creator_profiles(user_id);
CREATE INDEX idx_creator_profiles_tier ON creator_profiles(tier);
```

---

### `commissions`

The "Request Changes" / custom design commission system (the Fiverr-for-wraps concept).

```sql
CREATE TABLE commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  listing_id UUID REFERENCES marketplace_listings(id) ON DELETE SET NULL,
  -- NULL = fully custom commission, set = modification of existing design
  
  description TEXT NOT NULL,
  reference_urls TEXT[],
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE SET NULL,
  
  -- PRICING (cents)
  agreed_price INTEGER,
  deposit_amount INTEGER,
  deposit_paid BOOLEAN DEFAULT false,
  
  status TEXT DEFAULT 'requested',
  -- 'requested', 'quoted', 'accepted', 'in_progress', 'review', 'revision', 'completed', 'cancelled'
  
  revision_count INTEGER DEFAULT 0,
  max_revisions INTEGER DEFAULT 2,
  
  -- DELIVERABLE
  final_design_id UUID REFERENCES designs(id) ON DELETE SET NULL,
  
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_commissions_buyer_id ON commissions(buyer_id);
CREATE INDEX idx_commissions_creator_id ON commissions(creator_id);
CREATE INDEX idx_commissions_status ON commissions(status);
```

---

## Supabase Storage Buckets

Create these storage buckets in Supabase:

| Bucket | Access | Purpose |
|--------|--------|---------|
| `avatars` | Public | User profile photos |
| `vehicle-photos` | Private | Original uploaded car photos |
| `renders` | Private | AI-generated render outputs |
| `post-media` | Public | Images/videos attached to social posts |
| `shop-media` | Public | Shop logos, covers, gallery photos |
| `designs` | Private | Design Studio canvas exports (SVG, PNG, PDF) |
| `design-thumbnails` | Public | Marketplace listing preview images |
| `installation-photos` | Private | Progress photos from shop during install |

**Naming convention for storage paths:**
```
{bucket}/{user_id}/{entity_id}/{filename}
Example: vehicle-photos/abc123/def456/original.jpg
Example: renders/abc123/build789/after.png
```

---

## Triggers & Functions

### Auto-update `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables:
CREATE TRIGGER set_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at BEFORE UPDATE ON builds FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- ... (apply to every table with updated_at)
```

### Denormalized count triggers

```sql
-- Like count on posts
CREATE OR REPLACE FUNCTION update_post_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET like_count = like_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET like_count = like_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_post_like_count
AFTER INSERT OR DELETE ON likes
FOR EACH ROW EXECUTE FUNCTION update_post_like_count();

-- Comment count on posts
CREATE OR REPLACE FUNCTION update_post_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comment_count = comment_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comment_count = comment_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_post_comment_count
AFTER INSERT OR DELETE ON comments
FOR EACH ROW EXECUTE FUNCTION update_post_comment_count();
```

---

## Migration Order

Run migrations in this order (respects foreign key dependencies):

1. Create all ENUM types
2. `users`
3. `vehicles`
4. `product_brands`
5. `products`
6. `builds`
7. `build_items`
8. `shops`
9. `shop_hours`
10. `bookings`
11. `installation_tracking`
12. `posts`
13. `likes`
14. `comments`
15. `follows`
16. `saves`
17. `notifications`
18. `reports`
19. `designs`
20. `marketplace_listings`
21. `marketplace_orders`
22. `marketplace_reviews`
23. `creator_profiles`
24. `commissions`
25. Create all triggers & functions
26. Create all storage buckets
27. Apply RLS policies

**Mirmi: Only create tables for the sprint you're currently building.** Don't run Sprint 5 migrations during Sprint 1. But this document gives you the full picture so you never paint yourself into a corner with schema decisions.

---

*— Hammad*
