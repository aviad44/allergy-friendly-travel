
import { DestinationContent } from '@/types/definitions';

export const parisContent: DestinationContent = {
  intro: "Discover Paris's finest allergy-aware hotels and accommodations.",
  hotels: [
    {
      name: "Le Bristol Paris ★★★★★",
      address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
      features: [
        "⭐ 5-star luxury hotel",
        "🍽️ Dedicated allergy menu",
        "👨‍🍳 Private consultations with chef"
      ],
      description: "This iconic luxury hotel offers exceptional service for guests with dietary restrictions, including pre-arrival consultations.",
      quote: "The chef personally came to our table to discuss my daughter's gluten allergy. The food was exquisite and completely safe.",
      bookingUrl: "https://www.oetkercollection.com/hotels/le-bristol-paris/"
    },
    {
      name: "Hôtel Plaza Athénée ★★★★★",
      address: "25 Avenue Montaigne, 75008 Paris, France",
      features: [
        "⭐ 5-star luxury accommodation", 
        "🥐 Gluten-free pastries", 
        "🍲 Allergen-free room service"
      ],
      description: "Upscale accommodation with special attention to food allergies and comprehensive allergen training for all kitchen staff.",
      quote: "They created a custom dairy-free menu for my entire stay, even including French pastries!",
      bookingUrl: "https://www.dorchestercollection.com/en/paris/hotel-plaza-athenee/"
    },
    {
      name: "Hôtel de Crillon ★★★★★",
      address: "10 Place de la Concorde, 75008 Paris, France",
      features: [
        "⭐ 5-star historic hotel",
        "📋 Personalized allergy protocols",
        "🥗 Vegan and special diet options"
      ],
      description: "Elegant and historic Parisian hotel with knowledgeable staff trained to handle various dietary restrictions.",
      quote: "Despite being in the land of gluten, they made my celiac stay wonderful with safe and delicious alternatives.",
      bookingUrl: "https://www.rosewoodhotels.com/en/hotel-de-crillon"
    },
    {
      name: "Shangri-La Hotel Paris ★★★★★",
      address: "10 Avenue d'Iéna, 75116 Paris, France",
      features: [
        "⭐ 5-star palace hotel", 
        "🍲 Asian-European fusion allergy options", 
        "🛌 Allergy-friendly bedding"
      ],
      description: "Offers exceptional luxury accommodations with special attention to guest allergies and multiple dining venues with allergy-aware menus.",
      quote: "The staff went above and beyond to ensure my nut allergy was accommodated throughout my entire stay.",
      bookingUrl: "https://www.shangri-la.com/paris/shangrila/"
    }
  ],
  faqs: [
    {
      question: "How do Paris hotels typically handle food allergies?",
      answer: "Many luxury hotels in Paris now offer pre-arrival questionnaires to identify dietary needs, allergen-trained kitchen staff, and separate preparation areas to avoid cross-contamination."
    },
    {
      question: "Can I find gluten-free options in Parisian hotels?",
      answer: "Yes, particularly in 4 and 5-star hotels. Many offer gluten-free bread, pastries, and complete menu alternatives. Hotels like Le Bristol and Shangri-La are especially accommodating."
    },
    {
      question: "Should I notify my Paris hotel about allergies before arrival?",
      answer: "It's highly recommended to contact the hotel at least one week before arrival. Send a detailed explanation of your allergies in both English and French for the clearest communication."
    },
    {
      question: "Are apartment hotels a good option for severe allergies in Paris?",
      answer: "Yes, apartment hotels like Citadines and Adagio offer kitchenettes where you can prepare your own safe meals while still enjoying hotel amenities and services."
    }
  ],
  languageTable: {
    headers: ["English", "French"],
    rows: [
      ["I have a food allergy", "J'ai une allergie alimentaire"],
      ["Gluten-free", "Sans gluten"],
      ["Dairy-free", "Sans lactose"],
      ["Nut-free", "Sans noix"],
      ["I cannot eat", "Je ne peux pas manger"]
    ]
  }
};
