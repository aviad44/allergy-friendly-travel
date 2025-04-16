
import React from 'react';
import { Search } from 'lucide-react';

export const SearchSection = () => {
  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-[400px] sm:max-w-[700px]">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter destination"
            className="w-full p-4 rounded-lg text-gray-800 text-base border-none bg-white shadow-sm"
          />
          <input
            type="text"
            placeholder="Type of allergies"
            className="w-full p-4 rounded-lg text-gray-800 text-base border-none bg-white shadow-sm"
          />
          <button 
            className="w-full p-4 bg-[#00b397] hover:bg-[#009f84] text-white rounded-lg text-[1.1em] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Search Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};
