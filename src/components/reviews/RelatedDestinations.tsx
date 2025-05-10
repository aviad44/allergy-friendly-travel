
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
    // Critical destinations with direct hardcoded paths - HIGHEST PRIORITY
    const criticalImageMap: Record<string, string> = {
      'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=600&h=400&q=80",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&h=400&q=80"
    };
    
    // Always check our critical destinations first
    if (destinationId in criticalImageMap) {
      console.log(`RelatedDestinations: Using critical direct image for ${destinationId}: ${criticalImageMap[destinationId]}`);
      return criticalImageMap[destinationId];
    }
    
    // Look up in our centralized constants - second priority
    if (destinationId in DESTINATION_IMAGES) {
      const key = destinationId as keyof typeof DESTINATION_IMAGES;
      console.log(`RelatedDestinations: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[key]}`);
      
      // For Unsplash URLs, ensure we have the right size parameters
      let imgSrc = DESTINATION_IMAGES[key];
      if (imgSrc.includes('unsplash.com') && !imgSrc.includes('?')) {
        imgSrc += '?auto=format&fit=crop&w=600&h=400&q=80';
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
                    alt={`${destination.name} - Allergy-friendly destination in ${destination.country}`}
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
