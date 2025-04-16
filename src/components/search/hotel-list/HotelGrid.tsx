
import React from 'react';
import { HotelCard } from '../HotelCard';
import { HotelInfo } from '@/types/search';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface HotelGridProps {
  hotels: HotelInfo[];
  onHotelSelect: (hotel: HotelInfo) => void;
  error?: string;
}

export const HotelGrid: React.FC<HotelGridProps> = ({ 
  hotels, 
  onHotelSelect,
  error
}) => {
  // Show error message if provided
  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4 mr-2" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Ensure hotels is an array (even if API returns malformed data)
  const safeHotels = Array.isArray(hotels) ? hotels : [];
  
  // Deduplicate hotels by name to prevent duplicate listings
  const uniqueHotels = safeHotels.reduce((acc: HotelInfo[], current) => {
    if (!current || !current.name) return acc; // Skip invalid entries
    
    const isDuplicate = acc.find(item => item.name === current.name);
    if (!isDuplicate) {
      return [...acc, current];
    }
    return acc;
  }, []);

  if (uniqueHotels.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <div className="bg-white p-6 rounded-lg shadow-sm max-w-md mx-auto">
          <div className="h-10 w-10 mx-auto text-gray-400 mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-600 text-sm">
            We couldn't find any allergy-friendly hotels matching your criteria. 
            Please try adjusting your search or contact us for personalized recommendations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {uniqueHotels.map((hotel, index) => (
        <div key={`${hotel.name}-${index}`}>
          <HotelCard 
            hotel={hotel} 
            onViewDetails={() => onHotelSelect(hotel)}
          />
        </div>
      ))}
    </div>
  );
}
