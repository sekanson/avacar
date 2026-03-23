import type { Product } from '@/types';

// ─── WRAPS ──────────────────────────────────────────────────────────────────
export const wraps: Product[] = [
  {
    id: 'w-1', category: 'wrap', name: 'Satin Black', brand: '3M',
    description: '3M 2080 Series Satin Black — the most popular wrap color worldwide. Smooth, matte-adjacent finish with deep depth.',
    priceMin: 2800, priceMax: 3500, coverage: 'full', finish: 'satin',
    color: 'Satin Black', colorHex: '#1A1A1A',
    tags: ['popular', 'clean', 'stealth'],
  },
  {
    id: 'w-2', category: 'wrap', name: 'Matte Forged Carbon', brand: '3M',
    description: '3M 2080 Carbon Fiber texture. Realistic carbon weave pattern, full body coverage.',
    priceMin: 3200, priceMax: 4000, coverage: 'full', finish: 'matte',
    color: 'Carbon', colorHex: '#2D2D2D',
    tags: ['premium', 'texture', 'sporty'],
  },
  {
    id: 'w-3', category: 'wrap', name: 'Gloss Nardo Gray', brand: 'Avery Dennison',
    description: 'Avery SW900 Gloss Nardo Gray — iconic, understated German aesthetic.',
    priceMin: 2600, priceMax: 3300, coverage: 'full', finish: 'gloss',
    color: 'Nardo Gray', colorHex: '#8F8F8F',
    tags: ['euro', 'subtle', 'premium'],
  },
  {
    id: 'w-4', category: 'wrap', name: 'Satin Miami Blue', brand: 'Avery Dennison',
    description: 'Avery SW900 Satin Miami Blue. Vivid, electrifying color with satin sheen.',
    priceMin: 2700, priceMax: 3400, coverage: 'full', finish: 'satin',
    color: 'Miami Blue', colorHex: '#3B82F6',
    tags: ['bold', 'vibrant', 'sport'],
  },
  {
    id: 'w-5', category: 'wrap', name: 'Gloss Psychedelic Shift', brand: 'XPEL',
    description: 'XPEL Color Shift — dramatic color-changing pigment that shifts from green to blue to purple.',
    priceMin: 4200, priceMax: 5500, coverage: 'full', finish: 'gloss',
    color: 'Color Shift', colorHex: '#4ECCA3',
    tags: ['exotic', 'shift', 'show'],
  },
  {
    id: 'w-6', category: 'wrap', name: 'Matte Army Green', brand: 'Inozetek',
    description: 'Inozetek Super Matte Military Green — aggressive, flat military aesthetic.',
    priceMin: 2900, priceMax: 3700, coverage: 'full', finish: 'matte',
    color: 'Army Green', colorHex: '#4A5240',
    tags: ['military', 'rugged', 'matte'],
  },
  {
    id: 'w-7', category: 'wrap', name: 'Chrome Silver', brand: '3M',
    description: '3M 1080 Chrome Silver — high-impact mirror chrome finish. Extreme attention getter.',
    priceMin: 5500, priceMax: 7000, coverage: 'full', finish: 'chrome',
    color: 'Chrome', colorHex: '#D4D4D4',
    tags: ['chrome', 'show', 'extreme'],
  },
  {
    id: 'w-8', category: 'wrap', name: 'Satin Gold', brand: 'Avery Dennison',
    description: 'Avery SW900 Satin Gold. Rich, warm gold with a refined satin finish.',
    priceMin: 3000, priceMax: 3800, coverage: 'full', finish: 'satin',
    color: 'Gold', colorHex: '#B8860B',
    tags: ['luxury', 'gold', 'bold'],
  },
  // Partial wraps
  {
    id: 'w-9', category: 'wrap', name: 'Hood Wrap', brand: '3M',
    description: '3M 2080 Satin Black hood wrap only. Clean contrast accent.',
    priceMin: 350, priceMax: 550, coverage: 'hood', finish: 'satin',
    color: 'Satin Black', colorHex: '#1A1A1A',
    tags: ['partial', 'accent'],
  },
  {
    id: 'w-10', category: 'wrap', name: 'Roof Wrap', brand: 'Avery Dennison',
    description: 'Gloss Black roof wrap. Panoramic contrast.',
    priceMin: 280, priceMax: 420, coverage: 'roof', finish: 'gloss',
    color: 'Gloss Black', colorHex: '#0F0F0F',
    tags: ['partial', 'roof'],
  },
];

