
import { DestinationContent } from '@/types/definitions';
import { genericFaqs, genericIntro } from './generic-content';

export const turkeyContent: DestinationContent = {
  intro: "Turkey offers increasingly accommodating options for travelers with food allergies and dietary restrictions.",
  hotels: [
    {
      id: "ciragan-palace",
      name: "Çırağan Palace Kempinski ★★★★★",
      location: "Istanbul, Turkey",
      address: "Ciragan Cad. No. 32, Besiktas, Istanbul 34349, Turkey",
      features: ["⭐ 5-star historic palace", "🍽️ Allergen-trained culinary team", "👨‍🍳 Chef consultation program"],
      description: "This historic palace hotel offers personalized chef consultations and maintains a highly trained culinary team capable of accommodating various dietary restrictions.",
      quote: "The chef created a custom Turkish menu that was entirely gluten-free and absolutely delicious! - Sarah K.",
      bookingUrl: "https://www.kempinski.com/en/istanbul/ciragan-palace/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=turkey",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Swimming Pool", "Spa", "Multiple Restaurants"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "d-hotel-maris",
      name: "D-Hotel Maris ★★★★★",
      location: "Marmaris, Turkey",
      address: "Hisarönü Mevkii, Datça Yolu, D400, 48700 Marmaris, Turkey",
      features: ["⭐ 5-star luxury resort", "🍽️ Multiple specialty restaurants", "📋 Digital allergen tracking"],
      description: "This luxury resort features multiple restaurants with specialized allergen tracking and dedicated preparation areas for guests with dietary restrictions.",
      quote: "Each restaurant had detailed allergen information, and the staff were incredibly knowledgeable about cross-contamination. - Michael T.",
      bookingUrl: "https://www.dhotel.com.tr/en/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=turkey",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Seafood-Free"],
      amenities: ["WiFi", "Private Beach", "Multiple Pools", "Spa", "Various Restaurants"],
      isPurelyAllergyFriendly: false,
      stars: 5
    }
  ],
  faqs: genericFaqs,
  languageTable: {
    headers: ["English", "Turkish"],
    rows: [
      ["I have a food allergy", "Yemek alerjim var (Yemek alerjim var)"],
      ["Gluten-free", "Glutensiz (Glutensiz)"],
      ["Is this safe to eat?", "Bunu yemek güvenli mi? (Bunu yemek güvenli mi?)"]
    ]
  }
};
