import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import { LanguageCode, destinations, DestinationId } from "@/types/reviews";

interface DestinationPageProps {
  destinationId: DestinationId;
}

const destinationData = {
  london: {
    hotels: [
      {
        name: "1. The Cavendish London – Exceptional Allergy-Aware Service",
        address: "81 Jermyn Street, Mayfair, London SW1Y 6JF",
        features: ["⭐ 4-star hotel", "🍽️ Allergy-conscious menus", "🏰 Prime Mayfair location"],
        description: "Located in prestigious Mayfair, The Cavendish London offers exceptional service for allergy-conscious guests with specially trained staff and customized dining options.",
        quote: "I was impressed with the staff's attention to my dietary needs. Highly recommended!",
        bookingUrl: "https://www.booking.com/hotel/gb/cavendish-london.he.html?aid=304142&label=gen173nr-1FCAsoUEIQY2F2ZW5kaXNoLWxvbmRvbkgzWARoaogBAZgBDrgBF8gBDNgBAegBAfgBDIgCAagCA7gC5arhvQbAAgHSAiRmZmQyYzE4MC03YWM5LTQ5MDItODQzNy0yOTBkMmIyZDg1OGXYAgbgAgE&checkin=2025-08-20&checkout=2025-08-26&dist=0&group_adults=2&group_children=0&no_rooms=1&room1=A%2CA&sb_price_type=total&type=total&utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=london-hotels&utm_term=mayfair&utm_content=cavendish"
      },
      {
        name: "2. The Langham, London – Luxury Allergy-Safe Haven",
        address: "1C Portland Place, Marylebone, London W1B 1JA",
        features: ["⭐ 5-star luxury", "🛏️ Allergy-free bedding", "🍽️ Gluten-free dining"],
        description: "A pioneer in luxury hospitality, The Langham offers comprehensive allergy-friendly services including specialized bedding and a dedicated gluten-free kitchen.",
        quote: "They ensured a 100% gluten-free dining experience. Fantastic service!",
        bookingUrl: "https://www.booking.com/hotel/gb/the-langham-london.he.html?aid=304142&label=gen173nr-1FCAsoUEIQdGhlLWxhbmdoYW0tbG9uZG9uSFgEaGqIAQGYAQ64ARfIAQzYAQHoAQH4AQyIAgGoAgO4AuXq4b0GwAIB0gIkZmZkMmMxODAtN2FjOS00OTAyLTg0MzctMjkwZDJiMmQ4NThh2AIE4AIA&checkin=2025-08-20&checkout=2025-08-26&dist=0&group_adults=2&group_children=0&no_rooms=1&room1=A%2CA&sb_price_type=total&type=total&utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=london-hotels&utm_term=luxury&utm_content=langham"
      },
      {
        name: "3. Hyatt Regency London – The Churchill",
        address: "30 Portman Square, Marylebone, London W1H 7BH",
        features: ["⭐ 4-star hotel", "🍽️ Tailored meal plans", "🏰 Central location"],
        description: "The Hyatt Regency Churchill takes pride in its comprehensive allergy management program, offering personalized meal plans and allergy-friendly rooms.",
        quote: "The staff handled my nut allergy with great care. A safe and enjoyable stay!",
        bookingUrl: "https://www.booking.com/hotel/gb/hyatt-regency-london-the-churchill.he.html?aid=304142&label=gen173nr-1FCAsoUEIeaHlhdHQtcmVnZW5jeS1sb25kb24tY2h1cmNoaWxsSDNYBGhqiAEBmAEOuAEXyAEM2AEB6AEB-AEDiAIBqAIDuAKM5eG9BsACAdICJDM1YmUyNTJiLTk3ZGMtNDY5Zi05Y2JmLWIwMjRhOWQxZGNkOdgCBeACAQ&checkin=2025-08-20&checkout=2025-08-26&dist=0&group_adults=2&group_children=0&no_rooms=1&room1=A%2CA&sb_price_type=total&type=total&utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=london-hotels&utm_term=central&utm_content=hyatt-churchill"
      },
      {
        name: "4. St. Pancras Renaissance Hotel London",
        address: "Euston Road, Kings Cross, London NW1 2AR",
        features: ["⭐ 5-star hotel", "🛏️ Hypoallergenic bedding", "🚉 Connected to St Pancras"],
        description: "This historic hotel combines Victorian grandeur with modern allergy-awareness, featuring hypoallergenic rooms and comprehensive allergen-free dining options.",
        quote: "They took my dairy allergy seriously and provided amazing meal options!",
        bookingUrl: "https://www.booking.com/hotel/gb/renaissance-st-pancras.he.html?aid=304142&label=gen173nr-1FCAsoUEIWcmVuYWlzc2FuY2Utc3QtcGFuY3Jhc0gzWARoaogBAZgBDrgBF8gBDNgBAegBAfgBDIgCAagCA7gC5erhvQbAAgHSAiRmZmQyYzE4MC03YWM5LTQ5MDItODQzNy0yOTBkMmIyZDg1OGXYAgbgAgE&checkin=2025-08-20&checkout=2025-08-26&dist=0&group_adults=2&group_children=0&no_rooms=1&room1=A%2CA&sb_price_type=total&type=total&utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=london-hotels&utm_term=kings-cross&utm_content=st-pancras"
      },
      {
        name: "5. Radisson Blu Edwardian Mercer Street",
        address: "20 Mercer Street, Covent Garden, London WC2H 9HD",
        features: ["⭐ 4-star hotel", "🍳 Allergen-free breakfast", "🎭 Covent Garden location"],
        description: "Located in vibrant Covent Garden, this hotel excels in allergy-friendly hospitality with trained culinary staff and comprehensive allergen information.",
        quote: "Staff were extremely knowledgeable about food allergies. I felt completely safe!",
        bookingUrl: "https://www.booking.com/hotel/gb/radisson-edwardian-mercer-street.he.html?aid=304142&label=gen173nr-1FCAsoUEIgcmFkaXNzb24tZWR3YXJkaWFuLW1lcmNlci1zdHJlZXRIM1gEaGqIAQGYAQ64ARfIAQzYAQHoAQH4AQyIAgGoAgO4AuXq4b0GwAIB0gIkZmZkMmMxODAtN2FjOS00OTAyLTg0MzctMjkwZDJiMmQ4NThh2AIE4AIA&checkin=2025-08-20&checkout=2025-08-26&dist=0&group_adults=2&group_children=0&no_rooms=1&room1=A%2CA&sb_price_type=total&type=total&utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=london-hotels&utm_term=covent-garden&utm_content=radisson-mercer"
      }
    ],
    languageTable: {
      headers: ["Common Phrase", "When to Use", "Staff Response"],
      rows: [
        {
          original: "I have severe allergies to [specify allergen]",
          translation: "When checking in or dining",
          pronunciation: "Staff will note your allergies and inform all departments"
        },
        {
          original: "Is this meal prepared in a separate area?",
          translation: "When ordering at restaurants",
          pronunciation: "Kitchen can confirm preparation methods"
        },
        {
          original: "Do you have an ingredient list available?",
          translation: "Before ordering any food",
          pronunciation: "All venues must provide allergen information by law"
        }
      ]
    },
    intro: "Finding the right hotel as a food-sensitive traveler can be stressful. London offers excellent allergy-friendly hotels with hypoallergenic rooms, dedicated dining options, and well-trained staff to ensure a safe stay. Here's our curated selection of London's most accommodating hotels for allergy sufferers."
  },
  paris: {
    hotels: [
      {
        name: "1. Le Meurice – Luxury & Personalized Allergy-Friendly Service",
        address: "1 Rue de Rivoli, 75001 Paris, France",
        features: ["⭐ 5-star hotel", "🏛️ Central location near the Louvre", "🍽️ Allergy-aware fine dining"],
        description: "Le Meurice is one of Paris's most iconic luxury hotels, offering personalized allergy-friendly service. The in-house Michelin-starred restaurant, led by chef Alain Ducasse, accommodates special dietary needs with great attention to detail.",
        quote: "Le Meurice is by far the nicest hotel I've ever stayed at—the fanciest and kindest staff! Absolutely recommend to anyone staying in Paris. The staff goes above and beyond!",
        bookingUrl: encodeURI("https://www.booking.com/hotel/fr/le-meurice.html?utm_source=allergy-friendly-hotels&utm_medium=referral&utm_campaign=paris-hotels&utm_term=luxury&utm_content=le-meurice")
      },
      {
        name: "2. Hotel Novotel Paris les Halles – Central Location & Allergy-Sensitive Dining",
        address: "8 Place Marguerite de Navarre, 75001 Paris, France",
        features: ["⭐ 4-star hotel", "🚇 Near Châtelet-Les Halles station", "🏙️ Walkable to Louvre & Notre-Dame"],
        quote: "Staff was very helpful in making inquiries at local restaurants regarding food allergy management. It was reassuring to know they understood my dietary restrictions!",
        bookingUrl: encodeURI("https://www.booking.com/hotel/fr/novotel-paris-les-halles.html?aid=2165599&label=allergy-friendly")
      },
      {
        name: "3. Hôtel Edouard 7 – Boutique Hotel with Personalized Allergy Support",
        address: "39 Avenue de l'Opéra, 75002 Paris, France",
        features: ["⭐ 4-star hotel", "🎭 Near Opéra Garnier", "🏛️ Short walk to Place Vendôme"],
        quote: "They went above and beyond—even bought a large mini refrigerator for our room and went to the market for us, texting me photos of labels and using only those safe foods to cook for us!",
        bookingUrl: encodeURI("https://www.booking.com/hotel/fr/edouard-7-paris-opera.html?aid=2165599&label=allergy-friendly")
      },
      {
        name: "4. Le Bristol Paris – A Five-Star Experience for Allergy-Conscious Travelers",
        address: "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
        features: ["⭐ 5-star hotel", "💎 Luxury shopping district", "🏊 Rooftop pool & Michelin-star dining"],
        description: "Le Bristol Paris is one of the finest hotels in Paris, with hypoallergenic rooms and an award-winning restaurant, Epicure, that accommodates all dietary needs.",
        bookingUrl: encodeURI("https://www.booking.com/hotel/fr/le-bristol-paris.html?aid=2165599&label=allergy-friendly")
      },
      {
        name: "5. Hotel Malte Astotel – Budget-Friendly & Allergy-Safe Comfort",
        address: "63 Rue de Richelieu, 75002 Paris, France",
        features: ["⭐ 4-star hotel", "🏙️ Close to the Louvre", "🍽️ Allergy-friendly breakfast"],
        quote: "I can't thank the staff at Hotel Malte enough for their sensitivity towards my allergies. They made sure my breakfast was completely safe for me, and I felt much more comfortable knowing they understood my needs.",
        bookingUrl: encodeURI("https://www.booking.com/hotel/fr/malte-opera-astotel.html?aid=2165599&label=allergy-friendly")
      }
    ],
    languageTable: {
      headers: ["English", "French", "Pronunciation"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "J'ai une allergie alimentaire",
          pronunciation: "Zhay oon ah-lehr-zhee ah-lee-mahn-tehr"
        },
        {
          original: "Is this dish gluten-free?",
          translation: "Est-ce que ce plat est sans gluten?",
          pronunciation: "Ess-kuh suh plah ay sahn gloo-tahn?"
        },
        {
          original: "Does this contain nuts?",
          translation: "Est-ce que ça contient des noix?",
          pronunciation: "Ess-kuh sah kohn-tyahn day nwah?"
        }
      ]
    },
    intro: "Paris is a dream destination, but for travelers with food allergies, choosing the right hotel is essential for a safe and stress-free stay. Below is a list of the best allergy-friendly hotels in Paris, featuring real guest reviews, detailed information, and direct booking links to ensure your comfort."
  }
};

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId as keyof typeof destinationData];

  useEffect(() => {
    if (destination) {
      document.title = `Allergy-Friendly Hotels in ${destination.name} | Safe Travel Guide`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Find the best allergy-friendly hotels in ${destination.name}. Comprehensive guide with reviews, safe dining options, and essential tips for travelers with food allergies.`
        );
      }

      const schema = {
        "@context": "https://schema.org",
        "@type": "TravelGuide",
        "name": `Allergy-Friendly Hotels Guide - ${destination.name}`,
        "description": `Complete guide to allergy-friendly accommodations in ${destination.name}, including luxury and budget-friendly options.`,
        "about": {
          "@type": "TouristDestination",
          "name": destination.name,
          "description": destination.description
        }
      };

      const scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.text = JSON.stringify(schema);
      document.head.appendChild(scriptTag);

      return () => {
        document.head.removeChild(scriptTag);
      };
    }
  }, [destination]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-4 py-8 max-w-4xl -mt-20 relative z-10">
        <DestinationNavigation 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />

        <article className="space-y-12">
          <header className="text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              {content.intro}
            </p>
          </header>

          <section aria-label="Hotels List" className="space-y-6">
            {content.hotels.map((hotel, index) => (
              <HotelCard key={index} {...hotel} />
            ))}
          </section>

          <TravelTips />

          <LanguageTable 
            headers={content.languageTable.headers}
            rows={content.languageTable.rows}
            destinationName={destination.name}
          />
        </article>
      </main>
    </div>
  );
};
