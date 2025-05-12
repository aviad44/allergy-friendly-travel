
export default async function handler(request, context) {
  // Expanded list of known bot user agents to route to Prerender.io
  const botUserAgents = [
    'facebookexternalhit',
    'Facebookexternalhit',
    'FacebookBot',
    'facebook',
    'Facebook',
    'whatsapp',
    'WhatsApp',
    'twitter',
    'Twitter',
    'twitterbot',
    'Twitterbot',
    'linkedinbot',
    'LinkedInBot',
    'pinterest',
    'Pinterest',
    'slack',
    'Slackbot',
    'telegram',
    'Telegram',
    'googlebot',
    'Googlebot',
    'bingbot',
    'Bingbot',
    'baiduspider',
    'Baiduspider',
    'seznambot',
    'bytespider',
    'ia_archiver',
    'facebot',
    'embedly',
    'quora',
    'discordbot',
    'preview',
    'yandex',
    'duckduckbot',
    'skype'
  ];

  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  
  // Convert user agent to lowercase for case-insensitive matching
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Enhanced bot detection - more aggressive check
  const isBot = botUserAgents.some(botAgent => 
    lowerUserAgent.includes(botAgent.toLowerCase())
  ) || /bot|crawler|spider|facebook|whatsapp|social|preview/i.test(lowerUserAgent);

  // Enhanced logging for debugging - log ALL requests for troubleshooting
  context.log(`Request from: ${userAgent} for URL: ${url} | isBot: ${isBot}`);

  // Enhanced logging for social media platforms
  if (lowerUserAgent.includes('facebook') || 
      lowerUserAgent.includes('whatsapp') || 
      lowerUserAgent.includes('twitter') ||
      lowerUserAgent.includes('bot')) {
    context.log(`SOCIAL MEDIA BOT DETECTED: ${userAgent} for URL: ${url}`);
  }

  // Add the Prerender header and redirect for bots
  if (isBot) {
    context.log(`BOT DETECTED AND ROUTING TO PRERENDER: ${userAgent} for URL: ${url}`);
    
    // Get the Prerender token from environment variables - CRITICAL: This must be correctly set
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    if (!prerenderToken) {
      context.log('CRITICAL ERROR: PRERENDER_TOKEN is not set in environment variables');
    }
    
    // Full URL with protocol for Prerender.io
    const fullUrl = `https://www.allergy-free-travel.com${new URL(url).pathname}`;
    
    // Generate unique request ID for debugging
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    // Special handling for Crete page
    if (url.includes('/destinations/crete')) {
      context.log(`CRITICAL: Processing Crete page for bot: ${userAgent}`);
      
      // CRITICAL: Direct request to Prerender with token in header
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `https://service.prerender.io/${fullUrl}`,
          'X-Prerender-Token': prerenderToken,
          'Cache-Control': 'no-cache, no-store',
          'X-Debug-BotDetection': 'true',
          'X-Debug-Path': 'Crete-specific-path',
          'X-Bot-UserAgent': userAgent.substring(0, 200) // Truncate if too long
        }
      });
    }
    
    // CRITICAL FIX: Add Prerender headers and explicitly route to Prerender.io with 301 redirect
    return new Response(null, {
      status: 301,
      headers: {
        'Location': `https://service.prerender.io/${fullUrl}`,
        'X-Prerender-Token': prerenderToken,
        'Cache-Control': 'no-cache, no-store',
        'X-Debug-BotDetection': 'true',
        'X-Bot-UserAgent': userAgent.substring(0, 200) // Truncate if too long
      }
    });
  }

  // Forward normal users without prerendering
  return context.next();
}
