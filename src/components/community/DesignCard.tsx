"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export interface DesignCardProps {
  id: string;
  name: string;
  designer: { handle: string; avatar?: string };
  price: number | "free";
  image: string;
  vehicle: string;
  style: string;
}

export default function DesignCard({
  id,
  name,
  designer,
  price,
  image,
  vehicle,
  style,
}: DesignCardProps) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isFree = price === "free";
  const avatarInitial = designer.handle[0].toUpperCase();

  function handleCardClick() {
    router.push(`/community/design/${id}`);
  }

  function handleDesignerClick(e: React.MouseEvent) {
    e.stopPropagation();
    router.push(`/community/designer/${designer.handle}`);
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      onClick={handleCardClick}
      style={{
        breakInside: "avoid" as const,
        marginBottom: 10,
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid #2A2A36",
        background: "#14141A",
        cursor: "pointer",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Image — 4:3 aspect ratio */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", overflow: "hidden" }}>
        <img
          src={imgError ? "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80" : image}
          alt={name}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {/* Price badge — top right */}
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            padding: isFree ? "4px 10px" : "4px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
            background: isFree ? "rgba(68,204,255,0.18)" : "rgba(20,20,26,0.85)",
            color: isFree ? "#44CCFF" : "#44CCFF",
            border: `1px solid ${isFree ? "rgba(68,204,255,0.4)" : "rgba(68,204,255,0.3)"}`,
            backdropFilter: "blur(8px)",
            letterSpacing: "0.03em",
            zIndex: 2,
          }}
        >
          {isFree ? "Free" : `$${price}`}
        </div>

        {/* Designer avatar — bottom left overlay */}
        <button
          onClick={handleDesignerClick}
          style={{
            position: "absolute",
            bottom: 8,
            left: 8,
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(12,12,16,0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "4px 10px 4px 4px",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          {designer.avatar ? (
            <img
              src={designer.avatar}
              alt={designer.handle}
              style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #44CCFF, #0099cc)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 800,
                color: "#0C0C10",
                flexShrink: 0,
              }}
            >
              {avatarInitial}
            </div>
          )}
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.9)", whiteSpace: "nowrap" }}>
            @{designer.handle}
          </span>
        </button>

        {/* Hover overlay — slide up */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="hover-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.3) 55%, transparent 100%)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                padding: 10,
                zIndex: 3,
              }}
            >
              {/* Bag icon — top right of overlay */}
              <div
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(6px)",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/community/design/${id}`);
                }}
              >
                <ShoppingBag size={15} color="#fff" />
              </div>

              {/* Try on button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/upload?from=community&designId=${id}`);
                }}
                style={{
                  width: "100%",
                  height: 36,
                  borderRadius: 999,
                  background: "#44CCFF",
                  color: "#0C0C10",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                  letterSpacing: "0.01em",
                }}
              >
                🔮 Try on my car
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Design name — below image */}
      <div style={{ padding: "9px 12px 10px" }}>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: "#E8E8F0",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          }}
        >
          {name}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontSize: 11,
            color: "rgba(255,255,255,0.4)",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {vehicle} · {style}
        </p>
      </div>
    </motion.div>
  );
}
