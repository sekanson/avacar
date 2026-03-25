"use client";

import { use } from "react";
import Link from "next/link";
import { getBrandBySlug, getProductsByBrand, allMarketplaceProducts } from "@/data/marketplace";
import { ArrowLeft, Star, Package, Users, Store } from "lucide-react";

export default function BrandStorefrontPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const brand = getBrandBySlug(slug);

  if (!brand) {
    // Show a generic storefront for unlisted brands (Vossen, Rotiform, BBS, Hexis)
    const brandName = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return <GenericBrandPage slug={slug} brandName={brandName} />;
  }

  const products = getProductsByBrand(slug);
  const featured = products.slice(0, 6);
  const newArrivals = [...products].reverse().slice(0, 4);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 100 }}>
      {/* Back nav */}
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/marketplace" style={{ color: "var(--on-surface-variant)", display: "flex", alignItems: "center" }}>
          <ArrowLeft size={20} />
        </Link>
        <span style={{ fontSize: 12, color: "var(--on-surface-variant)" }}>
          <Link href="/marketplace" style={{ color: "var(--primary)", textDecoration: "none" }}>Shop</Link> / {brand.name}
        </span>
      </div>

      {/* Hero banner */}
      <div
        style={{
          margin: "16px 0 0",
          height: 200,
          background: brand.heroGradient,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          padding: "24px 24px",
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${brand.logoColor}22 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -20,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)`,
          }}
        />

        {/* Brand identity */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(0,0,0,0.4)",
              backdropFilter: "blur(12px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 900,
              color: "#fff",
              fontStyle: "italic",
              letterSpacing: "-0.02em",
              flexShrink: 0,
            }}
          >
            {brand.name.substring(0, 2)}
          </div>
          <div>
            <p
              style={{
                fontSize: 9,
                fontWeight: 700,
                color: brand.logoColor,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {brand.tier}
            </p>
            <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em", marginBottom: 4 }}>
              {brand.name}
            </h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{brand.tagline}</p>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          padding: "0 20px",
          marginTop: 0,
          background: "var(--surface-card)",
          boxShadow: "var(--shadow-card)",
        }}
      >
        {[
          { icon: <Package size={14} />, value: brand.productCount, label: "Products" },
          { icon: <Users size={14} />, value: brand.buildsCount.toLocaleString(), label: "Builds" },
          { icon: <Star size={14} />, value: brand.avgRating, label: "Avg Rating" },
          { icon: <Store size={14} />, value: brand.certifiedShopsCount, label: "Shops" },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              flex: 1,
              padding: "16px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div style={{ color: "var(--on-surface-variant)", marginBottom: 2 }}>{stat.icon}</div>
            <p style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em" }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 9, fontWeight: 600, color: "var(--on-surface-variant)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Featured products */}
      {featured.length > 0 && (
        <div style={{ padding: "24px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase" }}>
                Featured
              </p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginTop: 2 }}>
                Flagship Products
              </p>
            </div>
            <Link href={`/marketplace/products?brand=${slug}`} style={{ fontSize: 12, color: "var(--on-surface-variant)", textDecoration: "none" }}>
              See all →
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
            }}
          >
            {featured.map((product) => (
              <Link
                key={product.slug}
                href={`/marketplace/products/${product.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "var(--surface-card)",
                    borderRadius: 14,
                    overflow: "hidden",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      background: `radial-gradient(ellipse at 35% 35%, ${product.primaryColorHex}cc, ${product.primaryColorHex})`,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 55%)",
                      }}
                    />
                  </div>
                  <div style={{ padding: "8px 10px 10px" }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.3, marginBottom: 4 }}>
                      {product.name}
                    </p>

                    {/* Swatches */}
                    <div style={{ display: "flex", gap: 3, marginBottom: 6 }}>
                      {product.variants.slice(0, 4).map((v) => (
                        <div
                          key={v.name}
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            background: v.colorHex,
                            border: "1.5px solid var(--surface-low)",
                          }}
                        />
                      ))}
                      {product.variants.length > 4 && (
                        <span style={{ fontSize: 9, color: "var(--on-surface-variant)", alignSelf: "center" }}>
                          +{product.variants.length - 4}
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)" }}>
                      from ${product.fromPrice}
                    </p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: "#007FFF", marginTop: 4 }}>
                      Visualize on My Car →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* New arrivals */}
      {newArrivals.length > 0 && (
        <div style={{ padding: "24px 0 0" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase" }}>
                New Arrivals
              </p>
              <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginTop: 2 }}>
                Just Added
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, overflowX: "auto", scrollbarWidth: "none", padding: "0 20px 4px" }}>
            {newArrivals.map((product) => (
              <Link
                key={product.slug}
                href={`/marketplace/products/${product.slug}`}
                style={{
                  flexShrink: 0,
                  width: 150,
                  background: "var(--surface-card)",
                  borderRadius: 14,
                  overflow: "hidden",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1 / 1",
                    background: `radial-gradient(ellipse at 35% 35%, ${product.primaryColorHex}cc, ${product.primaryColorHex})`,
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 55%)" }} />
                  <div
                    style={{
                      position: "absolute",
                      top: 7,
                      left: 7,
                      padding: "2px 7px",
                      borderRadius: 100,
                      background: "rgba(34,197,94,0.9)",
                      fontSize: 8,
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "0.05em",
                    }}
                  >
                    NEW
                  </div>
                </div>
                <div style={{ padding: "8px 10px 10px" }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.3, marginBottom: 4 }}>{product.name}</p>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)" }}>from ${product.fromPrice}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Builds in the Wild */}
      <div style={{ padding: "24px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 6 }}>
          Community
        </p>
        <p style={{ fontSize: 18, fontWeight: 800, color: "var(--on-surface)", letterSpacing: "-0.01em", marginBottom: 14 }}>
          Builds in the Wild
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 4,
          }}
        >
          {[
            { bg: "linear-gradient(135deg, #1c1c1e, #2d2d2d)", label: "@wrapsbyalex" },
            { bg: "linear-gradient(135deg, #0d1a35, #1a2744)", label: "@gta.wraps" },
            { bg: "linear-gradient(135deg, #1a2a1a, #2d4a2d)", label: "@m4life" },
            { bg: "linear-gradient(135deg, #2d1a44, #4a2d5a)", label: "@chromedelete" },
            { bg: "linear-gradient(135deg, #2d1a1a, #5a2d2d)", label: "@ppf.obsessed" },
            { bg: "linear-gradient(135deg, #1a1a2d, #2d2d4a)", label: "@stancenation" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                aspectRatio: "1 / 1",
                background: item.bg,
                borderRadius: 8,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "8px 6px 6px",
                  background: "linear-gradient(transparent, rgba(0,0,0,0.6))",
                }}
              >
                <p style={{ fontSize: 8, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div style={{ padding: "24px 20px 0" }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "var(--primary)", textTransform: "uppercase", marginBottom: 10 }}>
          About
        </p>
        <p style={{ fontSize: 14, color: "var(--on-surface-variant)", lineHeight: 1.7 }}>{brand.about}</p>
      </div>

      {/* Certified shops CTA */}
      <div
        style={{
          margin: "24px 20px 0",
          padding: "20px",
          background: "var(--surface-card)",
          borderRadius: 16,
          boxShadow: "var(--shadow-card)",
        }}
      >
        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--on-surface)", marginBottom: 4 }}>
          Certified {brand.name} Installers
        </p>
        <p style={{ fontSize: 12, color: "var(--on-surface-variant)", marginBottom: 14, lineHeight: 1.5 }}>
          {brand.certifiedShopsCount} Zeno Certified shops specialize in {brand.name} products.
        </p>
        <button
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: 100,
            background: "var(--primary-gradient)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 13,
            border: "none",
            cursor: "pointer",
          }}
        >
          Find {brand.name} Certified Shops
        </button>
      </div>
    </div>
  );
}

