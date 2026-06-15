// Thin wrapper over the Upstash Redis REST API (https://upstash.com/docs/redis/features/restapi).
// We talk to it with plain fetch — same style as lib/hubspot.ts — so there is no SDK to install.
// Env vars are injected by the Vercel "Upstash" / "KV" marketplace integration as
// KV_REST_API_URL / KV_REST_API_TOKEN. Standalone Upstash names them UPSTASH_REDIS_REST_*;
// we accept either.

function creds(): { url: string; token: string } | null {
  const url =
    process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token =
    process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ""), token };
}

/** True when a Redis store is configured. Lets callers degrade gracefully. */
export function kvConfigured(): boolean {
  return creds() !== null;
}

async function command(args: (string | number)[]): Promise<unknown> {
  const c = creds();
  if (!c) throw new Error("KV (Upstash Redis) not configured");
  const res = await fetch(c.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${c.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(args),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Upstash error ${res.status}: ${body}`);
  }
  const data = (await res.json()) as { result?: unknown; error?: string };
  if (data.error) throw new Error(`Upstash command error: ${data.error}`);
  return data.result;
}

/** Read a JSON value by key. Returns null if missing or store not configured. */
export async function kvGetJson<T>(key: string): Promise<T | null> {
  if (!kvConfigured()) return null;
  const raw = (await command(["GET", key])) as string | null;
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/** Write a JSON value with an expiry (seconds). No-ops if store not configured. */
export async function kvSetJson(
  key: string,
  value: unknown,
  ttlSeconds = 86_400,
): Promise<void> {
  if (!kvConfigured()) return;
  await command(["SET", key, JSON.stringify(value), "EX", ttlSeconds]);
}

/** Set a key only if it does not exist (used for event dedup). Returns true if set. */
export async function kvSetIfAbsent(
  key: string,
  ttlSeconds = 600,
): Promise<boolean> {
  if (!kvConfigured()) return true; // can't dedup without a store; allow through
  const res = (await command(["SET", key, "1", "NX", "EX", ttlSeconds])) as
    | string
    | null;
  return res === "OK";
}
