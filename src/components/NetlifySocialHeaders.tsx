
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DESTINATION_OG_IMAGES, DEFAULT_SOCIAL_IMAGE } from "@/utils/socialSharing";

/**
 * This component adds special headers to help Netlify detect social media crawlers
 * It's used globally to ensure all pages are properly processed when shared
 */
export const NetlifySocialHeaders = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Add a special HTML comment that helps with crawler detection
    // This is only visible in the source code, not displayed
    const metaComment = document.createComment(
      " Social Media Optimization - Headers for Facebook/WhatsApp/Twitter crawlers "
    );
    
    if (document.head && !document.querySelector('meta[name="x-social-enabled"]')) {
      document.head.appendChild(metaComment);
      
      // Add meta tag to indicate social optimization is enabled
      const metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "x-social-enabled");
      metaTag.setAttribute("content", "true");
      document.head.appendChild(metaTag);
      
      // Add special Facebook debug meta tag
      const fbMetaTag = document.createElement("meta");
      fbMetaTag.setAttribute("property", "fb:pages");
      fbMetaTag.setAttribute("content", "allergy.free.travel");
      document.head.appendChild(fbMetaTag);
      
      console.log("Added social crawler detection markers to page");
    }
    
    // Add verification that OG tags are present
    setTimeout(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      
      if (!ogImage || !ogTitle) {
        console.error("Critical OG tags missing! Social shares may not work properly");
        
        // Emergency fallback - add critical OG tags if missing
        if (!ogImage) {
          // Determine which image to use based on the current route
          let imageUrl = DEFAULT_SOCIAL_IMAGE;
          
          // Check if we're on a destination page
          const pathParts = location.pathname.split('/');
          if (pathParts.length > 2 && pathParts[1] === 'destinations') {
            const destId = pathParts[2];
            if (DESTINATION_OG_IMAGES[destId]) {
              imageUrl = DESTINATION_OG_IMAGES[destId];
            }
          }
          
          const emergencyOgImage = document.createElement("meta");
          emergencyOgImage.setAttribute("property", "og:image");
          emergencyOgImage.setAttribute("content", imageUrl);
          document.head.appendChild(emergencyOgImage);
          console.log(`EMERGENCY: Added missing og:image tag with ${imageUrl}`);
          
          // Also add image_src link for Facebook
          const linkElement = document.createElement('link');
          linkElement.rel = 'image_src';
          linkElement.href = imageUrl;
          document.head.appendChild(linkElement);
        }
        
        if (!ogTitle) {
          const emergencyOgTitle = document.createElement("meta");
          emergencyOgTitle.setAttribute("property", "og:title");
          emergencyOgTitle.setAttribute("content", "Allergy-Free Travel – Safe Hotels for Dietary Restrictions");
          document.head.appendChild(emergencyOgTitle);
          console.log("EMERGENCY: Added missing og:title tag");
        }
      } else {
        console.log("OG tags verified: Image and Title present");
        console.log(`OG Image: ${ogImage.getAttribute('content')}`);
      }
    }, 500);
  }, [location.pathname]);
  
  return null; // This is a utility component that doesn't render anything
};
