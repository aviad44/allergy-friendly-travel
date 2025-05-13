
import React from "react";

export interface HeroImageFallbackProps {
  altText: string;
  isLoading: boolean;
  fallbackImage?: string;
}

export const HeroImageFallback = ({ 
  altText, 
  isLoading, 
  fallbackImage = "/placeholder.svg" 
}: HeroImageFallbackProps) => {
  return (
    <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
      {isLoading ? (
        <div className="w-full h-full bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
      ) : (
        <img
          src={fallbackImage}
          alt={`Fallback for ${altText}`}
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
      )}
    </div>
  );
};
