
import React from 'react';
import { useFormContext } from "react-hook-form";
import { AllergySelector } from '../components/AllergySelector';
import { CustomAllergyInput } from '../components/CustomAllergyInput';
import { SelectedAllergiesList } from '../components/SelectedAllergiesList';
import { CardTypeSelector } from '../components/CardTypeSelector';
import { UserNameInput } from '../components/UserNameInput';

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
  const form = useFormContext();
  
  return (
    <div className="space-y-6">
      <UserNameInput form={form} />

      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium mb-3 text-blue-800">Select Your Allergies</h3>
        <p className="text-sm text-gray-600 mb-4">
          Choose all allergies or dietary restrictions that apply to you by clicking on them.
        </p>
        
        <AllergySelector
          selectedAllergies={selectedAllergies}
          allergySearchTerm={allergySearchTerm}
          setAllergySearchTerm={setAllergySearchTerm}
          handleToggleAllergy={handleToggleAllergy}
        />
        
        <div className="mt-6">
          <CustomAllergyInput
            customAllergy={customAllergy}
            setCustomAllergy={setCustomAllergy}
            handleAddCustomAllergy={handleAddCustomAllergy}
          />
        </div>

        <div className="mt-6">
          <SelectedAllergiesList
            selectedAllergies={selectedAllergies}
            handleRemoveAllergy={handleRemoveAllergy}
          />
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        <CardTypeSelector form={form} />
      </div>
    </div>
  );
};
