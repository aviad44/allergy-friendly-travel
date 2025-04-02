
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ALL_ALLERGIES } from './AllergySelector';

interface SelectedAllergiesListProps {
  selectedAllergies: string[];
  handleRemoveAllergy: (allergy: string) => void;
}

export const SelectedAllergiesList: React.FC<SelectedAllergiesListProps> = ({
  selectedAllergies,
  handleRemoveAllergy
}) => {
  // Get emoji for an allergy
  const getEmoji = (allergyName: string) => {
    const found = ALL_ALLERGIES.find(a => a.name === allergyName);
    return found ? found.emoji : '⚠️';
  };

  if (selectedAllergies.length === 0) {
    return (
      <div className="bg-blue-50 border border-blue-100 rounded-md p-4 text-blue-700">
        <p>No allergies selected yet. Please select at least one allergy to continue.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <Label className="mb-2 block">Your Selected Allergies</Label>
      <div className="flex flex-wrap gap-2 p-3 border border-gray-200 rounded-md bg-gray-50 min-h-[60px]">
        {selectedAllergies.map((allergy) => (
          <Badge
            key={allergy}
            variant="secondary"
            className="px-3 py-1.5 flex items-center gap-1.5 bg-blue-100 text-blue-800 hover:bg-blue-200"
          >
            <span className="text-lg">{getEmoji(allergy)}</span>
            <span>{allergy}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0 ml-1 rounded-full hover:bg-blue-200 hover:text-red-600"
              onClick={() => handleRemoveAllergy(allergy)}
            >
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Remove {allergy}</span>
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  );
};
