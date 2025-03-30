
import React from 'react';
import { Shield } from 'lucide-react';

interface AllergyAmenitiesProps {
  allergyAmenities?: {
    icon: string;
    text: string;
  }[];
}

export const AllergyAmenities: React.FC<AllergyAmenitiesProps> = ({ allergyAmenities }) => {
  if (!allergyAmenities || allergyAmenities.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
        <Shield className="h-5 w-5 mr-2 text-teal-600" />
        Allergy Accommodations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {allergyAmenities.map((item, index) => (
          <div key={index} className="flex items-center bg-teal-50 p-3 rounded-md">
            <span className="text-teal-600 mr-2">{item.icon}</span>
            <span className="text-gray-700">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
