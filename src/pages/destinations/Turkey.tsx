import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card } from "@/components/ui/card";
import { HOME_CONTENT } from "@/constants/home";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';

const Turkey = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Helmet>
        <title>Top All-Inclusive Hotels in Turkey for Travelers with Food Allergies ({currentYear} Guide) | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Discover the best all-inclusive hotels in Turkey for travelers with food allergies like gluten, dairy, nuts and more. Based on real guest reviews." />
        <meta name="keywords" content="all-inclusive allergy-friendly hotels Turkey, gluten-free resorts Turkey, nut-free hotels in Antalya, celiac-safe resorts, dairy-free Turkey hotels" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Allergy-Friendly All-Inclusive Hotels in Turkey",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "item": {
                  "@type": "Hotel",
                  "name": "Barut Lara",
                  "url": "https://www.barutlara.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Antalya",
                    "addressCountry": "TR"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "reviewCount": "232"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 2,
                "item": {
                  "@type": "Hotel",
                  "name": "Liberty Hotels Lykia",
                  "url": "https://www.libertyhotelslykia.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Ölüdeniz",
                    "addressCountry": "TR"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.7",
                    "reviewCount": "189"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 3,
                "item": {
                  "@type": "Hotel",
                  "name": "Kaya Palazzo Golf Resort",
                  "url": "https://www.kayapalazzogolfresort.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Belek",
                    "addressCountry": "TR"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.6",
                    "reviewCount": "201"
                  }
                }
              },
              {
                "@type": "ListItem",
                "position": 4,
                "item": {
                  "@type": "Hotel",
                  "name": "Voyage Belek Golf & Spa",
                  "url": "https://www.voyagehotel.com/en/belek?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Belek",
                    "addressCountry": "TR"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "reviewCount": "274"
                  }
                }
              }
            ]
          })}
        </script>
      </Helmet>

      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">🌿 Top All-Inclusive Hotels in Turkey for Travelers with Food Allergies ({currentYear} Guide)</h1>
        <h2 className="text-xl text-muted-foreground">Discover the best allergy-friendly all-inclusive resorts in Turkey, based on real guest reviews from travelers with food allergies.</h2>
      </header>

      <div className="prose max-w-none">
        <p className="text-lg mb-6">
          Turkey is a dream destination for many travelers, offering stunning beaches, rich history, and warm hospitality. But for travelers with food allergies, especially those with celiac disease or severe nut, dairy, or egg allergies, choosing the right hotel can mean the difference between a relaxing vacation and a stressful one. That's where allergy-aware <strong>all-inclusive</strong> resorts come in – providing safe, enjoyable, and truly carefree stays.
        </p>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
          <p className="text-blue-700">
            ✅ <strong>NOTE:</strong> Always inform the hotel about your allergies in advance, and speak directly with the chef or food & beverage team upon arrival to ensure your dietary needs are clearly understood and accommodated.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-6">🇹🇷 Best Allergy-Friendly All-Inclusive Resorts in Turkey</h2>

        {[
          {
            name: "Barut Lara",
            location: "Antalya",
            features: [
              "Separate food preparation areas for gluten-free dishes",
              "Allergy labeling on buffet items",
              "Chefs available for direct consultations",
              "Vegan and dairy-free menu options"
            ],
            review: {
              text: "I have celiac disease and was amazed at how safe I felt at Barut Lara. The chefs knew what gluten was, and even brought me special bread every morning!",
              author: "Anna M., UK"
            },
            website: "https://www.barutlara.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
            booking: "https://www.booking.com/hotel/tr/barut-lara.en-gb.html?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation"
          },
          {
            name: "Liberty Hotels Lykia",
            location: "Ölüdeniz",
            features: [
              "Allergy cards to show staff",
              "Special allergen-free desserts",
              "Staff trained in nut and dairy allergy safety",
              "Dedicated gluten-free kitchen tools"
            ],
            review: {
              text: "My son is allergic to nuts and eggs, and the team went above and beyond to make sure every meal was safe. They even baked egg-free cakes just for him!",
              author: "David R., Germany"
            },
            website: "https://www.libertyhotelslykia.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
            booking: "https://www.booking.com/hotel/tr/liberty-hotels-lykia.en-gb.html?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation"
          },
          {
            name: "Kaya Palazzo Golf Resort",
            location: "Belek",
            features: [
              "One-on-one chef meetings on arrival",
              "Allergy menus in multiple languages",
              "Clean and labeled buffet with allergy signage",
              "Food safety certifications for staff"
            ],
            review: {
              text: "I’m allergic to dairy and peanuts, and I felt truly taken care of. The chef made a customized dish every night!",
              author: "Elif K., Netherlands"
            },
            website: "https://www.kayapalazzogolfresort.com/?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
            booking: "https://www.booking.com/hotel/tr/kaya-palazzo-golf-resort.en-gb.html?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation"
          },
          {
            name: "Voyage Belek Golf & Spa",
            location: "Belek",
            features: [
              "Gluten-free and lactose-free sections at buffets",
              "Allergy alert wristbands available for guests",
              "Dedicated allergy concierge service",
              "Allergy menu planning at check-in"
            ],
            review: {
              text: "They understood cross-contamination risks, and had gluten-free bread, pasta, and desserts clearly labeled. I even got a personalized meal plan!",
              author: "Thomas J., Denmark"
            },
            website: "https://www.voyagehotel.com/en/belek?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation",
            booking: "https://www.booking.com/hotel/tr/voyage-belek-golf-spa.en-gb.html?utm_source=allergy-free-travel.com&utm_medium=chatbot&utm_campaign=hotel_recommendation"
          }
        ].map((hotel, index) => (
          <Card key={index} className="p-6 mb-8">
            <h3 className="text-xl font-bold mb-3">🏨 {hotel.name} – {hotel.location}</h3>
            <p className="mb-4"><strong>Why it stands out:</strong> Special attention to allergy-sensitive guests with multiple dining options and trained staff.</p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              {hotel.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <blockquote className="border-l-4 border-primary/20 pl-4 italic mb-4">
              "{hotel.review.text}" – {hotel.review.author}
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline">
                <a href={hotel.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Visit Website <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild>
                <a href={hotel.booking} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  Book on Booking.com <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Turkey;
