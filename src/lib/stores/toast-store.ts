import { create } from "zustand";
import type { Toast } from "@/lib/types";

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],

  addToast: (toast) => {
    const id = Math.random().toString(36).slice(2);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));

    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, duration);
    }
  },

  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

  clearToasts: () => set({ toasts: [] }),
}));

// Convenience hook
export function useToast() {
  const { addToast } = useToastStore();

  return {
    success: (message: string) => addToast({ message, variant: "success" }),
    error: (message: string) => addToast({ message, variant: "error" }),
    info: (message: string) => addToast({ message, variant: "info" }),
    warning: (message: string) => addToast({ message, variant: "warning" }),
  };
}
