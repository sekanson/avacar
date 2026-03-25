"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Camera, Palette, CheckCircle } from "lucide-react";

const slides = [
  {
    Icon: Camera,
    title: "Snap Your Ride",
    description:
      "Upload a photo of your car and our AI instantly detects the make, model, and trim — ready for customization.",
  },
  {
    Icon: Palette,
    title: "Design Your Dream",
    description:
      "Choose from 200+ vinyl wraps, custom wheels, window tints, PPF, and body kits. See it live on your car.",
  },
  {
    Icon: CheckCircle,
    title: "Get It Done",
    description:
      "Connect with 2,000+ certified shops near you, get real quotes, and book your installation in minutes.",
  },
];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 280 : -280,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -280 : 280,
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" as const },
  }),
};

export default function OnboardingPage() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = index === slides.length - 1;
  const { Icon, title, description } = slides[index];

  const goNext = () => {
    if (isLast) {
      router.push("/sign-up");
      return;
    }
    setDirection(1);
    setIndex((prev) => prev + 1);
  };

  const goSkip = () => {
    router.push("/sign-up");
  };

  return (
    <div className="min-h-dvh bg-background flex flex-col relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(68,204,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Skip button */}
      <div className="flex justify-end px-6 pt-5 relative z-10">
        <button
          onClick={goSkip}
          className="text-body-sm text-text-tertiary hover:text-text-secondary transition-colors py-2"
        >
          Skip
        </button>
      </div>

      {/* Slide area */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex flex-col items-center text-center gap-6 w-full max-w-xs"
          >
            {/* Icon container with glow ring */}
            <div
              className="w-20 h-20 rounded-card flex items-center justify-center relative"
              style={{
                background: "rgba(68,204,255,0.08)",
                border: "1px solid rgba(68,204,255,0.20)",
                boxShadow: "0 0 32px rgba(68,204,255,0.12)",
              }}
            >
              <Icon size={36} className="text-cyan" />
            </div>

            {/* Title */}
            <h2 className="font-display text-display-lg text-white">{title}</h2>

            {/* Description */}
            <p className="text-body-md text-text-secondary leading-relaxed max-w-xs mx-auto">
              {description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom: dots + CTA */}
      <div className="px-6 pb-10 flex flex-col items-center gap-8 relative z-10 w-full max-w-sm mx-auto">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className="rounded-chip transition-all duration-300"
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                background: i === index ? "#44CCFF" : "#2A2A36",
              }}
            />
          ))}
        </div>

        {/* CTA button */}
        <button
          onClick={goNext}
          className="w-full h-14 rounded-button bg-cyan text-background font-display font-bold text-body-lg transition-all active:scale-95"
          style={{ boxShadow: "0 0 20px rgba(68,204,255,0.25)" }}
        >
          {isLast ? "Let's Go" : "Next"}
        </button>
      </div>
    </div>
  );
}
