
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface FiltersDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  sortField: 'name' | 'rating';
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: 'name' | 'rating') => void;
}

export const FiltersDialog: React.FC<FiltersDialogProps> = ({
  isOpen,
  onOpenChange,
  sortField,
  sortDirection,
  onSortChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sort Options</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <h3 className="font-medium">Sort by:</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={sortField === 'name' ? 'default' : 'outline'}
                className="w-full justify-between"
                onClick={() => {
                  onSortChange('name');
                  onOpenChange(false);
                }}
              >
                <span>Name</span>
                {sortField === 'name' && (
                  sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                )}
              </Button>
              <Button 
                variant={sortField === 'rating' ? 'default' : 'outline'}
                className="w-full justify-between"
                onClick={() => {
                  onSortChange('rating');
                  onOpenChange(false);
                }}
              >
                <span>Rating</span>
                {sortField === 'rating' && (
                  sortDirection === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
