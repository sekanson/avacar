export type ProductCategory = "wrap" | "wheel" | "tint" | "ppf" | "bodykit" | "accessory";
export type ShopTier = "standard" | "certified" | "elite";

export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  trim?: string;
}

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  brandName: string;
  description?: string;
  thumbnailUrl: string;
  priceMin: number; // cents
  priceMax: number; // cents
  tags?: string[];
  metadata: Record<string, unknown>;
}

export interface BuildItem {
  product: Product;
  quantity?: number;
  options?: Record<string, string>;
}

export interface Build {
  id?: string;
  vehicle?: Vehicle;
  vehicleImageUrl?: string;
  items: Partial<Record<ProductCategory, BuildItem>>;
  totalMin: number; // cents
  totalMax: number; // cents
  renderUrl?: string;
  createdAt?: string;
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  coverUrl?: string;
  city: string;
  stateProvince: string;
  distanceKm?: number;
  avgRating: number;
  reviewCount: number;
  priceTier: number;
  tier: ShopTier;
  services: ProductCategory[];
  phone?: string;
  address?: string;
  hours?: { day: string; hours: string }[];
  about?: string;
}

export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface Review {
  id: string;
  author: { name: string; avatarUrl?: string };
  rating: number;
  text: string;
  vehicleInfo?: string;
  createdAt: string;
}

export interface Booking {
  id?: string;
  shop: Shop;
  build: Build;
  selectedSlot: TimeSlot;
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
  confirmationCode?: string;
  notes?: string;
}

export interface UserProfile {
  clerkId: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
}

export interface Toast {
  id: string;
  message: string;
  variant: "success" | "error" | "info" | "warning";
  duration?: number;
}
