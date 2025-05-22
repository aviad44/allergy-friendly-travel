
import { DestinationId } from "@/types/definitions";

interface DestinationHeaderProps {
  destinationName: string;
  isLondon: boolean;
  description?: string;
  subtitle?: string;
}

export const DestinationHeader = ({ destinationName, isLondon, description, subtitle }: DestinationHeaderProps) => {
  return (
    <header className="space-y-3 sm:space-y-4">
      {isLondon ? (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
            Best Allergy-Friendly Hotels in London
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl font-display text-muted-foreground">
            A Comprehensive Guide for Food-Allergy Travelers
          </h2>
        </>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
            {description || `Best Allergy-Friendly Hotels in ${destinationName}`}
          </h1>
          <h2 className="text-base sm:text-lg md:text-xl font-display text-muted-foreground">
            {subtitle || "Safe Accommodations for Food Allergies"}
          </h2>
        </>
      )}
    </header>
  );
};
