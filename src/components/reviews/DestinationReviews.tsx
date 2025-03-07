
import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import { RelatedDestinations } from "./RelatedDestinations";
import { LanguageCode, destinations, DestinationId, destinationData } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";

interface DestinationPageProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId];

  useEffect(() => {
    if (destination) {
      document.title = `Best Allergy-Friendly Hotels in ${destination.name} | Safe Travel for Food Allergies`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Discover the best allergy-friendly hotels in ${destination.name}. Safe accommodations for celiac, gluten-free, nut-free, and dairy-free travelers. Read real guest reviews!`
        );
      }
    }
  }, [destination]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl -mt-16 sm:-mt-20 relative z-10 flex-grow">
        <DestinationNavigation 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />

        <article className="space-y-6 sm:space-y-8 md:space-y-12 text-left">
          <header className="space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground">
              🏨 {destination.description}
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            
            <section className="mt-4 sm:mt-6 md:mt-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-2 sm:mb-3 md:mb-4">
                🔍 Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {content.intro}
              </p>
              
              {destinationId === 'london' && (
                <ul className="mt-4 space-y-2 text-sm sm:text-base text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Certified allergy-aware kitchens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Gluten-free, nut-free, and dairy-free menu options</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Staff trained in handling severe allergies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✅</span>
                    <span>Hypoallergenic rooms with air purifiers</span>
                  </li>
                </ul>
              )}
            </section>
          </header>

          <Separator />

          <section className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold">
              🏆 Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 sm:gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <div key={index}>
                  <HotelCard {...hotel} />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-3 sm:space-y-4 md:space-y-6">
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold">
              📢 FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-3 sm:gap-4 md:gap-6">
              {content.faqs.map((faq, index) => (
                <div key={index} className="space-y-1 sm:space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <TravelTips />

          {content.languageTable.headers.length > 0 && (
            <div className="overflow-x-auto -mx-3 sm:mx-0">
              <div className="min-w-full p-3 sm:p-0">
                <LanguageTable 
                  headers={content.languageTable.headers}
                  rows={content.languageTable.rows}
                  destinationName={destination.name}
                />
              </div>
            </div>
          )}

          <RelatedDestinations currentDestinationId={destinationId} />
          
          {destinationId === 'london' && (
            <section className="space-y-3 sm:space-y-4 md:space-y-6 bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold">
                📢 Share Your Experience!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Have you stayed in an allergy-friendly hotel in London? Help others by leaving a review!
              </p>
              <p className="text-sm sm:text-base font-medium">
                🔔 Subscribe for updates on new allergy-friendly hotels and travel tips.
              </p>
            </section>
          )}
        </article>
      </main>

      <Footer />
    </div>
  );
};
