
import React from 'react';
import { SearchBar } from '@/components/search/SearchBar';

export const HeroSection = () => {
  return (
    <section 
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden w-full font-['Poppins']"
      style={{
        backgroundImage: 'url("/lovable-uploads/4947cdd5-ba7b-4184-82a1-194a47b9a29a.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '110vh',
        opacity: 1
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative z-10 container mx-auto px-4 -mt-16 sm:mt-0">
        <div className="mx-auto max-w-[90%] sm:max-w-[700px]">
          <div 
            className="text-center p-6 sm:p-10 rounded-2xl backdrop-blur-sm transition-all duration-300 ease-in-out"
            style={{ backgroundColor: 'rgba(0, 85, 102, 0.5)' }}
          >
            <h1 className="text-[1.75rem] sm:text-[2.2rem] font-bold leading-tight sm:leading-relaxed mb-4 text-white drop-shadow-md">
              <span className="block">Find Your Perfect</span>
              <span className="block">
                Food Allergy Friendly Hotel
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl mb-8 text-white font-medium drop-shadow-md max-w-xl mx-auto">
              Find hotels that understand your allergy needs for a safe and enjoyable stay
            </p>
            
            <div className="transform transition-all duration-300 hover:scale-[1.02]">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
