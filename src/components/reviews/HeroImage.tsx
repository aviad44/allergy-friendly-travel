
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
  
  useEffect(() => {
    // Reset states when imageUrl changes
    setImageLoaded(false);
    setImageFailed(false);
    setCurrentImageUrl(imageUrl);
  }, [imageUrl]);

  // Alternate image URLs in case the first one fails
  const alternateImageUrls = [
    imageUrl.replace('auto=format', 'ixlib=rb-4.0.3&auto=format'),
    `/lovable-uploads/${imageUrl.split('/').pop()}.jpg`,
    fallbackImage
  ];

  const tryNextImage = () => {
    const nextUrl = alternateImageUrls.shift();
    if (nextUrl) {
      console.log(`Trying alternate image: ${nextUrl}`);
      setCurrentImageUrl(nextUrl);
      setImageFailed(false);
    }
  };

  return (
    <div className="absolute inset-0">
      {!imageFailed && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 brightness-125 contrast-105 saturate-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
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
      
      {/* Fallback image rendered as separate element when primary fails */}
      {imageFailed && (
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
