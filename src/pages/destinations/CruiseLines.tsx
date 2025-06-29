
import React from 'react';
import { SocialTags } from "@/components/SocialTags";
import { CanonicalTags } from "@/components/CanonicalTags";
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';
import { CruiseHero } from '@/components/cruise/CruiseHero';
import { CruiseIntro } from '@/components/cruise/CruiseIntro';
import { ComparisonTable } from '@/components/cruise/ComparisonTable';
import { CruiseDetails } from '@/components/cruise/CruiseDetails';
import { CruiseLine } from '@/components/cruise/types';

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
    features: ["Online pre-cruise allergy form", "Dedicated allergy menu", "Staff trained to handle common allergens", "Allergy orders marked and monitored from kitchen to table", "Onboard medical team familiar with anaphylaxis protocols"]
  }, {
    name: "Celebrity Cruises",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Great gluten-free options",
    destinations: "Worldwide (Asia, Europe, Caribbean)",
    quote: "As a celiac, I was blown away by Celebrity. They served gluten-free pasta, pizza, even desserts. The staff double-checked every plate before serving.",
    author: "Jon L., UK",
    features: ["Dedicated gluten-free, vegetarian, and vegan menus", "\"Special Needs\" form required pre-cruise", "Trained staff and chefs in dietary restrictions", "Food labeled at buffets and main dining rooms"]
  }, {
    name: "Royal Caribbean",
    rating: 4,
    familyFriendly: true,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Large fleet, consistent allergy support",
    destinations: "Global (Europe, Caribbean, Asia, Australia)",
    quote: "I have a tree nut allergy. The staff was accommodating and made sure I felt safe. Even at the buffet, they had signs and offered to make food fresh.",
    author: "Liam S., Canada",
    features: ["Dietary needs noted at time of booking and during check-in", "Allergy icons on menus", "Option to speak directly with chef or dining manager", "Offers gluten-free bread, pasta, and desserts upon request"]
  }, {
    name: "Holland America",
    rating: 4,
    familyFriendly: false,
    buffetLabels: true,
    chefConsult: true,
    notableFeature: "Personalized dining plans",
    destinations: "Alaska, Northern Europe, South Pacific, Mediterranean",
    quote: "The staff was respectful, patient, and proactive. I felt like I could finally relax while eating on vacation.",
    author: "Andrea W., Australia (shellfish allergy)",
    features: ["Personalized meal planning", "Menus with allergy info available at dining rooms", "Servers alert kitchen of allergy guests", "Gluten-free and low-sodium meals available daily"]
  }, {
    name: "MSC Cruises",
    rating: 3,
    familyFriendly: true,
    buffetLabels: 'partial',
    chefConsult: true,
    notableFeature: "Good value, moderate allergy handling",
    destinations: "Europe, Middle East, Caribbean, Asia",
    quote: "They managed my gluten and dairy intolerance pretty well, but you do need to remind staff sometimes. Best to eat at the main dining room instead of the buffet.",
    author: "Noa E., Israel",
    features: ["Pre-cruise dietary form available", "Can accommodate gluten-free and lactose-free diets", "Some limitations on more complex allergy combinations", "Buffets include ingredient tags (though guests report inconsistency)"]
  }
];

const CruiseLines = () => {
  const pageTitle = "Top Cruise Lines for Food Allergies (2025) – Real Reviews & Rankings";
  const pageDescription = "Explore the best cruise lines for travelers with food allergies. Real reviews, expert rankings, and top safety practices for celiac, nut, dairy, and gluten sensitivities.";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/cruise-lines";
  const imageUrl = DESTINATION_OG_IMAGES['cruise-lines'];

  return (
    <div className="min-h-screen bg-background pb-12">
      <CanonicalTags canonicalUrl={canonicalUrl} />
      <SocialTags
        title={pageTitle}
        description={pageDescription}
        imageUrl={imageUrl}
        url={canonicalUrl}
        type="article"
      />

      <CruiseHero baseUrl={canonicalUrl} />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl -mt-10 relative z-10">
        <CruiseIntro />
        <ComparisonTable cruiseLines={cruiseLines} />
        <CruiseDetails cruiseLines={cruiseLines} />
      </div>
    </div>
  );
};

export default CruiseLines;
