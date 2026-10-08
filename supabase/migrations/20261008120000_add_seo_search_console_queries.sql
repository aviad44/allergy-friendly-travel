-- Query-level Search Console snapshots (gsc-report), so we can see which
-- search terms (e.g. gluten/celiac) actually drive impressions, not just
-- which pages. RLS enabled at creation with no policies: only the service
-- role (edge functions) reads/writes this table; anon/authenticated get none.
create table if not exists public.seo_search_console_queries (
  id uuid primary key default gen_random_uuid(),
  query text not null,
  period_start date not null,
  period_end date not null,
  clicks integer not null default 0,
  impressions integer not null default 0,
  ctr numeric,
  position numeric,
  fetched_at timestamptz not null default now(),
  unique (query, period_start, period_end)
);
alter table public.seo_search_console_queries enable row level security;
