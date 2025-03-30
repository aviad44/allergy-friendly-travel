
import React from 'react';

interface SearchHeroProps {
  destination: string;
  allergies: string;
}

export const SearchHero: React.FC<SearchHeroProps> = ({ destination, allergies }) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
        Allergy-Friendly Hotels in {destination}
      </h1>
      <p className="text-gray-600">
        Safe accommodations for visitors with {allergies} allergies
      </p>
    </div>
  );
};
