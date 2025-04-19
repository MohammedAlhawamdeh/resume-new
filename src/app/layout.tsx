import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

// Load only one font with optimized settings
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  fallback: ["Arial", "Helvetica", "sans-serif"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Resume Builder",
  description: "Create an ATS-friendly resume easily",
};

// Separate viewport export as recommended by Next.js
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.variable}`}>
          <Navbar />
          <ToastProvider>{children}</ToastProvider>
        </body>
      </ClerkProvider>
    </html>
  );
}
