
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
    
    // For Facebook crawlers, directly render HTML with critical OG tags
    if (lowerUserAgent.includes('facebook') || lowerUserAgent.includes('facebookexternalhit')) {
      try {
        // Get the path to determine which destination we're on
        const path = new URL(url).pathname;
        const destMatch = path.match(/\/destinations\/([a-zA-Z0-9-_]+)/);
        let ogTitle = "Allergy-Free Travel – Hotels for Food Allergies";
        let ogDesc = "Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind.";
        let ogImage = "https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png";
        
        // Custom image handling for specific destinations
        if (destMatch) {
          const destId = destMatch[1].toLowerCase();
          
          // Map of critical destinations to their images (MUST match what's in our components)
          const criticalDestinations = {
            'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=1200&q=80",
            'cyprus': "https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png",
            'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            'athens': "https://www.allergy-free-travel.com/lovable-uploads/18709218-6a75-419b-a128-9afbde81c142.png",
            'hotel-chains': "https://www.allergy-free-travel.com/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
            'ayia-napa': "https://www.allergy-free-travel.com/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png"
          };
          
          if (criticalDestinations[destId]) {
            ogImage = criticalDestinations[destId];
            ogTitle = `Allergy-Friendly Hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)} | Safe Dining Guide`;
            ogDesc = `Discover the best allergy-friendly hotels in ${destId.charAt(0).toUpperCase() + destId.slice(1)}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`;
          }
        }
        
        // For homepage, use default image
        if (path === '/' || path === '') {
          ogImage = "https://www.allergy-free-travel.com/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png";
        }
        
        // Create simple HTML response with essential OG tags that Facebook needs
        const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>${ogTitle}</title>
          <meta property="og:title" content="${ogTitle}" />
          <meta property="og:description" content="${ogDesc}" />
          <meta property="og:image" content="${ogImage}" />
          <meta property="og:image:secure_url" content="${ogImage}" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:url" content="${url}" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content="${ogImage}" />
          <link rel="canonical" href="${url}" />
          <meta http-equiv="refresh" content="0;URL='${url}'" />
        </head>
        <body>
          <p>Redirecting to Allergy Free Travel...</p>
          <img src="${ogImage}" alt="Allergy Free Travel" style="width:100%; max-width:600px;" />
        </body>
        </html>`;
        
        context.log(`FACEBOOK SPECIAL HANDLING: Sending direct HTML with OG Image: ${ogImage}`);
        
        return new Response(html, {
          status: 200,
          headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-store, max-age=0',
            'X-Robots-Tag': 'noindex'
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
