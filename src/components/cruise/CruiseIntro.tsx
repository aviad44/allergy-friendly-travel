
import React from 'react';
import { Ship, Clipboard, Globe } from 'lucide-react';

export const CruiseIntro: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 flex items-center">
        <Ship className="mr-3 h-8 w-8 text-primary" />
        Best Cruise Lines for Travelers with Food Allergies
      </h1>

      <section className="mb-10">
        <p className="text-lg text-muted-foreground mb-6">
          Cruising is a dream vacation for many—but for travelers with food allergies, that dream can quickly turn into a minefield of cross-contamination, unclear labeling, and anxiety. Thankfully, many major cruise lines have stepped up, offering allergy-conscious meal planning, trained staff, and even pre-cruise consultations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clipboard className="h-5 w-5 text-primary mr-2" />
              We Analyzed Based On:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Allergen protocols</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Chef consultations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Allergy-friendly meal availability</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Cross-contamination management</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Verified guest reviews</span>
              </li>
            </ul>
          </div>
          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Globe className="h-5 w-5 text-primary mr-2" />
              Essential Phrases at Sea
            </h2>
            <div className="space-y-2">
              <p className="flex justify-between"><span>I have a food allergy:</span> <span className="font-medium">Show allergy card</span></p>
              <p className="flex justify-between"><span>Please no nuts:</span> <span className="font-medium">No nuts please</span></p>
              <p className="flex justify-between"><span>Is this gluten-free?:</span> <span className="font-medium">Gluten-free?</span></p>
              <p className="flex justify-between"><span>I cannot eat dairy:</span> <span className="font-medium">No dairy</span></p>
              <p className="flex justify-between"><span>I have celiac disease:</span> <span className="font-medium">Celiac</span></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