// ─── WHEELS ──────────────────────────────────────────────────────────────────
export const wheels: Product[] = [
  {
    id: 'wh-1', category: 'wheels', name: 'HF-5 20"', brand: 'Vossen',
    description: 'Vossen HF-5 in Gloss Graphite. Flow-formed hybrid forged, 5-spoke concave design.',
    priceMin: 2200, priceMax: 2800, finish: 'graphite',
    size: '20"', tags: ['popular', 'concave', 'flow-formed'],
  },
  {
    id: 'wh-2', category: 'wheels', name: 'VPS-302 20"', brand: 'Vossen',
    description: 'Vossen VPS-302 in Matte Black. 10-spoke split design, lightweight forged.',
    priceMin: 2800, priceMax: 3500, finish: 'matte-black',
    size: '20"', tags: ['forged', 'multi-spoke', 'track'],
  },
  {
    id: 'wh-3', category: 'wheels', name: 'HF-3 19"', brand: 'Vossen',
    description: 'Vossen HF-3 in Satin Bronze. Subtle Y-spoke design, premium street look.',
    priceMin: 1800, priceMax: 2400, finish: 'satin-bronze',
    size: '19"', tags: ['subtle', 'euro', 'bronze'],
  },
  {
    id: 'wh-4', category: 'wheels', name: 'S1-04 20"', brand: 'Rotiform',
    description: 'Rotiform S1-04 in Cast Silver. Classic 5-spoke mesh, timeless design.',
    priceMin: 1600, priceMax: 2200, finish: 'silver',
    size: '20"', tags: ['classic', 'mesh', 'versatile'],
  },
  {
    id: 'wh-5', category: 'wheels', name: 'ECL 20"', brand: 'Rotiform',
    description: 'Rotiform ECL in Gloss Black. Eccentric multi-spoke design, bold statement.',
    priceMin: 1900, priceMax: 2500, finish: 'gloss-black',
    size: '20"', tags: ['bold', 'eccentric', 'street'],
  },
  {
    id: 'wh-6', category: 'wheels', name: 'FF 15 20"', brand: 'Forgiato',
    description: 'Forgiato FF 15 fully forged. Custom sizing, polished lip, brushed face.',
    priceMin: 4500, priceMax: 6000, finish: 'polished',
    size: '20"–22"', tags: ['forged', 'luxury', 'custom'],
  },
  {
    id: 'wh-7', category: 'wheels', name: 'P200 20"', brand: 'HRE',
    description: 'HRE P200 3-piece forged in Brushed Titanium. Track-ready with street elegance.',
    priceMin: 5000, priceMax: 7000, finish: 'titanium',
    size: '20"', tags: ['3-piece', 'forged', 'track'],
  },
  {
    id: 'wh-8', category: 'wheels', name: 'R18 20"', brand: 'HRE',
    description: 'HRE R18 in Gloss Gunmetal. Aero-inspired design, motorsport heritage.',
    priceMin: 4200, priceMax: 5500, finish: 'gunmetal',
    size: '20"', tags: ['aero', 'motorsport', 'premium'],
  },
  {
    id: 'wh-9', category: 'wheels', name: 'CH-R 19"', brand: 'BBS',
    description: 'BBS CH-R in Brilliant Silver. Classic mesh pattern, lightweight performance.',
    priceMin: 2400, priceMax: 3200, finish: 'silver',
    size: '19"', tags: ['classic', 'lightweight', 'mesh'],
  },
  {
    id: 'wh-10', category: 'wheels', name: 'FI-R 20"', brand: 'BBS',
    description: 'BBS FI-R race-grade forged in Diamond Black. OEM+ fitment, motorsport DNA.',
    priceMin: 3500, priceMax: 4500, finish: 'diamond-black',
    size: '20"', tags: ['race', 'forged', 'OEM+'],
  },
];

