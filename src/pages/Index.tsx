
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { MapPin, Star, Shield, Info, HelpCircle, Rocket, FileText } from "lucide-react";
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Index = () => {
  const iconComponents = {
    MapPin,
    Star,
    Shield,
    Info,
    HelpCircle
  };

  // Updated metadata with current date
  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
        <meta name="description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="keywords" content="allergy-friendly travel, food allergy hotels, gluten-free accommodation, dairy-free travel, nut-free hotels, allergen-free vacation, safe travel with allergies" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/" />
        <meta name="robots" content="index, follow" />
        
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
            "dateModified": currentDate
          })}
        </script>
      </Helmet>
      
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
      
      {/* Allergy Translation Card Section */}
      <section className="py-10 sm:py-16 px-4 bg-white w-full">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="text-blue-600 font-semibold uppercase tracking-wider text-sm">Travel Tool</span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl mb-4 font-bold text-blue-800">
                Allergy Translation Card Generator
              </h2>
              <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-lg">
                Traveling with food allergies? Create a free translation card to stay safe and understood anywhere in the world. Communicate your dietary needs in any language.
              </p>
              <ul className="mb-6 space-y-3">
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Translate your allergies into 40+ languages</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Custom downloadable cards to print or save</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <span className="text-gray-700">Simple interface for easy card generation</span>
                </li>
              </ul>
              <Link 
                to="/allergy-translation-card" 
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Create Your Card <FileText className="h-5 w-5" />
              </Link>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Travel safely with allergy translation cards" 
                className="w-full h-64 object-cover rounded-lg shadow-md mb-4" 
              />
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">Sample Allergy Card:</h3>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md font-mono text-sm">
                  (English → Italian)<br />
                  Hello, I have a food allergy to: Milk, Eggs, Sesame.<br />
                  Please ensure my food is completely free from contact with these ingredients.<br />
                  Thank you very much!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
