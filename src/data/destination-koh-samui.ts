
import { DestinationContent } from '@/types/definitions';

export const kohSamuiContent: DestinationContent = {
  intro: "Discover why Four Seasons Resort Koh Samui, filming location of The White Lotus Season 3, is ideal for guests with food allergies – including gluten-free, nut-free, and dairy-free travelers.",
  hotels: [
    {
      name: "Four Seasons Resort Koh Samui",
      address: "219 Moo 5, Angthong, Koh Samui, Surat Thani 84140, Thailand",
      features: [
        "Dedicated allergen-free food preparation",
        "Pre-arrival dietary consultations",
        "Custom meals for allergies",
        "Private chef services available",
        "Clearly labeled menus",
        "Trained staff for allergy protocols"
      ],
      description: "Luxury resort offering exceptional allergy-friendly dining options and stunning ocean views. Famous as the filming location for White Lotus Season 3.",
      quote: "My daughter has severe nut and dairy allergies. The staff reviewed every meal in advance, and we felt completely safe throughout our stay.",
      bookingUrl: "https://www.fourseasons.com/kohsamui/"
    }
  ],
  faqs: [
    {
      question: "Is Four Seasons Koh Samui safe for celiac guests?",
      answer: "Yes, the resort has dedicated gluten-free food preparation areas and offers fresh gluten-free breads and pastries daily."
    },
    {
      question: "What allergens can they accommodate?",
      answer: "The resort can accommodate various allergies including gluten, dairy, nuts, eggs, soy, and shellfish. They offer pre-arrival consultations to discuss specific needs."
    },
    {
      question: "When is the best time to visit Koh Samui?",
      answer: "The best time to visit is from January to May when the weather is dry and sunny with lower humidity."
    }
  ],
  languageTable: {
    headers: ["English", "Thai"],
    rows: [
      ["I have food allergies", "ฉันแพ้อาหาร"],
      ["No nuts please", "ไม่ใส่ถั่วนะคะ/ครับ"],
      ["Gluten-free", "ปราศจากกลูเตน"],
      ["Is this safe for allergies?", "อาหารนี้ปลอดภัยสำหรับคนแพ้อาหารไหม"]
    ]
  }
};
