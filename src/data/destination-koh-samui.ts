
import { DestinationContent } from '@/types/definitions';

export const kohSamuiContent: DestinationContent = {
  intro: "Dreaming of the lush tropical setting from The White Lotus Season 3? You're not alone. And if you or a family member has food allergies, you'll be thrilled to learn that the actual filming location – the Four Seasons Resort Koh Samui in Thailand – is not only luxurious, but also well-equipped to handle food allergies with exceptional care.",
  hotels: [
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
    },
    {
      question: "Are there good medical facilities nearby for allergy emergencies?",
      answer: "Yes, Bangkok Hospital Samui is a JCI-accredited facility with 24/7 emergency services and English-speaking doctors experienced in treating severe allergic reactions."
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
