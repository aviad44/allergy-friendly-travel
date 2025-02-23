
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { destinations, DestinationId } from "@/types/reviews";

// Define geographical relationships between destinations
const RELATED_DESTINATIONS: Record<DestinationId, DestinationId[]> = {
  'paris': ['london'],
  'london': ['paris'],
  'cyprus': ['crete', 'ayia-napa'],
  'crete': ['cyprus'],
  'barcelona': ['paris'],
  'ayia-napa': ['cyprus'],
  'abu-dhabi': [] // Currently no related destinations until Dubai is added
};

interface RelatedDestinationsProps {
  currentDestinationId: DestinationId;
}

export const RelatedDestinations = ({ currentDestinationId }: RelatedDestinationsProps) => {
  const relatedIds = RELATED_DESTINATIONS[currentDestinationId] || [];
  const relatedDestinations = destinations.filter(d => relatedIds.includes(d.id as DestinationId));

  if (relatedDestinations.length === 0) return null;

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('photo-')) {
      return `https://images.unsplash.com/photo-${imagePath.replace('photo-', '')}?auto=format&fit=crop&w=800&q=80`;
    }
    return imagePath.startsWith('lovable-uploads/') ? `/${imagePath}` : `/${imagePath}`;
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
                  src={getImageUrl(destination.image)}
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
