
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useState } from "react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    description: "Discover allergy-friendly luxury in the City of Light",
    commonAllergies: ["Gluten", "Dairy", "Nuts"],
    href: "/destinations/paris",
    destId: "paris"
  },
  {
    id: 2,
    name: "London",
    country: "United Kingdom",
    description: "Experience safe dining in Britain's capital",
    commonAllergies: ["Dairy", "Seafood"],
    href: "/destinations/london",
    destId: "london"
  },
  {
    id: 3,
    name: "New York",
    country: "United States",
    description: "Explore allergy-friendly dining in the Big Apple",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/new-york",
    destId: "new-york"
  },
  {
    id: 4,
    name: "Portugal",
    country: "Portugal",
    description: "Family and couple-friendly allergy-aware destinations",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/portugal",
    destId: "portugal"
  },
  {
    id: 5,
    name: "Cyprus",
    country: "Cyprus",
    description: "Mediterranean cuisine adapted for your needs",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/cyprus",
    destId: "cyprus"
  },
  {
    id: 6,
    name: "Barcelona",
    country: "Spain",
    description: "Allergy-friendly tapas and Mediterranean delights",
    commonAllergies: ["Gluten", "Shellfish"],
    href: "/destinations/barcelona",
    destId: "barcelona"
  },
  {
    id: 7,
    name: "Crete",
    country: "Greece",
    description: "Traditional Greek cuisine with allergy awareness",
    commonAllergies: ["Dairy", "Nuts"],
    href: "/destinations/crete",
    destId: "crete"
  },
  {
    id: 8,
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    description: "Luxurious stays with world-class allergy care",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/abu-dhabi",
    destId: "abu-dhabi"
  }
];

export const FeaturedDestinations = () => {
  // Track image loading status for each destination
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  
  // Get image source from our constants
  const getDestinationImage = (destId: string): string => {
    const key = destId as keyof typeof DESTINATION_IMAGES;
    if (key in DESTINATION_IMAGES) {
      return DESTINATION_IMAGES[key];
    }
    return `https://placehold.co/800x500/1e3a8a/ffffff?text=${destId.replace(/-/g, ' ')}`;
  };
  
  // Handle image load success
  const handleImageLoaded = (destId: number) => {
    setLoadedImages(prev => ({...prev, [destId]: true}));
  };
  
  // Handle image load failure - get from constants
  const handleImageError = (destId: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`FeaturedDestinations: Failed to load destination image for ID: ${destId}`);
    
    // Get the destination object
    const dest = FEATURED_DESTINATIONS.find(d => d.id === destId);
    if (!dest) return;
    
    // Get from our constants file
    if (dest.destId) {
      const fallbackUrl = getDestinationImage(dest.destId);
      console.log(`FeaturedDestinations: Using fallback from constants for ${dest.name}: ${fallbackUrl}`);
      (event.target as HTMLImageElement).src = fallbackUrl;
    }
    
    // Mark as loaded after a brief delay to allow fallback to load
    setTimeout(() => {
      handleImageLoaded(destId);
    }, 100);
  };

  // Preload all images
  React.useEffect(() => {
    FEATURED_DESTINATIONS.forEach(dest => {
      if (dest.destId) {
        const img = new Image();
        const imgSrc = getDestinationImage(dest.destId);
        img.src = imgSrc;
        console.log(`Preloading: ${dest.name} - ${imgSrc}`);
      }
    });
  }, []);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_DESTINATIONS.slice(0, 6).map((destination) => (
          <Link to={destination.href} key={destination.id}>
            <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-xl transition-all duration-300 border-gray-200">
              <div className="relative aspect-[16/10] overflow-hidden bg-blue-100">
                {/* Loading placeholder */}
                {!loadedImages[destination.id] && (
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-blue-100 animate-pulse"></div>
                )}
                
                <img
                  src={destination.destId ? getDestinationImage(destination.destId) : ''}
                  alt={destination.name === "Cyprus" 
                    ? "Beautiful beach in Cyprus - Best allergy-friendly destination for family vacations"
                    : `${destination.name}, ${destination.country} - Allergy-friendly travel destination with ${destination.commonAllergies.join(" and ")} free options`
                  }
                  className={`object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 brightness-110 saturate-105 ${loadedImages[destination.id] ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => handleImageLoaded(destination.id)}
                  onError={(e) => handleImageError(destination.id, e)}
                  loading="eager" 
                  width="600" 
                  height="375"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-display text-2xl md:text-2xl lg:text-3xl font-bold mb-1 drop-shadow-md">{destination.name}</h3>
                  <p className="text-sm md:text-base text-white/90">{destination.country}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-muted-foreground mb-3 text-sm md:text-base">{destination.description}</p>
                <div className="flex flex-wrap gap-2">
                  {destination.commonAllergies.map((allergy) => (
                    <span
                      key={allergy}
                      className="text-xs flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full"
                    >
                      <Shield className="h-3 w-3" />
                      {allergy}-free options
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Link to="/destinations">
          <Button variant="secondary" size="lg" className="gap-2 group hover:bg-blue-600 hover:text-white transition-colors duration-300 shadow-md border border-gray-200">
            More Destinations
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
