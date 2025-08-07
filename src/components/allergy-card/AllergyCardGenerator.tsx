
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { ProgressBar } from './components/ProgressBar';
import { SafetyTips } from './components/SafetyTips';
import { StepContent } from './components/StepContent';

import { Step } from './types';
import { useAllergyCardForm } from './hooks/useAllergyCardForm';
import { useAllergyCardSteps } from './hooks/useAllergyCardSteps';
import { useAllergyCardSharing } from './hooks/useAllergyCardSharing';
import { Toaster } from "sonner";

export const AllergyCardGenerator = () => {
  const {
    form,
    selectedAllergies,
    customAllergy,
    allergySearchTerm,
    setAllergySearchTerm,
    setCustomAllergy,
    handleAddCustomAllergy,
    handleToggleAllergy,
    handleRemoveAllergy,
    handleSelectAllergies
  } = useAllergyCardForm();

  const {
    step,
    generatedCard,
    translatedCard,
    isTranslating,
    handleNext,
    handleBack,
    handleTranslationRequest
  } = useAllergyCardSteps(form);

  const {
    handleCopyToClipboard,
    handleDownloadPDF,
    handleDownloadPNG,
    handleShareToWhatsApp
  } = useAllergyCardSharing();

  // References for scrolling to the top of each step
  const stepRefs = {
    [Step.SelectAllergies]: useRef<HTMLDivElement>(null),
    [Step.ChooseLanguage]: useRef<HTMLDivElement>(null),
    [Step.Download]: useRef<HTMLDivElement>(null),
  };

  // Handle scroll to active step
  useEffect(() => {
    const currentStepRef = stepRefs[step];
    if (currentStepRef?.current) {
      // Scroll with a slight delay to ensure elements are rendered
      setTimeout(() => {
        currentStepRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [step]);

  // Apply animation class to the card when it appears
  useEffect(() => {
    if (step === Step.Download) {
      const cardElement = document.getElementById('allergy-card');
      if (cardElement) {
        cardElement.classList.add('card-animate-in');
      }
    }
  }, [step]);

  // Log the state for debugging
  useEffect(() => {
    console.log("Current allergies:", selectedAllergies);
    console.log("Current step:", step);
  }, [selectedAllergies, step]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Add the Toaster component for notifications */}
      <Toaster position="top-center" richColors />
      
      <div className="mb-8 space-y-4">
        <ProgressBar currentStep={step} />
      </div>
      
      <div className="space-y-6">
        <Form {...form}>
          <div ref={stepRefs[step]} className="pt-2">
            <StepContent
              step={step}
              form={form}
              selectedAllergies={selectedAllergies}
              customAllergy={customAllergy}
              allergySearchTerm={allergySearchTerm}
              setAllergySearchTerm={setAllergySearchTerm}
              setCustomAllergy={setCustomAllergy}
              handleAddCustomAllergy={handleAddCustomAllergy}
              handleToggleAllergy={handleToggleAllergy}
              handleRemoveAllergy={handleRemoveAllergy}
              handleSelectAllergies={handleSelectAllergies}
              generatedCard={generatedCard}
              translatedCard={translatedCard}
              isTranslating={isTranslating}
              onRequestTranslation={handleTranslationRequest}
              onCopyToClipboard={() => handleCopyToClipboard(generatedCard, translatedCard)}
              onDownloadPDF={handleDownloadPDF}
              onDownloadPNG={handleDownloadPNG}
              onShareToWhatsApp={() => handleShareToWhatsApp(generatedCard, translatedCard)}
            />
          </div>
        </Form>
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
                  (step === Step.ChooseLanguage && !form.getValues().targetLanguage)}
          className="gap-1 bg-teal-600 hover:bg-teal-700"
        >
          {step === Step.Download ? 'Finish' : 'Next'}
          {step !== Step.Download && <ArrowRight className="h-4 w-4" />}
        </Button>
      </div>
      
      <SafetyTips />
    </div>
  );
};
