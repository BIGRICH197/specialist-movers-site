// Thin wrapper over the Supabase REST API (PostgREST), same plain-fetch style as
// lib/kv.ts — no SDK to install. Server-only: uses the SERVICE ROLE key, which
// must NEVER reach the browser. Env: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// (SUPABASE_SERVICE_KEY also accepted).
//
// This is the "proper" quote store that replaces KV: a real DB the Taine portal
// and the future scheduler can list/query. Quote storage falls back to KV when
// Supabase is not configured, so the site keeps working until creds are set.

function creds(): { url: string; key: string } | null {
  const url = process.env.SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ""), key };
}

/** True when Supabase is configured. Callers fall back to KV when false. */
export function supabaseConfigured(): boolean {
  return creds() !== null;
}

type SbOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  /** Extra PostgREST Prefer header value, e.g. "resolution=merge-duplicates". */
  prefer?: string;
};

/**
 * Make a PostgREST request. `path` is everything after /rest/v1/, e.g.
 * "quotes?token=eq.abc&select=*". Returns parsed JSON (array for selects) or
 * null on empty body. Throws on HTTP error.
 */
export async function sb<T = unknown>(
  path: string,
  opts: SbOptions = {},
): Promise<T> {
  const c = creds();
  if (!c) throw new Error("Supabase not configured");
  const prefer = [opts.prefer, "return=representation"].filter(Boolean).join(",");
  const res = await fetch(`${c.url}/rest/v1/${path}`, {
    method: opts.method ?? "GET",
    headers: {
      apikey: c.key,
      Authorization: `Bearer ${c.key}`,
      "Content-Type": "application/json",
      Prefer: prefer,
    },
    body: opts.body != null ? JSON.stringify(opts.body) : undefined,
    cache: "no-store",
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Supabase ${res.status}: ${txt.slice(0, 300)}`);
  }
  const txt = await res.text();
  return (txt ? JSON.parse(txt) : null) as T;
}
