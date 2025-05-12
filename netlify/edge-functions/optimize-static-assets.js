
export default async function handler(request, context) {
  // List of known bot user agents to route to Prerender.io
  const botUserAgents = [
    'facebookexternalhit',
    'whatsapp',
    'twitterbot',
    'linkedinbot',
    'pinterest',
    'slackbot',
    'telegram',
    'googlebot',
    'bingbot',
    'baiduspider',
    'seznambot',
    'bytespider',
    'ia_archiver',
    'facebot',
    'embedly',
    'quora',
    'discordbot',
    'preview'
  ];

  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  
  // Convert user agent to lowercase for case-insensitive matching
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Enhanced bot detection - more comprehensive check
  const isBot = botUserAgents.some(botAgent => 
    lowerUserAgent.includes(botAgent.toLowerCase())
  ) || /bot|crawler|spider|facebook|whatsapp/i.test(lowerUserAgent);

  // Enhanced logging for social media platforms
  if (lowerUserAgent.includes('whatsapp') || 
      lowerUserAgent.includes('facebook') || 
      lowerUserAgent.includes('twitter') ||
      lowerUserAgent.includes('linkedin')) {
    context.log(`SOCIAL MEDIA BOT DETECTED: ${userAgent} for URL: ${url}`);
  }

  // Add the Prerender header and redirect for bots
  if (isBot) {
    context.log(`BOT DETECTED AND ROUTING TO PRERENDER: ${userAgent} for URL: ${url}`);
    
    // Get the Prerender token from environment variables
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    if (!prerenderToken) {
      context.log('WARNING: PRERENDER_TOKEN is not set in environment variables');
    }
    
    // Full URL with protocol for Prerender.io
    const fullUrl = `https://www.allergy-free-travel.com${new URL(url).pathname}`;
    
    // Generate unique request ID for debugging
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Add Prerender headers and explicitly route to Prerender.io
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `https://service.prerender.io/${fullUrl}`,
        'Prerender': 'true',
        'X-Prerender-Token': prerenderToken,
        'x-prerender-requestid': requestId,
        'X-Original-User-Agent': userAgent,
        'Cache-Control': 'no-cache'
      }
    });
  }

  // Forward normal users without prerendering
  return context.next();
}
