// ─── AVACAR Marketplace Mock Data ─────────────────────────────────────────────

export interface MarketplaceVariant {
  name: string;
  colorHex: string;
  finish: string;
  price: number;
  inStock: boolean;
}

export interface MarketplaceProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  brandSlug: string;
  category: 'wraps' | 'wheels' | 'ppf' | 'tint' | 'body-kits' | 'accessories';
  description: string;
  fromPrice: number;
  unit: string;
  primaryColorHex: string;
  finish: string;
  variants: MarketplaceVariant[];
  rating: number;
  reviewCount: number;
  tags: string[];
  specs: Record<string, string>;
  vendors: { name: string; price: number; inStock: boolean; shipsIn: string }[];
}

export interface MarketplaceBrand {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  productCount: number;
  buildsCount: number;
  avgRating: number;
  about: string;
  heroGradient: string;
  logoColor: string;
  tier: 'Listed' | 'Integrated' | 'Featured Partner';
  certifiedShopsCount: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  brand: string;
  variantName: string;
  colorHex: string;
  price: number;
  qty: number;
}

// ─── BRANDS ───────────────────────────────────────────────────────────────────

export const marketplaceBrands: MarketplaceBrand[] = [
  {
    id: 'b-3m',
    slug: '3m',
    name: '3M',
    tagline: 'Science Applied to Life — and Your Build',
    productCount: 48,
    buildsCount: 3241,
    avgRating: 4.8,
    about:
      '3M is the global leader in pressure-sensitive vinyl films. Their 1080 and 2080 Series wrap films set the standard for durability, conformability, and color depth. Used by professional installers on every continent.',
    heroGradient: 'linear-gradient(135deg, #001529 0%, #003366 60%, #005ab7 100%)',
    logoColor: '#e00',
    tier: 'Featured Partner',
    certifiedShopsCount: 187,
  },
  {
    id: 'b-avery',
    slug: 'avery-dennison',
    name: 'Avery Dennison',
    tagline: 'Every Color. Every Finish. Every Car.',
    productCount: 62,
    buildsCount: 2876,
    avgRating: 4.7,
    about:
      'Avery Dennison Supreme Wrapping Film (SW900 & SWF series) is engineered for the most demanding installs. Their advanced air-egress technology and conformable cast construction make them a favorite among competition-level installers.',
    heroGradient: 'linear-gradient(135deg, #0d1117 0%, #1a2744 60%, #0057cc 100%)',
    logoColor: '#0057cc',
    tier: 'Featured Partner',
    certifiedShopsCount: 143,
  },
  {
    id: 'b-hre',
    slug: 'hre-wheels',
    name: 'HRE Wheels',
    tagline: 'The World\'s Finest Performance Wheels',
    productCount: 24,
    buildsCount: 891,
    avgRating: 4.9,
    about:
      'HRE Performance Wheels are hand-crafted in Vista, California. Each wheel begins as a billet of aerospace-grade 6061-T6 aluminum and is machined to tolerances measured in thousandths of an inch. The pinnacle of wheel engineering.',
    heroGradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 60%, #444 100%)',
    logoColor: '#c8a84b',
    tier: 'Integrated',
    certifiedShopsCount: 42,
  },
  {
    id: 'b-xpel',
    slug: 'xpel',
    name: 'XPEL',
    tagline: 'Protect Everything That Matters',
    productCount: 31,
    buildsCount: 1654,
    avgRating: 4.8,
    about:
      'XPEL is the leading manufacturer of automotive paint protection film and window tint. Their Ultimate Plus film offers industry-leading self-healing technology, optical clarity, and a 10-year manufacturer warranty.',
    heroGradient: 'linear-gradient(135deg, #0a1628 0%, #0d2142 60%, #0a3d78 100%)',
    logoColor: '#007FFF',
    tier: 'Featured Partner',
    certifiedShopsCount: 219,
  },
];

// ─── WRAPS (12 products) ───────────────────────────────────────────────────────

