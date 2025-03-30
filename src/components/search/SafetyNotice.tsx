
import React from 'react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-6 text-amber-800 text-sm">
      <p className="flex items-start gap-2">
        <span className="font-semibold">Safety Notice:</span> Always verify allergy accommodations directly 
        with hotels before booking. Allergy severity varies, and hotel policies may change.
      </p>
    </div>
  );
};
