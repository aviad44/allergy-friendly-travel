
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
    <div>
      <UserNameInput form={form} />

      <div className="space-y-6">
        <div>
          <h3 className="text-base font-medium mb-2">Choose Allergies</h3>
          <p className="text-sm text-gray-500 mb-3">
            Select all allergies that apply to you from the list below
          </p>
          <AllergySelector
            selectedAllergies={selectedAllergies}
            allergySearchTerm={allergySearchTerm}
            setAllergySearchTerm={setAllergySearchTerm}
            handleToggleAllergy={handleToggleAllergy}
          />
        </div>

        <CustomAllergyInput
          customAllergy={customAllergy}
          setCustomAllergy={setCustomAllergy}
          handleAddCustomAllergy={handleAddCustomAllergy}
        />

        <SelectedAllergiesList
          selectedAllergies={selectedAllergies}
          handleRemoveAllergy={handleRemoveAllergy}
        />
        
        <CardTypeSelector form={form} />
      </div>
    </div>
  );
};
