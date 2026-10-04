
import { Hotel } from "@/types/definitions";
import { TripadvisorEnrichedHotelCard as HotelCard } from "@/components/hotels/TripadvisorEnrichedHotelCard";
import { Star } from "lucide-react";

interface TopHotelsSectionProps {
  hotels: Hotel[];
  destinationName: string;
}

export const TopHotelsSection = ({ hotels, destinationName }: TopHotelsSectionProps) => {
  const hasHotels = Array.isArray(hotels) && hotels.length > 0;

  return (
    <section className="space-y-4 sm:space-y-6 md:space-y-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
        <Star className="mr-2 h-6 w-6 text-amber-500" aria-hidden="true" />
        Top Allergy-Friendly Hotels in {destinationName}
      </h2>
      {/*
        min-w-0 on the grid and on every grid item below: CSS Grid items get
        the same "automatic minimum size = content size" default as flex
        items, so without it a long address or a wide row of badges inside
        HotelCard stretches the grid cell (and the whole page) past the
        viewport instead of wrapping/truncating inside it — the min-w-0
        added to HotelCard's own internal flex rows never got a bounded box
        to shrink into in the first place. Confirmed live on iPhone 13.
      */}
      <div className="grid gap-6 sm:gap-8 md:gap-10 min-w-0">
        {hasHotels ? (
          hotels.map((hotel, index) => (
            <div key={hotel.id || index} className="min-w-0">
              <HotelCard
                category="hotel"
                city={destinationName}
                name={hotel.name}
                address={hotel.address || hotel.location}
                features={hotel.features || hotel.amenities}
                description={hotel.description}
                quote={hotel.guestReview || hotel.quote}
                bookingUrl={hotel.bookingUrl || hotel.website}
                imageUrl={hotel.image || hotel.imageUrl}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-5 bg-muted/30 rounded-lg">
            <p>No hotel information available for this destination at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};
