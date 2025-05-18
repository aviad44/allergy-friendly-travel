
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
    'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?fm=webp&w=1200&q=80",
    'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fm=webp&w=1200&q=80",
    'swiss-alps': "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?fm=webp&w=2000&h=1000&q=80",
    'athens': "/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png" // Keep uploaded images as they are
  };

  // For critical destinations check if the URL contains the destination ID
  const destinationMatch = Object.keys(criticalDestinations).find(destId => 
    imageUrl.includes(destId) || altText.toLowerCase().includes(destId)
  );

  // Use specific critical image if needed
  const actualImageUrl = destinationMatch ? criticalDestinations[destinationMatch] : imageUrl;
  
  // Create responsive image attributes for different screen sizes
  const getResponsiveSrcSet = (url: string) => {
    // Skip srcSet for local uploads and non-Unsplash URLs
    if (url.startsWith('/') || !url.includes('unsplash.com')) {
      return { srcSet: '', sizes: '' };
    }
    
    const baseUrl = url.split('?')[0]; // Remove any existing query params
    return {
      srcSet: `
        ${baseUrl}?fm=webp&w=640&q=75 640w,
        ${baseUrl}?fm=webp&w=960&q=75 960w,
        ${baseUrl}?fm=webp&w=1200&q=80 1200w,
        ${baseUrl}?fm=webp&w=1600&q=80 1600w,
        ${baseUrl}?fm=webp&w=2000&q=80 2000w
      `,
      sizes: "(max-width: 640px) 640px, (max-width: 960px) 960px, (max-width: 1200px) 1200px, (max-width: 1600px) 1600px, 2000px"
    };
  };
  
  // Get responsive attributes for the image
  const { srcSet, sizes } = getResponsiveSrcSet(actualImageUrl);
  
  // Determine optimal image size based on screen width
  const getOptimalImageUrl = (url: string) => {
    if (url.startsWith('/') || !url.includes('unsplash.com')) {
      return url;
    }
    
    const baseUrl = url.split('?')[0];
    const width = window.innerWidth < 768 ? 960 : 1600;
    return `${baseUrl}?fm=webp&w=${width}&q=80`;
  };
  
  // Get the optimized version of the image URL
  const optimizedImageUrl = getOptimalImageUrl(actualImageUrl);
  
  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = optimizedImageUrl;
    
    img.onload = () => {
      setImageLoaded(true);
      setImageFailed(false);
    };
    
    img.onerror = () => {
      console.error(`Failed to load image: ${optimizedImageUrl}`);
      setImageFailed(true);
    };
    
    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [optimizedImageUrl]);

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
        src={optimizedImageUrl}
        alt={altText}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          imageLoaded && !imageFailed ? 'opacity-100' : 'opacity-0'
        }`}
        srcSet={srcSet}
        sizes={sizes}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageFailed(true)}
        loading="eager" // Use eager for hero/above-fold images
        width="1600"
        height="900"
      />
      
      <HeroImageOverlay />
    </div>
  );
};
