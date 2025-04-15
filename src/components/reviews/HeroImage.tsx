
import { useState, useEffect } from "react";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  
  // Add debug logging
  useEffect(() => {
    console.log(`HeroImage attempting to load: ${imageUrl}`);
  }, [imageUrl]);
  
  useEffect(() => {
    // Reset states when imageUrl changes
    setImageLoaded(false);
    setImageFailed(false);
    setCurrentImageUrl(imageUrl);
  }, [imageUrl]);

  // Alternate image URLs in case the first one fails
  // Using known working image IDs for reliability
  const alternateImageUrls = [
    // Try with different parameters
    imageUrl.replace('auto=format', 'ixlib=rb-4.0.3&auto=format'),
    // Generic Turkey fallback
    "https://images.unsplash.com/photo-1559967308-bd6d7f8f3046?auto=format&fit=crop&w=2000&h=1000&q=80",
    // Alternative Turkey image
    "https://images.unsplash.com/photo-1592305951212-cae76d6119f7?auto=format&fit=crop&w=2000&h=1000&q=80",
    // Last resort fallback
    fallbackImage
  ];

  const tryNextImage = () => {
    const nextUrl = alternateImageUrls.shift();
    if (nextUrl) {
      console.log(`Trying alternate image: ${nextUrl}`);
      setCurrentImageUrl(nextUrl);
      setImageFailed(false);
    } else {
      // If all alternates fail, use the fallback
      console.log(`All alternatives failed, using fallback: ${fallbackImage}`);
      setCurrentImageUrl(fallbackImage);
    }
  };

  return (
    <div className="absolute inset-0">
      {!imageFailed && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 brightness-110 contrast-105 saturate-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => {
            console.log(`Successfully loaded image: ${currentImageUrl}`);
            setImageLoaded(true);
          }}
          onError={(e) => {
            console.error(`Failed to load image: ${currentImageUrl}`);
            setImageFailed(true);
            tryNextImage();
          }}
        />
      )}
      
      {/* Fallback image rendered when all image attempts fail */}
      {(imageFailed && !alternateImageUrls.length) && (
        <img 
          src={fallbackImage}
          alt={`Fallback image for ${altText}`}
          className="w-full h-full object-cover bg-gray-200"
        />
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};