// ─── TINT ────────────────────────────────────────────────────────────────────
export const tints: Product[] = [
  {
    id: 't-1', category: 'tint', name: '5% Limo Black', brand: 'XPEL',
    description: 'XPEL Prime XR Plus — 5% VLT. Maximum privacy, near-blackout look.',
    priceMin: 450, priceMax: 650, coverage: 'full',
    tags: ['dark', 'privacy', 'max'],
  },
  {
    id: 't-2', category: 'tint', name: '20% Dark', brand: 'XPEL',
    description: 'XPEL Prime XR Plus — 20% VLT. Popular dark tint, excellent heat rejection.',
    priceMin: 400, priceMax: 600, coverage: 'full',
    tags: ['popular', 'dark', 'heat'],
  },
  {
    id: 't-3', category: 'tint', name: '35% Medium', brand: 'XPEL',
    description: 'XPEL Prime XR — 35% VLT. Balanced look, good visibility, heat rejection.',
    priceMin: 350, priceMax: 550, coverage: 'full',
    tags: ['balanced', 'medium', 'legal'],
  },
  {
    id: 't-4', category: 'tint', name: '50% Light', brand: '3M',
    description: '3M Crystalline 50% VLT. Nearly invisible with nano-ceramic technology.',
    priceMin: 380, priceMax: 580, coverage: 'full',
    tags: ['subtle', 'ceramic', 'light'],
  },
  {
    id: 't-5', category: 'tint', name: '70% Ceramic', brand: '3M',
    description: '3M Crystalline 70% VLT. Maximum clarity, blocks 99.9% UV, reduces heat significantly.',
    priceMin: 500, priceMax: 750, coverage: 'full',
    tags: ['ceramic', 'clear', 'premium'],
  },
  {
    id: 't-6', category: 'tint', name: '20% Dark', brand: 'LLumar',
    description: 'LLumar FormulaOne Pinnacle — 20% VLT. Nano-ceramic, signal-transparent.',
    priceMin: 420, priceMax: 620, coverage: 'full',
    tags: ['nano-ceramic', 'signal', 'dark'],
  },
];

// ─── PPF ─────────────────────────────────────────────────────────────────────
export const ppf: Product[] = [
  {
    id: 'p-1', category: 'ppf', name: 'Ultimate Plus — Full Body', brand: 'XPEL',
    description: 'XPEL Ultimate Plus. Self-healing, optically clear, full body protection. The gold standard.',
    priceMin: 3500, priceMax: 5000, coverage: 'full',
    tags: ['self-healing', 'full-body', 'premium'],
  },
  {
    id: 'p-2', category: 'ppf', name: 'Stealth — Full Body', brand: 'XPEL',
    description: 'XPEL Stealth. Matte finish PPF — protects and adds a satin/matte aesthetic.',
    priceMin: 3800, priceMax: 5500, coverage: 'full',
    tags: ['matte', 'stealth', 'premium'],
  },
  {
    id: 'p-3', category: 'ppf', name: 'Pro Series — Front End', brand: '3M',
    description: '3M Pro Series front-end kit. Hood, bumper, fenders, mirrors.',
    priceMin: 800, priceMax: 1400, coverage: 'front',
    tags: ['front-end', 'value', 'protection'],
  },
  {
    id: 'p-4', category: 'ppf', name: 'Platinum Plus — Full Body', brand: 'SunTek',
    description: 'SunTek Platinum Plus. Hydrophobic, self-healing, 10-year warranty.',
    priceMin: 3200, priceMax: 4800, coverage: 'full',
    tags: ['hydrophobic', 'warranty', 'full-body'],
  },
  {
    id: 'p-5', category: 'ppf', name: 'ClearBra — Front End', brand: 'SunTek',
    description: 'SunTek ClearBra front clip. High-impact zone coverage.',
    priceMin: 700, priceMax: 1200, coverage: 'front',
    tags: ['front', 'clearBra', 'value'],
  },
];

