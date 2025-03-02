
import { Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ReviewFormProps {
  rating: number;
  reviewText: string;
  onRatingChange: (rating: number) => void;
  onReviewTextChange: (text: string) => void;
  onSubmit: () => void;
  isRTL: boolean;
  textAlignment: string;
  translations: any;
}

export const ReviewForm = ({
  rating,
  reviewText,
  onRatingChange,
  onReviewTextChange,
  onSubmit,
  isRTL,
  textAlignment,
  translations: t
}: ReviewFormProps) => {
  return (
    <div className={`bg-white/20 backdrop-blur-lg rounded-xl p-4 sm:p-8 mb-12 border border-white/30 shadow-lg transition-all hover:shadow-xl ${textAlignment}`}>
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-primary">{t.addReview}</h2>
      
      <div className={`flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium">{t.rating}:</span>
        <div className="flex gap-1 sm:gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              className="focus:outline-none transform hover:scale-115 transition-transform p-0.5 sm:p-1"
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                  value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                } transition-colors drop-shadow-sm`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <Textarea
          value={reviewText}
          onChange={(e) => onReviewTextChange(e.target.value)}
          placeholder={t.placeholder}
          className="min-h-[100px] sm:min-h-[120px] bg-white/10 border-white/20 focus:border-primary/50 transition-all rounded-lg resize-y"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-opacity px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg shadow-md text-sm sm:text-base"
        >
          <Send className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isRTL ? 'ml-1.5 sm:ml-2' : 'mr-1.5 sm:mr-2'}`} />
          {t.submit}
        </Button>
      </div>
    </div>
  );
};
