
import React from 'react';
import { Trash2 } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from '../types';

// Common food allergies
const commonAllergies = [
  "Peanuts", "Tree Nuts", "Dairy", "Eggs", "Wheat", "Gluten", 
  "Soy", "Fish", "Shellfish", "Sesame", "Mustard", "Celery"
];

interface Step1Props {
  selectedAllergies: string[];
  customAllergy: string;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
  handleToggleAllergy: (allergy: string) => void;
  handleRemoveAllergy: (allergy: string) => void;
  form?: UseFormReturn<FormValues>; // Make form optional so we don't require it
}

export const Step1SelectAllergies: React.FC<Step1Props> = ({
  selectedAllergies,
  customAllergy,
  setCustomAllergy,
  handleAddCustomAllergy,
  handleToggleAllergy,
  handleRemoveAllergy
}) => {
  return (
    <div className="space-y-4">
      {/* Selected allergies */}
      <div>
        <label className="text-sm font-medium block mb-2">
          Selected Allergies
        </label>
        <div className="min-h-16 bg-muted/40 rounded-md p-2 flex flex-wrap gap-2 mb-2">
          {selectedAllergies.length === 0 ? (
            <p className="text-sm text-muted-foreground p-2">No allergies selected</p>
          ) : (
            selectedAllergies.map(allergy => (
              <Badge 
                key={allergy} 
                variant="secondary"
                className="pl-3 pr-2 py-1.5 flex items-center gap-1 text-sm"
              >
                {allergy}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 text-muted-foreground"
                  onClick={() => handleRemoveAllergy(allergy)}
                >
                  <Trash2 className="h-3 w-3" />
                  <span className="sr-only">Remove {allergy}</span>
                </Button>
              </Badge>
            ))
          )}
        </div>
      </div>
      
      {/* Common allergies */}
      <div>
        <label className="text-sm font-medium block mb-2">
          Common Food Allergies
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {commonAllergies.map(allergy => (
            <Button
              key={allergy}
              type="button"
              variant={selectedAllergies.includes(allergy) ? "default" : "outline"}
              className="justify-start h-auto py-2"
              onClick={() => handleToggleAllergy(allergy)}
            >
              {allergy}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Custom allergy */}
      <div className="mt-4">
        <label className="text-sm font-medium block mb-2">
          Add Custom Allergy or Dietary Restriction
        </label>
        <div className="flex gap-2">
          <Input
            type="text"
            value={customAllergy}
            onChange={(e) => setCustomAllergy(e.target.value)}
            placeholder="Type a custom allergy..."
            className="flex-1"
          />
          <Button 
            type="button"
            onClick={handleAddCustomAllergy}
            disabled={!customAllergy.trim()}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};
