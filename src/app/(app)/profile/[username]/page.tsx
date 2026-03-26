"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, UserCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProfileByUsername, getPostsByUsername } from "@/data/profiles";

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;
  return n.toString();
}

export default function PublicProfilePage() {
  const params = useParams();
  const router = useRouter();
  const username = params.username as string;

  const profile = getProfileByUsername(username);
  const posts = getPostsByUsername(username);
  const [isFollowing, setIsFollowing] = useState(profile?.isFollowing ?? false);

  if (!profile) {
    return (
      <div
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>User not found</p>
          <button
            onClick={() => router.push("/feed")}
            className="btn btn-primary"
            style={{ marginTop: 16 }}
          >
            Back to Feed
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingBottom: 100 }}>
      {/* Top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "var(--topbar-bg)",
          backdropFilter: "blur(12px)",
          boxShadow: "var(--topbar-shadow)",
        }}
      >
        <button
          onClick={() => router.back()}
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "none",
            background: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={20} style={{ color: "var(--on-surface)" }} />
        </button>
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--on-surface)",
          }}
        >
          @{profile.username}
        </span>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ padding: "24px 16px 0" }}>
        {/* Avatar + name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <Image
            src={profile.avatar}
            alt={profile.displayName}
            width={88}
            height={88}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              boxShadow: "0 0 0 3px var(--primary-alpha-25)",
            }}
            unoptimized
          />
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                fontFamily: "var(--font-manrope), Manrope, sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: "var(--on-surface)",
                margin: 0,
              }}
            >
              {profile.displayName}
            </h2>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "2px 0 0" }}>
              @{profile.username}
            </p>
          </div>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: 13,
            color: "var(--on-surface-variant)",
            textAlign: "center",
            lineHeight: 1.6,
            marginBottom: 16,
            padding: "0 8px",
          }}
        >
          {profile.bio}
        </p>

        {/* Follow button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <button
            onClick={() => setIsFollowing((prev) => !prev)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 28px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              transition: "all .2s",
              ...(isFollowing
                ? {
                    background: "var(--surface-low)",
                    color: "var(--muted)",
                  }
                : {
                    background: "var(--primary)",
                    color: "var(--on-primary)",
                  }),
            }}
          >
            {isFollowing ? (
              <>
                <UserCheck size={15} />
                Following
              </>
            ) : (
              <>
                <UserPlus size={15} />
                Follow
              </>
            )}
          </button>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            background: "var(--surface-card)",
            borderRadius: 12,
            boxShadow: "var(--shadow-card)",
            marginBottom: 24,
          }}
        >
          {[
            { label: "Posts", value: formatCount(profile.postsCount) },
            { label: "Followers", value: formatCount(profile.followersCount) },
            { label: "Following", value: formatCount(profile.followingCount) },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "14px 0",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  color: "var(--on-surface)",
                }}
              >
                {stat.value}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted)" }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ height: 16 }} />

        {/* Builds grid */}
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "var(--on-surface)",
            marginBottom: 12,
          }}
        >
          Builds
        </h3>

        {posts.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 6 }}>
            {posts.map((post) => (
              <Link key={post.id} href={`/feed/${post.id}`}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: 8,
                    overflow: "hidden",
                    aspectRatio: "1",
                  }}
                >
                  <Image
                    src={post.imageUrl ?? ""}
                    alt={post.car ? `${post.car.year} ${post.car.make} ${post.car.model}` : post.caption}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 33vw, 150px"
                    unoptimized
                  />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "48px 0",
            }}
          >
            <p style={{ fontSize: 13, color: "var(--outline)" }}>No builds yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
