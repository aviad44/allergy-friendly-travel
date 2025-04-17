
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HotelDetails } from '@/components/search/hotel-details';
import { HotelInfo } from '@/types/search';
import { ExternalLink, MapPin } from 'lucide-react';

interface HotelDetailsDialogProps {
  selectedHotel: HotelInfo | null;
  onOpenChange: () => void;
}

export const HotelDetailsDialog: React.FC<HotelDetailsDialogProps> = ({
  selectedHotel,
  onOpenChange
}) => {
  // Generate Google Maps URL
  const getGoogleMapsUrl = (hotelName: string, address: string) => {
    if (!hotelName || !address) return '#';
    const query = encodeURIComponent(`${hotelName}, ${address}`);
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  };

  // Clean hotel name by removing star indicators if they exist
  const cleanHotelName = selectedHotel?.name 
    ? selectedHotel.name.replace(/\d+[\s-]stars?|★+/g, '').trim()
    : '';

  return (
    <Dialog open={!!selectedHotel} onOpenChange={() => onOpenChange()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            {cleanHotelName}
          </DialogTitle>
          
          {selectedHotel?.location && (
            <a 
              href={getGoogleMapsUrl(cleanHotelName, selectedHotel.location)}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-sm text-muted-foreground hover:text-primary mt-1 gap-1"
              aria-label={`View ${cleanHotelName} on Google Maps`}
            >
              <MapPin className="h-3.5 w-3.5" />
              <span>{selectedHotel.location}</span>
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          )}
        </DialogHeader>
        
        {selectedHotel && (
          <div className="mt-2">
            <HotelDetails hotel={selectedHotel} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
