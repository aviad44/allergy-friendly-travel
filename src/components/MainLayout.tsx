
import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export const MainLayout = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("Page changed to:", location.pathname);
    
    // Update meta tags for the current page
    if (typeof document !== 'undefined') {
      // Update canonical URL for the current page
      const canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (canonicalTag) {
        canonicalTag.href = window.location.href;
      }
      
      // Update og:url for the current page
      const ogUrlTag = document.querySelector('meta[property="og:url"]') as HTMLMetaElement;
      if (ogUrlTag) {
        ogUrlTag.content = window.location.href;
      }
      
      // Ensure WhatsApp specific tags are present
      const ensureWhatsAppCompatibility = () => {
        // Check if og:locale exists
        const ogLocaleTag = document.querySelector('meta[property="og:locale"]');
        if (!ogLocaleTag) {
          const metaTag = document.createElement('meta');
          metaTag.setAttribute('property', 'og:locale');
          metaTag.setAttribute('content', 'en_US');
          document.head.appendChild(metaTag);
        }
        
        // Ensure image secure_url exists
        const ogImageTag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
        if (ogImageTag) {
          const secureUrlTag = document.querySelector('meta[property="og:image:secure_url"]');
          if (!secureUrlTag) {
            const metaTag = document.createElement('meta');
            metaTag.setAttribute('property', 'og:image:secure_url');
            metaTag.setAttribute('content', ogImageTag.content);
            document.head.appendChild(metaTag);
          }
        }
        
        // Add itemprop thumbnail for WhatsApp
        const addThumbnailItemprop = () => {
          const ogImageTag = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
          if (ogImageTag && !document.querySelector('[itemprop="thumbnailUrl"]')) {
            // Add thumbnail URL
            const thumbUrlLink = document.createElement('link');
            thumbUrlLink.setAttribute('itemprop', 'thumbnailUrl');
            thumbUrlLink.setAttribute('href', ogImageTag.content);
            document.head.appendChild(thumbUrlLink);
            
            // Add thumbnail object
            const thumbSpan = document.createElement('span');
            thumbSpan.setAttribute('itemprop', 'thumbnail');
            thumbSpan.setAttribute('itemscope', '');
            thumbSpan.setAttribute('itemtype', 'http://schema.org/ImageObject');
            
            const thumbLink = document.createElement('link');
            thumbLink.setAttribute('itemprop', 'url');
            thumbLink.setAttribute('href', ogImageTag.content);
            
            thumbSpan.appendChild(thumbLink);
            document.head.appendChild(thumbSpan);
          }
        };
        
        addThumbnailItemprop();
      };
      
      ensureWhatsAppCompatibility();
    }
    
    // For Facebook to re-scrape the page
    if (typeof window !== 'undefined') {
      // Force Facebook to re-scrape the page
      const fbScript = document.createElement('script');
      fbScript.innerHTML = `
        if (typeof FB !== 'undefined') {
          console.log("Refreshing Facebook cache");
          FB.XFBML.parse();
        }
      `;
      document.body.appendChild(fbScript);
      
      return () => {
        if (document.body.contains(fbScript)) {
          document.body.removeChild(fbScript);
        }
      };
    }
  }, [location]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <DefaultMetaTags />
      <SiteHeader />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
