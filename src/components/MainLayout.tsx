
import { Outlet } from "react-router-dom";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";
import { DefaultMetaTags } from "@/components/DefaultMetaTags";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/// <reference path="../vite-env.d.ts" />
// Removed duplicate FB declaration - now only defined in vite-env.d.ts

export const MainLayout = () => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("Page changed to:", location.pathname);
    
    // Update meta tags for the current page
    if (typeof document !== 'undefined') {
      // Force Facebook to re-scrape the page when shared - Add a delay to ensure all meta tags are loaded
      setTimeout(() => {
        // CRITICAL: Ensure the URL meta tags are correct and absolute
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        const ogUrlTag = document.querySelector('meta[property="og:url"]');
        const ogImageTag = document.querySelector('meta[property="og:image"]');
        const fullUrl = window.location.origin + location.pathname;
        
        console.log("Checking meta tags...");
        console.log("og:url tag exists:", !!ogUrlTag);
        console.log("og:image tag exists:", !!ogImageTag);
        
        if (canonicalTag) {
          canonicalTag.setAttribute('href', fullUrl);
          console.log("Updated canonical URL to:", fullUrl);
        }
        
        if (ogUrlTag) {
          ogUrlTag.setAttribute('content', fullUrl);
          console.log("Updated og:url to:", fullUrl);
        }
        
        // CRITICAL: Ensure og:image has absolute URL
        if (ogImageTag) {
          const imageUrl = ogImageTag.getAttribute('content');
          if (imageUrl) {
            // If the URL is relative (doesn't start with http), make it absolute
            if (!imageUrl.startsWith('http')) {
              const absoluteImageUrl = window.location.origin + imageUrl;
              ogImageTag.setAttribute('content', absoluteImageUrl);
              console.log("Fixed relative og:image URL to absolute:", absoluteImageUrl);
            } else {
              console.log("og:image already absolute:", imageUrl);
            }
          } else {
            console.log("Warning: og:image has no content attribute");
          }
        } else {
          console.log("Error: No og:image tag found on page");
        }
        
        // Debug all meta tags
        const allMetaTags = document.querySelectorAll('meta[property^="og:"]');
        console.log(`Found ${allMetaTags.length} OG meta tags:`);
        allMetaTags.forEach(tag => {
          const prop = tag.getAttribute('property');
          const content = tag.getAttribute('content');
          console.log(`${prop}: ${content}`);
        });
        
        // Add Facebook SDK for re-scraping
        const addFacebookSDK = () => {
          if (!document.getElementById('facebook-jssdk')) {
            const fbScript = document.createElement('script');
            fbScript.id = 'facebook-jssdk';
            fbScript.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v18.0";
            fbScript.async = true;
            fbScript.defer = true;
            fbScript.crossOrigin = 'anonymous';
            fbScript.onload = () => {
              // Safe check for FB object before using it
              if (window.FB) {
                console.log("Facebook SDK loaded, refreshing cache");
                window.FB.XFBML.parse();
              } else {
                console.log("Facebook SDK loaded but FB object not available");
              }
            };
            document.body.appendChild(fbScript);
            console.log("Facebook SDK added to page");
          } else if (window.FB) {
            console.log("Facebook SDK already loaded, refreshing cache");
            window.FB.XFBML.parse();
          }
        };
        
        // Add Facebook SDK
        addFacebookSDK();
      }, 300); // Increased delay to ensure all meta tags are loaded
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
