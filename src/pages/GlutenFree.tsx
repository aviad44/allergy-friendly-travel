
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { supabase } from '@/integrations/supabase/client';
import { markPrerenderNotReady, markPrerenderReady } from '@/utils/prerenderReady';
import { getRegionForCountry, type RegionSlug } from '@/utils/regions';
import { GLUTEN_FREE_COUNTRIES, countryPageForName, type GlutenFreeCountry } from '@/utils/glutenFreeCountries';

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
async function fetchGlutenFreeArticles(
  region?: RegionSlug,
  country?: GlutenFreeCountry
): Promise<{ hotels: HubItem[]; restaurants: HubItem[] }> {
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

  const inRegion = (item: HubItem) =>
    (!region || getRegionForCountry(item.country) === region) &&
    (!country || country.aliases.includes(item.country.trim().toLowerCase()));

  return {
    hotels: hotelArticles.map((a) => toItem(a, hotelsById[a.hotel_ids?.[0]], 'destinations')).filter(inRegion),
    restaurants: restaurantArticles
      .map((a) => toItem(a, restaurantsById[a.restaurant_ids?.[0]], 'restaurants'))
      .filter(inRegion),
  };
}

// Group by country (largest groups first) so the page reads as a structured
// guide with country/city names as real text, not one flat card grid.
function groupByCountry(items: HubItem[]): [string, HubItem[]][] {
  const groups = new Map<string, HubItem[]>();
  for (const item of items) {
    const key = item.country || 'Other';
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()].sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
}

// General celiac-travel guidance only — no claims about any specific property.
const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is a "gluten-free" menu option the same as celiac-safe?',
    a: 'Not necessarily. A gluten-free dish can still be cooked on shared surfaces, fryers or utensils. Celiac travelers should ask how the kitchen prevents cross-contamination, not only whether a gluten-free option exists.',
  },
  {
    q: 'How do you decide which hotels and restaurants are listed?',
    a: 'A place is listed only when we found at least one real guest review (Google or Tripadvisor) that specifically mentions gluten-free or celiac accommodation. We do not write or invent reviews.',
  },
  {
    q: 'What should I ask a hotel before booking as a celiac traveler?',
    a: 'Ask whether breakfast and room service can be prepared without cross-contact, whether a kitchen or fridge is available in the room, and whether the restaurant can accommodate celiac disease specifically, ideally confirmed in writing.',
  },
  {
    q: 'Can I use a translation card abroad?',
    a: 'Yes. Our free allergy translation card explains gluten and celiac needs in the local language, which helps in restaurants where staff may not speak English.',
  },
];

interface GlutenFreeProps {
  region?: RegionSlug;
  country?: GlutenFreeCountry;
}

const REGION_COPY: Partial<Record<RegionSlug, { label: string; path: string }>> = {
  europe: { label: 'Europe', path: '/destinations/gluten-free-europe/' },
};

