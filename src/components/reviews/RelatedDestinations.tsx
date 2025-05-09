
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

  return (
    <div className={`space-y-4 ${textAlignment}`}>
      <h2 className="text-xl font-display font-semibold mb-4">
        Explore More Allergy-Friendly Destinations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {randomDestinations.map(destination => {
          // Get the proper image source with special case handling
          let imageUrl;
          
          // Special handling for problematic destinations
          if (destination.id === 'hotel-chains') {
            imageUrl = "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png";
          } else if (destination.id === 'cyprus') {
            imageUrl = "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png";
          } else if (destination.id === 'crete') {
            imageUrl = "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=600&h=400&q=80";
          } else if (destination.id === 'turkey') {
            imageUrl = "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
          } else if (destination.id === 'toronto') {
            imageUrl = "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png";
          } else {
            // Standard processing for other destinations
            const destinationKey = destination.id as keyof typeof DESTINATION_IMAGES;
            const imageSource = DESTINATION_IMAGES[destinationKey] || '';
            
            if (imageSource.startsWith('photo-')) {
              imageUrl = `https://images.unsplash.com/${imageSource}?auto=format&fit=crop&w=600&h=400&q=80`;
            } else if (imageSource.startsWith('/lovable-uploads/') || imageSource.startsWith('http')) {
              imageUrl = imageSource;
            } else {
              imageUrl = `https://placehold.co/600x400/1e3a8a/ffffff?text=${destination.name}`;
            }
          }

          return (
            <Link 
              key={destination.id} 
              to={`/destinations/${destination.id}`}
              className="group block"
            >
              <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                <div 
                  className="h-32 bg-cover bg-center" 
                  style={{ 
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: 'center center',
                    backgroundRepeat: "no-repeat"
                  }}
                />
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
