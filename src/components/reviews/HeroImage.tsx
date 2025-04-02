
import { useState, useEffect } from "react";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  
  useEffect(() => {
    // Reset states when imageUrl changes
    setImageLoaded(false);
    setImageFailed(false);
  }, [imageUrl]);

  return (
    <div className="absolute inset-0">
      {!imageFailed && (
        <img 
          src={imageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 brightness-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.error(`Failed to load image: ${imageUrl}`);
            setImageFailed(true);
          }}
        />
      )}
      
      {/* Fallback image rendered as separate element when primary fails */}
      {imageFailed && (
        <img 
          src={fallbackImage}
          alt={`Fallback image for ${altText}`}
          className="w-full h-full object-cover bg-gray-200"
        />
      )}
    </div>
  );
};
