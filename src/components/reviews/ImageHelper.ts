
import { DESTINATION_IMAGES } from "@/constants/destinations";

/**
 * Determines the image URL to use based on destination ID and image source
 * With improved mobile support
 */
export const getDestinationImageUrl = (destinationId: string, imageSource: string | null): string => {
  // Special case for Turkey - use a direct, reliable Unsplash URL
  if (destinationId === 'turkey') {
    console.log("Turkey detected - using reliable direct URL");
    // Direct URL to Istanbul Blue Mosque - very reliable Unsplash image
    return "https://images.unsplash.com/photo-1592305951212-cae76d6119f7?auto=format&fit=crop&w=2000&h=1000&q=80";
  }
  
  // Special case for Cyprus - use a direct Unsplash URL to ensure the image loads
  if (destinationId === 'cyprus') {
    console.log("Cyprus detected - using direct Unsplash URL");
    return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&h=1000&q=80";
  }
  
  // Default fallback image if there's no image defined
  const defaultImage = "photo-1505578183806-3d2c2001570e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80";
  
  // Use custom image if available, otherwise fall back to provided image or default
  const finalImageSource = imageSource || defaultImage;
  
  // Determine the image URL based on format
  if (finalImageSource.startsWith('photo-')) {
    // For Unsplash photos, make sure to use their CDN properly
    // Ensure images load on mobile by using appropriate size and format
    const isMobile = window.innerWidth < 768;
    const width = isMobile ? 800 : 2000;
    const height = isMobile ? 500 : 1000;
    return `https://images.unsplash.com/${finalImageSource}?auto=format&fit=crop&w=${width}&h=${height}&q=80`;
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
  if (destinationName === 'Cyprus') {
    return "Beautiful beach in Cyprus with crystal clear turquoise waters - perfect for allergy-friendly vacations";
  }
  
  if (destinationName === 'Turkey') {
    return "Beautiful view of the Blue Mosque in Istanbul, Turkey - a popular destination with allergy-friendly hotels and resorts";
  }
  
  return destinationName 
    ? `Scenic view of ${destinationName} - allergy-friendly travel destination with hotels and accommodations for travelers with dietary restrictions`
    : "Beautiful travel destination for allergy-friendly accommodation";
};

/**
 * Gets the image source based on destination ID
 * With improved error handling for mobile
 */
export const getImageSource = (destinationId: string, fallbackImage: string | null): string | null => {
  console.log(`Getting image source for destination: ${destinationId}`);
  
  // Special handling for problematic destinations
  if (destinationId === 'turkey') {
    console.log("Turkey destination detected - using Blue Mosque image");
    return "photo-1592305951212-cae76d6119f7";
  }
  
  if (destinationId === 'cyprus') {
    console.log("Cyprus destination detected - using special image source");
    return "photo-1500375592092-40eb2168fd21";
  }
  
  if (destinationId === 'crete') {
    console.log("Crete destination detected - using special image source");
    return "photo-1533760881669-80db4d7b4c15";
  }
  
  if (destinationId === 'barcelona') {
    console.log("Barcelona destination detected - using special image source");
    return "photo-1539037116277-4db20889f2d4";
  }
  
  // Try to get image from constants
  const destinationKey = destinationId as keyof typeof DESTINATION_IMAGES;
  const result = destinationKey in DESTINATION_IMAGES ? DESTINATION_IMAGES[destinationKey] : fallbackImage;
  console.log(`Image source result: ${result}`);
  
  // If we still don't have a valid image, use a reliable fallback
  if (!result) {
    console.log("No image found in constants, using fallback");
    return "photo-1505578183806-3d2c2001570e"; // Generic travel image
  }
  
  return result;
};
