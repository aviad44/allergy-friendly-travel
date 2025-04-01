
import { z } from "zod";

export const formSchema = z.object({
  allergies: z.array(z.string()).min(1, "Please select at least one allergy"),
  customAllergy: z.string().optional(),
  sourceLanguage: z.string().default("en"),
  targetLanguage: z.string().min(1, "Please select a target language"),
  audienceType: z.enum(["adult", "child"]).default("adult"),
  includeQrCode: z.boolean().default(false),
});

export type FormValues = z.infer<typeof formSchema>;

export enum Step {
  SelectAllergies = 0,
  ChooseLanguages = 1,
  Preview = 2,
  Download = 3,
}
