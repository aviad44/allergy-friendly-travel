
import React from 'react';
import { Button } from "@/components/ui/button";
import { Building } from "lucide-react";
import { HotelInfo } from '@/types/search';

interface HotelCardProps {
  hotel: HotelInfo;
}

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  return (
    <div className="border-b border-gray-100 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-teal-600 flex-shrink-0">
            <Building className="h-10 w-10" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            {hotel.url && (
              <a 
                href={hotel.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-teal-600 hover:underline flex items-center gap-1 mt-1"
              >
                Website <span className="inline-block">→</span>
              </a>
            )}
          </div>
        </div>
        {hotel.url && (
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white text-xl px-8 py-6 h-auto rounded-md"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Book Now
          </Button>
        )}
      </div>
    </div>
  );
};
