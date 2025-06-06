
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SOCIAL_IMAGE, DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

/**
 * This component dynamically handles social sharing metadata across all pages
 * It ensures images are properly displayed when sharing on Facebook, WhatsApp, Twitter, and other platforms
 */
export const SocialSharingHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Debug information to verify the component is functioning
    console.log('SocialSharingHandler initialized');
    
    // Detect if running in a Facebook user agent
    const isFacebookBot = /facebookexternalhit|Facebot|XING-contained\/|LinkedInBot|Twitterbot|WhatsApp/i.test(
      navigator.userAgent || ''
    );
    
    if (isFacebookBot) {
      console.log('Social media crawler detected!');
    }
    
    // Get the appropriate image based on the current route
    let imageUrl = DEFAULT_SOCIAL_IMAGE;
    let pageTitle = "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions";
    let pageDescription = "Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more.";
    
    // Check if we're on a destination page and use its specific image
    const pathParts = location.pathname.split('/');
    if (pathParts.length > 2 && pathParts[1] === 'destinations') {
      const destId = pathParts[2] as keyof typeof DESTINATION_OG_IMAGES;
      if (DESTINATION_OG_IMAGES[destId]) {
        imageUrl = DESTINATION_OG_IMAGES[destId];
        
        // Update title and description for better SEO on destination pages
        const destName = destId.split('-').map(word => 
          word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        pageTitle = `Allergy-Friendly Hotels in ${destName} | Safe Dining Guide`;
        pageDescription = `Discover the best allergy-friendly hotels in ${destName}. Reviews of accommodations catering to gluten-free, dairy-free, and other dietary restrictions.`;
      }
    }
    
    // Function to update or create meta tags
    const updateMetaTag = (selector: string, attribute: string, value: string) => {
      let element = document.querySelector(selector) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, selector.replace(/[[\]"]/g, ''));
        document.head.appendChild(element);
      }
      element.content = value;
    };
    
    // Update essential OpenGraph tags
    updateMetaTag('meta[property="og:image"]', 'property', imageUrl);
    updateMetaTag('meta[property="og:image:secure_url"]', 'property', imageUrl);
    updateMetaTag('meta[property="og:title"]', 'property', pageTitle);
    updateMetaTag('meta[property="og:description"]', 'property', pageDescription);
    updateMetaTag('meta[property="og:url"]', 'property', window.location.href);
    
    // Update Twitter tags
    updateMetaTag('meta[name="twitter:image"]', 'name', imageUrl);
    updateMetaTag('meta[name="twitter:title"]', 'name', pageTitle);
    updateMetaTag('meta[name="twitter:description"]', 'name', pageDescription);
    
    // Update WhatsApp specific tags
    const thumbnailUrls = document.querySelectorAll('link[itemprop="thumbnailUrl"]');
    thumbnailUrls.forEach(el => el.setAttribute('href', imageUrl));
    
    const thumbnailLinks = document.querySelectorAll('link[itemprop="url"]');
    thumbnailLinks.forEach(el => el.setAttribute('href', imageUrl));
    
    // Update link[rel="image_src"] for Facebook
    const imageSrcLinks = document.querySelectorAll('link[rel="image_src"]');
    imageSrcLinks.forEach(el => el.setAttribute('href', imageUrl));
    
    console.log('Updated social sharing metadata', {
      image: imageUrl,
      title: pageTitle
    });
    
    // Force a second update after a slight delay to handle race conditions
    setTimeout(() => {
      updateMetaTag('meta[property="og:image"]', 'property', imageUrl);
      updateMetaTag('meta[property="og:image:secure_url"]', 'property', imageUrl);
      
      // Double-check that critical tags were updated correctly
      const ogImage = document.querySelector('meta[property="og:image"]');
      console.log('Verified OG Image tag:', ogImage ? (ogImage as HTMLMetaElement).content : 'MISSING!');
    }, 500);
  }, [location.pathname]);
  
  return null; // This component doesn't render anything
};

export default SocialSharingHandler;
