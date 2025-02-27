
import { useState } from "react";
import { destinations, destinationData } from "@/types/reviews";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function BarcelonaReviews() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'barcelona')!;
  const content = destinationData['barcelona'];

  // Custom Barcelona content with correct props for HotelCard
  const barcelonaHotels = [
    {
      name: "Grand Hotel Central",
      address: "Via Laietana 30, Barcelona, Spain",
      features: ["⭐ 5-star luxury", "🛏️ Hypoallergenic rooms", "🍽️ Allergen-free dining"],
      description: "Located in the heart of Barcelona, this luxury hotel prioritizes guest well-being. One visitor noted, \"Absolutely loved this hotel. From the moment I arrived, they ensured all my dietary needs were met.\"",
      quote: "Absolutely loved this hotel. From the moment I arrived, they ensured all my dietary needs were met.",
      bookingUrl: "https://www.grandhotelcentral.com/"
    },
    {
      name: "Mercer Hotel Barcelona",
      address: "Carrer dels Lledó 7, Barcelona, Spain",
      features: ["⭐ 5-star luxury", "👨‍🍳 Personalized dining", "🍽️ Dedicated kitchen"],
      description: "Renowned for its exceptional service, Mercer Hotel provides tailored meals for guests with allergies.",
      quote: "The staff was incredibly attentive to my son's peanut allergy, making our stay stress-free.",
      bookingUrl: "https://www.mercerbarcelona.com/"
    },
    {
      name: "Hotel Arts Barcelona",
      address: "Marina 19-21, Barcelona, Spain",
      features: ["⭐ 5-star luxury", "🏖️ Beachfront", "🍽️ Allergen-conscious dining"],
      description: "Overlooking the marina, Hotel Arts offers allergy-conscious dining.",
      quote: "The staff took my allergies seriously and ensured every meal was prepared safely.",
      bookingUrl: "https://www.hotelartsbarcelona.com/"
    },
    {
      name: "Nobu Hotel Barcelona",
      address: "Avinguda de Roma 2-4, Barcelona, Spain",
      features: ["⭐ 5-star luxury", "🍣 Japanese cuisine", "👨‍🍳 Specialized chefs"],
      description: "Combining Japanese-inspired luxury with dietary sensitivity, Nobu Hotel is a top pick.",
      quote: "The chef personally ensured that my meals were allergy-safe, and the service was impeccable.",
      bookingUrl: "https://barcelona.nobuhotels.com/"
    },
    {
      name: "Hotel Calipolis Sitges",
      address: "Avinguda Sofia 2-6, Sitges, Spain",
      features: ["⭐ 4-star comfort", "🏖️ Beachfront", "🍽️ Allergy-friendly menus"],
      description: "Situated in Sitges, a short drive from Barcelona, this hotel offers allergy-friendly menus and customized meal plans.",
      quote: "I felt completely safe dining here, thanks to their detailed approach to food allergies.",
      bookingUrl: "https://www.hotelcalipolis.com/en/"
    }
  ];

  const allergyTips = [
    "Contact Hotels in Advance: Notify the hotel about your allergies before arrival.",
    "Use Allergy Translation Cards: Carry Spanish-language allergy cards to ease communication at restaurants.",
    "Know Common Ingredients: Be cautious of nuts, dairy, and gluten in Spanish cuisine.",
    "Bring Emergency Medication: Always have antihistamines and an EpiPen ready."
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div 
        className="h-[50vh] w-full bg-cover bg-center relative" 
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=2000&q=80)`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10">
        <DestinationNavigation 
          currentLanguage={currentLanguage as any} 
          setCurrentLanguage={setCurrentLanguage as any}
        />

        <article className="space-y-8 md:space-y-12">
          <header className="text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
              The Ultimate Guide to Allergy-Friendly Hotels in Barcelona
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground">
              Safe and Comfortable Stays for Travelers with Food Allergies
            </h2>
            
            <section className="mt-6 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4">
                Why Choose an Allergy-Friendly Hotel in Barcelona?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                Barcelona offers a perfect blend of stunning architecture, Mediterranean cuisine, and vibrant culture. 
                For travelers with food allergies, choosing the right accommodation is essential for a safe and enjoyable stay. 
                These hotels understand dietary restrictions and go above and beyond to ensure your comfort and safety.
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6" aria-label="Hotels List">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              Top Allergy-Friendly Hotels in Barcelona
            </h2>
            <div className="grid gap-6 md:gap-8">
              {barcelonaHotels.map((hotel, index) => (
                <HotelCard 
                  key={index}
                  name={hotel.name}
                  address={hotel.address}
                  features={hotel.features}
                  description={hotel.description}
                  quote={hotel.quote}
                  bookingUrl={hotel.bookingUrl}
                />
              ))}
            </div>
          </section>

          <Separator />

          {/* Essential Tips Section */}
          <Card className="mt-12">
            <CardHeader>
              <CardTitle className="text-2xl font-display">Essential Tips for Allergy-Safe Travel in Barcelona</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {allergyTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Final Note */}
          <div className="bg-muted p-6 rounded-lg text-center">
            <p className="text-lg font-medium">
              By choosing one of these allergy-friendly hotels, you can enjoy a safe and enjoyable Barcelona getaway. 🌍✨
            </p>
          </div>

          {content.languageTable.headers.length > 0 && (
            <div className="overflow-x-auto">
              <LanguageTable 
                headers={content.languageTable.headers}
                rows={content.languageTable.rows}
                destinationName="Barcelona"
              />
            </div>
          )}
        </article>
      </main>
    </div>
  );
}
