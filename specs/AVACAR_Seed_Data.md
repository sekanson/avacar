# AVACAR — Seed Data Specification

**For:** Mirmi (AI Development Agent)
**From:** Hammad, Co-founder & Creative Director, xix3D Inc.
**Date:** March 25, 2026
**References:** AVACAR_Database_Schema.md

---

## Overview

This document defines the seed data Mirmi must populate in Supabase for development and demo purposes. Use real brand names, real product names, and realistic pricing. This makes the app feel production-ready from day one and avoids the "lorem ipsum" problem.

Create a seed script at `/lib/seed/index.ts` that can be run with `npx tsx lib/seed/index.ts`.

---

## 1. Product Brands

Seed these brands with their real logos (download from their websites or use placeholder URLs):

### Wraps
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| 3M | `3m` | Yes | wrap, ppf |
| Avery Dennison | `avery-dennison` | Yes | wrap |
| KPMF | `kpmf` | No | wrap |
| Inozetek | `inozetek` | Yes | wrap |
| TeckWrap | `teckwrap` | No | wrap |
| Hexis | `hexis` | No | wrap |
| Oracal | `oracal` | No | wrap |
| CheetahWrap | `cheetahwrap` | No | wrap |

### Wheels
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| HRE Wheels | `hre` | Yes | wheel |
| Brixton Forged | `brixton-forged` | Yes | wheel |
| Vossen | `vossen` | Yes | wheel |
| Velos Designwerks | `velos` | Yes | wheel |
| Rotiform | `rotiform` | No | wheel |
| BBS | `bbs` | No | wheel |
| Forgiato | `forgiato` | No | wheel |
| ADV.1 | `adv1` | No | wheel |
| AG Wheels | `ag-wheels` | No | wheel |
| Anrky | `anrky` | No | wheel |

### Tint
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| XPEL | `xpel` | No | tint, ppf |
| 3M | `3m` | Yes | tint |
| Llumar | `llumar` | No | tint |
| SunTek | `suntek` | No | tint, ppf |
| Ceramic Pro | `ceramic-pro` | No | tint |

### PPF
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| XPEL | `xpel` | No | ppf |
| SunTek | `suntek` | No | ppf |
| 3M | `3m` | Yes | ppf |
| SteelSkin | `steelskin` | No | ppf |

### Body Kits
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| Liberty Walk | `liberty-walk` | Yes | body_kit |
| Vorsteiner | `vorsteiner` | No | body_kit |
| Mansory | `mansory` | No | body_kit |
| Novitec | `novitec` | No | body_kit |
| 1016 Industries | `1016-industries` | No | body_kit |
| Robot Craftsman | `robot-craftsman` | No | body_kit |

### Accessories
| Brand | Slug | Partner | Categories |
|-------|------|---------|------------|
| Akrapovic | `akrapovic` | No | accessory |
| Capristo | `capristo` | No | accessory |
| KW Suspension | `kw-suspension` | No | accessory |
| Air Lift Performance | `air-lift` | No | accessory |
| Brembo | `brembo` | No | accessory |

---

## 2. Products — Wraps

Seed **at least 60 wrap products** across brands. Here's the distribution and sample entries:

### 3M 2080 Series (15 products)
| Name | Finish | Color Hex | Color Family | Price Min (cents) | Price Max (cents) |
|------|--------|-----------|-------------|-------------------|-------------------|
| 3M 2080 Gloss Black | gloss | #0A0A0A | black | 250000 | 400000 |
| 3M 2080 Satin Dark Grey | satin | #3A3A3A | grey | 250000 | 400000 |
| 3M 2080 Matte White | matte | #F5F5F5 | white | 250000 | 400000 |
| 3M 2080 Gloss Hot Rod Red | gloss | #CC0000 | red | 250000 | 400000 |
| 3M 2080 Satin Flip Ghost Pearl | color_shift | #C4B5A0 | pearl | 350000 | 550000 |
| 3M 2080 Gloss Midnight Blue | gloss | #1A1A4E | blue | 250000 | 400000 |
| 3M 2080 Matte Military Green | matte | #3B4A2B | green | 250000 | 400000 |
| 3M 2080 Satin Thundercloud | satin | #5A5A6E | grey | 250000 | 400000 |
| 3M 2080 Gloss Burnt Orange | gloss | #CC5500 | orange | 250000 | 400000 |
| 3M 2080 Satin Ocean Shimmer | satin | #2E5E7E | blue | 300000 | 450000 |
| 3M 2080 Chrome Silver | chrome | #C0C0C0 | silver | 500000 | 800000 |
| 3M 2080 Matte Charcoal Metallic | metallic | #4A4A4A | grey | 280000 | 430000 |
| 3M 2080 Gloss Deep Space | metallic | #1A1A2E | black | 300000 | 450000 |
| 3M 2080 Satin Bitter Yellow | satin | #D4C100 | yellow | 280000 | 430000 |
| 3M 2080 Brushed Titanium | textured | #787878 | grey | 350000 | 550000 |

