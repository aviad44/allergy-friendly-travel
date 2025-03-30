
import React from 'react';

interface HotelDescriptionProps {
  description?: string;
}

export const HotelDescription: React.FC<HotelDescriptionProps> = ({ description }) => {
  if (!description) return null;
  
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
};
