import type { Metadata } from "next";
import type { Viewport } from "next";
import "./deck.css";

export const metadata: Metadata = {
  title: "Simon James - Delivery proposal",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function SimonJamesDeckLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
