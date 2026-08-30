create table if not exists tripadvisor_cache (
  id uuid primary key default gen_random_uuid(),
  place_key text unique not null,
  name text not null,
  category text not null,
  tripadvisor_location_id bigint,
  rating numeric,
  review_count integer,
  tripadvisor_url text,
  reviews jsonb,
  found boolean not null default true,
  fetched_at timestamptz not null default now()
);
create index if not exists idx_tripadvisor_cache_fetched_at on tripadvisor_cache(fetched_at);
