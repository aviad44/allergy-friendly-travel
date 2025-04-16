
import { SearchBar } from "@/components/SearchBar";
import { FeaturedDestinations } from "@/components/FeaturedDestinations";
import { MapPin, Star, Shield, Info, HelpCircle, Rocket } from "lucide-react";
import { HOME_CONTENT } from "@/constants/home";
import { Helmet } from "react-helmet";

export default function Index() {
  const iconComponents = {
    MapPin,
    Star,
    Shield,
    Info,
    HelpCircle
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions</title>
        <meta name="description" content="Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more." />
        <meta name="keywords" content="allergy-friendly travel, food allergy hotels, gluten-free accommodation, dairy-free travel, nut-free hotels, allergen-free vacation, safe travel with allergies" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.png" />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.png" />
        
        {/* Schema.org JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Allergy Free Travel",
            "description": "Helping travelers with food allergies and dietary restrictions find safe accommodations worldwide.",
            "url": "https://www.allergy-free-travel.com",
            "logo": "https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png",
            "telephone": "+1-123-456-7890",
            "email": "info@allergy-free-travel.com",
            "areaServed": "Worldwide",
            "serviceType": "Allergy-Friendly Travel Planning",
            "dateModified": currentDate
          })}
        </script>
      </Helmet>
      
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden w-full">
        {/* Background image - tropical resort with pool and palm trees */}
        <picture>
          <source srcSet="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?fm=webp&q=95&auto=format&fit=crop&w=2000&h=1200&sat=1.3&con=1.1&bright=1.1" type="image/webp" />
          <img 
            src="https://images.unsplash.com/photo-1545579133-99bb5ab189bd?q=95&auto=format&fit=crop&w=2000&h=1200&sat=1.3&con=1.1&bright=1.1" 
            alt="Tropical resort with pool and palm trees - allergy-friendly destination" 
            className="absolute inset-0 w-full h-full object-cover object-center" 
            loading="eager" 
          />
        </picture>
        
        <div className="relative z-10 container mx-auto px-4 text-center w-full">
          <div className="max-w-xl mx-auto">
            {/* Semi-transparent teal/blue overlay box */}
            <div className="bg-[#1e5f7a]/70 backdrop-blur-md rounded-3xl p-8 sm:p-10 shadow-lg text-white">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 leading-tight text-white">
                <span className="block font-bold">{HOME_CONTENT.hero.title.line1}</span>
                <span className="block mt-1 sm:mt-2 font-bold">
                  Food Allergy Friendly
                </span>
                <span className="block mt-1 sm:mt-2 font-bold">
                  Hotel
                </span>
              </h1>
              <h2 className="font-display text-xl sm:text-2xl text-white mb-8 sm:mb-10 mx-auto leading-snug">
                Find hotels that understand your allergy needs for a safe and enjoyable stay
              </h2>
              
              {/* Custom search form to match the design */}
              <div className="flex flex-col gap-3 mt-6">
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-4 rounded-lg text-gray-800 text-lg focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Type of allergies"
                  className="w-full p-4 rounded-lg text-gray-800 text-lg focus:outline-none"
                />
                <button 
                  className="w-full p-4 bg-[#00b3b3] hover:bg-[#009999] text-white rounded-lg flex items-center justify-center gap-2 text-lg"
                >
                  <span className="inline-block w-6 h-6">⌕</span> 
                  <span>Search Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

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
    </>
  );
}
