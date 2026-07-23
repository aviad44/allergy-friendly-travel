import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";
import { MetaManager } from "@/components/MetaManager";
import { TopHotelsSection } from "@/components/reviews/TopHotelsSection";
import { Hotel } from "@/types/definitions";
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

interface HotelRow {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
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

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [destinationCity, setDestinationCity] = useState<string | null>(null);
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
        const [{ data: hotelRows }, { data: sourceRows }, { data: allergyRows }] = await Promise.all([
          supabase
            .from('hotels')
            .select('id, name, address, city, website_url, booking_url, allergy_score')
            .in('id', data.hotel_ids),
          supabase
            .from('hotel_sources')
            .select('hotel_id, snippet, raw_text')
            .in('hotel_id', data.hotel_ids)
            .eq('source_type', 'google'),
          supabase
            .from('hotel_allergy_info')
            .select('hotel_id, allergen_type, support_level')
            .in('hotel_id', data.hotel_ids),
        ]);

        if (hotelRows) {
          // Real evidence gathered by content-pipeline: an actual guest review
          // excerpt per hotel and, where the automated classifier recognized
          // specific allergens, structured per-allergen support info. Falls
          // back to a generic badge when no allergen was specifically matched
          // — never invents a claim the review didn't make.
          const mergedHotels: Hotel[] = (hotelRows as HotelRow[]).map((hotel) => {
            const source = sourceRows?.find((s) => s.hotel_id === hotel.id);
            const allergens = (allergyRows || []).filter((a) => a.hotel_id === hotel.id);

            const features = allergens.length > 0
              ? allergens.map((a) => ALLERGEN_FEATURE_LABELS[a.allergen_type] || `${a.allergen_type} options`)
              : ['✅ Allergy-conscious reviews from real guests'];

            if (hotel.allergy_score) {
              features.push(`🛡️ Allergy score: ${hotel.allergy_score}/5`);
            }

            return {
              id: hotel.id,
              name: hotel.name,
              address: hotel.address || undefined,
              features,
              quote: source?.raw_text || source?.snippet || undefined,
              bookingUrl: hotel.booking_url || hotel.website_url || undefined,
              description: '',
            };
          });
          setHotels(mergedHotels);
          const firstCity = (hotelRows as HotelRow[]).find((h) => h.city)?.city;
          if (firstCity) setDestinationCity(firstCity);
        }
      }

      setIsLoading(false);
    };

    fetchArticle();
  }, [slug]);

  if (notFound) return <NotFound />;
  if (isLoading || !article) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading…</div>;
  }

  const articleUrl = `https://www.allergy-free-travel.com/articles/${article.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description || undefined,
    image: article.hero_image_url || undefined,
    datePublished: article.published_at || undefined,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Organization", name: "Allergy-Free Travel" },
    publisher: { "@type": "Organization", name: "Allergy-Free Travel" },
  };

  return (
    <div className="min-h-screen bg-white">
      <MetaManager
        routeKey="/articles"
        dynamicData={{
          title: article.title,
          description: article.meta_description || undefined,
          image: article.hero_image_url || undefined,
          type: "article",
          canonical: articleUrl,
          jsonLdExtra: articleJsonLd,
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

          {article.meta_description && (
            <p className="text-lg text-muted-foreground mb-8">{article.meta_description}</p>
          )}

          {hotels.length > 0 && (
            <div className="mb-10">
              <TopHotelsSection
                hotels={hotels}
                destinationName={destinationCity || article.title}
              />
            </div>
          )}

          <div className="prose prose-blue max-w-none mb-10 border-t pt-8">
            <ReactMarkdown>{article.content_markdown || ''}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetail;
