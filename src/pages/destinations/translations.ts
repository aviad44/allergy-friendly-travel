
export const destinationsTranslations = {
  en: {
    title: "Find Your Perfect Destination",
    subtitle: "Search for allergy-friendly destinations and accommodations worldwide",
    home: "Home",
    languageSelector: "Language",
    searchPlaceholder: "Search destinations, allergies, or hotels...",
    allDestinations: "All Destinations",
    filterBy: "Filter by",
    seoDescription: "Discover allergy-friendly travel destinations worldwide. Find accommodations and dining options for travelers with food allergies.",
    seoKeywords: "allergy-friendly destinations, food allergy travel, gluten-free hotels, dairy-free accommodations, nut-free travel"
  },
  fr: {
    title: "Trouvez Votre Destination Parfaite",
    subtitle: "Recherchez des destinations et hébergements adaptés aux allergies dans le monde entier",
    home: "Accueil",
    languageSelector: "Langue",
    searchPlaceholder: "Rechercher destinations, allergies, ou hôtels...",
    allDestinations: "Toutes les Destinations",
    filterBy: "Filtrer par",
    seoDescription: "Découvrez des destinations de voyage adaptées aux allergies dans le monde entier. Trouvez des hébergements et options de restauration pour les voyageurs souffrant d'allergies alimentaires.",
    seoKeywords: "destinations adaptées aux allergies, voyage avec allergies alimentaires, hôtels sans gluten, hébergements sans produits laitiers, voyage sans noix"
  },
  es: {
    title: "Encuentra Tu Destino Perfecto",
    subtitle: "Busca destinos y alojamientos aptos para alérgicos en todo el mundo",
    home: "Inicio",
    languageSelector: "Idioma",
    searchPlaceholder: "Buscar destinos, alergias, u hoteles...",
    allDestinations: "Todos los Destinos",
    filterBy: "Filtrar por",
    seoDescription: "Descubre destinos de viaje aptos para alérgicos en todo el mundo. Encuentra alojamientos y opciones gastronómicas para viajeros con alergias alimentarias.",
    seoKeywords: "destinos aptos para alérgicos, viaje con alergias alimentarias, hoteles sin gluten, alojamientos sin lactosa, viaje sin frutos secos"
  },
  de: {
    title: "Finden Sie Ihr Perfektes Reiseziel",
    subtitle: "Suchen Sie nach allergikerfreundlichen Reisezielen und Unterkünften weltweit",
    home: "Startseite",
    languageSelector: "Sprache",
    searchPlaceholder: "Reiseziele, Allergien oder Hotels suchen...",
    allDestinations: "Alle Reiseziele",
    filterBy: "Filtern nach",
    seoDescription: "Entdecken Sie allergikerfreundliche Reiseziele weltweit. Finden Sie Unterkünfte und Speisemöglichkeiten für Reisende mit Nahrungsmittelallergien.",
    seoKeywords: "allergikerfreundliche Reiseziele, Reisen mit Nahrungsmittelallergien, glutenfreie Hotels, milchfreie Unterkünfte, nussfreies Reisen"
  },
  he: {
    title: "מצא את היעד המושלם שלך",
    subtitle: "חפש יעדים ומקומות לינה המתאימים לאלרגיות ברחבי העולם",
    home: "דף הבית",
    languageSelector: "שפה",
    searchPlaceholder: "חפש יעדים, אלרגיות, או בתי מלון...",
    allDestinations: "כל היעדים",
    filterBy: "סנן לפי",
    seoDescription: "גלה יעדי נסיעות ידידותיים לאלרגיה ברחבי העולם. מצא מקומות לינה ואפשרויות אוכל למטיילים עם אלרגיות למזון.",
    seoKeywords: "יעדים ידידותיים לאלרגיה, טיול עם אלרגיות מזון, בתי מלון ללא גלוטן, מקומות לינה ללא חלב, טיול ללא אגוזים"
  }
};

