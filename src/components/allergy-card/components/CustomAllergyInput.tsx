
import React from 'react';
import { Plus } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface CustomAllergyInputProps {
  customAllergy: string;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
}

export const CustomAllergyInput: React.FC<CustomAllergyInputProps> = ({
  customAllergy,
  setCustomAllergy,
  handleAddCustomAllergy
}) => {
  const handleCustomAllergyKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomAllergy();
    }
  };

  return (
    <div>
      <Label htmlFor="custom-allergy" className="mb-2 block">Add Custom Allergy or Dietary Restriction</Label>
      <div className="flex gap-2">
        <Input
          id="custom-allergy"
          placeholder="Enter custom allergy (e.g., Avocado)"
          value={customAllergy}
          onChange={(e) => setCustomAllergy(e.target.value)}
          onKeyDown={handleCustomAllergyKeyDown}
          className="flex-1 bg-white"
        />
        <Button 
          type="button" 
          onClick={handleAddCustomAllergy}
          disabled={!customAllergy.trim()}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      <p className="text-xs text-gray-500 mt-1">Press Enter or click Add button to add your custom allergy</p>
    </div>
  );
};
