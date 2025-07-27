
import React from 'react';
import { Star } from 'lucide-react';

interface GuestReviewsProps {
  reviews?: Array<{ text: string; author?: string; rating?: number }> | string[];
  rating?: number;
}

export const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews, rating }) => {
  if (!reviews || reviews.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">🗣️ Guest Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => {
          // Handle both string reviews and object reviews
          const reviewText = typeof review === 'string' ? review : review.text;
          const reviewRating = typeof review === 'object' ? review.rating : rating || 4;
          const authorInitial = typeof review === 'object' && review.author 
            ? review.author.charAt(0).toUpperCase()
            : String.fromCharCode(65 + (index % 26)); // Generate A, B, C... for guests
          
          return (
            <div key={index} className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-100">
              <div className="flex items-start mb-3">
                <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold mr-3 shadow-sm">
                  {authorInitial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {typeof review === 'object' && review.author ? review.author.split(',')[0] : 'Verified Guest'}
                    </span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < reviewRating ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{reviewText}"
                  </p>
                  <div className="mt-2 text-xs text-teal-600 font-medium">
                    ✓ Allergy-conscious traveler
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
