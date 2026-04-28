-- Remove all direct browser mutation/admin table privileges across public tables.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
ON ALL TABLES IN SCHEMA public
FROM anon, authenticated;

-- Grant only read access required for public website content; RLS policies still filter rows.
GRANT SELECT ON TABLE public.hotels TO anon, authenticated;
GRANT SELECT ON TABLE public.hotel_allergy_info TO anon, authenticated;
GRANT SELECT ON TABLE public.seo_articles TO anon, authenticated;
GRANT SELECT ON TABLE public.restaurant_cache TO anon, authenticated;
GRANT SELECT ON TABLE public.reviews TO anon, authenticated;

-- Authenticated-only user actions, guarded by RLS policies.
GRANT INSERT ON TABLE public.reviews TO authenticated;
GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;

-- Ensure internal/admin tables remain without browser access.
REVOKE ALL ON TABLE public.hotel_sources FROM anon, authenticated;
REVOKE ALL ON TABLE public.pipeline_log FROM anon, authenticated;
REVOKE ALL ON TABLE public.seo_keywords FROM anon, authenticated;
REVOKE ALL ON TABLE public.search_cache FROM anon, authenticated;
REVOKE ALL ON TABLE public.search_log FROM anon, authenticated;