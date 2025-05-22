
import { DestinationId } from "@/types/definitions";

// Add default image for social sharing
export const DEFAULT_SOCIAL_IMAGE = 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png';

// Helper function to ensure image URLs are absolute
export const getAbsoluteImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

// Create a record with all destination IDs using the default image for those without a specific image
const defaultDestinations: Record<DestinationId, string> = {} as Record<DestinationId, string>;

// Set all destinations to use the default image
const allDestinationIds: DestinationId[] = [
  'london', 'paris', 'barcelona', 'cyprus', 'rome', 'abu-dhabi', 'crete', 
  'tokyo', 'thailand', 'hotel-chains', 'new-york', 'portugal', 'swiss-alps', 
  'koh-samui', 'turkey', 'cruise-lines', 'toronto', 'ayia-napa', 'tuscany', 
  'gluten-free-europe', 'athens', 'eilat', 'dubai', 'amsterdam', 'santorini', 
  'bali', 'cancun', 'venice', 'florence', 'prague', 'budapest', 'vienna', 
  'munich', 'singapore', 'sydney', 'cape-town', 'rio-de-janeiro', 'seoul', 
  'hong-kong', 'bangkok', 'istanbul', 'kyoto', 'auckland', 'seville', 
  'marrakech', 'cairo', 'dublin', 'nice', 'porto', 'lisbon', 'tel-aviv'
];

allDestinationIds.forEach(id => {
  defaultDestinations[id] = DEFAULT_SOCIAL_IMAGE;
});

// Override with specific images for destinations that have them
export const DESTINATION_OG_IMAGES: Record<DestinationId, string> = {
  ...defaultDestinations,
  'london': 'https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png',
  'paris': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'barcelona': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'cyprus': 'https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png',
  'rome': 'https://www.allergy-free-travel.com/lovable-uploads/decde333-fd7d-4147-8bad-637fbf08028c.png',
  'abu-dhabi': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'crete': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'tokyo': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'thailand': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'hotel-chains': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'new-york': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'portugal': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'swiss-alps': 'https://www.allergy-free-travel.com/lovable-uploads/a53b2ba4-d551-4fcd-bd11-36c4643be95b.png',
  'koh-samui': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'turkey': 'https://www.allergy-free-travel.com/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png',
  'cruise-lines': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'toronto': 'https://www.allergy-free-travel.com/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png',
  'ayia-napa': 'https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png',
  'tuscany': 'https://www.allergy-free-travel.com/lovable-uploads/ea1edce9-b144-449c-a4c7-0e3f02c54be9.png',
  'gluten-free-europe': 'https://www.allergy-free-travel.com/lovable-uploads/f28f531e-9914-4d6c-9971-afd6d989b8e5.png',
  'athens': 'https://www.allergy-free-travel.com/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png',
  'eilat': 'https://www.allergy-free-travel.com/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png',
  'tel-aviv': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png'
};
