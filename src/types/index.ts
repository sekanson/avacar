// ─── Vehicle ────────────────────────────────────────────────────────────────
export interface Vehicle {
  make: string;
  model: string;
  year: number;
  color: string;
  bodyType: string;
  trim?: string;
}

// ─── Products ────────────────────────────────────────────────────────────────
export type ProductCategory = 'wrap' | 'wheels' | 'tint' | 'ppf' | 'bodykit' | 'accessories';

export interface Product {
  id: string;
  category: ProductCategory;
  name: string;
  brand: string;
  description: string;
  priceMin: number;
  priceMax: number;
  imageUrl?: string;
  tags?: string[];
  coverage?: string;
  finish?: string;
  color?: string;
  colorHex?: string;
  size?: string;
}

// ─── Build ───────────────────────────────────────────────────────────────────
export interface BuildSelection {
  wrap?: Product;
  wheels?: Product;
  tint?: Product;
  ppf?: Product;
  bodykit?: Product;
  accessories?: Product[];
}

export interface Build {
  id?: string;
  vehicle: Vehicle;
  vehiclePhotoUrl?: string;
  selections: BuildSelection;
  totalMin: number;
  totalMax: number;
  renderUrl?: string;
  createdAt?: string;
}

// ─── Shop ────────────────────────────────────────────────────────────────────
export interface TimeSlot {
  date: string;
  time: string;
  available: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  text: string;
  date: string;
  vehicle?: string;
}

export interface Shop {
  id: string;
  name: string;
  address: string;
  city: string;
  distance: number;
  rating: number;
  reviewCount: number;
  priceTier: 1 | 2 | 3;
  specialties: ProductCategory[];
  description: string;
  phone?: string;
  hours?: string;
  certifications: string[];
  portfolioImages: string[];
  reviews: Review[];
  timeSlots: TimeSlot[];
  lat?: number;
  lng?: number;
}

// ─── Booking ─────────────────────────────────────────────────────────────────
export interface Booking {
  id?: string;
  shop: Shop;
  build: Build;
  selectedSlot: TimeSlot;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  confirmationCode?: string;
  createdAt?: string;
}

// ─── User ────────────────────────────────────────────────────────────────────
export interface UserProfile {
  id: string;
  clerkId: string;
  username: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
}

// ─── Feed ────────────────────────────────────────────────────────────────────
export interface FeedUser {
  id: string;
  username: string;
  avatar: string;
}

export interface FeedCar {
  make: string;
  model: string;
  year: number;
  image: string;
}

export interface FeedComment {
  id: string;
  user: FeedUser;
  text: string;
  createdAt: string;
}

export type PostType = 'image' | 'text' | 'poll' | 'build_share' | 'question';

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface FeedPost {
  id: string;
  user: FeedUser;
  postType: PostType;
  car?: FeedCar;
  imageUrl?: string;
  isRender: boolean;
  buildSpecs: string[];
  buildTags: string[];
  likes: number;
  comments: number;
  commentsList: FeedComment[];
  isLiked: boolean;
  shopName?: string;
  totalCost?: number;
  sharedCost: boolean;
  caption: string;
  createdAt: string;
  poll?: { question: string; options: PollOption[]; endsAt: string };
  replyTo?: { username: string; preview: string };
  threadCount?: number;
}

/** Legacy alias */
export type FeedPostLegacy = FeedPost;

// ─── DMs ────────────────────────────────────────────────────────────────────
export interface DMMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export interface DMConversation {
  id: string;
  user: FeedUser;
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
  messages: DMMessage[];
}

// ─── App State ───────────────────────────────────────────────────────────────
export type AppScreen =
  | 'splash'
  | 'onboarding'
  | 'auth-signup'
  | 'auth-login'
  | 'auth-forgot'
  | 'home'
  | 'explore'
  | 'garage'
  | 'profile'
  | 'upload'
  | 'detecting'
  | 'confirm-vehicle'
  | 'customize'
  | 'rendering'
  | 'quote'
  | 'find-shop'
  | 'shop-profile'
  | 'booking-review'
  | 'booking-confirmed';

export type NavTab = 'feed' | 'explore' | 'upload' | 'garage' | 'profile' | 'messages';
