import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const KohSamui = () => {
  // SEO metadata
  const pageTitle = "Four Seasons Koh Samui – Allergy-Friendly & White Lotus Filming Location";
  const pageDescription = "Discover why Four Seasons Resort Koh Samui, filming location of The White Lotus Season 3, is ideal for guests with food allergies – including gluten-free, nut-free, and dairy-free travelers. Includes allergy card translation in Thai.";
  const pageKeywords = "Four Seasons Koh Samui, allergy-friendly hotel Thailand, gluten-free hotel Koh Samui, White Lotus filming hotel, travel with food allergies Thailand";
  const canonicalUrl = "https://www.allergy-free-travel.com/destinations/koh-samui";
  return <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative h-60 sm:h-72 md:h-96 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80" alt="Tropical beach in Koh Samui with turquoise waters and white sand" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <Link to="/destinations" className="inline-flex items-center text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to all destinations
              </Link>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">The "White Lotus" Resort in Thailand That's Truly Food Allergy-Friendly</h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-5 sm:p-8">
            <div className="prose prose-blue max-w-none">
              <p className="text-lg text-gray-700 mb-8">
                Dreaming of the lush tropical setting from <em>The White Lotus</em> Season 3? You're not alone. And if you or a family member has food allergies, you'll be thrilled to learn that the actual filming location – the <strong>Four Seasons Resort Koh Samui</strong> in Thailand – is not only luxurious, but also <strong>well-equipped to handle food allergies with exceptional care</strong>.
              </p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">📍 Quick Hotel Overview</h2>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li><strong>Hotel Name:</strong> Four Seasons Resort Koh Samui</li>
                <li><strong>Location:</strong> Koh Samui, Thailand – Private beach, hilltop villas</li>
                <li><strong>Star Rating:</strong> ⭐⭐⭐⭐⭐</li>
                <li><strong>Food Allergy Accommodation:</strong> Celiac (gluten-free), dairy-free, nut-free, egg-free, soy-free, vegan</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">🧑‍🍳 Allergy-Conscious Dining at Four Seasons Koh Samui</h2>
              <p className="mb-4">The resort offers a high-end culinary experience with strict safety standards for guests with food sensitivities:</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li>✅ Dedicated allergen-free food preparation on request</li>
                <li>✅ Trained culinary staff familiar with allergy protocols</li>
                <li>✅ Pre-arrival dietary consultations</li>
                <li>✅ Clearly labeled menus</li>
                <li>✅ Custom meals for allergies and intolerances</li>
                <li>✅ Private chef services available for villas</li>
              </ul>
              <p className="mb-6">The team ensures every meal is reviewed carefully and communicates with guests to avoid any risk of exposure.</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">💬 Guest Reviews from Allergy-Conscious Travelers</h2>
              <blockquote className="bg-blue-50 p-4 border-l-4 border-blue-400 mb-4 italic">
                <p>"My daughter has severe nut and dairy allergies. The staff reviewed every meal in advance, and we felt completely safe throughout our stay."</p>
              </blockquote>
              <blockquote className="bg-blue-50 p-4 border-l-4 border-blue-400 mb-4 italic">
                <p>"We are a gluten-free family, and the resort offered freshly made gluten-free pancakes and bread daily. They were careful and knowledgeable."</p>
              </blockquote>
              <blockquote className="bg-blue-50 p-4 border-l-4 border-blue-400 mb-6 italic">
                <p>"I have celiac disease and usually avoid eating out when I travel. Here, I felt safe and supported—never got sick once."</p>
              </blockquote>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">🍽️ Allergy-Friendly Restaurants Nearby</h2>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li><strong>Greenlight Café</strong> (Maenam): Vegan, gluten-free, soy-free</li>
                <li><strong>Sweet Sisters Café:</strong> Allergy-aware dishes with clearly marked ingredients</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎬 The Real "White Lotus" Filming Location</h2>
              <p className="mb-6">Season 3 of <em>The White Lotus</em> was filmed at Four Seasons Koh Samui. The sweeping views, villas, and infinity pools seen in the show are real—and now you can enjoy them too, knowing your allergy needs will be taken seriously.</p>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">✈️ Planning Your Safe Getaway</h2>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li><strong>Ideal travel months:</strong> January to May</li>
                <li><strong>Bring with you:</strong> A printed allergy translation card in Thai (see below)</li>
                <li><strong>Travel tip:</strong> Contact the resort in advance to discuss dietary needs and pre-arrange meals</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">🗺️ On the Map</h2>
              <p className="mb-6">Four Seasons Koh Samui is located on a quiet, private bay in the northwest of Koh Samui. The resort is 45 minutes from the airport and within reach of local allergy-aware cafés.</p>

              <Separator className="my-6" />

              <h2 className="text-2xl font-bold text-gray-800 mb-4">🧾 Allergy Translation Card (English–Thai)</h2>
              <p className="mb-4">Print or save this card to show in restaurants or hotels:</p>

              <div className="bg-gray-50 p-5 rounded-lg mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📄 Allergy Card – English</h3>
                <p className="mb-2"><strong>I have a serious food allergy.</strong> Even a small amount of the food I'm allergic to can make me very sick. Please make sure my food does not contain any of the following and is not cooked near them.</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>❌ Gluten (wheat, barley, rye)</li>
                  <li>❌ Nuts</li>
                  <li>❌ Dairy (milk, cheese, butter)</li>
                  <li>❌ Eggs</li>
                  <li>❌ Soy</li>
                  <li>❌ Shellfish</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">📄 แปลเป็นภาษาไทย (Thai Translation)</h3>
                <p className="mb-2"><strong>ฉันมีอาการแพ้อาหารอย่างรุนแรง</strong> แม้ในปริมาณเล็กน้อยก็อาจทำให้ฉันป่วยได้ กรุณาตรวจสอบว่าอาหารของฉันไม่ประกอบด้วยสิ่งเหล่านี้ และไม่ได้ปรุงใกล้กับอาหารที่มีสารเหล่านี้</p>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                  <li>❌ กลูเตน (ข้าวสาลี ข้าวบาร์เลย์ ข้าวไรย์)</li>
                  <li>❌ ถั่ว</li>
                  <li>❌ ผลิตภัณฑ์นม (นม เนย ชีส)</li>
                  <li>❌ ไข่</li>
                  <li>❌ ถั่วเหลือง</li>
                  <li>❌ อาหารทะเล</li>
                </ul>
              </div>

              <Separator className="my-6" />

              <div className="mt-8 text-center">
                <Link to="/destinations">
                  <Button variant="outline" className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to All Destinations
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>;
};
export default KohSamui;