
import { Hotel, Luggage, UtensilsCrossed } from "lucide-react";

interface DestinationInfoProps {
  name: string;
  country: string;
}

export const DestinationInfo = ({ name, country }: DestinationInfoProps) => {
  return (
    <div className="absolute bottom-0 left-0 w-full p-4 sm:p-5 md:p-6 text-white">
      <div className="container mx-auto">
        <div className="animate-fade-in max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
              <Luggage className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
              <UtensilsCrossed className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
              <Hotel className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-1 text-white/90">
            {name}
          </h1>
          <p className="text-lg text-white/70">
            {country}
          </p>
        </div>
      </div>
    </div>
  );
};
