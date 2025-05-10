
import { useState, useEffect } from "react";
import { DESTINATION_IMAGES } from "@/constants/destinations";

interface UseImageLoaderProps {
  imageUrl: string;
  altText: string;
  fallbackImage?: string;
}

export const useImageLoader = ({ imageUrl, altText, fallbackImage = "/placeholder.svg" }: UseImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  
  // Process the image URL and find the best source
  useEffect(() => {
    console.log(`useImageLoader: attempting to load: ${imageUrl}`);
    
    // Handle direct paths for critical destinations first - HIGHEST PRIORITY
    const criticalDestinations: Record<string, string> = {
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
    for (const id of Object.keys(criticalDestinations)) {
      if (imageUrl.includes(id)) {
        destinationId = id;
        break;
      }
    }
    
    // Also check alt text for destination name
    if (!destinationId) {
      const destName = altText.replace('Scenic view of ', '').replace(' - Allergy-friendly travel destination', '').toLowerCase();
      Object.keys(criticalDestinations).forEach(id => {
        if (id.replace('-', ' ') === destName || id.replace('_', ' ') === destName) {
          destinationId = id;
        }
      });
    }
    
    // If destination is one of our critical cases, use its hardcoded path - HIGHEST PRIORITY!
    if (destinationId && criticalDestinations[destinationId]) {
      console.log(`useImageLoader: Using critical destination direct path: ${criticalDestinations[destinationId]}`);
      setCurrentImageUrl(criticalDestinations[destinationId]);
      return;
    }
    
    // Check if the URL matches any key in our DESTINATION_IMAGES constants
    for (const [key, value] of Object.entries(DESTINATION_IMAGES)) {
      if (imageUrl === key || imageUrl.includes(key)) {
        console.log(`useImageLoader: Found destination match in DESTINATION_IMAGES: ${value}`);
        setCurrentImageUrl(value);
        return;
      }
    }
    
    // For Unsplash URLs, optimize them
    if (imageUrl.includes('unsplash.com')) {
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 800 : 1200;
      // Remove any existing query parameters and add our own
      const baseUrl = imageUrl.split('?')[0];
      const optimizedUrl = `${baseUrl}?auto=format&fit=crop&w=${width}&q=80`;
      console.log(`useImageLoader: Optimized Unsplash URL: ${optimizedUrl}`);
      setCurrentImageUrl(optimizedUrl);
      return;
    }
    
    // For direct paths (uploaded files)
    if (imageUrl.startsWith('/')) {
      console.log(`useImageLoader: Using direct uploaded file: ${imageUrl}`);
      setCurrentImageUrl(imageUrl);
      return;
    }
    
    // For Unsplash photo IDs
    if (imageUrl.startsWith('photo-')) {
      const optimizedUrl = `https://images.unsplash.com/${imageUrl}?auto=format&fit=crop&w=1200&q=80`;
      console.log(`useImageLoader: Using Unsplash photo ID: ${optimizedUrl}`);
      setCurrentImageUrl(optimizedUrl);
      return;
    }
    
    // Default case - just use the URL as is
    console.log(`useImageLoader: Using original URL: ${imageUrl}`);
    setCurrentImageUrl(imageUrl);
    
  }, [imageUrl, altText]);
  
  // Generate fallback images
  const getFallbackImages = () => {
    // Extract destination name from alt text
    const destinationName = altText.split(' - ')[0].replace('Scenic view of ', '').toLowerCase();
    
    // Map of reliable fallback images by destination name fragment
    const fallbacks = [
      // First try special destinations with direct paths - HIGHEST PRIORITY
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
      console.log(`useImageLoader: Trying to load: ${url}`);
      const img = new Image();
      img.src = url;
      
      // Set a timeout to catch hanging requests
      const timeout = setTimeout(() => {
        console.log('useImageLoader: Image load timeout - trying next alternative');
        tryNextFallback();
      }, 5000); // 5 second timeout for better mobile experience
      
      img.onload = () => {
        clearTimeout(timeout);
        console.log(`useImageLoader: Successfully loaded ${url}`);
        setImageLoaded(true);
        setImageFailed(false);
      };
      
      img.onerror = () => {
        clearTimeout(timeout);
        console.error(`useImageLoader: Failed to load image: ${url}`);
        tryNextFallback();
      };
      
      // Function to try the next fallback image
      function tryNextFallback() {
        if (fallbackIndex < fallbackImages.length) {
          const nextUrl = fallbackImages[fallbackIndex++];
          console.log(`useImageLoader: Trying fallback #${fallbackIndex}: ${nextUrl}`);
          setCurrentImageUrl(nextUrl);
          // The effect will run again with the new URL
        } else {
          console.log('useImageLoader: All fallbacks failed');
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

  return { imageLoaded, imageFailed, currentImageUrl, setImageLoaded, setImageFailed };
};
