import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import NotFound from "@/pages/NotFound";

interface Article {
  title: string;
  slug: string;
  meta_description: string | null;
  content_markdown: string | null;
  hotel_ids: string[] | null;
  published_at: string | null;
  hero_image_url: string | null;
  hero_image_credit: string | null;
}

interface HotelRef {
  id: string;
  name: string;
  address: string | null;
  website_url: string | null;
  booking_url: string | null;
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [hotels, setHotels] = useState<HotelRef[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('seo_articles')
        .select('title, slug, meta_description, content_markdown, hotel_ids, published_at, hero_image_url, hero_image_credit')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error || !data) {
        setNotFound(true);
        setIsLoading(false);
        return;
      }

      setArticle(data);

      if (data.hotel_ids && data.hotel_ids.length > 0) {
        const { data: hotelRows } = await supabase
          .from('hotels')
          .select('id, name, address, website_url, booking_url')
          .in('id', data.hotel_ids);
        if (hotelRows) setHotels(hotelRows);
      }

      setIsLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (notFound) return <NotFound />;
  if (isLoading || !article) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <MetaManager
        routeKey="/articles"
        dynamicData={{
          title: article.title,
          description: article.meta_description || undefined,
          type: "article",
        }}
      />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Link to="/articles" className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-6 inline-block">
          &larr; All guides
        </Link>

        <article className="bg-white">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-blue-800">{article.title}</h1>

          {article.hero_image_url && (
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

          <div className="prose prose-blue max-w-none mb-10">
            <ReactMarkdown>{article.content_markdown || ''}</ReactMarkdown>
          </div>

          {hotels.length > 0 && (
            <section className="border-t pt-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Hotels mentioned in this guide</h2>
              <div className="space-y-4">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-800">{hotel.name}</h3>
                    {hotel.address && <p className="text-sm text-gray-600 mb-2">{hotel.address}</p>}
                    <div className="flex flex-wrap gap-3">
                      {hotel.website_url && (
                        <a href={hotel.website_url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                          Hotel Website
                        </a>
                      )}
                      {hotel.booking_url && (
                        <a href={hotel.booking_url} target="_blank" rel="noopener noreferrer" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                          Check Availability on Booking.com
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
