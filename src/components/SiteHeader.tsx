
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";
import { MainMenu } from '@/components/MainMenu';
import { HOME_CONTENT } from '@/constants/home';
import { useIsMobile } from '@/hooks/use-mobile';

export const SiteHeader = () => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-50">
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-2 sm:py-3 flex justify-between items-center">
          <Link 
            to="/" 
            aria-label="Return to homepage" 
            className="flex items-center space-x-2 sm:space-x-3 text-xl sm:text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors"
          >
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-8 sm:h-10" 
            />
            {!isMobile && <span>{HOME_CONTENT.navigation.brand}</span>}
          </Link>
          
          <div className="sm:block">
            <MainMenu />
          </div>
        </div>
      </nav>
    </header>
  );
};
