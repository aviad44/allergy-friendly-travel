
import { useState } from "react";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import HotelSection from "@/components/hotels/HotelSection";
import UsefulInfo from "@/components/hotels/UsefulInfo";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { RelatedDestinations } from "@/components/reviews/RelatedDestinations";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import AllergiesTable from "@/components/language/AllergiesTable";
import { LanguageCode } from "@/types/reviews";

const Barcelona = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');

  const barcelonaHotels = [
    {
      id: 1,
      name: "Hotel Arts Barcelona",
      city: "Barcelona",
      country: "Spain",
      imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      reviews: 248,
      allergyInfo: "Dedicated allergy-friendly kitchen",
      bookingUrl: "https://example.com/hotel-arts"
    },
    {
      id: 2,
      name: "Almanac Barcelona",
      city: "Barcelona",
      country: "Spain",
      imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      reviews: 186,
      allergyInfo: "Comprehensive allergen protocols",
      bookingUrl: "https://example.com/almanac"
    },
    {
      id: 3,
      name: "Majestic Hotel & Spa",
      city: "Barcelona",
      country: "Spain",
      imageUrl: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=800&q=80",
      rating: 5,
      reviews: 312,
      allergyInfo: "Expert allergen handling",
      bookingUrl: "https://example.com/majestic"
    }
  ];

  // Language table headers and rows
  const headers = ["Spanish", "English", "Pronunciation"];
  const rows = [
    {
      original: "Tengo una alergia",
      translation: "I have an allergy",
      pronunciation: "Ten-go oo-na a-ler-hee-a"
    },
    {
      original: "Soy alérgico/a al gluten",
      translation: "I am allergic to gluten",
      pronunciation: "Soy a-ler-hee-ko/ka al gloo-ten"
    },
    {
      original: "¿Este plato contiene frutos secos?",
      translation: "Does this dish contain nuts?",
      pronunciation: "Es-te pla-to con-tee-e-ne froo-tos se-kos"
    }
  ];

  const destination = {
    id: "barcelona",
    name: "Barcelona",
    image: "photo-1583422409516-2895a77efded",
    country: "Spain",
    subtitle: "Allergy-Friendly Guide to the Catalan Capital",
    description: "Allergy-Friendly Hotels in Barcelona"
  };

  return (
    <div className="min-h-screen bg-background">
      <DestinationNavigation 
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />
      
      <DestinationHero destination={destination} />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Discover Barcelona</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Barcelona, the vibrant capital of Catalonia, offers a unique blend of stunning architecture, Mediterranean cuisine, 
              and lively culture. For travelers with food allergies, the city presents both challenges and opportunities.
            </p>
            <p className="text-lg text-muted-foreground">
              While traditional Spanish cuisine often incorporates common allergens like seafood, gluten, and nuts, 
              Barcelona's international outlook and increasing awareness of dietary restrictions make it increasingly accessible 
              for allergy-conscious travelers.
            </p>
          </div>

          <HotelSection hotels={barcelonaHotels} />

          <TravelTips />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Essential Spanish Phrases</h3>
              <LanguageTable 
                headers={headers}
                rows={rows}
                destinationName="Barcelona"
              />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Common Allergies in Spanish</h3>
              <AllergiesTable />
            </div>
          </div>

          <UsefulInfo />
          
          <DestinationReviews destinationId="barcelona" />
          
          <RelatedDestinations currentDestinationId="barcelona" />
        </div>
      </div>
    </div>
  );
};

export default Barcelona;
