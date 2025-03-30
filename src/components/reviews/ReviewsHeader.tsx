
import React from "react";

export const ReviewsHeader: React.FC = () => {
  return (
    <>
      <h1 className="reviews-title text-3xl md:text-4xl lg:text-5xl mb-4">
        Traveler Reviews
      </h1>
      <p className="reviews-subtitle text-lg md:text-xl mb-8 max-w-2xl">
        Share your experience and help other travelers
      </p>

      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 sm:p-6 mt-6 mb-8">
        <p className="text-muted-foreground">
          Your feedback helps the allergy-friendly travel community grow stronger. Find reviews from real travelers with dietary restrictions and share your own experiences.
        </p>
      </div>
    </>
  );
};
