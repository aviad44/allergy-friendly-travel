import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { HeroGradient } from "./HeroGradient";
import { DestinationInfo } from "./DestinationInfo";
import { getDestinationImageUrl, getDestinationAltText, getImageSource } from "./ImageHelper";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // CRITICAL: Handle special cases like Cyprus and Hotel Chains with direct paths
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80"
  };
  
  let imageSource = '';
  let imageUrl = '';
  
  // First, check if it's a critical destination - HIGHEST PRIORITY
  if (destination.id in criticalDestinations) {
    imageSource = criticalDestinations[destination.id];
    imageUrl = criticalDestinations[destination.id];
    console.log(`DestinationHero: Using critical destination path for ${destination.id}: ${imageUrl}`);
  } else {
    // Otherwise, use standard helpers
    imageSource = getImageSource(destination.id, destination.image);
    imageUrl = getDestinationImageUrl(destination.id, imageSource);
  }
  
  // Define a descriptive alt text
  const altText = getDestinationAltText(destination.name);
  
  // Preload the image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    
    // Preload fallbacks too
    const fallbackUrl = criticalDestinations[destination.id] || 
                        DESTINATION_IMAGES[destination.id as keyof typeof DESTINATION_IMAGES] || 
                        `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destination.name}`;
    
    const fallbackImg = new Image();
    fallbackImg.src = fallbackUrl;
    
  }, [destination.id, imageUrl, destination.name]);
  
  // Log image info for debugging
  useEffect(() => {
    console.log("DestinationHero: Destination ID:", destination.id);
    console.log("DestinationHero: Image source:", imageSource);
    console.log("DestinationHero: Image URL used:", imageUrl);
  }, [destination.id, imageSource, imageUrl]);

  return (
    <div 
      className="h-[40vh] sm:h-[45vh] md:h-[55vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <HeroImage 
        imageUrl={imageUrl}
        altText={altText}
        fallbackImage="/placeholder.svg"
      />
      
      {/* Using a lighter gradient to allow more natural sky color */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/40"></div>
      
      <DestinationInfo 
        name={destination.name}
        country={destination.country}
      />
    </div>
  );
};
