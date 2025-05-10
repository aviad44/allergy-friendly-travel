
import React from 'react';

export const HeroImageOverlay: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none"
      data-testid="hero-image-overlay"
    ></div>
  );
};
