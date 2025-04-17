
import { useState, useEffect } from "react";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  
  // Convert to WebP if supported and add responsive sizing
  const optimizeImageUrl = (url: string) => {
    if (!url) return fallbackImage;
    
    // For Unsplash URLs, use their optimization API with smaller image for mobile
    if (url.includes('unsplash.com')) {
      // Use a smaller image size for mobile devices
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 800 : 1200;
      return `${url.split('?')[0]}?auto=format&fit=crop&w=${width}&q=80`;
    }
    
    // Return original for other URLs
    return url;
  };
  
  // Add debug logging
  useEffect(() => {
    console.log(`HeroImage attempting to load: ${imageUrl}`);
    // Set optimized URL
    setCurrentImageUrl(optimizeImageUrl(imageUrl));
  }, [imageUrl]);
  
  // Alternate image URLs in case the first one fails
  // Using known working image IDs for reliability
  const alternateImageUrls = [
    // Blue Mosque in Istanbul - very reliable image
    "https://images.unsplash.com/photo-1592305951212-cae76d6119f7?auto=format&fit=crop&w=1200&q=80",
    // Istanbul Bosphorus view - backup reliable image
    "https://images.unsplash.com/photo-1633163940265-e75d1f3549f8?auto=format&fit=crop&w=1200&q=80",
    // Generic Turkey beach image
    "https://images.unsplash.com/photo-1679895519579-d3fe832125dc?auto=format&fit=crop&w=1200&q=80",
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
  
  // Preload image with improved error handling
  useEffect(() => {
    if (currentImageUrl) {
      // Create a lightweight placeholder while image loads
      const placeholderStyle = document.createElement('style');
      placeholderStyle.innerHTML = `
        .image-placeholder-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')} {
          background: linear-gradient(to bottom, #add8e6, #4682b4);
        }
      `;
      document.head.appendChild(placeholderStyle);
      
      // Preload actual image with timeout for mobile connections
      const img = new Image();
      img.src = currentImageUrl;
      
      // Set a timeout to catch hanging requests
      const timeout = setTimeout(() => {
        console.log('Image load timeout - trying next alternative');
        setImageFailed(true);
        tryNextImage();
      }, 8000); // 8 second timeout for slow mobile connections
      
      img.onload = () => {
        clearTimeout(timeout);
        setImageLoaded(true);
        document.head.removeChild(placeholderStyle);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        setImageFailed(true);
        tryNextImage();
      };
      
      return () => {
        clearTimeout(timeout);
        if (document.head.contains(placeholderStyle)) {
          document.head.removeChild(placeholderStyle);
        }
      };
    }
  }, [currentImageUrl]);

  return (
    <div className="absolute inset-0">
      {/* Placeholder gradient while image loads */}
      {!imageLoaded && !imageFailed && (
        <div 
          className={`absolute inset-0 image-placeholder-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')}`} 
          aria-hidden="true"
        ></div>
      )}
      
      {!imageFailed && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 brightness-110 contrast-105 saturate-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          width="1200"
          height="600"
          onLoad={() => {
            console.log(`Successfully loaded image: ${currentImageUrl}`);
            setImageLoaded(true);
          }}
          onError={() => {
            console.error(`Failed to load image: ${currentImageUrl}`);
            setImageFailed(true);
            tryNextImage();
          }}
        />
      )}
      
      {/* Fallback image rendered when all image attempts fail */}
      {(imageFailed && !alternateImageUrls.length) && (
        <div className="w-full h-full bg-gradient-to-b from-blue-400 to-blue-600 flex items-center justify-center">
          <img 
            src={fallbackImage}
            alt={`Fallback image for ${altText}`}
            className="max-w-[50%] max-h-[50%] object-contain"
            loading="lazy"
          />
        </div>
      )}
      
      {/* Loading state indicator */}
      {!imageLoaded && !imageFailed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};
