import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';

export interface FiltersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  destination: string;
  allergies: string;
}

export const FiltersDialog: React.FC<FiltersDialogProps> = ({
  isOpen,
  onOpenChange,
  destination,
  allergies
}) => {
  const navigate = useNavigate();
  const [destinationInput, setDestinationInput] = React.useState(destination);
  const [allergiesInput, setAllergiesInput] = React.useState(allergies);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create search params
    const searchParams = new URLSearchParams();
    searchParams.set('destination', destinationInput);
    searchParams.set('allergies', allergiesInput);
    
    // Close dialog
    onOpenChange(false);
    
    // Navigate to search results with new params
    navigate(`/search-results?${searchParams.toString()}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Refine Your Search</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input 
              id="destination" 
              value={destinationInput} 
              onChange={(e) => setDestinationInput(e.target.value)}
              placeholder="Enter city or region"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="allergies">Allergies</Label>
            <Input 
              id="allergies" 
              value={allergiesInput} 
              onChange={(e) => setAllergiesInput(e.target.value)}
              placeholder="e.g., Peanut, Gluten, Dairy"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={!destinationInput.trim() || !allergiesInput.trim()}
            >
              Search
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
