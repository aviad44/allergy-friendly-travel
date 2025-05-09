
import { DestinationId } from "@/types/definitions";

// Get a good image URL for each destination 
export const getDestinationImageUrl = (destinationId: string, providedSource?: string): string => {
  console.log("Getting image source for destination:", destinationId);
  
  // If a source is provided and it's a complete URL, use it
  if (providedSource && (providedSource.startsWith('http') || providedSource.startsWith('/'))) {
    return providedSource;
  }
  
  // For special destinations, use custom images
  if (destinationId === 'turkey') {
    console.log("Turkey destination detected - using Pamukkale image");
    return "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png";
  }
  
  if (destinationId === 'hotel-chains') {
    return "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png";
  }
  
  if (destinationId === 'crete') {
    return "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=2000&h=1000&q=80";
  }
  
  if (destinationId === 'cyprus') {
    return "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&h=1000&q=80";
  }
  
  // For specific destinations, use curated images (high reliability)
  const destinationImageMap: Record<string, string> = {
    'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&h=1000&q=80",
    'paris': "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&h=1000&q=80",
    'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&h=1000&q=80",
    'cyprus': "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&h=1000&q=80",
    'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=2000&h=1000&q=80",
    'swiss-alps': "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=2000&h=1000&q=80",
    'koh-samui': "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&h=1000&q=80",
    'cruise-lines': "https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=2000&h=1000&q=80",
    'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=2000&h=1000&q=80",
    'thailand': "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&h=1000&q=80",
    'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=2000&h=1000&q=80",
    'abu-dhabi': "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&h=1000&q=80",
    'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=2000&h=1000&q=80",
    'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
    'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
    'ayia-napa': "https://images.unsplash.com/photo-1518358246973-95637f473611?auto=format&fit=crop&w=2000&h=1000&q=80",
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
  
  // Special cases for certain destinations
  if (destinationId === 'turkey') {
    return '/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png';
  }
  
  if (destinationId === 'hotel-chains') {
    return '/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png';
  }
  
  if (destinationId === 'crete') {
    return 'photo-1469796466635-455ede028aca';
  }
  
  if (destinationId === 'cyprus') {
    return 'photo-1500375592092-40eb2168fd21';
  }
  
  if (destinationId === 'toronto') {
    return '/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png';
  }
  
  // Map destinations to their specific photo IDs for consistency
  const photoIdMap: Record<string, string> = {
    'london': "photo-1513635269975-59663e0ac1ad",
    'paris': "photo-1502602898657-3e91760cbb34", 
    'barcelona': "photo-1583422409516-2895a77efded",
    'cyprus': "photo-1500375592092-40eb2168fd21",
    'new-york': "photo-1496442226666-8d4d0e62e6e9",
    'swiss-alps': "photo-1491555103944-7c647fd857e6",
    'koh-samui': "photo-1507525428034-b723cf961d3e",
    'cruise-lines': "photo-1548574505-5e239809ee19",
    'tokyo': "photo-1542051841857-5f90071e7989",
    'thailand': "photo-1552465011-b4e21bf6e79a",
    'portugal': "photo-1555881400-74d7acaacd8b",
    'abu-dhabi': "photo-1512632578888-169bbbc64f33",
    'crete': "photo-1469796466635-455ede028aca",
    'hotel-chains': "1e92be73-4bcc-4e75-9bb4-b500ed1ecd63", // Using the uploaded image ID
    'toronto': "e6eaaffe-010b-46ee-859c-aacff4659ad1",
    'ayia-napa': "photo-1518358246973-95637f473611",
  };
  
  return photoIdMap[destinationId] || destinationId;
};
