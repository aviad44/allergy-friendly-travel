
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
    'pinterest',
    'instagrambot'
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
    
    // For Facebook crawlers, directly render HTML with critical OG tags
    if (lowerUserAgent.includes('facebook') || lowerUserAgent.includes('facebookexternalhit')) {
      try {
        // Get the path to determine which destination we're on
        const path = new URL(url).pathname;
        const destMatch = path.match(/\/destinations\/([a-zA-Z0-9-_]+)/);
        let ogTitle = "Allergy-Free Travel – Hotels for Food Allergies";
        let ogDesc = "Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind.";
        
        // Use a working image from Unsplash that we know is accessible
        let ogImage = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
        
        // Custom image handling for specific destinations using working Unsplash images
        if (destMatch) {
          const destId = destMatch[1].toLowerCase();
          
          // Map of critical destinations to their working images
          const criticalDestinations = {
            'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
            'cyprus': "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
            'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            'athens': "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=1200&q=80",
            'hotel-chains': "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            'ayia-napa': "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
            'rome': "https://images.unsplash.com/photo-1552832230-c0197047daf6?auto=format&fit=crop&w=1200&q=80",
            'tokyo': "https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=1200&q=80",
            'paris': "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            'switzerland': "https://images.unsplash.com/photo-1531816458010-fb7685eecbcb?auto=format&fit=crop&w=1200&q=80",
            'london': "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            'tuscany': "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=1200&q=80",
            'new-york': "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80",
            'portugal': "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1200&q=80"
          };
          
          if (criticalDestinations[destId]) {
            ogImage = criticalDestinations[destId];
            ogTitle = `Allergy-Friendly Hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)} | Safe Dining Guide`;
            ogDesc = `Discover the best allergy-friendly hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`;
          }
        }
        
        // For homepage, use a specific hotel/travel image from Unsplash
        if (path === '/' || path === '') {
          ogImage = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
          ogTitle = "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions";
          ogDesc = "Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more.";
        }
        
        // Create simple HTML response with essential OG tags that Facebook needs
        const html = `<!DOCTYPE html>
        <html prefix="og: https://ogp.me/ns#">
        <head>
          <meta charset="UTF-8">
          <title>${ogTitle}</title>
          <meta property="og:title" content="${ogTitle}" />
          <meta property="og:description" content="${ogDesc}" />
          <meta property="og:image" content="${ogImage}" />
          <meta property="og:image:secure_url" content="${ogImage}" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:image:type" content="image/jpeg" />
          <meta property="og:url" content="${url}" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Allergy-Free Travel" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="${ogImage}" />
          <meta name="twitter:title" content="${ogTitle}" />
          <meta name="twitter:description" content="${ogDesc}" />
          <link rel="canonical" href="${url}" />
          <link rel="image_src" href="${ogImage}" />
          <meta http-equiv="refresh" content="2;URL='${url}'" />
        </head>
        <body>
          <h1>${ogTitle}</h1>
          <p>${ogDesc}</p>
          <img src="${ogImage}" alt="Allergy Free Travel" style="width:100%; max-width:600px; height:auto;" />
          <p><a href="${url}">Continue to Allergy Free Travel</a></p>
        </body>
        </html>`;
        
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
