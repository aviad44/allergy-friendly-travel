
import { useState, useEffect } from "react";
import { DestinationHero } from "./DestinationHero";
import { DestinationNavigation } from "./DestinationNavigation";
import { LanguageTable } from "./LanguageTable";
import { HotelCard } from "@/components/hotels/HotelCard";
import { TravelTips } from "@/components/hotels/TravelTips";
import { RelatedDestinations } from "./RelatedDestinations";
import { LanguageCode, destinations, DestinationId, destinationData } from "@/types/reviews";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import { MapPin, Star, Globe, Coffee, MessageSquare, Bell } from "lucide-react";

interface DestinationPageProps {
  destinationId: DestinationId;
}

export const DestinationReviews = ({ destinationId }: DestinationPageProps) => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('en');
  const destination = destinations.find(d => d.id === destinationId);
  const isRTL = currentLanguage === 'he';
  const content = destinationData[destinationId];

  useEffect(() => {
    if (destination) {
      document.title = `Best Allergy-Friendly Hotels in ${destination.name} | Safe Travel for Food Allergies`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", 
          `Discover the best allergy-friendly hotels in ${destination.name}. Safe accommodations for celiac, gluten-free, nut-free, and dairy-free travelers. Read real guest reviews!`
        );
      }
    }
  }, [destination]);

  if (!destination || !content) return null;

  // Check if the current destination is London
  const isLondon = destinationId === 'london' as DestinationId;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DestinationHero destination={destination} />

      <main className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 -mt-16 sm:-mt-20 relative z-10 flex-grow">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10">
          <DestinationNavigation 
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />

          <article className="space-y-8 sm:space-y-12 md:space-y-16 text-left">
            <header className="space-y-4 sm:space-y-6">
              {isLondon ? (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    🏨 Best Allergy-Friendly Hotels in London
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-muted-foreground">
                    A Comprehensive Guide for Food-Allergy Travelers
                  </h2>
                </>
              ) : (
                <>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
                    🏨 {destination.description}
                  </h1>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-display text-muted-foreground">
                    {destination.subtitle}
                  </h2>
                </>
              )}
              
              <section className="mt-6 sm:mt-8 md:mt-10 bg-primary/5 p-6 rounded-xl">
                {isLondon ? (
                  <>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4 sm:mb-6 flex items-center">
                      <Coffee className="mr-2 h-6 w-6 text-primary/80" />
                      Why Choose Allergy-Friendly Hotels in London?
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                      For travelers with food allergies, finding a hotel that understands dietary restrictions is crucial. These hotels provide:
                    </p>
                    <ul className="mt-4 grid sm:grid-cols-2 gap-3 sm:gap-4">
                      <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <div className="mr-3 bg-primary/10 rounded-full p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>Certified allergy-aware kitchens</span>
                      </li>
                      <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <div className="mr-3 bg-primary/10 rounded-full p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>Gluten-free, nut-free, and dairy-free menu options</span>
                      </li>
                      <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <div className="mr-3 bg-primary/10 rounded-full p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>Staff trained in handling severe allergies</span>
                      </li>
                      <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <div className="mr-3 bg-primary/10 rounded-full p-1">
                          <Star className="h-4 w-4 text-primary" />
                        </div>
                        <span>Hypoallergenic rooms with air purifiers</span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg sm:text-xl md:text-2xl font-display font-semibold mb-4 sm:mb-6 flex items-center">
                      <Coffee className="mr-2 h-6 w-6 text-primary/80" />
                      Why Choose an Allergy-Friendly Hotel in {destination.name}?
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground max-w-3xl leading-relaxed">
                      {content.intro}
                    </p>
                    
                    {isLondon && (
                      <ul className="mt-4 grid sm:grid-cols-2 gap-3 sm:gap-4">
                        <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                          <div className="mr-3 bg-primary/10 rounded-full p-1">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <span>Certified allergy-aware kitchens</span>
                        </li>
                        <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                          <div className="mr-3 bg-primary/10 rounded-full p-1">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <span>Gluten-free, nut-free, and dairy-free menu options</span>
                        </li>
                        <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                          <div className="mr-3 bg-primary/10 rounded-full p-1">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <span>Staff trained in handling severe allergies</span>
                        </li>
                        <li className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                          <div className="mr-3 bg-primary/10 rounded-full p-1">
                            <Star className="h-4 w-4 text-primary" />
                          </div>
                          <span>Hypoallergenic rooms with air purifiers</span>
                        </li>
                      </ul>
                    )}
                  </>
                )}
              </section>
            </header>

            <Separator className="bg-primary/10 h-0.5" />

            <section className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
                <Star className="mr-2 h-6 w-6 text-amber-500" aria-hidden="true" />
                Top Allergy-Friendly Hotels in {destination.name}
              </h2>
              <div className="grid gap-6 sm:gap-8 md:gap-10">
                {isLondon ? (
                  <>
                    <HotelCard 
                      name="1. The Athenaeum Hotel & Residences ★★★★★"
                      address="116 Piccadilly, London W1J 7BJ, UK"
                      features={["⭐ 5-star luxury", "🍽️ Allergy-aware dining", "👨‍🍳 Staff trained in food allergies"]}
                      description="The on-site restaurant offers gluten-free, dairy-free, and nut-free options. Staff trained in food allergies – Ensuring no cross-contamination."
                      quote="I have celiac disease, and the restaurant ensured my meals were 100% gluten-free! – Emma W."
                      bookingUrl="https://www.athenaeumhotel.com/"
                    />
                    
                    <HotelCard 
                      name="2. The Langham, London ★★★★★"
                      address="1C Portland Pl, London W1B 1JA, UK"
                      features={["⭐ 5-star luxury", "🍰 Dedicated gluten-free afternoon tea", "🍽️ Kitchen trained to prevent cross-contamination"]}
                      description="Dedicated gluten-free afternoon tea available at the Palm Court. Their kitchen is trained to prevent cross-contamination for allergy sufferers."
                      quote="Best gluten-free afternoon tea in London! – Sophie M."
                      bookingUrl="https://www.langhamhotels.com/en/the-langham/london/"
                    />
                    
                    <HotelCard 
                      name="3. The Ritz London ★★★★★"
                      address="150 Piccadilly, London W1J 9BR, UK"
                      features={["⭐ 5-star luxury", "🍽️ Bespoke meal preparation", "📋 Dedicated gluten-free menu"]}
                      description="The restaurant customizes meals for guests with allergies and offers a dedicated gluten-free menu."
                      quote="The best allergy-safe dining experience I've ever had! – Mark D."
                      bookingUrl="https://www.theritzlondon.com/"
                    />
                    
                    <HotelCard 
                      name="4. One Aldwych ★★★★★"
                      address="1 Aldwych, London WC2B 4BZ, UK"
                      features={["⭐ 5-star luxury", "🌱 Fully vegan and gluten-free menus", "👨‍🍳 Kitchen trained in allergy protocols"]}
                      description="Indigo Restaurant serves gourmet dishes free from gluten and dairy. The kitchen staff is trained in allergy protocols to ensure safe dining."
                      quote="Indigo was a game-changer! 100% gluten-free and dairy-free! – Laura H."
                      bookingUrl="https://www.onealdwych.com/"
                    />
                  </>
                ) : (
                  content.hotels.map((hotel, index) => (
                    <div key={index}>
                      <HotelCard {...hotel} />
                    </div>
                  ))
                )}
              </div>
            </section>

            <Separator className="bg-primary/10 h-0.5" />

            <section className="space-y-4 sm:space-y-6 md:space-y-8 bg-gradient-to-br from-blue-50 to-slate-50 p-6 rounded-xl shadow-inner">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
                <Globe className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
                Interactive Map of Allergy-Friendly Hotels in London
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Click below to explore locations and read guest reviews.
              </p>
              <div className="bg-white rounded-lg p-8 text-center border border-primary/10 shadow-sm">
                <MapPin className="mx-auto h-16 w-16 text-primary/30 mb-4" />
                <p className="italic text-muted-foreground">Interactive map coming soon</p>
              </div>
            </section>

            <Separator className="bg-primary/10 h-0.5" />

            <section className="space-y-4 sm:space-y-6 md:space-y-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
                <MessageSquare className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
                FAQs: Allergy-Friendly Hotels in {destination.name}
              </h2>
              <div className="grid gap-4 sm:gap-6 md:gap-8">
                {content.faqs.map((faq, index) => (
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

            <TravelTips />

            {content.languageTable.headers.length > 0 && (
              <div className="overflow-x-auto -mx-3 sm:mx-0 bg-primary/5 p-4 rounded-xl">
                <div className="min-w-full p-3 sm:p-0">
                  <h2 className="text-xl sm:text-2xl font-display font-semibold mb-4 flex items-center">
                    <Globe className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
                    Essential Phrases for Allergy Travelers
                  </h2>
                  <LanguageTable 
                    headers={content.languageTable.headers}
                    rows={content.languageTable.rows}
                    destinationName={destination.name}
                  />
                </div>
              </div>
            )}

            <RelatedDestinations currentDestinationId={destinationId} />
            
            <section className="space-y-4 sm:space-y-6 md:space-y-8 bg-gradient-to-r from-primary/10 to-blue-100 p-6 rounded-xl shadow-sm">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-semibold flex items-center">
                <MessageSquare className="mr-2 h-6 w-6 text-primary/80" aria-hidden="true" />
                Share Your Experience!
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Have you stayed in an allergy-friendly hotel in {destination.name}? Help others by leaving a review!
              </p>
              <p className="text-sm sm:text-base font-medium flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary/80" aria-hidden="true" />
                Subscribe for updates on new allergy-friendly hotels and travel tips.
              </p>
              {isLondon && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg sm:text-xl font-semibold flex items-center">
                    <Star className="mr-2 h-5 w-5 text-amber-500" aria-hidden="true" />
                    Rate This Guide!
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    How helpful was this guide? Rate from 1-5 stars!
                  </p>
                  <div className="flex justify-center mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-8 w-8 text-amber-300 hover:text-amber-500 cursor-pointer transition-colors" />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
};
