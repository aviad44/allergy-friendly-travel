import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import { LanguageCode, destinations, DestinationId, DestinationContent } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";

interface DestinationPageProps {
  destinationId: DestinationId;
}

const destinationData: Record<DestinationId, DestinationContent> = {
  paris: {
    intro: "Discover the allergy-friendly side of Paris with our curated selection of hotels that cater to various dietary requirements and sensitivities.",
    hotels: [
      {
        name: "Le Meurice",
        address: "228 Rue de Rivoli, 75001 Paris, France",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "🛏️ Hypoallergenic rooms"],
        description: "Luxury hotel with dedicated allergy-friendly dining options and specially prepared rooms.",
        quote: "Exceptional attention to dietary requirements with personalized service.",
        bookingUrl: "https://www.booking.com/hotel/fr/meurice-paris.html"
      }
    ],
    languageTable: {
      headers: ["English", "French", "When to Use"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "J'ai une allergie alimentaire",
          pronunciation: "When checking in"
        }
      ]
    },
    faqs: []
  },
  london: {
    intro: "London offers excellent accommodations for allergy-sensitive travelers.",
    hotels: [
      {
        name: "The Langham",
        address: "1C Portland Place, London W1B 1JA",
        features: ["⭐ 5-star luxury", "🍽️ Allergen-free options"],
        description: "Historic luxury hotel with modern allergy-aware amenities.",
        quote: "Outstanding attention to dietary requirements.",
        bookingUrl: "https://www.booking.com/hotel/gb/langham-london.html"
      }
    ],
    languageTable: {
      headers: ["Phrase", "Usage", "Notes"],
      rows: []
    },
    faqs: []
  },
  crete: {
    intro: "Traveling with food allergies can be challenging, but Crete offers a variety of allergy-friendly accommodations with hypoallergenic rooms and special dietary options to ensure a worry-free stay. Whether you need a hotel with allergen-free dining, dust-mite-proof bedding, or staff trained in food sensitivities, Crete has options for you.",
    hotels: [
      {
        name: "1. Domes Noruz Chania – Adults Only Luxury",
        address: "Chania, Crete, Greece",
        features: ["⭐ 5-star hotel", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining", "🌿 Fragrance-free environment"],
        description: "An adults-only sanctuary offering hypoallergenic rooms and allergen-free dining options in a stunning beachfront setting.",
        quote: "Staff were incredibly attentive to my gluten and dairy allergy. A fantastic experience!",
        bookingUrl: "https://www.booking.com/hotel/gr/domes-noruz-chania.html"
      },
      {
        name: "2. Stella Island Luxury Resort & Spa – Adults Only Haven",
        address: "Hersonissos, Crete, Greece",
        features: ["⭐ 5-star resort", "🛏️ Allergy-free bedding", "👨‍🍳 Dedicated kitchen", "🍽️ Personalized meal plans"],
        description: "A luxury adults-only resort featuring personalized meal plans and a dedicated allergy-friendly kitchen to ensure safe dining.",
        quote: "They customized my meals to be completely nut-free. Amazing service!",
        bookingUrl: "https://www.booking.com/hotel/gr/stella-island-luxury-resort-spa.html"
      },
      {
        name: "3. Creta Maris Beach Resort – Family Paradise",
        address: "Hersonissos, Crete, Greece",
        features: ["⭐ 4-star resort", "🍽️ Safe buffet options", "👶 Family-friendly", "👨‍🍳 Trained staff"],
        description: "A family-friendly resort offering hypoallergenic rooms and a dedicated allergy-safe buffet with clear allergen labeling.",
        quote: "The hotel provided an allergy-friendly buffet with clear labeling. I felt completely safe!",
        bookingUrl: "https://www.booking.com/hotel/gr/creta-maris.html"
      },
      {
        name: "4. Blue Palace Elounda – Luxury Family Resort",
        address: "Elounda, Crete, Greece",
        features: ["⭐ 5-star luxury", "🍽️ Allergy-sensitive dining", "🛏️ Hypoallergenic rooms", "🌿 Dust-free environment"],
        description: "A luxury family resort offering allergy-sensitive dining options and hypoallergenic rooms with stunning sea views.",
        quote: "A perfect choice for travelers with food allergies. The chef prepared meals specifically for my needs.",
        bookingUrl: "https://www.booking.com/hotel/gr/blue-palace-elounda.html"
      },
      {
        name: "5. Aquila Rithymna Beach – Family-Friendly Haven",
        address: "Rethymno, Crete, Greece",
        features: ["⭐ 4-star resort", "👶 Kids menu", "🛏️ Allergy-free rooms", "🚭 Non-smoking"],
        description: "A perfect family resort with allergy-free bedding and special allergy-safe kids' menu in a non-smoking environment.",
        quote: "Great place for families with allergies. They accommodated my child's nut allergy perfectly!",
        bookingUrl: "https://www.booking.com/hotel/gr/aquila-rithymna-beach.html"
      }
    ],
    faqs: [
      {
        question: "Are there allergy-friendly hotels near Heraklion Airport?",
        answer: "Yes! Aquila Atlantis Hotel offers hypoallergenic rooms and allergy-safe dining near the airport."
      },
      {
        question: "What features should I look for in an allergy-friendly hotel?",
        answer: "Key features include hypoallergenic rooms, staff trained in food allergies, fragrance-free environments, and clear food labeling in dining areas."
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "When to Use"],
      rows: [
        {
          original: "I have a food allergy",
          translation: "Έχω αλλεργία στο φαγητό",
          pronunciation: "When checking in or dining"
        },
        {
          original: "Does this contain [allergen]?",
          translation: "Περιέχει [αλλεργιογόνο]?",
          pronunciation: "Before ordering any food"
        },
        {
          original: "Is this meal prepared separately?",
          translation: "Αυτό το γεύμα ετοιμάζεται ξεχωριστά?",
          pronunciation: "When ordering at restaurants"
        }
      ]
    }
  },
  barcelona: {
    intro: "Barcelona welcomes allergy-conscious travelers with specialized accommodations.",
    hotels: [
      {
        name: "Hotel Arts Barcelona",
        address: "Marina 19-21, Barcelona",
        features: ["⭐ 5-star luxury", "🌊 Beachfront", "🍽️ Allergen-free dining"],
        description: "Luxury beachfront hotel with comprehensive allergy management.",
        quote: "Exceptional allergen-free dining options with sea views.",
        bookingUrl: "https://www.booking.com/hotel/es/arts-barcelona.html"
      }
    ],
    languageTable: {
      headers: ["English", "Spanish", "Usage"],
      rows: []
    },
    faqs: []
  },
  "ayia-napa": {
    intro: "Ayia Napa offers allergy-friendly Mediterranean stays.",
    hotels: [
      {
        name: "Adams Beach Hotel",
        address: "Nissi Avenue, Ayia Napa",
        features: ["⭐ 5-star resort", "🏖️ Beachfront", "🍽️ Special diets"],
        description: "Beachfront resort with comprehensive allergy management.",
        quote: "Great attention to dietary requirements.",
        bookingUrl: "https://www.booking.com/hotel/cy/adams-beach.html"
      }
    ],
    languageTable: {
      headers: ["English", "Greek", "Usage"],
      rows: []
    },
    faqs: []
  }
};

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId];

  useEffect(() => {
    if (destination) {
      document.title = `Best Allergy-Friendly Hotels in ${destination.name} | Hypoallergenic Stays & Dining`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Find the best allergy-friendly hotels in ${destination.name}. Enjoy safe stays with hypoallergenic rooms, allergy-conscious dining, and top-rated services for food-sensitive travelers.`
        );
      }

      const ogTags = {
        "og:title": `Top Allergy-Friendly Hotels in ${destination.name}`,
        "og:description": `Discover ${destination.name}'s best hotels for allergy-conscious travelers. Hypoallergenic rooms, safe dining, and expert recommendations for a worry-free stay.`,
        "og:image": "/og-image.png",
        "og:url": `https://www.allergyfriendlyhotels.com/${destinationId}`
      };

      Object.entries(ogTags).forEach(([property, content]) => {
        let metaTag = document.querySelector(`meta[property="${property}"]`);
        if (!metaTag) {
          metaTag = document.createElement('meta');
          metaTag.setAttribute('property', property);
          document.head.appendChild(metaTag);
        }
        metaTag.setAttribute('content', content);
      });

      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute('content', 
        `allergy-friendly hotels ${destination.name}, hypoallergenic stays ${destination.name}, best hotels for allergies, safe dining ${destination.name}, food allergy-friendly hotels ${destination.name}`
      );
    }
  }, [destination, destinationId]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10">
        <DestinationNavigation 
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />

        <article className="space-y-8 md:space-y-12">
          <header className="text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4">
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {content.intro}
              </p>
            </section>
          </header>

          <section className="space-y-4 md:space-y-6" aria-label="Hotels List">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </section>

          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 md:gap-6">
              {content.faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <TravelTips />

          <div className="overflow-x-auto">
            <LanguageTable 
              headers={content.languageTable.headers}
              rows={content.languageTable.rows}
              destinationName={destination.name}
            />
          </div>
        </article>
      </main>
    </div>
  );
};
