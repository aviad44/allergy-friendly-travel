
import { Hotel } from "@/types/definitions";
import { HotelCard } from "@/components/hotels/HotelCard";
import { Star } from "lucide-react";

interface TopHotelsSectionProps {
  hotels: Hotel[];
  destinationName: string;
  isLondon?: boolean;
}

export const TopHotelsSection = ({ hotels, destinationName, isLondon = false }: TopHotelsSectionProps) => {
  // Check if hotels array exists and is not empty
  const hasHotels = hotels && hotels.length > 0;

  return (
    <section className="space-y-4 sm:space-y-6 md:space-y-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
        <Star className="mr-2 h-6 w-6 text-amber-500" aria-hidden="true" />
        Top Allergy-Friendly Hotels in {destinationName}
      </h2>
      <div className="grid gap-6 sm:gap-8 md:gap-10">
        {isLondon ? (
          <>
            <HotelCard 
              name="1. The Athenaeum Hotel & Residences ★★★★★"
              address="116 Piccadilly, London W1J 7BJ, UK"
              features={["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Staff trained in food allergies"]}
              description="The on-site restaurant offers gluten-free, dairy-free, and nut-free options. Staff trained in food allergies – Ensuring no cross-contamination."
              quote="I have celiac disease, and the restaurant ensured my meals were 100% gluten-free! – Emma W."
              bookingUrl="https://www.athenaeumhotel.com/"
            />
            
            <HotelCard 
              name="2. The Langham, London ★★★★★"
              address="1C Portland Pl, London W1B 1JA, UK"
              features={["⭐ 5-star luxury", "🍰 Dedicated gluten-free afternoon tea", "🍽️ Kitchen trained to prevent cross-contamination"]}
              description="Dedicated gluten-free afternoon tea available at the Palm Court. Their kitchen is trained to prevent cross-contamination for allergy sufferers."
              quote="Best gluten-free afternoon tea in London! – Sophie M."
              bookingUrl="https://www.langhamhotels.com/en/the-langham/london/"
            />
            
            <HotelCard 
              name="3. The Ritz London ★★★★★"
              address="150 Piccadilly, London W1J 9BR, UK"
              features={["⭐ 5-star luxury", "🍽️ Bespoke meal preparation", "📋 Dedicated gluten-free menu"]}
              description="The restaurant customizes meals for guests with allergies and offers a dedicated gluten-free menu."
              quote="The best allergy-safe dining experience I've ever had! – Mark D."
              bookingUrl="https://www.theritzlondon.com/"
            />
            
            <HotelCard 
              name="4. One Aldwych ★★★★★"
              address="1 Aldwych, London WC2B 4BZ, UK"
              features={["⭐ 5-star luxury", "🌱 Fully vegan and gluten-free menus", "👨‍🍳 Kitchen trained in allergy protocols"]}
              description="Indigo Restaurant serves gourmet dishes free from gluten and dairy. The kitchen staff is trained in allergy protocols to ensure safe dining."
              quote="Indigo was a game-changer! 100% gluten-free and dairy-free! – Laura H."
              bookingUrl="https://www.onealdwych.com/"
            />
          </>
        ) : (
          hasHotels ? (
            hotels.map((hotel, index) => (
              <div key={index}>
                <HotelCard {...hotel} />
              </div>
            ))
          ) : (
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <p>No hotel information available at the moment.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};
