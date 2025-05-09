
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
      
      // Remove any existing query parameters and add our own
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
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
  
  // Destination-specific fallbacks to ensure we don't show generic mountain image
  const getFallbackForDestination = () => {
    const destinationName = altText.split(' - ')[0].replace('Scenic view of ', '').toLowerCase();
    
    // Map of reliable fallback images by destination name fragment
    const fallbackMap: Record<string, string> = {
      'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
      'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
      'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'hotel chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80",
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
      'abu dhabi': "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80",
      'default': "https://placehold.co/1200x600/1e3a8a/ffffff?text=Loading+Destination"
    };
    
    // Try to find a matching destination
    for (const [key, url] of Object.entries(fallbackMap)) {
      if (destinationName.includes(key)) {
        console.log(`Using destination-specific fallback for ${destinationName}: ${url}`);
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
      console.log(`Trying alternate image: ${nextUrl}`);
      setCurrentImageUrl(nextUrl);
      setImageFailed(false);
    } else {
      // If all alternates fail, use the fallback
      console.log(`All alternatives failed, using fallback: ${fallbackImage}`);
      setCurrentImageUrl(fallbackImage);
    }
  };
  
  // Preload image to avoid the flash of default content
  useEffect(() => {
    if (currentImageUrl) {
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
      
      // Preload actual image with timeout for mobile connections
      const img = new Image();
      img.src = currentImageUrl;
      
      // Set a timeout to catch hanging requests
      const timeout = setTimeout(() => {
        console.log('Image load timeout - trying next alternative');
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
        console.error(`Failed to load image: ${currentImageUrl}`);
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
          loading="eager" // Change to eager for hero images
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
