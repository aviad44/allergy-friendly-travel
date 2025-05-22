
import { DestinationContent } from '@/types/definitions';
import { genericFaqs, genericIntro } from './generic-content';

export const abuDhabiContent: DestinationContent = {
  intro: "Abu Dhabi's luxury hotels excel at accommodating dietary restrictions with world-class service and attention to detail.",
  hotels: [
    {
      id: "emirates-palace",
      name: "Emirates Palace ★★★★★",
      location: "Abu Dhabi, UAE",
      address: "West Corniche Road, Abu Dhabi, United Arab Emirates",
      features: ["⭐ 5-star palace luxury", "🍽️ Personal chef consultations", "🍰 Allergen-free gourmet dishes"],
      description: "This iconic palace hotel offers personal chef consultations for guests with dietary restrictions and creates custom allergen-free gourmet experiences.",
      quote: "The chefs prepared the most incredible custom gluten-free Arabic pastries I've ever tasted! - Sarah J.",
      bookingUrl: "https://www.mandarinoriental.com/abu-dhabi/emirates-palace/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Private Beach", "Multiple Pools", "Spa", "Fine Dining"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "park-hyatt-abu-dhabi",
      name: "Park Hyatt Abu Dhabi ★★★★★",
      location: "Saadiyat Island, Abu Dhabi, UAE",
      address: "Saadiyat Island, Abu Dhabi, United Arab Emirates",
      features: ["⭐ 5-star beach resort", "🍽️ Dedicated allergen kitchens", "📋 Digital allergen tracking"],
      description: "Park Hyatt maintains dedicated allergen-free kitchen areas and implements digital tracking of guest allergies across all their dining venues.",
      quote: "Their digital allergen tracking system meant every staff member knew about my allergies without me having to explain repeatedly. - Michael T.",
      bookingUrl: "https://www.hyatt.com/en-US/hotel/united-arab-emirates/park-hyatt-abu-dhabi-hotel-and-villas/abuph",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Seafood-Free"],
      amenities: ["WiFi", "Private Beach", "Swimming Pools", "Spa", "Multiple Restaurants"],
      isPurelyAllergyFriendly: false,
      stars: 5
    }
  ],
  faqs: genericFaqs,
  languageTable: {
    headers: ["English", "Arabic"],
    rows: [
      ["I have a food allergy", "عندي حساسية من الطعام (Eindi hsasyt mn altaeam)"],
      ["Gluten-free", "خالي من الغلوتين (Khali min alghlutin)"],
      ["Is this safe to eat?", "هل هذا آمن للأكل؟ (Hal hdha amn lilakal?)"]
    ]
  }
};