// Generic storefront for brands not in our main list
function GenericBrandPage({ slug, brandName }: { slug: string; brandName: string }) {
  const products = allMarketplaceProducts.filter((p) => p.brandSlug === slug);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100%", paddingBottom: 100 }}>
      <div style={{ padding: "16px 20px 0", display: "flex", alignItems: "center", gap: 12 }}>
        <Link href="/marketplace" style={{ color: "var(--on-surface-variant)", display: "flex", alignItems: "center" }}>
          <ArrowLeft size={20} />
        </Link>
      </div>

      <div
        style={{
          margin: "16px 0 0",
          height: 160,
          background: "linear-gradient(135deg, #1a1a2e, #2d2d4a)",
          display: "flex",
          alignItems: "flex-end",
          padding: "24px",
        }}
      >
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{brandName}</h1>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>Automotive Products</p>
        </div>
      </div>

      <div style={{ padding: "24px 20px 0" }}>
        {products.length > 0 ? (
          <>
            <p style={{ fontSize: 16, fontWeight: 800, color: "var(--on-surface)", marginBottom: 14 }}>Products</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {products.map((product) => (
                <Link
                  key={product.slug}
                  href={`/marketplace/products/${product.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ background: "var(--surface-card)", borderRadius: 14, overflow: "hidden", boxShadow: "var(--shadow-card)" }}>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        background: `radial-gradient(ellipse at 35% 35%, ${product.primaryColorHex}cc, ${product.primaryColorHex})`,
                      }}
                    />
                    <div style={{ padding: "8px 10px 10px" }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--on-surface)", lineHeight: 1.3 }}>{product.name}</p>
                      <p style={{ fontSize: 12, fontWeight: 700, color: "var(--on-surface)", marginTop: 4 }}>from ${product.fromPrice}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "60px 0" }}>
            <p style={{ fontSize: 24, marginBottom: 8 }}>🏭</p>
            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--on-surface)", marginBottom: 6 }}>{brandName}</p>
            <p style={{ fontSize: 13, color: "var(--on-surface-variant)", marginBottom: 20 }}>
              Full product catalog coming soon.
            </p>
            <Link href="/marketplace/products" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>
              Browse all products →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
