
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";
import { HOME_CONTENT } from "@/constants/home";

const Index = () => {
  const iconComponents = {
    MapPin,
    Star,
    Shield,
    Info,
    HelpCircle
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/" className="text-2xl font-display font-bold text-secondary hover:text-secondary/90 transition-colors" aria-label="Return to homepage">
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with optimized loading */}
        <picture>
          <source
            srcSet="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fm=webp&q=90"
            type="image/webp"
          />
          <img
            src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=90"
            alt=""
            className="absolute inset-0 w-full h-full object-cover brightness-125"
            loading="eager"
            fetchPriority="high"
          />
        </picture>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        
        {/* Content Overlay */}
        <div className="relative z-10 container max-w-6xl mx-auto px-4 text-center">
          <div className="bg-black/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight text-amber-200">
              {HOME_CONTENT.hero.title.line1}
              <span className="block mt-2">
                {HOME_CONTENT.hero.title.line2} {HOME_CONTENT.hero.title.line3}
              </span>
            </h1>
            <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-white mb-12 max-w-3xl mx-auto leading-relaxed">
              {HOME_CONTENT.hero.description}
            </h2>
            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300 border border-white/40 hover:border-white/60">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container max-w-6xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl mb-4 text-center">
            {HOME_CONTENT.featured.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.featured.description}
          </p>
          <FeaturedDestinations />
        </div>
      </section>
    </div>
  );
};

export default Index;
