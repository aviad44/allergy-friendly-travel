import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Shield, ExternalLink, Utensils, Check, Clock } from "lucide-react";

const RECOMMENDED_HOTELS = [
  {
    id: 1,
    name: "Le Bristol Paris",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80",
    description: "Michelin-starred restaurant with dedicated allergy-friendly kitchen and personalized menu planning.",
    allergies: ["Gluten", "Dairy", "Nuts", "Shellfish"],
    rating: 4.9,
    priceRange: "€€€€",
    website: "https://www.oetkercollection.com/hotels/le-bristol-paris/",
    features: [
      "Dedicated allergy-friendly kitchen",
      "Pre-arrival allergy consultation",
      "24/7 medical assistance",
      "Custom menu planning"
    ],
    reviews: [
      {
        author: "Sarah M.",
        rating: 5,
        text: "As someone with celiac disease, I was amazed by their attention to detail. The chef personally discussed my dietary needs."
      },
      {
        author: "David L.",
        rating: 5,
        text: "Their nut-free kitchen protocols are impressive. First time I felt completely safe dining at a luxury hotel."
      }
    ]
  },
  {
    id: 2,
    name: "Four Seasons George V",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    description: "Expert in handling multiple food allergies with three Michelin-starred restaurants offering allergen-free menus.",
    allergies: ["Gluten", "Dairy", "Soy", "Eggs"],
    rating: 4.8,
    priceRange: "€€€€",
    website: "https://www.fourseasons.com/paris/",
    features: [
      "Allergen-free room service menu",
      "Cross-contamination prevention protocols",
      "In-house nutritionist",
      "Labeled ingredient lists"
    ],
    reviews: [
      {
        author: "Emma R.",
        rating: 5,
        text: "The staff's knowledge about cross-contamination was exceptional. They made my dairy-free stay absolutely wonderful."
      },
      {
        author: "Michael P.",
        rating: 4,
        text: "Great gluten-free options at all restaurants. They even prepared special bread for breakfast."
      }
    ]
  }
];

const ParisGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Navigation */}
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="relative h-[60vh] rounded-xl overflow-hidden mb-12">
          <img
            src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
            alt="Paris cityscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 p-8 text-white">
            <h1 className="font-display text-5xl md:text-6xl mb-4">Paris</h1>
            <p className="text-xl max-w-2xl">A comprehensive guide to allergy-friendly dining and accommodation in the City of Light</p>
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-16">
          <h2 className="font-display text-3xl mb-6">Dining Safely in Paris</h2>
          
          <div className="float-right ml-6 mb-6 w-1/3">
            <img
              src="https://images.unsplash.com/photo-1551887196-72e32bfc7bf3?auto=format&fit=crop&w=800&q=80"
              alt="Parisian café"
              className="rounded-lg shadow-lg"
            />
            <p className="text-sm text-muted-foreground mt-2 text-center">Modern Parisian restaurants are increasingly accommodating dietary restrictions</p>
          </div>

          <p>
            Paris has evolved significantly in recent years to accommodate diners with food allergies. 
            The city's top establishments now pride themselves on their ability to provide safe, 
            allergen-free dining experiences without compromising on the renowned French culinary excellence.
          </p>

          <p>
            Many restaurants now maintain separate preparation areas for allergen-free dishes, 
            and staff receive specialized training in handling food allergies. It's recommended 
            to call ahead and discuss your specific needs, as most establishments will gladly 
            accommodate with advance notice.
          </p>

          <div className="my-8 p-6 bg-primary/5 rounded-lg">
            <h4 className="font-display text-xl mb-4">Essential French Phrases for Allergy Communication</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>English</TableHead>
                  <TableHead>French</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>"I have a food allergy"</TableCell>
                  <TableCell>"J'ai une allergie alimentaire"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>"Is this dish gluten-free?"</TableCell>
                  <TableCell>"Est-ce que ce plat est sans gluten?"</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>"Does this contain nuts?"</TableCell>
                  <TableCell>"Est-ce que ça contient des noix?"</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h3 className="font-display text-2xl mt-12 mb-6">Allergy-Friendly Luxury Hotels</h3>
        </article>

        {/* Recommended Hotels */}
        <div className="space-y-8 mb-16">
          {RECOMMENDED_HOTELS.map((hotel) => (
            <Card key={hotel.id} className="overflow-hidden">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6 md:col-span-2">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-display text-2xl">{hotel.name}</h4>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">{hotel.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Key Features</h5>
                      <ul className="space-y-2">
                        {hotel.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <Check className="h-4 w-4 text-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-2">Guest Reviews</h5>
                      <div className="space-y-3">
                        {hotel.reviews.map((review, index) => (
                          <div key={index} className="text-sm">
                            <div className="flex items-center mb-1">
                              <div className="flex">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-3 w-3 text-yellow-400" />
                                ))}
                              </div>
                              <span className="ml-2 font-medium">{review.author}</span>
                            </div>
                            <p className="text-muted-foreground">{review.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 mb-4">
                    {hotel.allergies.map((allergy) => (
                      <span
                        key={allergy}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {allergy}-free kitchen
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <span className="text-muted-foreground">{hotel.priceRange}</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={hotel.website} target="_blank" rel="noopener noreferrer">
                        Visit Website
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="bg-muted rounded-xl p-8">
          <h3 className="font-display text-2xl mb-6">Useful Information</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <Utensils className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Restaurant Reservations</h4>
                <p className="text-muted-foreground">Most high-end restaurants require advance notice for allergy accommodations. Book at least 48 hours ahead.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Shield className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Medical Support</h4>
                <p className="text-muted-foreground">All listed hotels have partnerships with nearby medical facilities and can assist in emergencies.</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-5 w-5 mr-3 text-primary mt-1" />
              <div>
                <h4 className="font-medium mb-2">Best Time to Visit</h4>
                <p className="text-muted-foreground">Spring and fall offer the best dining experiences with fresh, seasonal ingredients.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParisGuide;