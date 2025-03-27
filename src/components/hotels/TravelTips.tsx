
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

interface TravelTipsProps {
  tips?: string[];
}

export const TravelTips = ({ tips }: TravelTipsProps) => {
  const defaultTips = [
    "Contact the hotel in advance – Confirm their ability to accommodate your allergies before arrival.",
    "Request a mini fridge – Helps store safe food options if needed.",
    "Use an allergy translation card – Essential for restaurants and cafes if you don't speak the local language.",
    "Check nearby allergy-friendly restaurants – Many hotels have partnerships with safe dining spots."
  ];

  const tipsToShow = tips || defaultTips;

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Final Tips for an Allergy-Safe Stay</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {tipsToShow.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
