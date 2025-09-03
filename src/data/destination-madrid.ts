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
      id: "vincci-centrum",
      name: "Vincci Centrum",
      location: "Madrid, Spain",
      address: "Calle de Cedaceros, 4, 28014 Madrid, Spain",
      features: [
        "Allergy-free rooms with hypoallergenic features",
        "Boutique hotel near Gran Vía",
        "Personalized allergen-aware service",
        "Clean and comfortable accommodations",
        "Central Madrid location"
      ],
      description: "Boutique hotel near Gran Vía offering allergy-free rooms and hypoallergenic features with exceptional service standards.",
      quote: "The service and the room was very clean and comfortable. The staff were the best.",
      bookingUrl: "https://www.vinccicentrum.com/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Dust Mite-Free", "Hypoallergenic"],
      amenities: ["WiFi", "Central Location", "24/7 Reception"],
      isPurelyAllergyFriendly: true,
      stars: 4
    },
    {
      id: "hotel-regina",
      name: "Hotel Regina",
      location: "Madrid, Spain", 
      address: "Calle de Alcalá, 19, 28014 Madrid, Spain",
      features: [
        "Heart of Madrid location next to Puerta del Sol",
        "Allergy-aware service with detailed questionnaires",
        "Staff trained in allergy management",
        "Central historic location",
        "Personalized allergy consultation"
      ],
      description: "In the heart of Madrid, next to Puerta del Sol, offering allergy-aware service with detailed guest consultation.",
      quote: "The staff asked me detailed questions about my allergy and made me feel safe.",
      bookingUrl: "https://www.hotelregina.com/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Multiple Allergies", "Custom Meal Planning"],
      amenities: ["WiFi", "Historic Location", "Concierge Service"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "only-you-atocha",
      name: "Only YOU Hotel Atocha",
      location: "Madrid, Spain",
      address: "Paseo de la Infanta Isabel, 13, 28014 Madrid, Spain", 
      features: [
        "Stylish hotel opposite Atocha station",
        "Gluten-free request specialists",
        "Well-prepared allergy protocols",
        "Modern accommodations",
        "Transport hub convenience"
      ],
      description: "Stylish hotel opposite Atocha station with comprehensive allergy-friendly options and well-prepared staff.",
      quote: "Great experience with gluten-free requests. They were well‑prepared.",
      bookingUrl: "https://www.onlyyouhotels.com/atocha/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Gluten-Free", "Custom Dietary Needs"],
      amenities: ["WiFi", "Restaurant", "Transport Access"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
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
      quote: "I'm allergic to dust mites and nuts. My room was spotless and I felt safe eating breakfast.",
      bookingUrl: "https://all.accor.com/hotel/3172/index.en.shtml?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Dust Mite-Free", "Nut-Free", "Non-Smoking"],
      amenities: ["WiFi", "Restaurant", "Fitness Center"],
      isPurelyAllergyFriendly: true,
      stars: 4
    },
    {
      id: "crowne-plaza-airport",
      name: "Crowne Plaza Madrid Airport",
      location: "Madrid, Spain",
      address: "Calle de Lola Flores, 1, 28022 Madrid, Spain",
      features: [
        "Near Barajas Airport convenience",
        "24/7 allergy-aware staff",
        "English-speaking personnel",
        "Nut allergy specialists",
        "Emergency protocol awareness"
      ],
      description: "Located near Barajas Airport with round-the-clock allergy-aware staff and comprehensive food services.",
      quote: "Staff spoke English and took my nut allergy seriously, even at 1 a.m.",
      bookingUrl: "https://www.ihg.com/crowneplaza/hotels/us/en/madrid/madap/hoteldetail?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Nut-Free", "24/7 Support"],
      amenities: ["WiFi", "Airport Shuttle", "Restaurant"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "westin-cuzco",
      name: "The Westin Madrid Cuzco",
      location: "Madrid, Spain",
      address: "Paseo de la Castellana, 49, 28046 Madrid, Spain",
      features: [
        "Luxury allergy-conscious dining",
        "Specialized bedding options",
        "High-end allergen protocols",
        "Gluten-free menu specialists",
        "Premium accommodations"
      ],
      description: "Luxury option with comprehensive allergy-conscious dining and specialized bedding options for sensitive guests.",
      quote: "Wonderful staff and gluten-free options made my stay safe.",
      bookingUrl: "https://www.marriott.com/hotels/travel/madwi-the-westin-madrid-cuzco/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Gluten-Free", "Luxury Allergen Care"],
      amenities: ["WiFi", "Spa", "Fine Dining", "Premium Service"],
      isPurelyAllergyFriendly: false,
      stars: 5
    },
    {
      id: "dear-hotel",
      name: "Dear Hotel Madrid",
      location: "Madrid, Spain",
      address: "Gran Vía, 80, 28013 Madrid, Spain",
      features: [
        "Boutique hotel with allergy-sensitive staff",
        "Personal chef consultations",
        "Dairy allergy specialists",
        "Tailored food options",
        "Gran Vía location"
      ],
      description: "Boutique hotel with allergy-sensitive staff and personalized chef consultations for safe dining experiences.",
      quote: "Beautiful room, and the chef personally discussed my dairy allergy.",
      bookingUrl: "https://www.dearhotelmadrid.com/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Dairy-Free", "Personal Chef Service"],
      amenities: ["WiFi", "Restaurant", "Boutique Experience"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "catalonia-plaza-mayor",
      name: "Catalonia Plaza Mayor",
      location: "Madrid, Spain",
      address: "Calle de Atocha, 36, 28012 Madrid, Spain",
      features: [
        "Central location near Plaza Mayor",
        "Printed allergen lists available",
        "Comprehensive allergen documentation",
        "Staff allergen training",
        "Historic area access"
      ],
      description: "Centrally located near Plaza Mayor with comprehensive allergen-aware dining and detailed documentation.",
      quote: "The staff had a printed allergen list and gave me peace of mind.",
      bookingUrl: "https://www.hoteles-catalonia.com/en/hotel/madrid/catalonia-plaza-mayor/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Comprehensive Allergen Lists", "Documentation"],
      amenities: ["WiFi", "Restaurant", "Historic Location"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "coolrooms-atocha",
      name: "CoolRooms Palacio de Atocha", 
      location: "Madrid, Spain",
      address: "Calle de Atocha, 34, 28012 Madrid, Spain",
      features: [
        "Kitchen staff trained in allergen safety",
        "Egg allergy adaptation specialists",
        "Menu customization services",
        "Boutique hotel experience",
        "Personalized dining approach"
      ],
      description: "Boutique hotel with kitchen staff specifically trained in allergen safety and menu adaptation services.",
      quote: "Not only did they understand my egg allergy, they adapted the menu for me.",
      bookingUrl: "https://www.coolrooms.es/palacio-de-atocha/?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Egg-Free", "Menu Adaptation"],
      amenities: ["WiFi", "Restaurant", "Custom Dining"],
      isPurelyAllergyFriendly: false,
      stars: 4
    },
    {
      id: "radisson-blu-prado",
      name: "Radisson Blu Hotel, Madrid Prado",
      location: "Madrid, Spain", 
      address: "Calle de Moratín, 52, 28014 Madrid, Spain",
      features: [
        "Trusted by allergy travelers",
        "Central Madrid location",
        "Allergy-free room options",
        "Chef ingredient consultations",
        "Proven track record"
      ],
      description: "Trusted by allergy travelers worldwide, offering central location with comprehensive allergy-free room options.",
      quote: "I was able to successfully eat at this hotel. The chef went over every ingredient.",
      bookingUrl: "https://www.radissonhotels.com/en-us/hotels/radisson-blu-madrid-prado?utm_source=Allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
      allergenFriendly: ["Ingredient Transparency", "Chef Consultation"],
      amenities: ["WiFi", "Restaurant", "Central Location"],
      isPurelyAllergyFriendly: false,
      stars: 4
    }
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
      allergyInfo: "Gluten-Free, Celiac-Safe"
    },
    {
      name: "La Biotika", 
      address: "Calle Amor de Dios, 3, Madrid",
      description: "Organic restaurant with excellent allergy awareness and multiple dietary options.",
      allergyInfo: "Gluten-Free, Vegan, Organic"
    }
  ]
};