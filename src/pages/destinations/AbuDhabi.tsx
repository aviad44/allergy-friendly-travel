import { useState, useEffect } from "react";
import { destinations, destinationData } from "@/types/reviews";
import { HotelCard } from "@/components/hotels/HotelCard";
import { LanguageTable } from "@/components/reviews/LanguageTable";
import { TravelTips } from "@/components/hotels/TravelTips";
import { DestinationNavigation } from "@/components/reviews/DestinationNavigation";
import { Separator } from "@/components/ui/separator";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { Helmet } from "react-helmet";
import { RelatedDestinations } from "@/components/reviews/RelatedDestinations";
import { Footer } from "@/components/Footer";

export default function AbuDhabiReviews() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const destination = destinations.find(d => d.id === 'abu-dhabi')!;
  const content = destinationData['abu-dhabi'];
  
  // Create a custom destination object with the image we want to use
  const abuDhabiDestination = {
    ...destination,
    image: "photo-1512632578888-169bbbc64f33"
  };

  // Define SEO-friendly meta title and description
  const pageTitle = `Allergy-Friendly Hotels in ${destination.name} - Safe Travel Guide 2024`;
  const pageDescription = `Discover the top allergy-friendly accommodations in ${destination.name}. Expert guide for travelers with dietary restrictions and food allergies. Updated ${new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })}.`;
  const canonicalUrl = "https://your-domain.com/destinations/abu-dhabi";

  useEffect(() => {
    // Adding structured data for SEO
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TravelGuide",
      "name": pageTitle,
      "description": pageDescription,
      "about": {
        "@type": "Place",
        "name": "Abu Dhabi"
      },
      "audience": "Travelers with allergies or dietary restrictions",
      "datePublished": new Date().toISOString().split('T')[0],
      "dateModified": new Date().toISOString().split('T')[0]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [pageTitle, pageDescription]);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="allergy-friendly hotels abu dhabi, gluten-free abu dhabi, food allergy abu dhabi, hypoallergenic hotels, abu dhabi safe dining, lactose-free abu dhabi, vegan abu dhabi, dairy-free abu dhabi" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>

      {/* Use the DestinationHero component with our custom destination */}
      <DestinationHero destination={abuDhabiDestination} />

      <main 
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10 text-left"
        aria-labelledby="main-heading"
      >
        <DestinationNavigation 
          currentLanguage={currentLanguage as any} 
          setCurrentLanguage={setCurrentLanguage as any}
        />

        <article className="space-y-8 md:space-y-12 text-left" itemScope itemType="https://schema.org/Article">
          <header className="text-left space-y-4">
            <h1 
              id="main-heading"
              className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-foreground text-left"
              itemProp="headline"
            >
              {destination.description}
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display text-muted-foreground text-left">
              {destination.subtitle}
            </h2>
            
            <section className="mt-6 md:mt-8 text-left" aria-labelledby="intro-heading">
              <h2 
                id="intro-heading"
                className="text-xl sm:text-2xl font-display font-semibold mb-3 md:mb-4 text-left"
              >
                Why Choose an Allergy-Friendly Hotel in {destination.name}?
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed text-left" itemProp="abstract">
                {content.intro}
              </p>
            </section>
          </header>

          <Separator />

          <section className="space-y-4 md:space-y-6 text-left" aria-labelledby="hotels-heading">
            <h2 
              id="hotels-heading"
              className="text-xl sm:text-2xl font-display font-semibold text-left"
            >
              Top Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-6 md:gap-8" itemProp="mainEntity" itemScope itemType="https://schema.org/ItemList">
              {content.hotels.map((hotel, index) => (
                <div key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                  <meta itemProp="position" content={`${index + 1}`} />
                  <div itemProp="item" itemScope itemType="https://schema.org/Hotel">
                    <meta itemProp="name" content={hotel.name} />
                    <meta itemProp="address" content={hotel.address} />
                    <HotelCard 
                      key={index} 
                      {...hotel} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Separator />

          <section className="space-y-4 md:space-y-6 text-left" aria-labelledby="faqs-heading">
            <h2 
              id="faqs-heading"
              className="text-xl sm:text-2xl font-display font-semibold text-left"
            >
              FAQs: Allergy-Friendly Hotels in {destination.name}
            </h2>
            <div className="grid gap-4 md:gap-6 text-left" itemScope itemType="https://schema.org/FAQPage">
              {content.faqs.map((faq, index) => (
                <div key={index} className="space-y-2 text-left" itemScope itemType="https://schema.org/Question">
                  <h3 className="text-base sm:text-lg font-semibold text-left" itemProp="name">{faq.question}</h3>
                  <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p className="text-sm sm:text-base text-muted-foreground text-left" itemProp="text">{faq.answer}</p>
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
          
          <RelatedDestinations currentDestinationId="abu-dhabi" />
        </article>
      </main>
      
      {/* Replace the inline footer with our new Footer component */}
      <Footer />
    </div>
  );
}
