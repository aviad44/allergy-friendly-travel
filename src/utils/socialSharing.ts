
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

export const DESTINATION_OG_IMAGES: Record<DestinationId, string> = {
  'london': 'https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png',
  'paris': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'barcelona': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'cyprus': 'https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png',
  'rome': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'abu-dhabi': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'crete': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'tokyo': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'thailand': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'hotel-chains': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'new-york': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'portugal': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'swiss-alps': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'koh-samui': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'turkey': 'https://www.allergy-free-travel.com/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png',
  'cruise-lines': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'toronto': 'https://www.allergy-free-travel.com/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png',
  'ayia-napa': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'tuscany': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'gluten-free-europe': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'athens': 'https://www.allergy-free-travel.com/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png',
  'eilat': 'https://www.allergy-free-travel.com/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png'
};
