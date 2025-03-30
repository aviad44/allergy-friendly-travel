
import { Coffee, Star } from "lucide-react";

interface IntroSectionProps {
  intro: string;
  destinationName: string;
  isLondon?: boolean;
}

export const IntroSection = ({ intro, destinationName, isLondon = false }: IntroSectionProps) => {
  return (
    <section className="mt-4 sm:mt-5 bg-primary/5 p-4 sm:p-5 rounded-xl">
      {isLondon ? (
        <>
          <h2 className="text-lg sm:text-xl font-display font-semibold mb-3 flex items-center">
            <Coffee className="mr-2 h-5 w-5 text-primary/80" />
            Why Choose Allergy-Friendly Hotels in London?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            For travelers with food allergies, finding a hotel that understands dietary restrictions is crucial. These hotels provide:
          </p>
          <ul className="mt-3 grid sm:grid-cols-2 gap-2 sm:gap-3">
            <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
              <div className="mr-2 bg-primary/10 rounded-full p-1">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <span>Certified allergy-aware kitchens</span>
            </li>
            <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
              <div className="mr-2 bg-primary/10 rounded-full p-1">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <span>Gluten-free, nut-free, and dairy-free menu options</span>
            </li>
            <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
              <div className="mr-2 bg-primary/10 rounded-full p-1">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <span>Staff trained in handling severe allergies</span>
            </li>
            <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
              <div className="mr-2 bg-primary/10 rounded-full p-1">
                <Star className="h-3 w-3 text-primary" />
              </div>
              <span>Hypoallergenic rooms with air purifiers</span>
            </li>
          </ul>
        </>
      ) : (
        <>
          <h2 className="text-lg sm:text-xl font-display font-semibold mb-3 flex items-center">
            <Coffee className="mr-2 h-5 w-5 text-primary/80" />
            Why Choose an Allergy-Friendly Hotel in {destinationName}?
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
            {intro}
          </p>
          
          {isLondon && (
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 sm:gap-3">
              <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span>Certified allergy-aware kitchens</span>
              </li>
              <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span>Gluten-free, nut-free, and dairy-free menu options</span>
              </li>
              <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span>Staff trained in handling severe allergies</span>
              </li>
              <li className="flex items-start p-2 sm:p-3 bg-white rounded-lg shadow-sm">
                <div className="mr-2 bg-primary/10 rounded-full p-1">
                  <Star className="h-3 w-3 text-primary" />
                </div>
                <span>Hypoallergenic rooms with air purifiers</span>
              </li>
            </ul>
          )}
        </>
      )}
    </section>
  );
};
