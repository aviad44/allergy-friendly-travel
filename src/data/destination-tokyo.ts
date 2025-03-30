
import { DestinationContent } from '@/types/definitions';

// Console log for debugging this module's initialization
console.log("Loading destination-tokyo.ts module");

export const tokyoContent: DestinationContent = {
  intro: "Navigate Tokyo's culinary scene safely with these allergy-aware hotels.",
  hotels: [
    {
      name: "Tokyo Marriott Hotel ★★★★★",
      address: "4-7-36 Kitashinagawa, Shinagawa, Tokyo 140-0001, Japan",
      features: [
        "⭐ 5-star international chain",
        "🍚 Allergen cards in Japanese",
        "👨‍🍳 Staff trained in cross-contamination"
      ],
      description: "Excellent for international travelers with food allergies, offering allergen cards in Japanese to help communicate dietary needs.",
      quote: "The staff provided me with allergen cards I could show at restaurants throughout my stay in Japan!",
      bookingUrl: "https://www.marriott.com/hotels/travel/tyomc-tokyo-marriott-hotel/"
    },
    {
      name: "Park Hyatt Tokyo ★★★★★",
      address: "3-7-1-2 Nishi Shinjuku, Shinjuku-Ku, Tokyo 163-1055, Japan",
      features: [
        "⭐ 5-star landmark hotel",
        "🍣 Allergen-aware Japanese cuisine",
        "📝 Written dietary communication cards"
      ],
      description: "Sophisticated accommodation famous from 'Lost in Translation' with exceptional allergy awareness and custom meal preparation.",
      quote: "The chef created special gluten-free versions of traditional Japanese dishes that were incredible.",
      bookingUrl: "https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo/tyoph"
    },
    {
      name: "The Peninsula Tokyo ★★★★★",
      address: "1-8-1 Yurakucho, Chiyoda-ku, Tokyo 100-0006, Japan",
      features: [
        "⭐ 5-star luxury hotel",
        "🏷️ Food labeling in multiple languages",
        "🍲 Pre-arrival allergy coordination"
      ],
      description: "Luxury hotel near the Imperial Palace with exceptional allergy protocols and multilingual staff to assist with dietary needs.",
      quote: "Every meal was prepared with my dairy and nut allergies in mind, and they even offered gluten-free afternoon tea.",
      bookingUrl: "https://www.peninsula.com/en/tokyo/5-star-luxury-hotel-ginza"
    },
    {
      name: "Keio Plaza Hotel Tokyo ★★★★",
      address: "2-2-1 Nishi-Shinjuku, Shinjuku-Ku, Tokyo 160-8330, Japan",
      features: [
        "⭐ 4-star business hotel",
        "🥣 Allergen-free menu options",
        "🔍 Transparent ingredient lists"
      ],
      description: "Large, business-friendly hotel with designated allergy-friendly floors and restaurants experienced in handling dietary restrictions.",
      quote: "They had comprehensive English ingredient lists for every buffet item and could prepare special meals on request.",
      bookingUrl: "https://www.keioplaza.com/"
    }
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
