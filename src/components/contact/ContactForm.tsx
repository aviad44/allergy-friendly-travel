
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, Clock, AlertCircle, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ErrorDialog } from "./ErrorDialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function ContactForm() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [errorDetails, setErrorDetails] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    
    try {
      console.log("Submitting contact form:", { name, email, message });
      
      // Validate form fields
      if (!name.trim() || !email.trim() || !message.trim()) {
        setFormError("Please fill out all fields before submitting.");
        setIsSubmitting(false);
        return;
      }
      
      // Call our Supabase Edge Function to send the email
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, message }
      });

      console.log("Response from edge function:", { data, error });

      if (error) {
        console.error('Contact form submission error:', error);
        throw new Error(error.message || 'Failed to send message');
      }

      if (data?.error) {
        console.error('Edge function returned error:', data.error);
        throw new Error(data.error);
      }

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      // Clear the form
      setEmail("");
      setName("");
      setMessage("");
    } catch (error) {
      console.error('Contact form submission error:', error);
      
      // Show error in toast
      toast({
        title: "Message not sent",
        description: "There was a problem sending your message. Please try again later.",
        variant: "destructive"
      });
      
      // Show detailed error in dialog
      setErrorDetails(error instanceof Error ? error.message : 'Unknown error occurred');
      setShowErrorDialog(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="p-6 shadow-md">
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Mail className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Get in Touch</h2>
          </div>
          
          <p className="text-muted-foreground">
            Have questions about allergy-friendly accommodations or need personalized travel advice? Send us a message and we'll respond as soon as possible.
          </p>
          
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              Response time: Within 24-48 hours
            </span>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Your Name
            </label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about your allergies and travel needs..."
              rows={5}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                Send Message <Send className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
      </Card>

      <ErrorDialog 
        open={showErrorDialog} 
        onOpenChange={setShowErrorDialog}
        errorDetails={errorDetails}
      />
    </div>
  );
}
