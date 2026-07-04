import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { isAuthorized, unauthorizedResponse } from "../_shared/verifyAuth.ts";
import { validateBody, z } from "../_shared/validation.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hardcoded server-side model configuration (not caller-controlled)
const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.7;
const MAX_TOKENS = 2000;
const MAX_INPUT_LENGTH = 2000;
const SYSTEM_PROMPT =
  "You are an AI assistant specializing in recommending allergy-friendly hotels worldwide. Your responses must be highly detailed and structured.";

const inputSchema = z.object({
  userInput: z.string().trim().min(1).max(MAX_INPUT_LENGTH),
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!(await isAuthorized(req))) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      console.error('OpenAI API key is missing');
      throw new Error('OpenAI API key is not configured');
    }

    // Only accept userInput from the caller; validate it.
    const validation = await validateBody(req, inputSchema, corsHeaders);
    if (!validation.success) return validation.response;
    const { userInput } = validation.data;

    const startTime = Date.now();
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userInput }
        ],
        temperature: TEMPERATURE,
        max_tokens: MAX_TOKENS,
        top_p: 1.0,
        frequency_penalty: 0,
        presence_penalty: 0
      }),
    });

    const requestDuration = (Date.now() - startTime) / 1000;
    console.log(`OpenAI API request completed in: ${requestDuration.toFixed(2)}s`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    content = content
      .replace(/IMPORTANT:[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/Format your response as[\s\S]*?(?=\n\n|$)/g, '')
      .replace(/EXTREMELY IMPORTANT SAFETY REQUIREMENTS:[\s\S]*?(?=\n\n|$)/g, '')
      .trim();

    return new Response(
      JSON.stringify({ result: content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in openai-proxy function:', error);
    return new Response(
      JSON.stringify({ error: 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
