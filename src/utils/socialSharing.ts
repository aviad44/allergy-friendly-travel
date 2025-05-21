
/**
 * Utility functions for social media sharing optimization
 */

/**
 * Ensures all image URLs are absolute (required for Facebook's crawler)
 * @param imageUrl The image URL that may be relative or absolute
 * @returns Absolute URL for the image
 */
export const getAbsoluteImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  // If already an absolute URL (starts with http/https), return as is
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // For Unsplash URLs with photo- prefix, add the full path
  if (imageUrl.startsWith('photo-') && !imageUrl.startsWith('http')) {
    return `https://images.unsplash.com/${imageUrl}?auto=format&fit=crop&w=1200&q=80`;
  }
  
  // Ensure the URL starts with a slash
  const normalizedPath = imageUrl.startsWith('/') 
    ? imageUrl 
    : `/${imageUrl}`;
  
  // Create absolute URL using the base domain
  return `https://www.allergy-free-travel.com${normalizedPath}`;
};

/**
 * Generates a set of standard OpenGraph meta tags for social sharing
 * @param title Page title
 * @param description Page description
 * @param imageUrl Image URL (can be absolute or relative)
 * @param url Canonical URL of the page
 * @returns Object containing meta tag attributes
 */
export const generateSocialTags = (
  title: string,
  description: string,
  imageUrl: string,
  url: string
) => {
  const absoluteImageUrl = getAbsoluteImageUrl(imageUrl);
  const absoluteUrl = url.startsWith('http') 
    ? url 
    : `https://www.allergy-free-travel.com${url.startsWith('/') ? '' : '/'}${url}`;
  
  console.log(`Social Tags Generated for ${absoluteUrl}`);
  console.log(`- Image: ${absoluteImageUrl}`);
  
  return {
    title,
    description,
    url: absoluteUrl,
    image: absoluteImageUrl
  };
};

/**
 * Default fallback image to use when no specific image is provided
 */
export const DEFAULT_SOCIAL_IMAGE = '/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';

/**
 * Force Facebook to re-scrape the current page
 * @param url The URL to re-scrape (defaults to current page)
 */
export const forceFacebookRescrape = (url?: string) => {
  const targetUrl = url || window.location.href;
  const scrapeUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(targetUrl)}`;
  console.log(`To refresh Facebook cache, visit: ${scrapeUrl}`);
  return scrapeUrl;
};

/**
 * Maps destination IDs to their specific OG images to ensure consistency
 */
export const DESTINATION_OG_IMAGES: Record<string, string> = {
  'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
  'cyprus': "https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", 
  'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  'hotel-chains': "https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
  'athens': "https://www.allergy-free-travel.com/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png",
  'ayia-napa': "https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
  'rome': "https://www.allergy-free-travel.com/lovable-uploads/decde333-fd7d-4147-8bad-637fbf08028c.png",
  'paris': "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  'tuscany': "https://www.allergy-free-travel.com/lovable-uploads/ea1edce9-b144-449c-a4c7-0e3f02c54be9.png",
  'swiss-alps': "https://www.allergy-free-travel.com/lovable-uploads/a53b2ba4-d551-4fcd-bd11-36c4643be95b.png",
  'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
  'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
  'eilat': "https://www.allergy-free-travel.com/lovable-uploads/48a5bd4e-8c30-41ef-835e-981d6731b3b8.png"
};
