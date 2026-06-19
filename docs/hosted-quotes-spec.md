# Hosted quote links — build spec

Turn a quote (built by Joey, or anyone) into a **private, branded, 14-day quote page**
hosted on the main website. A unique link is handed to the client; after 14 days it
expires on its own.

**Status:** spec / not yet built.
**Repo:** `specialist-movers-site` (this repo — `specialist-movers1` on the Desktop).
**Author of spec:** Claude session, 2026-06-19, from Richard's brief.

---

## 1. The decision (settled)

- **Hosted on the main website**, not a subdomain or separate app. Client sees
  `specialistmovers.co.nz/quote/...` — on-brand, on-domain, maximum trust.
- **Store = the existing Vercel KV / Upstash Redis** (`lib/kv.ts`). **Not Supabase.**
  KV already gives us key→JSON with a built-in **TTL**, so the 14-day expiry is free and
  automatic — no cron, no cleanup job, no extra service to stand up. Supabase would be
  more work and worse for this exact job (no native TTL).
- **URL = readable slug + short random token**, e.g.
  `…/quote/whakapono-nepata-tuake-moving-7f3a9c2e`. Readable for humans, unguessable for
  privacy, collision-proof for clients with multiple quotes.
- **No hard expiry — "14 days" is an urgency device, not a cutoff** (Richard, 2026-06-19).
  The link keeps working well past 14 days; the page just *displays* "Valid for 14 days" to
  nudge the client. KV TTL is set long (≈365 days) purely for eventual storage hygiene, not
  to lock the quote. Trade-off accepted: a client could return after 14 days expecting the
  old price — Taine handles that case-by-case. No data-volume concern; records are tiny.

## 2. What already exists (REUSE — do not rebuild)

| Piece | Where | Use for |
|---|---|---|
| KV store with TTL | `lib/kv.ts` — `kvSetJson(key, value, ttlSeconds)`, `kvGetJson(key)` | Storing each quote under `quote:<token>` with a 14-day TTL |
| Pricing engine (Hamilton-aware) | `lib/pricing.ts` — `calculateHouseMove`, `calculatePianoMove`, `detectQuoteBranch`, `needsManualQuote` | Branch detection + canonical maths. **Note:** this already knows Hamilton, which the Python `quote_create.py` flow did not. |
| Price display helpers | `lib/quote-display.ts` (`quotePriceRange`) | Formatting |
| Public quote API (lead capture) | `app/api/quote/route.ts` | Different concern (website form → HubSpot deal). Don't overload it — add a new endpoint for hosted quotes. |
| Slack / Claude on the site | `app/api/slack`, `app/api/chat`, `lib/slack.ts`, `lib/joey-system-prompt.ts` | Joey already lives here if we want server-side Joey calls |
| PDF tooling | `puppeteer`, `pdf-lib` (devDeps) | Optional "Download PDF" button later |

## 3. What's NEW (BUILD)

1. **Port the branded proposal deck** from the standalone `specialist-movers-simon-james`
   repo into this site (the components + `lib/house-move-quote.ts`, add-on logic,
   inclusions). `app/simon-james/` here is currently empty. This becomes the renderer for
   the quote page.
2. **`POST /api/quotes`** — create/update a hosted quote (secret-protected).
3. **`app/quote/[token]/page.tsx`** — the public, server-rendered quote page.
4. **Joey tool `create_quote_link`** — calls `POST /api/quotes`, returns the URL to Slack.

---

## 4. Data model

One **rich quote object** is the source of truth. It is computed once (numbers finalised
before storage — see §8) and stored verbatim; the page only *displays* it, never recomputes.

KV key: `quote:<token>`
KV value (JSON):

```jsonc
{
  "token": "7f3a9c2e...",            // also in the URL
  "slug": "whakapono-nepata-tuake-moving",
  "quoteType": "house" | "packing" | "cleaning",
  "client": {
    "name": "Whakapono Nepata-Tuake",
    "email": "info@kapehu.co.nz",
    "phone": "021 278 7857"
  },
  "pickup":   { "line1": "191 Millwater Parkway", "suburb": "Silverdale" },
  "delivery": { "line1": "350 Whitehills Road",  "suburb": "Dairy Flat" },
  "moveDate": "Friday 26 June 2026",
  "lineItems": [
    { "description": "Call out fee (2 trucks)", "amountExclGst": 160, "quantity": 2, "unitPriceExclGst": 80 },
    { "description": "Fuel surcharge", "amountExclGst": 25 },
    { "description": "Labour — 3 movers", "hours": 7.5, "hourlyRateExclGst": 190, "amountExclGst": 1425 }
  ],
  "includedAddOns": ["packing", "cleaning"],
  "excludedAddOns": [],
  "terms": "This house-moving quote is an estimate based on hourly rates...",
  "validFor": "14 days",
  "xeroQuoteId": "QU-0110",          // link back to billing, optional
  "createdAt": "2026-06-19T21:00:00Z",
  "expiresAt": "2026-07-03T21:00:00Z"
}
```

