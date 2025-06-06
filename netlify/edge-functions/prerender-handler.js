
export async function handlePrerenderBot(userAgent, url, context) {
  context.log(`BOT HANDLING: ${userAgent}`);
  
  const prerenderToken = Deno.env.get("PRERENDER_TOKEN");
  
  if (!prerenderToken) {
    context.log("ERROR: PRERENDER_TOKEN not found in environment variables");
    return new Response("Error: Prerender token not configured", {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
  
  const path = new URL(url).pathname;
  const fullUrl = `https://www.allergy-free-travel.com${path}`;
  
  context.log(`PRERENDER URL: https://service.prerender.io/${fullUrl}`);
  context.log(`PRERENDER TOKEN LENGTH: ${prerenderToken.length}`);
  
  try {
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
      
      return new Response(`Prerender service returned ${status} status.`, {
        status: 200,
        headers: {
          'Content-Type': 'text/html',
          'X-Debug-Info': `Prerender service returned ${status}`
        }
      });
    }
    
    const responseBody = await prerenderResponse.text();
    const contentLength = responseBody.length;
    
    context.log(`PRERENDER RESPONSE LENGTH: ${contentLength}`);
    context.log(`PRERENDER RESPONSE SAMPLE: ${responseBody.substring(0, 100)}...`);
    
    if (!responseBody.includes('<html') && !responseBody.includes('<!DOCTYPE html')) {
      context.log('ERROR: Prerender response does not contain HTML');
      return null; // Signal fallback needed
    }
    
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
    
    return null; // Signal fallback needed
  }
}
