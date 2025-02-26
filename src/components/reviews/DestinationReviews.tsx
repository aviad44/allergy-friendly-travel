
import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import { RelatedDestinations } from "./RelatedDestinations";
import { LanguageCode, destinations, DestinationId, destinationData } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";

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
      document.title = `Best Allergy-Friendly Hotels in ${destination.name} | Hypoallergenic Stays & Dining`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Find the best allergy-friendly hotels in ${destination.name}. Enjoy safe stays with hypoallergenic rooms, allergy-conscious dining, and top-rated services for food-sensitive travelers.`
        );
      }
    }
  }, [destination]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10">
        <DestinationNavigation 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />

        <article className="space-y-8 md:space-y-12 text-left">
          <header className="space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4">
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {content.intro}
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <div key={index}>
                  <HotelCard {...hotel} />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 md:gap-6">
              {content.faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
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
            <div className="overflow-x-auto">
              <LanguageTable 
                headers={content.languageTable.headers}
                rows={content.languageTable.rows}
                destinationName={destination.name}
              />
            </div>
          )}

          <RelatedDestinations currentDestinationId={destinationId} />
        </article>
      </main>
    </div>
  );
};
