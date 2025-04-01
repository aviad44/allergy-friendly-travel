
import React from 'react';
import { Step } from '../types';

interface ProgressBarProps {
  currentStep: Step;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all"
        style={{ width: `${(currentStep + 1) * 25}%` }}
      ></div>
    </div>
  );
};