// Translate destination articles based on language
export const getTranslatedDestinationArticles = (language: string) => {
  const baseDestinations = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=80",
      href: "/destinations/paris",
      tags: ["Gluten-Free", "Dairy-Free", "Nut-Free"]
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=2000&q=80",
      href: "/destinations/london",
      tags: ["Gluten-Free", "Vegan"]
    },
    {
      id: 3,
      image: "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png",
      href: "/destinations/cyprus",
      tags: ["Dairy-Free", "Gluten-Free"]
    },
    {
      id: 4,
      image: "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png",
      href: "/destinations/crete",
      tags: ["Gluten-Free", "Mediterranean"]
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=2000&q=80",
      href: "/destinations/abu-dhabi",
      tags: ["Luxury", "Family-Friendly", "Allergy-Safe"]
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80",
      href: "/destinations/barcelona",
      tags: ["Gluten-Free", "Shellfish-Free"]
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=2000&q=80",
      href: "/destinations/thailand",
      tags: ["Gluten-Free", "Peanut-Free", "Seafood-Free"]
    }
  ];

  const titles = {
    en: [
      "Paris Guide",
      "London Guide",
      "Cyprus Guide",
      "Crete Guide",
      "Abu Dhabi Guide",
      "Barcelona Guide",
      "Thailand Guide"
    ],
    fr: [
      "Guide de Paris",
      "Guide de Londres",
      "Guide de Chypre",
      "Guide de Crète",
      "Guide d'Abu Dhabi",
      "Guide de Barcelone",
      "Guide de Thaïlande"
    ],
    es: [
      "Guía de París",
      "Guía de Londres",
      "Guía de Chipre",
      "Guía de Creta",
      "Guía de Abu Dhabi",
      "Guía de Barcelona",
      "Guía de Tailandia"
    ],
    de: [
      "Paris Reiseführer",
      "London Reiseführer",
      "Zypern Reiseführer",
      "Kreta Reiseführer",
      "Abu Dhabi Reiseführer",
      "Barcelona Reiseführer",
      "Thailand Reiseführer"
    ],
    he: [
      "מדריך פריז",
      "מדריך לונדון",
      "מדריך קפריסין",
      "מדריך כרתים",
      "מדריך אבו דאבי",
      "מדריך ברצלונה",
      "מדריך תאילנד"
    ]
  };

  const descriptions = {
    en: [
      "A Comprehensive Guide to Allergy-Friendly Hotels and Dining in the City of Light",
      "Explore allergy-friendly accommodations in the heart of England",
      "Find the best allergy-friendly hotels and dining options across the island",
      "Experience Greek hospitality with peace of mind",
      "Luxury stays with world-class allergy accommodations in the UAE capital",
      "Allergy-friendly tapas and Mediterranean delights in the Catalan capital",
      "The ultimate guide to allergy-friendly hotels and dining across Thailand"
    ],
    fr: [
      "Un guide complet des hôtels et restaurants adaptés aux allergies dans la Ville Lumière",
      "Explorez des hébergements adaptés aux allergies au cœur de l'Angleterre",
      "Trouvez les meilleurs hôtels et options de restauration adaptés aux allergies sur l'île",
      "Profitez de l'hospitalité grecque en toute tranquillité",
      "Séjours de luxe avec des aménagements de classe mondiale pour les allergies dans la capitale des Émirats arabes unis",
      "Tapas adaptées aux allergies et délices méditerranéens dans la capitale catalane",
      "Le guide ultime des hôtels et restaurants adaptés aux allergies en Thaïlande"
    ],
    es: [
      "Una guía completa de hoteles y restaurantes aptos para alérgicos en la Ciudad de la Luz",
      "Explora alojamientos aptos para alérgicos en el corazón de Inglaterra",
      "Encuentra los mejores hoteles y opciones gastronómicas aptas para alérgicos en toda la isla",
      "Disfruta de la hospitalidad griega con tranquilidad",
      "Estancias de lujo con adaptaciones para alergias de clase mundial en la capital de los EAU",
      "Tapas aptas para alérgicos y delicias mediterráneas en la capital catalana",
      "La guía definitiva de hoteles y restaurantes aptos para alérgicos en Tailandia"
    ],
    de: [
      "Ein umfassender Führer zu allergikerfreundlichen Hotels und Restaurants in der Stadt des Lichts",
      "Entdecken Sie allergikerfreundliche Unterkünfte im Herzen Englands",
      "Finden Sie die besten allergikerfreundlichen Hotels und Restaurants auf der Insel",
      "Erleben Sie griechische Gastfreundschaft mit einem ruhigen Gewissen",
      "Luxuriöse Aufenthalte mit erstklassigen Allergieunterkünften in der Hauptstadt der VAE",
      "Allergikerfreundliche Tapas und mediterrane Köstlichkeiten in der katalanischen Hauptstadt",
      "Der ultimative Führer zu allergikerfreundlichen Hotels und Restaurants in Thailand"
    ],
    he: [
      "מדריך מקיף למלונות ומסעדות ידידותיים לאלרגיה בעיר האורות",
      "גלה מקומות לינה ידידותיים לאלרגיה בלב אנגליה",
      "מצא את המלונות והמסעדות הטובים ביותר המתאימים לאלרגיה ברחבי האי",
      "חווה את האירוח היווני בשקט נפשי",
      "שהייה יוקרתית עם התאמות אלרגיה ברמה עולמית בבירת איחוד האמירויות",
      "טאפאס ידידותיים לאלרגיה ומטעמים ים-תיכוניים בבירה הקטלונית",
      "המדריך המושלם למלונות ומסעדות ידידותיים לאלרגיה ברחבי תאילנד"
    ]
  };

  const translatedTags = {
    en: {
      "Gluten-Free": "Gluten-Free",
      "Dairy-Free": "Dairy-Free",
      "Nut-Free": "Nut-Free",
      "Vegan": "Vegan",
      "Mediterranean": "Mediterranean",
      "Luxury": "Luxury",
      "Family-Friendly": "Family-Friendly",
      "Allergy-Safe": "Allergy-Safe",
      "Shellfish-Free": "Shellfish-Free",
      "Peanut-Free": "Peanut-Free",
      "Seafood-Free": "Seafood-Free"
    },
    fr: {
      "Gluten-Free": "Sans Gluten",
      "Dairy-Free": "Sans Lactose",
      "Nut-Free": "Sans Noix",
      "Vegan": "Végétalien",
      "Mediterranean": "Méditerranéen",
      "Luxury": "Luxe",
      "Family-Friendly": "Familial",
      "Allergy-Safe": "Sûr pour Allergies",
      "Shellfish-Free": "Sans Fruits de Mer",
      "Peanut-Free": "Sans Arachides",
      "Seafood-Free": "Sans Fruits de Mer"
    },
    es: {
      "Gluten-Free": "Sin Gluten",
      "Dairy-Free": "Sin Lácteos",
      "Nut-Free": "Sin Frutos Secos",
      "Vegan": "Vegano",
      "Mediterranean": "Mediterráneo",
      "Luxury": "Lujo",
      "Family-Friendly": "Familiar",
      "Allergy-Safe": "Seguro para Alérgicos",
      "Shellfish-Free": "Sin Mariscos",
      "Peanut-Free": "Sin Cacahuetes",
      "Seafood-Free": "Sin Mariscos"
    },
    de: {
      "Gluten-Free": "Glutenfrei",
      "Dairy-Free": "Milchfrei",
      "Nut-Free": "Nussfrei",
      "Vegan": "Vegan",
      "Mediterranean": "Mediterran",
      "Luxury": "Luxus",
      "Family-Friendly": "Familienfreundlich",
      "Allergy-Safe": "Allergiesicher",
      "Shellfish-Free": "Schalentierfrei",
      "Peanut-Free": "Erdnussfrei",
      "Seafood-Free": "Meeresfruchtfrei"
    },
    he: {
      "Gluten-Free": "ללא גלוטן",
      "Dairy-Free": "ללא חלב",
      "Nut-Free": "ללא אגוזים",
      "Vegan": "טבעוני",
      "Mediterranean": "ים תיכוני",
      "Luxury": "יוקרה",
      "Family-Friendly": "ידידותי למשפחות",
      "Allergy-Safe": "בטוח לאלרגיות",
      "Shellfish-Free": "ללא פירות ים",
      "Peanut-Free": "ללא בוטנים",
      "Seafood-Free": "ללא פירות ים"
    }
  };

  // Create translated destination articles
  return baseDestinations.map((destination, index) => {
    const translatedTitle = titles[language] ? titles[language][index] : titles.en[index];
    const translatedDescription = descriptions[language] ? descriptions[language][index] : descriptions.en[index];
    const translatedTagList = destination.tags.map(tag => 
      translatedTags[language] && translatedTags[language][tag] 
        ? translatedTags[language][tag] 
        : tag
    );

    return {
      ...destination,
      title: translatedTitle,
      description: translatedDescription,
      tags: translatedTagList
    };
  });
};
