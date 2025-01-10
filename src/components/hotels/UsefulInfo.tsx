import { Utensils, Shield, Clock } from "lucide-react";

const UsefulInfo = () => {
  return (
    <div className="bg-muted rounded-xl p-8">
      <h3 className="font-display text-2xl mb-6">Important Safety Information</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="flex items-start">
          <Utensils className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Dining Precautions</h4>
            <p className="text-muted-foreground">Always inform restaurants of your allergies when making reservations and confirm again upon arrival.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Shield className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Medical Support</h4>
            <p className="text-muted-foreground">Keep emergency contact numbers readily available. Major hotels can assist in connecting with medical services.</p>
          </div>
        </div>
        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-3 text-primary mt-1 shrink-0" />
          <div>
            <h4 className="font-medium mb-2">Advance Planning</h4>
            <p className="text-muted-foreground">Contact hotels and restaurants at least 48 hours in advance to discuss allergy accommodations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsefulInfo;