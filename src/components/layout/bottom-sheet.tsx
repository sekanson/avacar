"use client";

import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { bottomSheet, overlay } from "@/lib/motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-[50]"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            ref={sheetRef}
            className={cn(
              "fixed bottom-0 left-0 right-0 z-[51]",
              "bg-surface-elevated rounded-t-sheet shadow-sheet",
              "max-h-[90vh] overflow-y-auto"
            )}
            variants={bottomSheet}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.3 }}
            onDragEnd={(_e, info) => {
              if (info.offset.y > 100) {
                onClose();
              }
            }}
          >
            {/* Handle */}
            <div className="flex justify-center mt-3 mb-2">
              <div className="w-10 h-1 rounded-chip bg-surface-border" />
            </div>

            {/* Title */}
            {title && (
              <div className="px-page-x pb-3 border-b border-surface-border">
                <h2 className="font-display text-display-xs text-text-primary text-center">
                  {title}
                </h2>
              </div>
            )}

            {/* Content */}
            <div className="px-page-x pb-8 pt-4">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default BottomSheet;
