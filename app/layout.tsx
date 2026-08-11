import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import "./globals.css";
import { AttributionTracker } from "@/components/AttributionTracker";
import { DeferredGoogleTagManager } from "@/components/DeferredGoogleTagManager";
import { SiteChrome } from "@/components/SiteChrome";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { brandAssets } from "@/lib/brand-assets";
import { regions } from "@/lib/regions";
import { rootOpenGraph, rootTwitter } from "@/lib/seo";
import { siteUrl } from "@/lib/site-config";

// Keep `preload` on. Dropping it does not take these off the critical path — the
// fonts just get discovered from the stylesheet instead, which chains them behind
// it (document -> CSS -> font, 462ms critical path) and is measurably worse.
const inter = localFont({
  src: [
    { path: "./fonts/Inter_18pt-Light.woff2", weight: "300", style: "normal" },
    { path: "./fonts/Inter_18pt-SemiBold.woff2", weight: "600", style: "normal" },
  ],
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
    default: "Movers Auckland - Auckland Moving Company | Specialist Movers",
    template: "%s | Specialist Movers Auckland & Hamilton",
  },
  description: regions.layoutDescription,
  alternates: { canonical: "/" },
  openGraph: rootOpenGraph,
  twitter: rootTwitter,
  verification: {
    google: "XVVBEEWZZtmWR0hV_ScfKp9DgNhjvcAVN__Hppk62jk",
    other: {
      "msvalidate.01": "2E4ABAAC12BF5DE4D4554933FB7B09F4",
    },
  },
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
      <head>
        {/*
          preconnect to cdn.trustindex.io and lh3.googleusercontent.com was
          removed 2026-08-07: Lighthouse reported both as "Unused preconnect"
          because neither origin is requested during initial load — the review
          widget and its avatars are injected later. An unused preconnect costs
          a wasted connection. dns-prefetch is kept: it is far cheaper and still
          warms resolution for when those requests do happen.
        */}
        <link rel="dns-prefetch" href="https://cdn.trustindex.io" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        {/*
          public/llms.txt was already being served but nothing pointed at it,
          so the audit reported "no llms.txt reference found". llmstxt.org is
          an emerging convention rather than a supported standard, so this is
          cheap insurance, not a guarantee of pickup.

          Deliberately NOT using rel="alternate" for /llms-full.txt here:
          this is the root layout, so it would render on every page and claim
          a plain-text alternate representation of each one. That is false for
          ~100 pages and risks confusing canonicalisation. llms.txt already
          points at the full file.
        */}
        <link rel="llms" href="/llms.txt" />
      </head>
      {gtmId ? <DeferredGoogleTagManager gtmId={gtmId} /> : null}
      <body className="min-h-screen bg-brand-canvas font-sans text-brand-purple">
        <LocalBusinessJsonLd />
        <AttributionTracker />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}

