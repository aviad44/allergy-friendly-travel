
import React, { useState, useEffect } from "react";
import { HeroImageFallback } from "./HeroImageFallback";
import { HeroImageOverlay } from "./HeroImageOverlay";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Critical destinations with specific image requirements
  const criticalDestinations: Record<string, string> = {
    'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
    'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    'swiss-alps': "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=2000&h=1000&q=80",
    'munich': "/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png", // Add Munich to critical destinations
    'athens': "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200&q=80" // Athens Acropolis image
  };

  // For critical destinations check if the URL contains the destination ID
  const destinationMatch = Object.keys(criticalDestinations).find(destId => 
    imageUrl.includes(destId) || altText.toLowerCase().includes(destId)
  );

  // Use specific critical image if needed
  const actualImageUrl = destinationMatch ? criticalDestinations[destinationMatch] : imageUrl;
  
  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = actualImageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
      setImageFailed(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${actualImageUrl}`);
      setImageFailed(true);
    };
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [actualImageUrl]);

  return (
    <div className="relative w-full h-full">
      {!imageLoaded || imageFailed ? (
        <HeroImageFallback 
          altText={altText} 
          isLoading={!imageFailed && !imageLoaded} 
          fallbackImage={fallbackImage} 
        />
      ) : null}
      
      <img
        src={actualImageUrl}
        alt={altText}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded && !imageFailed ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageFailed(true)}
      />
      
      <HeroImageOverlay />
    </div>
  );
};
