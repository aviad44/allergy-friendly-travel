
import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from "@/constants/home";
import { AllergyCardGenerator } from '@/components/allergy-card/AllergyCardGenerator';
import { SocialShareButton } from '@/components/allergy-card/SocialShareButton';

const AllergyTranslationCard = () => {
  return (
    <>
      <Helmet>
        <title>Allergy Translation Card – Free Generator (50+ Languages) | Allergy-Free Travel</title>
        <meta name="description" content="Create a free food allergy translation card in 30 seconds. Choose your allergens, pick a language, download or print. Safer dining while traveling." />
        <link rel="canonical" href="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Allergy Translation Card – Free Generator" />
        <meta property="og:description" content="Create a free food allergy translation card in 30 seconds. Choose allergens, pick a language, download/print." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta property="og:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Allergy Translation Card – Free Generator" />
        <meta name="twitter:description" content="Free allergy translation card in 50+ languages. Download or print." />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />

        {/* Hreflang */}
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card" hrefLang="x-default" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card" hrefLang="en" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card/spanish" hrefLang="es" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card/italian" hrefLang="it" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card/french" hrefLang="fr" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card/thai" hrefLang="th" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card/japanese" hrefLang="ja" />

        {/* JSON-LD: WebApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Allergy Translation Card Generator",
            "url": "https://www.allergy-free-travel.com/allergy-translation-card",
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web",
            "isAccessibleForFree": true,
            "publisher": {"@type":"Organization","name":"Allergy-Free Travel"},
            "offers": {"@type":"Offer","price":"0","priceCurrency":"USD"}
          })}
        </script>

        {/* JSON-LD: FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity":[
              {"@type":"Question","name":"What is an allergy translation card?",
               "acceptedAnswer":{"@type":"Answer","text":"A small card that clearly explains your food allergies and cross-contamination requests in the local language so restaurant staff can understand your needs."}},
              {"@type":"Question","name":"Is the card free?",
               "acceptedAnswer":{"@type":"Answer","text":"Yes. This tool lets you generate and download a card for free for personal use."}},
              {"@type":"Question","name":"Do restaurants accept these cards?",
               "acceptedAnswer":{"@type":"Answer","text":"Many restaurants find them helpful, but acceptance is not guaranteed. Always confirm verbally and ask staff to show the note to the chef."}},
              {"@type":"Question","name":"Does this replace medical advice or carrying epinephrine?",
               "acceptedAnswer":{"@type":"Answer","text":"No. The card supports communication only. Always follow your doctor's advice and carry your prescribed medications."}},
              {"@type":"Question","name":"Which languages are supported?",
               "acceptedAnswer":{"@type":"Answer","text":"We're adding 50+ languages. Start with Spanish, Italian, French, Thai and Japanese, with more coming soon."}},
              {"@type":"Question","name":"Can I customize allergens and notes?",
               "acceptedAnswer":{"@type":"Answer","text":"Yes. Select your allergens and add custom notes (e.g., about cross-contact or specific ingredients)."}}
            ]
          })}
        </script>
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-blue-800">Allergy Translation Card Generator</h1>
          <SocialShareButton />
        </div>
        
        <div className="mb-10">
          <p className="text-lg text-blue-700 mb-4">
            Traveling with food allergies? Create a free translation card to stay safe and understood anywhere in the world.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">How it works:</h2>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Select your food allergies from the common list or add custom ones</li>
              <li>Choose your source and target languages</li>
              <li>Preview your personalized translation card</li>
              <li>Download or share your card for your travels</li>
            </ol>
          </div>
        </div>
        
        <AllergyCardGenerator />
      </div>
    </>
  );
};

export default AllergyTranslationCard;
