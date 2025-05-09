
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { DestinationId } from "@/types/definitions";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("ImageHelper: Getting image source for destination:", destinationId);
  
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    return providedSource;
  }
  
  // First, check our constants file for the destination
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (destKey in DESTINATION_IMAGES) {
    console.log(`ImageHelper: Using constant image for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // Last resort fallback
  console.log(`ImageHelper: Using placeholder for ${destinationId}`);
  return `https://placehold.co/2000x1000/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
};

// Define descriptive alt text for images
export const getDestinationAltText = (destinationName: string): string => {
  return `Scenic view of ${destinationName} - Allergy-friendly travel destination`;
};

// Get image source considering destination and fallbacks
export const getImageSource = (destinationId: string, providedImage?: string): string => {
  console.log(`ImageHelper: Getting image source for ${destinationId} with provided: ${providedImage || 'none'}`);
  
  // If we have a valid image provided, use it
  if (providedImage && providedImage.trim() !== '') {
    return providedImage;
  }
  
  // Check our constants file
  const destKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (destKey in DESTINATION_IMAGES) {
    console.log(`ImageHelper: Using constant for ${destinationId}: ${DESTINATION_IMAGES[destKey]}`);
    return DESTINATION_IMAGES[destKey];
  }
  
  // Return the destination ID as is (will be processed later)
  return destinationId;
};
