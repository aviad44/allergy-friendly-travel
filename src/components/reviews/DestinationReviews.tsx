
import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { RelatedDestinations } from "./RelatedDestinations";
import { LanguageCode, destinations, DestinationId, destinationData } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";
import { DestinationHeader } from "./DestinationHeader";
import { IntroSection } from "./IntroSection";
import { TopHotelsSection } from "./TopHotelsSection";
import { FAQSection } from "./FAQSection";
import { ShareExperienceSection } from "./ShareExperienceSection";
import { Globe } from "lucide-react";

interface DestinationPageProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId];
  const isLondon = destinationId === 'london' as DestinationId;
  const textAlignment = isRTL ? 'text-right' : 'text-left';
  
  // Enhanced debug logging
  console.log(`Destination ID: ${destinationId}`);
  console.log(`Loading destination: ${destinationId}`, { 
    content, 
    hotels: content?.hotels,
    faqs: content?.faqs,
    languageTable: content?.languageTable,
    intro: content?.intro,
    destinationData
  });

  // Ensure we have a valid intro as a string
  const introContent = content?.intro ? 
    (typeof content.intro === 'string' ? content.intro : 
     (Array.isArray(content.intro) ? content.intro.join(' ') : 
      "Find safe and comfortable accommodations for travelers with dietary restrictions.")) : 
    "Find safe and comfortable accommodations for travelers with dietary restrictions.";

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

  if (!destination) {
    console.error(`Missing destination data for: ${destinationId}`);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading destination information...</p>
      </div>
    );
  }

  // Ensure we have at least minimal content for missing destinations
  if (!content) {
    console.error(`Missing content data for: ${destinationId}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6 -mt-14 sm:-mt-16 relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-5 sm:p-6">
          <DestinationNavigation 
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />

          <article className="space-y-6 sm:space-y-8 text-left">
            <DestinationHeader 
              destinationName={destination.name}
              isLondon={isLondon}
              description={destination.description}
              subtitle={destination.subtitle}
            />
            
            <IntroSection 
              intro={introContent}
              destinationName={destination.name}
              isLondon={isLondon}
            />

            <Separator className="bg-primary/10 h-0.5" />

            <TopHotelsSection 
              hotels={content?.hotels || []}
              destinationName={destination.name}
              isLondon={isLondon}
            />

            <Separator className="bg-primary/10 h-0.5" />

            <FAQSection 
              faqs={content?.faqs || []}
              destinationName={destination.name}
            />

            <TravelTips />

            {content?.languageTable && content.languageTable.headers && content.languageTable.headers.length > 0 && (
              <div className="overflow-x-auto -mx-3 sm:mx-0 bg-primary/5 p-4 rounded-xl">
                <div className="min-w-full p-3 sm:p-0">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-4 flex items-center">
                    <Globe className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
                    Essential Phrases for Allergy Travelers
                  </h2>
                  <LanguageTable 
                    data={content?.languageTable || { headers: [], rows: [] }}
                    textAlignment={textAlignment}
                  />
                </div>
              </div>
            )}

            <RelatedDestinations 
              currentDestination={destinationId} 
              textAlignment={textAlignment}
            />
            
            <ShareExperienceSection 
              destinationName={destination.name}
              isLondon={isLondon}
            />
          </article>
        </div>
      </main>
    </div>
  );
};