// ─── BODY KITS ───────────────────────────────────────────────────────────────
export const bodyKits: Product[] = [
  {
    id: 'bk-1', category: 'bodykit', name: 'GT3-Style Front Lip', brand: 'Vorsteiner',
    description: 'Vorsteiner forged carbon front lip. Aggressive downforce aesthetics.',
    priceMin: 800, priceMax: 1500, coverage: 'front-lip',
    tags: ['carbon', 'aggressive', 'downforce'],
  },
  {
    id: 'bk-2', category: 'bodykit', name: 'Widebody Kit', brand: 'Liberty Walk',
    description: 'Liberty Walk wide-body kit — over-fenders, side skirts, front/rear bumpers.',
    priceMin: 12000, priceMax: 25000, coverage: 'wide-body',
    tags: ['widebody', 'extreme', 'show'],
  },
  {
    id: 'bk-3', category: 'bodykit', name: 'Aerodynamic Side Skirts', brand: 'Novitec',
    description: 'Novitec carbon fiber side skirts. OEM+ fitment, CFD-tested aerodynamics.',
    priceMin: 1200, priceMax: 2400, coverage: 'side-skirts',
    tags: ['carbon', 'aero', 'subtle'],
  },
  {
    id: 'bk-4', category: 'bodykit', name: 'Carbon Fiber Wing', brand: 'Vorsteiner',
    description: 'Vorsteiner GTRS3 adjustable carbon wing. Race-inspired, street-legal.',
    priceMin: 1800, priceMax: 3200, coverage: 'spoiler',
    tags: ['wing', 'carbon', 'track'],
  },
  {
    id: 'bk-5', category: 'bodykit', name: 'Rear Diffuser', brand: 'Novitec',
    description: 'Novitec carbon rear diffuser. Aggressive rear aesthetic, improved airflow.',
    priceMin: 900, priceMax: 1800, coverage: 'rear-diffuser',
    tags: ['diffuser', 'carbon', 'rear'],
  },
  {
    id: 'bk-6', category: 'bodykit', name: 'Flared Fender Kit', brand: 'RWB',
    description: 'RWB-inspired fender flares. Handcrafted wide-body stance.',
    priceMin: 5000, priceMax: 12000, coverage: 'fender-flares',
    tags: ['flares', 'stance', 'extreme'],
  },
];

// ─── ACCESSORIES ─────────────────────────────────────────────────────────────
export const accessories: Product[] = [
  {
    id: 'acc-1', category: 'accessories', name: 'Chrome Delete', brand: 'Custom',
    description: 'Remove all exterior chrome trim and replace with gloss/satin black vinyl.',
    priceMin: 300, priceMax: 600,
    tags: ['chrome-delete', 'blacked-out', 'clean'],
  },
  {
    id: 'acc-2', category: 'accessories', name: 'Badge Delete', brand: 'Custom',
    description: 'Remove and deemblem all manufacturer badges for a clean, stealthy look.',
    priceMin: 150, priceMax: 350,
    tags: ['deemblem', 'clean', 'stealth'],
  },
  {
    id: 'acc-3', category: 'accessories', name: 'Caliper Paint', brand: 'Custom',
    description: 'High-temp brake caliper paint. Available in any color — red, yellow, cyan.',
    priceMin: 200, priceMax: 400,
    tags: ['calipers', 'color', 'brake'],
  },
  {
    id: 'acc-4', category: 'accessories', name: 'Exhaust Tips', brand: 'Custom',
    description: 'Polished or carbon fiber exhaust tip replacement. Universal and custom fitment.',
    priceMin: 250, priceMax: 600,
    tags: ['exhaust', 'polish', 'carbon'],
  },
  {
    id: 'acc-5', category: 'accessories', name: 'Mirror Caps', brand: 'Custom',
    description: 'Carbon fiber or gloss black mirror cap replacement.',
    priceMin: 200, priceMax: 500,
    tags: ['mirrors', 'carbon', 'accent'],
  },
  {
    id: 'acc-6', category: 'accessories', name: 'Antenna Delete', brand: 'Custom',
    description: 'Remove shark fin or pole antenna, fill with matching body panel.',
    priceMin: 100, priceMax: 250,
    tags: ['antenna', 'clean', 'subtle'],
  },
  {
    id: 'acc-7', category: 'accessories', name: 'Splitter & Canards', brand: 'Custom',
    description: 'Aggressive front splitter and dive planes for a motorsport-inspired look.',
    priceMin: 400, priceMax: 900,
    tags: ['splitter', 'canards', 'aggressive'],
  },
];

