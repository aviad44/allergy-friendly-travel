
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { HotelDetails } from '../hotel-details';
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
    <Dialog open={!!selectedHotel} onOpenChange={() => selectedHotel && onOpenChange()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-lg font-bold text-gray-900">
            Hotel Details
          </DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogHeader>
        
        {selectedHotel && <HotelDetails hotel={selectedHotel} />}
      </DialogContent>
    </Dialog>
  );
};
