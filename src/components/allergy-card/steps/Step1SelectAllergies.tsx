
import React from 'react';
import { AllergySelector } from '../components/AllergySelector';
import { CustomAllergyInput } from '../components/CustomAllergyInput';
import { SelectedAllergiesList } from '../components/SelectedAllergiesList';
import { VoiceInput } from '../components/VoiceInput';

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
}) => {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-teal-800">Select Your Allergies</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose all allergies or dietary restrictions that apply to you by clicking on them.
        </p>
        
        <AllergySelector
          selectedAllergies={selectedAllergies}
          allergySearchTerm={allergySearchTerm}
          setAllergySearchTerm={setAllergySearchTerm}
          handleToggleAllergy={handleToggleAllergy}
        />
        
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <CustomAllergyInput
                customAllergy={customAllergy}
                setCustomAllergy={setCustomAllergy}
                handleAddCustomAllergy={handleAddCustomAllergy}
              />
            </div>
            <div className="ml-4">
              <VoiceInput 
                onTranscript={(text) => {
                  setCustomAllergy(text);
                  setTimeout(handleAddCustomAllergy, 100);
                }}
                language="en"
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 flex items-center gap-2">
            <span>💡</span>
            <span>Try saying allergies like "peanuts", "dairy", or "gluten free" for quick voice input</span>
          </div>
        </div>

        <div className="mt-6">
          <SelectedAllergiesList
            selectedAllergies={selectedAllergies}
            handleRemoveAllergy={handleRemoveAllergy}
          />
        </div>
      </div>
    </div>
  );
};
