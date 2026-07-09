import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";

interface ArticleSummary {
  slug: string;
  title: string;
  meta_description: string | null;
  published_at: string | null;
}

const Articles = () => {
  const [articles, setArticles] = useState<ArticleSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data, error } = await supabase
        .from('seo_articles')
        .select('slug, title, meta_description, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (!error && data) setArticles(data);
      setIsLoading(false);
    };
    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MetaManager
        routeKey="/articles"
        dynamicData={{
          title: "Allergy-Friendly Travel Guides | Allergy-Free Travel",
          description: "Destination guides built from real Google reviews mentioning food allergies — real hotels, real evidence, no invented reviews.",
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3 text-blue-800">
          Allergy-Friendly Travel Guides
        </h1>
        <p className="text-gray-600 mb-10">
          Every guide below is built from real Google reviews that mention food allergies — no invented hotels or quotes.
        </p>

        {isLoading && <p className="text-gray-500">Loading guides…</p>}

        {!isLoading && articles.length === 0 && (
          <p className="text-gray-500">New guides are published regularly. Check back soon.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/articles/${article.slug}`}
              className="block bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-lg font-semibold text-blue-800 mb-2">{article.title}</h2>
              {article.meta_description && (
                <p className="text-sm text-gray-600 line-clamp-3">{article.meta_description}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
