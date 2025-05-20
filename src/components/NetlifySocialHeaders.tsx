
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

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
      
      console.log("Added social crawler detection markers to page");
    }
    
    // Add verification that OG tags are present
    setTimeout(() => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      const ogTitle = document.querySelector('meta[property="og:title"]');
      
      if (!ogImage || !ogTitle) {
        console.error("Critical OG tags missing! Social shares may not work properly");
      } else {
        console.log("OG tags verified: Image and Title present");
        console.log(`OG Image: ${ogImage.getAttribute('content')}`);
      }
    }, 500);
  }, [location.pathname]);
  
  return null; // This is a utility component that doesn't render anything
};