**Price unit for all wraps:** `per_sqft` (but displayed as full-car range estimates on the frontend)

### Avery Dennison Supreme Wrapping Film (10 products)
Follow the same pattern. Include: Gloss Black, Satin Pearl White, Matte Khaki Green, Gloss Intense Blue, Satin Dark Basalt, Gloss Burgundy, ColorFlow Rising Sun (color_shift), Matte Charcoal, Satin Metallic Cool Grey, Chrome Gold.

### Inozetek (10 products)
Include: Super Gloss Midnight Purple, Super Gloss Racing Red, Super Gloss Miami Blue, Satin Frozen Blue, Matte Cement Grey, Super Gloss Metallic Storm Grey, Super Gloss Pearl White, Super Gloss Nardo Grey, Satin Khaki Green, Super Gloss Tiffany Blue.

### KPMF (8 products)
### TeckWrap (7 products)
### Hexis (5 products)
### Oracal (5 products)

**Mirmi: Generate realistic product names, hex colors, and finishes for the remaining brands. Use real product line names when possible (KPMF K75400 series, TeckWrap CL series, etc.).**

---

## 3. Products — Wheels

Seed **at least 30 wheel products**:

### HRE Wheels (8 products)
| Name | Diameter Options | Finish | Pieces | Forged | Price Min | Price Max |
|------|-----------------|--------|--------|--------|-----------|-----------|
| HRE S101 | [19,20,21,22] | brushed_titanium | 3 | true | 800000 | 1200000 |
| HRE P101 | [19,20,21] | satin_black | 1 | true | 500000 | 750000 |
| HRE FF04 | [19,20,21,22] | tarmac | 1 | false | 280000 | 400000 |
| HRE S207H | [20,21,22,23] | polished_clear | 3 | true | 1000000 | 1500000 |
| HRE R101 Lightweight | [19,20] | gloss_black | 1 | true | 600000 | 850000 |
| HRE FF15 | [20,21] | stone_grey | 1 | false | 300000 | 420000 |
| HRE S104 | [20,21,22] | frozen_dark_clear | 3 | true | 900000 | 1300000 |
| HRE P107 | [19,20,21] | brushed_dark | 1 | true | 550000 | 780000 |

### Brixton Forged (6 products)
Include: PF1, RF7, CM5, WR3, PF5 Duo, M53. Mix of 1-piece and multi-piece.

### Vossen (6 products)
Include: HF-5, HF-7, VFS-1, CV3R, M-X3, S17-01. Mix of forged and flow-formed.

### Velos Designwerks (4 products)
Include: S3, S6, S10, D5.

### Rotiform (3 products)
### BBS (3 products)

**Price unit for all wheels:** `each` (per wheel, set of 4 calculated on frontend)

---

## 4. Products — Tint

Seed **at least 15 tint products**:

| Brand | Name | VLT | Type | Heat Rejection | UV Rejection | Price Min | Price Max |
|-------|------|-----|------|----------------|-------------|-----------|-----------|
| XPEL | XPEL PRIME XR Plus 5% | 5 | ceramic | 0.98 | 0.99 | 40000 | 70000 |
| XPEL | XPEL PRIME XR Plus 15% | 15 | ceramic | 0.95 | 0.99 | 40000 | 70000 |
| XPEL | XPEL PRIME XR Plus 35% | 35 | ceramic | 0.88 | 0.99 | 40000 | 70000 |
| XPEL | XPEL PRIME XR Plus 50% | 50 | ceramic | 0.78 | 0.99 | 35000 | 60000 |
| XPEL | XPEL PRIME XR Plus 70% | 70 | ceramic | 0.60 | 0.99 | 35000 | 60000 |
| 3M | 3M Ceramic IR 5% | 5 | ceramic | 0.95 | 0.99 | 35000 | 65000 |
| 3M | 3M Ceramic IR 20% | 20 | ceramic | 0.90 | 0.99 | 35000 | 65000 |
| 3M | 3M Ceramic IR 35% | 35 | ceramic | 0.85 | 0.99 | 35000 | 65000 |
| 3M | 3M Color Stable 20% | 20 | carbon | 0.44 | 0.99 | 20000 | 40000 |
| 3M | 3M Color Stable 35% | 35 | carbon | 0.39 | 0.99 | 20000 | 40000 |
| Llumar | Llumar IRX 15% | 15 | ceramic | 0.92 | 0.99 | 38000 | 68000 |
| Llumar | Llumar IRX 35% | 35 | ceramic | 0.85 | 0.99 | 38000 | 68000 |
| SunTek | SunTek CIR 5% | 5 | ceramic | 0.96 | 0.99 | 36000 | 62000 |
| SunTek | SunTek CIR 20% | 20 | ceramic | 0.91 | 0.99 | 36000 | 62000 |
| SunTek | SunTek CIR 50% | 50 | ceramic | 0.75 | 0.99 | 30000 | 55000 |

