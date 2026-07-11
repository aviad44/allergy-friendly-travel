-- Applied directly via Supabase MCP during this session; recorded here for history.
ALTER TABLE public.pipeline_log DROP CONSTRAINT pipeline_log_run_type_check;
ALTER TABLE public.pipeline_log ADD CONSTRAINT pipeline_log_run_type_check
  CHECK (run_type = ANY (ARRAY['hotel_discovery'::text, 'content_generation'::text, 'keyword_update'::text, 'social_post'::text]));
