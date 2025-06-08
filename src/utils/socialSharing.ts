import { DestinationId } from "@/types/definitions";

// Main hero image - using a working Unsplash image for better compatibility
export const DEFAULT_SOCIAL_IMAGE = 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';

// Helper function to ensure image URLs are absolute
export const getAbsoluteImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Make sure we're using the full domain name even in development
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

// Create a record with all destination IDs using working Unsplash images
const defaultDestinations: Record<DestinationId, string> = {} as Record<DestinationId, string>;

// Set all destinations to use the default image - only using valid DestinationIds
const allDestinationIds: DestinationId[] = [
  'london', 'paris', 'barcelona', 'cyprus', 'rome', 'abu-dhabi', 'crete', 
  'tokyo', 'thailand', 'hotel-chains', 'new-york', 'portugal', 'swiss-alps', 
  'koh-samui', 'turkey', 'cruise-lines', 'toronto', 'ayia-napa', 'tuscany', 
  'gluten-free-europe', 'athens', 'eilat'
];

allDestinationIds.forEach(id => {
  // Always use absolute URLs for social sharing - using working Unsplash images
  defaultDestinations[id] = DEFAULT_SOCIAL_IMAGE;
});

// Override with specific working images for destinations - ALWAYS USE WORKING UNSPLASH URLS
export const DESTINATION_OG_IMAGES: Record<DestinationId, string> = {
  ...defaultDestinations,
  // Using verified working Unsplash images for consistent social sharing
  'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'paris': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'cyprus': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'rome': 'https://images.unsplash.com/photo-1552832230-c0197047daf6?auto=format&fit=crop&w=1200&q=80',
  'abu-dhabi': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
  'crete': 'https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80',
  'tokyo': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80',
  'thailand': 'https://images.unsplash.com/photo-1539650116574-75c0c6d73fb4?auto=format&fit=crop&w=1200&q=80',
  'hotel-chains': 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  'new-york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'portugal': 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80',
  'swiss-alps': 'https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=1200&q=80',
  'koh-samui': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
  'turkey': 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80',
  'cruise-lines': 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
  'toronto': 'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80',
  'ayia-napa': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  'tuscany': 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80',
  'gluten-free-europe': 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
  'athens': 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80',
  'eilat': 'https://images.unsplash.com/photo-1544918796-60e440755919?auto=format&fit=crop&w=1200&q=80'
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
