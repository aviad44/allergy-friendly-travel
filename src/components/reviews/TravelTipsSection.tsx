
import { TravelTip } from "@/types/definitions";
import { Lightbulb } from "lucide-react";

interface TravelTipsSectionProps {
  tips?: TravelTip[];
  destinationName: string;
  isAthens?: boolean;
}

export const TravelTipsSection = ({ tips, destinationName, isAthens = false }: TravelTipsSectionProps) => {
  if (!tips || tips.length === 0) return null;
  
  return (
    <section className="mt-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-primary/80" aria-hidden="true" />
        Travel Tips for {destinationName}
        {isAthens && " (Gluten-Free)"}
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {tips.map((tip, index) => (
          <div 
            key={index}
            className="bg-blue-50 p-4 rounded-lg border-l-4 border-l-blue-400"
          >
            <h3 className="font-semibold text-blue-900 mb-2">{tip.title}</h3>
            <p className="text-blue-800">{tip.content}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
