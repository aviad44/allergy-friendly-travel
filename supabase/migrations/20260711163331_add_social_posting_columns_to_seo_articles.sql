-- Applied directly via Supabase MCP during this session; recorded here for history.
ALTER TABLE public.seo_articles
  ADD COLUMN IF NOT EXISTS hero_image_url text,
  ADD COLUMN IF NOT EXISTS hero_image_credit text,
  ADD COLUMN IF NOT EXISTS posted_to_facebook_at timestamptz,
  ADD COLUMN IF NOT EXISTS posted_to_instagram_at timestamptz;
