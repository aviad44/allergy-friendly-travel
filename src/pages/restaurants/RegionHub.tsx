
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { supabase } from '@/integrations/supabase/client';
import { REGIONS, isRegionSlug, getRegionForCountry } from '@/utils/regions';
import { markPrerenderNotReady, markPrerenderReady } from '@/utils/prerenderReady';
import NotFound from '@/pages/NotFound';

interface RestaurantArticleSummary {
  slug: string;
  title: string;
  meta_description: string | null;
  hero_image_url: string | null;
}

const BASE_URL = 'https://www.allergy-free-travel.com';

const RestaurantRegionHub = () => {
  const { region } = useParams<{ region: string }>();
  const [articles, setArticles] = useState<RestaurantArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const regionDef = isRegionSlug(region) ? REGIONS.find((r) => r.slug === region) : undefined;

  useEffect(() => {
    if (!regionDef) return;

    markPrerenderNotReady();
    const fetchArticles = async () => {
      const { data: rows } = await supabase
        .from('seo_articles')
        .select('slug, title, meta_description, hero_image_url, restaurant_ids')
        .eq('status', 'published')
        .eq('content_type', 'restaurant')
        .order('published_at', { ascending: false });

      if (!rows || rows.length === 0) {
        setIsLoading(false);
        markPrerenderReady();
        return;
      }

      const firstRestaurantIds = rows
        .map((a) => a.restaurant_ids?.[0])
        .filter((id): id is string => Boolean(id));

      let countryById: Record<string, string> = {};
      if (firstRestaurantIds.length > 0) {
        const { data: restaurants } = await supabase
          .from('restaurants')
          .select('id, country')
          .in('id', firstRestaurantIds);
        countryById = Object.fromEntries((restaurants || []).map((r) => [r.id, r.country]));
      }

      const filtered = rows
        .filter((a) => {
          const country = a.restaurant_ids?.[0] ? countryById[a.restaurant_ids[0]] : undefined;
          return getRegionForCountry(country) === regionDef.slug;
        })
        .map((a) => ({
          slug: a.slug,
          title: a.title,
          meta_description: a.meta_description,
          hero_image_url: a.hero_image_url,
        }));

      setArticles(filtered);
      setIsLoading(false);
      markPrerenderReady();
    };

    fetchArticles();
  }, [regionDef]);

  if (!regionDef) {
    return <NotFound />;
  }

  const canonical = `${BASE_URL}/restaurants/region/${regionDef.slug}/`;

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        dynamicData={{
          title: `Allergy-Friendly Restaurants in ${regionDef.label} | Allergy-Free Travel`,
          description: `${regionDef.description} Every guide is built from real Google reviews mentioning food allergies.`,
          canonical,
          type: 'website',
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <p className="text-sm text-muted-foreground mb-2">
          <Link to="/restaurants/" className="hover:underline">All Restaurant Guides</Link> / {regionDef.label}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
          Allergy-Friendly Restaurants in {regionDef.label}
        </h1>
        <p className="text-gray-600 mb-4">
          Every guide below is built from real Google reviews that mention food allergies — no invented restaurants or quotes.
        </p>
        <p className="mb-10 text-sm">
          Looking for a place to stay?{' '}
          <Link to={`/destinations/region/${regionDef.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium">
            Browse {regionDef.label} hotel guides →
          </Link>
        </p>

        {isLoading && <p className="text-gray-500">Loading guides…</p>}

        {!isLoading && articles.length === 0 && (
          <p className="text-gray-500">New guides for this region are published regularly. Check back soon.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/restaurants/${article.slug}/`}
              className="block bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {article.hero_image_url && (
                <img
                  src={article.hero_image_url}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-lg font-semibold text-blue-800 mb-2">{article.title}</h2>
                {article.meta_description && (
                  <p className="text-sm text-gray-600 line-clamp-3">{article.meta_description}</p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-12 mb-3 text-gray-700">Browse other regions</h2>
        <div className="flex flex-wrap gap-3">
          {REGIONS.filter((r) => r.slug !== regionDef.slug).map((r) => (
            <Link
              key={r.slug}
              to={`/restaurants/region/${r.slug}/`}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantRegionHub;
