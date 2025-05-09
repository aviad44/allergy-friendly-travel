import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { destinations, DestinationId } from "@/types/reviews";

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
  
  // Direct hardcoded image paths for ALL destinations to ensure reliability
  const getImageSource = (destinationId: string): string => {
    // Hardcoded paths for problematic destinations - ALWAYS use these first
    const directImageMap: Record<string, string> = {
      'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=600&h=400&q=80",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=600&h=400&q=80",
      // Other reliable Unsplash URLs for common destinations
      'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&h=400&q=80",
      'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80",
      'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=600&h=400&q=80",
      'swiss-alps': "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=600&h=400&q=80",
      'abu-dhabi': "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=600&h=400&q=80",
      'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=600&h=400&q=80",
      'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=600&h=400&q=80",
      'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&h=400&q=80",
      'cruise-lines': "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=600&h=400&q=80",
      'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=600&h=400&q=80"
    };
    
    // Check if we have a direct mapping for this destination
    if (destinationId in directImageMap) {
      console.log(`RelatedDestinations: Using direct image for ${destinationId}: ${directImageMap[destinationId]}`);
      return directImageMap[destinationId];
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
