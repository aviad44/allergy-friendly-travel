
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HOME_CONTENT } from "@/constants/home";
import { AllergyCardGenerator } from '@/components/allergy-card/AllergyCardGenerator';
import { SocialShareButton } from '@/components/allergy-card/SocialShareButton';

// Single source of truth for the language count so the page copy can never
// drift from what the generator actually supports again — this page used to
// say "50+ languages" everywhere while the tool itself supported 28. Real
// count, not a round marketing number, matters here: AI answer engines
// (ChatGPT, Perplexity, Google AI Overviews) cross-check claims like this
// against the live tool, and an inflated number is exactly the kind of thing
// that erodes the trust signal GEO depends on.
const SUPPORTED_LANGUAGE_COUNT = 28;

const AllergyTranslationCard = () => {
  return (
    <>
      <Helmet>
        <title>Free Allergy Translation Card Generator | {SUPPORTED_LANGUAGE_COUNT} Languages | Food Allergy Travel Cards</title>
        <meta name="description" content={`Create free allergy translation cards instantly. Download printable food allergy cards in ${SUPPORTED_LANGUAGE_COUNT} languages for safe restaurant dining while traveling. No registration required.`} />
        <meta name="keywords" content="allergy translation card, food allergy card, allergy travel card, dining card, restaurant allergy card, travel with allergies, food allergy translation, allergy communication card, gluten free card, dairy free card" />
        <link rel="canonical" href="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <meta name="author" content="Allergy-Free Travel" />
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Free Allergy Translation Card Generator | ${SUPPORTED_LANGUAGE_COUNT} Languages`} />
        <meta property="og:description" content={`Create free printable allergy translation cards in ${SUPPORTED_LANGUAGE_COUNT} languages. Essential tool for travelers with food allergies. Download instantly.`} />
        <meta property="og:url" content="https://www.allergy-free-travel.com/allergy-translation-card" />
        <meta property="og:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Allergy Translation Card Generator" />
        <meta name="twitter:description" content={`Create free printable allergy cards in ${SUPPORTED_LANGUAGE_COUNT} languages for safe restaurant dining while traveling.`} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/assets/og/allergy-translation-card.png" />
        <meta name="twitter:creator" content="@AllergyFreeTravel" />

        {/* Hreflang — only the URLs that actually exist. Per-language sub-pages
            (e.g. /allergy-translation-card/spanish) were listed here before but
            were never built, so every one of those hreflang entries pointed at
            a 404. Broken hreflang doesn't just fail silently, Search Console
            flags it as an error and it undermines confidence in the rest of
            the page's signals. */}
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card" hrefLang="x-default" />
        <link rel="alternate" href="https://www.allergy-free-travel.com/allergy-translation-card" hrefLang="en" />

        {/* JSON-LD: WebApplication */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free Allergy Translation Card Generator",
            "alternateName": ["Food Allergy Card Generator", "Allergy Dining Card", "Travel Allergy Card"],
            "url": "https://www.allergy-free-travel.com/allergy-translation-card",
            "description": `Free online tool to create printable allergy translation cards in ${SUPPORTED_LANGUAGE_COUNT} languages for safe restaurant dining while traveling`,
            "applicationCategory": "HealthApplication",
            "applicationSubCategory": "Food Allergy Management",
            "operatingSystem": "Web",
            "browserRequirements": "HTML5, CSS3, JavaScript",
            "isAccessibleForFree": true,
            "inLanguage": ["en", "es", "fr", "de", "it", "ja", "ko", "zh", "ru", "ar", "hi", "pt", "nl", "tr", "pl", "vi", "th", "sv", "da", "fi", "no", "el", "he", "cs", "hu", "ka", "ro", "sk"],
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

        {/* JSON-LD: BreadcrumbList — matches the visual breadcrumb below,
            gives Google and AI crawlers an explicit, machine-readable
            statement of where this page sits in the site. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.allergy-free-travel.com/" },
              { "@type": "ListItem", "position": 2, "name": "Allergy Translation Card Generator", "item": "https://www.allergy-free-travel.com/allergy-translation-card" }
            ]
          })}
        </script>

        {/* JSON-LD: FAQPage — kept word-for-word identical to the visible FAQ
            section below. Google's structured-data guidelines require the
            two to match; a mismatch (questions in the markup that aren't
            actually shown to visitors) can get a page disqualified from FAQ
            rich results, which is what the previous version of this block
            had, three of its six questions never appeared on the page. */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity":[
              {"@type":"Question","name":"What is an allergy translation card?",
               "acceptedAnswer":{"@type":"Answer","text":"A small card that clearly explains your food allergies and cross-contamination requests in the local language, so restaurant staff can understand your needs."}},
              {"@type":"Question","name":"Is the card free?",
               "acceptedAnswer":{"@type":"Answer","text":"Yes. This tool lets you generate and download a card for free for personal use."}},
              {"@type":"Question","name":"Which languages are supported?",
               "acceptedAnswer":{"@type":"Answer","text":`${SUPPORTED_LANGUAGE_COUNT} languages, including Spanish, French, German, Italian, Japanese, Chinese, Arabic, Hebrew and Portuguese, with more being added over time.`}},
              {"@type":"Question","name":"Do restaurants accept these cards?",
               "acceptedAnswer":{"@type":"Answer","text":"Many do, and staff often appreciate the clarity. Still, always confirm verbally and ask to show the note to the chef."}},
              {"@type":"Question","name":"Will this prevent cross-contact?",
               "acceptedAnswer":{"@type":"Answer","text":"It helps you request it clearly, but kitchens differ. Ask for clean utensils, pans, oil, boards and surfaces."}},
              {"@type":"Question","name":"Is this medical advice?",
               "acceptedAnswer":{"@type":"Answer","text":"No. Carry your medications and follow your doctor's guidance."}},
              {"@type":"Question","name":"Can I add custom notes?",
               "acceptedAnswer":{"@type":"Answer","text":"Yes, add specific ingredients or preparation steps you need the kitchen to avoid."}}
            ]
          })}
        </script>
      </Helmet>
      
      <main id="allergy-translation-card" className="container mx-auto px-4 py-6 max-w-5xl">
        {/* Breadcrumbs for SEO — matches the BreadcrumbList JSON-LD above.
            No "Travel Tools" hub page exists on this site, so that middle
            level (and its dead /tools link) was removed rather than left
            pointing at a 404. */}
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-500">
          <ol className="flex space-x-2">
            <li><a href="/" className="hover:text-primary">Home</a></li>
            <li>›</li>
            <li className="text-gray-700">Allergy Translation Card Generator</li>
          </ol>
        </nav>

        {/* HERO */}
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Free <strong>Allergy Translation Card</strong> Generator - {SUPPORTED_LANGUAGE_COUNT} Languages
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
            <h2 className="text-xl font-semibold mb-3 text-primary">🌍 {SUPPORTED_LANGUAGE_COUNT} Languages</h2>
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

        {/* FAQ — kept in sync with the FAQPage JSON-LD above; Google's
            structured-data guidelines require the two to match, a mismatch
            can get a page disqualified from FAQ rich results. */}
        <section id="faq" className="mb-6">
          <h2 className="text-xl font-semibold mb-2">FAQ</h2>
          <div className="space-y-2">
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">What is an allergy translation card?</summary>
              <p className="mt-2 text-gray-600">
                A small card that clearly explains your food allergies and cross-contamination requests in the local language, so restaurant staff can understand your needs.
              </p>
            </details>
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Is the card free?</summary>
              <p className="mt-2 text-gray-600">
                Yes. This tool lets you generate and download a card for free for personal use.
              </p>
            </details>
            <details className="border border-gray-200 rounded p-3">
              <summary className="cursor-pointer font-medium">Which languages are supported?</summary>
              <p className="mt-2 text-gray-600">
                {SUPPORTED_LANGUAGE_COUNT} languages, including Spanish, French, German, Italian, Japanese, Chinese, Arabic, Hebrew and Portuguese, with more being added over time.
              </p>
            </details>
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
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇷🇺</span>
              <p className="text-sm font-medium">Russian</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇰🇷</span>
              <p className="text-sm font-medium">Korean</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇳🇱</span>
              <p className="text-sm font-medium">Dutch</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇹🇷</span>
              <p className="text-sm font-medium">Turkish</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇵🇱</span>
              <p className="text-sm font-medium">Polish</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇻🇳</span>
              <p className="text-sm font-medium">Vietnamese</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇮🇳</span>
              <p className="text-sm font-medium">Hindi</p>
            </div>
            <div className="p-3 bg-white rounded-lg shadow-sm">
              <span className="text-2xl">🇬🇷</span>
              <p className="text-sm font-medium">Greek</p>
            </div>
          </div>
          <p className="text-center text-gray-600 mt-4">
            Shown above: 18 of the {SUPPORTED_LANGUAGE_COUNT} languages supported. The full list, including Swedish, Danish, Finnish, Norwegian, Czech, Hungarian, Georgian, Romanian and Slovak, is available in the generator below.
          </p>
        </section>

        {/* RELATED RESOURCES */}
        <nav aria-label="Related travel resources" className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-center">🔗 More Allergy Travel Resources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/destinations" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">🏨 Allergy-Friendly Hotels</h4>
              <p className="text-sm text-gray-600">Find safe accommodation with allergy-friendly dining options worldwide</p>
            </Link>
            <Link to="/reviews" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">⭐ Traveler Reviews</h4>
              <p className="text-sm text-gray-600">Read real experiences from travelers managing food allergies abroad</p>
            </Link>
            <Link to="/restaurants" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">🍽️ Restaurant Safety Tips</h4>
              <p className="text-sm text-gray-600">Essential guidelines for dining safely with food allergies while traveling</p>
            </Link>
            <Link to="/contact" className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <h4 className="font-semibold text-primary mb-2">💬 Allergy Travel Consultation</h4>
              <p className="text-sm text-gray-600">Get personalized advice for your allergy-friendly travel planning</p>
            </Link>
          </div>
        </nav>
      </main>
    </>
  );
};

export default AllergyTranslationCard;
