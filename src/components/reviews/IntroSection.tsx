
interface IntroSectionProps {
  intro: string;
  destinationName: string;
  isLondon?: boolean;
}

export const IntroSection = ({ intro, destinationName, isLondon = false }: IntroSectionProps) => {
  // Ensure intro is a string
  const introText = typeof intro === 'string' ? intro : 
    (Array.isArray(intro) ? intro.join(' ') : 
    "Find safe and comfortable accommodations for travelers with dietary restrictions.");

  return (
    <section className="prose prose-sm sm:prose max-w-none mb-4">
      <p className="text-base sm:text-lg text-muted-foreground">
        {introText}
      </p>
    </section>
  );
};
