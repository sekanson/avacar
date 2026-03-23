"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 800);
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
          onClick={() => router.push("/auth/login")}
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
          aria-label="Back to login"
        >
          <ChevronLeft size={20} />
          Back to login
        </button>

        {!sent ? (
          <div>
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
                Reset password
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  marginTop: 6,
                  lineHeight: 1.55,
                }}
              >
                Enter your email and we&apos;ll send you a link to reset your
                password.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <input
                  className="real-input"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(null);
                  }}
                  style={emailError ? { border: "none", boxShadow: "0 0 0 1.5px var(--error)" } : undefined}
                  autoComplete="email"
                />
                {emailError && (
                  <span style={{ fontSize: 12, color: "var(--error)" }}>
                    {emailError}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ marginTop: 8, opacity: loading ? 0.7 : 1 }}
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </div>
        ) : (
          /* Success state */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              paddingTop: 40,
              gap: 20,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--success-alpha-10)",
                boxShadow: "0 0 0 1.5px var(--success-alpha-25)",
              }}
            >
              <CheckCircle size={36} style={{ color: "var(--success)" }} strokeWidth={1.8} />
            </div>

            <div>
              <h2
                style={{
                  fontFamily: "var(--font-manrope), Manrope, sans-serif",
                  fontWeight: 700,
                  fontSize: 22,
                  color: "var(--on-surface)",
                  margin: "0 0 8px",
                }}
              >
                Check your email
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "var(--muted)",
                  lineHeight: 1.55,
                  maxWidth: 280,
                  margin: "0 auto",
                }}
              >
                We sent a reset link to{" "}
                <span style={{ color: "var(--on-surface-variant)" }}>{email}</span>.
                Check your inbox and follow the instructions.
              </p>
            </div>

            <button
              onClick={() => router.push("/auth/login")}
              className="btn btn-outline"
              style={{ marginTop: 12 }}
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
