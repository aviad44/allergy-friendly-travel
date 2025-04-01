
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm, useFormContext } from "react-hook-form";
import { CheckSquare, Plus, X } from 'lucide-react';

// Common food allergies
const COMMON_ALLERGIES = [
  "Peanuts", "Tree nuts", "Milk", "Eggs", "Fish", "Shellfish", 
  "Wheat", "Soy", "Sesame", "Gluten", "Celery", "Mustard", "Lupin"
];

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
  handleRemoveAllergy
}) => {
  const form = useFormContext();
  
  const handleCustomAllergyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomAllergy();
    }
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

      <div className="space-y-4">
        <div>
          <Label htmlFor="allergies" className="mb-2 block">Common Allergies</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {COMMON_ALLERGIES.map((allergy) => (
              <Button
                key={allergy}
                type="button"
                variant={selectedAllergies.includes(allergy) ? "default" : "outline"}
                className={`justify-start ${
                  selectedAllergies.includes(allergy) 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "hover:bg-blue-50"
                }`}
                onClick={() => handleToggleAllergy(allergy)}
              >
                {selectedAllergies.includes(allergy) && (
                  <CheckSquare className="mr-2 h-4 w-4" />
                )}
                {allergy}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <Label htmlFor="custom-allergy" className="mb-2 block">Custom Allergies</Label>
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
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>

        {selectedAllergies.length > 0 && (
          <div>
            <Label className="mb-2 block">Selected Allergies</Label>
            <div className="flex flex-wrap gap-2">
              {selectedAllergies.map((allergy) => (
                <div
                  key={allergy}
                  className="flex items-center bg-blue-100 text-blue-800 rounded-full px-3 py-1"
                >
                  <span className="mr-1">{allergy}</span>
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
                </div>
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
