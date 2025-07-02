
import { DestinationContent, Hotel, FAQ, TravelTip } from '@/types/definitions';

const eilatHotels: Hotel[] = [
  {
    id: 'u-coral-beach',
    name: 'U Coral Beach Hotel by Fattal',
    location: 'Eilat, Israel',
    stars: 4,
    address: 'Coral Beach, Eilat, Israel',
    description: 'A family-friendly resort offering a unique allergy-friendly experience with dedicated staff who provide personalized care for guests with food allergies.',
    allergenFriendly: ['gluten', 'dairy', 'eggs', 'sesame', 'nuts'],
    amenities: ['pool', 'restaurant', 'bar', 'fitness center', 'spa', 'kids club', 'free wifi'],
    features: ['Dedicated Allergy Liaison', 'Pre-arrival communication', 'Separate utensils for allergen-free cooking', 'Custom meal preparation', 'Emergency preparedness'],
    rating: 4.7,
    priceRange: '$$',
    imageUrl: '/lovable-uploads/a25821a5-c6f9-44ab-96b8-648e020350b3.png', // Updated to use the specific Eilat hotel image
    websiteUrl: 'https://www.leonardo-hotels.com/eilat/u-coral-beach-club-eilat-ultra-all-inclusive',
    bookingUrl: 'https://www.leonardo-hotels.com/eilat/u-coral-beach-club-eilat-ultra-all-inclusive',
    guestReview: "My child ate in a hotel restaurant without fear. I've never seen him so calm. For the first time in years, I slept well at a hotel. Someone was thinking about us.",
    isPurelyAllergyFriendly: true
  }
];

const eilatFaqs: FAQ[] = [
  {
    question: 'How does U Coral Beach Hotel handle food allergies?',
    answer: 'The hotel has a dedicated Allergy Liaison, Penina Belhassan, who coordinates with guests before arrival to understand their specific needs. The hotel provides separate cooking utensils, custom meal preparation, and trained staff who understand food allergies and emergency response procedures.'
  },
  {
    question: 'Can I communicate my allergy needs before arrival?',
    answer: 'Yes, guests with food allergies can inform the booking center in advance or speak directly with Penina, the Allergy Liaison. Her contact information is provided at reception and in the welcome packet upon check-in.'
  },
  {
    question: 'What types of allergies can the hotel accommodate?',
    answer: 'The hotel can accommodate various allergies including dairy, eggs, sesame, nuts, and gluten. Specific ingredients can be sourced ahead of time if needed for guests with unique dietary requirements.'
  },
  {
    question: 'Is the hotel prepared for allergy emergencies?',
    answer: 'Yes, the security staff is trained in first aid, including how to respond to allergic reactions. The hotel has a clear protocol for allergy emergencies, and the Allergy Liaison is involved immediately if an incident occurs.'
  },
  {
    question: 'Can my hotel room be specially cleaned to avoid allergens?',
    answer: 'Yes, upon request, rooms are thoroughly cleaned with special instructions to housekeeping to avoid any contact with allergen residues or reactive cleaning agents.'
  }
];

const eilatIntro = `
<p>Traveling with food allergies can turn what should be a relaxing vacation into a stressful experience. At Fattal's U Coral Beach Hotel in Eilat, Israel, one dedicated staff member has made it her mission to change that reality for families dealing with food allergies.</p>

<p>Penina Belhassan, the hotel's Allergy Liaison, has developed a comprehensive approach to allergy care that goes beyond the usual accommodations. Her initiative, born from genuine empathy and on-the-ground experience, has transformed the hotel into a safe haven for allergy-affected travelers.</p>

<blockquote>"I saw parents feeling helpless – and decided to improvise less and listen more," explains Penina.</blockquote>
`;

// Define travel tips as proper TravelTip objects
const eilatTips: TravelTip[] = [
  {
    title: "Contact Allergy Liaison",
    content: "Contact the hotel's Allergy Liaison before your visit to discuss your specific allergies and needs."
  },
  {
    title: "Request Custom Room Cleaning",
    content: "Request a customized room cleaning to avoid contact with allergen residues."
  },
  {
    title: "Ask About Separate Utensils",
    content: "Ask about the separate utensils and cooking areas for allergen-free meal preparation."
  },
  {
    title: "Know Medical Facilities",
    content: "Familiarize yourself with the nearest medical facilities in Eilat in case of an emergency."
  },
  {
    title: "Pre-Arrival Communication",
    content: "Take advantage of the pre-arrival communication to ensure specific ingredients are available during your stay."
  }
];

