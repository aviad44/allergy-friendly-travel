
import { DestinationId } from "@/types/definitions";

// Main hero image - using your beautiful homepage pool image with palm trees
export const DEFAULT_SOCIAL_IMAGE = 'https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';

// Helper function to ensure image URLs are absolute
export const getAbsoluteImageUrl = (imageUrl: string): string => {
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Make sure we're using the full domain name even in development
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  return `${baseUrl}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};

// Create a record with all destination IDs using your homepage image as default
const defaultDestinations: Record<DestinationId, string> = {} as Record<DestinationId, string>;

// Set all destinations to use your beautiful homepage image
const allDestinationIds: DestinationId[] = [
  'london', 'paris', 'barcelona', 'cyprus', 'rome', 'abu-dhabi', 'crete', 
  'tokyo', 'thailand', 'hotel-chains', 'new-york', 'portugal', 'swiss-alps', 
  'koh-samui', 'turkey', 'cruise-lines', 'toronto', 'ayia-napa', 'tuscany', 
  'gluten-free-europe', 'athens', 'eilat'
];

allDestinationIds.forEach(id => {
  // Always use absolute URLs for social sharing - using your homepage image
  defaultDestinations[id] = DEFAULT_SOCIAL_IMAGE;
});

// Override with specific working images for destinations - using your homepage image as primary
export const DESTINATION_OG_IMAGES: Record<DestinationId, string> = {
  ...defaultDestinations,
  // Using your beautiful homepage pool image for key destinations
  'london': DEFAULT_SOCIAL_IMAGE,
  'paris': DEFAULT_SOCIAL_IMAGE,
  'barcelona': DEFAULT_SOCIAL_IMAGE,
  'cyprus': DEFAULT_SOCIAL_IMAGE,
  'rome': DEFAULT_SOCIAL_IMAGE,
  'abu-dhabi': DEFAULT_SOCIAL_IMAGE,
  'crete': DEFAULT_SOCIAL_IMAGE,
  'tokyo': DEFAULT_SOCIAL_IMAGE,
  'thailand': DEFAULT_SOCIAL_IMAGE,
  'hotel-chains': DEFAULT_SOCIAL_IMAGE,
  'new-york': DEFAULT_SOCIAL_IMAGE,
  'portugal': DEFAULT_SOCIAL_IMAGE,
  'swiss-alps': DEFAULT_SOCIAL_IMAGE,
  'koh-samui': DEFAULT_SOCIAL_IMAGE,
  'turkey': DEFAULT_SOCIAL_IMAGE,
  'cruise-lines': DEFAULT_SOCIAL_IMAGE,
  'toronto': DEFAULT_SOCIAL_IMAGE,
  'ayia-napa': DEFAULT_SOCIAL_IMAGE,
  'tuscany': DEFAULT_SOCIAL_IMAGE,
  'gluten-free-europe': DEFAULT_SOCIAL_IMAGE,
  'athens': DEFAULT_SOCIAL_IMAGE,
  'eilat': DEFAULT_SOCIAL_IMAGE
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
