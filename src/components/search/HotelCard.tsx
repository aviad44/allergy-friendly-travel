
import React from 'react';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  // Default image if none provided
  const imageUrl = hotel.imageUrl || "/placeholder.svg";
  
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6 shadow-md bg-white">
      {/* Hotel Image */}
      <img 
        src={imageUrl} 
        alt={`${hotel.name}`} 
        className="w-full h-52 object-cover"
      />
      
      {/* Hotel Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h2>
        
        <div className="text-sm text-gray-700 space-y-1">
          {hotel.accommodations && (
            <p>✅ <span className="font-bold">Allergy Program:</span> {hotel.accommodations}</p>
          )}
          
          {hotel.dietary && (
            <p>🍽 <span className="font-bold">Special Diets:</span> {hotel.dietary}</p>
          )}
          
          {hotel.safety && (
            <p>🛡 <span className="font-bold">Cross-contamination:</span> {hotel.safety}</p>
          )}
          
          {hotel.reviews && (
            <p>👥 <span className="font-bold">Guest Feedback:</span> {hotel.reviews}</p>
          )}
        </div>
        
        {/* Links and Button */}
        <div className="mt-3 flex justify-between items-center">
          {hotel.url && (
            <a 
              href={hotel.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-teal-600 hover:underline flex items-center gap-1 text-sm"
            >
              Visit Website →
            </a>
          )}
          
          {hotel.url && (
            <Button 
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg h-auto"
              onClick={() => window.open(hotel.url, "_blank")}
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
