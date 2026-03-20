"use client";

import { useRouter } from "next/navigation";
import { Car, Plus } from "lucide-react";
import { useAppStore } from "@/store/appStore";

export default function GaragePage() {
  const router = useRouter();
  const { savedBuilds } = useAppStore();

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

      {savedBuilds.length === 0 ? (
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
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {savedBuilds.map((build, idx) => {
            const tags = [
              build.selections.wrap?.name,
              build.selections.wheels?.name,
              build.selections.tint?.name,
              build.selections.ppf?.name,
              build.selections.bodykit?.name,
            ].filter(Boolean) as string[];
            const dateStr = build.createdAt
              ? new Date(build.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
              : "";
            return (
              <div
                key={build.id ?? idx}
                style={{
                  background: "var(--surface-card)",
                  borderRadius: 14,
                  padding: 16,
                  boxShadow: "var(--shadow-card)",
                }}
              >
                <p
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--on-surface)",
                    margin: "0 0 8px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {build.vehicle.year} {build.vehicle.make} {build.vehicle.model}
                </p>
                {tags.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          fontWeight: 500,
                          color: "var(--on-surface-variant)",
                          background: "var(--surface-low)",
                          borderRadius: 6,
                          padding: "3px 8px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "var(--primary)" }}>
                    ${build.totalMin.toLocaleString()}-${build.totalMax.toLocaleString()}
                  </span>
                  {dateStr && (
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{dateStr}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
