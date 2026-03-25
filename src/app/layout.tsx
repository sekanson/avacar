import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";

export const metadata: Metadata = {
  title: "AVACAR — Customize Your Car",
  description: "AI-powered car customization platform. Wraps, wheels, tint, PPF, body kits — visualize it, price it, book it.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "AVACAR",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0C0C10",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#44CCFF",
          colorBackground: "#14141A",
          colorInputBackground: "#1C1C24",
          colorText: "#FFFFFF",
          colorTextSecondary: "#A0A0B0",
          borderRadius: "0.75rem",
        },
      }}
    >
      <html lang="en">
        <body className="bg-background text-text-primary font-body antialiased">
          <QueryProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
