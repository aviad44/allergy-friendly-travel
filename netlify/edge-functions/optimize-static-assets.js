
export default async function handler(request, context) {
  // List of known bot user agents to route to Prerender.io
  const botUserAgents = [
    'facebookexternalhit',
    'WhatsApp',
    'Twitterbot',
    'Pinterest',
    'LinkedInBot',
    'Slackbot',
    'TelegramBot',
    'Discordbot',
    'Googlebot',
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
  
  // Check if the user agent is a bot
  const isBot = botUserAgents.some(botAgent => 
    userAgent.toLowerCase().includes(botAgent.toLowerCase())
  );

  // Add the Prerender header for bots
  if (isBot) {
    context.log(`Bot detected: ${userAgent} for URL: ${url}`);
    
    // Add Prerender header to trigger the redirect in netlify.toml
    return context.next({
      headers: {
        'Prerender': 'true',
        'X-Prerender-Token': process.env.PRERENDER_TOKEN || ''
      }
    });
  }

  // Forward normal users without prerendering
  return context.next();
}