**Price unit:** `per_window`

---

## 5. Products — PPF

Seed **at least 10 PPF products**:

| Brand | Name | Thickness (mil) | Self-Healing | Warranty (years) | Price Min | Price Max |
|-------|------|-----------------|-------------|------------------|-----------|-----------|
| XPEL | XPEL Ultimate Plus | 8 | true | 10 | 500000 | 800000 |
| XPEL | XPEL Stealth (Matte) | 8 | true | 10 | 600000 | 950000 |
| SunTek | SunTek Ultra | 8 | true | 10 | 450000 | 750000 |
| SunTek | SunTek Ultra Matte | 8 | true | 10 | 550000 | 850000 |
| 3M | 3M Scotchgard Pro | 8 | true | 7 | 400000 | 700000 |
| 3M | 3M Pro Series 4.0 | 8 | true | 10 | 480000 | 780000 |
| SteelSkin | SteelSkin ZERO | 6 | true | 8 | 420000 | 680000 |
| SteelSkin | SteelSkin Matte | 6 | true | 8 | 500000 | 780000 |
| XPEL | XPEL Track Pack | 12 | true | 10 | 200000 | 350000 |
| SunTek | SunTek PPF Standard | 6 | false | 5 | 300000 | 550000 |

**Price unit:** `per_panel` (displayed as coverage-based total on frontend)

---

## 6. Products — Body Kits

Seed **at least 8 body kits**:

| Brand | Name | Pieces | Material | Vehicle Specific | Price Min | Price Max |
|-------|------|--------|----------|-----------------|-----------|-----------|
| Liberty Walk | LB-Silhouette Works GT (Lamborghini Huracán) | front_lip, wide_fenders, rear_wing, rear_diffuser | frp | true | 1500000 | 2500000 |
| Liberty Walk | LB-Works (BMW M4 G82) | front_lip, side_skirts, rear_diffuser, trunk_spoiler, wide_fenders | frp | true | 1200000 | 2000000 |
| Liberty Walk | LB-Works (Porsche 911 992) | front_bumper, wide_fenders, rear_wing, side_skirts | carbon_fiber | true | 2000000 | 3500000 |
| Vorsteiner | Edizione Aero (Lamborghini Huracán) | front_lip, side_skirts, rear_diffuser, rear_wing | carbon_fiber | true | 800000 | 1500000 |
| Mansory | Cabrera (Lamborghini Urus) | full_body_kit | carbon_fiber | true | 3000000 | 6000000 |
| Novitec | N-Largo (Ferrari F8) | front_bumper, wide_fenders, rear_diffuser, rear_wing, side_skirts | carbon_fiber | true | 2500000 | 4500000 |
| 1016 Industries | Aero Kit (McLaren 720S) | front_lip, side_blades, rear_diffuser, engine_cover | carbon_fiber | true | 1800000 | 3000000 |
| Robot Craftsman | Crypton (Tesla Model 3) | front_lip, side_skirts, rear_diffuser, trunk_spoiler | carbon_fiber | true | 400000 | 800000 |

**Price unit:** `flat`

---

## 7. Products — Accessories

Seed **at least 10 accessories**:

