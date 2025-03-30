
import { DESTINATION_IMAGES } from "@/constants/destinations";

/**
 * Determines the image URL to use based on destination ID and image source
 */
export const getDestinationImageUrl = (destinationId: string, imageSource: string | null): string => {
  // Default fallback image if there's no image defined
  const defaultImage = "photo-1505578183806-3d2c2001570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
  
  // Use custom image if available, otherwise fall back to provided image or default
  const finalImageSource = imageSource || defaultImage;
  
  // Determine the image URL based on format
  if (finalImageSource.startsWith('photo-')) {
    return `https://images.unsplash.com/${finalImageSource}?auto=format&fit=crop&w=2000&h=1000&q=80`;
  } else if (finalImageSource.startsWith('/lovable-uploads/')) {
    return finalImageSource;
  } else {
    return finalImageSource;
  }
};

/**
 * Returns a descriptive alt text for the destination image
 */
export const getDestinationAltText = (destinationName: string): string => {
  return destinationName 
    ? `Scenic view of ${destinationName} - allergy-friendly travel destination with hotels and accommodations for travelers with dietary restrictions`
    : "Beautiful travel destination for allergy-friendly accommodation";
};

/**
 * Gets the image source based on destination ID
 */
export const getImageSource = (destinationId: string, fallbackImage: string | null): string | null => {
  const destinationKey = destinationId as keyof typeof DESTINATION_IMAGES;
  return destinationKey in DESTINATION_IMAGES ? DESTINATION_IMAGES[destinationKey] : fallbackImage;
};
