
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { HotelDetails } from '@/components/search/hotel-details';
import { HotelInfo } from '@/types/search';

interface HotelDetailsDialogProps {
  selectedHotel: HotelInfo | null;
  onOpenChange: () => void;
}

export const HotelDetailsDialog: React.FC<HotelDetailsDialogProps> = ({
  selectedHotel,
  onOpenChange
}) => {
  return (
    <Dialog open={!!selectedHotel} onOpenChange={() => onOpenChange()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{selectedHotel?.name && selectedHotel.name.replace(/\d+[\s-]stars?|★+/g, '').trim()}</DialogTitle>
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
