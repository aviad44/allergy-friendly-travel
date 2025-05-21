import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { LanguageTable } from "./LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { RelatedDestinations } from "./RelatedDestinations";
import { LanguageCode, Destination, DestinationId } from "@/types/definitions";
import { Separator } from "@/components/ui/separator";
import { DestinationHeader } from "./DestinationHeader";
import { IntroSection } from "./IntroSection";
import { TopHotelsSection } from "./TopHotelsSection";
import { FAQSection } from "./FAQSection";
import { ShareExperienceSection } from "./ShareExperienceSection";
import { Globe, MapPin, Utensils, Star, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { destinations } from "@/data/destinations-list";
import { destinationData } from "@/data/destination-data";

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

  if (content?.hotels) {
    console.log(`Hotel data for ${destinationId}:`, content.hotels.slice(0, 1)); // Log first hotel as sample
  }

  if (content?.restaurants) {
    console.log(`Restaurant data for ${destinationId}:`, content.restaurants.slice(0, 1)); // Log first restaurant as sample
  }

  // Safely prepare intro content
  let introContent: string | string[] = "Find safe and comfortable accommodations for travelers with dietary restrictions.";
  if (content?.intro) {
    introContent = content.intro;
  }

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

  // Render restaurants section for Athens
  const renderRestaurantsSection = () => {
    if (!isAthens || !content?.restaurants || content.restaurants.length === 0) {
      return null;
    }
    
    return (
      <section className="mt-8 space-y-6">
        <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
          <Utensils className="h-6 w-6 text-primary/80" aria-hidden="true" />
          Top 10 Gluten-Free Restaurants in Athens
        </h2>
        
        <div className="grid gap-6 md:grid-cols-2">
          {content.restaurants.map((restaurant) => (
            <div 
              key={restaurant.id}
              className={`border rounded-lg p-5 shadow-sm transition-all hover:shadow-md ${
                restaurant.isPurelyAllergyFriendly 
                  ? "border-l-4 border-l-green-500 bg-green-50" 
                  : "border-l-4 border-l-blue-400"
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                {restaurant.isPurelyAllergyFriendly && (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    100% Gluten-Free
                  </span>
                )}
              </div>
              
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{restaurant.location}</span>
              </div>
              
              <div className="mb-3">
                {restaurant.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              
              {restaurant.guestReview && (
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <div className="flex items-center mb-1">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Guest Review:</span>
                  </div>
                  <p className="text-sm italic">"{restaurant.guestReview}"</p>
                </div>
              )}
              
              {restaurant.website && (
                <a 
                  href={restaurant.website}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                  Visit website
                  <ExternalLink className="h-4 w-4 ml-1" />
                </a>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // Render long description for Eilat
  const renderLongDescription = () => {
    if (!isEilat || !content?.longDescription) {
      return null;
    }
    
    return (
      <section className="mt-8 space-y-4">
        <div 
          className="prose prose-sm sm:prose max-w-none"
          dangerouslySetInnerHTML={{ __html: content.longDescription }}
        />
      </section>
    );
  };

  // Render bonus tools for destinations
  const renderBonusTools = () => {
    if (!content?.bonusTools || content.bonusTools.length === 0) {
      return null;
    }
    
    return (
      <div className="mt-8 bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-4">Helpful Resources</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.bonusTools.map((tool, index) => (
            <a 
              key={index}
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 bg-white rounded-lg border border-blue-100 hover:bg-blue-50 transition-colors"
            >
              <div>
                <h4 className="font-medium text-blue-600">{tool.name}</h4>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
              <ExternalLink className="h-5 w-5 ml-auto text-blue-400" />
            </a>
          ))}
        </div>
      </div>
    );
  };

  // Render travel tips for destinations
  const renderTravelTips = () => {
    if (!content?.tips || content.tips.length === 0) {
      return <TravelTips />;
    }
    
    return (
      <div className="bg-amber-50 p-6 rounded-xl my-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Star className="h-5 w-5 mr-2 text-amber-500" /> 
          Gluten-Free Travel Tips for Athens
        </h3>
        <ul className="space-y-3">
          {content.tips.map((tip, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mr-3">
                {index + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

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

            {/* Display restaurants for Athens, long description for Eilat, hotels for other destinations */}
            {isAthens ? (
              renderRestaurantsSection()
            ) : isEilat ? (
              renderLongDescription()
            ) : (
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

            {renderTravelTips()}

            {renderBonusTools()}

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
