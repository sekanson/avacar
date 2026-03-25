"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useToastStore } from "@/lib/stores/toast-store";
import { toastVariants } from "@/lib/motion";
import { cn } from "@/lib/utils/cn";

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { toasts, removeToast } = useToastStore();

  return (
    <>
      {children}
      <div
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] flex flex-col gap-2 w-full max-w-sm px-4 pointer-events-none"
      >
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              variants={toastVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-card shadow-elevated pointer-events-auto",
                toast.variant === "success" && "bg-success/15 border border-success/30 text-success",
                toast.variant === "error" && "bg-error/15 border border-error/30 text-error",
                toast.variant === "info" && "bg-cyan-muted border border-cyan/30 text-cyan",
                toast.variant === "warning" && "bg-warning/15 border border-warning/30 text-warning"
              )}
            >
              {toast.variant === "success" && <CheckCircle size={16} className="shrink-0" />}
              {toast.variant === "error" && <AlertCircle size={16} className="shrink-0" />}
              {toast.variant === "info" && <Info size={16} className="shrink-0" />}
              {toast.variant === "warning" && <AlertTriangle size={16} className="shrink-0" />}
              <span className="flex-1 text-body-sm text-text-primary">{toast.message}</span>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-text-tertiary hover:text-text-primary transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
