
import { Destination } from "@/types/reviews";
import { Luggage, UtensilsCrossed, Hotel } from "lucide-react";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { useState, useEffect } from "react";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  // Check if we have a custom image defined in DESTINATION_IMAGES
  const destinationKey = destination.id as keyof typeof DESTINATION_IMAGES;
  const customImage = destinationKey in DESTINATION_IMAGES ? DESTINATION_IMAGES[destinationKey] : null;
  
  // Use custom image if available, otherwise fall back to destination.image
  const imageSource = customImage || destination.image;
  
  // Determine the image URL based on format
  const getImageUrl = () => {
    if (imageSource.startsWith('photo-')) {
      return `https://images.unsplash.com/${imageSource}?auto=format&fit=crop&w=2000&h=1000&q=80`;
    } else if (imageSource.startsWith('/lovable-uploads/')) {
      return imageSource;
    } else {
      return imageSource;
    }
  };
  
  const imageUrl = getImageUrl();
  
  // Define a more descriptive alt text based on the destination
  const altText = destination.name 
    ? `Scenic view of ${destination.name} - allergy-friendly travel destination with hotels and accommodations for travelers with dietary restrictions`
    : "Beautiful travel destination for allergy-friendly accommodation";
    
  // Log image info for debugging
  useEffect(() => {
    console.log("Destination ID:", destination.id);
    console.log("Image source:", imageSource);
    console.log("Image URL used:", imageUrl);
  }, [destination.id, imageSource, imageUrl]);

  // Fallback image in case the main one fails
  const fallbackImage = "/placeholder.svg";

  return (
    <div 
      className="h-[35vh] sm:h-[40vh] md:h-[50vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      {/* Primary Image */}
      <div className="absolute inset-0">
        {!imageFailed && (
          <img 
            src={imageUrl}
            alt={altText}
            className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error(`Failed to load image for ${destination.name}: ${imageUrl}`);
              setImageFailed(true);
              // No need to set target.src as we'll render the fallback component instead
            }}
          />
        )}
        
        {/* Fallback image rendered as separate element when primary fails */}
        {imageFailed && (
          <img 
            src={fallbackImage}
            alt={`Fallback image for ${destination.name}`}
            className="w-full h-full object-cover bg-gray-200"
          />
        )}
      </div>
      
      {/* Overlay gradients - simplified and improved for better visibility */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" 
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90"></div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 text-white">
        <div className="container mx-auto">
          <div className="animate-fade-in max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <Luggage className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <UtensilsCrossed className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
              <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                <Hotel className="h-4 w-4 text-white" aria-hidden="true" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1 text-white/90">
              {destination.name}
            </h1>
            <p className="text-lg text-white/70">
              {destination.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
