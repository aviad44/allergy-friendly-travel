
import { DestinationId } from "@/types/definitions";
import { DESTINATION_IMAGES } from "@/constants/destinations";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("ImageHelper: Getting image source for destination:", destinationId);
  
  // Always use the centralized image constants as the source of truth
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destKey]) {
    console.log(`ImageHelper: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // If a source is provided and it's a complete URL, use it as fallback
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    console.log(`ImageHelper: Using provided source: ${providedSource}`);
    return providedSource;
  }
  
  // Return a colored placeholder with destination name
  const placeholderUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
  console.log(`ImageHelper: Using placeholder for ${destinationId}: ${placeholderUrl}`);
  return placeholderUrl;
};

// Define descriptive alt text for images
export const getDestinationAltText = (destinationName: string): string => {
  if (destinationName.toLowerCase().includes('hotel chains')) {
    return `Luxury resort - Top allergy-friendly hotel chains worldwide`;
  }
  
  if (destinationName.toLowerCase().includes('cyprus')) {
    return `Beautiful beach in Cyprus - Allergy-friendly Mediterranean destination`;
  }
  
  return `Scenic view of ${destinationName} - Allergy-friendly travel destination`;
};

// Get image source considering destination and fallbacks
export const getImageSource = (destinationId: string, providedImage?: string): string => {
  console.log(`ImageHelper: Getting image source for ${destinationId} with provided: ${providedImage || 'none'}`);
  
  // Always use the centralized image constants as source of truth
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destKey]) {
    console.log(`ImageHelper: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // If we have a valid image provided, use it as fallback
  if (providedImage && providedImage.trim() !== '') {
    return providedImage;
  }
  
  // Create a placeholder using the destination ID
  const placeholderUrl = `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
  console.log(`ImageHelper: Using generated placeholder for ${destinationId}: ${placeholderUrl}`);
  return placeholderUrl;
};
