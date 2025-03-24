
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { destinations, type DestinationId } from "@/types/reviews";
import { DESTINATION_IMAGES } from "@/constants/destinations";

export interface RelatedDestinationsProps {
  currentDestination: DestinationId;
  textAlignment?: string;
  title?: string;
}

export const RelatedDestinations = ({ currentDestination, textAlignment = "text-left", title = "Related Destinations" }: RelatedDestinationsProps) => {
  // Get a subset of destinations excluding the current one
  const relatedDestinations = destinations
    .filter(dest => dest.id !== currentDestination)
    .slice(0, 3);  // Only show 3 related destinations

  return (
    <div className="mt-10">
      <h2 className={`text-2xl font-semibold mb-6 ${textAlignment}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedDestinations.map((destination) => {
          // Determine image source (using DESTINATION_IMAGES if available)
          const destinationKey = destination.id as keyof typeof DESTINATION_IMAGES;
          const customImage = destinationKey in DESTINATION_IMAGES ? DESTINATION_IMAGES[destinationKey] : null;
          const imageSource = customImage || destination.image;
          
          // Process image URL based on format
          let imageUrl;
          if (imageSource.startsWith('photo-')) {
            imageUrl = `https://images.unsplash.com/${imageSource}?auto=format&fit=crop&w=800&q=80`;
          } else {
            imageUrl = imageSource;
          }
          
          return (
            <Link key={destination.id} to={`/destinations/${destination.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow overflow-hidden">
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-2 left-3 right-3">
                    <h3 className="text-white font-bold text-lg">{destination.name}</h3>
                    <p className="text-white/80 text-xs">{destination.country}</p>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {destination.subtitle}
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
