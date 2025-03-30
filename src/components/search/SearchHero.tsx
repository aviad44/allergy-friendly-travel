
import React from 'react';

interface SearchHeroProps {
  destination: string;
  allergies: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ destination, allergies }) => {
  return (
    <div className="relative h-[25vh] sm:h-[30vh] md:h-[40vh] overflow-hidden">
      <img
        src={`https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1600&q=80`}
        alt={`${destination} hotels`}
        className="w-full h-full object-cover"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "/placeholder.svg";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display text-white font-bold mb-2">
          Allergy-Friendly Hotels in {destination}
        </h1>
        <p className="text-lg sm:text-xl text-white/90">
          Safe accommodations for visitors with {allergies} allergies
        </p>
      </div>
    </div>
  );
};
