import { DestinationId } from "@/types/definitions";

// Main hero image - using a reliable hotel/travel image from Unsplash
export const DEFAULT_SOCIAL_IMAGE = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80';

// Helper function to ensure image URLs are absolute
export const getAbsoluteImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Make sure we're using the full domain name even in development
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

// Destination-specific images - each destination gets its unique image
export const DESTINATION_OG_IMAGES: Record<DestinationId, string> = {
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'paris': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'cyprus': 'https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png',
  'rome': 'https://www.allergy-free-travel.com/lovable-uploads/decde333-fd7d-4147-8bad-637fbf08028c.png',
  'abu-dhabi': 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80',
  'crete': 'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
  'thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=1200&q=80',
  'hotel-chains': 'https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png',
  'new-york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
  'swiss-alps': 'https://www.allergy-free-travel.com/lovable-uploads/a53b2ba4-d551-4fcd-bd11-36c4643be95b.png',
  'koh-samui': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'turkey': 'https://www.allergy-free-travel.com/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png',
  'cruise-lines': 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1200&q=80',
  'toronto': 'https://www.allergy-free-travel.com/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png',
  'ayia-napa': 'https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png',
  'tuscany': 'https://www.allergy-free-travel.com/lovable-uploads/ea1edce9-b144-449c-a4c7-0e3f02c54be9.png',
  'gluten-free-europe': 'https://www.allergy-free-travel.com/lovable-uploads/f28f531e-9914-4d6c-9971-afd6d989b8e5.png',
  'athens': 'https://www.allergy-free-travel.com/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png',
  'eilat': 'https://www.allergy-free-travel.com/lovable-uploads/a25821a5-c6f9-44ab-96b8-648e020350b3.png',
  'airlines': 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
  'amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=1200&q=80',
  'italy': 'https://www.allergy-free-travel.com/lovable-uploads/italy-restaurant-hero.jpg'
};

// Pre-load the default image for better performance
export const preloadDefaultImage = () => {
  const img = new Image();
  img.src = DEFAULT_SOCIAL_IMAGE;
};

// Function to update Open Graph meta tags - useful for dynamic content changes
export const updateMetaTags = (
  imageUrl: string, 
  title: string = "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions",
  description: string = "Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more."
) => {
  // Ensure image URL is absolute
  const absoluteImageUrl = getAbsoluteImageUrl(imageUrl);
  
  // Update essential meta tags
  const updateTag = (selector: string, attr: string, value: string) => {
    const element = document.querySelector(selector) as HTMLMetaElement;
    if (element) {
      element.setAttribute(attr, value);
    }
  };
  
  // Primary Open Graph tags
  updateTag('meta[property="og:image"]', 'content', absoluteImageUrl);
  updateTag('meta[property="og:image:secure_url"]', 'content', absoluteImageUrl);
  updateTag('meta[property="og:title"]', 'content', title);
  updateTag('meta[property="og:description"]', 'content', description);
  
  // Twitter tags
  updateTag('meta[name="twitter:image"]', 'content', absoluteImageUrl);
  updateTag('meta[name="twitter:title"]', 'content', title);
  updateTag('meta[name="twitter:description"]', 'content', description);
  
  // Other important tags for cross-platform sharing
  updateTag('link[rel="image_src"]', 'href', absoluteImageUrl);
  
  const thumbnailUrls = document.querySelectorAll('link[itemprop="thumbnailUrl"]');
  thumbnailUrls.forEach(el => el.setAttribute('href', absoluteImageUrl));
  
  console.log('Updated meta tags with image:', absoluteImageUrl);
  
  return { imageUrl: absoluteImageUrl, title, description };
};
