
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
      targetLanguage: "", // This will be selected by the user
    },
  });

  // Update the form whenever selected allergies change
  useEffect(() => {
    form.setValue("allergies", selectedAllergies);
    // Trigger validation if needed
    if (selectedAllergies.length > 0) {
      form.clearErrors("allergies");
    }
  }, [selectedAllergies, form]);

  const handleAddCustomAllergy = () => {
    if (customAllergy.trim() && !selectedAllergies.includes(customAllergy.trim())) {
      const updatedAllergies = [...selectedAllergies, customAllergy.trim()];
      setSelectedAllergies(updatedAllergies);
      form.setValue("allergies", updatedAllergies);
      setCustomAllergy("");
      toast.success(`Added: ${customAllergy.trim()}`);
    } else if (customAllergy.trim() === "") {
      toast.error("Please enter an allergy name");
    } else {
      toast.error("This allergy is already in your list");
    }
  };

  const handleRemoveAllergy = (allergy: string) => {
    console.log("Removing allergy:", allergy);
    const updatedAllergies = selectedAllergies.filter(a => a !== allergy);
    setSelectedAllergies(updatedAllergies);
    form.setValue("allergies", updatedAllergies);
    toast.info(`Removed: ${allergy}`);
  };

  const handleToggleAllergy = (allergy: string) => {
    console.log("Toggling allergy:", allergy);
    
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
