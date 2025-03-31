
import React from 'react';
import { Check } from 'lucide-react';

interface AllergyAmenity {
  icon: string;
  text: string;
}

interface AllergyAmenitiesProps {
  allergyAmenities?: AllergyAmenity[];
}

export const AllergyAmenities: React.FC<AllergyAmenitiesProps> = ({ allergyAmenities }) => {
  if (!allergyAmenities || allergyAmenities.length === 0) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-3">Allergy Accommodations</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {allergyAmenities.map((amenity, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-teal-600 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-700">{amenity.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
