
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { DEFAULT_SOCIAL_IMAGE, DESTINATION_OG_IMAGES, updateMetaTags } from '@/utils/socialSharing';

/**
 * This component dynamically handles social sharing metadata across all pages
 * It ensures images are properly displayed when sharing on Facebook, WhatsApp, Twitter, and other platforms
 */
export const SocialSharingHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Debug information to verify the component is functioning
    console.log('SocialSharingHandler initialized for:', location.pathname);
    console.log('Default social image being used:', DEFAULT_SOCIAL_IMAGE);
    
    // Detect if running in a Facebook user agent
    const isSocialCrawler = /facebookexternalhit|Facebot|XING-contained\/|LinkedInBot|Twitterbot|WhatsApp|Slackbot/i.test(
      navigator.userAgent || ''
    );
    
    if (isSocialCrawler) {
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
    
    // Force override to ensure correct image on homepage
    if (location.pathname === '/' || location.pathname === '') {
      imageUrl = 'https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png';
      console.log('Homepage detected, forcing correct image:', imageUrl);
    }
    
    // Function to create or update meta tags
    const updateOrCreateMetaTag = (property: string, content: string, tagType: 'meta' | 'link' = 'meta', attr = 'property') => {
      let element = document.querySelector(`${tagType}[${attr}="${property}"]`);
      if (!element) {
        element = document.createElement(tagType);
        element.setAttribute(attr, property);
        document.head.appendChild(element);
      }
      
      if (tagType === 'meta') {
        (element as HTMLMetaElement).content = content;
      } else if (tagType === 'link') {
        (element as HTMLLinkElement).href = content;
      }
    };
    
    // Update Open Graph meta tags
    updateOrCreateMetaTag('og:title', pageTitle);
    updateOrCreateMetaTag('og:description', pageDescription);
    updateOrCreateMetaTag('og:image', imageUrl);
    updateOrCreateMetaTag('og:image:secure_url', imageUrl);
    updateOrCreateMetaTag('og:url', window.location.href);
    updateOrCreateMetaTag('og:type', 'website');
    updateOrCreateMetaTag('og:site_name', 'Allergy-Free Travel');
    
    // Update Twitter Card tags
    updateOrCreateMetaTag('twitter:card', 'summary_large_image', 'meta', 'name');
    updateOrCreateMetaTag('twitter:title', pageTitle, 'meta', 'name');
    updateOrCreateMetaTag('twitter:description', pageDescription, 'meta', 'name');
    updateOrCreateMetaTag('twitter:image', imageUrl, 'meta', 'name');
    updateOrCreateMetaTag('twitter:image:alt', `${pageTitle} - Allergy-Free Travel`, 'meta', 'name');
    
    // Add image_src link for Facebook
    updateOrCreateMetaTag('image_src', imageUrl, 'link', 'rel');
    
    // Add thumbnailUrl for WhatsApp
    updateOrCreateMetaTag('thumbnailUrl', imageUrl, 'link', 'itemprop');
    
    // Ensure we have an thumbnail item with url attribute for WhatsApp and other platforms
    let thumbnailSpan = document.querySelector('span[itemprop="thumbnail"]');
    if (!thumbnailSpan) {
      thumbnailSpan = document.createElement('span');
      thumbnailSpan.setAttribute('itemprop', 'thumbnail');
      thumbnailSpan.setAttribute('itemscope', '');
      thumbnailSpan.setAttribute('itemtype', 'http://schema.org/ImageObject');
      document.head.appendChild(thumbnailSpan);
      
      const urlLink = document.createElement('link');
      urlLink.setAttribute('itemprop', 'url');
      urlLink.setAttribute('href', imageUrl);
      thumbnailSpan.appendChild(urlLink);
    } else {
      const urlLink = thumbnailSpan.querySelector('link[itemprop="url"]');
      if (urlLink) {
        urlLink.setAttribute('href', imageUrl);
      } else {
        const newUrlLink = document.createElement('link');
        newUrlLink.setAttribute('itemprop', 'url');
        newUrlLink.setAttribute('href', imageUrl);
        thumbnailSpan.appendChild(newUrlLink);
      }
    }
    
    // Add Open Graph prefix to html tag if not already there
    const htmlTag = document.querySelector('html');
    if (htmlTag && !htmlTag.getAttribute('prefix')?.includes('og:')) {
      const currentPrefix = htmlTag.getAttribute('prefix') || '';
      htmlTag.setAttribute('prefix', `${currentPrefix} og: https://ogp.me/ns#`.trim());
    }
    
    console.log('Social sharing tags updated for:', location.pathname);
    console.log('Using image:', imageUrl);
    
    // Force a second update after a slight delay to handle race conditions
    setTimeout(() => {
      updateOrCreateMetaTag('og:image', imageUrl);
      updateOrCreateMetaTag('og:image:secure_url', imageUrl);
      updateOrCreateMetaTag('image_src', imageUrl, 'link', 'rel');
      
      // Double-check that critical tags were updated correctly
      const ogImage = document.querySelector('meta[property="og:image"]');
      console.log('Verified OG Image tag:', ogImage ? (ogImage as HTMLMetaElement).content : 'MISSING!');
    }, 500);
    
  }, [location.pathname]);
  
  return null; // This component doesn't render anything
};

export default SocialSharingHandler;
