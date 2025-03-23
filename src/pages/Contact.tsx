import { Helmet } from "react-helmet";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ServicesSection } from "@/components/contact/ServicesSection";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";

export default function Contact() {
  // SEO metadata
  const pageTitle = "Contact Us | Allergy-Friendly Travel Support";
  const pageDescription = "Get in touch with our team for personalized allergy-friendly travel advice and assistance. We're here to help with your dietary restriction travel needs.";
  const pageKeywords = "contact, allergy-friendly travel, food allergies, travel assistance, dietary restrictions, gluten-free travel help";
  const canonicalUrl = "https://www.allergy-free-travel.com/contact";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" />
      </Helmet>

      <ContactHeader />

      {/* Hero Section - Styled like homepage */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-black/75 to-black/90">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-sky-200 font-bold">Get in Touch</span>
            <span className="block mt-2 text-teal-300 font-bold">We're Here to Help</span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl mx-auto">
            Our team of allergy-friendly travel experts is ready to assist with your questions and travel needs
          </p>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto space-y-10 -mt-10 relative z-10 bg-white rounded-xl shadow-lg p-8">
          <ContactForm />
          <ServicesSection />
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}
