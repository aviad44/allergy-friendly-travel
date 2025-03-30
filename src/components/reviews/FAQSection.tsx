
import { FAQ } from "@/types/definitions";
import { MessageSquare } from "lucide-react";

interface FAQSectionProps {
  faqs: FAQ[];
  destinationName: string;
}

export const FAQSection = ({ faqs, destinationName }: FAQSectionProps) => {
  return (
    <section className="space-y-4 sm:space-y-6 md:space-y-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
        <MessageSquare className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
        FAQs: Allergy-Friendly Hotels in {destinationName}
      </h2>
      <div className="grid gap-4 sm:gap-6 md:gap-8">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-primary/5 rounded-lg shadow-sm space-y-2 transition-all hover:shadow-md hover:bg-primary/10">
            <h3 className="text-base sm:text-lg font-semibold">
              {faq.question}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
