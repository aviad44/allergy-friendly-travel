
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { HotelSection } from "@/components/hotels/HotelSection";
import { UsefulInfo } from "@/components/hotels/UsefulInfo";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { RelatedDestinations } from "@/components/reviews/RelatedDestinations";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { AllergiesTable } from "@/components/language/AllergiesTable";

const Barcelona = () => {
  // Barcelona-specific language phrases
  const spanishPhrases = [
    { phrase: "Tengo una alergia", translation: "I have an allergy", pronunciation: "Ten-go oo-na a-ler-hee-a" },
    { phrase: "Soy alérgico/a al gluten", translation: "I am allergic to gluten", pronunciation: "Soy a-ler-hee-ko/ka al gloo-ten" },
    { phrase: "¿Este plato contiene frutos secos?", translation: "Does this dish contain nuts?", pronunciation: "Es-te pla-to con-tee-e-ne froo-tos se-kos" },
    { phrase: "Necesito un hospital", translation: "I need a hospital", pronunciation: "Ne-se-si-to oon os-pi-tal" },
    { phrase: "¿Dónde puedo encontrar comida sin lactosa?", translation: "Where can I find lactose-free food?", pronunciation: "Don-de poo-e-do en-con-trar co-mi-da sin lac-to-sa" }
  ];

  // Barcelona-specific allergy information
  const allergyInfo = [
    { allergy: "Gluten", spanish: "Gluten", commonIn: "Bread, pasta, many tapas dishes" },
    { allergy: "Nuts", spanish: "Frutos secos", commonIn: "Romesco sauce, turron, desserts" },
    { allergy: "Shellfish", spanish: "Mariscos", commonIn: "Paella, fideuà, seafood tapas" },
    { allergy: "Dairy", spanish: "Lácteos", commonIn: "Cheese plates, some sauces" },
    { allergy: "Eggs", spanish: "Huevos", commonIn: "Tortilla española, many desserts" }
  ];

  // Barcelona allergy-friendly hotels
  const barcelonaHotels = [
    {
      id: "hotel-arts-barcelona",
      name: "Hotel Arts Barcelona",
      description: "Luxury 5-star hotel that excels in accommodating food allergies with specially prepared meals.",
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      address: "Carrer de la Marina, 19-21, 08005 Barcelona",
      allergies: ["Gluten-Free", "Nut-Free", "Lactose-Free"],
      features: [
        "Dedicated allergy-friendly menu",
        "Staff trained in allergen handling",
        "Custom breakfast options",
        "Beachfront location"
      ],
      price: "€€€€"
    },
    {
      id: "almanac-barcelona",
      name: "Almanac Barcelona",
      description: "Boutique hotel with exceptional allergen protocols and personalized dining services.",
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80",
      address: "Gran Via de les Corts Catalanes, 619-621, 08007 Barcelona",
      allergies: ["Gluten-Free", "Dairy-Free", "Shellfish-Free"],
      features: [
        "Advance dietary requirement planning",
        "Personalized meal preparation",
        "In-room allergen-free amenities",
        "Central location near Passeig de Gràcia"
      ],
      price: "€€€"
    },
    {
      id: "majestic-hotel-spa",
      name: "Majestic Hotel & Spa Barcelona",
      description: "Historic hotel with exceptional kitchen staff trained to handle multiple food allergies.",
      image: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?auto=format&fit=crop&w=800&q=80",
      address: "Passeig de Gràcia, 68, 08007 Barcelona",
      allergies: ["All major allergens accommodated"],
      features: [
        "Allergen-free room service",
        "Rooftop restaurant with allergen options",
        "Staff trained by allergen specialists",
        "Located on Passeig de Gràcia"
      ],
      price: "€€€€"
    }
  ];

  // Travel tips specific to Barcelona
  const travelTips = [
    {
      title: "Plan for Late Dining",
      description: "Barcelona locals typically eat dinner after 9 PM. Plan accordingly or you might find limited options during traditional dining hours."
    },
    {
      title: "Bring Allergy Translation Cards",
      description: "Spanish allergy translation cards are essential, especially when visiting local tapas bars away from tourist areas."
    },
    {
      title: "Visit Markets for Fresh Options",
      description: "La Boqueria and Santa Caterina markets offer fresh produce where you can see exactly what you're getting."
    },
    {
      title: "Research Allergy-Friendly Restaurants",
      description: "Barcelona has many restaurants catering to dietary restrictions, but they can get busy. Make reservations in advance."
    }
  ];

  // Additional information about Barcelona
  const usefulInfo = [
    {
      title: "Emergency Services",
      info: "Medical emergency number: 112. Main hospitals: Hospital Clínic (Carrer Villarroel, 170) and Hospital del Mar (Passeig Marítim, 25-29)."
    },
    {
      title: "Pharmacies",
      info: "Look for 'Farmàcia' signs. There are 24-hour pharmacies throughout the city, including Farmàcia Balmes (Balmes, 66) and Farmàcia Alvarez (Passeig de Gràcia, 26)."
    },
    {
      title: "Best Time to Visit",
      info: "Spring (April-June) and fall (September-October) offer pleasant weather and fewer crowds. Summer can be hot and crowded."
    },
    {
      title: "Local Transportation",
      info: "The metro and bus systems are extensive and reliable. Consider buying a T-Casual ticket for multiple journeys."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DestinationNavigation destinationName="Barcelona" />
      
      <DestinationHero
        title="Barcelona"
        subtitle="Allergy-Friendly Guide to the Catalan Capital"
        image="https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80"
        country="Spain"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-display font-bold mb-4">Discover Barcelona</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Barcelona, the vibrant capital of Catalonia, offers a unique blend of stunning architecture, Mediterranean cuisine, 
              and lively culture. For travelers with food allergies, the city presents both challenges and opportunities.
            </p>
            <p className="text-lg text-muted-foreground">
              While traditional Spanish cuisine often incorporates common allergens like seafood, gluten, and nuts, 
              Barcelona's international outlook and increasing awareness of dietary restrictions make it increasingly accessible 
              for allergy-conscious travelers. Many establishments now offer clearly labeled menus and accommodating staff, 
              especially in tourist areas and upscale dining venues.
            </p>
          </div>

          <HotelSection 
            title="Top Allergy-Friendly Hotels in Barcelona" 
            description="These Barcelona hotels go above and beyond to accommodate guests with food allergies"
            hotels={barcelonaHotels}
          />

          <TravelTips tips={travelTips} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Essential Spanish Phrases</h3>
              <LanguageTable phrases={spanishPhrases} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold mb-6">Common Allergies in Spanish</h3>
              <AllergiesTable allergies={allergyInfo} />
            </div>
          </div>

          <UsefulInfo infoItems={usefulInfo} />
          
          <DestinationReviews destinationId="barcelona" />
          
          <RelatedDestinations currentDestinationId="barcelona" />
        </div>
      </div>
    </div>
  );
};

export default Barcelona;
