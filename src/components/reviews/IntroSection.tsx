
import React from "react";
import { CalendarPlus } from "lucide-react";

interface IntroSectionProps {
  intro: string | string[];
  destinationName: string;
  isLondon?: boolean;
}

export const IntroSection = ({ intro, destinationName, isLondon }: IntroSectionProps) => {
  // Render the intro paragraph(s)
  const renderIntro = () => {
    if (Array.isArray(intro)) {
      return intro.map((paragraph, index) => (
        <p key={index} className="mb-5 text-muted-foreground">
          {paragraph}
        </p>
      ));
    }
    
    // Check if intro is HTML content
    if (typeof intro === 'string' && (intro.trim().startsWith('<p>') || intro.trim().startsWith('<blockquote>'))) {
      return <div className="space-y-4" dangerouslySetInnerHTML={{ __html: intro }} />;
    }
    
    return <p className="mb-4 text-muted-foreground">{intro}</p>;
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-display font-semibold flex items-center">
        <CalendarPlus className="mr-2 h-5 w-5 text-primary/80" aria-hidden="true" />
        {isLondon 
          ? "Best Allergy-Friendly Hotels in London for Your Next Trip" 
          : `Allergy-Safe Accommodations in ${destinationName}`}
      </h2>
      <div className="prose prose-sm max-w-none">
        {renderIntro()}
      </div>
    </section>
  );
};
