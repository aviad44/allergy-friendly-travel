
import { Helmet } from "react-helmet";
import { DirectGptChat } from "@/components/DirectGptChat";

const DirectChat = () => {
  return (
    <>
      <Helmet>
        <title>Secure OpenAI Chat | Allergy-Friendly Hotel Finder</title>
        <meta 
          name="description" 
          content="Chat securely with our AI assistant to find allergy-friendly hotels using our OpenAI GPT proxy." 
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Secure OpenAI GPT Integration</h1>
        <p className="text-muted-foreground mb-8">
          This page features a secure integration with the OpenAI API through our Supabase Edge Function proxy.
          Your requests are processed securely on our server, and no API keys are exposed to the client.
        </p>
        
        <DirectGptChat />
      </div>
    </>
  );
};

export default DirectChat;
