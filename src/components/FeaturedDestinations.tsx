
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

const FEATURED_DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    description: "Discover allergy-friendly luxury in the City of Light",
    commonAllergies: ["Gluten", "Dairy", "Nuts"],
    href: "/destinations/paris",
    destId: "paris"
  },
  {
    id: 2,
    name: "London",
    country: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
    description: "Experience safe dining in Britain's capital",
    commonAllergies: ["Dairy", "Seafood"],
    href: "/destinations/london",
    destId: "london"
  },
  {
    id: 3,
    name: "New York",
    country: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    description: "Explore allergy-friendly dining in the Big Apple",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/new-york",
    destId: "new-york"
  },
  {
    id: 4,
    name: "Portugal",
    country: "Portugal",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
    description: "Family and couple-friendly allergy-aware destinations",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/portugal",
    destId: "portugal"
  },
  {
    id: 5,
    name: "Cyprus",
    country: "Cyprus",
    image: "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    description: "Mediterranean cuisine adapted for your needs",
    commonAllergies: ["Gluten", "Nuts"],
    href: "/destinations/cyprus",
    destId: "cyprus"
  },
  {
    id: 6,
    name: "Barcelona",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80",
    description: "Allergy-friendly tapas and Mediterranean delights",
    commonAllergies: ["Gluten", "Shellfish"],
    href: "/destinations/barcelona",
    destId: "barcelona"
  },
  {
    id: 7,
    name: "Crete",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80",
    description: "Traditional Greek cuisine with allergy awareness",
    commonAllergies: ["Dairy", "Nuts"],
    href: "/destinations/crete",
    destId: "crete"
  },
  {
    id: 8,
    name: "Abu Dhabi",
    country: "United Arab Emirates",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80",
    description: "Luxurious stays with world-class allergy care",
    commonAllergies: ["Gluten", "Dairy"],
    href: "/destinations/abu-dhabi",
    destId: "abu-dhabi"
  }
];

export const FeaturedDestinations = () => {
  // Track image loading status for each destination
  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});
  const [destinationImages, setDestinationImages] = useState<Record<string, string>>({});
  
  // Load all destination images from the central constants
  useEffect(() => {
    // Create a mapping of destination IDs to their correct images
    const imageMap: Record<string, string> = {};
    FEATURED_DESTINATIONS.forEach(dest => {
      if (dest.destId) {
        const key = dest.destId as keyof typeof DESTINATION_IMAGES;
        if (DESTINATION_IMAGES[key]) {
          imageMap[dest.destId] = DESTINATION_IMAGES[key];
        } else {
          imageMap[dest.destId] = dest.image; // Fallback to the hardcoded image
        }
      }
    });
    
    setDestinationImages(imageMap);
    
    // Preload the images
    Object.entries(imageMap).forEach(([destId, imageUrl]) => {
      const img = new Image();
      img.src = imageUrl;
      console.log(`FeaturedDestinations: Preloading image for ${destId}: ${imageUrl}`);
    });
  }, []);
  
  // Handle image load success
  const handleImageLoaded = (destId: number) => {
    setLoadedImages(prev => ({...prev, [destId]: true}));
  };
  
  // Handle image load failure - specific fallbacks for each destination
  const handleImageError = (destId: number, event: React.SyntheticEvent<HTMLImageElement>) => {
    console.error(`FeaturedDestinations: Failed to load destination image for ID: ${destId}`);
    
    // Get the destination object
    const dest = FEATURED_DESTINATIONS.find(d => d.id === destId);
    if (!dest) return;
    
    // Try to get image from the centralized constants
    let fallbackUrl;
    if (dest.destId) {
      const key = dest.destId as keyof typeof DESTINATION_IMAGES;
      fallbackUrl = DESTINATION_IMAGES[key];
    }
    
    // If still no image, use a placeholder
    if (!fallbackUrl) {
      fallbackUrl = `https://placehold.co/800x500/1e3a8a/ffffff?text=${dest.name}`;
    }
    
    console.log(`FeaturedDestinations: Using fallback for ${dest.name}: ${fallbackUrl}`);
    (event.target as HTMLImageElement).src = fallbackUrl;
    
    // Mark as loaded after a brief delay to allow fallback to load
    setTimeout(() => {
      handleImageLoaded(destId);
    }, 100);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURED_DESTINATIONS.slice(0, 6).map((destination) => {
          // Get the image from our centralized constants if available
          const imageToUse = destination.destId && destinationImages[destination.destId] 
            ? destinationImages[destination.destId] 
            : destination.image;
            
          return (
            <Link to={destination.href} key={destination.id}>
              <Card className="overflow-hidden group cursor-pointer h-full hover:shadow-xl transition-all duration-300 border-gray-200">
                <div className="relative aspect-[16/10] overflow-hidden bg-blue-100">
                  {/* Loading placeholder */}
                  {!loadedImages[destination.id] && (
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-200 to-blue-100 animate-pulse"></div>
                  )}
                  
                  <img
                    src={imageToUse}
                    alt={destination.name === "Cyprus" 
                      ? "Beautiful beach in Cyprus - Best allergy-friendly destination for family vacations"
                      : destination.name === "Hotel Chains"
                        ? "Luxury hotel exterior with swimming pool - Top allergy-friendly hotel chains worldwide"
                        : `${destination.name}, ${destination.country} - Allergy-friendly travel destination with ${destination.commonAllergies.join(" and ")} free options`
                    }
                    className={`object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 brightness-110 saturate-105 ${loadedImages[destination.id] ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => handleImageLoaded(destination.id)}
                    onError={(e) => handleImageError(destination.id, e)}
                    loading="eager" // Use eager loading for featured destinations
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
          );
        })}
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
