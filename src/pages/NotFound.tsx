
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MainMenu } from "@/components/MainMenu";
import { Home, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";

const NotFound = () => {
  // Set proper 404 status code
  useEffect(() => {
    // This code will execute only in the browser, not during server-side rendering
    const meta = document.createElement('meta');
    meta.httpEquiv = 'status';
    meta.content = '404';
    document.head.appendChild(meta);
    
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 - Page Not Found | Allergy Free Travel</title>
        <meta name="robots" content="noindex, follow" />
        <meta httpEquiv="status" content="404" />
      </Helmet>
      
      {/* Navigation */}
      <nav className="bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-12 w-auto" 
            />
            <span>Allergy Free Travel</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Error content */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <img 
            src="/lovable-uploads/0963bc18-ba0e-4f90-b259-dd5a82880eae.png"
            alt="404 Error"
            className="w-full max-w-xs mx-auto"
          />
          
          <h1 className="text-4xl font-display font-bold text-gray-800">Page Not Found</h1>
          
          <p className="text-lg text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/">
              <Button className="w-full sm:w-auto gap-2">
                <Home size={18} />
                Go to Homepage
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto gap-2"
              onClick={() => window.history.back()}
            >
              <ArrowLeft size={18} />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