export const marketplaceWraps: MarketplaceProduct[] = [
  {
    id: 'mw-1',
    slug: '3m-1080-satin-black',
    name: '3M 1080 Satin Black',
    brand: '3M',
    brandSlug: '3m',
    category: 'wraps',
    description:
      '3M 1080 Series Satin Black — the gold standard for stealthy builds. Ultra-conformable cast film with deep satin depth. Used on over 50,000 vehicles worldwide annually.',
    fromPrice: 8.99,
    unit: '/ sq ft',
    primaryColorHex: '#1c1c1e',
    finish: 'satin',
    variants: [
      { name: 'Satin Black', colorHex: '#1c1c1e', finish: 'satin', price: 8.99, inStock: true },
      { name: 'Satin Dark Gray', colorHex: '#3d3d3d', finish: 'satin', price: 8.99, inStock: true },
      { name: 'Satin Charcoal', colorHex: '#2d2d2d', finish: 'satin', price: 9.49, inStock: true },
    ],
    rating: 4.9,
    reviewCount: 847,
    tags: ['popular', 'stealth', 'clean', 'bestseller'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '160 microns',
      Durability: '5–7 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 8.99, inStock: true, shipsIn: '1–2 business days' },
      { name: 'WrapSupply Co', price: 9.25, inStock: true, shipsIn: '3–5 business days' },
      { name: 'VinylHouse', price: 8.75, inStock: false, shipsIn: 'Special order' },
    ],
  },
  {
    id: 'mw-2',
    slug: '3m-2080-matte-black',
    name: '3M 2080 Matte Black',
    brand: '3M',
    brandSlug: '3m',
    category: 'wraps',
    description:
      'The classic matte black — completely light-absorbing, zero sheen. 3M\'s 2080 Series is thicker and more conformable than the original 1080, with improved air release channels.',
    fromPrice: 9.49,
    unit: '/ sq ft',
    primaryColorHex: '#111111',
    finish: 'matte',
    variants: [
      { name: 'Matte Black', colorHex: '#111111', finish: 'matte', price: 9.49, inStock: true },
      { name: 'Matte Deep Black', colorHex: '#0a0a0a', finish: 'matte', price: 9.99, inStock: true },
    ],
    rating: 4.8,
    reviewCount: 623,
    tags: ['matte', 'blacked-out', 'aggressive'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '180 microns',
      Durability: '7 years',
      'Install Difficulty': 'Moderate',
      Warranty: '7 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.49, inStock: true, shipsIn: '1–2 business days' },
      { name: 'WrapSupply Co', price: 9.75, inStock: true, shipsIn: '2–4 business days' },
    ],
  },
  {
    id: 'mw-3',
    slug: 'avery-sw900-gloss-nardo-gray',
    name: 'Avery SW900 Gloss Nardo Gray',
    brand: 'Avery Dennison',
    brandSlug: 'avery-dennison',
    category: 'wraps',
    description:
      'Avery SW900 in the iconic Nardo Gray — the Euro-spec color that took the internet by storm. Deep, understated, sophisticated. A gloss finish that shows every panel line.',
    fromPrice: 9.25,
    unit: '/ sq ft',
    primaryColorHex: '#8f8f8f',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Nardo Gray', colorHex: '#8f8f8f', finish: 'gloss', price: 9.25, inStock: true },
      { name: 'Satin Nardo Gray', colorHex: '#919191', finish: 'satin', price: 9.49, inStock: true },
      { name: 'Matte Nardo Gray', colorHex: '#7e7e7e', finish: 'matte', price: 9.25, inStock: true },
    ],
    rating: 4.8,
    reviewCount: 412,
    tags: ['euro', 'subtle', 'premium', 'german-aesthetic'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '160 microns',
      Durability: '7 years',
      'Install Difficulty': 'Easy',
      Warranty: '7 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.25, inStock: true, shipsIn: '1–2 business days' },
      { name: 'AveryDirect', price: 9.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-4',
    slug: 'avery-sw900-satin-miami-blue',
    name: 'Avery SW900 Satin Miami Blue',
    brand: 'Avery Dennison',
    brandSlug: 'avery-dennison',
    category: 'wraps',
    description:
      'The electric Avery Miami Blue — vivid, vibrant, impossible to ignore. A satin finish that carries the color with depth and dimension. The wrap equivalent of BMW Individual Miami Blue.',
    fromPrice: 9.75,
    unit: '/ sq ft',
    primaryColorHex: '#1e90ff',
    finish: 'satin',
    variants: [
      { name: 'Satin Miami Blue', colorHex: '#1e90ff', finish: 'satin', price: 9.75, inStock: true },
      { name: 'Gloss Miami Blue', colorHex: '#1e8fff', finish: 'gloss', price: 9.99, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 289,
    tags: ['bold', 'vibrant', 'sport', 'blue'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '160 microns',
      Durability: '7 years',
      'Install Difficulty': 'Easy',
      Warranty: '7 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.75, inStock: true, shipsIn: '1–2 business days' },
      { name: 'AveryDirect', price: 10.25, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-5',
    slug: 'inozetek-super-matte-army-green',
    name: 'Inozetek Super Matte Army Green',
    brand: 'Inozetek',
    brandSlug: 'inozetek',
    category: 'wraps',
    description:
      'Inozetek Super Matte Military Green — aggressive, commanding, flat. The ultra-matte formula achieves near-zero sheen with exceptional durability. Perfect for lifted trucks and tactical builds.',
    fromPrice: 8.49,
    unit: '/ sq ft',
    primaryColorHex: '#4a5240',
    finish: 'matte',
    variants: [
      { name: 'Army Green', colorHex: '#4a5240', finish: 'matte', price: 8.49, inStock: true },
      { name: 'Olive Drab', colorHex: '#3e4b30', finish: 'matte', price: 8.49, inStock: true },
      { name: 'Forest Green', colorHex: '#2d4a2d', finish: 'matte', price: 8.49, inStock: false },
    ],
    rating: 4.6,
    reviewCount: 178,
    tags: ['military', 'rugged', 'matte', 'green'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '150 microns',
      Durability: '5 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 8.49, inStock: true, shipsIn: '2–3 business days' },
    ],
  },
  {
    id: 'mw-6',
    slug: 'inozetek-super-gloss-deep-black',
    name: 'Inozetek Super Gloss Deep Black',
    brand: 'Inozetek',
    brandSlug: 'inozetek',
    category: 'wraps',
    description:
      'Inozetek Super Gloss Deep Black achieves mirror-like reflectivity that rivals a fresh paint job. Exceptional high-gloss finish with self-healing micro-surface properties.',
    fromPrice: 8.99,
    unit: '/ sq ft',
    primaryColorHex: '#0d0d0d',
    finish: 'gloss',
    variants: [
      { name: 'Deep Black', colorHex: '#0d0d0d', finish: 'gloss', price: 8.99, inStock: true },
      { name: 'Jet Black', colorHex: '#050505', finish: 'gloss', price: 9.25, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 234,
    tags: ['gloss', 'mirror', 'clean', 'black'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '155 microns',
      Durability: '6 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 8.99, inStock: true, shipsIn: '2–3 business days' },
      { name: 'WrapSupply Co', price: 9.25, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-7',
    slug: 'hexis-bodyfence-gloss-white',
    name: 'HEXIS Bodyfence Gloss White',
    brand: 'Hexis',
    brandSlug: 'hexis',
    category: 'wraps',
    description:
      'HEXIS Bodyfence Gloss White — clean, crisp European design aesthetic. HEXIS films are manufactured in France with exceptionally tight color consistency batch to batch.',
    fromPrice: 9.99,
    unit: '/ sq ft',
    primaryColorHex: '#f0f0f0',
    finish: 'gloss',
    variants: [
      { name: 'Gloss White', colorHex: '#f0f0f0', finish: 'gloss', price: 9.99, inStock: true },
      { name: 'Satin White', colorHex: '#e8e8e8', finish: 'satin', price: 9.99, inStock: true },
      { name: 'Matte White', colorHex: '#e5e5e5', finish: 'matte', price: 9.75, inStock: true },
    ],
    rating: 4.6,
    reviewCount: 156,
    tags: ['white', 'clean', 'euro', 'bright'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '155 microns',
      Durability: '6 years',
      'Install Difficulty': 'Moderate',
      Warranty: '6 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-8',
    slug: 'hexis-skintac-chrome-silver',
    name: 'HEXIS Skintac Chrome Silver',
    brand: 'Hexis',
    brandSlug: 'hexis',
    category: 'wraps',
    description:
      'HEXIS Skintac Chrome Silver — mirror chrome finish that commands attention. Exceptional reflectivity with a manageable install process for an experienced hand.',
    fromPrice: 18.99,
    unit: '/ sq ft',
    primaryColorHex: '#c0c0c0',
    finish: 'chrome',
    variants: [
      { name: 'Chrome Silver', colorHex: '#c0c0c0', finish: 'chrome', price: 18.99, inStock: true },
      { name: 'Chrome Gold', colorHex: '#c8a84b', finish: 'chrome', price: 19.99, inStock: false },
    ],
    rating: 4.4,
    reviewCount: 89,
    tags: ['chrome', 'mirror', 'show', 'extreme'],
    specs: {
      Material: 'Cast PVC + Metallic Layer',
      Thickness: '220 microns',
      Durability: '3–4 years',
      'Install Difficulty': 'Advanced',
      Warranty: '3 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 18.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-9',
    slug: 'avery-sw900-color-shift-cosmic-blue',
    name: 'Avery SW900 Color Shift Cosmic Blue',
    brand: 'Avery Dennison',
    brandSlug: 'avery-dennison',
    category: 'wraps',
    description:
      'Avery\'s most dramatic color technology. Cosmic Blue shifts from deep navy to electric purple as light angles change. An entirely different car depending on where you\'re standing.',
    fromPrice: 14.99,
    unit: '/ sq ft',
    primaryColorHex: '#2244aa',
    finish: 'color-shift',
    variants: [
      { name: 'Cosmic Blue → Purple', colorHex: '#2244aa', finish: 'color-shift', price: 14.99, inStock: true },
      { name: 'Cosmic Green → Gold', colorHex: '#2d6622', finish: 'color-shift', price: 14.99, inStock: true },
    ],
    rating: 4.8,
    reviewCount: 201,
    tags: ['color-shift', 'exotic', 'show', 'iridescent'],
    specs: {
      Material: 'Cast PVC + Effect Layer',
      Thickness: '170 microns',
      Durability: '5 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 14.99, inStock: true, shipsIn: '1–2 business days' },
      { name: 'AveryDirect', price: 15.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mw-10',
    slug: '3m-1080-satin-gold',
    name: '3M 1080 Satin Gold',
    brand: '3M',
    brandSlug: '3m',
    category: 'wraps',
    description:
      '3M 1080 Satin Gold — warm, rich, and deeply luxurious. A color that reads differently under every light condition. Inspired by high-end watchmaking and bespoke automotive finishes.',
    fromPrice: 9.99,
    unit: '/ sq ft',
    primaryColorHex: '#c5a028',
    finish: 'satin',
    variants: [
      { name: 'Satin Gold', colorHex: '#c5a028', finish: 'satin', price: 9.99, inStock: true },
      { name: 'Gloss Gold', colorHex: '#d4af37', finish: 'gloss', price: 10.49, inStock: true },
    ],
    rating: 4.6,
    reviewCount: 143,
    tags: ['gold', 'luxury', 'bold', 'premium'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '160 microns',
      Durability: '5 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.99, inStock: true, shipsIn: '1–2 business days' },
    ],
  },
  {
    id: 'mw-11',
    slug: 'inozetek-super-matte-rose-gold',
    name: 'Inozetek Super Matte Rose Gold',
    brand: 'Inozetek',
    brandSlug: 'inozetek',
    category: 'wraps',
    description:
      'Inozetek Super Matte Rose Gold — a muted, sophisticated take on a bold color. The ultra-flat finish removes any flashiness, leaving behind pure, statement color.',
    fromPrice: 9.25,
    unit: '/ sq ft',
    primaryColorHex: '#b5797a',
    finish: 'matte',
    variants: [
      { name: 'Matte Rose Gold', colorHex: '#b5797a', finish: 'matte', price: 9.25, inStock: true },
      { name: 'Satin Rose Gold', colorHex: '#c08090', finish: 'satin', price: 9.49, inStock: false },
    ],
    rating: 4.5,
    reviewCount: 97,
    tags: ['rose-gold', 'feminine', 'bold', 'matte'],
    specs: {
      Material: 'Cast PVC',
      Thickness: '150 microns',
      Durability: '5 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 9.25, inStock: true, shipsIn: '2–3 business days' },
    ],
  },
  {
    id: 'mw-12',
    slug: 'hexis-carbon-fiber-3d',
    name: 'HEXIS Carbon Fiber 3D',
    brand: 'Hexis',
    brandSlug: 'hexis',
    category: 'wraps',
    description:
      'HEXIS 3D Carbon Fiber — embossed texture that mimics real woven carbon fiber. Used for accent panels, mirror caps, pillars, and hoods. Exceptional depth.',
    fromPrice: 12.99,
    unit: '/ sq ft',
    primaryColorHex: '#1a1a1a',
    finish: 'matte',
    variants: [
      { name: 'Black Carbon', colorHex: '#1a1a1a', finish: 'matte', price: 12.99, inStock: true },
      { name: 'Silver Carbon', colorHex: '#888888', finish: 'gloss', price: 13.49, inStock: true },
    ],
    rating: 4.6,
    reviewCount: 211,
    tags: ['carbon', 'texture', 'sporty', 'accent'],
    specs: {
      Material: 'Cast PVC + Emboss Layer',
      Thickness: '200 microns',
      Durability: '5 years',
      'Install Difficulty': 'Moderate',
      Warranty: '5 years',
      Width: '59 in (150 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 12.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
];

// ─── WHEELS (8 products) ───────────────────────────────────────────────────────

export const marketplaceWheels: MarketplaceProduct[] = [
  {
    id: 'mwh-1',
    slug: 'hre-ff15-gloss-black',
    name: 'HRE FF15 Flowform',
    brand: 'HRE Wheels',
    brandSlug: 'hre-wheels',
    category: 'wheels',
    description:
      'The HRE FF15 is the entry point into the HRE ecosystem — flowform spun for strength-to-weight, and finished with HRE\'s signature precision. Available in 18" through 22".',
    fromPrice: 620,
    unit: '/ wheel',
    primaryColorHex: '#1a1a1a',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Black', colorHex: '#1a1a1a', finish: 'gloss', price: 620, inStock: true },
      { name: 'Brushed Titanium', colorHex: '#888888', finish: 'brushed', price: 680, inStock: true },
      { name: 'Satin Bronze', colorHex: '#8b6914', finish: 'satin', price: 680, inStock: false },
    ],
    rating: 4.9,
    reviewCount: 142,
    tags: ['luxury', 'flowform', 'lightweight', 'track'],
    specs: {
      Material: '6061-T6 Aluminum',
      Construction: 'Flowform Rotary Forged',
      Sizes: '18" – 22"',
      Weight: '19.2 lbs (19x8.5)',
      'Bolt Pattern': 'Custom per vehicle',
      Finish: 'Gloss Black Powdercoat',
    },
    vendors: [
      { name: 'AVACAR Official', price: 620, inStock: true, shipsIn: '4–6 weeks lead time' },
      { name: 'HRE Direct', price: 650, inStock: true, shipsIn: '6–8 weeks lead time' },
    ],
  },
  {
    id: 'mwh-2',
    slug: 'hre-p101-forged-brushed',
    name: 'HRE P101 3-Piece Forged',
    brand: 'HRE Wheels',
    brandSlug: 'hre-wheels',
    category: 'wheels',
    description:
      'HRE P101 — three-piece fully forged masterpiece. Each wheel custom-built to your vehicle specifications. The definitive statement in wheel engineering.',
    fromPrice: 2400,
    unit: '/ wheel',
    primaryColorHex: '#a0a0a0',
    finish: 'brushed',
    variants: [
      { name: 'Brushed Clear', colorHex: '#a0a0a0', finish: 'brushed', price: 2400, inStock: true },
      { name: 'Brushed Dark', colorHex: '#555555', finish: 'brushed', price: 2400, inStock: true },
      { name: 'Polished', colorHex: '#d0d0d0', finish: 'polished', price: 2600, inStock: false },
    ],
    rating: 5.0,
    reviewCount: 43,
    tags: ['forged', '3-piece', 'bespoke', 'ultimate'],
    specs: {
      Material: '6061-T6 Aluminum Forged',
      Construction: '3-Piece Fully Forged',
      Sizes: '20" – 24" custom',
      Weight: '23.1 lbs (21x9)',
      'Bolt Pattern': 'Custom per vehicle',
      Finish: 'Hand-polished + clear',
    },
    vendors: [
      { name: 'HRE Direct', price: 2400, inStock: true, shipsIn: '10–14 weeks custom order' },
    ],
  },
  {
    id: 'mwh-3',
    slug: 'vossen-vfs1-silver-polished',
    name: 'Vossen VFS-1 Silver Polished',
    brand: 'Vossen',
    brandSlug: 'vossen',
    category: 'wheels',
    description:
      'The Vossen VFS-1 is Vossen\'s bestselling rotary-forged wheel. The concave 10-spoke design works on virtually every vehicle. Flow-formed for the perfect balance of weight and strength.',
    fromPrice: 485,
    unit: '/ wheel',
    primaryColorHex: '#d0d0d0',
    finish: 'polished',
    variants: [
      { name: 'Silver Polished', colorHex: '#d0d0d0', finish: 'polished', price: 485, inStock: true },
      { name: 'Gloss Gunmetal', colorHex: '#4a4a4a', finish: 'gloss', price: 485, inStock: true },
      { name: 'Matte Black', colorHex: '#1a1a1a', finish: 'matte', price: 485, inStock: true },
      { name: 'Satin Bronze', colorHex: '#8b6914', finish: 'satin', price: 520, inStock: false },
    ],
    rating: 4.8,
    reviewCount: 312,
    tags: ['popular', 'concave', 'versatile', 'vossen'],
    specs: {
      Material: 'A356 Aluminum',
      Construction: 'Flow Rotary Forged',
      Sizes: '18" – 22"',
      Weight: '20.8 lbs (19x9)',
      'Bolt Pattern': 'Multiple fitments',
      Finish: 'Machine polished + clear',
    },
    vendors: [
      { name: 'AVACAR Official', price: 485, inStock: true, shipsIn: '1–2 weeks' },
      { name: 'Vossen Direct', price: 510, inStock: true, shipsIn: '2–4 weeks' },
    ],
  },
  {
    id: 'mwh-4',
    slug: 'vossen-hf3-gloss-black',
    name: 'Vossen HF-3 Gloss Black',
    brand: 'Vossen',
    brandSlug: 'vossen',
    category: 'wheels',
    description:
      'Vossen HF-3 — a contemporary take on the classic multi-spoke design. Bold Y-spokes in high-gloss black deliver presence and performance. Flow-forged for the serious driver.',
    fromPrice: 545,
    unit: '/ wheel',
    primaryColorHex: '#111111',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Black', colorHex: '#111111', finish: 'gloss', price: 545, inStock: true },
      { name: 'Gloss Space Gray', colorHex: '#555566', finish: 'gloss', price: 545, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 198,
    tags: ['bold', 'y-spoke', 'aggressive', 'gloss'],
    specs: {
      Material: 'A356 Aluminum',
      Construction: 'Flow Forged',
      Sizes: '19" – 22"',
      Weight: '22.1 lbs (20x10)',
      'Bolt Pattern': 'Multiple fitments',
      Finish: 'Gloss Black Powdercoat',
    },
    vendors: [
      { name: 'AVACAR Official', price: 545, inStock: true, shipsIn: '1–2 weeks' },
      { name: 'Vossen Direct', price: 570, inStock: true, shipsIn: '2–4 weeks' },
    ],
  },
  {
    id: 'mwh-5',
    slug: 'rotiform-blq-matte-black',
    name: 'Rotiform BLQ Matte Black',
    brand: 'Rotiform',
    brandSlug: 'rotiform',
    category: 'wheels',
    description:
      'Rotiform BLQ — the bestselling Rotiform design. The staggered triple-spoke layout creates a bold three-dimensional look in any finish. The wheel that defined the aggressive stance movement.',
    fromPrice: 395,
    unit: '/ wheel',
    primaryColorHex: '#222222',
    finish: 'matte',
    variants: [
      { name: 'Matte Black', colorHex: '#222222', finish: 'matte', price: 395, inStock: true },
      { name: 'Gloss Black', colorHex: '#111111', finish: 'gloss', price: 395, inStock: true },
      { name: 'Gunmetal', colorHex: '#4a4a4a', finish: 'gloss', price: 420, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 441,
    tags: ['stance', 'triple-spoke', 'aggressive', 'popular'],
    specs: {
      Material: 'A356.2 Aluminum',
      Construction: 'Cast + Machine Finish',
      Sizes: '17" – 20"',
      Weight: '21.5 lbs (18x9)',
      'Bolt Pattern': 'Multiple fitments',
      Finish: 'Matte Black Powdercoat',
    },
    vendors: [
      { name: 'AVACAR Official', price: 395, inStock: true, shipsIn: '1–2 weeks' },
      { name: 'Rotiform Authorized', price: 420, inStock: true, shipsIn: '2–3 weeks' },
      { name: 'WheelFront', price: 380, inStock: false, shipsIn: 'Call for availability' },
    ],
  },
  {
    id: 'mwh-6',
    slug: 'rotiform-ozr-silver',
    name: 'Rotiform OZR Silver',
    brand: 'Rotiform',
    brandSlug: 'rotiform',
    category: 'wheels',
    description:
      'Rotiform OZR — a refined 5-spoke design that pulls from old-school motorsport DNA. The machined face with dark window pockets creates dramatic visual contrast in silver.',
    fromPrice: 425,
    unit: '/ wheel',
    primaryColorHex: '#b8b8b8',
    finish: 'polished',
    variants: [
      { name: 'Silver Machined', colorHex: '#b8b8b8', finish: 'polished', price: 425, inStock: true },
      { name: 'Gloss Black Machined', colorHex: '#2a2a2a', finish: 'gloss', price: 440, inStock: false },
    ],
    rating: 4.6,
    reviewCount: 167,
    tags: ['motorsport', '5-spoke', 'classic', 'silver'],
    specs: {
      Material: 'A356.2 Aluminum',
      Construction: 'Cast + CNC Machine',
      Sizes: '17" – 20"',
      Weight: '22.3 lbs (19x8.5)',
      'Bolt Pattern': 'Multiple fitments',
      Finish: 'Machine Silver + Clear',
    },
    vendors: [
      { name: 'AVACAR Official', price: 425, inStock: true, shipsIn: '1–2 weeks' },
    ],
  },
  {
    id: 'mwh-7',
    slug: 'bbs-ch-r-gold',
    name: 'BBS CH-R Gold',
    brand: 'BBS',
    brandSlug: 'bbs',
    category: 'wheels',
    description:
      'BBS CH-R — the classic BBS cross-spoke design in 24k Gold. Synonymous with JDM prestige for three decades. Forged, lightweight, and unmistakable.',
    fromPrice: 789,
    unit: '/ wheel',
    primaryColorHex: '#c8a84b',
    finish: 'gloss',
    variants: [
      { name: 'Gold', colorHex: '#c8a84b', finish: 'gloss', price: 789, inStock: true },
      { name: 'Silver', colorHex: '#c0c0c0', finish: 'polished', price: 789, inStock: true },
      { name: 'Satin Black', colorHex: '#2a2a2a', finish: 'satin', price: 789, inStock: true },
    ],
    rating: 4.9,
    reviewCount: 289,
    tags: ['jdm', 'classic', 'forged', 'gold', 'iconic'],
    specs: {
      Material: 'Forged Aluminum',
      Construction: 'Single-Piece Forged',
      Sizes: '18" – 21"',
      Weight: '17.8 lbs (18x8.5)',
      'Bolt Pattern': 'Multiple fitments',
      Finish: 'Gold Electroplated',
    },
    vendors: [
      { name: 'AVACAR Official', price: 789, inStock: true, shipsIn: '2–4 weeks' },
      { name: 'BBS Authorized Dealer', price: 825, inStock: true, shipsIn: '3–6 weeks' },
    ],
  },
  {
    id: 'mwh-8',
    slug: 'bbs-ri-a-polished',
    name: 'BBS RI-A Polished',
    brand: 'BBS',
    brandSlug: 'bbs',
    category: 'wheels',
    description:
      'BBS RI-A — competition-spec forged wheel used on factory GTI Cup and touring car series. Full polish finish straight from the manufacturer. No track day is complete without them.',
    fromPrice: 1200,
    unit: '/ wheel',
    primaryColorHex: '#d8d8d8',
    finish: 'polished',
    variants: [
      { name: 'Full Polish', colorHex: '#d8d8d8', finish: 'polished', price: 1200, inStock: true },
      { name: 'Satin Black', colorHex: '#2a2a2a', finish: 'satin', price: 1150, inStock: false },
    ],
    rating: 5.0,
    reviewCount: 78,
    tags: ['motorsport', 'track', 'forged', 'lightweight', 'competition'],
    specs: {
      Material: 'Forged Aluminum',
      Construction: 'Competition Mono-Block Forged',
      Sizes: '18" – 20"',
      Weight: '15.2 lbs (18x8)',
      'Bolt Pattern': '5x112, 5x114.3',
      Finish: 'Full Machine Polish',
    },
    vendors: [
      { name: 'BBS Motorsport', price: 1200, inStock: true, shipsIn: '4–6 weeks' },
    ],
  },
];

// ─── PPF (6 products) ──────────────────────────────────────────────────────────

export const marketplacePPF: MarketplaceProduct[] = [
  {
    id: 'mp-1',
    slug: 'xpel-ultimate-plus',
    name: 'XPEL Ultimate Plus',
    brand: 'XPEL',
    brandSlug: 'xpel',
    category: 'ppf',
    description:
      'XPEL Ultimate Plus is the benchmark of the PPF industry. Self-healing topcoat that eliminates swirl marks and light scratches overnight. Optically clear with hydrophobic coating built in.',
    fromPrice: 12.99,
    unit: '/ sq ft',
    primaryColorHex: '#e8eef5',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Clear', colorHex: '#e8eef5', finish: 'gloss', price: 12.99, inStock: true },
    ],
    rating: 4.9,
    reviewCount: 918,
    tags: ['self-healing', 'clear', 'premium', 'bestseller'],
    specs: {
      Material: 'Thermoplastic Urethane',
      Thickness: '8 mil (200 microns)',
      Durability: '10 years',
      'Self-Healing': 'Yes — heat activated',
      Warranty: '10 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 12.99, inStock: true, shipsIn: '1–2 business days' },
      { name: 'XPEL Authorized', price: 13.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mp-2',
    slug: 'xpel-stealth',
    name: 'XPEL Stealth',
    brand: 'XPEL',
    brandSlug: 'xpel',
    category: 'ppf',
    description:
      'XPEL Stealth transforms any gloss paint into a perfect satin finish while protecting it. The protection and aesthetic update in a single film. The matte PPF standard-bearer.',
    fromPrice: 14.99,
    unit: '/ sq ft',
    primaryColorHex: '#d0d0d0',
    finish: 'satin',
    variants: [
      { name: 'Satin Clear', colorHex: '#d0d0d0', finish: 'satin', price: 14.99, inStock: true },
    ],
    rating: 4.8,
    reviewCount: 543,
    tags: ['satin', 'matte-finish', 'self-healing', 'stealth'],
    specs: {
      Material: 'Thermoplastic Urethane',
      Thickness: '8 mil',
      Durability: '10 years',
      'Self-Healing': 'Yes',
      Warranty: '10 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 14.99, inStock: true, shipsIn: '1–2 business days' },
      { name: 'XPEL Authorized', price: 15.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mp-3',
    slug: 'suntek-ultra',
    name: 'SunTek Ultra',
    brand: 'SunTek',
    brandSlug: 'suntek',
    category: 'ppf',
    description:
      'SunTek Ultra PPF offers professional-grade protection with exceptional optical clarity. Their proprietary adhesive system prevents yellowing over time and enables clean removal.',
    fromPrice: 11.49,
    unit: '/ sq ft',
    primaryColorHex: '#edf2f7',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Clear', colorHex: '#edf2f7', finish: 'gloss', price: 11.49, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 334,
    tags: ['clear', 'no-yellowing', 'professional', 'clean-removal'],
    specs: {
      Material: 'Thermoplastic Urethane',
      Thickness: '8 mil',
      Durability: '7 years',
      'Self-Healing': 'Yes',
      Warranty: '7 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 11.49, inStock: true, shipsIn: '2–3 business days' },
      { name: 'SunTek Authorized', price: 12.25, inStock: true, shipsIn: '4–6 business days' },
    ],
  },
  {
    id: 'mp-4',
    slug: 'suntek-color-satin-black',
    name: 'SunTek Color PPF Satin Black',
    brand: 'SunTek',
    brandSlug: 'suntek',
    category: 'ppf',
    description:
      'SunTek Color PPF wraps your car in satin black while providing full paint protection. No paint, just protection. Self-healing and removable — the reversible performance mod.',
    fromPrice: 15.49,
    unit: '/ sq ft',
    primaryColorHex: '#1c1c1e',
    finish: 'satin',
    variants: [
      { name: 'Satin Black', colorHex: '#1c1c1e', finish: 'satin', price: 15.49, inStock: true },
      { name: 'Matte Black', colorHex: '#111111', finish: 'matte', price: 15.49, inStock: true },
      { name: 'Gloss Black', colorHex: '#0d0d0d', finish: 'gloss', price: 14.99, inStock: true },
    ],
    rating: 4.7,
    reviewCount: 212,
    tags: ['color-ppf', 'satin-black', 'self-healing', 'reversible'],
    specs: {
      Material: 'Thermoplastic Urethane + Pigment',
      Thickness: '8 mil',
      Durability: '7 years',
      'Self-Healing': 'Yes',
      Warranty: '7 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 15.49, inStock: true, shipsIn: '2–3 business days' },
    ],
  },
  {
    id: 'mp-5',
    slug: '3m-pro-series-clear',
    name: '3M Pro Series Clear PPF',
    brand: '3M',
    brandSlug: '3m',
    category: 'ppf',
    description:
      '3M Pro Series PPF is engineered for professional installers demanding absolute clarity and unmatched conformability. Their Comply™ adhesive technology ensures bubble-free installs on complex curves.',
    fromPrice: 13.49,
    unit: '/ sq ft',
    primaryColorHex: '#f0f4f8',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Clear', colorHex: '#f0f4f8', finish: 'gloss', price: 13.49, inStock: true },
    ],
    rating: 4.8,
    reviewCount: 445,
    tags: ['professional', 'conform', 'bubble-free', 'comply'],
    specs: {
      Material: 'Thermoplastic Urethane',
      Thickness: '8 mil',
      Durability: '10 years',
      'Self-Healing': 'Yes',
      Warranty: '10 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 13.49, inStock: true, shipsIn: '1–2 business days' },
      { name: '3M Authorized', price: 14.25, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
  {
    id: 'mp-6',
    slug: 'xpel-ultimate-fusion',
    name: 'XPEL Ultimate Fusion',
    brand: 'XPEL',
    brandSlug: 'xpel',
    category: 'ppf',
    description:
      'XPEL Ultimate Fusion with integrated ceramic coating. The first PPF to combine maximum paint protection with a built-in hydrophobic ceramic layer — no separate ceramic coat needed.',
    fromPrice: 17.99,
    unit: '/ sq ft',
    primaryColorHex: '#e0ecf8',
    finish: 'gloss',
    variants: [
      { name: 'Gloss Clear + Ceramic', colorHex: '#e0ecf8', finish: 'gloss', price: 17.99, inStock: true },
    ],
    rating: 4.9,
    reviewCount: 287,
    tags: ['ceramic', 'ppf', 'ultimate', 'hydrophobic', 'all-in-one'],
    specs: {
      Material: 'TPU + Integrated Ceramic Layer',
      Thickness: '9 mil',
      Durability: '10 years',
      'Self-Healing': 'Yes',
      Warranty: '10 years',
      Width: '60 in (152 cm)',
    },
    vendors: [
      { name: 'AVACAR Official', price: 17.99, inStock: true, shipsIn: '1–2 business days' },
      { name: 'XPEL Authorized', price: 19.99, inStock: true, shipsIn: '3–5 business days' },
    ],
  },
];

// ─── ALL PRODUCTS ──────────────────────────────────────────────────────────────

export const allMarketplaceProducts: MarketplaceProduct[] = [
  ...marketplaceWraps,
  ...marketplaceWheels,
  ...marketplacePPF,
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

export function getProductBySlug(slug: string): MarketplaceProduct | undefined {
  return allMarketplaceProducts.find((p) => p.slug === slug);
}

export function getBrandBySlug(slug: string): MarketplaceBrand | undefined {
  return marketplaceBrands.find((b) => b.slug === slug);
}

export function getProductsByBrand(brandSlug: string): MarketplaceProduct[] {
  return allMarketplaceProducts.filter((p) => p.brandSlug === brandSlug);
}

export function getProductsByCategory(category: MarketplaceProduct['category']): MarketplaceProduct[] {
  return allMarketplaceProducts.filter((p) => p.category === category);
}

export const marketplaceCategories = [
  { id: 'wraps', label: 'Wraps', icon: 'palette', count: marketplaceWraps.length },
  { id: 'wheels', label: 'Wheels', icon: 'tire_repair', count: marketplaceWheels.length },
  { id: 'ppf', label: 'PPF', icon: 'local_car_wash', count: marketplacePPF.length },
  { id: 'tint', label: 'Tint', icon: 'dark_mode', count: 0 },
  { id: 'body-kits', label: 'Body Kits', icon: 'speed', count: 0 },
  { id: 'accessories', label: 'Accessories', icon: 'settings_input_component', count: 0 },
] as const;

// Mock cart items for the cart page
export const mockCartItems: CartItem[] = [
  {
    productId: 'mw-1',
    productName: '3M 1080 Satin Black',
    brand: '3M',
    variantName: 'Satin Black',
    colorHex: '#1c1c1e',
    price: 8.99,
    qty: 25,
  },
  {
    productId: 'mwh-3',
    productName: 'Vossen VFS-1',
    brand: 'Vossen',
    variantName: 'Silver Polished × 4',
    colorHex: '#d0d0d0',
    price: 485,
    qty: 4,
  },
];