// ─── SHOPS ───────────────────────────────────────────────────────────────────
import type { Shop } from '@/types';

export const shops: Shop[] = [
  {
    id: 'shop-1',
    name: 'Elite Wraps Co.',
    address: '1420 W Olympic Blvd',
    city: 'Los Angeles, CA',
    distance: 1.2,
    rating: 4.9,
    reviewCount: 142,
    priceTier: 3,
    specialties: ['wrap', 'ppf', 'tint'],
    description: '3M & XPEL Certified. Specialist in luxury and exotic vehicles. 15 years serving LA car culture.',
    phone: '+1 (310) 555-0142',
    hours: 'Mon–Sat 8AM–6PM',
    certifications: ['3M Certified', 'XPEL Certified', 'Avery Dennison Partner'],
    portfolioImages: [],
    reviews: [
      { id: 'r1', author: 'Mike T.', rating: 5, text: 'Absolutely flawless Satin Black wrap on my M4. Zero bubbles, perfect panel alignment. Worth every penny.', date: 'Mar 2026', vehicle: '2024 BMW M4' },
      { id: 'r2', author: 'Sarah L.', rating: 5, text: 'Got PPF + tint done here. Professional from start to finish. Car looks amazing.', date: 'Feb 2026', vehicle: '2023 Tesla Model 3' },
      { id: 'r3', author: 'James R.', rating: 4, text: 'Great work on the chrome delete. Took a day longer than expected but quality was top notch.', date: 'Jan 2026', vehicle: '2022 BMW X5' },
    ],
    timeSlots: [
      { date: 'Thu Mar 12', time: '9:00 AM', available: true },
      { date: 'Thu Mar 12', time: '1:00 PM', available: true },
      { date: 'Fri Mar 13', time: '10:00 AM', available: false },
      { date: 'Sat Mar 14', time: '9:00 AM', available: true },
      { date: 'Sat Mar 14', time: '11:00 AM', available: true },
      { date: 'Mon Mar 16', time: '9:00 AM', available: true },
    ],
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: 'shop-2',
    name: 'Phantom Aesthetics',
    address: '8801 Santa Monica Blvd',
    city: 'West Hollywood, CA',
    distance: 2.8,
    rating: 4.7,
    reviewCount: 89,
    priceTier: 2,
    specialties: ['wrap', 'wheels', 'tint', 'accessories'],
    description: 'Full-service auto aesthetics shop. Wraps, wheels, tint — done right. Specializing in street and stance builds.',
    phone: '+1 (310) 555-0289',
    hours: 'Mon–Fri 9AM–5PM, Sat 10AM–4PM',
    certifications: ['Avery Dennison Certified', 'SEMA Member'],
    portfolioImages: [],
    reviews: [
      { id: 'r4', author: 'Alex K.', rating: 5, text: 'Best wheel fitment shop in LA. They sourced my Vossens, handled all the specs perfectly.', date: 'Mar 2026', vehicle: '2023 Porsche 911' },
      { id: 'r5', author: 'Taylor M.', rating: 4, text: 'Good work on the wrap, solid price. Took a little longer than quoted.', date: 'Feb 2026', vehicle: '2021 Audi S4' },
    ],
    timeSlots: [
      { date: 'Thu Mar 12', time: '10:00 AM', available: true },
      { date: 'Fri Mar 13', time: '9:00 AM', available: true },
      { date: 'Fri Mar 13', time: '2:00 PM', available: true },
      { date: 'Mon Mar 16', time: '10:00 AM', available: true },
    ],
    lat: 34.0901,
    lng: -118.3617,
  },
  {
    id: 'shop-3',
    name: 'Carbon Culture Studio',
    address: '4211 Sunset Dr',
    city: 'Hollywood, CA',
    distance: 3.5,
    rating: 4.8,
    reviewCount: 204,
    priceTier: 3,
    specialties: ['wrap', 'ppf', 'bodykit', 'accessories'],
    description: 'High-end custom builds. Specialists in Liberty Walk and Vorsteiner body modifications. Curated for car culture enthusiasts.',
    phone: '+1 (323) 555-0411',
    hours: 'Tue–Sat 9AM–6PM',
    certifications: ['3M Certified', 'Vorsteiner Authorized', 'XPEL Elite'],
    portfolioImages: [],
    reviews: [
      { id: 'r6', author: 'Chris V.', rating: 5, text: 'They built my full LB wide-body kit + wrap. 3-week project, result was showroom quality.', date: 'Feb 2026', vehicle: '2020 Nissan GT-R' },
      { id: 'r7', author: 'Dana P.', rating: 5, text: 'Full XPEL Stealth on my black car — looks insanely good. Matte is perfect.', date: 'Jan 2026', vehicle: '2024 Lamborghini Urus' },
    ],
    timeSlots: [
      { date: 'Fri Mar 13', time: '11:00 AM', available: true },
      { date: 'Sat Mar 14', time: '10:00 AM', available: true },
      { date: 'Tue Mar 17', time: '9:00 AM', available: true },
      { date: 'Tue Mar 17', time: '1:00 PM', available: true },
    ],
    lat: 34.0983,
    lng: -118.3249,
  },
  {
    id: 'shop-4',
    name: 'Velocity Motorsports',
    address: '19200 Hawthorne Blvd',
    city: 'Torrance, CA',
    distance: 8.1,
    rating: 4.6,
    reviewCount: 317,
    priceTier: 2,
    specialties: ['wrap', 'wheels', 'tint', 'ppf', 'accessories'],
    description: 'The highest-volume certified shop in South Bay. Over 317 reviews, trusted by the community.',
    phone: '+1 (310) 555-0192',
    hours: 'Mon–Sat 8AM–7PM',
    certifications: ['3M Certified', 'XPEL Certified', 'Llumar ProDealer'],
    portfolioImages: [],
    reviews: [
      { id: 'r8', author: 'Roy S.', rating: 5, text: 'Best tint job I\'ve had. Ceramic 20% — zero bubbles, clean lines.', date: 'Mar 2026', vehicle: '2022 Toyota Supra' },
      { id: 'r9', author: 'Kim L.', rating: 4, text: 'Fast wheel install, good price. Would recommend.', date: 'Feb 2026', vehicle: '2021 Honda Civic' },
    ],
    timeSlots: [
      { date: 'Thu Mar 12', time: '8:00 AM', available: true },
      { date: 'Thu Mar 12', time: '11:00 AM', available: true },
      { date: 'Thu Mar 12', time: '3:00 PM', available: true },
      { date: 'Fri Mar 13', time: '8:00 AM', available: true },
      { date: 'Fri Mar 13', time: '12:00 PM', available: true },
    ],
    lat: 33.8653,
    lng: -118.3436,
  },
];

