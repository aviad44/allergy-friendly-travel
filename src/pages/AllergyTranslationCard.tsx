
import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from "@/constants/home";
import { AllergyCardGenerator } from '@/components/allergy-card/AllergyCardGenerator';
import { SocialShareButton } from '@/components/allergy-card/SocialShareButton';

const AllergyTranslationCard = () => {
  return (
    <>
      <Helmet>
        <title>Free Allergy Translation Card Generator | 50+ Languages | Food Allergy Travel Cards</title>
        <meta name="description" content="Create free allergy translation cards instantly. Download printable food allergy cards in 50+ languages for safe restaurant dining while traveling. No registration required." />
        <meta name="keywords" content="allergy translation card, food allergy card, allergy travel card, dining card, restaurant allergy card, travel with allergies, food allergy translation, allergy communication card, gluten free card, dairy free card" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="author" content="Allergy-Free Travel" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Free Allergy Translation Card Generator | 50+ Languages" />
        <meta property="og:description" content="Create free printable allergy translation cards in 50+ languages. Essential tool for travelers with food allergies. Download instantly." />
        <meta property="og:url" content="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta property="og:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Allergy Translation Card Generator" />
        <meta name="twitter:description" content="Create free printable allergy cards in 50+ languages for safe restaurant dining while traveling." />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />
        <meta name="twitter:creator" content="@AllergyFreeTravel" />

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
            "name": "Free Allergy Translation Card Generator",
            "alternateName": ["Food Allergy Card Generator", "Allergy Dining Card", "Travel Allergy Card"],
            "url": "https://www.allergy-free-travel.com/allergy-translation-card",
            "description": "Free online tool to create printable allergy translation cards in 50+ languages for safe restaurant dining while traveling",
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Food Allergy Management",
            "operatingSystem": "Web",
            "browserRequirements": "HTML5, CSS3, JavaScript",
            "isAccessibleForFree": true,
            "inLanguage": ["en", "es", "it", "fr", "th", "ja", "de", "pt", "he", "ar", "zh"],
            "publisher": {
              "@type": "Organization",
              "name": "Allergy-Free Travel",
              "url": "https://www.allergy-free-travel.com"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock"
            },
            "featureList": [
              "Multi-language allergy card generation",
              "Customizable allergen selection",
              "PDF and PNG download formats",
              "Printable wallet-size cards",
              "No registration required"
            ]
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
        {/* Breadcrumbs for SEO */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
          <ol className="flex space-x-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li>›</li>
            <li><a href="/tools" className="hover:text-primary">Travel Tools</a></li>
            <li>›</li>
            <li className="text-gray-700">Allergy Translation Card Generator</li>
          </ol>
        </nav>

        {/* HERO */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Free <strong>Allergy Translation Card</strong> Generator - 50+ Languages
          </h1>
          <p className="text-lg text-gray-600 mb-4 max-w-3xl mx-auto">
            Create printable <strong>food allergy cards</strong> in multiple languages for safe restaurant dining while traveling. 
            Download your custom <strong>allergy translation card</strong> instantly - no registration required.
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
        <section aria-label="Why use allergy translation cards" className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3 text-primary">🌍 50+ Languages</h2>
            <p className="text-gray-600">
              Generate <strong>allergy cards</strong> in Spanish, Italian, French, Thai, Japanese, German, Portuguese, Hebrew, Arabic, Chinese and more.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3 text-primary">🆓 100% Free</h2>
            <p className="text-gray-600">
              Create unlimited <strong>food allergy translation cards</strong>. Download as PDF or PNG, print wallet-size. No hidden fees or registration.
            </p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3 text-primary">🏥 Medical Grade</h2>
            <p className="text-gray-600">
              Professional <strong>allergy communication cards</strong> with clear cross-contamination warnings for safe restaurant dining.
            </p>
          </div>
        </section>

        {/* GENERATOR */}
        <section id="generator" className="border border-gray-200 rounded-lg p-6 mb-8 bg-gradient-to-br from-white to-gray-50">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            🏷️ Create Your <strong>Allergy Translation Card</strong> Now
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Select your allergens, choose a language, and get your free printable <strong>food allergy card</strong> in seconds
          </p>
          <AllergyCardGenerator />
        </section>

        {/* EXAMPLE CARD */}
        <section id="examples" className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            📋 <strong>Allergy Translation Card</strong> Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <article className="border-2 border-dashed border-teal-200 p-4 rounded-lg bg-teal-50">
              <h3 className="font-bold text-lg mb-2">English Food Allergy Card</h3>
              <p className="mb-2"><strong>Food Allergy Notice</strong></p>
              <p className="mb-2">
                I have a <strong>severe food allergy</strong> to: <em>milk, egg, wheat, peanut</em>. 
                Please avoid <strong>cross-contact</strong>. Use clean utensils, pans, oil, and surfaces. 
                Please confirm with the chef.
              </p>
              <p className="mb-0">Thank you for your help.</p>
            </article>
            <article className="border-2 border-dashed border-blue-200 p-4 rounded-lg bg-blue-50">
              <h3 className="font-bold text-lg mb-2">Spanish Allergy Card (Español)</h3>
              <p className="mb-2"><strong>Aviso de Alergia Alimentaria</strong></p>
              <p className="mb-2">
                Tengo una <strong>alergia alimentaria severa</strong> a: <em>leche, huevo, trigo, cacahuete</em>. 
                Por favor, evite la <strong>contaminación cruzada</strong>. Use utensilios, sartenes, aceite y superficies limpias.
              </p>
              <p className="mb-0">Gracias por su ayuda.</p>
            </article>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Wallet-size <strong>allergy cards</strong> (print & save to phone).</p>
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

        {/* LANGUAGES SECTION */}
        <section className="mb-8 bg-gradient-to-r from-blue-50 to-teal-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            🌐 Available Languages for <strong>Allergy Translation Cards</strong>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇪🇸</span>
              <p className="text-sm font-medium">Spanish</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇮🇹</span>
              <p className="text-sm font-medium">Italian</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇫🇷</span>
              <p className="text-sm font-medium">French</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇹🇭</span>
              <p className="text-sm font-medium">Thai</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇯🇵</span>
              <p className="text-sm font-medium">Japanese</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇩🇪</span>
              <p className="text-sm font-medium">German</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇵🇹</span>
              <p className="text-sm font-medium">Portuguese</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇮🇱</span>
              <p className="text-sm font-medium">Hebrew</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇸🇦</span>
              <p className="text-sm font-medium">Arabic</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇨🇳</span>
              <p className="text-sm font-medium">Chinese</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Create your <strong>food allergy card</strong> in any of these languages for safe international travel
          </p>
        </section>

        {/* RELATED RESOURCES */}
        <nav aria-label="Related travel resources" className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">🔗 More Allergy Travel Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/destinations" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">🏨 Allergy-Friendly Hotels</h4>
              <p className="text-sm text-gray-600">Find safe accommodation with allergy-friendly dining options worldwide</p>
            </a>
            <a href="/menu-scanner" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">📱 Menu Allergen Scanner</h4>
              <p className="text-sm text-gray-600">Scan restaurant menus to identify potential allergens instantly</p>
            </a>
            <a href="/destinations" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">🍽️ Restaurant Safety Tips</h4>
              <p className="text-sm text-gray-600">Essential guidelines for dining safely with food allergies while traveling</p>
            </a>
            <a href="/contact" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">💬 Allergy Travel Consultation</h4>
              <p className="text-sm text-gray-600">Get personalized advice for your allergy-friendly travel planning</p>
            </a>
          </div>
        </nav>
      </main>
    </>
  );
};

export default AllergyTranslationCard;
