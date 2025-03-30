
import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { HeroGradient } from "./HeroGradient";
import { DestinationInfo } from "./DestinationInfo";
import { getDestinationImageUrl, getDestinationAltText, getImageSource } from "./ImageHelper";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // Get image source from constants or fall back to destination image
  const imageSource = getImageSource(destination.id, destination.image);
  
  // Determine final image URL
  const imageUrl = getDestinationImageUrl(destination.id, imageSource);
  
  // Define a descriptive alt text
  const altText = getDestinationAltText(destination.name);
  
  // Log image info for debugging
  useEffect(() => {
    console.log("Destination ID:", destination.id);
    console.log("Image source:", imageSource);
    console.log("Image URL used:", imageUrl);
  }, [destination.id, imageSource, imageUrl]);

  return (
    <div 
      className="h-[35vh] sm:h-[40vh] md:h-[50vh] relative overflow-hidden"
      role="banner"
      aria-label={`Featured destination: ${destination.name}`}
    >
      <HeroImage 
        imageUrl={imageUrl}
        altText={altText}
        fallbackImage="/placeholder.svg"
      />
      
      <HeroGradient />
      
      <DestinationInfo 
        name={destination.name}
        country={destination.country}
      />
    </div>
  );
};
