
import { DestinationContent } from '@/types/definitions';

export const newYorkContent: DestinationContent = {
  intro: "New York City's best accommodations for allergy-conscious travelers.",
  hotels: [
    {
      id: "1-hotel-central-park",
      name: "3. 1 Hotel Central Park ★★★★★",
      location: "New York, NY, USA",
      address: "1414 6th Ave, New York, NY 10019, USA",
      features: ["⭐ 5-star eco-luxury", "🌱 Farm-to-table with allergy focus", "🥗 Vegan and gluten-free options"],
      description: "This eco-conscious hotel features farm-to-table dining with a strong focus on accommodating allergies. Their farm-fresh approach allows for maximum customization.",
      quote: "And the Jams restaurant had some delicious plant-based options.",
      bookingUrl: "https://www.1hotels.com/central-park",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Vegan Options"],
      amenities: ["WiFi", "Restaurant", "Fitness Center", "Pet-Friendly"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
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
