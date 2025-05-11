
import { DestinationContent } from '@/types/definitions';

export const londonContent: DestinationContent = {
  intro: "London offers many allergy-friendly hotels and restaurants, making it a welcoming destination for travelers with dietary restrictions. From luxury accommodations to budget-friendly options, you'll find establishments that take food allergies seriously and provide safe dining experiences throughout your stay in this vibrant capital city.",
  hotels: [
    {
      name: "The Langham London ★★★★★",
      address: "1C Portland Place, London",
      features: [
        "Allergy-trained kitchen staff",
        "Gluten-free afternoon tea",
        "Dairy-free options available",
        "Personalized menu preparation"
      ],
      description: "This luxury hotel in Marylebone offers exceptional allergy-awareness programs and custom menus for guests with dietary restrictions.",
      quote: "The kitchen prepared a full gluten-free afternoon tea that was indistinguishable from the regular version.",
      bookingUrl: "https://www.langhamhotels.com/en/the-langham/london/"
    },
    {
      name: "Hilton London Bankside ★★★★",
      address: "2-8 Great Suffolk Street, London",
      features: [
        "Dedicated vegan suite",
        "Allergy-friendly breakfast options",
        "Gluten-free menu items",
        "Cross-contamination protocols"
      ],
      description: "Known for its vegan suite and strong allergen protocols, this hotel takes dietary restrictions seriously.",
      quote: "Staff were knowledgeable about my nut allergy and ensured all my meals were prepared safely.",
      bookingUrl: "https://www.hilton.com/en/hotels/lonsbhi-hilton-london-bankside/"
    },
    {
      name: "Claridge's ★★★★★",
      address: "Brook Street, Mayfair, London",
      features: [
        "Gluten-free bread and pastries",
        "Allergy-specific menu options",
        "Kitchen accommodates multiple restrictions",
        "Staff trained in allergen handling"
      ],
      description: "This iconic luxury hotel offers exceptional service for guests with dietary restrictions, with detailed allergen information available.",
      quote: "They took my celiac disease seriously and provided safe, delicious gluten-free alternatives.",
      bookingUrl: "https://www.claridges.co.uk/"
    }
  ],
  faqs: [
    {
      question: "Are London hotels good at handling food allergies?",
      answer: "Many London hotels, particularly high-end establishments, excel at handling dietary restrictions. Hotels like The Langham, Claridge's, and the Hilton London Bankside have specific protocols for guests with allergies. Always notify the hotel of your dietary needs when booking."
    },
    {
      question: "What should I pack for a trip to London if I have food allergies?",
      answer: "Always bring your emergency medication (like epinephrine auto-injectors if prescribed), allergy translation cards, and research allergy-friendly restaurants near your hotel. London has excellent medical facilities, but being prepared is essential."
    },
    {
      question: "Is it easy to find gluten-free food in London?",
      answer: "Yes, London is very accommodating for those following a gluten-free diet, whether for celiac disease or preference. Many restaurants and cafes offer gluten-free options, and there are several dedicated gluten-free establishments across the city."
    }
  ],
  languageTable: {
    headers: ["English", "Alternative Phrases"],
    rows: [
      ["I have a food allergy", "I have a serious allergy to..."],
      ["Is this food safe for me?", "Can you confirm this doesn't contain...?"],
      ["I cannot eat gluten", "I have celiac disease / I need gluten-free food"],
      ["Does this contain dairy?", "Is there milk, butter or cheese in this?"],
      ["I am allergic to nuts", "I cannot have any type of nuts or nut oils"]
    ]
  }
};