| Brand | Name | Sub-type | Price Min | Price Max |
|-------|------|----------|-----------|-----------|
| Akrapovic | Evolution Line (BMW M3/M4) | exhaust | 500000 | 700000 |
| Akrapovic | Slip-On Line (Porsche 911 GT3) | exhaust | 400000 | 600000 |
| Capristo | Valved Exhaust (Lamborghini Huracán) | exhaust | 600000 | 900000 |
| KW Suspension | V3 Coilovers (Universal) | suspension | 200000 | 350000 |
| KW Suspension | Clubsport 2-Way (Track) | suspension | 350000 | 500000 |
| Air Lift Performance | 3P Air Suspension Kit | suspension | 250000 | 400000 |
| Brembo | GT Big Brake Kit (6-piston, 380mm) | performance | 400000 | 600000 |
| Brembo | GT-R Big Brake Kit (6-piston, 405mm) | performance | 600000 | 850000 |
| Generic | Interior Carbon Fiber Trim Kit | interior | 80000 | 200000 |
| Generic | LED Ambient Interior Lighting | lighting | 30000 | 80000 |

**Price unit:** `each`

---

## 8. Demo Shops

Seed **6 demo shops** in the Greater Toronto Area (Mirmi can use these for development):

| Name | City | Tier | Services | Avg Rating | Price Tier |
|------|------|------|----------|------------|------------|
| Apex Wraps | Mississauga, ON | elite | wrap, ppf, tint | 4.9 | 3 |
| Stealth Auto Studios | Brampton, ON | certified | wrap, ppf, tint, body_kit | 4.7 | 2 |
| GTA Customs | Toronto, ON | elite | wrap, wheel, ppf, tint, body_kit, accessory | 4.8 | 3 |
| CleanCut Wraps | Vaughan, ON | certified | wrap, tint | 4.6 | 2 |
| AutoShield Pro | Oakville, ON | standard | ppf, tint | 4.4 | 1 |
| Prestige Detail Co. | Richmond Hill, ON | certified | wrap, ppf, tint, accessory | 4.5 | 2 |

**For each shop, also seed:**
- Operating hours (Mon-Fri 9am-6pm, Sat 10am-4pm, Sun closed)
- 3-5 demo reviews
- Realistic coordinates (use Google Maps to get real lat/lng for these cities)
- Certifications (e.g. "3M Certified Installer", "XPEL Certified", etc.)

---

## 9. Demo Users

Seed **5 demo users** for development (not real people):

| Username | Display Name | Bio | Builds |
|----------|-------------|-----|--------|
| @wrapsbyalex | Alex Turner | "Wrap life. 200+ installs and counting." | 3 builds |
| @midnight.drives | Priya Sharma | "Nocturnal car content. DMs open for collabs." | 2 builds |
| @stancedaily | Marcus Chen | "Low and slow. Static gang." | 4 builds |
| @detailqueen | Sarah Kim | "PPF + ceramic coating specialist. Shop owner at AutoShield Pro." | 2 builds |
| @jdm.soul | Kai Tanaka | "JDM or nothing. Building the dream one mod at a time." | 3 builds |

Each demo user should have 2-4 demo posts with realistic captions, tags, and engagement numbers.

---

## 10. Demo Vehicles

Seed **8 demo vehicles** across users:

| Make | Model | Year | Color | Body Type | User |
|------|-------|------|-------|-----------|------|
| BMW | M4 Competition (G82) | 2024 | Alpine White | coupe | @wrapsbyalex |
| Lamborghini | Huracán EVO | 2023 | Bianco Icarus | supercar | @wrapsbyalex |
| Toyota | GR Supra | 2024 | Renaissance Red | sports_car | @midnight.drives |
| Porsche | 911 GT3 (992) | 2024 | Guards Red | sports_car | @stancedaily |
| Mercedes-AMG | G63 | 2024 | Obsidian Black | suv | @stancedaily |
| Tesla | Model 3 Performance | 2024 | Pearl White | sedan | @detailqueen |
| Honda | Civic Type R (FL5) | 2024 | Championship White | hatchback | @jdm.soul |
| Nissan | GT-R NISMO | 2024 | Ultimate Silver | sports_car | @jdm.soul |

---

## Seed Script Structure

```
/lib/seed/
  index.ts          → Main runner (calls each seeder in order)
  brands.ts         → Seeds product_brands
  products-wraps.ts → Seeds wrap products
  products-wheels.ts
  products-tint.ts
  products-ppf.ts
  products-bodykits.ts
  products-accessories.ts
  shops.ts          → Seeds shops + hours + reviews
  users.ts          → Seeds demo users
  vehicles.ts       → Seeds demo vehicles
  builds.ts         → Seeds demo builds + build_items
  posts.ts          → Seeds demo social posts
```

**Run order matters** (foreign key dependencies):
1. brands → 2. products (all categories) → 3. users → 4. shops + hours → 5. vehicles → 6. builds + items → 7. posts

**Mirmi: Use `upsert` operations so the seed script is idempotent** — running it twice doesn't create duplicates.

---

*— Hammad*
