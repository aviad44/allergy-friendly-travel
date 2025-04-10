
interface IntroSectionProps {
  intro: string;
  destinationName: string;
  isLondon?: boolean;
}

export const IntroSection = ({ intro, destinationName, isLondon = false }: IntroSectionProps) => {
  return (
    <section className="prose prose-sm sm:prose max-w-none mb-4">
      <p className="text-base sm:text-lg text-muted-foreground">
        {intro}
      </p>
    </section>
  );
};
