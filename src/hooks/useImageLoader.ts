
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
  const [fallbackAttempts, setFallbackAttempts] = useState(0); // Track fallback attempts
  
  // Process the image URL and find the best source
  useEffect(() => {
    console.log(`useImageLoader: attempting to load: ${imageUrl}`);
    
    // Handle direct paths for critical destinations first - HIGHEST PRIORITY
    const criticalDestinations: Record<string, string> = {
      'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
      'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      'swiss-alps': "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=2000&h=1000&q=80",
      'hotel-chains': "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", // Updated to reliable Unsplash
      'hotel_chains': "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", // Updated to reliable Unsplash
      'cyprus': "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80", // Ayia Napa image
      'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
      'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
      'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
      'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
      'ayia-napa': "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80",
      'munich': "/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png" // Add Munich to critical destinations
    };
    
    // Extract destination ID from URL or alt text
    let destinationId = '';
    
    // Check if URL contains a destination ID
    for (const id of Object.keys(criticalDestinations)) {
      if (imageUrl.includes(id) || (altText && altText.toLowerCase().includes(id))) {
        destinationId = id;
        console.log(`useImageLoader: Extracted destination ID from URL/alt text: ${destinationId}`);
        break;
      }
    }
    
    // Also check alt text for destination name
    if (!destinationId && altText) {
      const destName = altText.replace('Scenic view of ', '').replace(' - Allergy-friendly travel destination', '').toLowerCase();
      Object.keys(criticalDestinations).forEach(id => {
        if (id.replace('-', ' ') === destName || id.replace('_', ' ') === destName) {
          destinationId = id;
          console.log(`useImageLoader: Extracted destination ID from alt text name match: ${destinationId}`);
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
      // First try known reliable Unsplash images - HIGHEST PRIORITY
      "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80", // Cyprus/Ayia Napa
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80", // Hotel
      "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80", // Crete
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80", // Barcelona
      "/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png", // Munich
      
      // General destination images as additional fallbacks
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80", // London
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80", // Paris
      
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
    let fallbackIndex = fallbackAttempts;
    
    // Function to try loading the current image
    const tryLoadImage = (url: string) => {
      console.log(`useImageLoader: Trying to load (attempt ${fallbackAttempts + 1}): ${url}`);
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
          const nextUrl = fallbackImages[fallbackIndex];
          console.log(`useImageLoader: Trying fallback #${fallbackIndex + 1}: ${nextUrl}`);
          setFallbackAttempts(fallbackIndex + 1);
          setCurrentImageUrl(nextUrl);
          // The effect will run again with the new URL
        } else {
          console.log('useImageLoader: All fallbacks failed');
          setImageFailed(true);
          setImageLoaded(true); // Show something at least
          
          // As a last resort, use a placeholder with the destination name
          const destinationName = altText.split(' - ')[0].replace('Scenic view of ', '');
          const lastResortUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationName}`;
          console.log(`useImageLoader: Using last resort placeholder: ${lastResortUrl}`);
          setCurrentImageUrl(lastResortUrl);
        }
      }
      
      return () => {
        clearTimeout(timeout);
      };
    };
    
    return tryLoadImage(currentImageUrl);
  }, [currentImageUrl, fallbackAttempts, altText]);

  return { 
    imageLoaded, 
    imageFailed, 
    currentImageUrl, 
    setImageLoaded, 
    setImageFailed 
  };
};
