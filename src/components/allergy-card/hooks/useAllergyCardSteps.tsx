
import { useState, useEffect } from 'react';
import { Step, FormValues } from '../types';
import { generateCardText } from '../utils/cardGeneration';
import { translateText } from '../utils/translationService';
import { toast } from "sonner";

export function useAllergyCardSteps(form: ReturnType<typeof import('react-hook-form').useForm<FormValues>>) {
  const [step, setStep] = useState<Step>(Step.SelectAllergies);
  const [generatedCard, setGeneratedCard] = useState<string | null>(null);
  const [translatedCard, setTranslatedCard] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  const generateCardContent = async () => {
    const values = form.getValues();
    
    console.log("Generating card with allergies:", values.allergies);
    const cardText = generateCardText(values.allergies);
    setGeneratedCard(cardText);
    setTranslatedCard(null); // Reset translation when card is regenerated
    
    if (values.targetLanguage) {
      console.log("Auto-translating to:", values.targetLanguage);
      await performTranslation(cardText, values.targetLanguage);
    }
  };

  const performTranslation = async (text: string, targetLanguage: string) => {
    if (!text || !targetLanguage) {
      toast.error("Missing content or target language for translation");
      return;
    }

    setIsTranslating(true);
    console.log(`Starting translation to ${targetLanguage}`);
    
    try {
      toast.loading("Translating your card...", { id: "translation" });
      
      const result = await translateText(text, targetLanguage);
      
      if (result.translatedText) {
        setTranslatedCard(result.translatedText);
        toast.success("Translation completed successfully!", { id: "translation" });
      } else {
        console.error("Translation failed:", result.error);
        toast.error(result.error || "Unknown translation error", { id: "translation" });
      }
    } catch (error) {
      console.error("Translation error in hook:", error);
      toast.error("Translation failed. Please try again.", { id: "translation" });
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslationRequest = () => {
    const values = form.getValues();
    if (generatedCard && values.targetLanguage) {
      console.log("Manual translation requested");
      performTranslation(generatedCard, values.targetLanguage);
    } else {
      toast.error("Please select a target language first");
    }
  };

  const handleNext = async () => {
    // Validate the current step before proceeding
    if (step === Step.SelectAllergies) {
      if (form.getValues().allergies.length === 0) {
        toast.error("Please select at least one allergy");
        return;
      }
    } else if (step === Step.ChooseLanguages) {
      if (!form.getValues().targetLanguage) {
        toast.error("Please select a target language");
        return;
      }
    }

    if (step < Step.Download) {
      setStep(step + 1);
      
      // When moving from language step to preview, generate card
      if (step === Step.ChooseLanguages) {
        toast.loading("Generating your allergy card...", { id: "generating" });
        console.log("Moving to preview step, generating card");
        await generateCardContent();
        toast.success("Card generated successfully!", { id: "generating" });
      }
    }
  };

  const handleBack = () => {
    if (step > Step.SelectAllergies) {
      setStep(step - 1);
    }
  };

  // Reset translation when target language changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'targetLanguage' && step === Step.Download && generatedCard) {
        setTranslatedCard(null); // Reset translation when language changes
        
        // Auto-translate if we're already on the download step
        const targetLang = value.targetLanguage as string;
        if (targetLang && generatedCard) {
          console.log("Language changed, auto-translating");
          performTranslation(generatedCard, targetLang);
        }
      }
      
      // If source language changes and we're on the download step, regenerate card
      if (name === 'sourceLanguage' && step === Step.Download) {
        console.log("Source language changed, regenerating card");
        generateCardContent();
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, step, generatedCard]);

  return {
    step,
    generatedCard,
    translatedCard,
    isTranslating,
    handleNext,
    handleBack,
    handleTranslationRequest,
  };
}
