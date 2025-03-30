
import { Link } from "react-router-dom";
import { MessageSquare, Star } from "lucide-react";

interface ShareExperienceSectionProps {
  destinationName: string;
  isLondon?: boolean;
}

export const ShareExperienceSection = ({ destinationName, isLondon = false }: ShareExperienceSectionProps) => {
  return (
    <section className="space-y-4 sm:space-y-6 md:space-y-8 bg-gradient-to-r from-primary/10 to-blue-100 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
        <MessageSquare className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
        Share Your Experience!
      </h2>
      <p className="text-sm sm:text-base text-muted-foreground">
        Have you stayed in an allergy-friendly hotel in {destinationName}? <Link to="/reviews" className="text-primary hover:underline">Help others by leaving a review!</Link>
      </p>
      {isLondon && (
        <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
          <h3 className="text-lg sm:text-xl font-semibold flex items-center">
            <Star className="mr-2 h-5 w-5 text-amber-500" aria-hidden="true" />
            Rate This Guide!
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground">
            How helpful was this guide? Rate from 1-5 stars!
          </p>
          <div className="flex justify-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="h-8 w-8 text-amber-300 hover:text-amber-500 cursor-pointer transition-colors" />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
