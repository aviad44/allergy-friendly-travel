
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
      // These functions ensure that the page-specific meta tags take precedence
      // and are not overwritten by the default ones
      
      // Force Facebook to re-scrape the page when shared
      // This is crucial for making sure Facebook picks up the page-specific
      // og:image rather than caching the default one
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
      
      // Wait for the helmet-managed tags to be injected first
      setTimeout(() => {
        // Ensure the URL meta tags are correct and absolute
        // This is especially important for og:url
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        const ogUrlTag = document.querySelector('meta[property="og:url"]');
        const fullUrl = window.location.origin + location.pathname;
        
        if (canonicalTag) {
          canonicalTag.setAttribute('href', fullUrl);
        }
        
        if (ogUrlTag) {
          ogUrlTag.setAttribute('content', fullUrl);
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
