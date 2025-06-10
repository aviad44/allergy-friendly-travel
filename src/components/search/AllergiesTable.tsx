
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { allergySuggestions } from '@/utils/searchSuggestions';

interface AllergiesTableProps {
  selectedAllergies: string[];
  onAllergiesChange: (allergies: string[]) => void;
}

export const AllergiesTable: React.FC<AllergiesTableProps> = ({
  selectedAllergies,
  onAllergiesChange
}) => {
  const handleAllergyToggle = (allergy: string, checked: boolean) => {
    if (checked) {
      onAllergiesChange([...selectedAllergies, allergy]);
    } else {
      onAllergiesChange(selectedAllergies.filter(a => a !== allergy));
    }
  };

  return (
    <div className="space-y-4">
      {/* Display selected allergies */}
      {selectedAllergies.length > 0 && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <p className="text-sm font-medium text-blue-900 mb-2">Selected Allergies:</p>
          <div className="flex flex-wrap gap-2">
            {selectedAllergies.map((allergy) => (
              <Badge key={allergy} variant="secondary" className="bg-blue-100 text-blue-800">
                {allergy}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Allergies selection table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-medium text-gray-900">Select Your Allergies</h3>
          <p className="text-sm text-gray-600">Choose all that apply to you</p>
        </div>
        
        <div className="divide-y">
          {allergySuggestions.map((allergy) => (
            <div key={allergy} className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50">
              <Checkbox
                id={`allergy-${allergy}`}
                checked={selectedAllergies.includes(allergy)}
                onCheckedChange={(checked) => handleAllergyToggle(allergy, checked as boolean)}
              />
              <label 
                htmlFor={`allergy-${allergy}`}
                className="flex-1 text-sm font-medium text-gray-900 cursor-pointer"
              >
                {allergy}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
