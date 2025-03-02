
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
    <div className={`bg-white/20 backdrop-blur-lg rounded-xl p-3 sm:p-4 md:p-6 lg:p-8 mb-8 sm:mb-12 border border-white/30 shadow-lg transition-all hover:shadow-xl ${textAlignment}`}>
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 lg:mb-6 text-primary">{t.addReview}</h2>
      
      <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 lg:mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <span className="text-xs sm:text-sm text-muted-foreground font-medium whitespace-nowrap">{t.rating}:</span>
        <div className="flex gap-0.5 sm:gap-1 md:gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              className="focus:outline-none transform hover:scale-110 transition-transform p-0.5 sm:p-0.75 md:p-1"
              aria-label={`Rate ${value} stars`}
            >
              <Star
                className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 ${
                  value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                } transition-colors drop-shadow-sm`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3 sm:mb-4 lg:mb-6">
        <Textarea
          value={reviewText}
          onChange={(e) => onReviewTextChange(e.target.value)}
          placeholder={t.placeholder}
          className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] bg-white/10 border-white/20 focus:border-primary/50 transition-all rounded-lg resize-y"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-opacity px-3 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-1.5 md:py-2 rounded-lg shadow-md text-xs sm:text-sm md:text-base"
        >
          <Send className={`h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 ${isRTL ? 'ml-1 sm:ml-1.5 md:ml-2' : 'mr-1 sm:mr-1.5 md:mr-2'}`} />
          {t.submit}
        </Button>
      </div>
    </div>
  );
};
