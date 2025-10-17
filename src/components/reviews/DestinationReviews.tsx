
import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { LanguageCode, Destination, DestinationId } from "@/types/definitions";
import { Separator } from "@/components/ui/separator";
import { DestinationHeader } from "./DestinationHeader";
import { IntroSection } from "./IntroSection";
import { TopHotelsSection } from "./TopHotelsSection";
import { FAQSection } from "./FAQSection";
import { ShareExperienceSection } from "./ShareExperienceSection";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations-list";
import { destinationData } from "@/data/destination-data";
import { RestaurantsSection } from "./RestaurantsSection";
import { LongDescriptionSection } from "./LongDescriptionSection";
import { TravelTipsSection } from "./TravelTipsSection";
import { LanguageTableSection } from "./LanguageTableSection";
import { RelatedDestinations } from "./RelatedDestinations";

interface DestinationPageProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId];
  const isLondon = destinationId === 'london' as DestinationId;
  const isAthens = destinationId === 'athens' as DestinationId;
  const isEilat = destinationId === 'eilat' as DestinationId;
  const isStockholm = destinationId === 'stockholm' as DestinationId;
  const isFlyingWithEpipensNA = destinationId === 'flying-with-epipens-north-america' as DestinationId;
  const textAlignment = isRTL ? 'text-right' : 'text-left';
  
  // Enhanced debug logging to ensure data is loaded
  console.log(`Destination ID: ${destinationId}`);
  console.log(`Loading destination: ${destinationId}`, { 
    contentExists: !!content,
    hotels: content?.hotels?.length || 0,
    restaurants: content?.restaurants?.length || 0,
    faqs: content?.faqs?.length || 0,
    languageTable: !!content?.languageTable,
    intro: !!content?.intro,
    longDescription: !!content?.longDescription,
    destinationData: Object.keys(destinationData)
  });

  useEffect(() => {
    // Check if content is missing and log warning
    if (!content || (!content.hotels || content.hotels.length === 0) && (!content.restaurants || content.restaurants.length === 0)) {
      console.error(`Warning: Missing or incomplete content for destination ${destinationId}`);
      toast.error(`Some content for ${destination?.name || destinationId} may be unavailable`, {
        description: "Our team has been notified about this issue."
      });
    }
  }, [destinationId, content, destination?.name]);

  // If destination doesn't exist, redirect to 404
  useEffect(() => {
    if (!destination) {
      console.error(`Destination not found: ${destinationId}`);
      navigate('/not-found', { replace: true });
    }
  }, [destination, destinationId, navigate]);

  // Debug logging
  if (content?.hotels) {
    console.log(`Hotel data for ${destinationId}:`, content.hotels.slice(0, 1));
  }
  if (content?.restaurants) {
    console.log(`Restaurant data for ${destinationId}:`, content.restaurants.slice(0, 1));
  }

  // Safely prepare intro content
  let introContent: string | string[] = "Find safe and comfortable accommodations for travelers with dietary restrictions.";
  if (content?.intro) {
    if (typeof content.intro === 'object' && !Array.isArray(content.intro)) {
      // Handle the new object format with title/description/quickTip
      introContent = content.intro.description || content.intro.title || "Find safe and comfortable accommodations for travelers with dietary restrictions.";
    } else {
      introContent = content.intro;
    }
  }

  if (!destination) {
    console.error(`Missing destination data for: ${destinationId}`);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading destination information...</p>
      </div>
    );
  }

  // Show warning for missing content
  if (!content) {
    console.error(`Missing content data for: ${destinationId}`);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-3 sm:px-5 lg:px-6 py-4 sm:py-6 -mt-14 sm:-mt-16 relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-5 sm:p-6">
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

            {/* Display restaurants for Athens and Stockholm, long description for Eilat and flying-with-epipens, skip hotels for airlines, hotels for other destinations */}
            {(isAthens || isStockholm) ? (
              <RestaurantsSection 
                restaurants={content?.restaurants} 
                destinationName={destination.name}
              />
            ) : (isEilat || destinationId === 'flying-with-epipens' || isFlyingWithEpipensNA) ? (
              <LongDescriptionSection 
                longDescription={content?.longDescription} 
                hotel={content?.hotels && content.hotels.length > 0 ? content.hotels[0] : undefined}
              />
            ) : (destinationId === 'airlines') ? null : (
              <TopHotelsSection 
                hotels={content?.hotels || []}
                destinationName={destination.name}
                isLondon={isLondon}
              />
            )}

            <Separator className="bg-primary/10 h-0.5" />

            <FAQSection 
              faqs={content?.faqs || []}
              destinationName={destination.name}
            />

            <TravelTipsSection 
              tips={content?.tips} 
              destinationName={destination.name} 
              isAthens={isAthens}
            />

            <LanguageTableSection 
              languageTable={content?.languageTable}
              textAlignment={textAlignment}
            />

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
