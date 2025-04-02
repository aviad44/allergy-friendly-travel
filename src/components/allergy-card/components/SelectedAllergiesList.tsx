
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
    return null;
  }

  return (
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
  );
};
