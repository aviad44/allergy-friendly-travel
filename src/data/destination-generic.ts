
import { DestinationContent } from '@/types/definitions';

// Generic placeholder content for destinations without specific content yet
export const genericDestinationContent: DestinationContent = {
  intro: "Find safe and comfortable accommodations for travelers with dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// London will have some hotel entries but no full content yet
export const londonContent: DestinationContent = {
  intro: "London offers numerous allergy-friendly accommodations across its diverse neighborhoods.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Barcelona
export const barcelonaContent: DestinationContent = {
  intro: "Barcelona's hotels are increasingly catering to guests with dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Cyprus
export const cyprusContent: DestinationContent = {
  intro: "Cyprus offers numerous allergy-friendly accommodations across the island.",
  hotels: [
    {
      name: "1. Almyra Hotel ★★★★★",
      address: "Poseidonos Avenue, Paphos 8042, Cyprus",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergy menus", "👨‍🍳 Staff trained in food allergies"],
      description: "This luxury resort offers dedicated allergy-friendly menus across all their restaurants. Kitchen staff undergo specialized training for handling food allergies and preventing cross-contamination.",
      quote: "The chef personally prepared special gluten-free meals for me throughout my stay! - Michael T.",
      bookingUrl: "https://www.almyra.com/"
    },
    {
      name: "2. Four Seasons Hotel ★★★★★",
      address: "Amathountos Avenue 67-69, Limassol 4532, Cyprus",
      features: ["⭐ 5-star luxury", "🌿 Allergen-free kitchen areas", "📋 Personalized meal plans"],
      description: "Four Seasons Limassol features dedicated kitchen areas for allergen-free food preparation and offers personalized meal plans for guests with dietary restrictions.",
      quote: "As someone with celiac disease, I felt completely safe dining at their restaurants! - Sarah K.",
      bookingUrl: "https://www.fourseasons.com/cyprus/"
    },
    {
      name: "3. Amara Hotel ★★★★★",
      address: "95 Amathountos Avenue, Limassol 4532, Cyprus",
      features: ["⭐ 5-star luxury", "🍽️ Allergy-conscious dining", "🍰 Gluten-free pastries"],
      description: "Amara offers extensive allergy-conscious dining options with specially trained staff who understand the importance of preventing cross-contamination.",
      quote: "Their gluten-free pastries were amazing! I've never felt so well-catered for as a coeliac traveler. - Emma R.",
      bookingUrl: "https://www.amarahotel.com/"
    },
    {
      name: "4. Elysium Hotel ★★★★★",
      address: "Queen Verenikis Street, Paphos 8107, Cyprus",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-free zones", "📱 Digital allergen information"],
      description: "Elysium provides comprehensive digital allergen information for all menu items and maintains dedicated allergen-free preparation zones in their kitchens.",
      quote: "The staff was incredibly knowledgeable about my nut allergy and made me feel completely safe. - David L.",
      bookingUrl: "https://www.elysium-hotel.com/"
    }
  ],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Abu Dhabi
export const abuDhabiContent: DestinationContent = {
  intro: "Abu Dhabi's luxury hotels excel at accommodating dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Crete
export const creteContent: DestinationContent = {
  intro: "Discover Crete's most accommodating hotels for dietary restrictions.",
  hotels: [
    {
      name: "1. Blue Palace Elounda ★★★★★",
      address: "Plaka, Elounda 720 53, Crete, Greece",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergen-free kitchen areas", "👨‍🍳 Specialized chefs"],
      description: "Blue Palace features dedicated allergen-free kitchen spaces and specialized chefs who can prepare custom meals for guests with food allergies or dietary restrictions.",
      quote: "The chef prepared gluten-free versions of traditional Greek dishes that were absolutely incredible! - James M.",
      bookingUrl: "https://www.bluepalace.gr/"
    },
    {
      name: "2. Domes of Elounda ★★★★★",
      address: "Tsifliki, Elounda 720 53, Crete, Greece",
      features: ["⭐ 5-star luxury", "🥗 Allergen menus", "📱 Digital allergen tracking"],
      description: "Domes of Elounda provides detailed allergen menus at all their restaurants and uses digital systems to track guest dietary requirements throughout their stay.",
      quote: "As someone with multiple food allergies, their attention to detail made my vacation worry-free! - Caroline D.",
      bookingUrl: "https://domesresorts.com/domesofelounda/"
    },
    {
      name: "3. Abaton Island Resort & Spa ★★★★★",
      address: "Themistokleous Avenue, Hersonissos 700 14, Crete, Greece",
      features: ["⭐ 5-star luxury", "🍽️ Allergy-friendly menus", "🍰 Gluten-free pastries"],
      description: "Abaton Island Resort offers comprehensive allergy-friendly dining options at all five of their restaurants, including a selection of gluten-free pastries and desserts.",
      quote: "Their gluten-free baklava was the highlight of my trip! Never thought I could enjoy traditional Greek desserts. - Sophie T.",
      bookingUrl: "https://www.abaton.gr/"
    },
    {
      name: "4. Daios Cove Luxury Resort ★★★★★",
      address: "Vathi, Agios Nikolaos 721 00, Crete, Greece",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-free zones", "📋 Personalized meal plans"],
      description: "Daios Cove maintains allergen-free preparation zones in their kitchens and offers personalized meal plans for guests with dietary restrictions throughout their stay.",
      quote: "The resort accommodated my dairy allergy at every meal without me having to ask twice. Amazing service! - Robert K.",
      bookingUrl: "https://www.daioscove.com/"
    }
  ],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Thailand
export const thailandContent: DestinationContent = {
  intro: "Find safe and comfortable stays across Thailand's top destinations.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Hotel Chains
export const hotelChainsContent: DestinationContent = {
  intro: "Global hotel chains with consistent allergy-friendly policies.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for New York
export const newYorkContent: DestinationContent = {
  intro: "New York City's best accommodations for allergy-conscious travelers.",
  hotels: [
    {
      name: "1. The Langham, New York ★★★★★",
      address: "400 Fifth Avenue, New York, NY 10018, USA",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergen protocols", "👨‍🍳 Chef consultation program"],
      description: "The Langham offers a chef consultation program for guests with allergies and maintains strict allergen protocols throughout their kitchen operations.",
      quote: "The chef personally met with me to discuss my gluten allergy and created custom meals every day! - Jessica T.",
      bookingUrl: "https://www.langhamhotels.com/en/the-langham/new-york/"
    },
    {
      name: "2. The Mark Hotel ★★★★★",
      address: "25 E 77th St, New York, NY 10075, USA",
      features: ["⭐ 5-star luxury", "🍽️ Allergen-free room service", "📋 Comprehensive allergen menus"],
      description: "The Mark provides comprehensive allergen menus for all dining options and offers specialized allergen-free room service for guests with dietary restrictions.",
      quote: "Their allergen menus were so detailed! I could enjoy my meals without any worry. - Robert C.",
      bookingUrl: "https://www.themarkhotel.com/"
    },
    {
      name: "3. 1 Hotel Central Park ★★★★★",
      address: "1414 6th Ave, New York, NY 10019, USA",
      features: ["⭐ 5-star eco-luxury", "🌱 Farm-to-table with allergy focus", "🥗 Vegan and gluten-free options"],
      description: "This eco-conscious hotel features farm-to-table dining with a strong focus on accommodating allergies. Their farm-fresh approach allows for maximum customization.",
      quote: "As someone with multiple food allergies, I was amazed at how easily they accommodated all my dietary needs. - Amanda W.",
      bookingUrl: "https://www.1hotels.com/central-park"
    },
    {
      name: "4. The Beekman ★★★★★",
      address: "123 Nassau St, New York, NY 10038, USA",
      features: ["⭐ 5-star historic luxury", "🍽️ Allergy-trained culinary team", "📱 Digital allergy tracking"],
      description: "The Beekman's culinary team is specially trained in allergen management, and they use digital systems to track guest allergies across all dining experiences.",
      quote: "They remembered my dairy allergy throughout my entire stay without me having to remind them. Incredible service! - Michael P.",
      bookingUrl: "https://www.thebeekman.com/"
    }
  ],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Ayia Napa
export const ayiaNapaContent: DestinationContent = {
  intro: "Discover allergy-friendly accommodations in Cyprus's beautiful coastal town.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Portugal
export const portugalContent: DestinationContent = {
  intro: "Portugal's finest hotels catering to dietary restrictions.",
  hotels: [
    {
      name: "1. Four Seasons Hotel Ritz Lisbon ★★★★★",
      address: "Rua Rodrigo da Fonseca 88, 1099-039 Lisbon, Portugal",
      features: ["⭐ 5-star luxury", "🍽️ Dedicated allergen-free kitchen", "👨‍🍳 Allergen-trained chefs"],
      description: "Four Seasons Lisbon features a dedicated allergen-free kitchen area and specially trained chefs who can accommodate virtually any dietary restriction with advance notice.",
      quote: "The pastry chef created gluten-free versions of Portuguese pastries that were even better than the originals! - Emma L.",
      bookingUrl: "https://www.fourseasons.com/lisbon/"
    },
    {
      name: "2. Pine Cliffs Resort ★★★★★",
      address: "Praia da Falésia, Albufeira 8200-909, Algarve, Portugal",
      features: ["⭐ 5-star luxury", "🍽️ Comprehensive allergen menus", "🥗 Allergen-free buffet sections"],
      description: "Pine Cliffs offers comprehensive allergen information for all their restaurants and maintains dedicated allergen-free sections at their buffets to prevent cross-contamination.",
      quote: "Their allergy-friendly kids' menu was a lifesaver for our son with multiple food allergies. First vacation without stress! - Thomas B.",
      bookingUrl: "https://www.pinecliffs.com/"
    },
    {
      name: "3. Six Senses Douro Valley ★★★★★",
      address: "Quinta de Vale Abraão, 5100-758 Lamego, Portugal",
      features: ["⭐ 5-star luxury", "🌱 Farm-to-table with allergy focus", "🍽️ Personalized dietary programs"],
      description: "Six Senses' farm-to-table approach allows for complete transparency in ingredients and preparation. They offer personalized dietary programs for guests with allergies or restrictions.",
      quote: "The resort created a completely personalized menu plan for my challenging combination of allergies. Phenomenal service! - Sarah M.",
      bookingUrl: "https://www.sixsenses.com/en/resorts/douro-valley/"
    },
    {
      name: "4. Tivoli Avenida Liberdade Lisboa ★★★★★",
      address: "Av. da Liberdade 185, 1269-050 Lisbon, Portugal",
      features: ["⭐ 5-star luxury", "🍽️ Allergen information system", "👨‍🍳 Chef consultation available"],
      description: "Tivoli Avenida Liberdade implements a comprehensive allergen information system across all their dining venues and offers chef consultations for guests with complex dietary needs.",
      quote: "The staff's knowledge about cross-contamination was impressive. I could enjoy traditional Portuguese cuisine safely as a celiac! - David K.",
      bookingUrl: "https://www.tivolihotels.com/en/tivoli-avenida-liberdade-lisboa"
    }
  ],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};

// Content for Swiss Alps
export const swissAlpsContent: DestinationContent = {
  intro: "The Swiss Alps offer excellent options for travelers with food allergies and dietary restrictions.",
  hotels: [],
  faqs: [],
  languageTable: { headers: [], rows: [] }
};
