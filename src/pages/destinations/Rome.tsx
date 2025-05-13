
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { useLocation } from 'react-router-dom';

const Rome = () => {
  const location = useLocation();
  const currentPage = location.pathname;
  
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Top 5 Allergy-Friendly Hotels in Rome – Safe & Comfortable Stays</title>
        <meta name="description" content="Discover the top allergy-friendly hotels in Rome. Safe accommodations with real guest reviews and personalized dining options." />
        <meta name="keywords" content="allergy-friendly hotels Rome, best hotels for food allergies, Rome gluten-free hotels, safe hotels for food allergies, Rome travel allergy-safe" />
        
        <link rel="canonical" href={`https://www.allergy-free-travel.com${currentPage}`} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://www.allergy-free-travel.com${currentPage}`} />
        <meta property="og:title" content="Top 5 Allergy-Friendly Hotels in Rome – Safe & Comfortable Stays" />
        <meta property="og:description" content="Discover the top allergy-friendly hotels in Rome. Safe accommodations with real guest reviews and personalized dining options." />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/decde333-fd7d-4147-8bad-637fbf08028c.png" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://www.allergy-free-travel.com${currentPage}`} />
        <meta property="twitter:title" content="Top 5 Allergy-Friendly Hotels in Rome – Safe & Comfortable Stays" />
        <meta property="twitter:description" content="Discover the top allergy-friendly hotels in Rome. Safe accommodations with real guest reviews and personalized dining options." />
        <meta property="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/decde333-fd7d-4147-8bad-637fbf08028c.png" />
      </Helmet>

      <DestinationReviews destinationId="rome" />
    </div>
  );
};

export default Rome;
