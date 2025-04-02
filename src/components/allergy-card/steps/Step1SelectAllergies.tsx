
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { X, Plus, Check, ChevronsUpDown, Search } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Combined allergy list with emojis
const ALL_ALLERGIES = [
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

interface Step1Props {
  selectedAllergies: string[];
  customAllergy: string;
  allergySearchTerm: string;
  setAllergySearchTerm: (value: string) => void;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
  handleToggleAllergy: (allergy: string) => void;
  handleRemoveAllergy: (allergy: string) => void;
  handleSelectAllergies: (allergies: string[]) => void;
}

export const Step1SelectAllergies: React.FC<Step1Props> = ({
  selectedAllergies,
  customAllergy,
  allergySearchTerm,
  setAllergySearchTerm,
  setCustomAllergy,
  handleAddCustomAllergy,
  handleToggleAllergy,
  handleRemoveAllergy,
  handleSelectAllergies
}) => {
  const form = useFormContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  const handleCustomAllergyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomAllergy();
    }
  };

  // Filter allergies based on search term
  const filteredAllergies = ALL_ALLERGIES.filter(allergy => 
    allergy.name.toLowerCase().includes(allergySearchTerm.toLowerCase())
  );

  // Get emoji for an allergy
  const getEmoji = (allergyName: string) => {
    const found = ALL_ALLERGIES.find(a => a.name === allergyName);
    return found ? found.emoji : '⚠️';
  };

  return (
    <div>
      <FormField
        control={form.control}
        name="userName"
        render={({ field }) => (
          <FormItem className="mb-6">
            <FormLabel>Your Name (Optional)</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your name" 
                {...field} 
                value={field.value || ""}
                className="w-full"
              />
            </FormControl>
            <FormDescription>
              This will be included in your allergy card
            </FormDescription>
          </FormItem>
        )}
      />

      <div className="space-y-6">
        <div>
          <Label className="mb-2 block">Select Your Allergies</Label>
          
          {/* Multi-select dropdown for allergies */}
          <Popover open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={dropdownOpen}
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
                    {filteredAllergies.map((allergy) => {
                      const isSelected = selectedAllergies.includes(allergy.name);
                      return (
                        <CommandItem
                          key={allergy.name}
                          value={allergy.name}
                          onSelect={() => {
                            handleToggleAllergy(allergy.name);
                          }}
                          className="flex items-center"
                        >
                          <span className="mr-2">{allergy.emoji}</span>
                          <span>{allergy.name}</span>
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Custom allergy input */}
        <div>
          <Label htmlFor="custom-allergy" className="mb-2 block">Add Custom Allergy</Label>
          <div className="flex gap-2 mb-3">
            <Input
              id="custom-allergy"
              placeholder="Add other allergy or restriction"
              value={customAllergy}
              onChange={(e) => setCustomAllergy(e.target.value)}
              onKeyDown={handleCustomAllergyKeyDown}
              className="flex-1"
            />
            <Button 
              type="button" 
              onClick={handleAddCustomAllergy}
              disabled={!customAllergy.trim()}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {/* Selected allergies display */}
        {selectedAllergies.length > 0 && (
          <div>
            <Label className="mb-2 block">Selected Allergies</Label>
            <div className="flex flex-wrap gap-2">
              {selectedAllergies.map((allergy) => (
                <Badge
                  key={allergy}
                  variant="secondary"
                  className="px-3 py-1 flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200"
                >
                  <span>{getEmoji(allergy)}</span>
                  <span>{allergy}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-5 w-5 p-0 rounded-full hover:bg-blue-200"
                    onClick={() => handleRemoveAllergy(allergy)}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {allergy}</span>
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        <FormField
          control={form.control}
          name="audienceType"
          render={({ field }) => (
            <FormItem className="space-y-2 pt-4 border-t">
              <FormLabel>Card Type</FormLabel>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant={field.value === "adult" ? "default" : "outline"}
                  className={field.value === "adult" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => form.setValue("audienceType", "adult")}
                >
                  Adult Card
                </Button>
                <Button
                  type="button"
                  variant={field.value === "child" ? "default" : "outline"}
                  className={field.value === "child" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  onClick={() => form.setValue("audienceType", "child")}
                >
                  Child Card
                </Button>
              </div>
              <FormDescription>
                {field.value === "adult" 
                  ? "Adult cards use more formal language suitable for restaurants and hotels."
                  : "Child cards include space for a name and use simpler language."}
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
