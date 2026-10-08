-- Gluten-first titles/meta descriptions for the six cities with both deep
-- gluten evidence and observed Search Console impressions. Slugs are NOT
-- changed (no redirects needed, ranking history kept). Counts come from
-- hotel_allergy_info / restaurant_allergy_info (allergen_type = 'gluten')
-- on 2026-10-08; they are phrased "X of Y" because each article also lists a
-- few places without gluten-specific evidence.
--
-- Previous values (for rollback):
--   gluten-free-eating-in-rome: "Eating Gluten-Free in Rome: A Guide for Food Allergies" /
--     "Explore Rome's best gluten-free restaurants, perfect for food allergies. Enjoy delicious cuisine tailored for your dietary needs."
--   rome: "Rome Hotels for Food Allergies: 10 Hotels Reviewed" /
--     "10 Rome hotels reviewed for genuine food-allergy care — real guest reviews, not marketing copy, on gluten-free and allergy-aware service."
--   food-allergy-osaka-guide: "Food Allergy Travel Guide: Discover Osaka's Safe Dining Options" /
--     "Explore Osaka's inclusive dining scene for gluten-free and vegan options. Safe choices for food allergies await at these recommended restaurants."
--   athens: "Best Allergy-Friendly Dining in Athens: A Traveler's Guide" /
--     "Discover allergy-friendly dining in Athens, featuring gluten-free and vegan options. Explore local spots and find safe meals for your dietary needs."
--   budapest-allergy-friendly-restaurants: "Explore Budapest's Best Allergy-Friendly Restaurants" /
--     "Discover top allergy-friendly restaurants in Budapest, featuring gluten-free and lactose-free options for safe dining."
--   san-francisco-food-allergies: "Top Restaurants in San Francisco for Food Allergies and Intolerances" /
--     "Explore San Francisco's best restaurants offering gluten free, dairy free, and vegan options for food allergies and dietary restrictions."

update public.seo_articles set
  title = 'Gluten-Free Restaurants in Rome: A Celiac Traveler''s Guide',
  meta_description = '40 of 44 Rome restaurants here have real guest reviews mentioning gluten-free dining — what diners actually said, not marketing claims.'
where slug = 'gluten-free-eating-in-rome' and status = 'published';

update public.seo_articles set
  title = 'Gluten-Free & Food Allergy Hotels in Rome: Guest-Reviewed',
  meta_description = '9 of 10 Rome hotels here have real guest reviews mentioning gluten-free service — real reviews, not marketing copy.'
where slug = 'rome' and status = 'published';

update public.seo_articles set
  title = 'Gluten-Free Restaurants in Osaka: A Traveler''s Guide',
  meta_description = '18 of 22 Osaka restaurants here have real guest reviews mentioning gluten-free dining, for celiac and food-allergy travelers.'
where slug = 'food-allergy-osaka-guide' and status = 'published';

update public.seo_articles set
  title = 'Gluten-Free Restaurants in Athens: A Traveler''s Guide',
  meta_description = '13 of 19 Athens restaurants here have real guest reviews mentioning gluten-free dining — what diners actually said.'
where slug = 'athens' and status = 'published';

update public.seo_articles set
  title = 'Gluten-Free Restaurants in Budapest: A Traveler''s Guide',
  meta_description = '8 of 11 Budapest restaurants here have real guest reviews mentioning gluten-free dining — what diners actually said.'
where slug = 'budapest-allergy-friendly-restaurants' and status = 'published';

update public.seo_articles set
  title = 'Gluten-Free Restaurants in San Francisco: A Traveler''s Guide',
  meta_description = '11 of 17 San Francisco restaurants here have real guest reviews mentioning gluten-free dining — what diners actually said.'
where slug = 'san-francisco-food-allergies' and status = 'published';
