DROP POLICY IF EXISTS "No direct browser access" ON public.hotel_sources;
CREATE POLICY "No direct browser access"
ON public.hotel_sources
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No direct browser access" ON public.pipeline_log;
CREATE POLICY "No direct browser access"
ON public.pipeline_log
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No direct browser access" ON public.seo_keywords;
CREATE POLICY "No direct browser access"
ON public.seo_keywords
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No direct browser access" ON public.search_cache;
CREATE POLICY "No direct browser access"
ON public.search_cache
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);

DROP POLICY IF EXISTS "No direct browser access" ON public.search_log;
CREATE POLICY "No direct browser access"
ON public.search_log
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);