-- Applied directly via Supabase MCP during this session; recorded here for history.
ALTER TABLE public.hotel_allergy_info
  ADD CONSTRAINT hotel_allergy_info_hotel_allergen_uniq UNIQUE (hotel_id, allergen_type);
