
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

  return <div className="min-h-screen bg-gray-50 w-full">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center gap-3 text-2xl font-display font-bold text-blue-700 hover:text-blue-800 transition-colors">
            <img 
              src="/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Section - Added pt-16 to create space below the fixed navbar */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black/70 to-black/90 w-full pt-16 md:pt-20">
        {/* Background Image with optimized loading */}
        <picture>
          <source srcSet="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fm=webp&q=90" type="image/webp" />
          <img 
            src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=90" 
            alt="Allergy-friendly travel destination" 
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
            loading="eager" 
          />
        </picture>
        
        {/* Content Overlay - Improved mobile spacing with padding adjustments */}
        <div className="relative z-10 container mx-auto px-4 text-center w-full pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 md:mb-8 leading-tight">
              <span className="text-sky-200">{HOME_CONTENT.hero.title.line1}</span>
              <span className="block mt-1 sm:mt-2 text-teal-300">
                {HOME_CONTENT.hero.title.line2} {HOME_CONTENT.hero.title.line3}
              </span>
            </h1>
            <h2 className="font-display text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-6 sm:mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed capitalize">
              {HOME_CONTENT.hero.description}
            </h2>
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-w-4xl mx-auto p-4 sm:p-5">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-10 sm:py-16 md:py-20 px-4 bg-gray-50 w-full">
        <div className="container mx-auto max-w-[1400px]">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center">
            {HOME_CONTENT.featured.title}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-12 text-center max-w-2xl mx-auto">
            {HOME_CONTENT.featured.description}
          </p>
          <FeaturedDestinations />
        </div>
      </section>
    </div>;
};

export default Index;
