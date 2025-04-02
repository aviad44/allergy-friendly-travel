
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Common allergy list with emojis
export const ALL_ALLERGIES = [
  { name: "Peanuts", emoji: "🥜" },
  { name: "Tree nuts", emoji: "🌰" },
  { name: "Milk", emoji: "🥛" },
  { name: "Eggs", emoji: "🍳" },
  { name: "Fish", emoji: "🐟" },
  { name: "Shellfish", emoji: "🦐" },
  { name: "Wheat", emoji: "🌾" },
  { name: "Soy", emoji: "🫘" },
  { name: "Sesame", emoji: "🌱" },
  { name: "Gluten", emoji: "🍞" },
  { name: "Celery", emoji: "🥬" },
  { name: "Mustard", emoji: "🌭" },
  { name: "Lupin", emoji: "🌿" },
  { name: "Sulfites", emoji: "🍷" },
  { name: "Crustaceans", emoji: "🦞" },
  { name: "Molluscs", emoji: "🐚" }
];

interface AllergySelectorProps {
  selectedAllergies: string[];
  allergySearchTerm: string;
  setAllergySearchTerm: (value: string) => void;
  handleToggleAllergy: (allergy: string) => void;
}

export const AllergySelector: React.FC<AllergySelectorProps> = ({
  selectedAllergies,
  allergySearchTerm,
  setAllergySearchTerm,
  handleToggleAllergy,
}) => {
  // Filter allergies based on search term
  const filteredAllergies = ALL_ALLERGIES.filter(allergy => 
    allergy.name.toLowerCase().includes(allergySearchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <Label htmlFor="search-allergies" className="mb-2 block">Search Allergies</Label>
            <Input
              id="search-allergies"
              placeholder="Search allergies..."
              value={allergySearchTerm}
              onChange={(e) => setAllergySearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="mt-6">
                <HelpCircle className="h-4 w-4 text-gray-500" />
                <span className="sr-only">Help</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Select all allergies or dietary restrictions that apply to you.</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {filteredAllergies.map((allergy) => (
            <Toggle
              key={allergy.name}
              pressed={selectedAllergies.includes(allergy.name)}
              onPressedChange={() => {
                console.log("Toggling allergy:", allergy.name);
                handleToggleAllergy(allergy.name);
              }}
              className={cn(
                "flex items-center justify-start gap-2 border border-gray-200 hover:bg-blue-50 h-auto py-2 px-3",
                selectedAllergies.includes(allergy.name) ? "bg-blue-100 border-blue-300" : ""
              )}
            >
              <span className="text-lg">{allergy.emoji}</span>
              <span className="text-sm">{allergy.name}</span>
            </Toggle>
          ))}
        </div>
        
        {filteredAllergies.length === 0 && (
          <div className="text-center py-4 text-sm text-gray-500">
            No allergies found. Try a different search term or add a custom allergy.
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
