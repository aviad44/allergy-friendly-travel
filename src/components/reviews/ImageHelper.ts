import { DestinationId } from "@/types/definitions";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("Getting image source for destination:", destinationId);
  
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    return providedSource;
  }
  
  // For Turkey, use the stunning Pamukkale image
  if (destinationId === 'turkey') {
    console.log("Turkey destination detected - using Pamukkale image");
    return "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
  }
  
  // For specific destinations, use curated images (high reliability)
  const destinationImageMap: Record<string, string> = {
    'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&h=1000&q=80",
    'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&h=1000&q=80",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&h=1000&q=80",
    'cyprus': "https://images.unsplash.com/photo-1518358246973-95637f473611?auto=format&fit=crop&w=2000&h=1000&q=80",
    'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&h=1000&q=80",
    'swiss-alps': "https://images.unsplash.com/photo-1527784281695-866fa715d9d8?auto=format&fit=crop&w=2000&h=1000&q=80",
    'koh-samui': "https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=2000&h=1000&q=80",
    'cruise-lines': "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2000&h=1000&q=80",
  };
  
  // Use destination specific image if available
  if (destinationId in destinationImageMap) {
    return destinationImageMap[destinationId];
  }
  
  // Generic travel image as final fallback
  return "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=2000&h=1000&q=80";
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
  
  // Special handling for Turkey - use photo ID
  if (destinationId === 'turkey') {
    return 'photo-1570654590457-79d7fbe2df62';
  }
  
  // For cruise lines, use a specific cruise ship photo
  if (destinationId === 'cruise-lines') {
    return 'photo-1548574505-5e239809ee19';
  }
  
  // Default to using the destination ID as the key
  return destinationId;
};
