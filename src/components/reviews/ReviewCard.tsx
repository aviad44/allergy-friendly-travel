
import { Star } from "lucide-react";
import { Review } from "@/types/reviews";

interface ReviewCardProps {
  review: Review;
  isRTL: boolean;
  textAlignment: string;
  translations: any;
}

export const ReviewCard = ({ review, isRTL, textAlignment, translations: t }: ReviewCardProps) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 shadow-md hover:shadow-lg transition-all">
      <div className={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-start mb-4`}>
        <span className="text-sm text-muted-foreground">
          {new Date(review.created_at).toLocaleDateString()}
        </span>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`h-5 w-5 ${
                index < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
      <p className={`mb-4 text-lg leading-relaxed ${textAlignment}`}>{review.text}</p>
      <p className={`text-sm text-muted-foreground ${textAlignment}`}>
        {t.writtenBy}: <span className="text-primary">{review.author_name}</span>
      </p>
    </div>
  );
};
