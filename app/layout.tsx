import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { brandAssets } from "@/lib/brand-assets";
import { regions } from "@/lib/regions";

const inter = localFont({
  src: "./fonts/Inter_18pt-Light.ttf",
  variable: "--font-inter",
  display: "swap",
});

const termina = localFont({
  src: "./fonts/TerminaTest-Bold.otf",
  variable: "--font-termina",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Specialist Movers NZ | Auckland & Waikato Movers",
    template: "%s | Specialist Movers NZ",
  },
  description: regions.layoutDescription,
  icons: {
    icon: [{ url: brandAssets.logomarkPurple, type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${termina.variable}`}>
      <body className="min-h-screen bg-brand-canvas font-sans text-brand-purple">
        <LocalBusinessJsonLd />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

