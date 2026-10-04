
import { DestinationContent } from '@/types/definitions';

// Console log for debugging this module's initialization
console.log("Loading destination-tokyo.ts module");

export const tokyoContent: DestinationContent = {
  intro: "Navigate Tokyo's culinary scene safely with these allergy-aware hotels.",
  hotels: [
  ],
  faqs: [
    {
      question: "How do I communicate my food allergies in Tokyo hotels?",
      answer: "Most high-end Tokyo hotels have English-speaking staff trained in allergy awareness. Request allergen cards in Japanese to use throughout your trip. Many hotels offer digital translation services as well."
    },
    {
      question: "Are gluten-free options readily available in Tokyo hotels?",
      answer: "While traditional Japanese cuisine often contains soy sauce (which contains wheat), upscale hotels are increasingly offering gluten-free alternatives including gluten-free soy sauce and special breakfast options."
    },
    {
      question: "Do Tokyo hotels understand Western concepts of cross-contamination?",
      answer: "Luxury and international chain hotels in Tokyo typically have well-trained staff who understand cross-contamination risks. Always clarify your specific needs directly with the food service manager."
    },
    {
      question: "What hotel chains are best for food allergies in Tokyo?",
      answer: "International chains like Marriott, Hyatt, and Hilton typically have standardized allergy protocols. Japanese luxury brands like The Peninsula and Imperial Hotel also offer exceptional allergy accommodations."
    }
  ],
  languageTable: {
    headers: ["English", "Japanese"],
    rows: [
      ["I have a food allergy", "わたしには食物アレルギーがあります (Watashi ni wa shokumotsu arerugī ga arimasu)"],
      ["Gluten-free", "グルテンフリー (Guruten furī)"],
      ["Dairy-free", "乳製品なし (Nyūseihin nashi)"],
      ["Nut-free", "ナッツなし (Nattsu nashi)"],
      ["I cannot eat this", "これを食べられません (Kore o taberaremasen)"]
    ]
  }
};

// Log Tokyo content after initialization to verify data structure
console.log("Tokyo content initialized:", tokyoContent);
