
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, MapPin } from 'lucide-react';

interface BookingActionsProps {
  url?: string;
  name: string;
  location?: string;
}

export const BookingActions: React.FC<BookingActionsProps> = ({ url, name, location }) => {
  if (!url) return null;
  
  return (
    <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t">
      <Button 
        className="bg-teal-600 hover:bg-teal-700 text-white flex-1"
        onClick={() => window.open(url, "_blank")}
      >
        Book Now
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
      <Button 
        variant="outline"
        className="border-teal-600 text-teal-700 hover:bg-teal-50 flex-1"
        onClick={() => window.open(`https://maps.google.com/?q=${name} ${location}`, "_blank")}
      >
        View on Map
        <MapPin className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
