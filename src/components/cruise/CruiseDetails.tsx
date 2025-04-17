
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Ship, ChefHat } from 'lucide-react';
import { CruiseLine } from './types';

interface CruiseDetailsProps {
  cruiseLines: CruiseLine[];
}

export const CruiseDetails: React.FC<CruiseDetailsProps> = ({ cruiseLines }) => {
  return (
    <section className="space-y-12">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <ChefHat className="mr-2 h-6 w-6 text-primary" />
        Top 5 Cruise Lines for Food Allergy Management
      </h2>
      
      {cruiseLines.map((cruise, index) => (
        <div key={cruise.name} className="mb-10">
          <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
            <Ship className="mr-2 h-5 w-5" />
            {index + 1}. {cruise.name}
          </h3>
          <div className="bg-gray-50 p-5 rounded-lg">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                ⭐ Allergy Rating: {Array(cruise.rating).fill('★').join('')}
              </div>
              <div className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium">
                🌍 Destinations: {cruise.destinations}
              </div>
              <div className="px-3 py-1 bg-green-100 rounded-full text-sm font-medium">
                👨‍👩‍👧‍👦 Family-Friendly: {cruise.familyFriendly ? 'Yes' : 'No'}
              </div>
            </div>
            
            <h4 className="font-medium mb-2">Why it's great:</h4>
            <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
              {cruise.features?.map((feature, i) => (
                <li key={i} className="text-muted-foreground">{feature}</li>
              ))}
            </ul>
            
            {cruise.quote && (
              <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                "{cruise.quote}" – {cruise.author}
              </blockquote>
            )}
          </div>
          {index < cruiseLines.length - 1 && <Separator className="mt-10" />}
        </div>
      ))}
    </section>
  );
};
