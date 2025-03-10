
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { destinations, DestinationId } from "@/types/reviews";
import { DESTINATION_IMAGES } from "@/constants/destinations";

// Define geographical relationships between destinations
const RELATED_DESTINATIONS: Record<DestinationId, DestinationId[]> = {
  'paris': ['london' as DestinationId, 'barcelona' as DestinationId],
  'london': ['paris' as DestinationId],
  'cyprus': ['crete', 'ayia-napa'],
  'crete': ['cyprus'],
  'barcelona': ['paris'],
  'ayia-napa': ['cyprus'],
  'abu-dhabi': [],
  'thailand': ['abu-dhabi'] // Adding Thailand with Abu Dhabi as related due to similar luxury standards
};

interface RelatedDestinationsProps {
  currentDestinationId: DestinationId;
}

export const RelatedDestinations = ({ currentDestinationId }: RelatedDestinationsProps) => {
  const relatedIds = RELATED_DESTINATIONS[currentDestinationId] || [];
  const relatedDestinations = destinations.filter(d => relatedIds.includes(d.id as DestinationId));

  if (relatedDestinations.length === 0) return null;

  const getImageUrl = (destinationId: string) => {
    const imageKey = destinationId as keyof typeof DESTINATION_IMAGES;
    if (imageKey in DESTINATION_IMAGES) {
      const imagePath = DESTINATION_IMAGES[imageKey];
      if (imagePath.startsWith('photo-')) {
        return `https://images.unsplash.com/${imagePath}?auto=format&fit=crop&w=800&q=80`;
      }
      return imagePath;
    }
    // Fallback to the original image
    const dest = destinations.find(d => d.id === destinationId);
    if (dest?.image.startsWith('photo-')) {
      return `https://images.unsplash.com/${dest.image}?auto=format&fit=crop&w=800&q=80`;
    }
    return dest?.image || '';
  };

  return (
    <section className="mt-12 space-y-6">
      <h2 className="text-xl sm:text-2xl font-display font-semibold">
        Related Allergy-Friendly Destinations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedDestinations.map((destination) => (
          <Link to={`/destinations/${destination.id}`} key={destination.id}>
            <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow duration-300">
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={getImageUrl(destination.id)}
                  alt={`${destination.name}, ${destination.country} - Related allergy-friendly travel destination`}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-display text-xl mb-1">{destination.name}</h3>
                  <p className="text-sm text-white/90">{destination.country}</p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
