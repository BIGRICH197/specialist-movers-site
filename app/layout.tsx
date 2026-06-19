import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";
import { AttributionTracker } from "@/components/AttributionTracker";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { brandAssets } from "@/lib/brand-assets";
import { regions } from "@/lib/regions";
import { rootOpenGraph, rootTwitter } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

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
  metadataBase: new URL(siteUrl),
  title: {
    default: "Specialist Movers Auckland & Hamilton | House & Piano",
    template: "%s | Specialist Movers Auckland & Hamilton",
  },
  description: regions.layoutDescription,
  alternates: { canonical: "/" },
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: brandAssets.logomarkPurple, type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NZ" className={`${inter.variable} ${termina.variable}`}>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
      <body className="min-h-screen bg-brand-canvas font-sans text-brand-purple">
        <LocalBusinessJsonLd />
        <AttributionTracker />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

