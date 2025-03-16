
import { Helmet } from "react-helmet";
import { Footer } from "@/components/Footer";
import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactForm } from "@/components/contact/ContactForm";
import { ServicesSection } from "@/components/contact/ServicesSection";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Contact Us | Allergy Free Travel</title>
        <meta name="description" content="Get in touch with our team for personalized allergy-friendly travel advice and assistance." />
        <meta name="keywords" content="contact, allergy-friendly travel, food allergies, travel assistance, dietary restrictions" />
      </Helmet>

      <ContactHeader />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help make your allergy-friendly travel experience as smooth as possible.
            </p>
          </section>

          <ContactForm />

          <ServicesSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
