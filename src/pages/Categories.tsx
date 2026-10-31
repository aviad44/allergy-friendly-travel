
import { useEffect, useState } from "react";
import { MapPin, Star, Shield, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MetaManager } from "@/components/MetaManager";
import { supabase } from "@/integrations/supabase/client";
import { markPrerenderNotReady, markPrerenderReady } from "@/utils/prerenderReady";

const categories = [
  {
    title: "Destinations",
    description: "Discover allergy-friendly hotels and resorts across the globe",
    icon: MapPin,
    href: "/destinations",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    title: "Traveler Reviews",
    description: "Read authentic experiences from fellow allergy-conscious travelers",
    icon: Star,
    href: "/reviews",
    color: "bg-secondary/10",
    iconColor: "text-secondary",
  },
  {
    title: "Contact Us",
    description: "Get in touch with our team for personalized assistance",
    icon: Shield,
    href: "/contact",
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
];

interface FeaturedArticle {
  id: string;
  title: string;
  description: string;
  image: string;
  path: string;
}

const Categories = () => {
  // The 4 most recently published real guides — replaces a previous
  // hardcoded block of 4 entirely invented hotels ("Luxury Retreat in Swiss
  // Alps" etc., no real names, stock Unsplash photos, no sourcing). Same
  // policy violation as TopHotelsSection.tsx's fabricated content, fixed
  // here the same way RegionHub.tsx/GlutenFree.tsx surface real published
  // articles: a live query, not placeholder copy.
  const [featuredArticles, setFeaturedArticles] = useState<FeaturedArticle[]>([]);

  useEffect(() => {
    markPrerenderNotReady();
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from("seo_articles")
        .select("slug, title, meta_description, hero_image_url, content_type")
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(4);

      setFeaturedArticles(
        (data ?? []).map((article) => ({
          id: article.slug,
          title: article.title,
          description: article.meta_description || "",
          image: article.hero_image_url || "https://placehold.co/400x225/1e3a8a/ffffff",
          path: `/${article.content_type === "restaurant" ? "restaurants" : "destinations"}/${article.slug}/`,
        }))
      );
      markPrerenderReady();
    };

    fetchFeatured();
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <MetaManager />
      <div className="container max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="ghost" className="hover:bg-secondary/10">
              <Home className="h-4 w-4 mr-2" />
              Home
            </Button>
          </Link>
        </div>

        <h1 className="font-display text-4xl md:text-5xl mb-6 text-center">
          Our Services
        </h1>
        <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
          Explore our comprehensive range of services designed to make your travel experience safe and enjoyable
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.title}
                to={category.href}
                className={`${category.color} p-6 rounded-xl transition-all duration-300 hover:scale-105 group`}
              >
                <div className={`${category.iconColor} mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Link>
            )
          })}
        </div>

        {featuredArticles.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">
              Featured Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={article.path}
                  className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 line-clamp-1">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-1">
                      {article.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
