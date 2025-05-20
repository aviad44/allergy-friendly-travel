
export default async function handler(request, context) {
  // Expanded list of known bot user agents, with focus on social media
  const botUserAgents = [
    'facebookexternalhit',
    'Facebookexternalhit',
    'FacebookBot',
    'facebook',
    'Facebook',
    'WhatsApp',
    'whatsapp',
    'Instagram',
    'instagram',
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
    'yandex',
    'Baiduspider',
    'seznambot',
    'bytespider',
    'ia_archiver',
    'facebot',
    'prerender',
    'prerendercloud',
    'Prerender'
  ];

  // Get the user agent from the request
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  const path = new URL(url).pathname;
  
  // Convert user agent to lowercase for case-insensitive matching
  const lowerUserAgent = userAgent.toLowerCase();
  
  // Enhanced social media bot detection
  const isFacebookBot = /facebook|facebookexternalhit/i.test(lowerUserAgent);
  const isWhatsAppBot = /whatsapp/i.test(lowerUserAgent);
  const isTwitterBot = /twitter/i.test(lowerUserAgent);
  const isOtherSocialBot = /pinterest|linkedin|instagram|telegram|slack/i.test(lowerUserAgent);
  
  // Check if this is any kind of social media bot
  const isSocialMediaBot = isFacebookBot || isWhatsAppBot || isTwitterBot || isOtherSocialBot;
  
  // Check if the user agent is a general web crawler bot
  const isWebCrawlerBot = botUserAgents.some(botAgent => 
    lowerUserAgent.includes(botAgent.toLowerCase())
  ) || /bot|crawler|spider|preview/i.test(lowerUserAgent);
  
  const isBot = isSocialMediaBot || isWebCrawlerBot;
  
  // Debug logging for ALL social media requests to help troubleshoot
  if (isSocialMediaBot) {
    context.log(`SOCIAL MEDIA BOT: ${userAgent}`);
    context.log(`URL: ${url}, Path: ${path}`);
    
    if (isFacebookBot) {
      context.log(`Facebook bot detected: ${userAgent}`);
    }
    if (isWhatsAppBot) {
      context.log(`WhatsApp bot detected: ${userAgent}`);
    }
  }

  // All bots should be routed through Prerender for consistent rendering
  if (isBot) {
    context.log(`Bot detected: ${userAgent}`);
    
    // Get the Prerender token from environment variables
    const prerenderToken = Deno.env.get("PRERENDER_TOKEN") || '';
    
    if (!prerenderToken) {
      context.log('CRITICAL ERROR: PRERENDER_TOKEN is not set in environment variables');
    }
    
    // Generate full absolute URL for prerendering
    const fullUrl = `https://www.allergy-free-travel.com${path}`;
    
    try {
      // Special handling to ensure metadata is correctly processed for social bots
      if (isSocialMediaBot) {
        context.log(`SOCIAL MEDIA BOT SPECIAL HANDLING: ${userAgent}`);
        
        // Use 301 redirect to Prerender with token in header
        return new Response(null, {
          status: 301,
          headers: {
            'Location': `https://service.prerender.io/${fullUrl}`,
            'X-Prerender-Token': prerenderToken,
            'Cache-Control': 'no-cache',
            'X-Debug-Bot-Type': isFacebookBot ? 'facebook' : 
                               isWhatsAppBot ? 'whatsapp' : 
                               isTwitterBot ? 'twitter' : 'other-social'
          }
        });
      }
      
      // Regular bot handling for non-social bots
      return new Response(null, {
        status: 301,
        headers: {
          'Location': `https://service.prerender.io/${fullUrl}`,
          'X-Prerender-Token': prerenderToken,
          'Cache-Control': 'no-cache'
        }
      });
    } catch (error) {
      context.log(`Error with Prerender: ${error.message}`);
      // If prerender fails, continue to normal rendering
      return context.next();
    }
  }

  // Forward normal users without prerendering
  return context.next();
}
