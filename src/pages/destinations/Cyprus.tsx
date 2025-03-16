
import { useState } from "react";
import { destinations, destinationData } from "@/types/reviews";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { Separator } from "@/components/ui/separator";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { Helmet } from "react-helmet";
import { Footer } from "@/components/Footer";

export default function CyprusReviews() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'cyprus')!;
  const content = destinationData['cyprus'];
  
  const cyprusDestination = {
    ...destination,
    image: "lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png"
  };

  // SEO metadata
  const pageTitle = `Top Allergy-Friendly Hotels in Cyprus | Safe Travel Guide 2024`;
  const pageDescription = `Discover the best allergy-friendly accommodations in Cyprus for travelers with dietary restrictions. Expert guide for gluten-free, dairy-free and nut-free options in Cyprus hotels.`;
  const keywords = "allergy-friendly hotels cyprus, gluten-free cyprus, dairy-free accommodations cyprus, nut-free hotels cyprus, food allergy travel cyprus, safe hotels dietary restrictions";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cyprus";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Allergy Free Travel" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png" />
        
        {/* Schema.org markup for destination */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TravelGuide",
            "name": pageTitle,
            "description": pageDescription,
            "datePublished": "2024-05-01",
            "dateModified": "2024-05-01",
            "about": {
              "@type": "Place",
              "name": "Cyprus",
              "description": "Island country in the Mediterranean Sea"
            },
            "audience": "Travelers with food allergies or dietary restrictions"
          })}
        </script>
      </Helmet>

      <DestinationHero destination={cyprusDestination} />

      <main 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10 text-left"
        itemScope
        itemType="https://schema.org/Article"
      >
        <DestinationNavigation 
          currentLanguage={currentLanguage as any} 
          setCurrentLanguage={setCurrentLanguage as any}
        />

        <article className="space-y-8 md:space-y-12 text-left">
          <header className="text-left space-y-4">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-left"
              itemProp="headline"
            >
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground text-left">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8 text-left">
              <h2 className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4 text-left">
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p 
                className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed text-left"
                itemProp="description"
              >
                {content.intro}
              </p>
            </section>
          </header>

          <Separator />

          <section 
            className="space-y-4 md:space-y-6 text-left" 
            aria-label="Hotels List"
            itemProp="mainEntity"
            itemScope
            itemType="https://schema.org/ItemList"
          >
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-left">
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8">
              {content.hotels.map((hotel, index) => (
                <div 
                  key={index}
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={`${index + 1}`} />
                  <HotelCard key={index} {...hotel} />
                </div>
              ))}
            </div>
          </section>

          <Separator />

          <section 
            className="space-y-4 md:space-y-6 text-left"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            <h2 className="text-xl sm:text-2xl font-display font-semibold text-left">
              FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 md:gap-6 text-left">
              {content.faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="space-y-2 text-left"
                  itemScope
                  itemType="https://schema.org/Question"
                >
                  <h3 
                    className="text-base sm:text-lg font-semibold text-left"
                    itemProp="name"
                  >{faq.question}</h3>
                  <div itemScope itemType="https://schema.org/Answer">
                    <p 
                      className="text-sm sm:text-base text-muted-foreground text-left"
                      itemProp="text"
                    >{faq.answer}</p>
                  </div>
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
      
      <Footer />
    </div>
  );
}
