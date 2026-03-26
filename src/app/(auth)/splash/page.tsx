"use client";

import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function SplashPage() {
  const router = useRouter();

  return (
    <motion.div
      className="min-h-dvh bg-background flex flex-col relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(68,204,255,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-4 relative z-10">
        {/* Logo */}
        <motion.div variants={itemVariants} className="text-center mb-3">
          <h1 className="font-display text-display-2xl font-black tracking-tight text-white">
            AVA<span className="text-cyan">.</span>CAR
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-body-lg text-text-secondary text-center mb-12"
        >
          Customize. Visualize. Book.
        </motion.p>

        {/* Hero visual */}
        <motion.div variants={itemVariants} className="w-full max-w-sm mb-12">
          <div
            className="relative rounded-card overflow-hidden"
            style={{
              background:
                "linear-gradient(180deg, rgba(68,204,255,0.10) 0%, rgba(68,204,255,0.02) 60%, transparent 100%)",
              border: "1px solid rgba(68,204,255,0.15)",
            }}
          >
            {/* Inner glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(68,204,255,0.18) 0%, transparent 70%)",
              }}
            />

            <div className="relative p-8 flex flex-col items-center gap-6">
              {/* Abstract car silhouette using CSS */}
              <div className="relative w-full flex items-center justify-center h-36">
                {/* Car body */}
                <div
                  className="absolute"
                  style={{
                    width: 200,
                    height: 48,
                    borderRadius: "8px 8px 4px 4px",
                    background:
                      "linear-gradient(180deg, rgba(68,204,255,0.25) 0%, rgba(68,204,255,0.08) 100%)",
                    border: "1px solid rgba(68,204,255,0.30)",
                    bottom: 28,
                  }}
                />
                {/* Car cabin */}
                <div
                  className="absolute"
                  style={{
                    width: 110,
                    height: 34,
                    borderRadius: "12px 12px 2px 2px",
                    background:
                      "linear-gradient(180deg, rgba(68,204,255,0.35) 0%, rgba(68,204,255,0.15) 100%)",
                    border: "1px solid rgba(68,204,255,0.40)",
                    bottom: 74,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                />
                {/* Wheels */}
                {[-64, 64].map((offset, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(68,204,255,0.12)",
                      border: "2px solid rgba(68,204,255,0.40)",
                      bottom: 8,
                      left: `calc(50% + ${offset}px)`,
                      transform: "translateX(-50%)",
                    }}
                  />
                ))}
                {/* Ground reflection */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: 180,
                    height: 6,
                    borderRadius: "50%",
                    background: "rgba(68,204,255,0.15)",
                    filter: "blur(4px)",
                  }}
                />
              </div>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-2 justify-center">
                {["Instant Visualization", "200+ Wraps", "Certified Shops", "Live Pricing"].map(
                  (chip) => (
                    <span
                      key={chip}
                      className="px-3 py-1 rounded-chip text-body-xs font-medium text-cyan"
                      style={{
                        background: "rgba(68,204,255,0.08)",
                        border: "1px solid rgba(68,204,255,0.20)",
                      }}
                    >
                      {chip}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA section */}
      <motion.div
        variants={itemVariants}
        className="px-6 pb-10 flex flex-col gap-3 relative z-10 w-full max-w-sm mx-auto"
      >
        <button
          onClick={() => router.push("/feed")}
          className="w-full h-14 rounded-button bg-cyan text-background font-display font-bold text-body-lg flex items-center justify-center gap-2 transition-all active:scale-95"
          style={{ boxShadow: "0 0 24px rgba(68,204,255,0.30)" }}
        >
          Get Started
          <ArrowRight size={18} />
        </button>

        <button
          onClick={() => router.push("/feed")}
          className="w-full h-12 rounded-button text-text-secondary text-body-md font-medium transition-colors hover:text-white"
        >
          I have an account
        </button>

        <p className="text-body-xs text-text-tertiary text-center mt-1">
          By continuing you agree to our Terms &amp; Privacy Policy
        </p>
      </motion.div>
    </motion.div>
  );
}
