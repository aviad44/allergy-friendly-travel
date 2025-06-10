
import React from 'react';

interface SearchHeroProps {
  destination: string;
  allergies: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ destination, allergies }) => {
  // Handle both comma-separated and single allergy formats
  const allergiesDisplay = allergies.includes(',') ? allergies.replace(/,/g, ', ') : allergies;
  
  return (
    <div className="mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
        Allergy-Friendly Hotels in {destination}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Safe accommodations for visitors with {allergiesDisplay} allergies
      </p>
    </div>
  );
};
