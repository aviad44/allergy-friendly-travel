
import React from 'react';
import { HotelInfo } from '@/types/search';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  // Default image if none provided
  const defaultImage = "/placeholder.svg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
    e.currentTarget.classList.add("object-contain", "p-4");
    e.currentTarget.classList.remove("object-cover");
  };

  return (
    <div className="space-y-4">
      {/* Hotel Image */}
      <div className="relative w-full h-56 overflow-hidden rounded-lg bg-gray-50">
        <img 
          src={hotel.imageUrl || defaultImage}
          alt={`${hotel.name}`} 
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      {/* Detail Sections */}
      <div className="space-y-4">
        {hotel.accommodations && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Allergy Accommodations</h3>
            <p className="text-gray-700 leading-relaxed">{hotel.accommodations}</p>
          </div>
        )}
        
        {hotel.dietary && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Dietary Options</h3>
            <p className="text-gray-700 leading-relaxed">{hotel.dietary}</p>
          </div>
        )}
        
        {hotel.safety && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Safety Protocols</h3>
            <p className="text-gray-700 leading-relaxed">{hotel.safety}</p>
          </div>
        )}
        
        {hotel.reviews && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Guest Feedback</h3>
            <p className="text-gray-700 leading-relaxed">{hotel.reviews}</p>
          </div>
        )}
      </div>
      
      {/* Call to Action */}
      {hotel.url && (
        <div className="pt-4 flex justify-end">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Visit Official Website
            <ExternalLink className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
