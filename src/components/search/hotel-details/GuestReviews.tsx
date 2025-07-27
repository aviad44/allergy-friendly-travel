
import React from 'react';
import { Star } from 'lucide-react';
import { ReviewInfo } from '@/types/search';

interface GuestReviewsProps {
  reviews?: ReviewInfo[];
  rating?: number;
}

export const GuestReviews: React.FC<GuestReviewsProps> = ({ reviews, rating }) => {
  console.log('🎯 GuestReviews received:', { reviews, rating });
  if (!reviews || reviews.length === 0) {
    console.log('❌ No reviews to display');
    return null;
  }
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">🗣️ Guest Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review, index) => {
          const reviewText = review.text;
          const reviewRating = review.rating || rating || 4;
          const authorInitial = review.author 
            ? review.author.charAt(0).toUpperCase()
            : String.fromCharCode(65 + (index % 26)); // Generate A, B, C... for guests
          
          const displayName = review.author || 'Verified Guest';
          const displayLocation = review.country ? `, ${review.country}` : '';
          
          return (
            <div key={index} className="bg-gradient-to-r from-teal-50 to-green-50 p-4 rounded-lg border border-teal-100">
              <div className="flex items-start mb-3">
                <div className="h-10 w-10 rounded-full bg-teal-500 flex items-center justify-center text-white font-semibold mr-3 shadow-sm">
                  {authorInitial}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {displayName}{displayLocation}
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
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-teal-600 font-medium">
                      ✓ Allergy-conscious traveler
                    </div>
                    {review.source && (
                      <div className="text-xs text-gray-500">
                        Source: {review.source}
                      </div>
                    )}
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
