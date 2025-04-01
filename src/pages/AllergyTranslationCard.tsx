
import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from "@/constants/home";

const AllergyTranslationCard = () => {
  return (
    <>
      <Helmet>
        <title>Allergy Translation Card Generator | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Create a free translation card to stay safe and understood anywhere in the world. Generate custom allergy cards in multiple languages for your travels." />
        <meta name="keywords" content="allergy translation card, food allergy travel, language translation for allergies, dietary restrictions travel help" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4 text-blue-800">Allergy Translation Card Generator</h1>
        
        <div className="mb-6">
          <p className="text-lg text-blue-700 mb-4">
            Traveling with food allergies? Create a free translation card to stay safe and understood anywhere in the world.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">How it works:</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Select your food allergies from the common list</li>
              <li>Add any custom allergies or dietary requirements</li>
              <li>Choose your source and target languages</li>
              <li>Generate your translation card</li>
              <li>Download as a text file to print or save on your phone</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <iframe 
            src="https://s89fct.csb.app/" 
            width="100%" 
            height="700" 
            style={{ border: 'none' }} 
            title="Allergy Translation Card Tool">
          </iframe>
        </div>
        
        <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Safety Tips</h3>
          <ul className="list-disc pl-5 space-y-2 text-green-800">
            <li>Always carry multiple copies of your allergy card</li>
            <li>Consider laminating a physical copy to protect it while traveling</li>
            <li>Save a digital copy on your phone that's accessible offline</li>
            <li>Learn a few key phrases in the local language in addition to using the card</li>
            <li>When in doubt, show your card to staff before ordering or purchasing food</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AllergyTranslationCard;
