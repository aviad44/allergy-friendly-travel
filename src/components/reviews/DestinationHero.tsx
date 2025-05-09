
import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { HeroGradient } from "./HeroGradient";
import { DestinationInfo } from "./DestinationInfo";
import { getDestinationImageUrl, getDestinationAltText } from "./ImageHelper";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // Get image directly from constants
  const destKey = destination.id as keyof typeof DESTINATION_IMAGES;
  const imageUrl = destKey in DESTINATION_IMAGES ? 
    DESTINATION_IMAGES[destKey] : 
    getDestinationImageUrl(destination.id, destination.image);
  
  // Define a descriptive alt text
  const altText = getDestinationAltText(destination.name);
  
  // Log image info for debugging
  useEffect(() => {
    console.log("Destination ID:", destination.id);
    console.log("Image URL used:", imageUrl);
  }, [destination.id, imageUrl]);

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
