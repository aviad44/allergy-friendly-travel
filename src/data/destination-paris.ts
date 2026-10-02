
import { DestinationContent } from '@/types/definitions';

// Console log for debugging this module's initialization
console.log("Loading destination-paris.ts module");

export const parisContent: DestinationContent = {
  intro: "Discover Paris's finest allergy-aware hotels and accommodations.",
  hotels: [
  ],
  faqs: [
    {
      question: "How do Paris hotels typically handle food allergies?",
      answer: "Many luxury hotels in Paris now offer pre-arrival questionnaires to identify dietary needs, allergen-trained kitchen staff, and separate preparation areas to avoid cross-contamination."
    },
    {
      question: "Can I find gluten-free options in Parisian hotels?",
      answer: "Yes, particularly in 4 and 5-star hotels. Many offer gluten-free bread, pastries, and complete menu alternatives. Hotels like Le Bristol and Shangri-La are especially accommodating."
    },
    {
      question: "Should I notify my Paris hotel about allergies before arrival?",
      answer: "It's highly recommended to contact the hotel at least one week before arrival. Send a detailed explanation of your allergies in both English and French for the clearest communication."
    },
    {
      question: "Are apartment hotels a good option for severe allergies in Paris?",
      answer: "Yes, apartment hotels like Citadines and Adagio offer kitchenettes where you can prepare your own safe meals while still enjoying hotel amenities and services."
    }
  ],
  languageTable: {
    headers: ["English", "French"],
    rows: [
      ["I have a food allergy", "J'ai une allergie alimentaire"],
      ["Gluten-free", "Sans gluten"],
      ["Dairy-free", "Sans lactose"],
      ["Nut-free", "Sans noix"],
      ["I cannot eat", "Je ne peux pas manger"]
    ]
  }
};

// Log Paris content after initialization to verify data structure
console.log("Paris content initialized:", parisContent);
