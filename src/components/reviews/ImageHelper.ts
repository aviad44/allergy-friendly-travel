
import { DestinationId } from "@/types/definitions";
import { DESTINATION_IMAGES } from "@/constants/destinations";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("ImageHelper: Getting image source for destination:", destinationId);
  
  // Critical destinations with hardcoded paths - HIGHEST PRIORITY!
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png", 
    'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    'ayia-napa': "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80"
  };
  
  // Always use critical destination paths when available - highest priority
  if (destinationId in criticalDestinations) {
    console.log(`ImageHelper: Using critical destination direct path: ${criticalDestinations[destinationId]}`);
    return criticalDestinations[destinationId];
  }
  
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    console.log(`ImageHelper: Using provided source: ${providedSource}`);
    return providedSource;
  }
  
  // Look up in our central constants file
  const destinationKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destinationKey]) {
    console.log(`ImageHelper: Using DESTINATION_IMAGES for ${destinationId}: ${DESTINATION_IMAGES[destinationKey]}`);
    return DESTINATION_IMAGES[destinationKey];
  }
  
  // Return a colored placeholder with destination name
  console.log(`ImageHelper: Using placeholder for ${destinationId}`);
  return `https://placehold.co/1200x600/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
};

// Define descriptive alt text for images
export const getDestinationAltText = (destinationName: string): string => {
  return `Scenic view of ${destinationName} - Allergy-friendly travel destination`;
};

// Get image source considering destination and fallbacks
export const getImageSource = (destinationId: string, providedImage?: string): string => {
  console.log(`ImageHelper: Getting image source for ${destinationId} with provided: ${providedImage || 'none'}`);
  
  // Critical destinations - HIGHEST PRIORITY
  const criticalDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1200&q=80",
    'ayia-napa': "https://images.unsplash.com/photo-1582650844513-5a19b5ba61d6?auto=format&fit=crop&w=1200&q=80"
  };
  
  // Always use critical destination paths when available
  if (destinationId in criticalDestinations) {
    console.log(`ImageHelper: Using critical direct path for ${destinationId}: ${criticalDestinations[destinationId]}`);
    return criticalDestinations[destinationId];
  }
  
  // If we have a valid image provided, use it
  if (providedImage && providedImage.trim() !== '') {
    return providedImage;
  }
  
  // Look up in our constants
  const destinationKey = destinationId as keyof typeof DESTINATION_IMAGES;
  if (DESTINATION_IMAGES[destinationKey]) {
    return DESTINATION_IMAGES[destinationKey];
  }
  
  // Return the destination ID as is (will be processed later in the component)
  return destinationId;
};
