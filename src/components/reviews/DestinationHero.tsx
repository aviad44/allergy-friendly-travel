
import { useState, useEffect } from "react";
import { Destination } from "@/types/reviews";
import { HeroImage } from "./HeroImage";
import { DestinationInfo } from "./DestinationInfo";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface DestinationHeroProps {
  destination: Destination;
}

export const DestinationHero = ({ destination }: DestinationHeroProps) => {
  // Define critical destinations with direct paths for reliable image display
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png", // Updated to use new uploaded resort image
    'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", // Updated Cyprus image with beachfront resort
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    'ayia-napa': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png" // Using the same new Cyprus image for Ayia Napa
  };
  
  // Always prioritize critical destinations - use DIRECT paths for these specific cases
  let imageUrl = '';
  
  // Direct image assignment for critical destinations - highest priority
  if (destination.id in criticalDestinations) {
    imageUrl = criticalDestinations[destination.id];
    console.log(`DestinationHero: Using critical destination path for ${destination.id}: ${imageUrl}`);
  } 
  // Check our central image constants - second priority
  else if (destination.id in DESTINATION_IMAGES) {
    const key = destination.id as keyof typeof DESTINATION_IMAGES;
    imageUrl = DESTINATION_IMAGES[key];
    console.log(`DestinationHero: Using DESTINATION_IMAGES for ${destination.id}: ${imageUrl}`);
  } 
  // Use destination's image if available - third priority
  else if (destination.image && (destination.image.startsWith('http') || destination.image.startsWith('/'))) {
    imageUrl = destination.image;
    console.log(`DestinationHero: Using destination.image for ${destination.id}: ${imageUrl}`);
  } 
  // Final fallback - placeholder
  else {
    imageUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destination.name}`;
    console.log(`DestinationHero: Using fallback for ${destination.id}: ${imageUrl}`);
  }
  
  // Add more debug logging
  console.log(`DestinationHero: Final image URL for ${destination.id}: ${imageUrl}`);
  
  // Define a descriptive alt text
  let altText = `Scenic view of ${destination.name} - Allergy-friendly travel destination`;
  if (destination.id === 'hotel-chains') {
    altText = `Luxury resort with swimming pool - Top allergy-friendly hotel chains worldwide`;
  }
  if (destination.id === 'cyprus') {
    altText = `Beautiful beachfront resort in Cyprus with crystal clear turquoise waters - Allergy-friendly Mediterranean destination`;
  }
  
  // Preload the image
  useEffect(() => {
    // Preload main image
    const img = new Image();
    img.src = imageUrl;
    console.log(`DestinationHero: Preloading main image: ${imageUrl}`);
    
    // Also preload a fallback
    const fallbackUrl = criticalDestinations[destination.id] || 
                        (destination.id in DESTINATION_IMAGES ? 
                          DESTINATION_IMAGES[destination.id as keyof typeof DESTINATION_IMAGES] : 
                          `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destination.name}`);
    
    if (fallbackUrl !== imageUrl) {
      const fallbackImg = new Image();
      fallbackImg.src = fallbackUrl;
      console.log(`DestinationHero: Preloading fallback image: ${fallbackUrl}`);
    }
  }, [destination.id, imageUrl, destination.name]);

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
      
      <DestinationInfo 
        name={destination.name}
        country={destination.country}
      />
    </div>
  );
};
