
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormLabel } from "@/components/ui/form";
import { allergySuggestions } from "@/utils/searchSuggestions";

interface Step1Props {
  selectedAllergies: string[];
  customAllergy: string;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
  handleToggleAllergy: (allergy: string) => void;
  handleRemoveAllergy: (allergy: string) => void;
}

export const Step1SelectAllergies: React.FC<Step1Props> = ({
  selectedAllergies,
  customAllergy,
  setCustomAllergy,
  handleAddCustomAllergy,
  handleToggleAllergy,
  handleRemoveAllergy,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {allergySuggestions.map((allergy) => (
          <Button
            key={allergy}
            variant={selectedAllergies.includes(allergy) ? "default" : "outline"}
            onClick={() => handleToggleAllergy(allergy)}
            className="flex items-center gap-1"
          >
            {selectedAllergies.includes(allergy) && <Check className="h-4 w-4" />}
            {allergy}
          </Button>
        ))}
      </div>
      
      <div className="pt-4">
        <FormLabel htmlFor="customAllergy">Add a custom allergy or dietary need</FormLabel>
        <div className="flex gap-2 mt-2">
          <Input
            id="customAllergy"
            placeholder="Type a custom allergy..."
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleAddCustomAllergy} type="button">Add</Button>
        </div>
      </div>
      
      {selectedAllergies.length > 0 && (
        <div className="bg-muted/50 p-4 rounded-md mt-4">
          <h4 className="text-sm font-medium mb-2">Selected allergies:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedAllergies.map((allergy) => (
              <div 
                key={allergy}
                className="bg-primary text-primary-foreground text-sm px-3 py-1 rounded-full flex items-center gap-1"
              >
                {allergy}
                <button 
                  onClick={() => handleRemoveAllergy(allergy)}
                  className="ml-1 hover:bg-primary-foreground/20 rounded-full h-4 w-4 inline-flex items-center justify-center"
                  aria-label={`Remove ${allergy}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
