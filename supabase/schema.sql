-- Specialist Movers — hosted quotes + bookings store.
-- Run this once in the Supabase SQL editor (Dashboard -> SQL -> New query).
-- The website talks to these tables with the SERVICE ROLE key from the server
-- only, so Row Level Security stays ON with no public policies (default-deny).

-- ── quotes ────────────────────────────────────────────────────────────────────
create table if not exists public.quotes (
  token           text primary key,
  slug            text,
  quote_type      text,                       -- house | packing | cleaning
  status          text not null default 'sent', -- sent | accepted | callback | booked
  client_name     text,
  email           text,
  xero_quote_id   text,
  hubspot_deal_id text,
  data            jsonb not null,             -- full deck-renderable quote object
  prefill         jsonb,                      -- booking-form prefill (PII, not on the deck)
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists quotes_created_at_idx on public.quotes (created_at desc);
create index if not exists quotes_status_idx     on public.quotes (status);

-- ── bookings ──────────────────────────────────────────────────────────────────
create table if not exists public.bookings (
  token        text primary key references public.quotes(token) on delete cascade,
  client_name  text,
  email        text,
  data         jsonb not null,               -- submitted booking fields (incl. signature trail)
  submitted_at timestamptz not null default now()
);

-- ── security ──────────────────────────────────────────────────────────────────
-- RLS on, no policies = no anon/auth access. The service role key bypasses RLS,
-- which is exactly (and only) what the website server uses.
alter table public.quotes   enable row level security;
alter table public.bookings enable row level security;
