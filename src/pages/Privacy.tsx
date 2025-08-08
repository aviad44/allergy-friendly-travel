import React from 'react';
import { MetaManager } from '@/components/MetaManager';
import { HOME_CONTENT } from '@/constants/home';
const Privacy = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  return <>
      <MetaManager 
        routeKey="/privacy"
        dynamicData={{
          title: `Privacy Policy | ${HOME_CONTENT.navigation.brand}`,
          description: "Our privacy policy outlines how we collect, use, and protect your personal information when using our allergy-friendly hotel finding service.",
        }}
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-6 text-blue-800">Privacy Policy</h2>
          <p className="text-gray-600 italic mb-6">Last Updated: {currentDate}</p>

          <p className="mb-6">This Privacy Policy describes how we collect, use, and protect your personal information when you use our website, which helps travelers with food allergies find allergy-friendly hotels.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">1. Information We Collect</h3>
          <p className="mb-4">We may collect the following types of information:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Basic contact information (e.g., email, if you subscribe or contact us)</li>
            <li>Search preferences (e.g., destinations, allergy types)</li>
            <li>Feedback and reviews you choose to submit</li>
            <li>Usage data collected via cookies or analytics tools (e.g., pages visited, time spent)</li>
          </ul>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">2. How We Use Your Information</h3>
          <p className="mb-4">We use the information we collect to:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Personalize hotel suggestions and destination content</li>
            <li>Improve website functionality and user experience</li>
            <li>Respond to inquiries or feedback</li>
            <li>Send occasional updates or newsletters (only if you opt in)</li>
          </ul>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">3. Use of AI (GPT-Based Tools)</h3>
          <p className="mb-6">Our website may include GPT-based chat tools to assist with hotel recommendations. While these tools use your input to generate responses, we do not store personal conversations unless explicitly submitted via a form or email.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">4. Data Sharing</h3>
          <p className="mb-6">We do not sell or rent your personal information. We may share non-identifiable, aggregated data for analytics or improvement purposes. If you click on a booking link, your data will be subject to the third-party site's policies.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">5. Cookies and Tracking Technologies</h3>
          <p className="mb-6">We use cookies and similar technologies to understand user behavior and improve our services. You can manage your cookie preferences via your browser settings.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">6. Third-Party Links</h3>
          <p className="mb-6">Our site contains links to third-party platforms, such as hotel booking websites. We are not responsible for their privacy practices. We recommend reviewing their privacy policies before sharing any personal information.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">7. Data Security</h3>
          <p className="mb-6">We implement appropriate technical and organizational measures to protect your personal data. However, no system is entirely secure, and we cannot guarantee absolute protection.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">8. Your Rights</h3>
          <p className="mb-6">You may request to access, correct, or delete your personal data by contacting us. You may also opt out of email communications at any time.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">9. Policy Updates</h3>
          <p className="mb-6">We reserve the right to update this Privacy Policy. Any changes will be posted on this page with the updated date.</p>

          <h3 className="font-display text-xl font-semibold mb-3 text-blue-700">
        </h3>
          <p className="mb-6">
        </p>
        </section>
      </div>
    </>;
};
export default Privacy;