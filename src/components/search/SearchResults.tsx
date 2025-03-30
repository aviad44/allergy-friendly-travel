
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Home, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import { SearchResultsProps } from "./types";

export const SearchResults = ({
  destination,
  allergies,
  recommendation,
  isSearching,
  onClose
}: SearchResultsProps) => {
  return (
    <>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-display">
            Allergy-Friendly Hotels
          </h3>
          <p className="text-sm text-muted-foreground">
            Search results for {destination} with {allergies} allergies
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="outline" size="sm" className="flex gap-1 items-center">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="text-gray-500 hover:bg-gray-100 flex-shrink-0"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
    
      <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mb-3 text-amber-800 text-sm">
        <p className="flex items-start gap-2">
          <span className="font-semibold">Safety Notice:</span> Always verify allergy accommodations directly 
          with hotels before booking. Allergy severity varies, and hotel policies may change.
        </p>
      </div>
        
      <div className="mt-2 overflow-y-auto flex-grow pb-safe pr-1">
        {recommendation ? (
          <Card className="p-3 sm:p-6 mb-4 overflow-y-auto">
            <div className="prose prose-sm sm:prose max-w-none">
              <ReactMarkdown components={{
                h1: ({node, ...props}) => <h2 className="text-xl sm:text-2xl font-bold text-teal-600 mt-2 mb-4" {...props} />,
                h2: ({node, ...props}) => <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2 flex items-center gap-2" {...props} />,
                p: ({node, ...props}) => <p className="my-2" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-5 my-2" {...props} />,
                li: ({node, ...props}) => <li className="mb-1" {...props} />,
                a: ({node, href, ...props}) => (
                  <a 
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-teal-600 hover:underline inline-flex items-center gap-1" 
                    {...props}
                  >
                    {props.children} <span className="inline-block h-3 w-3">⟶</span>
                  </a>
                )
              }}>
                {recommendation}
              </ReactMarkdown>
            </div>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground h-48">
            {isSearching ? (
              <>
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-4"></div>
                <p>Finding the perfect hotel for your needs...</p>
              </>
            ) : (
              <p>Enter destination and allergy details to get personalized recommendations</p>
            )}
          </div>
        )}
      </div>
      
      <div className="sticky bottom-0 w-full bg-background pt-2 pb-4 border-t mt-auto">
        <Link to="/" className="w-full">
          <Button variant="default" className="w-full" onClick={onClose}>
            <Home className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </>
  );
};
