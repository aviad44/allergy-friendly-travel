
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
import { SocialTags } from "@/components/SocialTags";
import { DESTINATION_OG_IMAGES } from "@/utils/socialSharing";

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
  const textAlignment = isRTL ? 'text-right' : 'text-left';
  
  // Get proper social sharing information
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  const canonicalUrl = `${baseUrl}/destinations/${destinationId}`;
  const imageUrl = DESTINATION_OG_IMAGES[destinationId];
  const destName = destination?.name || destinationId.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  // Enhanced debug logging for social sharing
  console.log(`DestinationReviews for ${destinationId}`);
  console.log(`Social Image: ${imageUrl}`);
  console.log(`Canonical URL: ${canonicalUrl}`);
  
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

  if (!destination) return null;

  return (
    <>
      <SocialTags 
        title={`Allergy-Friendly Hotels in ${destName} | Safe Dining Guide`}
        description={`Discover the best allergy-friendly hotels in ${destName}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      
      <div className={`min-h-screen bg-background ${textAlignment}`} dir={isRTL ? 'rtl' : 'ltr'}>
        <DestinationHero destination={destination} />
        
        <div className="container mx-auto px-4 py-8 max-w-5xl">
          <DestinationHeader 
            name={destination.name}
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
          
          <Separator className="my-8" />
          
          {/* Display intro content if available */}
          {content?.intro && (
            <IntroSection 
              intro={content.intro} 
              destinationName={destination.name}
            />
          )}
          
          {/* Display hotels if available */}
          {content?.hotels && content.hotels.length > 0 && (
            <>
              <Separator className="my-8" />
              <TopHotelsSection hotels={content.hotels} />
            </>
          )}
          
          {/* Display restaurants if available */}
          {content?.restaurants && content.restaurants.length > 0 && (
            <>
              <Separator className="my-8" />
              <RestaurantsSection restaurants={content.restaurants} />
            </>
          )}
          
          {/* Display long description if available */}
          {content?.longDescription && (
            <>
              <Separator className="my-8" />
              <LongDescriptionSection content={content.longDescription} />
            </>
          )}
          
          {/* Display travel tips if available */}
          {content?.tips && content.tips.length > 0 && (
            <>
              <Separator className="my-8" />
              <TravelTipsSection tips={content.tips} />
            </>
          )}
          
          {/* Display language table if available */}
          {content?.languageTable && (
            <>
              <Separator className="my-8" />
              <LanguageTableSection 
                headers={content.languageTable.headers}
                rows={content.languageTable.rows}
              />
            </>
          )}
          
          {/* Display FAQs if available */}
          {content?.faqs && content.faqs.length > 0 && (
            <>
              <Separator className="my-8" />
              <FAQSection faqs={content.faqs} />
            </>
          )}
          
          <Separator className="my-8" />
          
          {/* Related destinations */}
          <RelatedDestinations currentDestination={destinationId} />
          
          {/* Share experience */}
          <Separator className="my-8" />
          <ShareExperienceSection destinationName={destination.name} />
        </div>
      </div>
    </>
  );
};
