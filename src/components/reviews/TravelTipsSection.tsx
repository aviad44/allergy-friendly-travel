
import { Star } from "lucide-react";
import { TravelTips } from "@/components/hotels/TravelTips";

interface TravelTipsSectionProps {
  tips?: string[];
  destinationName: string;
  isAthens?: boolean;
}

export const TravelTipsSection = ({ tips, destinationName, isAthens = false }: TravelTipsSectionProps) => {
  if (!tips || tips.length === 0) {
    return <TravelTips />;
  }
  
  return (
    <div className="bg-amber-50 p-6 rounded-xl my-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Star className="h-5 w-5 mr-2 text-amber-500" /> 
        {isAthens ? "Gluten-Free Travel Tips for Athens" : `Travel Tips for ${destinationName}`}
      </h3>
      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mr-3">
              {index + 1}
            </span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
