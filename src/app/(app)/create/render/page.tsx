"use client";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BookmarkPlus, Share2, ShoppingBag, RefreshCw } from "lucide-react";

const RESULTS = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
    before: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    parts: ["3M Satin Black Wrap", "HRE FF15 Wheels", "Chrome Delete"],
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
    before: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    parts: ["Avery Nardo Gray", "BBS CH-R Wheels", "PPF Full"],
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    before: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    parts: ["Inozetek Gloss Black", "Vossen CV3 Wheels", "Ceramic Tint 20%"],
  },
];

const CAR_PHOTO = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&q=80";

function LoadingSkeleton({ progress }: { progress: number }) {
  return (
    <div style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: 28, padding: "0 24px",
    }}>
      {/* User's car photo with shimmer overlay */}
      <div style={{ position: "relative", width: 200, height: 130, borderRadius: 16, overflow: "hidden" }}>
        <img
          src={CAR_PHOTO}
          alt="Your car"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Shimmer sweep */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, transparent 0%, rgba(68,204,255,0.35) 50%, transparent 100%)",
          animation: "shimmerSweep 1.4s ease-in-out infinite",
        }} />
        {/* Overlay gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 40%, rgba(12,12,16,0.6) 100%)",
        }} />
      </div>

      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 20, fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 6px",
          fontFamily: "var(--font-manrope, Manrope, sans-serif)" }}>
          Working on your look...
        </p>
        <p style={{ fontSize: 13, color: "var(--color-text-secondary)", margin: 0 }}>
          Preparing 3 looks for you
        </p>
      </div>

      <div style={{ width: "100%", maxWidth: 280, background: "var(--color-border)", borderRadius: 999, height: 4 }}>
        <div style={{
          height: "100%", borderRadius: 999,
          background: "linear-gradient(90deg, #44CCFF, #007FFF)",
          width: `${progress}%`, transition: "width 0.3s ease",
        }} />
      </div>

      <style>{`
        @keyframes shimmerSweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}

function RenderContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preset = searchParams.get("preset") ?? "Your Build";

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const [showBefore, setShowBefore] = useState(false);

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 4;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: "100dvh", background: "var(--color-bg)",
      display: "flex", flexDirection: "column", position: "relative",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(68,204,255,0.06) 0%, transparent 60%)",
      }} />

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px 0", position: "relative", zIndex: 2,
      }}>
        <button onClick={() => router.back()} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 4, fontSize: 14,
        }}>
          <ArrowLeft size={18} /> Back
        </button>
        <span style={{
          fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)",
          fontFamily: "var(--font-manrope, Manrope, sans-serif)",
          maxWidth: 180, textAlign: "center", lineHeight: 1.3,
        }}>
          STUDIO
        </span>
        <div style={{ width: 60 }} />
      </div>

      {loading ? (
        <LoadingSkeleton progress={progress} />
      ) : (
        <>
          {/* Before/After toggle + hero */}
          <div style={{ position: "relative", height: "38vh", overflow: "hidden", flexShrink: 0, marginTop: 12 }}>
            <img
              src={showBefore ? RESULTS[selected].before : RESULTS[selected].img}
              alt={showBefore ? "Before" : `Look ${selected + 1}`}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", transition: "opacity 0.3s" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, var(--color-bg) 100%)",
            }} />

            {/* Before/After toggle pill */}
            <div style={{
              position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)",
              display: "flex", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)",
              borderRadius: 999, padding: 3, gap: 2,
            }}>
              <button
                onClick={() => setShowBefore(false)}
                style={{
                  padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                  background: !showBefore ? "#44CCFF" : "transparent",
                  color: !showBefore ? "#0C0C10" : "rgba(255,255,255,0.7)",
                  fontSize: 11, fontWeight: 700, transition: "all 0.2s",
                }}
              >
                After
              </button>
              <button
                onClick={() => setShowBefore(true)}
                style={{
                  padding: "5px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                  background: showBefore ? "#44CCFF" : "transparent",
                  color: showBefore ? "#0C0C10" : "rgba(255,255,255,0.7)",
                  fontSize: 11, fontWeight: 700, transition: "all 0.2s",
                }}
              >
                Before
              </button>
            </div>

            <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: "var(--color-text-primary)", margin: "0 0 6px" }}>
                Look {selected + 1} — {preset}
              </p>
              {/* Product badges */}
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {RESULTS[selected].parts.map((part) => (
                  <span key={part} style={{
                    fontSize: 10, padding: "3px 8px", borderRadius: 999,
                    background: "rgba(68,204,255,0.15)", border: "1px solid rgba(68,204,255,0.3)",
                    color: "#44CCFF", fontWeight: 600,
                  }}>{part}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Result cards row */}
          <div style={{
            display: "flex", gap: 12, overflowX: "auto", padding: "20px 20px 0",
            scrollSnapType: "x mandatory", scrollbarWidth: "none",
            position: "relative", zIndex: 1,
          }}>
            {RESULTS.map((r, i) => (
              <button
                key={r.id}
                onClick={() => { setSelected(i); setShowBefore(false); }}
                style={{
                  flexShrink: 0, width: 130, borderRadius: 12, overflow: "hidden",
                  border: i === selected ? "2px solid #44CCFF" : "2px solid transparent",
                  background: "none", padding: 0, cursor: "pointer",
                  scrollSnapAlign: "start",
                  boxShadow: i === selected ? "0 0 16px rgba(68,204,255,0.3)" : "none",
                }}
              >
                <img
                  src={r.img}
                  alt={`Option ${i + 1}`}
                  loading="lazy"
                  style={{ width: "100%", height: 75, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "6px 8px", background: "var(--color-surface)", textAlign: "left" }}>
                  <p style={{
                    fontSize: 10, fontWeight: 700,
                    color: i === selected ? "#44CCFF" : "var(--color-text-secondary)",
                    margin: 0, lineHeight: 1.3,
                  }}>Look {i + 1}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end",
            padding: "16px 20px 32px", gap: 10, position: "relative", zIndex: 2,
          }}>
            {/* Row 1: Try another + Share */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={() => router.back()}
                style={{
                  flex: 1, height: 48, borderRadius: 999,
                  background: "transparent", color: "var(--color-text-primary)",
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                  border: "1px solid var(--color-border)",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                <RefreshCw size={14} /> Try another look
              </button>
              <button style={{
                flex: 1, height: 48, borderRadius: 999,
                background: "transparent", color: "var(--color-text-primary)",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <Share2 size={14} /> Share
              </button>
            </div>

            {/* Row 2: Save + Shop */}
            <div style={{ display: "flex", gap: 10 }}>
              <button style={{
                flex: 1, height: 48, borderRadius: 999,
                background: "transparent", color: "var(--color-text-secondary)",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                border: "1px solid var(--color-border)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <BookmarkPlus size={14} /> Save to My Garage
              </button>
              <button
                onClick={() => router.push("/marketplace/products")}
                style={{
                  flex: 1, height: 48, borderRadius: 999,
                  background: "rgba(68,204,255,0.08)",
                  border: "1px solid rgba(68,204,255,0.25)",
                  color: "#44CCFF",
                  fontWeight: 600, fontSize: 13, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                }}>
                <ShoppingBag size={14} /> Shop this build
              </button>
            </div>

            {/* Row 3: Find a shop CTA */}
            <button
              onClick={() => router.push("/create/shops")}
              style={{
                width: "100%", height: 56, borderRadius: 999,
                background: "linear-gradient(135deg, #44CCFF 0%, #007FFF 100%)",
                color: "#0C0C10", fontWeight: 700, fontSize: 15, border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                boxShadow: "0 0 24px rgba(68,204,255,0.3)",
              }}
            >
              Get This Built — Find a Shop Near You
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function RenderPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100dvh", background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ opacity: 0.4 }}>
          <svg width="80" height="30" viewBox="0 0 160 60" fill="none">
            <path d="M20 45 Q20 35 35 30 L55 20 Q65 15 75 15 L100 15 Q110 15 115 20 L130 30 Q145 35 145 45"
              stroke="#44CCFF" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>
    }>
      <RenderContent />
    </Suspense>
  );
}
