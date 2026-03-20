"use client";

import { useRouter } from "next/navigation";
import { Car, Plus } from "lucide-react";

export default function GaragePage() {
  const router = useRouter();
  const builds: Array<{ id: string; name: string; image: string; specs: string }> = [];

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", padding: "24px 20px 100px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-manrope), Manrope, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: "var(--on-surface)",
              margin: 0,
            }}
          >
            My Garage
          </h1>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: "2px 0 0" }}>
            Your saved builds & vehicles
          </p>
        </div>
        <button
          onClick={() => router.push("/upload")}
          className="btn btn-secondary"
          style={{ padding: "8px 14px", fontSize: 13, gap: 4, width: "auto" }}
        >
          <Plus size={14} />
          Add Car
        </button>
      </div>

      {builds.length === 0 ? (
        /* Empty state */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "80px 0",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "var(--primary-alpha-06)",
              border: "1px solid var(--primary-alpha-12)",
            }}
          >
            <Car size={36} style={{ color: "var(--outline)" }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "var(--on-surface)",
                margin: "0 0 4px",
              }}
            >
              No saved builds yet
            </p>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: 0 }}>
              Upload your car to start customizing
            </p>
          </div>
          <button
            onClick={() => router.push("/upload")}
            className="btn btn-primary"
            style={{ padding: "10px 24px", width: "auto", marginTop: 4 }}
          >
            Start Building
          </button>
        </div>
      ) : (
        /* Builds grid */
        <div className="garage-grid">
          {builds.map((build) => (
            <div
              key={build.id}
              style={{
                background: "var(--surface-card)",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "var(--shadow-card)",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "16/10",
                  background: "var(--surface-low)",
                }}
              />
              <div style={{ padding: 12 }}>
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "var(--on-surface)",
                    margin: "0 0 4px",
                  }}
                >
                  {build.name}
                </p>
                <p style={{ fontSize: 12, color: "var(--muted)", margin: 0 }}>
                  {build.specs}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
