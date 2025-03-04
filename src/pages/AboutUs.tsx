
import React from "react";
import { Helmet } from "react-helmet";
import { MainMenu } from "@/components/MainMenu";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Helmet>
        <title>About Us | Allergy-Friendly Hotel Finder</title>
        <meta name="description" content="Learn about our mission to make travel accessible and safe for individuals with food allergies." />
      </Helmet>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="text-2xl font-display font-bold text-blue-700 hover:text-blue-800 transition-colors">
            Allergy Free Travel
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Image */}
      <div className="w-full h-[400px] relative mt-16">
        <img 
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80" 
          alt="Beautiful summer resort hotel with beach view - allergy-friendly vacation"
          className="w-full h-full object-cover"
        />
      </div>

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-3xl font-display font-bold text-blue-800 mb-5">About Us</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Welcome to the Allergy-Friendly Hotel Finder, your trusted resource for safe and enjoyable travel experiences for individuals with food allergies. Our mission is to make travel accessible, stress-free, and inclusive by connecting travelers with hotels that understand and accommodate dietary restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">Our Story</h2>
            <p className="text-gray-700 leading-relaxed">
              As a parent of a child with life-threatening allergies to peanuts and tree nuts, I have spent countless hours researching and verifying hotels that can truly accommodate severe dietary restrictions. The challenge of finding a safe place to stay was always daunting, requiring extensive personal investigation. Now, thanks to comprehensive AI-powered research and analysis, I have created this platform—a centralized hub where travelers can quickly and accurately find allergy-friendly hotels from all over the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">Who We Are</h2>
            <p className="text-gray-700 leading-relaxed">
              We are a dedicated team of travel enthusiasts, parents, and food allergy advocates who know firsthand the challenges of finding allergy-friendly accommodations. Our platform is designed to empower travelers with reliable information, ensuring peace of mind when booking a stay anywhere in the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">What We Do</h2>
            <ul className="text-gray-700 space-y-3 list-disc pl-6">
              <li>
                <span className="font-medium">Curate Allergy-Friendly Hotels</span> – We carefully research and recommend hotels that provide allergy-conscious services, including allergen-free menu options, special kitchen protocols, and staff trained to handle food allergies.
              </li>
              <li>
                <span className="font-medium">AI-Powered Search</span> – Our smart search tool helps travelers find hotels tailored to their specific allergy needs, ensuring a personalized and safe experience.
              </li>
              <li>
                <span className="font-medium">User Reviews & Ratings</span> – We encourage our community to share their experiences, making it easier for others to choose the best hotels for their needs.
              </li>
              <li>
                <span className="font-medium">Travel Guides & Tips</span> – Our blog offers destination reviews, travel tips, and expert advice to help allergy-conscious travelers navigate their journeys with confidence.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed">
              We believe that everyone deserves the joy of travel without fear. By working closely with hotels and listening to our community, we continuously improve our platform to provide the most accurate and up-to-date recommendations.
            </p>
          </section>

          <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h2 className="text-2xl font-display font-semibold text-amber-700 mb-3">Important Notice</h2>
            <p className="text-gray-700 leading-relaxed">
              The information and recommendations provided on our platform are based on research, user reviews, and publicly available hotel policies. However, we do not independently certify or verify the allergy-friendly status of any hotel. Travelers are responsible for conducting their own due diligence, communicating their allergy requirements directly with hotels, and making informed decisions. The Allergy-Friendly Hotel Finder assumes no liability for any issues that may arise from hotel stays.
            </p>
          </section>

          <section className="text-center pt-4">
            <p className="text-blue-700 text-lg font-medium">
              Join us in making travel safer and more accessible for all. Find your next allergy-friendly stay with confidence!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
