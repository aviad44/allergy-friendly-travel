
import React from 'react';

export const SafetyTips: React.FC = () => {
  return (
    <div className="mt-12 bg-green-50 p-6 rounded-lg border border-green-200">
      <h3 className="font-semibold text-green-800 mb-3">Safety Tips</h3>
      <ul className="space-y-2 text-green-700 list-disc pl-5">
        <li>Always carry multiple copies of your allergy card</li>
        <li>Consider laminating a physical copy to protect it while traveling</li>
        <li>Save a digital version on your phone that's accessible offline</li>
        <li>Learn a few key phrases in the local language in addition to using the card</li>
        <li>When in doubt, show your card to staff before ordering or purchasing food</li>
      </ul>
    </div>
  );
};
