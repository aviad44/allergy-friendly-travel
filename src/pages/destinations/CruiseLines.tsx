
import { Helmet } from "react-helmet";
import { Star, Check, AlertTriangle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CruiseLine {
  name: string;
  rating: number;
  familyFriendly: boolean;
  buffetLabels: boolean | 'partial';
  chefConsult: boolean;
  notableFeature: string;
}

const cruiseLines: CruiseLine[] = [
  {
    name: "Disney Cruise Line",
    rating: 5,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Best for severe allergies & kids"
  },
  {
    name: "Celebrity Cruises",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Great gluten-free options"
  },
  {
    name: "Royal Caribbean",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Large fleet, consistent allergy support"
  },
  {
    name: "Holland America",
    rating: 4,
    familyFriendly: false,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Personalized dining plans"
  },
  {
    name: "MSC Cruises",
    rating: 3,
    familyFriendly: true,
    buffetLabels: 'partial',
    chefConsult: true,
    notableFeature: "Good value, moderate allergy handling"
  }
];

const CruiseLines = () => {
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Best Cruise Lines for Food Allergies (2025) | Allergy-Free Travel</title>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6">
          Best Cruise Lines for Travelers with Food Allergies: 2025 Review
        </h1>

        <section className="mb-8">
          <p className="text-muted-foreground mb-6">
            Cruising is a dream vacation for many—but for travelers with food allergies, that dream can quickly turn into a minefield of cross-contamination, unclear labeling, and anxiety. Thankfully, many major cruise lines have stepped up, offering allergy-conscious meal planning, trained staff, and even pre-cruise consultations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-primary/5 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">We Analyzed Based On:</h2>
              <ul className="space-y-2">
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
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Quick Comparison Table</h2>
          <div className="overflow-x-auto">
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
      </div>
    </div>
  );
};

export default CruiseLines;
