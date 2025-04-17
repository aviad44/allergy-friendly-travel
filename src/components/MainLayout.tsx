
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
