
-- Search-level cache: stores full search results for 14 days
CREATE TABLE IF NOT EXISTS public.search_cache (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  destination_normalized TEXT NOT NULL,
  allergies_normalized TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'en',
  mode TEXT NOT NULL DEFAULT 'fast',
  results_json JSONB NOT NULL,
  google_calls_count INTEGER NOT NULL DEFAULT 0,
  results_returned INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Unique constraint for cache lookups
CREATE UNIQUE INDEX IF NOT EXISTS idx_search_cache_lookup 
  ON public.search_cache (destination_normalized, allergies_normalized, language, mode);

-- Index for TTL cleanup
CREATE INDEX IF NOT EXISTS idx_search_cache_created_at ON public.search_cache (created_at);

-- Enable RLS - no direct client access
ALTER TABLE public.search_cache ENABLE ROW LEVEL SECURITY;

-- Revoke all direct access from client roles
REVOKE ALL ON TABLE public.search_cache FROM anon;
REVOKE ALL ON TABLE public.search_cache FROM authenticated;

-- Search log table for cost monitoring
CREATE TABLE IF NOT EXISTS public.search_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  search_id TEXT NOT NULL,
  destination TEXT NOT NULL,
  allergies TEXT[] NOT NULL DEFAULT '{}',
  mode TEXT NOT NULL DEFAULT 'fast',
  google_calls_count INTEGER NOT NULL DEFAULT 0,
  results_returned INTEGER NOT NULL DEFAULT 0,
  cache_hit BOOLEAN NOT NULL DEFAULT false,
  duration_ms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.search_log ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.search_log FROM anon;
REVOKE ALL ON TABLE public.search_log FROM authenticated;
