
import React from 'react';
import { Star } from 'lucide-react';

interface GuestReviewsProps {
  reviews?: string[];
  rating?: number;
}

export const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews, rating }) => {
  if (!reviews || reviews.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium mr-3">
                {review.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Guest Review</span>
                <div className="flex">
                  {Array(5).fill(0).map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < (rating || 4) ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm italic">{review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
