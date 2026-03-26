"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Wrench, Globe, Sparkles, Camera } from "lucide-react";

// ─── MODIFY PRESETS ────────────────────────────────────────────────────────────
const MODIFY_PRESETS = [
  { name: "Satin Nardo Gray", sub: "3M 1080 Series", price: "From $2,400 installed", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp", tag: "Wrap Color" },
  { name: "Gloss Midnight Blue", sub: "Avery SW900", price: "From $2,200 installed", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp", tag: "Wrap Color" },
  { name: "Matte Black", sub: "3M 1080", price: "From $1,800 installed", img: "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=600&q=80&fm=webp", tag: "Wrap Color" },
  { name: "Midnight Purple", sub: "Inozetek", price: "From $3,200 installed", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp", tag: "Wrap Color" },
  { name: "HRE FF15 — Brushed Dark", sub: "HRE Wheels", price: "From $4,800", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp", tag: "Wheels" },
  { name: "Vossen CV3 — Gloss Black", sub: "Vossen", price: "From $3,200", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp", tag: "Wheels" },
  { name: "BBS CH-R — Satin Bronze", sub: "BBS", price: "From $5,600", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp", tag: "Wheels" },
  { name: "Liberty Walk Wide Body", sub: "Liberty Walk", price: "From $8,500", img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp", tag: "Body Kit" },
  { name: "Rocket Bunny V2", sub: "Pandem", price: "From $6,200", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp", tag: "Body Kit" },
  { name: "Slammed Stance", sub: "Air Suspension", price: "From $3,000", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp", tag: "Stance" },
  { name: "Ceramic Tint 20%", sub: "XPEL", price: "From $400", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp", tag: "Tint" },
  { name: "Chrome Delete", sub: "3M", price: "From $600", img: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80&fm=webp", tag: "Tint" },
];

const MODIFY_SUBCATS = ["All", "Wrap Color", "Wheels", "Body Kit", "Stance", "Tint"];

// ─── SCENE PRESETS ─────────────────────────────────────────────────────────────
const SCENE_PRESETS = [
  { name: "F1 Track", sub: "Monaco Grand Prix", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp" },
  { name: "Tokyo Night", sub: "Neon-lit Shibuya", img: "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=600&q=80&fm=webp" },
  { name: "Desert Highway", sub: "Golden Hour", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp" },
  { name: "Mountain Pass", sub: "Alpine Curves", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp" },
  { name: "Studio Showroom", sub: "Clean + Dramatic", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp" },
  { name: "Drifting", sub: "Tire Smoke + Action", img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp" },
  { name: "Rolling Shot", sub: "Highway Motion Blur", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp" },
  { name: "Rainy City", sub: "Wet Reflections", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
];

// ─── STYLE PRESETS ─────────────────────────────────────────────────────────────
const STYLE_PRESETS = [
  { name: "Clean Daily", desc: "OEM+ · Subtle mods · Daily driver perfection", img: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=600&q=80&fm=webp" },
  { name: "JDM Street", desc: "Slammed · Wide body · Neon underglow", img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80&fm=webp" },
  { name: "Euro Luxury", desc: "Brushed wheels · Elegant tones · Refined", img: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&q=80&fm=webp" },
  { name: "Murdered Out", desc: "All black everything · Stealth mode", img: "https://images.unsplash.com/photo-1525609004556-c46c70d0cf4c?w=600&q=80&fm=webp" },
  { name: "Track Weapon", desc: "Roll cage · Splitter · Wing · Stripped", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80&fm=webp" },
  { name: "Off-Road Beast", desc: "Lift kit · All-terrain · Light bar", img: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80&fm=webp" },
];

// ─── CONTENT PRESETS ───────────────────────────────────────────────────────────
const CONTENT_PRESETS = [
  { name: "Instagram Story", desc: "Vertical · Dramatic crop · Text overlay", img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80&fm=webp" },
  { name: "Phone Wallpaper", desc: "Lock screen optimized · Clean render", img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80&fm=webp" },
  { name: "Desktop Wallpaper", desc: "Ultrawide · Cinematic", img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80&fm=webp" },
  { name: "Before / After", desc: "Side-by-side comparison", img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp" },
];

const CATEGORIES = [
  { label: "Modify", key: "modify", Icon: Wrench },
  { label: "Scenes", key: "scenes", Icon: Globe },
  { label: "Styles", key: "styles", Icon: Sparkles },
  { label: "Content", key: "content", Icon: Camera },
];

const CAR_IMG = "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80&fm=webp";

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────────

function CreateYourOwnCard({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress} style={{
      background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
    }}>
      <div style={{
        borderRadius: 16, overflow: "hidden",
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
      }}>
        <div style={{
          width: "100%", aspectRatio: "3/2",
          background: "var(--color-surface-elevated)",
          border: "2px dashed var(--color-border)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ fontSize: 32, color: "#44CCFF", fontWeight: 300, lineHeight: 1 }}>+</span>
        </div>
        <div style={{ padding: "10px 12px 12px" }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px", lineHeight: 1.3 }}>Create your own</p>
          <p style={{ fontSize: 12, color: "var(--color-text-secondary)", margin: 0 }}>Start from scratch</p>
        </div>
      </div>
    </button>
  );
}

function ModifyGrid({ onSelect }: { onSelect: (name: string) => void }) {
  const router = useRouter();
  const [subcat, setSubcat] = useState("All");
  const filtered = subcat === "All" ? MODIFY_PRESETS : MODIFY_PRESETS.filter((p) => p.tag === subcat);

  return (
    <>
      {/* Subcategory chips */}
      <div style={{
        display: "flex", gap: 8, overflowX: "auto", padding: "16px 20px 0",
        scrollbarWidth: "none", flexShrink: 0,
      }}>
        {MODIFY_SUBCATS.map((s) => (
          <button key={s} onClick={() => setSubcat(s)} style={{
            flexShrink: 0, padding: "7px 14px", borderRadius: 999,
            fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            background: subcat === s ? "rgba(68,204,255,0.15)" : "var(--color-surface)",
            border: subcat === s ? "1px solid #44CCFF" : "1px solid var(--color-border)",
            color: subcat === s ? "#44CCFF" : "var(--color-text-secondary)",
            transition: "all 0.15s",
          }}>{s}</button>
        ))}
      </div>

      {/* 2-col grid */}
      <div style={{
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
        padding: "16px 20px 32px",
      }}>
        <CreateYourOwnCard onPress={() => router.push("/create")} />
        {filtered.map((p) => (
          <button key={p.name} onClick={() => onSelect(p.name)} style={{
            background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
          }}>
            <div style={{
              borderRadius: 16, overflow: "hidden",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              transition: "border-color 0.15s",
            }}>
              <img src={p.img} alt={p.name} loading="lazy" style={{
                width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block",
              }} />
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "var(--color-text-primary)", margin: "0 0 2px", lineHeight: 1.3 }}>{p.name}</p>
                <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>{p.sub}</p>
                <p style={{ fontSize: 11, color: "#44CCFF", margin: 0, fontWeight: 600 }}>{p.price}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function ScenesGrid({ onSelect }: { onSelect: (name: string) => void }) {
  const router = useRouter();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 20px 32px" }}>
      <CreateYourOwnCard onPress={() => router.push("/create")} />
      {SCENE_PRESETS.map((s) => (
        <button key={s.name} onClick={() => onSelect(s.name)} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
        }}>
          <div style={{
            borderRadius: 16, overflow: "hidden", position: "relative",
            border: "1px solid var(--color-border)",
          }}>
            <img src={s.img} alt={s.name} loading="lazy" style={{
              width: "100%", height: 160, objectFit: "cover", display: "block",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)",
              padding: "32px 12px 12px",
            }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: "0 0 2px", lineHeight: 1.2 }}>
                {s.name.toUpperCase()}
              </p>
              <p style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", margin: 0 }}>{s.sub}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function StylesGrid({ onSelect }: { onSelect: (name: string) => void }) {
  const router = useRouter();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 20px 32px" }}>
      <CreateYourOwnCard onPress={() => router.push("/create")} />
      {STYLE_PRESETS.map((s) => (
        <button key={s.name} onClick={() => onSelect(s.name)} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
        }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
          }}>
            <img src={s.img} alt={s.name} loading="lazy" style={{
              width: "100%", aspectRatio: "3/2", objectFit: "cover", display: "block",
            }} />
            <div style={{ padding: "10px 12px 12px" }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 4px", lineHeight: 1.3 }}>{s.name}</p>
              <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: "0 0 8px", lineHeight: 1.4 }}>{s.desc}</p>
              <span style={{ fontSize: 11, color: "#44CCFF", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}><Sparkles size={11} /> Try This Style</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

function ContentGrid({ onSelect }: { onSelect: (name: string) => void }) {
  const router = useRouter();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 20px 32px" }}>
      <CreateYourOwnCard onPress={() => router.push("/create")} />
      {CONTENT_PRESETS.map((c) => (
        <button key={c.name} onClick={() => onSelect(c.name)} style={{
          background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left",
        }}>
          <div style={{
            borderRadius: 16, overflow: "hidden",
            background: "var(--color-surface)", border: "1px solid var(--color-border)",
          }}>
            <img src={c.img} alt={c.name} loading="lazy" style={{
              width: "100%", aspectRatio: "16/9", objectFit: "cover", display: "block",
            }} />
            <div style={{ padding: "10px 12px 12px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "var(--color-text-primary)", margin: "0 0 2px", lineHeight: 1.3 }}>
                {c.name}
              </p>
              <p style={{ fontSize: 11, color: "var(--color-text-secondary)", margin: "0 0 4px" }}>{c.desc}</p>
              <p style={{ fontSize: 10, color: "#44CCFF", margin: 0, fontWeight: 600 }}>Ready to post</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────

export default function StudioCustomizePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(0);

  const handleSelect = (presetName: string) => {
    router.push(`/create/render?preset=${encodeURIComponent(presetName)}`);
  };

  return (
    <div style={{
      minHeight: "100dvh", background: "var(--color-bg)",
      display: "flex", flexDirection: "column", position: "relative",
      overflow: "hidden",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 40% at 50% -5%, rgba(68,204,255,0.06) 0%, transparent 60%)",
      }} />

      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 20px", position: "relative", zIndex: 3, flexShrink: 0,
      }}>
        <button onClick={() => router.back()} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "var(--color-text-tertiary)", display: "flex", alignItems: "center", gap: 4, fontSize: 14,
        }}>
          <ArrowLeft size={18} /> Back
        </button>
        <span style={{
          fontSize: 13, fontWeight: 800, color: "var(--color-text-primary)",
          fontFamily: "var(--font-manrope, Manrope, sans-serif)", letterSpacing: "0.05em",
        }}>✦ STUDIO</span>
        {/* Car circle */}
        <div style={{
          width: 40, height: 40, borderRadius: "50%", overflow: "hidden",
          border: "2px solid rgba(68,204,255,0.4)",
        }}>
          <img src={CAR_IMG} alt="Your car" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
        {/* Car hero */}
        <div style={{
          position: "relative", height: 200, overflow: "hidden", flexShrink: 0, margin: "0 20px",
          borderRadius: 16,
        }}>
          <img
            src={CAR_IMG}
            alt="Your car"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, var(--color-bg) 100%)",
          }} />
        </div>

        {/* Category tabs — sticky */}
        <div style={{
          position: "sticky", top: 0, zIndex: 2,
          background: "var(--color-bg)", flexShrink: 0,
          paddingBottom: 0,
        }}>
          <div style={{
            display: "flex", borderBottom: "1px solid var(--color-border)",
            overflowX: "auto", scrollbarWidth: "none",
          }}>
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.Icon;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(i)}
                  style={{
                    flex: "1 0 auto", padding: "14px 8px", fontSize: 12, fontWeight: 700,
                    background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap",
                    color: activeCategory === i ? "#44CCFF" : "var(--color-text-secondary)",
                    borderBottom: activeCategory === i ? "2px solid #44CCFF" : "2px solid transparent",
                    marginBottom: -1, transition: "all 0.15s",
                    fontFamily: "var(--font-manrope, Manrope, sans-serif)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                  }}
                >
                  <Icon size={13} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preset grid */}
        {activeCategory === 0 && <ModifyGrid onSelect={handleSelect} />}
        {activeCategory === 1 && <ScenesGrid onSelect={handleSelect} />}
        {activeCategory === 2 && <StylesGrid onSelect={handleSelect} />}
        {activeCategory === 3 && <ContentGrid onSelect={handleSelect} />}
      </div>
    </div>
  );
}
