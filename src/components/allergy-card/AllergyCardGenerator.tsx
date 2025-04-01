
import React, { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from 'lucide-react';
import { Step1SelectAllergies } from './steps/Step1SelectAllergies';
import { Step2ChooseLanguages } from './steps/Step2ChooseLanguages';
import { Step3Preview } from './steps/Step3Preview';
import { Step4Download } from './steps/Step4Download';
import { ProgressBar } from './components/ProgressBar';
import { SafetyTips } from './components/SafetyTips';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { formSchema, FormValues, Step } from './types';
import { 
  generateCardText, 
  generateFakeTranslation, 
  copyToClipboard, 
  downloadAsPDF, 
  downloadAsPNG,
  shareToWhatsApp 
} from './utils/cardGeneration';

export const AllergyCardGenerator = () => {
  const [step, setStep] = useState<Step>(Step.SelectAllergies);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState<string>("");
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  const [translatedCard, setTranslatedCard] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: [],
      customAllergy: "",
      sourceLanguage: "en",
      targetLanguage: "",
      audienceType: "adult",
      includeQrCode: false,
    },
  });

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      const updatedAllergies = [...selectedAllergies, customAllergy.trim()];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
      setCustomAllergy("");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    const updatedAllergies = selectedAllergies.filter(a => a !== allergy);
    setSelectedAllergies(updatedAllergies);
    form.setValue("allergies", updatedAllergies);
  };

  const handleToggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      handleRemoveAllergy(allergy);
    } else {
      const updatedAllergies = [...selectedAllergies, allergy];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
    }
  };

  const generateCardContent = () => {
    const values = form.getValues();
    const allergiesList = values.allergies.join(", ");
    const isChild = values.audienceType === "child";

    const cardText = generateCardText(values.allergies, isChild);
    setGeneratedCard(cardText);
    
    const translatedText = generateFakeTranslation(cardText, values.targetLanguage);
    setTranslatedCard(translatedText);
  };

  const handleNext = () => {
    if (step < Step.Download) {
      setStep(step + 1);
    }
    
    if (step === Step.ChooseLanguages) {
      generateCardContent();
    }
  };

  const handleBack = () => {
    if (step > Step.SelectAllergies) {
      setStep(step - 1);
    }
  };

  const handleCopyToClipboard = () => {
    copyToClipboard(generatedCard, translatedCard);
  };

  const handleShareToWhatsApp = () => {
    shareToWhatsApp(generatedCard, translatedCard);
  };

  const renderStepContent = () => {
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
              />
            </CardContent>
          </Card>
        );

      case Step.Download:
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
                onDownloadPDF={downloadAsPDF}
                onDownloadPNG={downloadAsPNG}
                onCopyToClipboard={handleCopyToClipboard}
                onShareToWhatsApp={handleShareToWhatsApp}
              />
            </CardContent>
          </Card>
        );
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <ProgressBar currentStep={step} />
      </div>
      
      <div className="space-y-6">
        {renderStepContent()}
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={step === Step.SelectAllergies}
        >
          Back
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={(step === Step.SelectAllergies && selectedAllergies.length === 0) || 
                   (step === Step.ChooseLanguages && !form.getValues().targetLanguage)}
          className="gap-1"
        >
          {step === Step.Download ? 'Finish' : 'Next'}
          {step !== Step.Download && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <SafetyTips />
    </div>
  );
};
