
import { useState } from "react";
import { Helmet } from "react-helmet";
import { MainMenu } from "@/components/MainMenu";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Send, 
  ArrowRight,
  Clock,
  MessageSquare
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
      setEmail("");
      setName("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Contact Us | Allergy Free Travel</title>
        <meta name="description" content="Get in touch with our team for personalized allergy-friendly travel advice and assistance." />
        <meta name="keywords" content="contact, allergy-friendly travel, food allergies, travel assistance, dietary restrictions" />
      </Helmet>

      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto max-w-7xl">
          <div className="flex justify-between items-center">
            <a href="/" className="text-xl font-bold text-primary">
              Allergy Free Travel
            </a>
            <MainMenu />
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 max-w-7xl">
        <div className="max-w-3xl mx-auto space-y-10">
          <section className="text-center space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're here to help make your allergy-friendly travel experience as smooth as possible.
            </p>
          </section>

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
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

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
        </div>
      </main>

      <Footer />
    </div>
  );
}
