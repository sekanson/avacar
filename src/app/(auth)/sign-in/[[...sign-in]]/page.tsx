import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="w-full max-w-md">
      {/* AVACAR logo */}
      <div className="text-center mb-8">
        <h1 className="font-display text-display-md font-black text-white">
          AVAC<span className="text-cyan">AR</span>
        </h1>
        <p className="text-body-sm text-text-secondary mt-1">Welcome back</p>
      </div>

      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        forceRedirectUrl="/feed"
      />
    </div>
  );
}
