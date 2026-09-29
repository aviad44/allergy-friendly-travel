-- Google Place ID per restaurant: the only Places content Google's terms
-- allow storing indefinitely. Used by the article-hero-photo Edge Function to
-- fetch a live (never stored) photo of a reviewed restaurant for its guide's
-- hero image. restaurants already has RLS enabled (public read of active
-- rows only); place IDs are public identifiers, so no policy change needed.
alter table public.restaurants add column if not exists google_place_id text;
