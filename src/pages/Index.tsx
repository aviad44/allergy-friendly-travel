
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { FeaturedHotels } from "@/components/FeaturedHotels";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Shield, Info, HelpCircle, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from "react-helmet";

const Index = () => {
  const iconComponents = {
    MapPin,
    Star,
    Shield,
    Info,
    HelpCircle
  };

  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
        <meta name="description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="keywords" content="allergy-friendly travel, food allergy hotels, gluten-free accommodation, dairy-free travel, nut-free hotels, allergen-free vacation, safe travel with allergies" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/" />
        
        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Allergy Free Travel",
            "description": "Helping travelers with food allergies and dietary restrictions find safe accommodations worldwide.",
            "url": "https://www.allergy-free-travel.com",
            "logo": "https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png",
            "telephone": "+1-123-456-7890",
            "email": "info@allergy-free-travel.com",
            "areaServed": "Worldwide",
            "serviceType": "Allergy-Friendly Travel Planning",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.allergy-free-travel.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
        
        {/* Additional metadata for better OpenAI Plugin compatibility */}
        <meta name="ai:description" content="Find allergy-friendly hotels and accommodations worldwide. Get personalized recommendations for gluten-free, dairy-free, nut-free and other dietary restrictions." />
        <meta name="ai:commands" content="find hotels in [location], recommend allergy-friendly restaurants in [city], show me safe accommodations for [allergy type]" />
        <meta name="ai:instructions" content="This website helps travelers with food allergies and dietary restrictions find safe accommodations worldwide. Users can search for hotels by location and specific allergy considerations." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 w-full">
        {/* Beta Banner */}
        <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
          <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
          Website in Beta
        </div>
        
        {/* Navigation - Adjusted spacing between elements */}
        <nav className="relative bg-white shadow-sm w-full">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <Link to="/" aria-label="Return to homepage" className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
              <img 
                src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
                alt="Allergy Free Travel Logo" 
                className="h-12 w-auto" 
              />
              <span>{HOME_CONTENT.navigation.brand}</span>
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
              className="absolute inset-0 w-full h-full object-cover object-center" 
              loading="eager" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60"></div>
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
        
        {/* Featured Hotels Section - Added for better LLM integration */}
        <section className="py-10 sm:py-16 md:py-20 px-4 bg-white w-full">
          <div className="container mx-auto max-w-[1400px]">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center font-bold text-blue-800">
              Top Allergy-Friendly Hotels
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 md:mb-12 text-center max-w-2xl mx-auto">
              Discover accommodations that go above and beyond to ensure a safe stay for guests with dietary restrictions
            </p>
            <FeaturedHotels />
          </div>
        </section>
        
        {/* FAQ Section - Added for better SEO */}
        <section className="py-10 sm:py-16 md:py-20 px-4 bg-gray-50 w-full">
          <div className="container mx-auto max-w-[1000px]">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 text-center font-bold text-blue-800">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6 mt-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">What makes a hotel "allergy-friendly"?</h3>
                <p className="text-gray-700">Allergy-friendly hotels take specific measures to accommodate guests with food allergies and dietary restrictions. This may include special food preparation areas, staff training on allergen management, allergy-friendly menu options, and room cleaning protocols that reduce allergen exposure.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">How do I communicate my allergies to hotel staff?</h3>
                <p className="text-gray-700">We recommend contacting hotels directly before booking to discuss your specific allergies. Many allergy-friendly hotels have protocols for handling special dietary requirements and can provide information about their accommodation capabilities.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">Can I trust hotel reviews regarding allergy accommodations?</h3>
                <p className="text-gray-700">While reviews can provide valuable insights, allergy needs are highly individual. We recommend reading recent reviews from travelers with similar allergies and always confirming directly with the hotel about their current practices and capabilities.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
