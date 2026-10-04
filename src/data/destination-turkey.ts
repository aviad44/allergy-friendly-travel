
import { DestinationContent } from '@/types/definitions';

export const turkeyContent: DestinationContent = {
  intro: "Turkey offers increasingly accommodating options for travelers with food allergies and dietary restrictions.",
  hotels: [
  ],
  faqs: [
    {
      question: "Is Turkish cuisine easy to navigate with a gluten allergy?",
      answer: "Turkish menus lean heavily on bread and wheat-based pastries, but grilled meats, fish, and vegetable dishes (köfte, izgara, most meze) are naturally gluten-free. Confirm with kitchen staff that shared grills and fryers aren't also used for breaded items."
    },
    {
      question: "Do all-inclusive resorts in Turkey label allergens on their buffets?",
      answer: "Larger 5-star resorts like the ones above increasingly label common allergens on buffet cards, but labeling isn't universal. Ask to speak with the chef or duty manager on arrival — most high-end Turkish resorts will prepare a separate plate on request."
    }
  ],
  languageTable: {
    headers: ["English", "Turkish"],
    rows: [
      ["I have a food allergy", "Yemek alerjim var (Yemek alerjim var)"],
      ["Gluten-free", "Glutensiz (Glutensiz)"],
      ["Is this safe to eat?", "Bunu yemek güvenli mi? (Bunu yemek güvenli mi?)"]
    ]
  }
};
