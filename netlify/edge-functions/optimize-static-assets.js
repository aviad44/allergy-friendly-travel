
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
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Bot detection check with detailed logging
  const isBot = botUserAgents.some(bot => 
    lowerUserAgent.includes(bot.toLowerCase())
  );

  // Log all requests for debugging
  context.log(`Request from: ${userAgent}`);
  context.log(`URL requested: ${url}`);
  context.log(`Is bot detected: ${isBot}`);

  // For social media bots, provide more detailed logging
  if (lowerUserAgent.includes('facebook') || lowerUserAgent.includes('whatsapp')) {
    context.log(`SOCIAL MEDIA BOT DETECTED: ${userAgent}`);
    context.log(`SOCIAL MEDIA URL: ${url}`);
    context.log(`Headers: ${JSON.stringify([...request.headers.entries()])}`);
  }

  // Add the Prerender handling for bots
  if (isBot) {
    context.log(`BOT HANDLING: ${userAgent}`);
    
    // Get the Prerender token
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN");
    
    if (!prerenderToken) {
      context.log("ERROR: PRERENDER_TOKEN not found in environment variables");
      return new Response("Error: Prerender token not configured", {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
    
    // Full URL for Prerender.io
    const path = new URL(url).pathname;
    const fullUrl = `https://www.allergy-free-travel.com${path}`;
    
    context.log(`PRERENDER URL: https://service.prerender.io/${fullUrl}`);
    context.log(`PRERENDER TOKEN LENGTH: ${prerenderToken.length}`);
    
    try {
      // Make the request to Prerender.io with proper headers
      const prerenderResponse = await fetch(`https://service.prerender.io/${fullUrl}`, {
        headers: {
          'X-Prerender-Token': prerenderToken,
          'User-Agent': userAgent,
          'Accept': '*/*',
          'Host': 'service.prerender.io'
        }
      });
      
      const status = prerenderResponse.status;
      context.log(`PRERENDER RESPONSE STATUS: ${status}`);
      
      if (!prerenderResponse.ok) {
        context.log(`ERROR FROM PRERENDER: ${status}`);
        
        // Return error for debugging but with 200 status to avoid confusing bots
        return new Response(`Prerender service returned ${status} status.`, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
            'X-Debug-Info': `Prerender service returned ${status}`
          }
        });
      }
      
      // Get the prerendered content
      const responseBody = await prerenderResponse.text();
      const contentLength = responseBody.length;
      
      context.log(`PRERENDER RESPONSE LENGTH: ${contentLength}`);
      context.log(`PRERENDER RESPONSE SAMPLE: ${responseBody.substring(0, 100)}...`);
      
      // Check if we got a valid HTML response
      if (!responseBody.includes('<html') && !responseBody.includes('<!DOCTYPE html')) {
        context.log('ERROR: Prerender response does not contain HTML');
        
        // Fall back to direct rendering in emergency
        return context.next();
      }
      
      // Return the prerendered content with proper headers
      return new Response(responseBody, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'public, max-age=60',
          'X-Prerendered': 'true'
        }
      });
    } catch (error) {
      context.log(`CRITICAL ERROR WITH PRERENDER: ${error.message}`);
      context.log(`STACK: ${error.stack}`);
      
      // In case of failure, fall back to standard rendering
      return context.next();
    }
  }

  // Forward normal users without prerendering
  return context.next();
}
