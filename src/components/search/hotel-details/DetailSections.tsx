
import React from 'react';
import { Shield, Utensils } from 'lucide-react';

interface DetailSectionsProps {
  accommodations?: string;
  dietary?: string;
  safety?: string;
}

export const DetailSections: React.FC<DetailSectionsProps> = ({ 
  accommodations, dietary, safety 
}) => {
  if (!accommodations && !dietary && !safety) return null;
  
  return (
    <div className="space-y-6">
      {accommodations && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-teal-600" />
            Allergy Accommodations
          </h3>
          <p className="text-gray-700 leading-relaxed">{accommodations}</p>
        </div>
      )}
      
      {dietary && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Utensils className="h-5 w-5 mr-2 text-teal-600" />
            Dietary Options
          </h3>
          <p className="text-gray-700 leading-relaxed">{dietary}</p>
        </div>
      )}
      
      {safety && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-teal-600" />
            Safety Protocols
          </h3>
          <p className="text-gray-700 leading-relaxed">{safety}</p>
        </div>
      )}
    </div>
  );
};
