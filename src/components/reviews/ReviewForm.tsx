
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
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-12 border border-white/20 shadow-lg transition-all hover:shadow-xl ${textAlignment}`}>
      <h2 className="text-2xl font-semibold mb-6">{t.addReview}</h2>
      
      <div className={`flex items-center gap-3 mb-6 ${isRTL ? 'justify-end' : 'justify-start'}`}>
        <span className="text-sm text-muted-foreground">{t.rating}:</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => onRatingChange(value)}
              className="focus:outline-none transform hover:scale-110 transition-transform"
            >
              <Star
                className={`h-7 w-7 ${
                  value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <Textarea
          value={reviewText}
          onChange={(e) => onReviewTextChange(e.target.value)}
          placeholder={t.placeholder}
          className="min-h-[120px] bg-white/5 border-white/10 focus:border-primary/50 transition-all"
          dir={isRTL ? 'rtl' : 'ltr'}
        />
      </div>

      <div className={`flex ${isRTL ? 'justify-start' : 'justify-end'}`}>
        <Button
          onClick={onSubmit}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <Send className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t.submit}
        </Button>
      </div>
    </div>
  );
};
