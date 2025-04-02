
import React, { useState } from 'react';
import { Check, ChevronsUpDown, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
  const [open, setOpen] = useState(false);
  
  // Filter allergies based on search term
  const filteredAllergies = ALL_ALLERGIES.filter(allergy => 
    allergy.name.toLowerCase().includes(allergySearchTerm.toLowerCase())
  );

  return (
    <TooltipProvider>
      <div className="flex items-center space-x-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedAllergies.length > 0
                ? `${selectedAllergies.length} allergy/allergen(s) selected`
                : "Select allergies..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[300px] p-0" align="start">
            <Command>
              <CommandInput 
                placeholder="Search allergies..." 
                value={allergySearchTerm}
                onValueChange={setAllergySearchTerm}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty>No allergies found.</CommandEmpty>
                <CommandGroup>
                  {filteredAllergies.map((allergy) => (
                    <CommandItem
                      key={allergy.name}
                      value={allergy.name}
                      onSelect={() => {
                        console.log("Selected allergy:", allergy.name);
                        handleToggleAllergy(allergy.name);
                        // Don't close the popover automatically after selection
                      }}
                      className="flex items-center cursor-pointer"
                    >
                      <div className="flex items-center flex-1">
                        <span className="mr-2">{allergy.emoji}</span>
                        <span>{allergy.name}</span>
                      </div>
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedAllergies.includes(allergy.name) ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
              <HelpCircle className="h-4 w-4 text-gray-500" />
              <span className="sr-only">Help</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Select all allergies or dietary restrictions that apply to you. You can search and select multiple items.</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
