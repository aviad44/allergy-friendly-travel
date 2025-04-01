
import React from 'react';
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

export const AllergyCardGenerator = () => {
  const {
    form,
    selectedAllergies,
    customAllergy,
    setCustomAllergy,
    handleAddCustomAllergy,
    handleToggleAllergy,
    handleRemoveAllergy
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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <ProgressBar currentStep={step} />
      </div>
      
      <div className="space-y-6">
        <Form {...form}>
          <StepContent
            step={step}
            form={form}
            selectedAllergies={selectedAllergies}
            customAllergy={customAllergy}
            setCustomAllergy={setCustomAllergy}
            handleAddCustomAllergy={handleAddCustomAllergy}
            handleToggleAllergy={handleToggleAllergy}
            handleRemoveAllergy={handleRemoveAllergy}
            generatedCard={generatedCard}
            translatedCard={translatedCard}
            isTranslating={isTranslating}
            onRequestTranslation={handleTranslationRequest}
            onCopyToClipboard={() => handleCopyToClipboard(generatedCard, translatedCard)}
            onDownloadPDF={handleDownloadPDF}
            onDownloadPNG={handleDownloadPNG}
            onShareToWhatsApp={() => handleShareToWhatsApp(generatedCard, translatedCard)}
          />
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
                  (step === Step.ChooseLanguages && !form.getValues().targetLanguage)}
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
