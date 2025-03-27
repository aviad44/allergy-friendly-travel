
import { Star } from "lucide-react";
import { Review } from "@/types/reviews";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 border border-white/10 shadow-md hover:shadow-lg transition-all">
      <div className="flex flex-row justify-between items-start mb-2 sm:mb-4">
        <span className="text-xs sm:text-sm text-muted-foreground">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-0.5 sm:gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 ${
                index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className="mb-2 sm:mb-4 text-base sm:text-lg leading-relaxed">{review.text}</p>
      <p className="text-xs sm:text-sm text-muted-foreground">
        Written by: <span className="text-primary">{review.author_name}</span>
      </p>
    </div>
  );
};
