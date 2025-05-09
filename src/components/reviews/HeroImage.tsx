
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
  
  // Enhanced debug logging
  useEffect(() => {
    console.log(`HeroImage attempting to load: ${imageUrl}`);
    
    // Handle direct paths for problematic destinations first
    const specialDestinations: Record<string, string> = {
      'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
      'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80"
    };
    
    // Extract destination ID from URL or alt text
    let destinationId = '';
    
    // Check if URL contains a destination ID
    for (const id of Object.keys(specialDestinations)) {
      if (imageUrl.includes(id)) {
        destinationId = id;
        break;
      }
    }
    
    // Also check alt text for destination name
    if (!destinationId) {
      const destName = altText.replace('Scenic view of ', '').replace(' - Allergy-friendly travel destination', '').toLowerCase();
      Object.keys(specialDestinations).forEach(id => {
        if (id.replace('-', ' ') === destName || id.replace('_', ' ') === destName) {
          destinationId = id;
        }
      });
    }
    
    // If destination is one of our special cases, use its hardcoded path
    if (destinationId && specialDestinations[destinationId]) {
      console.log(`HeroImage: Using special destination direct path: ${specialDestinations[destinationId]}`);
      setCurrentImageUrl(specialDestinations[destinationId]);
      return;
    }
    
    // For Unsplash URLs, optimize them
    if (imageUrl.includes('unsplash.com')) {
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 800 : 1200;
      // Remove any existing query parameters and add our own
      const baseUrl = imageUrl.split('?')[0];
      const optimizedUrl = `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
      console.log(`HeroImage: Optimized Unsplash URL: ${optimizedUrl}`);
      setCurrentImageUrl(optimizedUrl);
      return;
    }
    
    // For direct paths (uploaded files)
    if (imageUrl.startsWith('/')) {
      console.log(`HeroImage: Using direct uploaded file: ${imageUrl}`);
      setCurrentImageUrl(imageUrl);
      return;
    }
    
    // For Unsplash photo IDs
    if (imageUrl.startsWith('photo-')) {
      const optimizedUrl = `https://images.unsplash.com/${imageUrl}?auto=format&fit=crop&w=1200&q=80`;
      console.log(`HeroImage: Using Unsplash photo ID: ${optimizedUrl}`);
      setCurrentImageUrl(optimizedUrl);
      return;
    }
    
    // Default case - just use the URL as is
    console.log(`HeroImage: Using original URL: ${imageUrl}`);
    setCurrentImageUrl(imageUrl);
    
  }, [imageUrl, altText]);
  
  // Prepare fallback images if needed
  const getFallbackImages = () => {
    // Extract destination name from alt text
    const destinationName = altText.split(' - ')[0].replace('Scenic view of ', '').toLowerCase();
    
    // Map of reliable fallback images by destination name fragment
    const fallbacks = [
      // First try special destinations with direct paths
      '/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png', // Hotel Chains
      '/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png', // Cyprus
      "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80", // Crete
      "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png", // Turkey
      "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png", // Toronto
      
      // General destination images as additional fallbacks
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80", // London
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80", // Paris
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80", // Barcelona
      
      // Generic travel image as final fallback
      "https://images.unsplash.com/photo-1505578183806-3d2c2001570e?auto=format&fit=crop&w=1200&q=80",
      
      // Last resort placeholder
      `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationName || 'Travel Destination'}`
    ];
    
    return fallbacks;
  };
  
  // Handle loading and fallbacks
  useEffect(() => {
    if (!currentImageUrl) return;
    
    const fallbackImages = getFallbackImages();
    let fallbackIndex = 0;
    
    // Function to try loading the current image
    const tryLoadImage = (url: string) => {
      console.log(`HeroImage: Trying to load: ${url}`);
      const img = new Image();
      img.src = url;
      
      // Set a timeout to catch hanging requests
      const timeout = setTimeout(() => {
        console.log('HeroImage: Image load timeout - trying next alternative');
        tryNextFallback();
      }, 5000); // 5 second timeout for better mobile experience
      
      img.onload = () => {
        clearTimeout(timeout);
        console.log(`HeroImage: Successfully loaded ${url}`);
        setImageLoaded(true);
        setImageFailed(false);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        console.error(`HeroImage: Failed to load image: ${url}`);
        tryNextFallback();
      };
      
      // Function to try the next fallback image
      function tryNextFallback() {
        if (fallbackIndex < fallbackImages.length) {
          const nextUrl = fallbackImages[fallbackIndex++];
          console.log(`HeroImage: Trying fallback #${fallbackIndex}: ${nextUrl}`);
          setCurrentImageUrl(nextUrl);
          // The effect will run again with the new URL
        } else {
          console.log('HeroImage: All fallbacks failed');
          setImageFailed(true);
          setImageLoaded(true); // Show something at least
        }
      }
      
      return () => {
        clearTimeout(timeout);
      };
    };
    
    return tryLoadImage(currentImageUrl);
  }, [currentImageUrl]);

  return (
    <div className="absolute inset-0">
      {/* Colored placeholder while image loads */}
      {!imageLoaded && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-800 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-white font-semibold text-lg px-4 text-center">
            {altText.split(' - ')[0]}
          </span>
        </div>
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
          onError={(e) => {
            console.error(`HeroImage: Failed to load image: ${currentImageUrl}`);
            // The useEffect will handle fallbacks, so we don't need to do anything here
          }}
        />
      )}
      
      {/* Fallback when all images fail */}
      {imageFailed && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-blue-900 flex items-center justify-center">
          <div className="text-white text-xl font-bold text-center px-6">
            {altText.split(' - ')[0]}
          </div>
        </div>
      )}
      
      {/* Subtle overlay gradient for text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 pointer-events-none"></div>
    </div>
  );
};
