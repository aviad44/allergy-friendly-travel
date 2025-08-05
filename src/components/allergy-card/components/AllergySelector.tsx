
import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import cinnamonIcon from "@/assets/cinnamon-stick-icon.png";

// Common allergy list with emojis and severity levels
export const ALL_ALLERGIES = [
  { name: "Peanuts", emoji: "🥜", severity: "critical" },
  { name: "Tree nuts", emoji: "🌰", severity: "critical" },
  { name: "Shellfish", emoji: "🦐", severity: "critical" },
  { name: "Fish", emoji: "🐟", severity: "high" },
  { name: "Milk", emoji: "🥛", severity: "high" },
  { name: "Eggs", emoji: "🍳", severity: "high" },
  { name: "Wheat", emoji: "🌾", severity: "high" },
  { name: "Gluten", emoji: "🍞", severity: "high" },
  { name: "Soy", emoji: "🫘", severity: "medium" },
  { name: "Peas", emoji: "🟢", severity: "medium" },
  { name: "Lentils", emoji: "🔴", severity: "medium" },
  { name: "Beans", emoji: "🫘", severity: "medium" },
  { name: "Sesame", emoji: "🌱", severity: "medium" },
  { name: "Celery", emoji: "🥬", severity: "medium" },
  { name: "Mustard", emoji: "🌭", severity: "medium" },
  { name: "Lupin", emoji: "🌿", severity: "medium" },
  { name: "Crustaceans", emoji: "🦞", severity: "high" },
  { name: "Molluscs", emoji: "🐚", severity: "medium" },
  { name: "Sulfites", emoji: "🍷", severity: "low" },
  { name: "Corn", emoji: "🌽", severity: "medium" },
  { name: "Cinnamon", emoji: "🪵", severity: "medium" },
  { name: "Avocado", emoji: "🥑", severity: "low" },
  { name: "Kiwi", emoji: "🥝", severity: "low" },
  { name: "Banana", emoji: "🍌", severity: "low" }
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

        {/* Single allergies section */}
        <div className="p-4 rounded-lg border border-blue-300 bg-blue-50">
          <h3 className="text-sm font-medium mb-3 text-blue-800">Allergies</h3>
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
                  "flex items-center justify-start gap-2 border border-gray-200 hover:bg-white/80 h-auto py-2 px-3 transition-all",
                  selectedAllergies.includes(allergy.name) 
                    ? "bg-red-100 border-red-400 shadow-sm" 
                    : "bg-white"
                )}
              >
                <div className="relative">
                  {allergy.name === "Cinnamon" ? (
                    <img 
                      src={cinnamonIcon} 
                      alt="Cinnamon stick" 
                      className="w-5 h-5 object-contain"
                    />
                  ) : (
                    <span className="text-lg">{allergy.emoji}</span>
                  )}
                  {selectedAllergies.includes(allergy.name) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-6 h-0.5 bg-red-600 rotate-45 absolute"></div>
                      <div className="w-6 h-0.5 bg-red-600 -rotate-45 absolute"></div>
                    </div>
                  )}
                </div>
                <span className="text-sm">{allergy.name}</span>
              </Toggle>
            ))}
          </div>
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
