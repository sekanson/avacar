"use client";

import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* AVACAR logo */}
        <div className="text-center mb-8">
          <h1 className="font-display text-display-md font-black text-white">
            AVAC<span className="text-cyan">AR</span>
          </h1>
          <p className="text-body-sm text-text-secondary mt-1">Welcome back</p>
        </div>

        <button
          onClick={() => router.push("/feed")}
          className="w-full h-14 rounded-button bg-cyan text-background font-display font-bold text-body-lg transition-all active:scale-95"
        >
          Continue to App
        </button>
      </div>
    </div>
  );
}
