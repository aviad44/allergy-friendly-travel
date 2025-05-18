
import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  const loadingMessages = [
    "Searching for allergy-friendly hotels...",
    "Finding safe dining options...",
    "Checking allergy accommodation protocols...",
    "Reviewing guest experiences...",
    "Verifying allergy-friendly amenities..."
  ];
  
  const [messageIndex, setMessageIndex] = React.useState(0);
  
  // Cycle through messages to show progress
  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prevIndex => 
        prevIndex >= loadingMessages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-16 flex flex-col items-center justify-center text-center">
      <div className="relative">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 opacity-75 blur"></div>
        <div className="relative bg-white rounded-full p-4">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      </div>
      
      <h3 className="mt-6 text-lg font-semibold text-gray-900">
        Finding the perfect allergy-friendly hotels
      </h3>
      
      <p className="mt-2 text-base text-gray-600">
        {loadingMessages[messageIndex]}
      </p>
      
      <div className="mt-6 w-64 bg-gray-200 rounded-full h-1.5">
        <div className="h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse"></div>
      </div>
      
      <p className="mt-4 text-sm text-gray-500">
        This usually takes 5-15 seconds
      </p>
    </div>
  );
};
