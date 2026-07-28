
import { DestinationContent } from '@/types/definitions';

export const ayiaNapaContent: DestinationContent = {
  intro: "Discover allergy-friendly accommodations in Cyprus's beautiful coastal town.",
  hotels: [
    {
      id: "adams-beach-hotel",
      name: "Adams Beach Hotel & Spa ★★★★★",
      location: "Ayia Napa, Cyprus",
      address: "Nissi Avenue, Ayia Napa 5340, Cyprus",
      features: ["⭐ 5-star beachfront resort", "🍽️ Allergy-aware dining options", "👨‍🍳 Chef consultation available"],
      description: "This luxurious beachfront resort offers dedicated allergy-aware dining options and the ability to consult with chefs about specific dietary needs.",
      quote: "The chef personally prepared my gluten-free meals, and they were absolutely delicious! - David K.",
      bookingUrl: "https://www.adams.com.cy/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=ayia_napa",
      allergenFriendly: ["Gluten-Free", "Dairy-Free"],
      amenities: ["WiFi", "Beach Access", "Multiple Pools", "Spa"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "nissi-beach-resort",
      name: "Nissi Beach Resort ★★★★☆",
      location: "Ayia Napa, Cyprus",
      address: "Nissi Avenue, Ayia Napa 5340, Cyprus",
      features: ["⭐ 4-star beachfront resort", "🍽️ Allergen labeling", "🥗 Special dietary menus"],
      description: "Nissi Beach Resort offers clear allergen labeling and special dietary menus for guests with food allergies or intolerances.",
      quote: "Their buffet had clear allergen labeling, which made dining so much easier for someone with allergies. - Emma S.",
      bookingUrl: "https://www.nissi-beach.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=ayia_napa",
      allergenFriendly: ["Gluten-Free", "Nut-Free"],
      amenities: ["WiFi", "Beach Access", "Swimming Pool", "Restaurant"],
      isPurelyAllergyFriendly: false,
      stars: 4
    }
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
