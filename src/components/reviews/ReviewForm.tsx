
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';

interface ReviewFormProps {
  rating: number;
  reviewText: string;
  onRatingChange: (rating: number) => void;
  onReviewTextChange: (text: string) => void;
  onSubmit: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({
  rating,
  reviewText,
  onRatingChange,
  onReviewTextChange,
  onSubmit
}) => {
  const renderStars = () => {
    return [1, 2, 3, 4, 5].map((starValue) => (
      <Star
        key={starValue}
        className={`h-6 w-6 md:h-8 md:w-8 cursor-pointer transition-colors ${
          starValue <= rating 
            ? 'text-yellow-500 fill-current' 
            : 'text-gray-300 hover:text-yellow-300'
        }`}
        onClick={() => onRatingChange(starValue)}
      />
    ));
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-md h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <div className="flex justify-center space-x-2 mb-6">
        {renderStars()}
      </div>
      <Textarea
        placeholder="Share your experience with allergy-friendly accommodations..."
        className="w-full min-h-[150px] mb-6 flex-grow resize-none"
        value={reviewText}
        onChange={(e) => onReviewTextChange(e.target.value)}
      />
      <Button 
        onClick={onSubmit} 
        className="w-full"
        variant="default"
      >
        Submit Review
      </Button>
    </div>
  );
};
