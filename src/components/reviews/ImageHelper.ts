
import { DestinationId } from "@/types/definitions";

// Get an optimized image URL for each destination with WebP support
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    // If it's an Unsplash URL, optimize it
    if (providedSource.includes('unsplash.com')) {
      return optimizeUnsplashUrl(providedSource);
    }
    return providedSource;
  }
  
  // For Turkey, use the uploaded image
  if (destinationId === 'turkey') {
    return "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
  }
  
  // For specific destinations, use curated images (high reliability)
  const destinationImageMap: Record<string, string> = {
    'london': optimizeUnsplashUrl("https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"),
    'paris': optimizeUnsplashUrl("https://images.unsplash.com/photo-1502602898657-3e91760cbb34"),
    'barcelona': optimizeUnsplashUrl("https://images.unsplash.com/photo-1583422409516-2895a77efded"),
    'cyprus': optimizeUnsplashUrl("https://images.unsplash.com/photo-1518358246973-95637f473611"),
    'new-york': optimizeUnsplashUrl("https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9"),
    'swiss-alps': optimizeUnsplashUrl("https://images.unsplash.com/photo-1527784281695-866fa715d9d8"),
    'koh-samui': optimizeUnsplashUrl("https://images.unsplash.com/photo-1537956965359-7573183d1f57"),
    'cruise-lines': optimizeUnsplashUrl("https://images.unsplash.com/photo-1548574505-5e239809ee19"),
    'tokyo': optimizeUnsplashUrl("https://images.unsplash.com/photo-1542051841857-5f90071e7989"),
    'thailand': optimizeUnsplashUrl("https://images.unsplash.com/photo-1552465011-b4e21bf6e79a"),
    'portugal': optimizeUnsplashUrl("https://images.unsplash.com/photo-1555881400-74d7acaacd8b"),
    'abu-dhabi': optimizeUnsplashUrl("https://images.unsplash.com/photo-1512632578888-169bbbc64f33"),
    'crete': optimizeUnsplashUrl("https://images.unsplash.com/photo-1533760881669-80db4d7b4c15"),
    'hotel-chains': optimizeUnsplashUrl("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"),
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
  };
  
  // Use destination specific image if available
  if (destinationId in destinationImageMap) {
    return destinationImageMap[destinationId];
  }
  
  // Return a colored placeholder instead of a generic image
  return `https://placehold.co/2000x1000/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
};

// Optimize Unsplash URLs to use WebP format and responsive sizes
const optimizeUnsplashUrl = (url: string): string => {
  if (!url.includes('unsplash.com')) return url;
  
  // Parse URL to remove any existing query parameters
  const baseUrl = url.split('?')[0];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const width = isMobile ? 1000 : 2000;
  
  // Add optimization parameters for WebP format, quality and responsive sizing
  return `${baseUrl}?auto=format&fm=webp&fit=crop&w=${width}&q=75`;
};

// Define descriptive alt text for images
export const getDestinationAltText = (destinationName: string): string => {
  return `Scenic view of ${destinationName} - Allergy-friendly travel destination`;
};

// Get image source considering destination and fallbacks
export const getImageSource = (destinationId: string, providedImage?: string): string => {
  // If we have a valid image provided, use it
  if (providedImage && providedImage.trim() !== '') {
    return providedImage;
  }
  
  // Get from the destination images constants
  if (destinationId === 'turkey') {
    return '/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png';
  }
  
  // Map destinations to their specific photo IDs for consistency
  const photoIdMap: Record<string, string> = {
    'london': "photo-1513635269975-59663e0ac1ad",
    'paris': "photo-1502602898657-3e91760cbb34", 
    'barcelona': "photo-1583422409516-2895a77efded",
    'cyprus': "photo-1518358246973-95637f473611",
    'new-york': "photo-1496442226666-8d4d0e62e6e9",
    'swiss-alps': "photo-1527784281695-866fa715d9d8",
    'koh-samui': "photo-1537956965359-7573183d1f57",
    'cruise-lines': "photo-1548574505-5e239809ee19",
    'tokyo': "photo-1542051841857-5f90071e7989",
    'thailand': "photo-1552465011-b4e21bf6e79a",
    'portugal': "photo-1555881400-74d7acaacd8b",
    'abu-dhabi': "photo-1512632578888-169bbbc64f33",
    'crete': "photo-1533760881669-80db4d7b4c15",
    'hotel-chains': "photo-1551882547-ff40c63fe5fa",
    'toronto': "e6eaaffe-010b-46ee-859c-aacff4659ad1",
  };
  
  return photoIdMap[destinationId] || destinationId;
};
