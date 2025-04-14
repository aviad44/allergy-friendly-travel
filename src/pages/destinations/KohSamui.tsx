
import { DestinationReviews } from "@/components/reviews/DestinationReviews";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const KohSamui = () => {
  // SEO metadata
  const pageTitle = "Four Seasons Koh Samui – Allergy-Friendly & White Lotus Filming Location";
  const pageDescription = "Discover why Four Seasons Resort Koh Samui, filming location of The White Lotus Season 3, is ideal for guests with food allergies – including gluten-free, nut-free, and dairy-free travelers.";
  const pageKeywords = "Four Seasons Koh Samui, allergy-friendly hotel Thailand, gluten-free hotel Koh Samui, White Lotus filming hotel, travel with food allergies Thailand";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/koh-samui";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      <DestinationReviews destinationId="koh-samui" />
    </>
  );
};

export default KohSamui;
