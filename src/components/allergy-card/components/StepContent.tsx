
import React from 'react';
import { Step, FormValues } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Step1SelectAllergies } from '../steps/Step1SelectAllergies';
import { Step2ChooseLanguages } from '../steps/Step2ChooseLanguages';
import { Step4Download } from '../steps/Step4Download';
import { UseFormReturn } from 'react-hook-form';

interface StepContentProps {
  step: Step;
  form: UseFormReturn<FormValues>;
  selectedAllergies: string[];
  customAllergy: string;
  allergySearchTerm: string;
  setAllergySearchTerm: (value: string) => void;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
  handleToggleAllergy: (allergy: string) => void;
  handleRemoveAllergy: (allergy: string) => void;
  handleSelectAllergies: (allergies: string[]) => void;
  generatedCard: string | null;
  translatedCard: string | null;
  isTranslating: boolean;
  onRequestTranslation: () => void;
  onCopyToClipboard: () => void;
  onDownloadPDF: () => void;
  onDownloadPNG: () => void;
  onShareToWhatsApp: () => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  step,
  form,
  selectedAllergies,
  customAllergy,
  allergySearchTerm,
  setAllergySearchTerm,
  setCustomAllergy,
  handleAddCustomAllergy,
  handleToggleAllergy,
  handleRemoveAllergy,
  handleSelectAllergies,
  generatedCard,
  translatedCard,
  isTranslating,
  onRequestTranslation,
  onCopyToClipboard,
  onDownloadPDF,
  onDownloadPNG,
  onShareToWhatsApp
}) => {
  const getStepTitle = () => {
    switch (step) {
      case Step.SelectAllergies:
        return "Step 1: Select Your Allergies";
      case Step.ChooseLanguages:
        return "Step 2: Choose Your Target Language";
      case Step.Download:
        return "Step 3: Download & Share";
      default:
        return "";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case Step.SelectAllergies:
        return "Choose all allergies or dietary restrictions that apply to you";
      case Step.ChooseLanguages:
        return "Select the target language for your card";
      case Step.Download:
        return "Save or share your allergy translation card";
      default:
        return "";
    }
  };

  switch (step) {
    case Step.SelectAllergies:
      return (
        <Card>
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <Step1SelectAllergies 
                selectedAllergies={selectedAllergies}
                customAllergy={customAllergy}
                allergySearchTerm={allergySearchTerm}
                setAllergySearchTerm={setAllergySearchTerm}
                setCustomAllergy={setCustomAllergy}
                handleAddCustomAllergy={handleAddCustomAllergy}
                handleToggleAllergy={handleToggleAllergy}
                handleRemoveAllergy={handleRemoveAllergy}
                handleSelectAllergies={handleSelectAllergies}
              />
            </Form>
          </CardContent>
        </Card>
      );

    case Step.ChooseLanguages:
      return (
        <Card>
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Step2ChooseLanguages form={form} />
          </CardContent>
        </Card>
      );

    case Step.Download:
      return (
        <Card>
          <CardHeader>
            <CardTitle>{getStepTitle()}</CardTitle>
            <CardDescription>
              {getStepDescription()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Step4Download 
              generatedCard={generatedCard}
              translatedCard={translatedCard}
              selectedAllergies={selectedAllergies}
              isTranslating={isTranslating}
              onRequestTranslation={onRequestTranslation}
              onDownloadPDF={onDownloadPDF}
              onDownloadPNG={onDownloadPNG}
              onCopyToClipboard={onCopyToClipboard}
              onShareToWhatsApp={onShareToWhatsApp}
            />
          </CardContent>
        </Card>
      );
  }
};
