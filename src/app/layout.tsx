import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastContext";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${inter.variable}`}>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
