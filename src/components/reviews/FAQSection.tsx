
import { FAQ } from "@/types/definitions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  faqs: FAQ[];
  destinationName?: string;
}

export const FAQSection = ({ faqs, destinationName = "" }: FAQSectionProps) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <h2 className="text-2xl font-bold mb-6">
        {destinationName 
          ? `Frequently Asked Questions About ${destinationName}` 
          : "Frequently Asked Questions"}
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-medium">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <p className="text-gray-700">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
