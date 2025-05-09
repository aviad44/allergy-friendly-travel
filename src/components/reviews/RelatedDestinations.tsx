
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { destinations, DestinationId } from "@/types/reviews";
import { DESTINATION_IMAGES } from "@/constants/destinations";

export interface RelatedDestinationsProps {
  currentDestination: DestinationId;
  textAlignment?: string;
}

export const RelatedDestinations = ({ currentDestination, textAlignment = "text-left" }: RelatedDestinationsProps) => {
  // Get all destinations except the current one
  const relatedDestinations = destinations.filter(dest => dest.id !== currentDestination);
  
  // Select 3 random destinations
  const randomDestinations = relatedDestinations
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  if (randomDestinations.length === 0) return null;
  
  // Get image source directly from constants
  const getImageSource = (destinationId: string): string => {
    const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
    
    // Get from our constants file
    if (destKey in DESTINATION_IMAGES) {
      console.log(`RelatedDestinations: Using image from constants for ${destinationId}`);
      return DESTINATION_IMAGES[destKey];
    }
    
    // Default placeholder
    return `https://placehold.co/600x400/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
  };

  return (
    <div className={`space-y-4 ${textAlignment}`}>
      <h2 className="text-xl font-display font-semibold mb-4">
        Explore More Allergy-Friendly Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {randomDestinations.map(destination => {
          // Always get image from our reliable mapping function
          const imageUrl = getImageSource(destination.id);
          
          return (
            <Link 
              key={destination.id} 
              to={`/destinations/${destination.id}`}
              className="group block"
            >
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div 
                  className="h-32 bg-cover bg-center relative"
                >
                  <img
                    src={imageUrl}
                    alt={`${destination.name}, ${destination.country} - Allergy-friendly destination`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      console.error(`RelatedDestinations: Failed to load image for ${destination.name}`);
                      (e.target as HTMLImageElement).src = `https://placehold.co/600x400/1e3a8a/ffffff?text=${destination.name}`;
                    }}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {destination.country}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
