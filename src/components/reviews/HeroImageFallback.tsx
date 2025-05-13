
import React from 'react';

interface HeroImageFallbackProps {
  altText: string;
  isLoading: boolean;
  fallbackImage?: string;
}

export const HeroImageFallback: React.FC<HeroImageFallbackProps> = ({ altText, isLoading, fallbackImage }) => {
  const titleText = altText.split(' - ')[0];

  // Only show loading state when actually loading
  if (isLoading) {
    return (
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-800 animate-pulse flex items-center justify-center"
        aria-hidden="true"
      >
        <span className="text-white font-semibold text-lg px-4 text-center">
          {titleText}
        </span>
      </div>
    );
  }

  // Error fallback state - can use a fallback image if provided
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center">
      {fallbackImage ? (
        <img 
          src={fallbackImage} 
          alt={titleText} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
      ) : null}
      <div className="text-white text-xl font-bold text-center px-6 z-10 relative">
        {titleText}
      </div>
    </div>
  );
};
