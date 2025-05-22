
import { DestinationContent } from '@/types/definitions';

export const thailandContent: DestinationContent = {
  intro: "Thailand's luxury resorts and boutique hotels are increasingly accommodating dietary restrictions with specialized training and dedicated menus.",
  hotels: [
    {
      id: "anantara-siam-bangkok",
      name: "1. Anantara Siam Bangkok ★★★★★",
      location: "Bangkok, Thailand",
      address: "155 Rajadamri Road, Bangkok 10330, Thailand",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-trained chefs", "📋 Personalized allergy cards"],
      description: "This luxury hotel offers guests personalized allergy cards in Thai to communicate dietary needs and employs chefs specifically trained in allergen management.",
      quote: "The hotel provided me with allergy cards in Thai which made dining out much easier during my entire stay! - Michael R.",
      bookingUrl: "https://www.anantara.com/en/siam-bangkok",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Nut-Free"],
      amenities: ["WiFi", "Swimming Pool", "Restaurant", "Spa"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "four-seasons-koh-samui",
      name: "2. Four Seasons Resort Koh Samui ★★★★★",
      location: "Koh Samui, Thailand",
      address: "219 Moo 5, Angthong, Koh Samui 84140, Thailand",
      features: ["⭐ 5-star luxury", "🥗 Dedicated allergen kitchens", "🍽️ Cross-contamination protocols"],
      description: "The resort features dedicated allergen kitchens and implements strict cross-contamination protocols across all dining venues to ensure safe meals for guests with allergies.",
      quote: "As someone with severe celiac disease, I felt completely safe dining at all their restaurants. - Sarah T.",
      bookingUrl: "https://www.fourseasons.com/kohsamui/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Shellfish-Free"],
      amenities: ["WiFi", "Private Beach", "Swimming Pool", "Restaurant", "Spa"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "banyan-tree-phuket",
      name: "3. Banyan Tree Phuket ★★★★★",
      location: "Phuket, Thailand",
      address: "33, 33/27 Moo 4, Srisoonthorn Road, Phuket 83110, Thailand",
      features: ["⭐ 5-star luxury", "👨‍🍳 Chef consultation program", "🍦 Allergen-free desserts"],
      description: "Banyan Tree offers a chef consultation program for guests with allergies and specializes in creating allergen-free versions of traditional Thai desserts.",
      quote: "The chefs created special nut-free versions of Thai desserts that were incredible! - Thomas L.",
      bookingUrl: "https://www.banyantree.com/thailand/phuket",
      allergenFriendly: ["Nut-Free", "Dairy-Free"],
      amenities: ["WiFi", "Swimming Pool", "Restaurant", "Spa", "Golf Course"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "the-slate-phuket",
      name: "4. The Slate Phuket ★★★★☆",
      location: "Phuket, Thailand",
      address: "116 Moo 1, Sakhu, Thalang, Phuket 83110, Thailand",
      features: ["⭐ 4-star boutique resort", "🌱 Farm-to-table program", "🍽️ Allergen-aware dining"],
      description: "This design-focused resort maintains a farm-to-table program allowing for maximum transparency in ingredients and preparation for guests with dietary restrictions.",
      quote: "Their farm-to-table approach meant they could tell me exactly what was in every dish. Perfect for my multiple food allergies! - Emma K.",
      bookingUrl: "https://www.theslatephuket.com/",
      allergenFriendly: ["Gluten-Free", "Dairy-Free", "Soy-Free"],
      amenities: ["WiFi", "Swimming Pool", "Restaurant", "Spa"],
      isPurelyAllergyFriendly: false,
      stars: 4
    }
  ],
  faqs: [
    {
      question: "How should I communicate my food allergies in Thailand?",
      answer: "Carry allergy translation cards in Thai, inform hotels in advance, and consider booking properties with dedicated allergy programs or international management familiar with dietary restrictions."
    },
    {
      question: "Are Thai chefs familiar with gluten-free dietary needs?",
      answer: "While awareness is growing, especially in tourist areas and luxury hotels, always confirm ingredients as many Thai sauces contain hidden wheat-based soy sauce or oyster sauce."
    },
    {
      question: "Which areas of Thailand are best for travelers with food allergies?",
      answer: "Bangkok, Phuket, and Koh Samui have the highest concentration of allergy-aware accommodations, with many luxury resorts offering specialized menus and trained staff."
    }
  ],
  languageTable: {
    headers: ["English", "Thai"],
    rows: [
      ["I have a food allergy", "ฉันแพ้อาหาร (Chan pae ahan)"],
      ["Gluten-free", "ปราศจากกลูเตน (Prasajak gluten)"],
      ["Dairy-free", "ไม่มีนม (Mai mee nom)"],
      ["Nut-free", "ไม่มีถั่ว (Mai mee tua)"],
      ["Is this safe for me to eat?", "อาหารนี้ปลอดภัยสำหรับฉันไหม (Ahan nee plodpai samrap chan mai)"]
    ]
  }
};
