
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  path: string;
}

export const DestinationCard = ({
  id,
  name,
  country,
  description,
  image,
  path
}: DestinationCardProps) => {
  return (
    <Link to={path} className="group">
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 overflow-hidden">
          <img
            src={image.startsWith('photo-') 
              ? `https://images.unsplash.com/${image}?auto=format&fit=crop&w=800&q=80` 
              : image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              console.error(`Failed to load image for ${name}: ${image}`);
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-xl">{name}</h3>
            <p className="text-gray-200 text-sm">{country}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-3 text-sm">
            {description}
          </p>
          <div className="flex items-center text-teal-600 font-medium text-sm">
            <span>View details</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
