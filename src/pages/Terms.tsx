
import React from 'react';
import { Helmet } from 'react-helmet';
import { HOME_CONTENT } from '@/constants/home';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Use | {HOME_CONTENT.navigation.brand}</title>
        <meta name="description" content="Terms of Use for Allergy Free Travel - read our website's terms and conditions." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-blue-800">Terms of Use</h1>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700 mt-8">General</h3>
          <p className="mb-6">Welcome to {HOME_CONTENT.navigation.brand} ("the Website"), a platform providing information, recommendations, and services in the field of travel tailored to individuals with food allergies. Use of the Website is subject to the terms and conditions detailed below ("Terms of Use"). Please read these terms carefully. By accessing or using the Website, you agree to be bound by these Terms.<br/>
          If you do not agree to these Terms, please do not use the Website.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Purpose of the Website</h3>
          <p className="mb-6">The Website provides information, reviews, recommendations, interactive tools (including a GPT-based search and recommendation engine), and other content for travelers with food allergies, to help them choose accommodations that suit their health and personal needs.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Disclaimer of Liability</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>The content on the Website is provided for user convenience and does not constitute medical, nutritional, or legal advice.</li>
            <li>Information is collected from various sources, including users, third-party websites, AI systems, and travel companies, and may contain inaccuracies or errors.</li>
            <li>The Website operators are not responsible for the reliability, accuracy, timeliness, or completeness of the information.</li>
            <li>Use of the Website and its content is at the user's own risk.</li>
          </ul>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Use of Content and Services</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Commercial use of the content on the Website is prohibited without prior written permission from the Website operators.</li>
            <li>No content or images may be copied, reproduced, distributed, published, or used in any other way without express permission.</li>
            <li>Users agree not to upload any illegal, harmful, or infringing content to the Website.</li>
          </ul>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Privacy and Data Security</h3>
          <p className="mb-6">Use of the Website is subject to our Privacy Policy. We commit to protecting user information to the best of our ability in accordance with privacy laws. However, some services may involve third-party tools (including GPT by OpenAI), and providing information via such tools is at the user's own responsibility.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Links to External Websites</h3>
          <p className="mb-6">The Website may contain links to third-party websites. We are not responsible for the content, privacy practices, or services of those external sites.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Changes to the Terms</h3>
          <p className="mb-6">The Website operators reserve the right to update these Terms at any time at their sole discretion. The latest update date will appear at the top of this page. Continued use of the Website after updates constitutes renewed acceptance of the updated Terms.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">Governing Law and Jurisdiction</h3>
          <p className="mb-6">These Terms, the use of the Website, and any dispute arising therefrom shall be governed exclusively by the laws of the State of Israel, without regard to conflict of law principles of any other jurisdiction.<br/>
          The exclusive jurisdiction for any dispute or claim arising from these Terms or use of the Website shall be the competent courts of Tel Aviv, Israel.<br/>
          The user expressly agrees to this jurisdiction, including if they are a resident or citizen of another country.</p>
        </section>
      </div>
    </>
  );
};

export default Terms;
