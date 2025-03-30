
interface HeroGradientProps {
  className?: string;
}

export const HeroGradient = ({ className }: HeroGradientProps) => {
  return (
    <>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent" 
        aria-hidden="true"
      />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/90 ${className || ''}`}></div>
    </>
  );
};
