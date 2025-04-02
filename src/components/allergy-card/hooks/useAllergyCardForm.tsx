
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from '../types';
import { toast } from "sonner";

export function useAllergyCardForm() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState<string>("");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      allergies: [],
      customAllergy: "",
      sourceLanguage: "en",
      targetLanguage: "",
      audienceType: "child", // Set default to child
      includeQrCode: true, // Enable QR code by default
      userName: "", // Add field for child's name
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

  return {
    form,
    selectedAllergies,
    customAllergy,
    setCustomAllergy,
    handleAddCustomAllergy,
    handleToggleAllergy,
    handleRemoveAllergy,
  };
}
