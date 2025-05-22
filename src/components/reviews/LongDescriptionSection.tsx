
import React from 'react';
import { InfoIcon } from 'lucide-react';

interface LongDescriptionSectionProps {
  content?: string;
  title?: string;
}

export const LongDescriptionSection = ({ content, title = "About This Destination" }: LongDescriptionSectionProps) => {
  if (!content) {
    return null;
  }
  
  return (
    <section className="my-8">
      <div className="flex items-center mb-4">
        <InfoIcon className="h-5 w-5 mr-2 text-blue-500" />
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="prose prose-blue max-w-none">
        {content.split('\n\n').map((paragraph, i) => (
          <p key={i} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </section>
  );
};
