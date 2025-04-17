
import { Helmet } from "react-helmet";
import { Star, Check, AlertTriangle, Ship, Globe, Clipboard, ChefHat, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

interface CruiseLine {
  name: string;
  rating: number;
  familyFriendly: boolean;
  buffetLabels: boolean | 'partial';
  chefConsult: boolean;
  notableFeature: string;
  destinations?: string;
  quote?: string;
  author?: string;
  features?: string[];
}

const cruiseLines: CruiseLine[] = [
  {
    name: "Disney Cruise Line",
    rating: 5,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Best for severe allergies & kids",
    destinations: "Caribbean, Europe, Alaska, Mediterranean",
    quote: "My daughter has multiple food allergies—dairy, egg, and nuts. Disney handled it better than most restaurants on land. Our server remembered her allergies every day, and even brought custom desserts!",
    author: "Melissa R., USA",
    features: [
      "Online pre-cruise allergy form",
      "Dedicated allergy menu",
      "Staff trained to handle common allergens",
      "Allergy orders marked and monitored from kitchen to table",
      "Onboard medical team familiar with anaphylaxis protocols"
    ]
  },
  {
    name: "Celebrity Cruises",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Great gluten-free options",
    destinations: "Worldwide (Asia, Europe, Caribbean)",
    quote: "As a celiac, I was blown away by Celebrity. They served gluten-free pasta, pizza, even desserts. The staff double-checked every plate before serving.",
    author: "Jon L., UK",
    features: [
      "Dedicated gluten-free, vegetarian, and vegan menus",
      "\"Special Needs\" form required pre-cruise",
      "Trained staff and chefs in dietary restrictions",
      "Food labeled at buffets and main dining rooms"
    ]
  },
  {
    name: "Royal Caribbean",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Large fleet, consistent allergy support",
    destinations: "Global (Europe, Caribbean, Asia, Australia)",
    quote: "I have a tree nut allergy. The staff was accommodating and made sure I felt safe. Even at the buffet, they had signs and offered to make food fresh.",
    author: "Liam S., Canada",
    features: [
      "Dietary needs noted at time of booking and during check-in",
      "Allergy icons on menus",
      "Option to speak directly with chef or dining manager",
      "Offers gluten-free bread, pasta, and desserts upon request"
    ]
  },
  {
    name: "Holland America",
    rating: 4,
    familyFriendly: false,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Personalized dining plans",
    destinations: "Alaska, Northern Europe, South Pacific, Mediterranean",
    quote: "The staff was respectful, patient, and proactive. I felt like I could finally relax while eating on vacation.",
    author: "Andrea W., Australia (shellfish allergy)",
    features: [
      "Personalized meal planning",
      "Menus with allergy info available at dining rooms",
      "Servers alert kitchen of allergy guests",
      "Gluten-free and low-sodium meals available daily"
    ]
  },
  {
    name: "MSC Cruises",
    rating: 3,
    familyFriendly: true,
    buffetLabels: 'partial',
    chefConsult: true,
    notableFeature: "Good value, moderate allergy handling",
    destinations: "Europe, Middle East, Caribbean, Asia",
    quote: "They managed my gluten and dairy intolerance pretty well, but you do need to remind staff sometimes. Best to eat at the main dining room instead of the buffet.",
    author: "Noa E., Israel",
    features: [
      "Pre-cruise dietary form available",
      "Can accommodate gluten-free and lactose-free diets",
      "Some limitations on more complex allergy combinations",
      "Buffets include ingredient tags (though guests report inconsistency)"
    ]
  }
];

const CruiseLines = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  
  return (
    <div className="min-h-screen bg-background pb-12">
      <Helmet>
        <title>Top Cruise Lines for Food Allergies (2025) – Real Reviews & Rankings</title>
        <meta 
          name="description" 
          content="Explore the best cruise lines for travelers with food allergies. Real reviews, expert rankings, and top safety practices for celiac, nut, dairy, and gluten sensitivities." 
        />
        <meta 
          name="keywords" 
          content="cruise lines food allergies, allergy-friendly cruises, gluten-free cruise, dairy-free cruise meals, cruises for dietary restrictions, celiac cruise, allergy-safe travel" 
        />
        <link rel="canonical" href={`${baseUrl}/destinations/cruise-lines`} />
      </Helmet>

      {/* Hero image section */}
      <div className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1518877593221-1f28583780b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Luxury cruise ship sailing on blue ocean - allergy-friendly cruising" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              <span className="inline-block text-sky-200">Best Cruise Lines</span>
              <span className="inline-block text-teal-300"> for Food Allergies</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Real Reviews & Expert Rankings for 2025
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-4xl -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 flex items-center">
            <Ship className="mr-3 h-8 w-8 text-primary" />
            Best Cruise Lines for Travelers with Food Allergies
          </h1>

          <section className="mb-10">
            <p className="text-lg text-muted-foreground mb-6">
              Cruising is a dream vacation for many—but for travelers with food allergies, that dream can quickly turn into a minefield of cross-contamination, unclear labeling, and anxiety. Thankfully, many major cruise lines have stepped up, offering allergy-conscious meal planning, trained staff, and even pre-cruise consultations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Clipboard className="h-5 w-5 text-primary mr-2" />
                  We Analyzed Based On:
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Allergen protocols</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Chef consultations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Allergy-friendly meal availability</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Cross-contamination management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    <span>Verified guest reviews</span>
                  </li>
                </ul>
              </div>
              <div className="bg-primary/5 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Globe className="h-5 w-5 text-primary mr-2" />
                  Essential Phrases at Sea
                </h2>
                <div className="space-y-2">
                  <p className="flex justify-between"><span>I have a food allergy:</span> <span className="font-medium">Show allergy card</span></p>
                  <p className="flex justify-between"><span>Please no nuts:</span> <span className="font-medium">No nuts please</span></p>
                  <p className="flex justify-between"><span>Is this gluten-free?:</span> <span className="font-medium">Gluten-free?</span></p>
                  <p className="flex justify-between"><span>I cannot eat dairy:</span> <span className="font-medium">No dairy</span></p>
                  <p className="flex justify-between"><span>I have celiac disease:</span> <span className="font-medium">Celiac</span></p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Shield className="mr-2 h-6 w-6 text-primary" />
              Quick Comparison Table
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cruise Line</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Family-Friendly</TableHead>
                    <TableHead>Buffet Labels</TableHead>
                    <TableHead>Chef Consult</TableHead>
                    <TableHead>Notable Feature</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cruiseLines.map((cruise) => (
                    <TableRow key={cruise.name}>
                      <TableCell className="font-medium">{cruise.name}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < cruise.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        {cruise.familyFriendly ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        )}
                      </TableCell>
                      <TableCell>
                        {cruise.buffetLabels === true ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : cruise.buffetLabels === 'partial' ? (
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-600" />
                        )}
                      </TableCell>
                      <TableCell>
                        {cruise.chefConsult ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        )}
                      </TableCell>
                      <TableCell>{cruise.notableFeature}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <ChefHat className="mr-2 h-6 w-6 text-primary" />
              Top 5 Cruise Lines for Food Allergy Management
            </h2>
            
            {cruiseLines.map((cruise, index) => (
              <div key={cruise.name} className="mb-10">
                <h3 className="text-xl font-bold text-primary mb-2 flex items-center">
                  <Ship className="mr-2 h-5 w-5" />
                  {index + 1}. {cruise.name}
                </h3>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="px-3 py-1 bg-primary/10 rounded-full text-sm font-medium">
                      ⭐ Allergy Rating: {Array(cruise.rating).fill('★').join('')}
                    </div>
                    <div className="px-3 py-1 bg-blue-100 rounded-full text-sm font-medium">
                      🌍 Destinations: {cruise.destinations}
                    </div>
                    <div className="px-3 py-1 bg-green-100 rounded-full text-sm font-medium">
                      👨‍👩‍👧‍👦 Family-Friendly: {cruise.familyFriendly ? 'Yes' : 'No'}
                    </div>
                  </div>
                  
                  <h4 className="font-medium mb-2">Why it's great:</h4>
                  <ul className="list-disc list-inside space-y-1 mb-4 ml-2">
                    {cruise.features?.map((feature, i) => (
                      <li key={i} className="text-muted-foreground">{feature}</li>
                    ))}
                  </ul>
                  
                  {cruise.quote && (
                    <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                      "{cruise.quote}" – {cruise.author}
                    </blockquote>
                  )}
                </div>
                {index < cruiseLines.length - 1 && <Separator className="mt-10" />}
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CruiseLines;
