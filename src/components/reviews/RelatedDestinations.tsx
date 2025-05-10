
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
  
  // Get reliable image source for each destination
  const getImageSource = (destinationId: string): string => {
    // Get image from our centralized constants - primary source
    const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
    if (DESTINATION_IMAGES[destKey]) {
      console.log(`RelatedDestinations: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
      
      // For Unsplash URLs, ensure we have the right size parameters
      let imgSrc = DESTINATION_IMAGES[destKey];
      if (imgSrc.includes('unsplash.com') && !imgSrc.includes('?')) {
        imgSrc += '?auto=format&fit=crop&w=600&h=400&q=80';
      } else if (imgSrc.includes('pexels.com') && !imgSrc.includes('?')) {
        imgSrc += '?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1';
      }
      return imgSrc;
    }
    
    // Default placeholder for any other destination
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
          
          // Determine the appropriate alt text
          let altText = `${destination.name} - Allergy-friendly destination in ${destination.country}`;
          if (destination.id === 'hotel-chains') {
            altText = `Luxury resort - Top allergy-friendly hotel chains worldwide`;
          }
          
          return (
            <Link 
              key={destination.id} 
              to={`/destinations/${destination.id}`}
              className="group block"
            >
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div className="h-32 relative bg-blue-100">
                  {/* Use an error handler to ensure fallbacks */}
                  <img 
                    src={imageUrl}
                    alt={altText}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error(`Failed to load image for ${destination.name}`);
                      const fallbackUrl = `https://placehold.co/600x400/1e3a8a/ffffff?text=${destination.name}`;
                      (e.target as HTMLImageElement).src = fallbackUrl;
                    }}
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>
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
