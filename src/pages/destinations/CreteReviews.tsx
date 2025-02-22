
import { destinations, destinationData } from "@/types/reviews";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function CreteReviews() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'crete')!;
  const content = destinationData['crete'];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Image */}
      <div 
        className="h-[50vh] w-full bg-cover bg-center relative" 
        style={{
          backgroundImage: `url(/lovable-uploads/e8c36400-9150-4115-a6e5-d7c858e844cd.png)`,
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10">
        <DestinationNavigation 
          currentLanguage={currentLanguage as any} 
          setCurrentLanguage={setCurrentLanguage as any}
        />

        <article className="space-y-8 md:space-y-12">
          <header className="text-left space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4">
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                {content.intro}
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6" aria-label="Hotels List">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <HotelCard key={index} {...hotel} />
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-4 md:space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-semibold">
              FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 md:gap-6">
              {content.faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-base sm:text-lg font-semibold">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <TravelTips />

          <div className="overflow-x-auto">
            <LanguageTable 
              headers={content.languageTable.headers}
              rows={content.languageTable.rows}
              destinationName={destination.name}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
