import React from 'react';
import { DestinationCard } from './DestinationCard';
import { DESTINATION_IMAGES } from '@/constants/destinations';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  path: string;
}

const destinations: Destination[] = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    image: DESTINATION_IMAGES.london,
    description: "Discover allergen-friendly accommodations in the heart of England's capital.",
    path: "/destinations/london"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: DESTINATION_IMAGES.paris,
    description: "Enjoy the city of lights with peace of mind at these allergy-aware hotels.",
    path: "/destinations/paris"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    image: DESTINATION_IMAGES.barcelona,
    description: "Experience Catalan hospitality with allergen-conscious accommodations.",
    path: "/destinations/barcelona"
  },
  {
    id: "newyork",
    name: "New York",
    country: "United States",
    image: DESTINATION_IMAGES["new-york"],
    description: "Discover the top allergy-friendly hotels in the Big Apple for a safe and comfortable stay.",
    path: "/destinations/newyork"
  },
  {
    id: "portugal",
    name: "Portugal",
    country: "Portugal",
    image: DESTINATION_IMAGES.portugal,
    description: "Family and couple-friendly allergy-aware hotels across Lisbon, the Algarve and Porto.",
    path: "/destinations/portugal"
  },
  {
    id: "cyprus",
    name: "Cyprus",
    country: "Cyprus",
    image: DESTINATION_IMAGES.cyprus,
    description: "Discover the beauty of Cyprus with peace of mind at these allergy-friendly hotels.",
    path: "/destinations/cyprus"
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    country: "UAE",
    image: DESTINATION_IMAGES["abu-dhabi"],
    description: "Luxury accommodation with allergy considerations in the heart of the UAE.",
    path: "/destinations/abudhabi"
  },
  {
    id: "crete",
    name: "Crete",
    country: "Greece",
    image: DESTINATION_IMAGES.crete,
    description: "Relax on the beautiful Greek island with allergy-aware accommodations.",
    path: "/destinations/crete"
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    image: DESTINATION_IMAGES.tokyo,
    description: "Navigate Tokyo's culinary scene safely with these allergy-friendly hotels.",
    path: "/destinations/tokyo"
  },
  {
    id: "thailand",
    name: "Thailand",
    country: "Thailand",
    image: DESTINATION_IMAGES.thailand,
    description: "Explore exotic Thailand with peace of mind at these allergy-friendly accommodations.",
    path: "/destinations/thailand"
  },
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    image: DESTINATION_IMAGES["swiss-alps"] || "https://images.unsplash.com/photo-1531400158697-004a3a06fd3f?auto=format&fit=crop&w=800&q=80",
    description: "Enjoy mountain vacations with allergy-safe accommodations in the majestic Swiss Alps.",
    path: "/destinations/swiss-alps"
  },
  {
    id: "hotel-chains",
    name: "Top Allergy-Friendly Hotel Chains",
    country: "Worldwide",
    image: "photo-1571896349842-33c89424de2d", // Four Seasons hotel image
    description: "Global hotel chains with exceptional food allergy and celiac-friendly policies.",
    path: "/destinations/hotel-chains"
  }
];

export const DestinationsList = () => {
  return (
    <section className="py-8 md:py-12 container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            {...destination}
            image={DESTINATION_IMAGES[destination.id as keyof typeof DESTINATION_IMAGES] || ''}
          />
        ))}
      </div>
    </section>
  );
};
