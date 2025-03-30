
import React from 'react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6">
      <div className="flex">
        <div className="flex-grow">
          <div className="flex flex-col">
            <span className="font-bold text-amber-800">Safety Notice:</span>
            <span className="text-amber-800">
              Always verify allergy accommodations directly with hotels before booking. 
              Allergy severity varies, and hotel policies may change.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
