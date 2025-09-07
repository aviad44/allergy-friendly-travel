
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
      
      <main id="allergy-translation-card" className="container mx-auto px-4 py-6 max-w-5xl">
        {/* HERO */}
        <header className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Create Your <strong>Allergy Translation Card</strong> (Free)
          </h1>
          <p className="text-gray-600 mb-4">
            Choose your allergens, pick a language, and download or print a clear card you can show at restaurants when traveling.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="#generator" className="px-4 py-3 bg-primary text-white rounded-lg text-decoration-none hover:bg-primary/90">
              Generate my card
            </a>
            <a href="#examples" className="px-4 py-3 border border-primary text-primary rounded-lg text-decoration-none hover:bg-primary/10">
              See examples
            </a>
          </div>
        </header>

        {/* TRUST / BENEFITS */}
        <section aria-label="Why use this card" className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Clear, polite, and specific</h2>
            <p className="text-gray-600">
              Communicate your food allergies and cross-contact requirements in the local language. Keep a printed copy and a phone image.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Free and customizable</h2>
            <p className="text-gray-600">
              Select common allergens or add your own notes. Download as PDF/PNG and print at wallet size.
            </p>
          </div>
        </section>

        {/* GENERATOR */}
        <section id="generator" className="border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Allergy Card Generator</h2>
          <AllergyCardGenerator />
        </section>

        {/* EXAMPLE CARD */}
        <section id="examples" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Example: English Allergy Card (Preview)</h2>
          <article className="border-2 border-dashed border-teal-200 p-3 rounded-lg bg-teal-50">
            <p className="mb-2"><strong>Food Allergy Notice</strong></p>
            <p className="mb-2">
              I have a <strong>severe food allergy</strong> to: <em>milk, egg, wheat, peanut</em>. 
              Please avoid <strong>cross-contact</strong>. Use clean utensils, pans, oil, and surfaces. 
              Please confirm with the chef.
            </p>
            <p className="mb-0">Thank you for your help.</p>
          </article>
          <div className="mt-3">
            <p className="text-sm text-gray-500">Wallet-size example (print & keep a phone photo).</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">FAQ</h2>
          <div className="space-y-2">
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Do restaurants accept these cards?</summary>
              <p className="mt-2 text-gray-600">
                Many do, and staff often appreciate the clarity. Still, always confirm verbally and ask to show the note to the chef.
              </p>
            </details>
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Will this prevent cross-contact?</summary>
              <p className="mt-2 text-gray-600">
                It helps you request it clearly, but kitchens differ. Ask for clean utensils, pans, oil, boards and surfaces.
              </p>
            </details>
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Is this medical advice?</summary>
              <p className="mt-2 text-gray-600">
                No. Carry your medications and follow your doctor's guidance.
              </p>
            </details>
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Can I add custom notes?</summary>
              <p className="mt-2 text-gray-600">
                Yes—add specific ingredients or preparation steps you need the kitchen to avoid.
              </p>
            </details>
          </div>
        </section>

        {/* RELATED RESOURCES */}
        <nav aria-label="Related resources" className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Related resources</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <a href="/destinations" className="text-primary hover:underline">
                Allergy-friendly hotel guides by destination
              </a>
            </li>
            <li>
              <a href="/destinations" className="text-primary hover:underline">
                Restaurant safety tips for travelers with food allergies
              </a>
            </li>
          </ul>
        </nav>
      </main>
    </>
  );
};

export default AllergyTranslationCard;
