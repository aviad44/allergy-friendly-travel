
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Rocket } from "lucide-react";

// Import all destination photos
import londonImg from "/lovable-uploads/d510c45b-659c-4c57-83e1-3ee75291a972.png";
import parisImg from "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png";
import barcelonaImg from "/lovable-uploads/48d61e24-2379-4173-a843-8c83cc833996.png";
import creteImg from "/lovable-uploads/8ccb76ca-0fc3-4c23-bc71-ce722e2fb441.png";

// Import the MainMenu component
import { MainMenu } from "@/components/MainMenu";

const destinations = [
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    image: londonImg,
    description: "Discover allergen-friendly accommodations in the heart of England's capital.",
    path: "/destinations/london"
  },
  {
    id: "paris",
    name: "Paris",
    country: "France",
    image: parisImg,
    description: "Enjoy the city of lights with peace of mind at these allergy-aware hotels.",
    path: "/destinations/paris"
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    image: barcelonaImg,
    description: "Experience Catalan hospitality with allergen-conscious accommodations.",
    path: "/destinations/barcelona"
  },
  {
    id: "cyprus",
    name: "Cyprus",
    country: "Cyprus",
    image: londonImg,
    description: "Discover the beauty of Cyprus with peace of mind at these allergy-friendly hotels.",
    path: "/destinations/cyprus"
  },
  {
    id: "abu-dhabi",
    name: "Abu Dhabi",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&w=800&q=80",
    description: "Luxury accommodation with allergy considerations in the heart of the UAE.",
    path: "/destinations/abudhabi"
  },
  {
    id: "crete",
    name: "Crete",
    country: "Greece",
    image: creteImg,
    description: "Relax on the beautiful Greek island with allergy-aware accommodations.",
    path: "/destinations/crete"
  }
];

const DestinationsIndex = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Beta Banner */}
      <div className="w-full bg-white text-gray-800 text-xs py-1.5 text-center flex items-center justify-center font-medium">
        <Rocket className="h-3 w-3 mr-1.5 text-[#edab69]" />
        Website in Beta
      </div>
      
      {/* Navigation - Changed from fixed to relative */}
      <nav className="relative bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" aria-label="Return to homepage" className="flex items-center gap-3 text-2xl font-display font-bold text-[#edab69] hover:text-amber-400 transition-colors">
            <img 
              src="/lovable-uploads/bdab176d-ca57-4ea9-b793-ea953f369bb9.png" 
              alt="Allergy Free Travel Logo" 
              className="h-10" 
            />
            Allergy Free Travel
          </Link>
          
          <MainMenu />
        </div>
      </nav>

      {/* Hero Section - With more transparency */}
      <section className="relative bg-gradient-to-b from-black/50 to-black/70 py-12 md:py-16">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2731&q=80" 
            alt="Travel destinations" 
            className="w-full h-full object-cover object-center opacity-60" 
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="bg-black/30 backdrop-blur-sm p-4 sm:p-6 rounded-xl inline-block max-w-2xl mx-auto">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-6 leading-tight">
              <span className="text-sky-200 font-bold">Discover</span>
              <span className="block mt-2 text-teal-300 font-bold">Allergy-Friendly Destinations</span>
            </h1>
            <p className="text-white text-lg md:text-xl mx-auto">
              Find the perfect accommodation that caters to your specific allergy needs
            </p>
          </div>
        </div>
      </section>

      {/* Destinations List */}
      <section className="py-8 md:py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {destinations.map((destination) => (
            <Link key={destination.id} to={destination.path} className="group">
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-white font-bold text-xl">{destination.name}</h3>
                    <p className="text-gray-200 text-sm">{destination.country}</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 mb-3 text-sm">
                    {destination.description}
                  </p>
                  <div className="flex items-center text-teal-600 font-medium text-sm">
                    <span>View details</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DestinationsIndex;
