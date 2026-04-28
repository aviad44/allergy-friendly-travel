-- Enable RLS on all public tables currently reported without it
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_allergy_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotel_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pipeline_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_keywords ENABLE ROW LEVEL SECURITY;

-- Remove overly permissive or anonymous write policies
DROP POLICY IF EXISTS "Allow service role write" ON public.restaurant_cache;
DROP POLICY IF EXISTS "Anyone can create reviews" ON public.reviews;

-- Recreate public read policies with published/active-only guards
DROP POLICY IF EXISTS "Public can read active hotels" ON public.hotels;
CREATE POLICY "Public can read active hotels"
ON public.hotels
FOR SELECT
TO anon, authenticated
USING (active IS TRUE);

DROP POLICY IF EXISTS "Public can read allergy info for active hotels" ON public.hotel_allergy_info;
CREATE POLICY "Public can read allergy info for active hotels"
ON public.hotel_allergy_info
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.hotels h
    WHERE h.id = hotel_allergy_info.hotel_id
      AND h.active IS TRUE
  )
);

DROP POLICY IF EXISTS "Public can read published SEO articles" ON public.seo_articles;
CREATE POLICY "Public can read published SEO articles"
ON public.seo_articles
FOR SELECT
TO anon, authenticated
USING (status = 'published');

-- Keep existing public read access for non-sensitive public result/review content,
-- but do not allow anonymous writes.
DROP POLICY IF EXISTS "Authenticated users can create their own reviews" ON public.reviews;
CREATE POLICY "Authenticated users can create their own reviews"
ON public.reviews
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Explicitly remove direct browser privileges for internal/admin tables and browser writes.
REVOKE ALL ON TABLE public.hotel_sources FROM anon, authenticated;
REVOKE ALL ON TABLE public.pipeline_log FROM anon, authenticated;
REVOKE ALL ON TABLE public.seo_keywords FROM anon, authenticated;
REVOKE ALL ON TABLE public.search_cache FROM anon, authenticated;
REVOKE ALL ON TABLE public.search_log FROM anon, authenticated;

REVOKE INSERT, UPDATE, DELETE ON TABLE public.hotels FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.hotel_allergy_info FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.seo_articles FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.restaurant_cache FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.reviews FROM anon;
REVOKE UPDATE, DELETE ON TABLE public.reviews FROM anon, authenticated;

-- Keep direct reads only where policies allow public website content.
GRANT SELECT ON TABLE public.hotels TO anon, authenticated;
GRANT SELECT ON TABLE public.hotel_allergy_info TO anon, authenticated;
GRANT SELECT ON TABLE public.seo_articles TO anon, authenticated;
GRANT SELECT ON TABLE public.restaurant_cache TO anon, authenticated;
GRANT SELECT ON TABLE public.reviews TO anon, authenticated;
GRANT INSERT ON TABLE public.reviews TO authenticated;

-- Harden SECURITY DEFINER helper functions from direct browser execution.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Fix mutable search_path warning for the remaining helper function.
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;