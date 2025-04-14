
import { Star, Trash2 } from "lucide-react";
import { Review } from "@/types/reviews";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReviewCardProps {
  review: Review;
  onDelete?: () => void;
}

export const ReviewCard = ({ review, onDelete }: ReviewCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      console.log("Attempting to delete review with ID:", review.id);
      
      const { error, data } = await supabase
        .from('reviews')
        .delete()
        .eq('id', review.id);

      if (error) {
        console.error('Error details:', error);
        throw error;
      }
      
      console.log("Delete response:", data);

      toast({
        title: "Review deleted",
        description: "The review has been successfully deleted",
      });
      
      if (onDelete) {
        console.log("Calling onDelete callback");
        onDelete();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error deleting review",
        description: "There was a problem deleting this review",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 md:p-6 border border-white/10 shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-row justify-between items-start mb-3 md:mb-4">
        <span className="text-xs md:text-sm text-muted-foreground">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-3 w-3 md:h-4 md:w-4 ${
                index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mb-3 md:mb-4 text-base md:text-lg leading-relaxed">{review.text}</p>
      <div className="flex justify-between items-center">
        <p className="text-xs md:text-sm text-muted-foreground">
          Written by: <span className="text-primary">{review.author_name}</span>
        </p>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Review</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this review? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDelete} 
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
