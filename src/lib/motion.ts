import { Variants } from "framer-motion";

// Page transitions (200ms fade as per spec)
export const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "easeOut" },
};

// Stagger children (for lists, grids)
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

// Bottom sheet (slide up from bottom)
export const bottomSheet: Variants = {
  hidden: { y: "100%" },
  visible: { y: 0, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { y: "100%", transition: { duration: 0.2, ease: "easeIn" } },
};

// Modal (scale + fade)
export const modal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: "easeOut" } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } },
};

// Tab content (slide direction)
export const tabSlide = (direction: "left" | "right"): Variants => ({
  enter: { x: direction === "right" ? 16 : -16, opacity: 0 },
  center: { x: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { x: direction === "right" ? -16 : 16, opacity: 0, transition: { duration: 0.15 } },
});

// Like heart animation (scale bounce)
export const heartPop = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.3, 0.9, 1.1, 1],
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Card press (subtle scale on tap)
export const cardTap = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.1 },
};

// Overlay backdrop
export const overlay: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

// Toast notification (slide in from top)
export const toastVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.15 } },
};

// Skeleton pulse (for loading states)
export const skeletonPulse = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
  },
};
