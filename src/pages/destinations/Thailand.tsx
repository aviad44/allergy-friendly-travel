
import { useEffect } from "react";
import { DestinationHero } from "@/components/reviews/DestinationHero";
import { RelatedDestinations } from "@/components/reviews/RelatedDestinations";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { destinations, destinationData } from "@/types/reviews";
import { ExternalLink, MapPin, Star, Shield, AlarmClock } from "lucide-react";

const ThailandPage = () => {
  const destination = destinations.find(d => d.id === 'thailand');
  const content = destinationData['thailand'];

  useEffect(() => {
    if (destination) {
      document.title = `${destination.description} | Hypoallergenic Stays`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", "Find the best allergy-friendly hotels in Thailand with safe dining options and real guest reviews. Plan a worry-free vacation today!");
      }
    }
  }, [destination]);

  if (!destination || !content) return null;

  return (
    <div className="min-h-screen bg-background pb-16">
      <DestinationHero destination={destination} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl -mt-20 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8 space-y-8">
          <header className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {destination.description}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.intro}
            </p>
          </header>

          <Separator className="my-8" />

          {/* Bangkok Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
              <MapPin className="text-primary" />
              Bangkok: Allergy-Friendly Luxury in the Heart of the City
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {content.hotels.slice(0, 2).map((hotel, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{hotel.name}</h3>
                      <Button variant="outline" size="sm" asChild>
                        <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          Visit Hotel <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                      {hotel.quote}
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Phuket Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
              <Star className="text-primary" />
              Phuket: Beachfront Resorts with Allergy-Safe Dining
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {content.hotels.slice(2).map((hotel, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold">{hotel.name}</h3>
                      <Button variant="outline" size="sm" asChild>
                        <a href={hotel.bookingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          Visit Hotel <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{hotel.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {hotel.features.map((feature, idx) => (
                        <span key={idx} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                      {hotel.quote}
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-8" />

          {/* Travel Tips Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-display font-semibold flex items-center gap-2">
              <Shield className="text-primary" />
              Travel Tips for Allergy-Friendly Travel in Thailand
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlarmClock className="h-5 w-5 text-primary" />
                  Before Your Trip
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Contact hotels in advance about your allergies
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Pack translation cards in Thai
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Bring extra medication and documentation
                  </li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Common Thai Ingredients to Watch</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Fish sauce (contains fish)
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Peanuts and tree nuts
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Soy sauce (contains wheat)
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Language Guide */}
          <section className="mt-12">
            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-display font-semibold mb-6">Essential Thai Phrases for Allergies</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">English</th>
                        <th className="text-left p-2">Thai</th>
                        <th className="text-left p-2">When to Use</th>
                      </tr>
                    </thead>
                    <tbody>
                      {content.languageTable.rows.map((row, index) => (
                        <tr key={index} className="border-b last:border-0">
                          <td className="p-2">{row.original}</td>
                          <td className="p-2 font-medium">{row.translation}</td>
                          <td className="p-2 text-muted-foreground">{row.pronunciation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          </section>

          {/* Related Destinations */}
          <RelatedDestinations currentDestinationId="thailand" />
        </div>
      </main>
    </div>
  );
};

export default ThailandPage;
