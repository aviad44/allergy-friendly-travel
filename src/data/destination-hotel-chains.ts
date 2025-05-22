
import { DestinationContent } from '@/types/definitions';
import { genericFaqs, genericIntro } from './generic-content';

export const hotelChainsContent: DestinationContent = {
  intro: "Global hotel chains that offer consistent allergy-friendly policies and protocols across their properties worldwide.",
  hotels: [
    {
      id: "four-seasons",
      name: "Four Seasons Hotels and Resorts",
      location: "Global",
      address: "Global Locations",
      features: ["⭐ 5-star luxury chain", "🍽️ Global allergen protocols", "👨‍🍳 Chef consultation program"],
      description: "Four Seasons implements consistent allergen protocols across all properties worldwide, with chefs trained to accommodate virtually any dietary restriction.",
      quote: "No matter which Four Seasons I stay at, they always handle my celiac disease perfectly. Complete consistency! - Jennifer S.",
      bookingUrl: "https://www.fourseasons.com/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free", "Multiple Allergies"],
      amenities: ["WiFi", "Fine Dining", "24-hour Room Service", "Spa Services"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "hyatt",
      name: "Hyatt Hotels",
      location: "Global",
      address: "Global Locations",
      features: ["⭐ 4-5 star luxury chain", "🍽️ Dedicated allergen menus", "📱 Digital allergen tracking"],
      description: "Hyatt properties feature comprehensive allergen menus and implement consistent training across their global portfolio for handling dietary restrictions.",
      quote: "Their attention to detail with my son's multiple food allergies was outstanding at every Hyatt we visited. - Michael R.",
      bookingUrl: "https://www.hyatt.com/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Multiple Allergies"],
      amenities: ["WiFi", "Restaurant", "Room Service", "Business Centers"],
      isPurelyAllergyFriendly: false,
      stars: 5
    }
  ],
  faqs: [
    {
      question: "Which hotel chains have the best global allergy policies?",
      answer: "Four Seasons, Hyatt, and Marriott are consistently rated highly for their standardized allergy protocols across their global properties."
    },
    {
      question: "Do hotel chain loyalty programs offer any special allergy accommodations?",
      answer: "Yes, many hotel loyalty programs allow you to store dietary preferences in your profile, ensuring consistent handling of your allergies across all properties."
    }
  ]
};
