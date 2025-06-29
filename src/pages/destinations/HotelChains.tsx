
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Rocket, ExternalLink, Hotel, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { DESTINATION_IMAGES } from "@/constants/destinations";
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';

export default function HotelChains() {
  // SEO metadata
  const pageTitle = "Top Allergy-Friendly Hotel Chains Worldwide (2025 Guide)";
  const pageDescription = "Discover the top global hotel chains with allergy-friendly and celiac-safe food policies. Learn which hotels accommodate food allergies and offer certified allergy-safe services.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/hotel-chains";
  const imageUrl = DESTINATION_OG_IMAGES['hotel-chains'];
  
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);
  
  // Preload hero image
  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setHeroImageLoaded(true);
  }, [imageUrl]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <CanonicalTags canonicalUrl={canonicalUrl} />
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />
      
      {/* Hero Image */}
      <div className="relative h-60 sm:h-72 md:h-96 overflow-hidden">
        <img 
          src={imageUrl} 
          alt="Luxurious hotel lobby with comfortable seating and high ceilings" 
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            console.error("Failed to load hotel chains hero image");
            // Fall back to another reliable Pexels image
            (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white max-w-4xl leading-tight">
            🌍 Top Global Hotel Chains with Food Allergy-Friendly Policies (2025 Guide)
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-5 sm:p-8">
          <div className="prose prose-blue max-w-none">
            {/* Introduction */}
            <p className="text-lg text-gray-700 mb-8">
              Traveling with food allergies can be stressful. Luckily, these hotel chains around the world go above and beyond to ensure your safety and comfort when it comes to food allergies and celiac disease.
            </p>

            <Separator className="my-8" />

            {/* Hotel Chain Sections */}
            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">1. Hyatt Hotels & Resorts</h2>
                  <p className="mb-2"><strong>Notable Programs:</strong> "Food. Thoughtfully Sourced. Carefully Served."</p>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Gluten-Free ✔ Dairy-Free ✔ Nut-Free ✔ Custom Meal Requests</p>
                  <p className="mb-4">Hyatt offers allergen-aware dining options, gluten-free breakfasts, and trained chefs at many properties globally.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.hyatt.com/info/food-thoughtfully-sourced-carefully-served?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Hyatt Allergy Policy <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/hyatt.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book Hyatt <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">2. Marriott International</h2>
                  <p className="mb-2"><strong>Brands Include:</strong> Ritz-Carlton, Westin, Sheraton, JW Marriott</p>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Gluten-Free ✔ Vegan ✔ Nut-Free ✔ Custom Meal Handling</p>
                  <p className="mb-4">Marriott properties provide labeled allergen menus and dedicated gluten-free prep zones in many locations.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://clean.marriott.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Marriott Cleanliness & Allergy Info <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/marriott.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book Marriott <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">3. Four Seasons Hotels & Resorts</h2>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Celiac-Safe ✔ Egg-Free ✔ Nut-Free ✔ Dairy-Free</p>
                  <p className="mb-4">Four Seasons provides exceptional custom dining options with cross-contamination precautions and staff trained in allergy protocols.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.fourseasons.com/wellness/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Four Seasons Wellness Dining <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/four-seasons.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book Four Seasons <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">4. Hilton Hotels & Resorts</h2>
                  <p className="mb-2"><strong>Brands Include:</strong> Waldorf Astoria, Conrad, DoubleTree</p>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Shellfish-Free ✔ Gluten-Free ✔ Milk-Free ✔ Personalized Meals</p>
                  <p className="mb-4">Hilton's CleanStay initiative includes allergy-friendly services and guest profile customization to note allergens in advance.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.hilton.com/en/hilton-cleanstay/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Hilton CleanStay Program <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/hilton.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book Hilton <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">5. Accor Hotels</h2>
                  <p className="mb-2"><strong>Brands Include:</strong> Sofitel, Novotel, Fairmont, Pullman</p>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Vegan ✔ Soy-Free ✔ Gluten-Free ✔ On-Demand Safe Meals</p>
                  <p className="mb-4">The ALLSAFE program ensures enhanced hygiene, and many properties offer allergy-safe kitchen handling and labeling.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://group.accor.com/en/Actualites/2020/06/allsafe-label?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Accor ALLSAFE Program <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/accor.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book Accor <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            <section className="mb-10">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-3 rounded-full flex-shrink-0">
                  <Hotel className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">6. IHG Hotels & Resorts</h2>
                  <p className="mb-2"><strong>Brands Include:</strong> InterContinental, Kimpton, Holiday Inn</p>
                  <p className="mb-4"><strong>Allergy Accommodations:</strong> ✔ Gluten-Free ✔ Dairy-Free ✔ Nut-Free ✔ Vegan</p>
                  <p className="mb-4">From boutique to business hotels, IHG properties allow guests to customize meals, especially for celiac and dairy-sensitive travelers.</p>
                  <div className="flex flex-wrap gap-3">
                    <a href="https://www.ihg.com/content/us/en/customer-care/clean-promise?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      IHG Clean Promise <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                    <span className="text-gray-400">|</span>
                    <a href="https://www.booking.com/hotel/us/ihg.html?aid=1234567&utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800">
                      Book IHG <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-8" />

            {/* Final Thoughts */}
            <section className="mb-10 bg-blue-50 p-6 rounded-xl">
              <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">🌐 Final Thoughts</h2>
              <p className="mb-4">Whether you're traveling for business or pleasure, these hotel chains provide safe, allergy-aware options worldwide. Always call ahead to confirm allergen handling procedures and alert staff upon arrival.</p>
              <p className="mb-2"><strong>Want personalized allergy-friendly hotel suggestions?</strong></p>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Link to="/direct-chat" className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                  <span>Try our Allergy-Friendly Hotel Finder</span>
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </section>

            {/* Resources */}
            <section className="mb-10">
              <h3 className="text-xl font-display font-bold text-gray-800 mb-4">📌 Resources:</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">
                  <a href="https://celiac.org/about-the-foundation/travel/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <ExternalLink className="h-4 w-4" />
                    <span>Celiac Disease Foundation Travel Guide</span>
                  </a>
                </li>
                <li className="bg-gray-50 p-3 rounded hover:bg-gray-100 transition-colors">
                  <a href="https://www.foodallergy.org/life-with-food-allergies/food-allergy-safe-travel" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                    <ExternalLink className="h-4 w-4" />
                    <span>FARE Travel Tips</span>
                  </a>
                </li>
              </ul>
            </section>

            {/* Search Tool */}
            <section className="mb-10 bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-xl">
              <h3 className="text-xl font-display font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="h-5 w-5 text-blue-600" />
                Enter Your Destination:
              </h3>
              <p className="italic mb-4">Use our tool to find personalized allergy-friendly hotels around the world.</p>
              <div className="flex items-center gap-2">
                <Link to="/direct-chat">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Search Allergy-Friendly Hotels
                  </Button>
                </Link>
              </div>
            </section>

            {/* Rating Section */}
            <section className="mt-12 p-6 bg-gray-50 rounded-xl text-center">
              <p className="font-medium mb-3">📝 <strong>Please rate this guide:</strong></p>
              <div className="flex justify-center gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star 
                    key={rating}
                    className="h-8 w-8 text-amber-300 hover:text-amber-500 cursor-pointer transition-colors"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};
