
import React from 'react';
import { Helmet } from 'react-helmet';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';

const AthensGlutenFree = () => {
  return (
    <>
      <Helmet>
        <title>Top 10 Gluten-Free Restaurants in Athens for Celiacs (2025 Guide)</title>
        <meta name="description" content="Discover the top 10 gluten-free restaurants in Athens, Greece — safe for celiacs. Includes fully GF spots, menus, reviews & allergy-safe tips." />
        <meta name="keywords" content="gluten-free Athens, celiac restaurants Athens, safe gluten-free dining, gluten-free Greek food, allergy-friendly restaurants Athens 2025" />
        <meta property="og:title" content="Top 10 Gluten-Free Restaurants in Athens for Celiacs (2025)" />
        <meta property="og:description" content="Discover the top 10 gluten-free restaurants in Athens, Greece — safe for celiacs. Includes fully GF spots, menus, reviews & allergy-safe tips." />
        <meta property="og:image" content="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.allergy-free-travel.com/destinations/athens" />
      </Helmet>
      <DestinationReviews destinationId="athens" />
    </>
  );
};

export default AthensGlutenFree;
