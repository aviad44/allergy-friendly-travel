
import { DestinationContent, FAQ } from '@/types/definitions';

// Generic placeholder content for destinations without specific content yet
export const genericDestinationContent: DestinationContent = {
  intro: "Find safe and comfortable accommodations for travelers with dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Generic intro text that can be reused
export const genericIntro = "Find safe and comfortable accommodations for travelers with dietary restrictions.";

// Generic FAQs that can be reused
export const genericFaqs: FAQ[] = [
  {
    question: "How should I communicate my allergies when traveling?",
    answer: "Always inform your hotel about your allergies in advance. Carrying allergy translation cards in the local language is highly recommended, and learning key phrases related to your dietary needs can be very helpful."
  },
  {
    question: "Are luxury hotels better for handling allergies?",
    answer: "Generally, luxury hotels tend to have more trained staff and flexible kitchen facilities to accommodate dietary restrictions, though there are excellent options in all price ranges."
  }
];
