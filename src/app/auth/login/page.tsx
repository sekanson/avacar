"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

interface FieldErrors {
  email?: string;
  password?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!password) next.password = "Password is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      router.push("/home");
    }, 600);
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "0 20px",
      }}
    >
      <div style={{ paddingTop: 56, paddingBottom: 40, flex: 1 }}>
        {/* Back */}
        <button
          onClick={() => router.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 28,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--muted)",
            fontSize: 14,
          }}
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
          Back
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              fontFamily: "var(--font-manrope), Manrope, sans-serif",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-0.02em",
              color: "var(--on-surface)",
              margin: 0,
            }}
          >
            Welcome back
          </h1>
          <p style={{ fontSize: 15, color: "var(--muted)", marginTop: 6 }}>
            Sign in to your account.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              className="real-input"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              style={errors.email ? { border: "none", boxShadow: "0 0 0 1.5px var(--error)" } : undefined}
              autoComplete="email"
            />
            {errors.email && (
              <span style={{ fontSize: 12, color: "var(--error)" }}>
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <input
              className="real-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              style={errors.password ? { border: "none", boxShadow: "0 0 0 1.5px var(--error)" } : undefined}
              autoComplete="current-password"
            />
            {errors.password && (
              <span style={{ fontSize: 12, color: "var(--error)" }}>
                {errors.password}
              </span>
            )}
          </div>

          {/* Forgot password */}
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -4 }}>
            <button
              type="button"
              onClick={() => router.push("/auth/forgot")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                color: "var(--primary)",
              }}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ marginTop: 4, opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Log In"}
          </button>
        </form>

        {/* Sign up link */}
        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "var(--muted)",
            marginTop: 24,
          }}
        >
          No account yet?{" "}
          <button
            onClick={() => router.push("/auth/signup")}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--primary)",
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
