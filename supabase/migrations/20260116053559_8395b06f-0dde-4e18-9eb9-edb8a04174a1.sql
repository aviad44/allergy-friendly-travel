-- Create restaurant cache table for 7-day TTL caching
CREATE TABLE IF NOT EXISTS public.restaurant_cache (
  place_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  rating NUMERIC,
  total_ratings INTEGER,
  maps_url TEXT NOT NULL,
  types TEXT[],
  review_snippet JSONB,
  confidence_level TEXT NOT NULL,
  evidence_status TEXT NOT NULL,
  cached_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.restaurant_cache ENABLE ROW LEVEL SECURITY;

-- Allow public read/write for caching (no user data)
CREATE POLICY "Allow public read" ON public.restaurant_cache FOR SELECT USING (true);
CREATE POLICY "Allow service role write" ON public.restaurant_cache FOR ALL USING (true);

-- Index for cache cleanup
CREATE INDEX idx_restaurant_cache_cached_at ON public.restaurant_cache(cached_at);