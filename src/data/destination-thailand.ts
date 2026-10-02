
import { DestinationContent } from '@/types/definitions';

export const thailandContent: DestinationContent = {
  intro: "Thailand's luxury resorts and boutique hotels are increasingly accommodating dietary restrictions with specialized training and dedicated menus.",
  hotels: [
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
