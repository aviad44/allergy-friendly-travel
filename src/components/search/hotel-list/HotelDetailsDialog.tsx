
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HotelDetails } from '../HotelDetails';
import { HotelInfo } from '@/types/search';

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