const GlutenFree = ({ region, country }: GlutenFreeProps = {}) => {
  const regionCopy = country
    ? { label: country.label, path: `/gluten-free/${country.slug}/` }
    : region
      ? REGION_COPY[region]
      : undefined;
  const scope = regionCopy?.label ?? 'Worldwide';
  const [hotels, setHotels] = useState<HubItem[]>([]);
  const [restaurants, setRestaurants] = useState<HubItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    markPrerenderNotReady();
    fetchGlutenFreeArticles(region, country)
      .then(({ hotels, restaurants }) => {
        setHotels(hotels);
        setRestaurants(restaurants);
      })
      .finally(() => {
        setIsLoading(false);
        markPrerenderReady();
      });
  }, [region, country]);

  const canonical = regionCopy ? `${BASE_URL}${regionCopy.path}` : `${BASE_URL}/gluten-free/`;
  const totalCount = hotels.length + restaurants.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        dynamicData={{
          title: regionCopy
            ? `Gluten-Free Hotels & Restaurants in ${scope} | Celiac Travel Guide`
            : 'Gluten-Free Hotels & Restaurants Worldwide | Celiac Travel Guide',
          description: `Gluten-free and celiac-friendly hotels and restaurants ${regionCopy ? `in ${scope}` : 'worldwide'}, each backed by real guest reviews that mention gluten-free or celiac accommodation. No invented claims.`,
          canonical,
          type: 'website',
          jsonLdExtra: {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
        }}
      />

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <p className="text-sm text-muted-foreground mb-2">
            <Link to="/destinations/" className="hover:underline">All Destinations</Link> / Gluten-Free &amp; Celiac
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
            Gluten-Free Hotels &amp; Restaurants {regionCopy ? `in ${scope}` : 'Worldwide'}
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Every hotel and restaurant below has at least one real, guest-written review specifically about gluten-free
            accommodation — dedicated gluten-free menus, celiac-aware kitchens, or confirmed cross-contamination
            precautions. Not a general "allergy friendly" claim — genuine gluten-specific evidence.
          </p>
          {!isLoading && totalCount > 0 && (
            <p className="text-gray-600 max-w-2xl mt-3">
              Currently {hotels.length} hotel guide{hotels.length === 1 ? '' : 's'} and {restaurants.length} restaurant
              guide{restaurants.length === 1 ? '' : 's'} {regionCopy ? `in ${scope}` : 'across the world'}{country ? '.' : ', grouped by country below.'}
            </p>
          )}
        </div>
      </section>

      <section className="py-8 md:py-12 container mx-auto px-4 max-w-6xl">
        {!isLoading && totalCount === 0 && (
          <p className="text-gray-500">New gluten-free guides are published regularly. Check back soon.</p>
        )}

        {[
          { title: 'Hotels', items: hotels },
          { title: 'Restaurants', items: restaurants },
        ].map(({ title, items }) =>
          items.length > 0 ? (
            <div key={title} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Gluten-Free {title} ({items.length})
              </h2>
              {country ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map((item) => (
                    <DestinationCard key={item.id} {...item} />
                  ))}
                </div>
              ) : (
                groupByCountry(items).map(([groupCountry, group]) => {
                  const countryPage = countryPageForName(groupCountry);
                  return (
                    <div key={groupCountry} className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 text-gray-700">
                        {countryPage ? (
                          <Link to={`/gluten-free/${countryPage.slug}/`} className="hover:underline">
                            {title} in {groupCountry} ({group.length})
                          </Link>
                        ) : (
                          <>
                            {title} in {groupCountry} ({group.length})
                          </>
                        )}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {group.map((item) => (
                          <DestinationCard key={item.id} {...item} />
                        ))}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : null
        )}

        <nav aria-label="Gluten-free guides by country" className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-3 text-gray-800">Gluten-free guides by country</h2>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {country && (
              <li>
                <Link to="/gluten-free/" className="text-blue-700 underline">
                  Worldwide
                </Link>
              </li>
            )}
            {GLUTEN_FREE_COUNTRIES.filter((c) => c.slug !== country?.slug).map((c) => (
              <li key={c.slug}>
                <Link to={`/gluten-free/${c.slug}/`} className="text-blue-700 underline">
                  Gluten-free {c.label.replace(/^the /, '')}
                </Link>
              </li>
            ))}
            {!country && (
              <li>
                <Link to="/destinations/gluten-free-europe/" className="text-blue-700 underline">
                  Gluten-free Europe
                </Link>
              </li>
            )}
          </ul>
        </nav>

        <div className="mt-12 max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gluten-free travel FAQ</h2>
          {FAQ.map(({ q, a }) => (
            <div key={q} className="mb-5">
              <h3 className="font-semibold text-gray-800">{q}</h3>
              <p className="text-gray-600">{a}</p>
            </div>
          ))}
          <p className="text-gray-600">
            Traveling somewhere where you don&apos;t speak the language? Get our free{' '}
            <Link to="/allergy-translation-card/" className="text-blue-700 underline">
              allergy translation card
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default GlutenFree;
