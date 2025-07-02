
import { DestinationContent } from '@/types/definitions';

export const airlinesContent: Partial<DestinationContent> = {
  intro: [
    "Flying with food allergies doesn't have to be stressful. Discover which airlines around the world take allergies seriously and read what real travelers with food allergies are saying."
  ],
  
  longDescription: `
    <div class="space-y-6">
      <h2 class="text-2xl font-bold text-blue-800 mb-4">🌍 Top 5 Allergy-Friendly Airlines in the World</h2>
      
      <div class="bg-white p-5 my-5 border-l-4 border-blue-600 rounded shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800 mb-2">🥇 <a href="https://www.jetblue.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">JetBlue Airways</a></h3>
        <p class="mb-3"><strong>Why it ranks #1:</strong> Peanut-free policy, buffer zones, pre-boarding for cleaning, and EpiPens on board.</p>
        <blockquote class="italic border-l-2 border-blue-300 pl-4 text-gray-700">
          "JetBlue is my go-to! They let me board early to clean the area, they don't serve nuts, and the staff is always informed." – @AllergyTravelr on <a href="https://www.spokin.com/top-rated-allergy-friendly-airlines?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Spokin</a>
        </blockquote>
      </div>

      <div class="bg-white p-5 my-5 border-l-4 border-blue-600 rounded shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800 mb-2">🥈 <a href="https://www.southwest.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Southwest Airlines</a></h3>
        <p>Supports pre-boarding, onboard announcements, and offers nut-free snacks.</p>
      </div>

      <div class="bg-white p-5 my-5 border-l-4 border-blue-600 rounded shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800 mb-2">🥉 <a href="https://www.delta.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Delta Air Lines</a></h3>
        <p>Notify 48 hours ahead and Delta won't serve peanut products. Allows seat cleaning pre-board.</p>
      </div>

      <div class="bg-white p-5 my-5 border-l-4 border-blue-600 rounded shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800 mb-2">⭐ <a href="https://www.alaskaair.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Alaska Airlines</a></h3>
        <p>Offers allergy-zone seating, pre-boarding for cleaning, and has epinephrine on board.</p>
      </div>

      <div class="bg-white p-5 my-5 border-l-4 border-blue-600 rounded shadow-sm">
        <h3 class="text-xl font-semibold text-blue-800 mb-2">🌟 <a href="https://www.britishairways.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">British Airways</a></h3>
        <p>Offers allergen-free meals with advance notice and makes allergy announcements.</p>
      </div>

      <h2 class="text-2xl font-bold text-blue-800 mb-4 mt-8">✈️ Other Notable Mentions</h2>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li><a href="https://www.singaporeair.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Singapore Airlines</a> – No peanut snacks, allergy-safe meals on request.</li>
        <li><a href="https://www.qantas.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Qantas Airways</a> – Nut-free snacks and trained crew support.</li>
        <li><a href="https://www.virginatlantic.com/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">Virgin Atlantic</a> – Offers special meals and makes announcements.</li>
      </ul>

      <h2 class="text-2xl font-bold text-red-600 mb-4">⚠️ Airlines to Be Cautious With</h2>
      <p class="mb-4">According to <a href="https://www.foodallergy.org/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">FARE</a> and frequent flyers, these airlines offer limited allergy support:</p>
      <ul class="list-disc list-inside space-y-2 text-red-700 mb-6">
        <li>United Airlines</li>
        <li>American Airlines</li>
        <li>Spirit Airlines</li>
        <li>Frontier Airlines</li>
        <li>Allegiant Air</li>
        <li>Emirates</li>
        <li>Qatar Airways – See <a href="https://nypost.com/2025/05/09/lifestyle/teacher-with-deadly-allergy-claims-13k-honeymoon-flight-could-kill-her-this-is-life-or-death-for-me/?utm_source=AllergyFriendlyHotelFinder&utm_medium=chatbot&utm_campaign=airline_recommendation" target="_blank" class="text-blue-600 hover:underline">this story</a>.</li>
      </ul>

      <h2 class="text-2xl font-bold text-blue-800 mb-4">🧳 Tips for Safe Flying with Food Allergies</h2>
      <ul class="list-disc list-inside space-y-2 mb-6">
        <li>Contact the airline 48–72 hours in advance.</li>
        <li>Bring your own food and EpiPens.</li>
        <li>Wipe down seats and tray tables.</li>
        <li>Request pre-boarding for cleaning.</li>
      </ul>

      <h2 class="text-2xl font-bold text-blue-800 mb-4">🌐 Final Thoughts</h2>
      <p class="mb-4">JetBlue, Southwest, Delta, and Alaska Airlines are leading the way in allergy safety. Always communicate with the airline early and travel prepared.</p>
    </div>
  `,

  tips: [
    {
      title: "Contact Airline in Advance",
      content: "Call the airline 48–72 hours before your flight to inform them about your food allergies and special requirements."
    },
    {
      title: "Bring Your Own Food",
      content: "Pack safe snacks and meals in your carry-on bag. Airlines may not always have suitable options available."
    },
    {
      title: "Carry Emergency Medication",
      content: "Always travel with your EpiPens and antihistamines in your carry-on bag, not checked luggage."
    },
    {
      title: "Clean Your Area",
      content: "Wipe down seats, tray tables, and armrests with disinfectant wipes to remove allergen residue."
    },
    {
      title: "Request Pre-boarding",
      content: "Ask for early boarding to clean your seating area and settle in before other passengers board."
    },
    {
      title: "Inform Flight Crew",
      content: "Let the flight attendants know about your allergies when you board the plane."
    }
  ],

  faqs: [
    {
      question: "Which airline is best for peanut allergies?",
      answer: "JetBlue Airways is considered the best for peanut allergies due to their peanut-free policy, buffer zones, and comprehensive allergy support including pre-boarding for cleaning."
    },
    {
      question: "Do airlines carry EpiPens on board?",
      answer: "Some airlines like JetBlue and Alaska Airlines carry epinephrine auto-injectors on board, but you should always bring your own prescribed EpiPens as backup."
    },
    {
      question: "Can I bring my own food on the plane?",
      answer: "Yes, you can bring your own food in carry-on luggage. This is highly recommended for travelers with food allergies to ensure safe meal options."
    },
    {
      question: "How far in advance should I notify the airline?",
      answer: "Contact the airline 48-72 hours before your flight to inform them about your food allergies and request any special accommodations."
    },
    {
      question: "What if other passengers are eating nuts near me?",
      answer: "Airlines like JetBlue, Southwest, and Delta can create buffer zones or make announcements to request passengers avoid eating nuts near you."
    },
    {
      question: "Are international airlines allergy-friendly?",
      answer: "Some international airlines like British Airways, Singapore Airlines, and Qantas have good allergy policies, but American carriers generally offer better support for food allergies."
    }
  ]
};
