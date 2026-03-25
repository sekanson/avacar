import { create } from "zustand";

interface UIStore {
  bottomSheetOpen: boolean;
  bottomSheetContent: React.ReactNode | null;
  openBottomSheet: (content: React.ReactNode) => void;
  closeBottomSheet: () => void;
}

export const useUIStore = create<UIStore>()((set) => ({
  bottomSheetOpen: false,
  bottomSheetContent: null,

  openBottomSheet: (content) =>
    set({ bottomSheetOpen: true, bottomSheetContent: content }),

  closeBottomSheet: () =>
    set({ bottomSheetOpen: false, bottomSheetContent: null }),
}));
