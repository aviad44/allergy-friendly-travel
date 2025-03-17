
import { Helmet } from "react-helmet";
import { DirectGptChat } from "@/components/DirectGptChat";

const DirectChat = () => {
  return (
    <>
      <Helmet>
        <title>Direct OpenAI GPT Chat | Allergy-Friendly Hotel Finder</title>
        <meta 
          name="description" 
          content="Chat directly with our AI assistant to find allergy-friendly hotels using the OpenAI GPT API." 
        />
      </Helmet>

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-2">Direct OpenAI GPT Integration</h1>
        <p className="text-muted-foreground mb-8">
          This page demonstrates a direct integration with the OpenAI API, allowing you to get responses 
          exactly as they would appear in the OpenAI playground. Enter your OpenAI API key in the settings 
          section to begin.
        </p>
        
        <DirectGptChat />
      </div>
    </>
  );
};

export default DirectChat;
