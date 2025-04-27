
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";

interface ErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  errorDetails: string;
}

export function ErrorDialog({ open, onOpenChange, errorDetails }: ErrorDialogProps) {
  // Function to format error details
  const formatErrorDetails = (details: string) => {
    try {
      // Check if the details are JSON
      if (details.includes('{') && details.includes('}')) {
        try {
          const parsedError = JSON.parse(details);
          return JSON.stringify(parsedError, null, 2);
        } catch {
          // If parsing fails, return as is
          return details;
        }
      }
      return details;
    } catch (error) {
      return `Error formatting details: ${String(error)}`;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive flex items-center gap-2">
            <AlertCircle className="h-5 w-5" /> 
            Error Sending Message
          </DialogTitle>
          <DialogDescription>
            We encountered a problem while trying to send your message. Please try again later or contact us directly.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20 flex gap-2">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="text-sm text-destructive">
            <p className="font-semibold">Error details:</p>
            <p className="font-mono text-xs break-all overflow-x-auto max-h-40 overflow-y-auto">
              {formatErrorDetails(errorDetails)}
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button 
            onClick={() => {
              onOpenChange(false);
              window.open("mailto:support@allergy-free-travel.com", "_blank");
            }}
          >
            Contact Support
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
