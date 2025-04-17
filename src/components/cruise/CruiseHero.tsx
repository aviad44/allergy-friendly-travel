
import React from 'react';

interface CruiseHeroProps {
  baseUrl: string;
}

export const CruiseHero: React.FC<CruiseHeroProps> = ({ baseUrl }) => {
  return (
    <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden">
      <img 
        src="https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
        alt="Luxury cruise ship sailing on blue ocean - allergy-friendly cruising" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-3xl md:text-5xl font-bold mb-2">
            <span className="inline-block text-sky-200">Best Cruise Lines</span>
            <span className="inline-block text-teal-300"> for Food Allergies</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Real Reviews & Expert Rankings for 2025
          </p>
        </div>
      </div>
    </div>
  );
};
