
import { z } from "zod";

export const formSchema = z.object({
  allergies: z.array(z.string()).min(1, "Please select at least one allergy"),
  customAllergy: z.string().optional(),
  targetLanguage: z.string().min(1, "Please select a target language"),
});

export type FormValues = z.infer<typeof formSchema>;

export enum Step {
  SelectAllergies = 0,
  ChooseLanguage = 1,
  Download = 2,
}

export interface CardData {
  sourceText: string;
  translatedText: string | null;
  allergies: string[];
}
