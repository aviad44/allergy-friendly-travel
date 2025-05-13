
export default async function handler(request, context) {
  // Define critical bot user agents that need prerendering
  const botUserAgents = [
    'facebookexternalhit',
    'FacebookBot',
    'facebook',
    'Facebook',
    'whatsapp',
    'WhatsApp',
    'twitter',
    'twitterbot',
    'linkedinbot',
    'pinterest'
  ];

  // Get the user agent and URL
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  const path = new URL(url).pathname;
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Simple bot detection check
  const isBot = botUserAgents.some(bot => 
    lowerUserAgent.includes(bot.toLowerCase())
  );

  // Enhanced logging for debugging
  context.log(`Request from: ${userAgent} for URL: ${url} | Path: ${path} | isBot: ${isBot}`);

  // Special handling for home page (root path)
  if (path === '/' && isBot) {
    context.log(`HOME PAGE BOT DETECTED: ${userAgent} for ${url}`);
  }

  // For social media bots, specially log them
  if (lowerUserAgent.includes('facebook') || lowerUserAgent.includes('whatsapp')) {
    context.log(`SOCIAL MEDIA BOT: ${userAgent} for ${url}`);
  }

  // Add the Prerender handling for bots
  if (isBot) {
    context.log(`BOT DETECTED: ${userAgent} for ${url}`);
    
    // Get the Prerender token
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    // Full URL with protocol for Prerender.io
    const fullUrl = `https://www.allergy-free-travel.com${path}`;
    
    // We'll use a proxy approach instead of redirects to ensure headers are passed
    try {
      // Make a fetch request to Prerender directly
      const prerenderUrl = `https://service.prerender.io/${fullUrl}`;
      
      context.log(`FETCHING FROM PRERENDER: ${prerenderUrl}`);
      
      // Pass the request to Prerender with the token
      const prerenderResponse = await fetch(prerenderUrl, {
        headers: {
          'X-Prerender-Token': prerenderToken,
          'User-Agent': userAgent
        }
      });
      
      // Get the response content
      const responseBody = await prerenderResponse.text();
      
      // Create a new response with the prerendered content
      return new Response(responseBody, {
        status: prerenderResponse.status,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-cache',
          'X-Prerendered': 'true'
        }
      });
    } catch (error) {
      context.log(`ERROR FETCHING FROM PRERENDER: ${error.message}`);
      
      // Return an error response
      return new Response(`Error fetching prerendered content: ${error.message}`, {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }

  // Forward normal users without prerendering
  return context.next();
}
