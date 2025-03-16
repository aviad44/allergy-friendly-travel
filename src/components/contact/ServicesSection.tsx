
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ServicesSection() {
  return (
    <>
      <Separator />

      <section className="space-y-6">
        <h2 className="text-2xl font-display font-semibold text-center">
          How We Can Help
        </h2>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Hotel Recommendations</h3>
            <p className="text-muted-foreground text-sm">Get personalized hotel suggestions based on your specific allergies and dietary needs.</p>
          </div>
          
          <div className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Allergy Resources</h3>
            <p className="text-muted-foreground text-sm">Access translation cards, emergency guidelines, and other helpful resources for your destination.</p>
          </div>
          
          <div className="p-6 border rounded-lg flex flex-col items-center text-center space-y-3">
            <div className="bg-primary/10 p-3 rounded-full">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold">Travel Planning</h3>
            <p className="text-muted-foreground text-sm">Get assistance with creating allergy-friendly itineraries and finding safe dining options.</p>
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" asChild>
            <a href="/reviews">
              See Traveler Reviews <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </>
  );
}