export const eilatContent: DestinationContent = {
  hotels: eilatHotels,
  faqs: eilatFaqs,
  intro: eilatIntro,
  tips: eilatTips,
  longDescription: `
    <h2>When Hospitality Meets Responsibility</h2>
    
    <p>Penina Belhassan, the Allergy Liaison at Fattal's U Coral Beach Hotel in Eilat, isn't a doctor or a nutritionist. But for guests with food allergies, she's a trusted and beloved figure. Her initiative, born from real empathy and on-the-ground experience, has turned the hotel into a safe haven for families dealing with food allergies.</p>
    
    <blockquote>
      "I saw parents feeling helpless – and decided to improvise less and listen more."
    </blockquote>
    
    <p>When Penina began her role as Chef Coordinator at U Coral Beach, she didn't expect to become a central figure for allergy care. "At first, we just did our best—replacing chefs, making quick changes—but there was no dedicated person managing allergies," she recalls. "I realized that wasn't enough. So, I stepped up."</p>
    
    <p>Instead of relying solely on corporate guidelines, Penina joined allergy parenting groups, consulted with dietitians, and collaborated with allergy advocacy organizations. Most importantly, she listened to guests. "There's nothing like hearing directly from a mother what truly scares her—then working together on solutions."</p>
    
    <h2>Allergy-Friendly Process: From Check-In to Custom Meals</h2>
    
    <ul>
      <li>
        <strong>Pre-Arrival Communication:</strong> Guests with food allergies can inform the booking center in advance or speak with Penina directly. Her number is shared courteously at reception and in the welcome packet upon check-in.
      </li>
      <li>
        <strong>Expectation-Setting Call:</strong> Each conversation includes a review of the allergy type and severity, a list of allergens, and required accommodations. If needed, specific ingredients are sourced ahead of time.
      </li>
      <li>
        <strong>Separate Utensils:</strong> Penina keeps labeled sets of cookware and serving tools for common allergens: dairy, eggs, sesame, and more.
      </li>
      <li>
        <strong>Customized Room Cleaning:</strong> Upon request, rooms are thoroughly cleaned with special instructions to housekeeping to avoid any contact with allergen residues or reactive cleaning agents.
      </li>
    </ul>
    
    <h2>Real Stories, Real Relief: Guest Testimonials</h2>
    
    <p>Families who have stayed at the U Coral Beach Hotel in Eilat share moving stories about their experiences:</p>
    
    <ul>
      <li>"My child ate in a hotel restaurant without fear. I've never seen him so calm."</li>
      <li>"Thank you for that one short call—it changed our entire vacation."</li>
      <li>"For the first time in years, I slept well at a hotel. Someone was thinking about us."</li>
    </ul>
    
    <p><em>One guest summed it up perfectly:</em></p>
    
    <blockquote>
      "Penina didn't make a fuss or try to impress. She simply asked, planned, and delivered. It sounds basic—but in the allergy world, it's rare."
    </blockquote>
    
    <h2>Beyond the Kitchen: Emergency Preparedness</h2>
    
    <p>The hotel is fully equipped for allergy emergencies. "Our security staff is trained in first aid, including how to respond to allergic reactions. If an incident occurs, there's a clear protocol—and I'm involved immediately."</p>
    
    <h2>Conclusion: No Slogans, Just Sincerity</h2>
    
    <p>Penina doesn't see herself as a hero—just someone who cares deeply. "I can't promise we'll have everything, but I can promise we'll do our best—proactively, not reactively."</p>
    
    <p>The allergy-care model she pioneered in Eilat isn't perfect, but it provides something invaluable: a genuine sense of safety for families who usually avoid traveling.</p>
  `,
  bonusTools: [
    {
      name: "Contact Allergy Liaison",
      description: "Reach out before your visit for personalized allergy accommodation",
      link: "https://www.fattal-hotels.com/hotels-in-israel/eilat/u-coral-beach-club-eilat/contact-us/"
    },
    {
      name: "Eilat Medical Resources",
      description: "Nearby medical facilities and emergency contacts",
      link: "https://www.eilat.city/en/medical-assistance/"
    },
    {
      name: "Israel Food Allergy Cards",
      description: "Printable food allergy translation cards in Hebrew",
      link: "https://www.allergy-free-travel.com/allergy-translation-card"
    }
  ]
};
