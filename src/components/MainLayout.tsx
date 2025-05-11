
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
      // Force Facebook to re-scrape the page when shared
      const fbRefresh = () => {
        if (typeof window !== 'undefined' && 'FB' in window) {
          console.log("Refreshing Facebook cache");
          window.FB.XFBML.parse();
        }
      };
      
      // Add Facebook SDK for re-scraping capability
      const addFacebookSDK = () => {
        if (!document.getElementById('facebook-jssdk')) {
          const fbScript = document.createElement('script');
          fbScript.id = 'facebook-jssdk';
          fbScript.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
          fbScript.async = true;
          fbScript.defer = true;
          fbScript.crossOrigin = 'anonymous';
          fbScript.onload = fbRefresh;
          document.body.appendChild(fbScript);
        } else {
          fbRefresh();
        }
      };
      
      // Critical fix: Wait for page-specific meta tags to be injected first
      setTimeout(() => {
        // Ensure the URL meta tags are correct and absolute
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        const ogUrlTag = document.querySelector('meta[property="og:url"]');
        const ogImageTag = document.querySelector('meta[property="og:image"]');
        const fullUrl = window.location.origin + location.pathname;
        
        if (canonicalTag) {
          canonicalTag.setAttribute('href', fullUrl);
        }
        
        if (ogUrlTag) {
          ogUrlTag.setAttribute('content', fullUrl);
        }
        
        // Critical fix: Ensure og:image has absolute URL
        if (ogImageTag) {
          const imageUrl = ogImageTag.getAttribute('content');
          if (imageUrl && !imageUrl.startsWith('http')) {
            const absoluteImageUrl = window.location.origin + imageUrl;
            ogImageTag.setAttribute('content', absoluteImageUrl);
            console.log("Fixed relative og:image URL to absolute:", absoluteImageUrl);
          }
        }
        
        // Add Facebook SDK for re-scraping
        addFacebookSDK();
      }, 100);
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
