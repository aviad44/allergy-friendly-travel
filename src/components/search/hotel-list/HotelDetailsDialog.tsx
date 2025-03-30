
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { HotelInfo } from '@/types/search';
import { HotelDetails } from '../hotel-details';
import { X } from 'lucide-react';

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
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-0 pb-0">
          <DialogTitle className="text-xl font-semibold">
            {selectedHotel?.name}
          </DialogTitle>
          <button 
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>
        {selectedHotel && <HotelDetails hotel={selectedHotel} />}
      </DialogContent>
    </Dialog>
  );
};
