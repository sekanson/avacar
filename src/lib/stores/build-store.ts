import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Build, Vehicle, BuildItem, ProductCategory } from "@/lib/types";

interface BuildStore {
  // Active build state
  currentBuild: Build;
  vehicleImageUrl: string | null;
  renderUrl: string | null;

  // Actions
  setVehicle: (vehicle: Vehicle) => void;
  setVehicleImage: (url: string) => void;
  setRenderUrl: (url: string) => void;
  addItem: (category: ProductCategory, item: BuildItem) => void;
  removeItem: (category: ProductCategory) => void;
  clearBuild: () => void;

  // Computed
  getTotal: () => { min: number; max: number };
  getItemCount: () => number;
}

const emptyBuild: Build = {
  items: {},
  totalMin: 0,
  totalMax: 0,
};

export const useBuildStore = create<BuildStore>()(
  persist(
    (set, get) => ({
      currentBuild: emptyBuild,
      vehicleImageUrl: null,
      renderUrl: null,

      setVehicle: (vehicle) =>
        set((state) => ({
          currentBuild: { ...state.currentBuild, vehicle },
        })),

      setVehicleImage: (url) => set({ vehicleImageUrl: url }),

      setRenderUrl: (url) => set({ renderUrl: url }),

      addItem: (category, item) =>
        set((state) => {
          const newItems = { ...state.currentBuild.items, [category]: item };
          const total = Object.values(newItems).reduce(
            (acc, i) => ({
              min: acc.min + (i?.product.priceMin ?? 0),
              max: acc.max + (i?.product.priceMax ?? 0),
            }),
            { min: 0, max: 0 }
          );
          return {
            currentBuild: {
              ...state.currentBuild,
              items: newItems,
              totalMin: total.min,
              totalMax: total.max,
            },
          };
        }),

      removeItem: (category) =>
        set((state) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [category]: _removed, ...rest } = state.currentBuild.items;
          const restItems = rest as Partial<Record<ProductCategory, BuildItem>>;
          const total = Object.values(restItems).reduce<{ min: number; max: number }>(
            (acc, i) => ({
              min: acc.min + (i?.product.priceMin ?? 0),
              max: acc.max + (i?.product.priceMax ?? 0),
            }),
            { min: 0, max: 0 }
          );
          return {
            currentBuild: {
              ...state.currentBuild,
              items: rest,
              totalMin: total.min,
              totalMax: total.max,
            },
          };
        }),

      clearBuild: () =>
        set({ currentBuild: emptyBuild, vehicleImageUrl: null, renderUrl: null }),

      getTotal: () => ({
        min: get().currentBuild.totalMin,
        max: get().currentBuild.totalMax,
      }),

      getItemCount: () => Object.keys(get().currentBuild.items).length,
    }),
    {
      name: "avacar-build",
      partialize: (state) => ({
        currentBuild: state.currentBuild,
        vehicleImageUrl: state.vehicleImageUrl,
        renderUrl: state.renderUrl,
      }),
    }
  )
);
