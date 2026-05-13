import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQStructuredData } from "@/components/FAQStructuredData";

const FAQS = [
  {
    question: "What makes a hotel allergy-friendly?",
    answer: "An allergy-friendly hotel actively reduces allergen exposure across rooms, food service, and housekeeping. Look for hypoallergenic bedding, HEPA air purifiers, hard flooring instead of carpets, written allergen protocols in the kitchen, and staff trained to handle severe food allergies and anaphylaxis."
  },
  {
    question: "How do I find hotels for severe allergies?",
    answer: "Use our destination search to filter accommodations by allergen, then verify directly with the property. Ask the hotel three concrete questions before booking: Do you have a dedicated allergen-free preparation area? Can you confirm in writing how cross-contact is prevented? Is staff trained to use an EpiPen if needed?"
  },
  {
    question: "Are hypoallergenic hotel rooms really safer?",
    answer: "Hypoallergenic rooms typically use barrier mattress encasements, allergen-filtered HVAC, and chemical-free cleaning. They reduce common triggers like dust mites, pet dander, and mold but they are not a substitute for food-allergy precautions in the restaurant or room service."
  },
  {
    question: "Which hotel chains are best for food allergies?",
    answer: "Chains with the strongest published allergen policies include Marriott, Hilton, Hyatt, and Scandic. Quality varies by individual property, so always confirm allergy handling with the specific hotel rather than relying on the brand alone."
  },
  {
    question: "How do I travel safely with a gluten-free or celiac diet?",
    answer: "Book accommodations with kitchen access or a verified gluten-free menu, carry a translated allergy card in the local language, research dedicated gluten-free restaurants near your hotel in advance, and contact the hotel kitchen directly to confirm celiac-safe preparation."
  },
  {
    question: "What should I pack when traveling with allergies?",
    answer: "Pack two epinephrine auto-injectors in carry-on with a doctor's letter, antihistamines, a translated allergy card, safe snacks for transit and the first 24 hours, sealed mattress and pillow encasements for dust mite allergies, and contact details for the nearest hospital at your destination."
  }
];

export const AllergyHotelsGuide = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 bg-white w-full">
      <FAQStructuredData faqs={FAQS} />
      <div className="container mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-blue-800 mb-4">
            Allergy-Friendly Hotels: The Complete 2026 Guide
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Honest, allergy-aware accommodation reviews and travel guides for families managing food allergies, celiac disease, gluten sensitivity, and environmental allergies worldwide.
          </p>
        </header>

        <div className="prose prose-slate max-w-none mb-12 text-gray-700 leading-relaxed">
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-8 mb-3">
            Why allergy-friendly accommodation matters
          </h3>
          <p>
            Booking a hotel with a severe food allergy is not the same as booking a hotel. A misread label, a shared frying pan, or a freshly vacuumed carpet can turn a vacation into an emergency room visit. The properties we cover go beyond standard "allergy-aware" claims — they document procedures, train staff, and let you confirm preparation in writing before you arrive.
          </p>

          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-8 mb-3">
            What to look for in a hypoallergenic hotel room
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Air filtration:</strong> HEPA purifiers and filtered HVAC reduce airborne allergens by up to 99%.</li>
            <li><strong>Bedding barriers:</strong> Mattress and pillow encasements block dust mite exposure.</li>
            <li><strong>Hard flooring:</strong> Tile or hardwood traps fewer allergens than carpet.</li>
            <li><strong>Chemical-free cleaning:</strong> Reduces reactions for chemically sensitive guests.</li>
            <li><strong>Pet-free floors:</strong> Designated pet-free zones for animal dander allergies.</li>
          </ul>

          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mt-8 mb-3">
            Food allergy protocols that actually work
          </h3>
          <p>
            The strongest hotels separate allergen-free preparation physically — dedicated pans, color-coded utensils, a clean prep zone, and a chef who personally signs off on each plate. Ask for this in writing. A hotel that cannot describe its protocol in detail is a hotel that does not have one.
          </p>
        </div>

        <div className="border-t pt-10">
          <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-6 text-center">
            Frequently asked questions
          </h3>
          <Accordion type="single" collapsible className="max-w-3xl mx-auto">
            {FAQS.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};