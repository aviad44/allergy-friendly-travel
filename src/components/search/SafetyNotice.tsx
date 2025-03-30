
import React from 'react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-0 p-4 mb-6 w-full">
      <div className="flex">
        <div className="flex-grow">
          <div className="flex flex-col">
            <span className="text-amber-800">
              <span className="font-bold">Notice:</span> with hotels before booking. Allergy severity varies, and hotel policies may change.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
