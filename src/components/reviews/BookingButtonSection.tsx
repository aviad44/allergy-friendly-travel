
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin } from "lucide-react";
import { Hotel } from "@/types/definitions";

interface BookingButtonSectionProps {
  hotel?: Hotel;
}

export const BookingButtonSection = ({ hotel }: BookingButtonSectionProps) => {
  if (!hotel) return null;
  
  const location = hotel.location || hotel.address || '';
  
  return (
    <section className="my-6">
      <div className="bg-blue-50 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-3">Book Your Stay</h3>
        <p className="mb-4">Ready to experience a worry-free vacation with expert allergy care at {hotel.name}?</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white flex-1 gap-2"
            onClick={() => window.open(hotel.bookingUrl, "_blank")}
          >
            Book Now
            <ExternalLink className="h-4 w-4" />
          </Button>
          
          {location && (
            <Button 
              variant="outline"
              className="border-teal-600 text-teal-700 hover:bg-teal-50 flex-1 gap-2"
              onClick={() => window.open(`https://maps.google.com/?q=${hotel.name} ${location}`, "_blank")}
            >
              View on Map
              <MapPin className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
