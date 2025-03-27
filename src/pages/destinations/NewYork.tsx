
import React from 'react';
import { DestinationHero } from '@/components/reviews/DestinationHero';
import { HotelSection } from '@/components/hotels/HotelSection';
import { TravelTips } from '@/components/hotels/TravelTips';
import { UsefulInfo } from '@/components/hotels/UsefulInfo';
import { DestinationNavigation } from '@/components/reviews/DestinationNavigation';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { AllergiesTable } from '@/components/language/AllergiesTable';
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
        title="New York"
        subtitle="The Big Apple welcomes allergy-conscious travelers"
        imageUrl="https://images.unsplash.com/photo-1496588152823-86ff7695e68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
      />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <DestinationNavigation destinationId="new-york" />
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-10">
            <HotelSection
              hotels={[
                {
                  name: "The Kimberly Hotel",
                  description: "Known for their attentive staff who are well-trained in handling dietary restrictions. The on-site restaurant offers specialized menus for various allergies, including gluten, dairy, and nuts.",
                  image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.8,
                  link: "https://example.com/kimberly-hotel"
                },
                {
                  name: "The Langham, New York",
                  description: "This luxury hotel excels at accommodating guests with food allergies. Their chefs can prepare special meals, and they maintain detailed allergen information for all food served on the premises.",
                  image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.9,
                  link: "https://example.com/langham-new-york"
                },
                {
                  name: "The Beekman, A Thompson Hotel",
                  description: "The Beekman offers exceptional allergy-friendly service with chefs who can accommodate various dietary needs. Their staff is trained to handle cross-contamination concerns properly.",
                  image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  rating: 4.7,
                  link: "https://example.com/beekman-hotel"
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
            <UsefulInfo
              items={[
                {
                  title: "Best Time to Visit",
                  content: "Spring (April-June) and fall (September-November) offer pleasant temperatures and fewer crowds."
                },
                {
                  title: "Getting Around",
                  content: "The subway is the fastest way to travel, with extensive coverage throughout the city. Taxis and rideshares are also readily available."
                },
                {
                  title: "Medical Facilities",
                  content: "New York has world-class medical facilities, including NewYork-Presbyterian Hospital and Mount Sinai, both equipped to handle severe allergic reactions."
                }
              ]}
            />
            
            <AllergiesTable />
            
            <RelatedDestinations 
              destinations={[
                {
                  name: "London",
                  image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  link: "/destinations/london"
                },
                {
                  name: "Paris",
                  image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
                  link: "/destinations/paris"
                },
                {
                  name: "Barcelona",
                  image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
                  link: "/destinations/barcelona"
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewYork;
