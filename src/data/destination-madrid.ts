import { DestinationContent } from '@/types/definitions';

export const madridContent: DestinationContent = {
  intro: "Madrid, the vibrant capital of Spain, offers numerous allergy-friendly hotels that cater to travelers with dietary restrictions. From luxury accommodations near the Royal Palace to boutique hotels along Gran Vía, these establishments provide safe dining options and allergen-aware staff to ensure a comfortable stay.",
  longDescription: `
    <p>Madrid stands out as one of Europe's most welcoming destinations for travelers with food allergies. The city's hotel industry has made significant strides in allergen awareness, with many properties offering dedicated training for their staff and specialized menus for guests with dietary restrictions.</p>
    
    <p>From the boutique charm of hotels near Gran Vía to the luxury of international chains, Madrid's accommodations understand the importance of allergy safety. Many establishments provide detailed ingredient lists, work closely with guests to customize meals, and maintain strict protocols to prevent cross-contamination.</p>
    
    <p>The Spanish capital's central location also makes it an ideal base for exploring allergy-friendly dining throughout the region, with most hotels providing valuable local restaurant recommendations that cater to specific dietary needs.</p>

    <p>Looking for somewhere to eat? See our <a href="/restaurants/gluten-free-dining-madrid-food-allergies/">guide to gluten-free and allergy-friendly restaurants in Madrid</a>.</p>
  `,
  hotels: [
    {
      id: "hotel-catalonia-las-cortes",
      name: "Hotel Catalonia Las Cortes",
      location: "Madrid, Spain",
      address: "C. del Prado, 6, Centro, 28014 Madrid, Spain",
      features: [
        "Central Madrid location near the Prado"
      ],
      description: "Centrally located hotel near the Prado museum.",
      quote: "I am lactose intolerant and my friends are vegetarians and we all had lots of options.",
      bookingUrl: "https://www.booking.com/searchresults.html?ss=Hotel%20Catalonia%20Las%20Cortes%20Madrid",
      isPurelyAllergyFriendly: false,
    },
  ],
  faqs: [
    {
      question: "Do Madrid hotels accommodate food allergies effectively?",
      answer: "Some Madrid hotels accommodate dietary restrictions well, though real guest reports confirming this are still limited — check the specific hotel's reviews below before booking."
    },
    {
      question: "How should I communicate my allergies in Madrid?",
      answer: "Notify your hotel in advance and consider carrying Spanish allergy cards. Key phrases include 'Tengo alergia a...' (I am allergic to...) and 'Sin [ingredient], por favor' (Without [ingredient], please)."
    },
    {
      question: "What allergens are common in Spanish cuisine?",
      answer: "Watch for nuts in desserts, wheat in many dishes, dairy in sauces, and olive oil (which may cross-contaminate with nuts). Seafood is also prevalent, so shellfish-allergic travelers should be cautious."
    },
    {
      question: "Are there pharmacies in Madrid for allergy medication?",
      answer: "Yes, Madrid has numerous 'farmacias' with green cross signs, many open 24 hours. However, always bring your prescribed medications, especially EpiPens, as specific brands may not be available."
    },
    {
      question: "Which Madrid neighborhoods are best for allergy-friendly hotels?",
      answer: "The city center (near Gran Vía and Puerta del Sol) and the Prado area offer the highest concentration of allergy-aware hotels with easy access to medical facilities and allergy-friendly restaurants."
    }
  ],
  languageTable: {
    headers: ["English", "Spanish", "Pronunciation"],
    rows: [
      ["I have a food allergy", "Tengo alergia alimentaria", "TEN-go ah-LER-hee-ah ah-lee-men-TAH-ree-ah"],
      ["I am allergic to nuts", "Soy alérgico a los frutos secos", "soy ah-LER-hee-ko ah los FROO-tos SEH-kos"],
      ["Is this safe for me?", "¿Esto es seguro para mí?", "ES-to es se-GOO-ro PAH-rah mee"],
      ["No gluten please", "Sin gluten, por favor", "seen GLOO-ten por fah-VOR"],
      ["I need dairy-free food", "Necesito comida sin lácteos", "neh-seh-SEE-to ko-MEE-dah seen LAHK-teh-os"],
      ["Emergency", "Emergencia", "eh-mer-HEN-see-ah"],
      ["Call a doctor", "Llame a un médico", "YAH-meh ah oon MEH-dee-ko"],
      ["I have an EpiPen", "Tengo un EpiPen", "TEN-go oon EpiPen"]
    ]
  }
};