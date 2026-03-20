import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Vehicle,
  Build,
  BuildSelection,
  Product,
  Shop,
  TimeSlot,
  Booking,
  NavTab,
} from '@/types';

interface AppState {
  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Onboarding
  hasSeenOnboarding: boolean;
  setHasSeenOnboarding: (val: boolean) => void;

  // Commerce flow state
  uploadedPhoto: string | null;
  setUploadedPhoto: (url: string | null) => void;

  detectedVehicle: Vehicle | null;
  setDetectedVehicle: (vehicle: Vehicle | null) => void;

  currentBuild: BuildSelection;
  setProduct: (category: keyof BuildSelection, product: Product | Product[] | null) => void;
  clearBuild: () => void;

  currentVehicle: Vehicle | null;
  setCurrentVehicle: (vehicle: Vehicle | null) => void;

  renderUrl: string | null;
  setRenderUrl: (url: string | null) => void;

  selectedShop: Shop | null;
  setSelectedShop: (shop: Shop | null) => void;

  selectedSlot: TimeSlot | null;
  setSelectedSlot: (slot: TimeSlot | null) => void;

  currentBooking: Booking | null;
  setCurrentBooking: (booking: Booking | null) => void;

  // Garage
  savedBuilds: Build[];
  saveBuild: (build: Build) => void;
  clearSavedBuilds: () => void;

  // Toast
  toast: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;

  // Build total
  getBuildTotal: () => { min: number; max: number };
}

const emptyBuild: BuildSelection = {};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      activeTab: 'feed',
      setActiveTab: (tab) => set({ activeTab: tab }),

      hasSeenOnboarding: false,
      setHasSeenOnboarding: (val) => set({ hasSeenOnboarding: val }),

      uploadedPhoto: null,
      setUploadedPhoto: (url) => set({ uploadedPhoto: url }),

      detectedVehicle: null,
      setDetectedVehicle: (vehicle) => set({ detectedVehicle: vehicle }),

      currentBuild: emptyBuild,
      setProduct: (category, product) =>
        set((state) => ({
          currentBuild: { ...state.currentBuild, [category]: product },
        })),
      clearBuild: () =>
        set({ currentBuild: emptyBuild, uploadedPhoto: null, detectedVehicle: null, renderUrl: null }),

      currentVehicle: null,
      setCurrentVehicle: (vehicle) => set({ currentVehicle: vehicle }),

      renderUrl: null,
      setRenderUrl: (url) => set({ renderUrl: url }),

      selectedShop: null,
      setSelectedShop: (shop) => set({ selectedShop: shop }),

      selectedSlot: null,
      setSelectedSlot: (slot) => set({ selectedSlot: slot }),

      currentBooking: null,
      setCurrentBooking: (booking) => set({ currentBooking: booking }),

      savedBuilds: [],
      saveBuild: (build) =>
        set((state) => ({ savedBuilds: [...state.savedBuilds, build] })),
      clearSavedBuilds: () => set({ savedBuilds: [] }),

      toast: null,
      showToast: (msg) => {
        set({ toast: msg });
        setTimeout(() => set({ toast: null }), 2200);
      },
      clearToast: () => set({ toast: null }),

      getBuildTotal: () => {
        const build = get().currentBuild;
        let min = 0;
        let max = 0;
        const addProduct = (p: Product | Product[] | undefined) => {
          if (!p) return;
          const products = Array.isArray(p) ? p : [p];
          products.forEach((prod) => {
            min += prod.priceMin;
            max += prod.priceMax;
          });
        };
        addProduct(build.wrap);
        addProduct(build.wheels);
        addProduct(build.tint);
        addProduct(build.ppf);
        addProduct(build.bodykit);
        if (build.accessories) addProduct(build.accessories);
        return { min, max };
      },
    }),
    {
      name: 'avacar-app',
      partialize: (state) => ({
        hasSeenOnboarding: state.hasSeenOnboarding,
        activeTab: state.activeTab,
        savedBuilds: state.savedBuilds,
      }),
    }
  )
);
