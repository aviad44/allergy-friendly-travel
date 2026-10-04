
import { DestinationContent } from '@/types/definitions';

export const ayiaNapaContent: DestinationContent = {
  intro: "Discover allergy-friendly accommodations in Cyprus's beautiful coastal town.",
  hotels: [
  ],
  faqs: [
    {
      question: "Are Ayia Napa's beach resorts equipped for severe food allergies?",
      answer: "Most dining here is buffet-style, which makes cross-contact a real risk for severe allergies. Look for resorts with clear allergen labeling like Nissi Beach Resort, and ask the buffet chef for an a-la-carte alternative plate if labeling looks unclear."
    },
    {
      question: "What local Cypriot dishes should I watch out for with dairy or nut allergies?",
      answer: "Halloumi is a dairy staple in almost every meze spread, and many local pastries and desserts contain nuts (similar to baklava). Flag these two categories specifically when speaking to hotel restaurant staff."
    }
  ],
  languageTable: {
    headers: ["English", "Greek"],
    rows: [
      ["I have a food allergy", "Έχω αλλεργία σε τρόφιμα (Écho allergía se trófima)"],
      ["Gluten-free", "Χωρίς γλουτένη (Chorís glouténi)"],
      ["Is this safe to eat?", "Είναι αυτό ασφαλές για να φάω; (Eínai aftó asfalés gia na fáo?)"]
    ]
  }
};
