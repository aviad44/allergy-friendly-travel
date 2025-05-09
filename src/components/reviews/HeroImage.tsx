
import { useState, useEffect } from "react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  
  // Get destination name from alt text
  const getDestinationIdFromAltText = (): string | null => {
    const destName = altText.replace('Scenic view of ', '').replace(' - Allergy-friendly travel destination', '').toLowerCase();
    
    // Find matching destination in our constants
    const possibleMatches = Object.keys(DESTINATION_IMAGES).filter(id => 
      id.toLowerCase().includes(destName) || destName.includes(id.toLowerCase())
    );
    
    if (possibleMatches.length > 0) {
      return possibleMatches[0];
    }
    
    return null;
  };
  
  // Enhanced debug logging
  useEffect(() => {
    console.log(`HeroImage attempting to load: ${imageUrl}`);
    
    // First, check if this is actually a destination ID
    if (imageUrl && Object.keys(DESTINATION_IMAGES).includes(imageUrl)) {
      console.log(`HeroImage: Found direct destination ID match in constants: ${imageUrl}`);
      setCurrentImageUrl(DESTINATION_IMAGES[imageUrl as keyof typeof DESTINATION_IMAGES]);
      return;
    }
    
    // For direct paths (uploaded files or full URLs)
    if (imageUrl && (imageUrl.startsWith('/') || imageUrl.startsWith('http'))) {
      console.log(`HeroImage: Using direct image path: ${imageUrl}`);
      setCurrentImageUrl(imageUrl);
      return;
    }
    
    // Try to identify destination from alt text
    const destId = getDestinationIdFromAltText();
    if (destId && destId in DESTINATION_IMAGES) {
      const destImage = DESTINATION_IMAGES[destId as keyof typeof DESTINATION_IMAGES];
      console.log(`HeroImage: Identified destination from alt text: ${destId} -> ${destImage}`);
      setCurrentImageUrl(destImage);
      return;
    }
    
    // Default case - just use the URL as is
    console.log(`HeroImage: Using original URL as fallback: ${imageUrl}`);
    setCurrentImageUrl(imageUrl);
  }, [imageUrl, altText]);
  
  // Handle loading and fallbacks
  useEffect(() => {
    if (!currentImageUrl) return;
    
    const img = new Image();
    img.src = currentImageUrl;
    
    // Set a timeout to catch hanging requests
    const timeout = setTimeout(() => {
      console.log('HeroImage: Image load timeout - using fallback');
      setImageFailed(true);
    }, 5000);
    
    img.onload = () => {
      clearTimeout(timeout);
      console.log(`HeroImage: Successfully loaded ${currentImageUrl}`);
      setImageLoaded(true);
      setImageFailed(false);
    };
    
    img.onerror = () => {
      clearTimeout(timeout);
      console.error(`HeroImage: Failed to load image: ${currentImageUrl}`);
      setImageFailed(true);
    };
    
    return () => {
      clearTimeout(timeout);
    };
  }, [currentImageUrl]);

  return (
    <div className="absolute inset-0">
      {/* Colored placeholder while image loads */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-800 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white font-semibold text-lg px-4 text-center">
            {altText.split(' - ')[0]}
          </span>
        </div>
      )}
      
      {/* Main image */}
      {currentImageUrl && !imageFailed && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager" 
          width="1200"
          height="600"
        />
      )}
      
      {/* Fallback when image fails */}
      {imageFailed && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center">
          <div className="text-white text-xl font-bold text-center px-6">
            {altText.split(' - ')[0]}
          </div>
        </div>
      )}
      
      {/* Subtle overlay gradient for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};
