
import React from 'react';
import { SearchBar } from '@/components/search/SearchBar';

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden w-full font-['Poppins']"
      style={{
        backgroundImage: 'url("/lovable-uploads/fc0fa64e-7d3f-43fa-b5fa-63b92b3f3853.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="relative z-10 container mx-auto px-4 flex items-center justify-center h-full">
        <div className="mx-auto max-w-[90%] sm:max-w-[700px] w-full">
          {/* Hero content with semi-transparent teal background */}
          <div 
            className="text-center p-6 sm:p-10 rounded-2xl space-y-6"
            style={{ backgroundColor: 'rgba(0, 85, 102, 0.5)' }}
          >
            <h1 className="text-[1.5em] sm:text-[2.2em] font-bold leading-relaxed mb-4 text-white">
              <span className="block">Find Your Perfect</span>
              <span className="block">
                Food Allergy Friendly Hotel
              </span>
            </h1>
            
            <p className="text-base sm:text-[1.1em] mb-6 text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
              Find hotels that understand your allergy needs for a safe and enjoyable stay
            </p>
            
            {/* Search bar component */}
            <SearchBar />
          </div>
        </div>
      </div>
    </section>
  );
};
