
import React from "react";
import { Review } from "@/types/reviews";
import { ReviewCard } from "./ReviewCard";

interface ReviewsListProps {
  reviews: Review[];
  isLoading: boolean;
}

export const ReviewsList: React.FC<ReviewsListProps> = ({ reviews, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-muted-foreground">Loading reviews...</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 bg-white/5 border border-white/10 rounded-xl backdrop-blur-sm">
        <p className="text-muted-foreground text-lg">No reviews yet</p>
        <p className="text-sm mt-2">Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {reviews.map((review) => (
        <div key={review.id} className="reviews-animation-fade">
          <ReviewCard review={review} />
        </div>
      ))}
    </div>
  );
};
