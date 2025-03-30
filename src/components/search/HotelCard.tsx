
import React from 'react';
import { Button } from "@/components/ui/button";
import { Hotel } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="border-b border-gray-200 py-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-teal-600 flex-shrink-0">
            <Hotel className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
            {hotel.url && (
              <a 
                href={hotel.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-teal-600 hover:underline flex items-center gap-1"
              >
                Website <span className="inline-block h-3 w-3">⟶</span>
              </a>
            )}
          </div>
        </div>
        {hotel.url && (
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};
