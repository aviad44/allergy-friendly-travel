import { Utensils, Shield, Clock } from "lucide-react";

const UsefulInfo = () => {
  return (
    <div className="bg-muted rounded-xl p-8">
      <h3 className="font-display text-2xl mb-6">Useful Information</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-start">
          <Utensils className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Restaurant Reservations</h4>
            <p className="text-muted-foreground">Most high-end restaurants require advance notice for allergy accommodations. Book at least 48 hours ahead.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Medical Support</h4>
            <p className="text-muted-foreground">All listed hotels have partnerships with nearby medical facilities and can assist in emergencies.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Best Time to Visit</h4>
            <p className="text-muted-foreground">Spring and fall offer the best dining experiences with fresh, seasonal ingredients.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulInfo;