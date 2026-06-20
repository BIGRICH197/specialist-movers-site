import { postSlackMessage } from "@/lib/slack";

// Slack notifications for the quote/booking flow. Reuses the site's Slack bot.
// Posts to SLACK_BOOKINGS_CHANNEL if set, else falls back to SLACK_CHANNEL.

export function bookingsChannel(): string | null {
  const c = (process.env.SLACK_BOOKINGS_CHANNEL || process.env.SLACK_CHANNEL || "")
    .replace(/^﻿/, "")
    .trim();
  return c || null;
}

/** Fire-and-forget Slack ping to the bookings channel. No-op if unconfigured. */
export async function pingBookings(text: string): Promise<void> {
  const channel = bookingsChannel();
  if (!channel) return;
  await postSlackMessage({ channel, text, username: "Quotes", iconEmoji: ":package:" });
}

/** Canonical public URL for a stored quote. */
export function quoteUrl(slug: string, token: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.specialistmovers.co.nz")
    .replace(/\/$/, "");
  return `${base}/quote/${slug}-${token}`;
}
