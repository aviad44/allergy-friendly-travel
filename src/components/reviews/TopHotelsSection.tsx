
import { Hotel } from "@/types/definitions";
import { HotelCard } from "@/components/hotels/HotelCard";
import { Star } from "lucide-react";

interface TopHotelsSectionProps {
  hotels: Hotel[];
  destinationName: string;
  isLondon?: boolean;
}

export const TopHotelsSection = ({ hotels, destinationName, isLondon = false }: TopHotelsSectionProps) => {
  // Enhanced debug logging to track hotel data
  console.log(`Rendering hotels for ${destinationName}:`, hotels);
  console.log(`isLondon flag:`, isLondon);

  // Fix: Ensure hotels array exists before checking length
  const hasHotels = Array.isArray(hotels) && hotels.length > 0;
  
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
        ) : hasHotels ? (
          hotels.map((hotel, index) => (
            <div key={index}>
              <HotelCard
                name={hotel.name}
                address={hotel.address}
                features={hotel.features}
                description={hotel.description}
                quote={hotel.quote}
                bookingUrl={hotel.bookingUrl}
                imageUrl={hotel.image}
              />
            </div>
          ))
        ) : (
          // Default static hotel data for Barcelona
          destinationName === "Barcelona" ? (
            <>
              <HotelCard 
                name="1. Hotel Arts Barcelona ★★★★★"
                address="Carrer de la Marina, 19-21, 08005 Barcelona, Spain"
                features={["⭐ 5-star luxury", "🍽️ Extensive allergy menus", "👨‍🍳 Dedicated allergy-trained chefs"]}
                description="Their restaurant offers dedicated menus for guests with celiac disease, gluten intolerance, and other food allergies. All staff undergo allergy awareness training."
                quote="The chef personally came to discuss my allergies and created a special menu for me! – Maria J."
                bookingUrl="https://www.hotelartsbarcelona.com/"
              />
              
              <HotelCard 
                name="2. Mandarin Oriental Barcelona ★★★★★"
                address="Passeig de Gràcia, 38-40, 08007 Barcelona, Spain"
                features={["⭐ 5-star luxury", "🍽️ Personalized allergy-friendly meals", "🧪 Kitchen protocols to prevent cross-contamination"]}
                description="This luxury hotel offers personalized menus for guests with food allergies and intolerances. Their kitchens have strict protocols to prevent cross-contamination."
                quote="As someone with severe nut allergies, I felt completely safe dining at their restaurants. – Thomas K."
                bookingUrl="https://www.mandarinoriental.com/barcelona"
              />
            </>
          ) : 
          // Default static hotel data for Abu Dhabi
          destinationName === "Abu Dhabi" ? (
            <>
              <HotelCard 
                name="1. Emirates Palace Mandarin Oriental ★★★★★"
                address="West Corniche Road, Abu Dhabi, United Arab Emirates"
                features={["⭐ 5-star luxury", "🍽️ Allergy-aware culinary team", "📋 Special dietary menus"]}
                description="The hotel's culinary team specializes in accommodating all dietary requirements including allergies, gluten-free, and vegan options across all their restaurants."
                quote="They prepared special gluten-free Arabic pastries for me during my stay! – Sarah M."
                bookingUrl="https://www.mandarinoriental.com/abu-dhabi/emirates-palace"
              />
              
              <HotelCard 
                name="2. Rosewood Abu Dhabi ★★★★★"
                address="Al Maryah Island, Abu Dhabi, United Arab Emirates"
                features={["⭐ 5-star luxury", "👨‍🍳 Specialized allergy chefs", "🌱 Wide range of allergy-friendly options"]}
                description="Their restaurants feature specialized chefs trained in preparing allergy-friendly cuisine, with clear ingredient labeling and alternatives for common allergens."
                quote="The staff went above and beyond to ensure my dairy allergy was taken care of. – Khalid A."
                bookingUrl="https://www.rosewoodhotels.com/en/abu-dhabi"
              />
            </>
          ) : (
            <div className="col-span-full text-center p-5 bg-muted/30 rounded-lg">
              <p>No hotel information available for this destination at the moment.</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};
