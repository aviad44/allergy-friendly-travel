
import React, { useState } from "react";
import { ReviewsHeader } from "./ReviewsHeader";
import { ReviewForm } from "./ReviewForm";
import { ReviewFilters } from "./ReviewFilters";
import { ReviewsList } from "./ReviewsList";
import { Review, sortOptions } from "@/types/reviews";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ReviewContentProps {
  reviews: Review[];
  isLoading: boolean;
  fetchReviews: () => Promise<void>;
  selectedDestination: string;
  selectedTravelerType: string;
  sortBy: typeof sortOptions[number];
  onDestinationChange: (destination: string) => void;
  onTravelerTypeChange: (travelerType: string) => void;
  onSortChange: (value: string) => void;
}

export const ReviewContent: React.FC<ReviewContentProps> = ({
  reviews,
  isLoading,
  fetchReviews,
  selectedDestination,
  selectedTravelerType,
  sortBy,
  onDestinationChange,
  onTravelerTypeChange,
  onSortChange
}) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { toast } = useToast();

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive"
      });
      return;
    }

    if (reviewText.trim().length < 10) {
      toast({
        title: "Please write a review of at least 10 characters",
        variant: "destructive"
      });
      return;
    }

    try {
      const newReview = {
        rating,
        text: reviewText,
        author_name: "Guest",
        language: "en",
        created_at: new Date().toISOString(),
        destination: selectedDestination !== 'all' ? selectedDestination : undefined,
        traveler_type: selectedTravelerType !== 'all' ? selectedTravelerType : undefined
      };

      const { error } = await supabase
        .from('reviews')
        .insert(newReview);

      if (error) throw error;

      setRating(0);
      setReviewText("");
      fetchReviews();

      toast({
        title: "Thank you!",
        description: "Your review has been added successfully",
      });
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        variant: "destructive"
      });
    }
  };

  const filterAndSortReviews = (reviews: Review[]) => {
    if (!Array.isArray(reviews)) {
      console.error("Reviews is not an array:", reviews);
      return [];
    }
    
    let filtered = [...reviews];

    if (selectedDestination !== 'all') {
      filtered = filtered.filter(review => review.destination === selectedDestination);
    }

    if (selectedTravelerType !== 'all') {
      filtered = filtered.filter(review => review.traveler_type === selectedTravelerType);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'highestRated':
          return b.rating - a.rating;
        case 'lowestRated':
          return a.rating - b.rating;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  };

  const handleReviewDeleted = () => {
    console.log("Review deleted, refreshing list");
    fetchReviews();
  };

  return (
    <div className="reviews-container reviews-animation-fade">
      <ReviewsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <ReviewForm
            rating={rating}
            reviewText={reviewText}
            onRatingChange={setRating}
            onReviewTextChange={setReviewText}
            onSubmit={handleSubmitReview}
          />
        </div>

        <div className="lg:col-span-7">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Recent Reviews</h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mb-6">
            <p className="text-muted-foreground text-sm mb-3">
              When writing your review, consider mentioning specific allergy accommodations the hotel made, staff knowledge about cross-contamination, and availability of alternative food options.
            </p>
            <p className="text-muted-foreground text-sm">
              The most helpful reviews are detailed and specific. Mention the dates of your stay, room type, and specific allergies that were accommodated.
            </p>
          </div>
          
          <ReviewFilters
            selectedDestination={selectedDestination}
            selectedTravelerType={selectedTravelerType}
            sortBy={sortBy}
            onDestinationChange={onDestinationChange}
            onTravelerTypeChange={onTravelerTypeChange}
            onSortChange={onSortChange}
          />

          <ReviewsList 
            reviews={filterAndSortReviews(reviews)} 
            isLoading={isLoading}
            onReviewDeleted={handleReviewDeleted}
          />
        </div>
      </div>
    </div>
  );
};
