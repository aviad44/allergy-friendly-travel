
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { supabase } from '@/integrations/supabase/client';
import { markPrerenderNotReady, markPrerenderReady } from '@/utils/prerenderReady';

interface HubItem {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  path: string;
}

const BASE_URL = 'https://www.allergy-free-travel.com';

// Every hotel/restaurant article is written from whatever real evidence
// content-pipeline/discover-city found for that destination — allergen type
// isn't a filter on which articles get written, so there's no dedicated
// "gluten-free" content bucket anywhere else on the site. This page doesn't
// generate anything new: it queries the same hotel_allergy_info/
// restaurant_allergy_info rows every hotel/restaurant card already uses
// (allergen_type = 'gluten', real evidence, already live on each linked
// article) and surfaces which already-published articles actually have
// gluten-specific evidence, so a celiac/gluten-free traveler doesn't have to
// guess which of the 100+ destination guides are relevant to them. Self-
// updating: a city gains an entry here the moment content-pipeline adds a
// gluten-relevant hotel/restaurant to it, no manual curation.
async function fetchGlutenFreeArticles(): Promise<{ hotels: HubItem[]; restaurants: HubItem[] }> {
  const [hotelInfoRes, restaurantInfoRes] = await Promise.all([
    supabase.from('hotel_allergy_info').select('hotel_id').eq('allergen_type', 'gluten'),
    supabase.from('restaurant_allergy_info').select('restaurant_id').eq('allergen_type', 'gluten'),
  ]);

  const glutenHotelIds = new Set((hotelInfoRes.data ?? []).map((r) => r.hotel_id));
  const glutenRestaurantIds = new Set((restaurantInfoRes.data ?? []).map((r) => r.restaurant_id));

  const [hotelArticlesRes, restaurantArticlesRes] = await Promise.all([
    supabase
      .from('seo_articles')
      .select('slug, title, meta_description, hero_image_url, hotel_ids')
      .eq('status', 'published')
      .eq('content_type', 'hotel'),
    supabase
      .from('seo_articles')
      .select('slug, title, meta_description, hero_image_url, restaurant_ids')
      .eq('status', 'published')
      .eq('content_type', 'restaurant'),
  ]);

  const hotelArticles = (hotelArticlesRes.data ?? []).filter((a) =>
    (a.hotel_ids ?? []).some((id: string) => glutenHotelIds.has(id))
  );
  const restaurantArticles = (restaurantArticlesRes.data ?? []).filter((a) =>
    (a.restaurant_ids ?? []).some((id: string) => glutenRestaurantIds.has(id))
  );

  // Only the first id per article is needed for a display city/country, same
  // shorthand RegionHub.tsx already uses for its auto-generated cards.
  const firstHotelIds = hotelArticles.map((a) => a.hotel_ids?.[0]).filter((id): id is string => Boolean(id));
  const firstRestaurantIds = restaurantArticles.map((a) => a.restaurant_ids?.[0]).filter((id): id is string => Boolean(id));

  const [hotelsRes, restaurantsRes] = await Promise.all([
    firstHotelIds.length > 0
      ? supabase.from('hotels').select('id, city, country').in('id', firstHotelIds)
      : Promise.resolve({ data: [] as { id: string; city: string; country: string }[] }),
    firstRestaurantIds.length > 0
      ? supabase.from('restaurants').select('id, city, country').in('id', firstRestaurantIds)
      : Promise.resolve({ data: [] as { id: string; city: string; country: string }[] }),
  ]);

  const hotelsById = Object.fromEntries((hotelsRes.data ?? []).map((h) => [h.id, h]));
  const restaurantsById = Object.fromEntries((restaurantsRes.data ?? []).map((r) => [r.id, r]));

  const toItem = (
    article: { slug: string; title: string; meta_description: string | null; hero_image_url: string | null },
    place: { city: string; country: string } | undefined,
    basePath: 'destinations' | 'restaurants'
  ): HubItem => ({
    id: article.slug,
    name: place?.city || article.title,
    country: place?.country || '',
    description: article.meta_description || '',
    image: article.hero_image_url || 'https://placehold.co/400x225/1e3a8a/ffffff',
    path: `/${basePath}/${article.slug}/`,
  });

  return {
    hotels: hotelArticles.map((a) => toItem(a, hotelsById[a.hotel_ids?.[0]], 'destinations')),
    restaurants: restaurantArticles.map((a) => toItem(a, restaurantsById[a.restaurant_ids?.[0]], 'restaurants')),
  };
}

const GlutenFree = () => {
  const [hotels, setHotels] = useState<HubItem[]>([]);
  const [restaurants, setRestaurants] = useState<HubItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    markPrerenderNotReady();
    fetchGlutenFreeArticles()
      .then(({ hotels, restaurants }) => {
        setHotels(hotels);
        setRestaurants(restaurants);
      })
      .finally(() => {
        setIsLoading(false);
        markPrerenderReady();
      });
  }, []);

  const canonical = `${BASE_URL}/gluten-free/`;
  const totalCount = hotels.length + restaurants.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        dynamicData={{
          title: 'Gluten-Free & Celiac Travel Guides | Allergy-Free Travel',
          description: 'Hotels and restaurants worldwide with real, guest-verified evidence of gluten-free accommodation — reviewed for celiac and gluten-sensitive travelers specifically, not just general allergy claims.',
          canonical,
          type: 'website',
        }}
      />

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <p className="text-sm text-muted-foreground mb-2">
            <Link to="/destinations/" className="hover:underline">All Destinations</Link> / Gluten-Free &amp; Celiac
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
            Gluten-Free &amp; Celiac Travel Guides
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Every hotel and restaurant below has at least one real, guest-written review specifically about gluten-free
            accommodation — dedicated gluten-free menus, celiac-aware kitchens, or confirmed cross-contamination
            precautions. Not a general "allergy friendly" claim — genuine gluten-specific evidence.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 container mx-auto px-4 max-w-6xl">
        {!isLoading && totalCount === 0 && (
          <p className="text-gray-500">New gluten-free guides are published regularly. Check back soon.</p>
        )}

        {hotels.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Hotels ({hotels.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {hotels.map((item) => (
                <DestinationCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}

        {restaurants.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Restaurants ({restaurants.length})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {restaurants.map((item) => (
                <DestinationCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default GlutenFree;
