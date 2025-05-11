
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
      bookingUrl: "https://www.marriott.com/hotels/travel/tyomc-tokyo-marriott-hotel/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/53826815.jpg?k=d9bd2dc2955eb61b79c5765f0a3bc7a0876a1738b07644f5526743daa0668458&o=&hp=1",
      rating: 4.7,
      location: "Shinagawa"
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
      bookingUrl: "https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo/tyoph",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/293146114.jpg?k=6ad9fd9e1378836503fd5d648afe4585644d2af4b81371791895d3b9c2f0d815&o=&hp=1",
      rating: 4.9,
      location: "Shinjuku"
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
      bookingUrl: "https://www.peninsula.com/en/tokyo/5-star-luxury-hotel-ginza",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/41160325.jpg?k=be5a05462f66e8e55f055b7cc8179eb5005e6a1cce90c71307cfeea8941e8a84&o=&hp=1",
      rating: 4.8,
      location: "Chiyoda"
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
      bookingUrl: "https://www.keioplaza.com/",
      image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/316929364.jpg?k=76996a195bfa3b410b0b80be44088cb1c40c82378648847ccd9acf3626c27a7a&o=&hp=1",
      rating: 4.5,
      location: "Shinjuku"
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
