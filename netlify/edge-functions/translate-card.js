
export default async function handler(request, context) {
  // Comprehensive list of known bot user agents, with focus on social media
  const botUserAgents = [
    'facebookexternalhit',
    'Facebookexternalhit',
    'FacebookBot',
    'facebook',
    'Facebook',
    'WhatsApp',
    'whatsapp',
    'Twitterbot',
    'twitterbot',
    'Twitter',
    'Pinterest',
    'pinterest',
    'LinkedInBot',
    'linkedinbot',
    'Slackbot',
    'slackbot',
    'TelegramBot',
    'telegram',
    'Discordbot',
    'discord',
    'Googlebot',
    'googlebot',
    'bingbot',
    'Baiduspider',
    'seznambot',
    'bytespider',
    'ia_archiver',
    'facebot',
    'prerender',
    'prerendercloud',
    'Prerender',
    'PrerenderIO'
  ];

  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  
  // Convert user agent to lowercase for case-insensitive matching
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Check if the user agent is a bot
  const isBot = botUserAgents.some(botAgent => 
    lowerUserAgent.includes(botAgent.toLowerCase())
  ) || /bot|crawler|spider|facebook|whatsapp/i.test(lowerUserAgent);
  
  // Debug logging for ALL requests to help troubleshoot
  context.log(`Request from UserAgent: ${userAgent.substring(0, 100)}... for URL: ${url}`);

  // For debugging, log all incoming requests from potential WhatsApp/Facebook agents
  if (lowerUserAgent.includes('whatsapp') || lowerUserAgent.includes('facebook')) {
    context.log(`SOCIAL MEDIA detected: ${userAgent} for URL: ${url}`);
  }

  // Add the Prerender header for bots
  if (isBot) {
    context.log(`Bot detected and routing to Prerender: ${userAgent} for URL: ${url}`);
    
    // Get the Prerender token from environment variables
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    if (!prerenderToken) {
      context.log('Warning: PRERENDER_TOKEN is not set in environment variables');
    }
    
    // Generate a full URL for debugging purposes
    const fullUrl = `https://www.allergy-free-travel.com${new URL(url).pathname}`;
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // CRITICAL FIX: Force a 302 redirect to Prerender for bots
    return new Response(null, {
      status: 302,
      headers: {
        'Location': `https://service.prerender.io/${fullUrl}`,
        'Prerender': 'true',
        'X-Prerender-Token': prerenderToken,
        'x-prerender-requestid': requestId,
        'X-Original-User-Agent': userAgent,
        'Cache-Control': 'no-cache',
        'X-Debug-Social': 'true'
      }
    });
  }

  // Forward normal users without prerendering
  return context.next();
}
