import { DestinationContent } from '@/types/definitions';

export const madridContent: DestinationContent = {
  intro: "Madrid, the vibrant capital of Spain, offers numerous allergy-friendly hotels that cater to travelers with dietary restrictions. From luxury accommodations near the Royal Palace to boutique hotels along Gran Vía, these establishments provide safe dining options and allergen-aware staff to ensure a comfortable stay.",
  longDescription: `
    <p>Madrid stands out as one of Europe's most welcoming destinations for travelers with food allergies. The city's hotel industry has made significant strides in allergen awareness, with many properties offering dedicated training for their staff and specialized menus for guests with dietary restrictions.</p>
    
    <p>From the boutique charm of hotels near Gran Vía to the luxury of international chains, Madrid's accommodations understand the importance of allergy safety. Many establishments provide detailed ingredient lists, work closely with guests to customize meals, and maintain strict protocols to prevent cross-contamination.</p>
    
    <p>The Spanish capital's central location also makes it an ideal base for exploring allergy-friendly dining throughout the region, with most hotels providing valuable local restaurant recommendations that cater to specific dietary needs.</p>
  `,
  hotels: [
    {
      id: "novotel-las-ventas",
      name: "Novotel Madrid City Las Ventas",
      location: "Madrid, Spain",
      address: "Calle Albacete, 1, 28027 Madrid, Spain",
      features: [
        "Modern hotel with allergy-free rooms",
        "Non-smoking policies throughout",
        "Dust mite and allergen protocols", 
        "Safe breakfast options",
        "Contemporary accommodations"
      ],
      description: "Modern hotel with comprehensive allergy-free rooms and strict non-smoking policies for sensitive guests.",
      quote: "It was fine, although the vegetarian options were fairly limited.",
      bookingUrl: "https://all.accor.com/hotel/3172/index.en.shtml?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Dust Mite-Free", "Nut-Free", "Non-Smoking"],
      amenities: ["WiFi", "Restaurant", "Fitness Center"],
      isPurelyAllergyFriendly: true,
      stars: 4
    },
  ],
  faqs: [
    {
      question: "Do Madrid hotels accommodate food allergies effectively?",
      answer: "Yes, Madrid hotels have excellent allergy accommodation standards. Many properties like Vincci Centrum and Hotel Regina have specialized protocols, trained staff, and detailed allergen documentation to ensure guest safety."
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
  },
  restaurants: [
    {
      name: "Celicioso",
      address: "Calle Hortaleza, 3, Madrid",
      description: "100% gluten-free restaurant and bakery offering safe dining for celiac travelers.",
      guestReview: "Great gluten-free selection of pastries, salads, and sandwiches.",
      allergyInfo: "Gluten-Free, Celiac-Safe"
    },
  ]
};