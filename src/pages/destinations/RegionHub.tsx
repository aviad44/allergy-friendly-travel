
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MetaManager } from '@/components/MetaManager';
import { DestinationCard } from '@/components/destinations/DestinationCard';
import { resolveStaticImage } from '@/components/destinations/DestinationsList';
import { destinations } from '@/data/destinations-list';
import { supabase } from '@/integrations/supabase/client';
import { REGIONS, isRegionSlug, getRegionForCountry } from '@/utils/regions';
import { markPrerenderNotReady, markPrerenderReady } from '@/utils/prerenderReady';
import NotFound from '@/pages/NotFound';

interface RegionCardItem {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  path: string;
}

const BASE_URL = 'https://www.allergy-free-travel.com';

const DestinationRegionHub = () => {
  const { region } = useParams<{ region: string }>();
  const [autoArticles, setAutoArticles] = useState<RegionCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const regionDef = isRegionSlug(region) ? REGIONS.find((r) => r.slug === region) : undefined;

  useEffect(() => {
    if (!regionDef) return;

    markPrerenderNotReady();
    const fetchAutoArticles = async () => {
      const { data: articles } = await supabase
        .from('seo_articles')
        .select('slug, title, meta_description, hero_image_url, hotel_ids')
        .eq('status', 'published')
        .eq('content_type', 'hotel')
        .order('published_at', { ascending: false });

      if (!articles || articles.length === 0) {
        setIsLoading(false);
        markPrerenderReady();
        return;
      }

      const firstHotelIds = articles
        .map((a) => a.hotel_ids?.[0])
        .filter((id): id is string => Boolean(id));

      let hotelsById: Record<string, { city: string; country: string }> = {};
      if (firstHotelIds.length > 0) {
        const { data: hotels } = await supabase
          .from('hotels')
          .select('id, city, country')
          .in('id', firstHotelIds);
        hotelsById = Object.fromEntries((hotels || []).map((h) => [h.id, { city: h.city, country: h.country }]));
      }

      const items = articles
        .map((article) => {
          const hotel = article.hotel_ids?.[0] ? hotelsById[article.hotel_ids[0]] : undefined;
          return { article, hotel };
        })
        .filter(({ hotel }) => getRegionForCountry(hotel?.country) === regionDef.slug)
        .map(({ article, hotel }) => ({
          id: article.slug,
          name: hotel?.city || article.title,
          country: hotel?.country || '',
          description: article.meta_description || '',
          image: article.hero_image_url || 'https://placehold.co/400x225/1e3a8a/ffffff',
          path: `/destinations/${article.slug}/`,
        }));

      setAutoArticles(items);
      setIsLoading(false);
      markPrerenderReady();
    };

    fetchAutoArticles();
  }, [regionDef]);

  if (!regionDef) {
    return <NotFound />;
  }

  const staticItems: RegionCardItem[] = destinations
    .filter((d) => d.region === regionDef.slug)
    .map((d) => ({
      id: d.id,
      name: d.name,
      country: d.country,
      description: d.description,
      image: resolveStaticImage(d.id, d.name),
      path: `/destinations/${d.id}/`,
    }));

  const items = [...staticItems, ...autoArticles];
  const canonical = `${BASE_URL}/destinations/region/${regionDef.slug}/`;

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        dynamicData={{
          title: `Allergy-Friendly Hotels in ${regionDef.label} | Allergy-Free Travel`,
          description: regionDef.description,
          canonical,
          type: 'website',
        }}
      />

      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-10 max-w-5xl">
          <p className="text-sm text-muted-foreground mb-2">
            <Link to="/destinations/" className="hover:underline">All Destinations</Link> / {regionDef.label}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
            Allergy-Friendly Hotels in {regionDef.label}
          </h1>
          <p className="text-gray-600 max-w-2xl">{regionDef.description}</p>
          <p className="mt-4 text-sm">
            Looking for restaurants instead?{' '}
            <Link to={`/restaurants/region/${regionDef.slug}/`} className="text-blue-600 hover:text-blue-800 font-medium">
              Browse {regionDef.label} restaurant guides →
            </Link>
          </p>
        </div>
      </section>

      <section className="py-8 md:py-12 container mx-auto px-4 max-w-6xl">
        {!isLoading && items.length === 0 && (
          <p className="text-gray-500">New guides for this region are published regularly. Check back soon.</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <DestinationCard
              key={item.id}
              id={item.id}
              name={item.name}
              country={item.country}
              description={item.description}
              image={item.image}
              path={item.path}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-6xl pb-12">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Browse other regions</h2>
        <div className="flex flex-wrap gap-3">
          {REGIONS.filter((r) => r.slug !== regionDef.slug).map((r) => (
            <Link
              key={r.slug}
              to={`/destinations/region/${r.slug}/`}
              className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-700 transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DestinationRegionHub;
