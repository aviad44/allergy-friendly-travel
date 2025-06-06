
import { detectBot, isSocialMediaBot, isFacebookCrawler } from './bot-detection.js';
import { generateSocialTags, generateSocialHTML } from './social-tags.js';
import { handlePrerenderBot } from './prerender-handler.js';

export default async function handler(request, context) {
  const userAgent = request.headers.get('user-agent') || '';
  const url = request.url;
  const isBot = detectBot(userAgent);

  // Log all requests for debugging
  context.log(`Request from: ${userAgent}`);
  context.log(`URL requested: ${url}`);
  context.log(`Is bot detected: ${isBot}`);

  // Handle social media bots with special processing
  if (isSocialMediaBot(userAgent)) {
    context.log(`SOCIAL MEDIA BOT DETECTED: ${userAgent}`);
    context.log(`SOCIAL MEDIA URL: ${url}`);
    context.log(`Headers: ${JSON.stringify([...request.headers.entries()])}`);
    
    // For Facebook crawlers, directly render HTML with critical OG tags
    if (isFacebookCrawler(userAgent)) {
      try {
        const { ogTitle, ogDesc, ogImage } = generateSocialTags(url);
        const html = generateSocialHTML(url, ogTitle, ogDesc, ogImage);
        
        context.log(`FACEBOOK SPECIAL HANDLING: Sending direct HTML with OG Image: ${ogImage}`);
        
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'public, max-age=300',
            'Access-Control-Allow-Origin': '*', 
            'X-Robots-Tag': 'noindex, nofollow'
          }
        });
      } catch (error) {
        context.log(`ERROR IN FACEBOOK HANDLER: ${error.message}`);
      }
    }
  }

  // Handle other bots with Prerender
  if (isBot) {
    const prerenderResponse = await handlePrerenderBot(userAgent, url, context);
    if (prerenderResponse) {
      return prerenderResponse;
    }
    // If prerender fails, fall through to normal handling
  }

  // Forward normal users without prerendering
  return context.next();
}
