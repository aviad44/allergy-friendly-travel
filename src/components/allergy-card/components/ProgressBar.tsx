
import React from 'react';
import { Step } from '../types';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: Step;
}

const stepLabels = [
  "Select Allergies",
  "Choose Languages",
  "Preview Card",
  "Download"
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full mb-6">
      {/* Mobile progress bar (simple) */}
      <div className="md:hidden">
        <div className="w-full bg-gray-200 h-2 rounded-full">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${(currentStep + 1) * 25}%` }}
          ></div>
        </div>
        <div className="mt-2 text-center text-sm font-medium">
          Step {currentStep + 1} of 4: {stepLabels[currentStep]}
        </div>
      </div>
      
      {/* Desktop progress bar (detailed) */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="absolute top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2"></div>
          <div className="relative flex justify-between">
            {stepLabels.map((label, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              
              return (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all
                      ${isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                        isActive ? 'bg-white border-blue-600 text-blue-600' : 
                        'bg-white border-gray-300 text-gray-400'}`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span 
                    className={`mt-2 text-xs font-medium
                      ${isActive ? 'text-blue-600' : 
                        isCompleted ? 'text-blue-600' : 'text-gray-500'}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
