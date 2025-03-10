
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle, Rocket } from "lucide-react";
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
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation - Changed from fixed to relative */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center gap-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            {HOME_CONTENT.navigation.brand}
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Section - Adjusted padding top since nav is no longer fixed */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-black/75 to-black/90 w-full">
        {/* Background Image with optimized loading */}
        <picture>
          <source srcSet="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?fm=webp&q=90" type="image/webp" />
          <img 
            src="https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?q=90" 
            alt="Allergy-friendly travel destination" 
            className="absolute inset-0 w-full h-full object-cover opacity-45" 
            loading="eager" 
          />
        </picture>
        
        {/* Content Overlay - Improved mobile spacing with padding adjustments */}
        <div className="relative z-10 container mx-auto px-4 text-center w-full pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 md:mb-8 leading-tight drop-shadow-lg">
              <span className="text-sky-200 font-bold">{HOME_CONTENT.hero.title.line1}</span>
              <span className="block mt-1 sm:mt-2 text-teal-300 font-bold">
                {HOME_CONTENT.hero.title.line2} {HOME_CONTENT.hero.title.line3}
              </span>
            </h1>
            <h2 className="font-display text-lg sm:text-xl text-sky-100 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto leading-snug drop-shadow-md">
              Find hotels that understand your allergy needs for a safe and enjoyable stay
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
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center font-bold text-blue-800">
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
