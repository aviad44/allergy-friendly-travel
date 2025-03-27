
import React from 'react';
import { DestinationHero } from '@/components/reviews/DestinationHero';
import HotelSection from '@/components/hotels/HotelSection';
import { TravelTips } from '@/components/hotels/TravelTips';
import UsefulInfo from '@/components/hotels/UsefulInfo';
import { DestinationNavigation } from '@/components/reviews/DestinationNavigation';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import AllergiesTable from '@/components/language/AllergiesTable';
import { RelatedDestinations } from '@/components/reviews/RelatedDestinations';
import { Helmet } from 'react-helmet';
import { Separator } from '@/components/ui/separator';

const NewYork = () => {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Allergy-Friendly Travel Guide to New York | Food Allergy Hotels</title>
        <meta
          name="description"
          content="Visit New York with food allergies with confidence. Our guide covers the best allergy-friendly hotels, restaurants, and essential phrases for travelers with dietary restrictions."
        />
        <meta
          name="keywords"
          content="New York allergy-friendly hotels, gluten-free New York, dairy-free New York, nut-free accommodations NYC, food allergy travel New York"
        />
        <link rel="canonical" href="https://www.allergy-free-travel.com/destinations/newyork" />
      </Helmet>

      <DestinationHero
        destination={{
          id: "new-york",
          name: "New York",
          country: "The Big Apple welcomes allergy-conscious travelers",
          image: "photo-1496588152823-86ff7695e68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
          description: "Allergy-Friendly Hotels in New York City",
          subtitle: "Find safe accommodations in the city that never sleeps"
        }}
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DestinationNavigation 
          currentLanguage="en" 
          setCurrentLanguage={() => {}}
        />
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-10">
            <HotelSection
              hotels={[
                {
                  id: 1,
                  name: "The Kimberly Hotel",
                  city: "New York",
                  country: "USA",
                  imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.8,
                  reviews: 250,
                  allergyInfo: "Well-trained staff for handling dietary restrictions",
                  bookingUrl: "https://example.com/kimberly-hotel"
                },
                {
                  id: 2,
                  name: "The Langham, New York",
                  city: "New York",
                  country: "USA",
                  imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.9,
                  reviews: 320,
                  allergyInfo: "Detailed allergen information for all food served",
                  bookingUrl: "https://example.com/langham-new-york"
                },
                {
                  id: 3,
                  name: "The Beekman, A Thompson Hotel",
                  city: "New York",
                  country: "USA",
                  imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.7,
                  reviews: 280,
                  allergyInfo: "Trained staff to handle cross-contamination concerns",
                  bookingUrl: "https://example.com/beekman-hotel"
                }
              ]}
            />

            <Separator className="my-8" />
            
            <DestinationReviews destinationId="new-york" />
            
            <TravelTips
              tips={[
                "Many of New York's top restaurants now offer allergen menus - always call ahead to confirm they can accommodate your specific needs.",
                "The Greenmarket Farmers Markets (several locations throughout the city) are great for finding fresh, unprocessed foods if you're self-catering.",
                "Consider staying in a hotel with a kitchenette if your allergies are severe, giving you more control over food preparation.",
                "Download the AllergyEats app, which is particularly helpful for finding allergy-friendly restaurants in New York City.",
                "Carry a translated allergy card in multiple languages, as New York is home to restaurants from countless culinary traditions."
              ]}
            />
          </div>
          
          <div className="space-y-8">
            <UsefulInfo />
            
            <AllergiesTable />
            
            <RelatedDestinations 
              currentDestination="new-york"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYork;
