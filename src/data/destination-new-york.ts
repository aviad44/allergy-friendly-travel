
import { DestinationContent } from '@/types/definitions';

export const newYorkContent: DestinationContent = {
  intro: "New York City's best accommodations for allergy-conscious travelers.",
  hotels: [
    {
      id: "the-langham-new-york",
      name: "1. The Langham, New York ★★★★★",
      location: "New York, NY, USA",
      address: "400 Fifth Avenue, New York, NY 10018, USA",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergen protocols", "👨‍🍳 Chef consultation program"],
      description: "The Langham offers a chef consultation program for guests with allergies and maintains strict allergen protocols throughout their kitchen operations.",
      quote: "The chef personally met with me to discuss my gluten allergy and created custom meals every day! - Jessica T.",
      bookingUrl: "https://www.langhamhotels.com/en/the-langham/new-york/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Room Service", "Restaurant", "Spa", "Fitness Center"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "the-mark-hotel",
      name: "2. The Mark Hotel ★★★★★",
      location: "New York, NY, USA",
      address: "25 E 77th St, New York, NY 10075, USA",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-free room service", "📋 Comprehensive allergen menus"],
      description: "The Mark provides comprehensive allergen menus for all dining options and offers specialized allergen-free room service for guests with dietary restrictions.",
      quote: "Their allergen menus were so detailed! I could enjoy my meals without any worry. - Robert C.",
      bookingUrl: "https://www.themarkhotel.com/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Seafood-Free"],
      amenities: ["WiFi", "Room Service", "Restaurant", "Spa", "Pet-Friendly"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "1-hotel-central-park",
      name: "3. 1 Hotel Central Park ★★★★★",
      location: "New York, NY, USA",
      address: "1414 6th Ave, New York, NY 10019, USA",
      features: ["⭐ 5-star eco-luxury", "🌱 Farm-to-table with allergy focus", "🥗 Vegan and gluten-free options"],
      description: "This eco-conscious hotel features farm-to-table dining with a strong focus on accommodating allergies. Their farm-fresh approach allows for maximum customization.",
      quote: "As someone with multiple food allergies, I was amazed at how easily they accommodated all my dietary needs. - Amanda W.",
      bookingUrl: "https://www.1hotels.com/central-park",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Vegan Options"],
      amenities: ["WiFi", "Restaurant", "Fitness Center", "Pet-Friendly"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "the-beekman",
      name: "4. The Beekman ★★★★★",
      location: "New York, NY, USA",
      address: "123 Nassau St, New York, NY 10038, USA",
      features: ["⭐ 5-star historic luxury", "🍽️ Allergy-trained culinary team", "📱 Digital allergy tracking"],
      description: "The Beekman's culinary team is specially trained in allergen management, and they use digital systems to track guest allergies across all dining experiences.",
      quote: "They remembered my dairy allergy throughout my entire stay without me having to remind them. Incredible service! - Michael P.",
      bookingUrl: "https://www.thebeekman.com/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Egg-Free"],
      amenities: ["WiFi", "Room Service", "Restaurant", "Bar", "Fitness Center"],
      isPurelyAllergyFriendly: false,
      stars: 5
    }
  ],
  faqs: [
    {
      question: "Do New York hotels accommodate food allergies?",
      answer: "Yes, many upscale New York hotels offer excellent allergy accommodation. Always notify the hotel in advance and speak with the chef or food service manager upon arrival."
    },
    {
      question: "Which neighborhoods in NYC have the most allergy-friendly hotels?",
      answer: "Midtown Manhattan and the Upper East Side tend to have the highest concentration of hotels with comprehensive allergy protocols, though excellent options can be found throughout the city."
    }
  ],
  languageTable: {
    headers: ["Phrase", "Usage Tip"],
    rows: [
      ["I have a severe allergy", "Emphasize the severity to ensure proper attention"],
      ["Could I speak with the chef?", "Direct communication with kitchen staff is often most effective"],
      ["Is this prepared in a separate area?", "Ask about cross-contamination protocols"]
    ]
  }
};
