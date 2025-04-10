
interface IntroSectionProps {
  intro: string | string[];
  destinationName: string;
  isLondon?: boolean;
}

export const IntroSection = ({ intro, destinationName, isLondon = false }: IntroSectionProps) => {
  // Handle different types of intro content safely
  const introText = typeof intro === 'string' ? intro : 
    (Array.isArray(intro) && intro.length > 0 ? intro.join(' ') : 
    "Find safe and comfortable accommodations for travelers with dietary restrictions.");

  return (
    <section className="prose prose-sm sm:prose max-w-none mb-4">
      <p className="text-base sm:text-lg text-muted-foreground">
        {introText}
      </p>
    </section>
  );
};
