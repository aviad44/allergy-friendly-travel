
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
    const isChild = values.audienceType === "child";

    const cardText = generateCardText(values.allergies, isChild);
    setGeneratedCard(cardText);
    setTranslatedCard(null); // Reset translation when card is regenerated
    
    if (values.targetLanguage) {
      await performTranslation(cardText, values.targetLanguage);
    }
  };

  const performTranslation = async (text: string, targetLanguage: string) => {
    setIsTranslating(true);
    try {
      const result = await translateText(text, targetLanguage);
      if (result.translatedText) {
        setTranslatedCard(result.translatedText);
      } else {
        toast.error("Translation failed: " + (result.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTranslationRequest = () => {
    const values = form.getValues();
    if (generatedCard && values.targetLanguage) {
      performTranslation(generatedCard, values.targetLanguage);
    } else {
      toast.error("Please select a target language first");
    }
  };

  const handleNext = async () => {
    if (step < Step.Download) {
      setStep(step + 1);
    }
    
    if (step === Step.ChooseLanguages) {
      await generateCardContent();
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
      if (name === 'targetLanguage' && step === Step.Preview && generatedCard) {
        setTranslatedCard(null); // Reset translation when language changes
        
        // Auto-translate if we're already on the preview step
        const targetLang = value.targetLanguage as string;
        if (targetLang && generatedCard) {
          performTranslation(generatedCard, targetLang);
        }
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
