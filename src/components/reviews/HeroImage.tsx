
import { useImageLoader } from "@/hooks/useImageLoader";
import { HeroImageFallback } from "./HeroImageFallback";
import { HeroImageOverlay } from "./HeroImageOverlay";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  // Use the extracted hook for image loading logic
  const { imageLoaded, imageFailed, currentImageUrl, setImageLoaded, setImageFailed } = 
    useImageLoader({ imageUrl, altText, fallbackImage });

  return (
    <div className="absolute inset-0">
      {/* Loading placeholder */}
      {!imageLoaded && (
        <HeroImageFallback altText={altText} isLoading={true} />
      )}
      
      {/* Main image */}
      {currentImageUrl && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="eager" // Important for hero images
          width="1200"
          height="600"
          onLoad={() => {
            console.log(`HeroImage: Successfully loaded image: ${currentImageUrl}`);
            setImageLoaded(true);
            setImageFailed(false);
          }}
          onError={() => {
            console.error(`HeroImage: Failed to load image: ${currentImageUrl}`);
            // The useEffect will handle fallbacks, so we don't need to do anything here
          }}
        />
      )}
      
      {/* Fallback when all images fail */}
      {imageFailed && (
        <HeroImageFallback altText={altText} isLoading={false} />
      )}
      
      {/* Overlay gradient for text visibility */}
      <HeroImageOverlay />
    </div>
  );
};
