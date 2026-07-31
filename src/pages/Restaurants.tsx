import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import { markPrerenderNotReady, markPrerenderReady } from "@/utils/prerenderReady";

interface RestaurantArticleSummary {
  slug: string;
  title: string;
  meta_description: string | null;
  published_at: string | null;
  hero_image_url: string | null;
}

const Restaurants = () => {
  const [articles, setArticles] = useState<RestaurantArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    markPrerenderNotReady();
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('seo_articles')
        .select('slug, title, meta_description, published_at, hero_image_url')
        .eq('status', 'published')
        .eq('content_type', 'restaurant')
        .order('published_at', { ascending: false });

      if (!error && data) setArticles(data);
      setIsLoading(false);
      markPrerenderReady();
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        routeKey="/restaurants"
        dynamicData={{
          title: "Allergy-Friendly Restaurant Guides | Allergy-Free Travel",
          description: "Restaurant guides built from real Google reviews mentioning food allergies — real restaurants, real evidence, no invented reviews.",
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
          Allergy-Friendly Restaurant Guides
        </h1>
        <p className="text-gray-600 mb-10">
          Every guide below is built from real Google reviews that mention food allergies — no invented restaurants or quotes.
        </p>

        {isLoading && <p className="text-gray-500">Loading guides…</p>}

        {!isLoading && articles.length === 0 && (
          <p className="text-gray-500">New guides are published regularly. Check back soon.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/restaurants/${article.slug}`}
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

        <p className="mt-10 text-sm text-gray-600">
          Looking for a place to stay?{" "}
          <Link to="/destinations" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse all destination guides →
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Restaurants;
