
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-md">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-amber-800 font-medium">Safety Notice</p>
          <p className="text-amber-700 text-sm">
            Always verify allergy accommodations directly with hotels before booking. 
            Allergy severity varies, and hotel policies may change without notice.
          </p>
        </div>
      </div>
    </div>
  );
};
