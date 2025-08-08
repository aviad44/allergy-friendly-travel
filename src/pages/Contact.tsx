
import { MetaManager } from "@/components/MetaManager";
import { ContactForm } from "@/components/contact/ContactForm";
import { ServicesSection } from "@/components/contact/ServicesSection";
import { Toaster } from "@/components/ui/toaster";

export default function Contact() {
  // SEO metadata
  const pageTitle = "Contact Us | Allergy-Friendly Travel Support";
  const pageDescription = "Get in touch with our team for personalized allergy-friendly travel advice and assistance. We're here to help with your dietary restriction travel needs.";
  const pageKeywords = "contact, allergy-friendly travel, food allergies, travel assistance, dietary restrictions, gluten-free travel help";
  const canonicalUrl = "https://www.allergy-free-travel.com/contact";

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MetaManager 
        routeKey="/contact"
        dynamicData={{
          title: pageTitle,
          description: pageDescription,
        }}
      />

      {/* Hero Section - Styled like homepage */}
      <section className="relative py-12 md:py-16 bg-white">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
            <span className="text-sky-200 font-bold">Get in Touch</span>
            <span className="block mt-2 text-teal-300 font-bold">We're Here to Help</span>
          </h1>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto space-y-10 -mt-10 relative z-10 bg-white rounded-xl shadow-lg p-8">
          <ContactForm />
          <ServicesSection />
        </div>
      </main>
      
      <Toaster />
    </div>
  );
}
