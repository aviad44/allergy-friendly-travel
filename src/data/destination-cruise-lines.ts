
import { DestinationContent } from '@/types/definitions';

export const cruiseLinesContent: DestinationContent = {
  intro: "Cruise lines around the world are increasingly accommodating passengers with food allergies and dietary restrictions.",
  hotels: [
    {
      id: "royal-caribbean",
      name: "Royal Caribbean International",
      location: "Global Routes",
      address: "Multiple Sailings",
      features: ["🚢 Diverse fleet", "🍽️ Allergen-trained kitchen staff", "📋 Pre-cruise special needs form"],
      description: "Royal Caribbean offers a comprehensive approach to food allergies, with pre-cruise planning, allergen-trained staff, and dedicated food preparation areas.",
      quote: "They took my gluten allergy so seriously - the head chef met with me on the first day and ensured safe meals throughout the cruise! - Mark T.",
      bookingUrl: "https://www.royalcaribbean.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=cruise_lines",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["Multiple Dining Venues", "Entertainment", "Pools", "Fitness Centers"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "disney-cruise",
      name: "Disney Cruise Line",
      location: "Global Routes",
      address: "Multiple Sailings",
      features: ["🚢 Family-friendly cruising", "🍽️ Allergen protocols across all restaurants", "👨‍🍳 Allergen-trained chefs"],
      description: "Disney Cruise Line excels at handling food allergies with dedicated protocols, specially trained staff, and allergen-free options at every dining venue.",
      quote: "Our son with multiple allergies was able to enjoy every meal safely. The staff even created special allergy-friendly desserts just for him! - Jessica M.",
      bookingUrl: "https://disneycruise.disney.go.com/?utm_source=allergy-free-travel.com&utm_medium=hotel_listing&utm_campaign=cruise_lines",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free", "Multiple Allergies"],
      amenities: ["Family Entertainment", "Multiple Dining Options", "Character Experiences", "Pools"],
      isPurelyAllergyFriendly: false,
      stars: 5
    }
  ],
  faqs: [
    {
      question: "How do I notify a cruise line about my food allergies?",
      answer: "Most cruise lines have a special needs form that should be submitted at least 30 days before sailing. Follow up with a call to their special needs department and speak with the maitre d' or head chef on the first day of your cruise."
    },
    {
      question: "Can cruise ships accommodate multiple food allergies?",
      answer: "Yes, most major cruise lines can handle multiple food allergies, but it's important to provide detailed information well in advance and follow up directly with dining staff once on board."
    }
  ]
};
