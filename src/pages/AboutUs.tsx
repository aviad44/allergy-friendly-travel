
import React from "react";

import { MetaManager } from "@/components/MetaManager";
import { StructuredData } from "@/components/StructuredData";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <MetaManager />

      <StructuredData
        type="article"
        title="About Allergy-Free Travel - Our Mission to Make Travel Safe for Everyone"
        description="Learn about the mission behind Allergy-Free Travel and how it uses real guest reviews mentioning food allergies to help travelers find safe places to stay."
        url="https://www.allergy-free-travel.com/about"
        image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
        author="Aviad Beit Halachmi"
        publishedDate="2024-01-01T00:00:00Z"
      />

      {/* Hero Image */}
      <div className="w-full h-[400px] relative">
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80"
          alt="Luxury hotel with swimming pool - allergy-friendly vacation destination"
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* About Us Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-6">
          <section>
            <h1 className="text-3xl font-display font-bold text-blue-800 mb-5">About Allergy-Free Travel</h1>
            <p className="text-base leading-relaxed text-gray-700">
              Welcome to Allergy-Free Travel, a resource for safe and enjoyable travel experiences for people with food allergies. My goal is to make travel accessible, stress-free, and inclusive by connecting travelers with hotels and restaurants that understand and accommodate dietary restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">Our Story</h2>
            <p className="text-base leading-relaxed text-gray-700">
              My name is Aviad Beit Halachmi. I'm a parent of a child with life-threatening allergies to peanuts and tree nuts, and I've spent countless hours researching and verifying hotels that can truly accommodate severe dietary restrictions. Finding a safe place to stay was always daunting and required extensive personal investigation before every trip. That's why I built Allergy-Free Travel: a place where other travelers with food allergies can find that same information without having to do all the digging themselves.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">Who I Am</h2>
            <p className="text-base leading-relaxed text-gray-700">
              I run this site on my own, not as a big company with a large team. I'm a parent and a food allergy traveler myself, and this project exists because I needed exactly what it offers and couldn't find it anywhere else. I'd rather be upfront about that than pretend to be something I'm not.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">What This Site Does</h2>
            <ul className="text-base leading-relaxed text-gray-700 space-y-3 list-disc pl-6">
              <li>
                <span className="font-medium">Real Guest Reviews Only</span> – Every hotel and restaurant listed here is based on an actual public review that specifically mentions a food allergy experience, not marketing copy from the hotel's own website. If the only review I can find is negative, that stays too.
              </li>
              <li>
                <span className="font-medium">Search by Allergy</span> – The search tool helps you find hotels and restaurants that match your specific allergy needs.
              </li>
              <li>
                <span className="font-medium">Free Allergy Translation Cards</span> – A free tool that generates a printable card explaining your allergies to restaurant and hotel staff in the local language.
              </li>
              <li>
                <span className="font-medium">Destination Guides</span> – Ongoing guides covering food allergy travel in destinations around the world.
              </li>
            </ul>
          </section>

          <section className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">How These Guides Are Built</h2>
            <p className="text-base leading-relaxed text-gray-700">
              I want to be honest about how the content here gets made. The destination and restaurant guides on this site are produced with the help of an automated research pipeline that I built and run: it searches real public reviews (from sources like Google) for ones that specifically mention food allergies, and uses AI to help organize and write up what it finds into a readable guide. Nothing is invented. If a hotel or restaurant doesn't have a real review mentioning allergies, it doesn't get listed as allergy-friendly. I review how the pipeline is performing and fix it when something looks wrong, but I don't personally fact-check every single sentence of every guide it produces, and I think you deserve to know that rather than assume every word here was typed by hand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-semibold text-blue-700 mb-3">My Commitment</h2>
            <p className="text-base leading-relaxed text-gray-700">
              I believe everyone deserves the joy of travel without fear. I keep working on this site, checking what's working and what isn't, because I still need it myself every time I book a trip for my own family.
            </p>
          </section>

          <section className="bg-amber-50 p-4 rounded-lg border border-amber-200">
            <h2 className="text-2xl font-display font-semibold text-amber-700 mb-3">Important Notice</h2>
            <p className="text-base leading-relaxed text-gray-700">
              The information and recommendations provided on this site are based on research, real guest reviews, and publicly available hotel policies. I do not independently certify or verify the allergy-friendly status of any hotel or restaurant. Travelers are responsible for conducting their own due diligence, communicating their allergy requirements directly with hotels and restaurants, and making informed decisions. Allergy-Free Travel assumes no liability for any issues that may arise from hotel stays or dining experiences.
            </p>
          </section>

          <section className="text-center pt-4">
            <p className="text-lg font-medium text-blue-700">
              I hope this makes your next trip a little safer and a lot less stressful.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