This is the same object shape used by the standalone deck (`lib/house-move-quote.ts`),
extended with `client`, `token`, `slug`, `quoteType`, `terms`, `xeroQuoteId`, and timestamps.
GST is computed for display at 15% (deck already does this); line amounts are excl. GST.

---

## 5. URL scheme

```
https://specialistmovers.co.nz/quote/<slug>-<token>
```

- `slug` = kebab-cased `client name + service`, ASCII-folded (macrons/apostrophes stripped),
  truncated to ~50 chars. Cosmetic only.
- `token` = 16+ random hex/base62 chars (e.g. `crypto.randomUUID()` minus dashes, or
  `crypto.randomBytes(12).toString("hex")`). **This is the security boundary** — long enough
  to be unguessable.
- The route param is the whole tail; we split on the last `-` to recover the token, OR
  (simpler) store under `quote:<token>` and ignore the slug for lookup.

---

## 6. Endpoints

### `POST /api/quotes` — create or update
- **Auth:** header `x-quote-secret: <QUOTE_API_SECRET>` (env var). Reject otherwise. This is
  how Joey (and only Joey) is allowed to create quotes.
- **Body:** the rich quote object (without `token`/`createdAt`/`expiresAt` on create).
- **On create:** generate `token` + `slug`, set `createdAt`/`expiresAt` (now + 14d),
  `kvSetJson("quote:"+token, obj, 14*86400)`, return `{ url, token, expiresAt }`.
- **On update:** if a `token` is supplied, overwrite the same key (re-set with a fresh TTL,
  or preserve original `expiresAt` — decide; preserving original is more honest to "valid 14
  days from issue"). This is what makes Taine's edits painless — same link, updated content,
  **no delete-and-recreate.**

### `GET` — none needed
The page reads KV directly server-side (§7). No public GET API → nothing to enumerate.

### Optional later: `POST /api/quotes/[token]/pdf`
Render the page to PDF with the already-present `puppeteer` for a "Download PDF" button.

---

## 7. The quote page — `app/quote/[token]/page.tsx`

- **Server component.** Extracts token from the param, calls
  `kvGetJson<QuoteObject>("quote:"+token)` **server-side** (KV creds stay on the server —
  the browser never sees them, so the table can't be enumerated).
- **Missing key →** render a "quote not found — contact us" page (bad link, or the long
  ≈365-day TTL eventually lapsed). This is NOT the 14-day mark — quotes stay live past 14 days.
- **Found →** render the branded deck (ported component) from the stored object.
- **Optional:** on first view, stamp `openedAt` (sales signal) via a fire-and-forget update.
- `export const dynamic = "force-dynamic"` (or `revalidate = 0`) so it always reads live KV.

---

## 8. Pricing source-of-truth (important)

There are **two** pricing engines: the website's `lib/pricing.ts` (TypeScript, Hamilton-aware)
and Joey's Python `quote_create.py` / `pricing.py`. To avoid drift, the **numbers are
finalised before the object is stored**, and the page never recomputes — it displays the
stored `lineItems`/amounts exactly. Whoever builds the quote (Joey, or a future website flow)
owns the maths; the hosted page is pure presentation. This keeps the hosted quote consistent
with the matching Xero quote.

## 9. Joey integration

New Joey tool **`create_quote_link`**:
- Input: the rich quote object Joey already assembles for Xero.
- Action: `POST https://specialistmovers.co.nz/api/quotes` with `x-quote-secret`.
- Output: posts the returned URL into Slack for Taine.
- Editing: re-call with the existing `token` → same link updates. (Xero update/delete is a
  separate fix on the billing side — see the Joey quoting overhaul.)

This **removes the headless-Chrome-on-the-mini-PC** problem entirely: Joey makes one HTTPS
call; the client opens a web page. PDF stays optional.

## 10. Env / config
- `QUOTE_API_SECRET` — shared secret for `POST /api/quotes` (add to Vercel + Joey's env).
- KV vars already present (`KV_REST_API_URL`, `KV_REST_API_TOKEN`).

## 11. Build order
1. Port the deck renderer from `specialist-movers-simon-james` into `components/` + `lib/`.
2. `app/quote/[token]/page.tsx` reading KV, with expired-state.
3. `POST /api/quotes` (create + update, secret-gated).
4. Slug+token + `QUOTE_API_SECRET` wiring; deploy; test with a hand-POSTed quote.
5. Joey `create_quote_link` tool.
6. (Later) PDF download button via puppeteer; `openedAt` view tracking.

## 12. Decisions & open questions
- **Expiry — DECIDED (2026-06-19):** no hard expiry. Link stays live; "Valid for 14 days" is
  displayed for urgency only. KV TTL ≈365 days for hygiene. Edits don't reset anything.
- **Open — multi-service jobs** (Whakapono had packing + moving + cleaning): **one combined
  quote page, or one link per service?** (Recommend: one page, sections per service; Xero
  still holds separate quotes behind it.)
