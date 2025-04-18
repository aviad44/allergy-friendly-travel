
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
    'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=2000&h=1000&q=80",
    'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&h=1000&q=80",
    'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&h=1000&q=80",
    'abu-dhabi': "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&h=1000&q=80",
    'crete': "https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?auto=format&fit=crop&w=2000&h=1000&q=80",
    'hotel-chains': "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=2000&h=1000&q=80",
  };
  
  // Use destination specific image if available
  if (destinationId in destinationImageMap) {
    return destinationImageMap[destinationId];
  }
  
  // Return a colored placeholder instead of a generic image
  return `https://placehold.co/2000x1000/1e3a8a/ffffff?text=${destinationId.replace(/-/g, ' ')}`;
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
  };
  
  return photoIdMap[destinationId] || destinationId;
};
