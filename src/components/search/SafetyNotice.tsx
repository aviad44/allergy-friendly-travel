
import React from 'react';
import { AlertTriangle, Shield } from 'lucide-react';

export const SafetyNotice: React.FC = () => {
  return (
    <div className="bg-amber-50 border border-amber-200 p-4 mb-6 rounded-lg shadow-sm">
      <div className="flex items-start">
        <div className="bg-amber-100 p-2 rounded-full mr-3">
          <Shield className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <p className="text-amber-800 font-semibold text-base">Important Safety Notice</p>
          <p className="text-amber-700 text-sm mt-1 leading-relaxed">
            Always verify allergy accommodations directly with hotels before booking. 
            Allergy severity varies, and hotel policies may change without notice. 
            We recommend contacting the hotel's chef or food service manager to discuss 
            your specific dietary requirements.
          </p>
        </div>
      </div>
    </div>
  );
};
