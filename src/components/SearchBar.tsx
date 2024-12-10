import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchBar = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full max-w-3xl mx-auto">
      <div className="flex-1">
        <Input 
          placeholder="Enter destination" 
          className="h-12 text-lg"
        />
      </div>
      <div className="flex-1">
        <Input 
          placeholder="Type of allergies" 
          className="h-12 text-lg"
        />
      </div>
      <Button className="h-12 px-8 bg-primary hover:bg-primary/90">
        <Search className="mr-2 h-5 w-5" />
        Search
      </Button>
    </div>
  );
};