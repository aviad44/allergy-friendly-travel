
import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from "@/constants/home";
import { AllergyCardGenerator } from '@/components/allergy-card/AllergyCardGenerator';

const AllergyTranslationCard = () => {
  return (
    <>
      <Helmet>
        <title>Allergy Translation Card Generator | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Create a free translation card to stay safe and understood anywhere in the world. Generate custom allergy cards in multiple languages for your travels." />
        <meta name="keywords" content="allergy translation card, food allergy travel, language translation for allergies, dietary restrictions travel help" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-blue-800">Allergy Translation Card Generator</h1>
        
        <div className="mb-10">
          <p className="text-lg text-blue-700 mb-4">
            Traveling with food allergies? Create a free translation card to stay safe and understood anywhere in the world.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">How it works:</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Select your food allergies from the common list or add custom ones</li>
              <li>Choose your source and target languages</li>
              <li>Preview your personalized translation card</li>
              <li>Download or share your card for your travels</li>
            </ol>
          </div>
        </div>
        
        <AllergyCardGenerator />
      </div>
    </>
  );
};

export default AllergyTranslationCard;
