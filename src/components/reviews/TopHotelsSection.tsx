
import { Hotel } from "@/types/definitions";
import { StarIcon } from "lucide-react";

interface TopHotelsSectionProps {
  hotels: Hotel[];
  destinationName?: string;
}

export const TopHotelsSection = ({ hotels, destinationName = "" }: TopHotelsSectionProps) => {
  if (!hotels || hotels.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">
        {destinationName ? `Top Allergy-Friendly Hotels in ${destinationName}` : "Top Allergy-Friendly Hotels"}
      </h2>
      <div className="space-y-8">
        {hotels.map((hotel, index) => (
          <div key={index} className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold">{hotel.name}</h3>
                <div className="flex items-center">
                  {Array(hotel.rating || 5).fill(0).map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-4">{hotel.description}</p>
              <div className="space-y-2">
                <div className="flex items-start">
                  <span className="font-medium text-gray-800 mr-2">Special Diets:</span>
                  <span>{hotel.specialDiets?.join(", ") || "Information not available"}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-800 mr-2">Location:</span>
                  <span>{hotel.location || "Location information not available"}</span>
                </div>
                <div className="flex items-start">
                  <span className="font-medium text-gray-800 mr-2">Price Range:</span>
                  <span>{hotel.priceRange || "$$$"}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