// ─── ONBOARDING CONTENT ───────────────────────────────────────────────────────
export const onboardingSlides = [
  {
    headline: 'Your car. Your vision.',
    subtext: 'Upload a photo of your car and design your dream build — wraps, wheels, tint, PPF, and more.',
    accent: 'Design it.',
    icon: 'camera',
  },
  {
    headline: 'See it before you build it.',
    subtext: 'AI renders your exact customizations onto your car in seconds. Know exactly what you\'re getting.',
    accent: 'Visualize it.',
    icon: 'eye',
  },
  {
    headline: 'Book the shop. Own the build.',
    subtext: 'Find certified installers near you. Get real quotes. Book directly. Track installation from start to finish.',
    accent: 'Own it.',
    icon: 'map-pin',
  },
];

// ─── MOCK FEED POSTS (used by /home trending builds) ────────────────────────
import type { FeedPost } from '@/types';

export const mockPrebuilds: FeedPost[] = [
  {
    id: 'fp-1',
    user: { id: 'u1', username: 'wraplord', avatar: 'https://i.pravatar.cc/150?u=wraplord' },
    postType: 'image' as const,
    car: { make: 'BMW', model: 'M4', year: 2024, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80',
    isRender: false,
    buildSpecs: ['Satin Black Wrap', 'Vossen HF-5', '20% Tint'],
    buildTags: ['Satin Black Wrap', 'Vossen HF-5', '20% Tint'],
    likes: 342, comments: 28, commentsList: [], isLiked: false,
    sharedCost: false, caption: 'Satin black M4 build.',
    createdAt: '2026-03-09T10:00:00Z',
  },
  {
    id: 'fp-2',
    user: { id: 'u2', username: 'customsonly', avatar: 'https://i.pravatar.cc/150?u=customsonly' },
    postType: 'image' as const,
    car: { make: 'Mercedes-Benz', model: 'AMG GT', year: 2024, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80',
    isRender: true,
    buildSpecs: ['Matte Army Green', 'HRE P200', 'Chrome Delete'],
    buildTags: ['Matte Army Green', 'HRE P200', 'Chrome Delete'],
    likes: 891, comments: 64, commentsList: [], isLiked: true,
    sharedCost: false, caption: 'Army green AMG GT render.',
    createdAt: '2026-03-08T15:30:00Z',
  },
  {
    id: 'fp-3',
    user: { id: 'u3', username: 'buildkulture', avatar: 'https://i.pravatar.cc/150?u=buildkulture' },
    postType: 'image' as const,
    car: { make: 'Chevrolet', model: 'Corvette C8', year: 2024, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80',
    isRender: false,
    buildSpecs: ['Chrome Silver Wrap', 'Forgiato FF 15', 'Widebody Kit'],
    buildTags: ['Chrome Silver Wrap', 'Forgiato FF 15', 'Widebody Kit'],
    likes: 2847, comments: 183, commentsList: [], isLiked: false,
    sharedCost: false, caption: 'Chrome silver widebody C8.',
    createdAt: '2026-03-07T09:00:00Z',
  },
  {
    id: 'fp-4',
    user: { id: 'u4', username: 'tarmaclife', avatar: 'https://i.pravatar.cc/150?u=tarmaclife' },
    postType: 'image' as const,
    car: { make: 'Audi', model: 'RS6 Avant', year: 2024, image: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80' },
    imageUrl: 'https://images.unsplash.com/photo-1494905998402-395d579af36f?w=800&q=80',
    isRender: false,
    buildSpecs: ['Nardo Gray', 'Rotiform ECL', '35% Tint', 'XPEL Full Body'],
    buildTags: ['Nardo Gray', 'Rotiform ECL', '35% Tint', 'XPEL Full Body'],
    likes: 567, comments: 41, commentsList: [], isLiked: false,
    sharedCost: false, caption: 'Nardo gray RS6 with full PPF.',
    createdAt: '2026-03-06T18:00:00Z',
  },
];
