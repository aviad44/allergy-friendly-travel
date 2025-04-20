
import { useState, useEffect, useRef } from "react";

interface HeroImageProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const HeroImage = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: HeroImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);
  
  // Convert to WebP if supported and add responsive sizing
  const optimizeImageUrl = (url: string) => {
    if (!url) return fallbackImage;
    
    // For Unsplash URLs, use their optimization API with WebP
    if (url.includes('unsplash.com')) {
      // Use a smaller image size for mobile devices
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 800 : 1200;
      
      // Remove any existing query parameters and add optimized ones with WebP
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fm=webp&fit=crop&w=${width}&q=75`;
    }
    
    // Return original for other URLs
    return url;
  };
  
  // Destination-specific fallbacks to ensure we don't show generic mountain image
  const getFallbackForDestination = () => {
    const destinationName = altText.split(' - ')[0].replace('Scenic view of ', '').toLowerCase();
    
    // Map of reliable fallback images by destination name fragment
    const fallbackMap: Record<string, string> = {
      'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'cyprus': "https://images.unsplash.com/photo-1518358246973-95637f473611?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fm=webp&fit=crop&w=1200&q=75",
      'default': "https://placehold.co/1200x600/1e3a8a/ffffff?text=Loading+Destination"
    };
    
    // Try to find a matching destination
    for (const [key, url] of Object.entries(fallbackMap)) {
      if (destinationName.includes(key)) {
        return url;
      }
    }
    
    return fallbackMap.default;
  };

  // Get destination-specific fallbacks
  const destinationFallback = getFallbackForDestination();
  
  // Alternate image URLs in case the first one fails
  const alternateImageUrls = [
    destinationFallback, // Use destination-specific fallback first
    "https://placehold.co/1200x600/1e3a8a/ffffff?text=Destination+Image", // Branded placeholder
    fallbackImage // Last resort fallback
  ];

  const tryNextImage = () => {
    const nextUrl = alternateImageUrls.shift();
    if (nextUrl) {
      setCurrentImageUrl(nextUrl);
      setImageFailed(false);
    } else {
      // If all alternates fail, use the fallback
      setCurrentImageUrl(fallbackImage);
    }
  };
  
  // Add URL to currentImageUrl
  useEffect(() => {
    // Set optimized URL
    setCurrentImageUrl(optimizeImageUrl(imageUrl));
  }, [imageUrl]);

  // Use Intersection Observer to lazy load the image
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && imageRef.current) {
          // Create colored placeholder while image loads - based on destination
          const destinationColor = altText.toLowerCase().includes('paris') ? '#3f51b5' : 
                                  altText.toLowerCase().includes('london') ? '#1e88e5' :
                                  altText.toLowerCase().includes('barcelona') ? '#e53935' : '#1e3a8a';
          
          // Add destination-specific placeholder style
          const placeholderStyle = document.createElement('style');
          placeholderStyle.innerHTML = `
            .image-placeholder-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')} {
              background: linear-gradient(to bottom, ${destinationColor}, #0f172a);
            }
          `;
          document.head.appendChild(placeholderStyle);
          
          // Start loading the image
          const img = new Image();
          img.src = currentImageUrl;
          
          // Set a timeout to catch hanging requests
          const timeout = setTimeout(() => {
            setImageFailed(true);
            tryNextImage();
          }, 5000); // 5 second timeout for better mobile experience
          
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
          
          observer.disconnect();
          
          return () => {
            clearTimeout(timeout);
            if (document.head.contains(placeholderStyle)) {
              document.head.removeChild(placeholderStyle);
            }
          };
        }
      },
      { threshold: 0.1 }
    );
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [currentImageUrl]);

  return (
    <div className="absolute inset-0" ref={imageRef}>
      {/* Destination-colored placeholder while image loads */}
      {!imageLoaded && !imageFailed && (
        <div 
          className={`absolute inset-0 image-placeholder-${imageUrl.replace(/[^a-zA-Z0-9]/g, '')}`} 
          aria-hidden="true"
        ></div>
      )}
      
      {/* Main image */}
      {!imageFailed && (
        <img 
          src={currentImageUrl}
          alt={altText}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          width="1200"
          height="600"
          onLoad={() => {
            setImageLoaded(true);
          }}
          onError={() => {
            setImageFailed(true);
            tryNextImage();
          }}
        />
      )}
      
      {/* Fallback colored placeholder when all image attempts fail */}
      {(imageFailed && alternateImageUrls.length === 0) && (
        <div className="w-full h-full bg-gradient-to-b from-blue-600 to-blue-900 flex items-center justify-center">
          <div className="text-white text-xl font-bold text-center px-4">
            {altText.split(' - ')[0]}
          </div>
        </div>
      )}
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-500/10 via-transparent to-transparent pointer-events-none"></div>
    </div>
  );
};
