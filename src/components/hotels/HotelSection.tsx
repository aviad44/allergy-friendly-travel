import React from 'react';
import { HotelCard } from './HotelCard';

const HotelSection = () => {
  const hotels = [
    {
      id: 1,
      name: 'Le Petit Palace Hotel',
      city: 'Paris',
      country: 'France',
      imageUrl: 'https://example.com/le-petit-palace.jpg',
      rating: 4.5,
      reviews: 120,
      allergyInfo: 'Gluten-free options, dairy-free alternatives',
    },
    {
      id: 2,
      name: 'The Green Sprout Inn',
      city: 'London',
      country: 'UK',
      imageUrl: 'https://example.com/green-sprout-inn.jpg',
      rating: 4.2,
      reviews: 95,
      allergyInfo: 'Nut-free environment, vegan options',
    },
    {
      id: 3,
      name: 'Mediterranean Oasis Resort',
      city: 'Crete',
      country: 'Greece',
      imageUrl: 'https://example.com/mediterranean-oasis.jpg',
      rating: 4.8,
      reviews: 150,
      allergyInfo: 'Shellfish-free zone, organic ingredients',
    },
    {
      id: 4,
      name: 'Barcelona Comfort Suites',
      city: 'Barcelona',
      country: 'Spain',
      imageUrl: 'https://example.com/barcelona-suites.jpg',
      rating: 4.0,
      reviews: 80,
      allergyInfo: 'Egg-free meals, soy-free products',
    },
    {
      id: 5,
      name: 'Ayia Napa Allergy-Safe Hotel',
      city: 'Ayia Napa',
      country: 'Cyprus',
      imageUrl: 'https://example.com/ayia-napa-hotel.jpg',
      rating: 4.6,
      reviews: 110,
      allergyInfo: 'Customizable allergy menus, dedicated allergy staff',
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">
          Allergy-Friendly Hotels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HotelSection;
