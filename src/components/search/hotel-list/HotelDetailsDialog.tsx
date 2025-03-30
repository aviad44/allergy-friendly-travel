
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HotelInfo } from '@/types/search';
import { HotelDetails } from '../hotel-details';

interface HotelDetailsDialogProps {
  selectedHotel: HotelInfo | null;
  onOpenChange: (open: boolean) => void;
}

export const HotelDetailsDialog: React.FC<HotelDetailsDialogProps> = ({
  selectedHotel,
  onOpenChange
}) => {
  return (
    <Dialog open={!!selectedHotel} onOpenChange={(open) => !open && onOpenChange(false)}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {selectedHotel?.name}
          </DialogTitle>
        </DialogHeader>
        {selectedHotel && <HotelDetails hotel={selectedHotel} />}
      </DialogContent>
    </Dialog>
  );
};
