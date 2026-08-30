-- Applied directly via Supabase MCP during this session; recorded here for history.
ALTER TABLE public.seo_articles
  ADD COLUMN IF NOT EXISTS posted_to_pinterest_at timestamptz;
