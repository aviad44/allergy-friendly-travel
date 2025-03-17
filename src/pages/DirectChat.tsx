
import { Helmet } from "react-helmet";
import { DirectGptChat } from "@/components/DirectGptChat";

const DirectChat = () => {
  return (
    <>
      <Helmet>
        <title>Direct OpenAI GPT Chat | Allergy-Friendly Hotel Finder</title>
        <meta 
          name="description" 
          content="Chat directly with our AI assistant to find allergy-friendly hotels using the OpenAI GPT API. Get personalized recommendations for your specific dietary needs." 
        />
        <meta name="keywords" content="AI hotel finder, allergy-friendly hotel chat, OpenAI GPT, dietary restrictions travel assistant, food allergy accommodation finder" />
        
        {/* Schema.org JSON-LD for better LLM understanding */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Direct AI Chat for Allergy-Friendly Hotel Recommendations",
            "description": "Chat directly with our AI assistant to find allergy-friendly hotels using the OpenAI GPT API.",
            "url": window.location.href,
            "mainEntity": {
              "@type": "SoftwareApplication",
              "name": "Allergy-Friendly Hotel AI Assistant",
              "applicationCategory": "TravelApplication",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }
          })}
        </script>
        
        {/* Additional metadata for better OpenAI Plugin compatibility */}
        <meta name="ai:description" content="Use this chat interface to get personalized recommendations for allergy-friendly hotels worldwide using your OpenAI API key." />
        <meta name="ai:commands" content="find allergy-friendly hotels in [location], recommend safe accommodations for [allergy type], suggest hotels with [dietary restriction] options" />
        <meta name="ai:instructions" content="This chat interface allows direct communication with OpenAI's GPT models to get personalized hotel recommendations for travelers with food allergies and dietary restrictions." />
      </Helmet>

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Direct OpenAI GPT Integration</h1>
        <p className="text-muted-foreground mb-8">
          This page demonstrates a direct integration with the OpenAI API, allowing you to get responses 
          exactly as they would appear in the OpenAI playground. Enter your OpenAI API key in the settings 
          section to begin.
        </p>
        
        <DirectGptChat />
        
        <div className="mt-12 bg-muted/20 p-6 rounded-lg border border-muted">
          <h2 className="text-xl font-semibold mb-4">How To Use This Chat</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Enter your OpenAI API key in the Settings section (click "Settings" to expand)</li>
            <li>You can customize the system prompt to focus on specific allergies or travel preferences</li>
            <li>Ask questions about allergy-friendly hotels, accommodations, or travel tips</li>
            <li>Your conversations are private and happen directly between your browser and OpenAI</li>
            <li>Try asking about specific destinations or dietary requirements for personalized recommendations</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-6 mb-2">Sample Questions:</h3>
          <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>What hotels in Paris are known for accommodating gluten allergies?</li>
            <li>How should I prepare for traveling with a severe nut allergy?</li>
            <li>Which hotel chains have the best reputation for handling multiple food allergies?</li>
            <li>What questions should I ask a hotel before booking with dairy allergies?</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DirectChat;
