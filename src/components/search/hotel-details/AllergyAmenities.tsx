
import React from 'react';

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
      <div className="flex flex-wrap gap-3">
        {allergyAmenities.map((amenity, index) => (
          <div key={index} className="flex items-center text-sm text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full">
            <span className="text-teal-600 mr-1.5">✓</span>
            <span>{amenity.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
