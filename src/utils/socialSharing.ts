
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
export const DEFAULT_SOCIAL_IMAGE = '/lovable-uploads/e8b4dc3d-60a2-4fb7-bc33-77580f4d249c.png';

/**
 * Force Facebook to re-scrape the current page
 * @param url The URL to re-scrape (defaults to current page)
 */
export const forceFacebookRescrape = (url?: string) => {
  const targetUrl = url || window.location.href;
  const scrapeUrl = `https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(targetUrl)}`;
  console.log(`To refresh Facebook cache, visit: ${scrapeUrl}`);
};
