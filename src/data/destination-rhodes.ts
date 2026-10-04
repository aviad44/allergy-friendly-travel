import { DestinationContent } from '@/types/definitions';

export const rhodesContent: DestinationContent = {
  intro: "Rhodes, one of Greece's most beautiful islands, offers excellent allergy-friendly accommodations. The Atlantica hotel chain particularly excels in allergen management, with comprehensive labeling systems across all their properties.",
  hotels: [
  ],
  faqs: [
    {
      question: "Are Rhodes hotels good for travelers with food allergies?",
      answer: "Yes, especially the Atlantica hotel chain which has excellent allergen labeling systems. Many hotels in Rhodes can accommodate food allergies with advance notice, and tourist areas generally have good awareness of dietary restrictions."
    },
    {
      question: "What makes Atlantica hotels special for allergy management?",
      answer: "Atlantica hotels have comprehensive allergen labeling systems where every dish is clearly marked with allergen information. Their staff receive extensive training in allergy protocols and cross-contamination prevention, making them particularly safe for travelers with food allergies."
    },
    {
      question: "Should I notify my Rhodes hotel about allergies in advance?",
      answer: "Yes, always inform your hotel about your allergies at least 48 hours before arrival. This allows the kitchen staff to prepare and ensures they have appropriate ingredients and protocols in place for your stay."
    }
  ],
  languageTable: {
    headers: ["English", "Greek"],
    rows: [
      ["I have a food allergy", "Έχω αλλεργία σε φαγητό (Ého alleryía se fayitó)"],
      ["Gluten-free", "Χωρίς γλουτένη (Horís glouténi)"],
      ["Nut-free", "Χωρίς ξηρούς καρπούς (Horís xiroús karpoús)"],
      ["Dairy-free", "Χωρίς γαλακτοκομικά (Horís galaktokomiká)"],
      ["This contains allergens", "Αυτό περιέχει αλλεργιογόνα (Aftó periéhei allergioyóna)"]
    ]
  }
};