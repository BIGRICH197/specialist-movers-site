import { postSlackMessage } from "@/lib/slack";

// Slack notifications for the quote/booking flow. Reuses the site's Slack bot.
// Three separate channels, three purposes:
//   #website-chatbox  (SLACK_CHANNEL)          — live Joey chat only
//   #quotes           (SLACK_QUOTES_CHANNEL)   — someone accepted a quote
//   #book             (SLACK_BOOKINGS_CHANNEL) — someone completed the booking link
// Each falls back to SLACK_CHANNEL if its own var is unset, so a ping is never
// silently dropped — but the split only works once the two vars are set.

function clean(v: string | undefined): string {
  return (v || "").replace(/^﻿/, "").trim();
}

export function bookingsChannel(): string | null {
  return clean(process.env.SLACK_BOOKINGS_CHANNEL) || clean(process.env.SLACK_CHANNEL) || null;
}

export function quotesChannel(): string | null {
  return clean(process.env.SLACK_QUOTES_CHANNEL) || clean(process.env.SLACK_CHANNEL) || null;
}

/** Fire-and-forget Slack ping to the #book channel (booking completed). */
export async function pingBookings(text: string): Promise<void> {
  const channel = bookingsChannel();
  if (!channel) {
    console.warn("pingBookings: no Slack channel configured (SLACK_BOOKINGS_CHANNEL/SLACK_CHANNEL)");
    return;
  }
  const r = await postSlackMessage({ channel, text, username: "Bookings", iconEmoji: ":package:" });
  if (!r.ok) console.warn(`pingBookings: Slack post failed (${r.error}) to ${channel}`);
}

/** Fire-and-forget Slack ping to the #quotes channel (quote accepted). */
export async function pingQuotes(text: string): Promise<void> {
  const channel = quotesChannel();
  if (!channel) {
    console.warn("pingQuotes: no Slack channel configured (SLACK_QUOTES_CHANNEL/SLACK_CHANNEL)");
    return;
  }
  const r = await postSlackMessage({ channel, text, username: "Quotes", iconEmoji: ":white_check_mark:" });
  if (!r.ok) console.warn(`pingQuotes: Slack post failed (${r.error}) to ${channel}`);
}

/** Canonical public URL for a stored quote. */
export function quoteUrl(slug: string, token: string): string {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.specialistmovers.co.nz")
    .replace(/\/$/, "");
  return `${base}/quote/${slug}-${token}`;
}
