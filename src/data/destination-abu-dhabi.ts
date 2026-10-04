
import { DestinationContent } from '@/types/definitions';

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
      quote: "We were really impressed by the service staff at breakfast who were incredibly attentive & I was blown away by the gluten free selection!",
      bookingUrl: "https://www.mandarinoriental.com/abu-dhabi/emirates-palace/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=abu_dhabi",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Private Beach", "Multiple Pools", "Spa", "Fine Dining"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
  ],
  faqs: [
    {
      question: "Do Abu Dhabi's luxury hotels charge extra for allergen-specific meals?",
      answer: "Generally no. At 5-star properties like Emirates Palace and Park Hyatt, allergen-aware menu adjustments and chef consultations are part of the standard personalized service, not a paid add-on."
    },
    {
      question: "How far in advance should I notify a hotel in Abu Dhabi about my allergies?",
      answer: "Aim for 48–72 hours before arrival if you want a personal chef consultation, which several of the city's top palace and resort hotels offer. Same-day notice usually still gets you a safe meal, just with less menu customization."
    }
  ],
  languageTable: {
    headers: ["English", "Arabic"],
    rows: [
      ["I have a food allergy", "عندي حساسية من الطعام (Eindi hsasyt mn altaeam)"],
      ["Gluten-free", "خالي من الغلوتين (Khali min alghlutin)"],
      ["Is this safe to eat?", "هل هذا آمن للأكل؟ (Hal hdha amn lilakal?)"]
    ]
  }
};
