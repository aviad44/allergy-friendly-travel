
import { DestinationId } from "@/types/definitions";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("ImageHelper: Getting image source for destination:", destinationId);
  
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    return providedSource;
  }
  
  // Hardcoded paths for special destinations - ALWAYS use these first for reliability
  const specialDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=2000&h=1000&q=80",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&h=1000&q=80"
  };
  
  if (destinationId in specialDestinations) {
    console.log(`ImageHelper: Using special destination image for ${destinationId}: ${specialDestinations[destinationId]}`);
    return specialDestinations[destinationId];
  }
  
  // For specific destinations, use curated direct full URLs (high reliability)
  const destinationImageMap: Record<string, string> = {
    'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&h=1000&q=80",
    'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&h=1000&q=80",
    'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&h=1000&q=80",
    'swiss-alps': "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=2000&h=1000&q=80",
    'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&h=1000&q=80",
    'cruise-lines': "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2000&h=1000&q=80",
    'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=2000&h=1000&q=80",
    'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&h=1000&q=80",
    'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&h=1000&q=80",
    'abu-dhabi': "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&h=1000&q=80",
    'ayia-napa': "https://images.unsplash.com/photo-1518358246973-95637f473611?auto=format&fit=crop&w=2000&h=1000&q=80",
  };
  
  // Use destination specific image if available
  if (destinationId in destinationImageMap) {
    console.log(`ImageHelper: Using destination map image for ${destinationId}: ${destinationImageMap[destinationId]}`);
    return destinationImageMap[destinationId];
  }
  
  // Return a colored placeholder with destination name
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
  
  // Special cases for certain destinations with direct hardcoded paths - use these FIRST for maximum reliability
  const specialDestinations: Record<string, string> = {
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
    'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=2000&h=1000&q=80",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&h=1000&q=80"
  };
  
  if (destinationId in specialDestinations) {
    console.log(`ImageHelper: Using special direct path for ${destinationId}: ${specialDestinations[destinationId]}`);
    return specialDestinations[destinationId];
  }
  
  // Return the destination ID as is (will be processed later in the component)
  return destinationId;
};
