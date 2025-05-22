
import { BookingButtonSection } from "./BookingButtonSection";
import { Hotel } from "@/types/definitions";

interface LongDescriptionSectionProps {
  longDescription?: string;
  hotel?: Hotel;
}

export const LongDescriptionSection = ({ longDescription, hotel }: LongDescriptionSectionProps) => {
  if (!longDescription) return null;
  
  return (
    <section className="mt-8 space-y-6">
      <div 
        className="prose prose-sm sm:prose max-w-none text-content"
        dangerouslySetInnerHTML={{ __html: longDescription }}
      />
      <BookingButtonSection hotel={hotel} />
    </section>
  );
};
