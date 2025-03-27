
import { Star } from "lucide-react";
import { Review } from "@/types/reviews";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
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
      <p className="text-xs md:text-sm text-muted-foreground">
        Written by: <span className="text-primary">{review.author_name}</span>
      </p>
    </div>
  );
};
