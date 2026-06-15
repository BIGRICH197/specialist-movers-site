// Slack Web API helpers (post messages) + inbound request signature verification.
// Plain fetch + Node crypto — no SDK. Used by the chat route (outbound) and the
// /api/slack/events webhook (inbound).

import crypto from "crypto";

const SLACK_API = "https://slack.com/api";

function botToken(): string | null {
  const t = process.env.SLACK_BOT_TOKEN?.replace(/^﻿/, "").trim();
  return t || null;
}

/** Channel to open chat threads in, e.g. "#website-chatbox". */
export function slackChannel(): string | null {
  const c = process.env.SLACK_CHANNEL?.replace(/^﻿/, "").trim();
  return c || null;
}

export function slackConfigured(): boolean {
  return botToken() !== null && slackChannel() !== null;
}

interface PostResult {
  ok: boolean;
  ts?: string;
  channel?: string;
  error?: string;
}

/**
 * Post a message to Slack. Pass threadTs to reply inside an existing thread.
 * username/iconEmoji let each message show as the customer or as Joey
 * (needs the chat:write.customize scope).
 */
export async function postSlackMessage(opts: {
  channel: string;
  text: string;
  threadTs?: string;
  username?: string;
  iconEmoji?: string;
}): Promise<PostResult> {
  const token = botToken();
  if (!token) return { ok: false, error: "no_token" };

  const body: Record<string, unknown> = {
    channel: opts.channel,
    text: opts.text,
  };
  if (opts.threadTs) body.thread_ts = opts.threadTs;
  if (opts.username) body.username = opts.username;
  if (opts.iconEmoji) body.icon_emoji = opts.iconEmoji;

  try {
    const res = await fetch(`${SLACK_API}/chat.postMessage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as PostResult;
    if (!data.ok) console.error("Slack postMessage failed:", data.error);
    return data;
  } catch (err) {
    console.error("Slack postMessage threw:", err);
    return { ok: false, error: String(err) };
  }
}

/**
 * Verify an inbound Slack request signature.
 * See https://api.slack.com/authentication/verifying-requests-from-slack
 * rawBody must be the exact, unparsed request body string.
 */
export function verifySlackSignature(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
): boolean {
  const secret = process.env.SLACK_SIGNING_SECRET?.replace(/^﻿/, "").trim();
  if (!secret || !timestamp || !signature) return false;

  // Reject requests older than 5 minutes (replay protection).
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const base = `v0:${timestamp}:${rawBody}`;
  const hmac = crypto.createHmac("sha256", secret).update(base).digest("hex");
  const expected = `v0=${hmac}`;

  // Constant-time compare.
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
