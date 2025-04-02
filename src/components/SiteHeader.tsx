
import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket } from "lucide-react";
import { MainMenu } from '@/components/MainMenu';
import { HOME_CONTENT } from '@/constants/home';

export const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50">
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link 
            to="/" 
            aria-label="Return to homepage" 
            className="flex items-center space-x-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors"
          >
            <img 
              src="/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            <span>{HOME_CONTENT.navigation.brand}</span>
          </Link>
          
          <MainMenu />
        </div>
      </nav>
    </header>
  );
};
