
import { DestinationId } from "@/types/definitions";
import { DESTINATION_IMAGES } from "@/constants/destinations";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("ImageHelper: Getting image source for destination:", destinationId);
  
  // CRITICAL: Define hardcoded paths for essential destinations - highest priority
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
    'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80"
  };
  
  // First check our critical destinations for direct paths
  if (destinationId in criticalDestinations) {
    console.log(`ImageHelper: Using critical path for ${destinationId}: ${criticalDestinations[destinationId]}`);
    return criticalDestinations[destinationId];
  }
  
  // Always use the centralized image constants as the source of truth - second priority
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destKey]) {
    console.log(`ImageHelper: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // If a source is provided and it's a complete URL, use it as fallback - third priority
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    console.log(`ImageHelper: Using provided source: ${providedSource}`);
    return providedSource;
  }
  
  // Return a colored placeholder with destination name - final fallback
  const placeholderUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
  console.log(`ImageHelper: Using placeholder for ${destinationId}: ${placeholderUrl}`);
  return placeholderUrl;
};

// Define descriptive alt text for images
export const getDestinationAltText = (destinationName: string): string => {
  if (destinationName.toLowerCase().includes('hotel chains')) {
    return `Luxury resort with swimming pool - Top allergy-friendly hotel chains worldwide`;
  }
  
  if (destinationName.toLowerCase().includes('cyprus')) {
    return `Beautiful beachfront resort in Cyprus with crystal clear turquoise waters - Allergy-friendly Mediterranean destination`;
  }
  
  return `Scenic view of ${destinationName} - Allergy-friendly travel destination`;
};

// Get image source considering destination and fallbacks
export const getImageSource = (destinationId: string, providedImage?: string): string => {
  console.log(`ImageHelper: Getting image source for ${destinationId} with provided: ${providedImage || 'none'}`);
  
  // CRITICAL: Define hardcoded paths for essential destinations - highest priority  
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
    'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80"
  };
  
  // First check our critical destinations for direct paths
  if (destinationId in criticalDestinations) {
    console.log(`ImageHelper: Using critical path for ${destinationId}: ${criticalDestinations[destinationId]}`);
    return criticalDestinations[destinationId];
  }
  
  // Always use the centralized image constants as source of truth - second priority
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destKey]) {
    console.log(`ImageHelper: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // If we have a valid image provided, use it as fallback - third priority
  if (providedImage && providedImage.trim() !== '') {
    return providedImage;
  }
  
  // Create a placeholder using the destination ID - final fallback
  const placeholderUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
  console.log(`ImageHelper: Using generated placeholder for ${destinationId}: ${placeholderUrl}`);
  return placeholderUrl;
};
