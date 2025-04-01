import React from 'react';
import { Step, FormValues } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Step1SelectAllergies } from '../steps/Step1SelectAllergies';
import { Step2ChooseLanguages } from '../steps/Step2ChooseLanguages';
import { Step3Preview } from '../steps/Step3Preview';
import { Step4Download } from '../steps/Step4Download';
import { UseFormReturn } from 'react-hook-form';

interface StepContentProps {
  step: Step;
  form: UseFormReturn<FormValues>;
  selectedAllergies: string[];
  customAllergy: string;
  setCustomAllergy: (value: string) => void;
  handleAddCustomAllergy: () => void;
  handleToggleAllergy: (allergy: string) => void;
  handleRemoveAllergy: (allergy: string) => void;
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
  setCustomAllergy,
  handleAddCustomAllergy,
  handleToggleAllergy,
  handleRemoveAllergy,
  generatedCard,
  translatedCard,
  isTranslating,
  onRequestTranslation,
  onCopyToClipboard,
  onDownloadPDF,
  onDownloadPNG,
  onShareToWhatsApp
}) => {
  switch (step) {
    case Step.SelectAllergies:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 1: Select Your Allergies</CardTitle>
            <CardDescription>
              Choose all allergies or dietary restrictions that apply to you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <Step1SelectAllergies 
                selectedAllergies={selectedAllergies}
                customAllergy={customAllergy}
                setCustomAllergy={setCustomAllergy}
                handleAddCustomAllergy={handleAddCustomAllergy}
                handleToggleAllergy={handleToggleAllergy}
                handleRemoveAllergy={handleRemoveAllergy}
              />
            </Form>
          </CardContent>
        </Card>
      );

    case Step.ChooseLanguages:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 2: Choose Languages</CardTitle>
            <CardDescription>
              Select the source and target languages for your card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Step2ChooseLanguages form={form} />
          </CardContent>
        </Card>
      );

    case Step.Preview:
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Preview Your Card</CardTitle>
            <CardDescription>
              Review how your translation card will appear
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Step3Preview 
              generatedCard={generatedCard} 
              translatedCard={translatedCard}
              includeQrCode={form.getValues().includeQrCode}
              isTranslating={isTranslating}
              onRequestTranslation={onRequestTranslation}
            />
          </CardContent>
        </Card>
      );

    case Step.Download:
      const userName = form.getValues().userName || "";
      
      return (
        <Card>
          <CardHeader>
            <CardTitle>Step 4: Download & Share</CardTitle>
            <CardDescription>
              Save or share your allergy translation card
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Step4Download 
              generatedCard={generatedCard}
              translatedCard={translatedCard}
              userName={userName}
              selectedAllergies={selectedAllergies}
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
