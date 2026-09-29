import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import { TripadvisorEnrichedHotelCard } from "@/components/hotels/TripadvisorEnrichedHotelCard";
import NotFound from "@/pages/NotFound";
import { markPrerenderNotReady, markPrerenderReady } from "@/utils/prerenderReady";
import { destinationHotelsJsonLd } from "@/utils/jsonld";
import { AllergyCardPromo } from "@/components/AllergyCardPromo";
import { MoreOptionsOnGoogleMaps } from "@/components/MoreOptionsOnGoogleMaps";
import { ArticleByline } from "@/components/ArticleByline";
import { SITE_AUTHOR } from "@/constants/author";

interface Article {
  title: string;
  slug: string;
  meta_description: string | null;
  content_markdown: string | null;
  restaurant_ids: string[] | null;
  published_at: string | null;
  updated_at: string | null;
  hero_image_url: string | null;
  hero_image_credit: string | null;
}

interface RestaurantRow {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  cuisine_type: string | null;
  website_url: string | null;
  booking_url: string | null;
  allergy_score: number | null;
}

const ALLERGEN_FEATURE_LABELS: Record<string, string> = {
  gluten: "🌾 Gluten-free options",
  dairy: "🥛 Dairy-free options",
  nuts: "🥜 Nut-aware kitchen",
  peanuts: "🥜 Peanut-aware kitchen",
  eggs: "🥚 Egg-free options",
  soy: "🫘 Soy-free options",
  shellfish: "🦐 Shellfish-aware kitchen",
  sesame: "Sesame-aware kitchen",
  vegan: "🌱 Vegan options",
  vegetarian: "🌱 Vegetarian options",
};

interface RestaurantCard {
  id: string;
  name: string;
  address?: string;
  features: string[];
  quote?: string;
  bookingUrl?: string;
}

// Live Google Places photo of one of the reviewed restaurants (see
// supabase/functions/article-hero-photo for why it's fetched fresh on every
// view instead of stored). On-site only — og:image keeps hero_image_url.
interface LiveHeroPhoto {
  url: string;
  attributions: { name: string; uri: string | null }[];
  restaurantName: string;
  mapsUrl: string;
}

// Skip the billed live-photo call for crawlers and the build's own headless
// prerender (so the static HTML never bakes in a short-lived Google URL) —
// they get the article's regular hero image.
const isAutomatedVisitor = () =>
  typeof navigator === 'undefined' ||
  navigator.webdriver ||
  /bot|crawl|spider|slurp|headless|lighthouse|facebookexternalhit|preview/i.test(navigator.userAgent);

const RestaurantDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [restaurants, setRestaurants] = useState<RestaurantCard[]>([]);
  const [destinationCity, setDestinationCity] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [livePhoto, setLivePhoto] = useState<LiveHeroPhoto | null>(null);

  useEffect(() => {
    setLivePhoto(null);
    if (!slug || isAutomatedVisitor()) return;
    let cancelled = false;
    supabase.functions
      .invoke(`article-hero-photo?slug=${encodeURIComponent(slug)}`, { method: 'GET' })
      .then(({ data }) => {
        const photo: LiveHeroPhoto | undefined = data?.photo;
        if (!photo?.url || cancelled) return;
        // Swap in only once the image has actually loaded, so a slow or
        // failed Google photo never replaces a working hero with a blank.
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.onload = () => { if (!cancelled) setLivePhoto(photo); };
        img.src = photo.url;
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      setIsLoading(true);
      markPrerenderNotReady();
      const { data, error } = await supabase
        .from('seo_articles')
        .select('title, slug, meta_description, content_markdown, restaurant_ids, published_at, updated_at, hero_image_url, hero_image_credit')
        .eq('slug', slug)
        .eq('status', 'published')
        .eq('content_type', 'restaurant')
        .single();

      if (error || !data) {
        setNotFound(true);
        setIsLoading(false);
        markPrerenderReady();
        return;
      }

      setArticle(data);

      if (data.restaurant_ids && data.restaurant_ids.length > 0) {
        const [{ data: restaurantRows }, { data: sourceRows }, { data: allergyRows }] = await Promise.all([
          supabase
            .from('restaurants')
            .select('id, name, address, city, cuisine_type, website_url, booking_url, allergy_score')
            .in('id', data.restaurant_ids),
          supabase
            .from('restaurant_sources')
            .select('restaurant_id, snippet, raw_text')
            .in('restaurant_id', data.restaurant_ids)
            .eq('source_type', 'google'),
          supabase
            .from('restaurant_allergy_info')
            .select('restaurant_id, allergen_type, support_level')
            .in('restaurant_id', data.restaurant_ids),
        ]);

        if (restaurantRows) {
          const merged: RestaurantCard[] = (restaurantRows as RestaurantRow[]).map((restaurant) => {
            const source = sourceRows?.find((s) => s.restaurant_id === restaurant.id);
            const allergens = (allergyRows || []).filter((a) => a.restaurant_id === restaurant.id);

            const features = allergens.length > 0
              ? allergens.map((a) => ALLERGEN_FEATURE_LABELS[a.allergen_type] || `${a.allergen_type} options`)
              : ['✅ Allergy-conscious reviews from real guests'];

            if (restaurant.cuisine_type) features.unshift(`🍴 ${restaurant.cuisine_type}`);
            if (restaurant.allergy_score) features.push(`🛡️ Allergy score: ${restaurant.allergy_score}/5`);

            return {
              id: restaurant.id,
              name: restaurant.name,
              address: restaurant.address || undefined,
              features,
              quote: source?.raw_text || source?.snippet || undefined,
              bookingUrl: restaurant.booking_url || restaurant.website_url || undefined,
            };
          });
          setRestaurants(merged);
          const firstCity = (restaurantRows as RestaurantRow[]).find((r) => r.city)?.city;
          if (firstCity) setDestinationCity(firstCity);
        }
      }

      setIsLoading(false);
      markPrerenderReady();
    };

    fetchArticle();
  }, [slug]);

  if (notFound) return <NotFound />;
  if (isLoading || !article) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>;
  }

  // Trailing slash: matches the URL this route actually resolves to without
  // a redirect (see buildCanonical in utils/seo.ts for why).
  const articleUrl = `https://www.allergy-free-travel.com/restaurants/${article.slug}/`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || undefined,
    image: article.hero_image_url || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Person", name: SITE_AUTHOR.name, url: SITE_AUTHOR.url },
    publisher: { "@type": "Organization", name: "Allergy-Free Travel" },
  };
  // Reuses the same real-evidence-only Review/AggregateRating builder as
  // destination hotel pages — restaurants have the same shape (name,
  // optional numeric rating, optional quote/reviews).
  const restaurantsJsonLd = destinationHotelsJsonLd(
    restaurants.map((r) => ({ name: r.name, quote: r.quote }))
  );

  return (
    <div className="min-h-screen bg-white">
      <MetaManager
        routeKey="/restaurants"
        dynamicData={{
          title: article.title,
          description: article.meta_description || undefined,
          image: article.hero_image_url || undefined,
          type: "article",
          canonical: articleUrl,
          jsonLdExtra: [articleJsonLd, ...restaurantsJsonLd],
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/restaurants/" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block">
          &larr; All restaurant guides
        </Link>

        <article className="bg-white">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">{article.title}</h1>

          <ArticleByline publishedAt={article.published_at} updatedAt={article.updated_at} />

          {livePhoto ? (
            <figure className="mb-8">
              <img
                src={livePhoto.url}
                alt={`${livePhoto.restaurantName}${destinationCity ? `, ${destinationCity}` : ''}`}
                referrerPolicy="no-referrer"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
              <figcaption className="text-xs text-gray-400 mt-1">
                {livePhoto.restaurantName}
                {livePhoto.attributions.length > 0 && (
                  <>
                    {' '}&middot; Photo by{' '}
                    {livePhoto.attributions.map((a, i) => (
                      <span key={i}>
                        {i > 0 && ', '}
                        {a.uri ? (
                          <a href={a.uri} target="_blank" rel="noopener noreferrer nofollow" className="underline">{a.name}</a>
                        ) : a.name}
                      </span>
                    ))}
                  </>
                )}
                {' '}&middot;{' '}
                <a href={livePhoto.mapsUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">Google Maps</a>
              </figcaption>
            </figure>
          ) : article.hero_image_url && (
            <figure className="mb-8">
              <img
                src={article.hero_image_url}
                alt={article.title}
                loading="eager"
                className="w-full h-64 sm:h-80 object-cover rounded-lg"
              />
              {article.hero_image_credit && (
                <figcaption className="text-xs text-gray-400 mt-1">{article.hero_image_credit}</figcaption>
              )}
            </figure>
          )}

          {article.meta_description && (
            <p className="text-lg text-muted-foreground mb-8">{article.meta_description}</p>
          )}

          {restaurants.length > 0 && (
            <section className="space-y-4 sm:space-y-6 md:space-y-8 mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold">
                Top Allergy-Friendly Restaurants in {destinationCity || article.title}
              </h2>
              <div className="grid gap-6 sm:gap-8 md:gap-10">
                {restaurants.map((restaurant) => (
                  <TripadvisorEnrichedHotelCard
                    key={restaurant.id}
                    name={restaurant.name}
                    address={restaurant.address || ''}
                    features={restaurant.features}
                    quote={restaurant.quote}
                    bookingUrl={restaurant.bookingUrl || '#'}
                    city={destinationCity || undefined}
                    category="restaurant"
                  />
                ))}
              </div>
              {destinationCity && <MoreOptionsOnGoogleMaps city={destinationCity} kind="restaurants" />}
            </section>
          )}

          <div className="prose prose-blue max-w-none mb-10 border-t pt-8">
            <ReactMarkdown>{article.content_markdown || ''}</ReactMarkdown>
          </div>

          <div className="mb-10">
            <AllergyCardPromo />
          </div>

          <p className="text-sm text-gray-600">
            Looking for a place to stay?{" "}
            <Link to="/destinations/" className="text-blue-600 hover:text-blue-800 font-medium">
              Browse all destination guides →
            </Link>
          </p>
        </article>
      </div>
    </div>
  );
};

export default RestaurantDetail;
