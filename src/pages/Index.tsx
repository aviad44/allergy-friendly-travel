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
      
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden w-full font-['Poppins']"
        style={{
          backgroundImage: `url('https://i.imgur.com/2Tzy9gP.jpeg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          height: '100vh'
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-[700px]">
            {/* Hero content with semi-transparent teal background */}
            <div 
              className="text-center p-6 sm:p-10 rounded-2xl"
              style={{ backgroundColor: 'rgba(0, 85, 102, 0.5)' }}
            >
              <h1 className="text-[1.5em] sm:text-[2.2em] font-semibold leading-relaxed mb-6 text-white">
                <span className="block">Find Your Perfect</span>
                <span className="block font-bold">
                  Food Allergy Friendly Hotel
                </span>
              </h1>
              
              <p className="text-base sm:text-[1.1em] mb-8 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                Find hotels that understand your allergy needs for a safe and enjoyable stay
              </p>
              
              {/* Search form with responsive padding and spacing */}
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="w-full p-3 rounded-lg text-gray-800 text-base border-none bg-white/90"
                />
                <input
                  type="text"
                  placeholder="Type of allergies"
                  className="w-full p-3 rounded-lg text-gray-800 text-base border-none bg-white/90"
                />
                <button 
                  className="w-full p-3 bg-[#00b397] hover:bg-[#009f84] text-white rounded-lg text-[1.1em] transition-colors duration-300"
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
