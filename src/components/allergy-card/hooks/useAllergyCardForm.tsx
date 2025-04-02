
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from '../types';
import { toast } from "sonner";

export function useAllergyCardForm() {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [customAllergy, setCustomAllergy] = useState<string>("");
  const [allergySearchTerm, setAllergySearchTerm] = useState<string>("");
  
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
      toast.success(`Added: ${customAllergy.trim()}`);
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    const updatedAllergies = selectedAllergies.filter(a => a !== allergy);
    setSelectedAllergies(updatedAllergies);
    form.setValue("allergies", updatedAllergies);
    toast.info(`Removed: ${allergy}`);
  };

  const handleToggleAllergy = (allergy: string) => {
    if (selectedAllergies.includes(allergy)) {
      handleRemoveAllergy(allergy);
    } else {
      const updatedAllergies = [...selectedAllergies, allergy];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
      toast.success(`Added: ${allergy}`);
    }
  };

  // Add a method for selecting multiple allergies at once from dropdown
  const handleSelectAllergies = (allergies: string[]) => {
    setSelectedAllergies(allergies);
    form.setValue("allergies", allergies);
  };

  return {
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
  };
}
