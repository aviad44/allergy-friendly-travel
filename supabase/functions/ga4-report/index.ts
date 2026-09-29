import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { JWT } from "npm:google-auth-library@9";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Reporting-only integration, same shape as gsc-report — pulls real GA4
// data into pipeline_log instead of relying on the user pasting
// screenshots. Motivated by a real gap found 2026-09-29: the site fires a
// `hotel_booking_click` GA4 event (hotel_name + link_url params, see
// src/utils/googleAnalytics.ts) on every "Book Now" click, but with no way
// to see *which* hotels/pages those clicks were on without opening GA4
// Explore manually. This surfaces that breakdown automatically. Never
// writes to seo_articles or anything else live — GA4 has no equivalent of
// GSC's Indexing API concern, but the same "report-only, don't act on our
// own" posture applies.
//
// Requires two things only the user can set up (needs their own Google
// login — no tool here can do it): a Google Cloud service account with the
// Google Analytics Data API enabled, added as a Viewer on the GA4
// property (Admin > Property Access Management), with its JSON key saved
// as the GOOGLE_ANALYTICS_CREDENTIALS Supabase secret; and that GA4
// property's numeric Property ID (Admin > Property Settings) saved as the
// GA4_PROPERTY_ID secret. The same service account used for
// GOOGLE_SEARCH_CONSOLE_CREDENTIALS can be reused here — just enable the
// Analytics Data API on it too and add it as a GA4 user — no need for a
// second service account.
const HOTEL_BOOKING_CLICK_EVENT = 'hotel_booking_click';

interface GA4Row {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

// GA4's standard processing delay is shorter than GSC's, but same idea:
// look at a stable trailing window rather than including today's
// still-arriving data. 30 days gives a rolling view of affiliate-relevant
// interest rather than just the last week, since booking-click volume per
// hotel is low (see the ~94-click, ~2-month sample that prompted this).
function reportingWindow(): { startDate: string; endDate: string } {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 1);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - 29);
  const fmt = (d: Date) => d.toISOString().slice(0, 10);
  return { startDate: fmt(start), endDate: fmt(end) };
}

async function getAccessToken(credentialsJson: string): Promise<string> {
  let credentials: { client_email?: string; private_key?: string };
  try {
    credentials = JSON.parse(credentialsJson);
  } catch {
    throw new Error('GOOGLE_ANALYTICS_CREDENTIALS is not valid JSON — expected the full service-account key file content');
  }
  if (!credentials.client_email || !credentials.private_key) {
    throw new Error('GOOGLE_ANALYTICS_CREDENTIALS is missing client_email/private_key');
  }
  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    // Read-only: this integration only ever reads GA4 report data.
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });
  const token = await client.authorize();
  if (!token.access_token) throw new Error('Google did not return an access token — check the service account has been added as a user on the GA4 property');
  return token.access_token;
}

async function runReport(
  accessToken: string,
  propertyId: string,
  dimensionName: string,
  startDate: string,
  endDate: string,
): Promise<GA4Row[]> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: dimensionName }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: { value: HOTEL_BOOKING_CLICK_EVENT },
          },
        },
        orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
        limit: '15',
      }),
    }
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Analytics Data API ${res.status}: ${text.slice(0, 500)}`);
  }
  const data = await res.json();
  return data.rows || [];
}

async function fetchTotalEventCount(accessToken: string, propertyId: string, startDate: string, endDate: string): Promise<number> {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dateRanges: [{ startDate, endDate }],
        metrics: [{ name: 'eventCount' }],
        dimensionFilter: {
          filter: {
            fieldName: 'eventName',
            stringFilter: { value: HOTEL_BOOKING_CLICK_EVENT },
          },
        },
      }),
    }
  );
  if (!res.ok) return 0;
  const data = await res.json();
  const value = data.rows?.[0]?.metricValues?.[0]?.value;
  return value ? parseInt(value, 10) : 0;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  const cronSecret = Deno.env.get('CRON_SHARED_SECRET');
  if (cronSecret && req.headers.get('x-cron-secret') !== cronSecret) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const gaCredentials = Deno.env.get('GOOGLE_ANALYTICS_CREDENTIALS');
  const propertyId = Deno.env.get('GA4_PROPERTY_ID');

  if (!supabaseUrl || !supabaseKey) {
    return new Response(JSON.stringify({ error: 'Missing Supabase configuration' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
  if (!gaCredentials || !propertyId) {
    return new Response(JSON.stringify({
      error: 'GOOGLE_ANALYTICS_CREDENTIALS or GA4_PROPERTY_ID not configured',
      hint: 'Add a Google service-account JSON key as GOOGLE_ANALYTICS_CREDENTIALS (the same service account used for Search Console works — just also enable the Analytics Data API on it and add it as a Viewer on the GA4 property), and the GA4 property\'s numeric ID as GA4_PROPERTY_ID. See CLAUDE.md.',
    }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: logRow } = await supabase
    .from('pipeline_log')
    .insert({ run_type: 'ga4_report', status: 'running' })
    .select('id')
    .single();

  try {
    const accessToken = await getAccessToken(gaCredentials);
    const { startDate, endDate } = reportingWindow();

    const [byHotel, byPage, totalClicks] = await Promise.all([
      runReport(accessToken, propertyId, 'customEvent:hotel_name', startDate, endDate),
      runReport(accessToken, propertyId, 'pagePath', startDate, endDate),
      fetchTotalEventCount(accessToken, propertyId, startDate, endDate),
    ]);

    const topHotels = byHotel.map((r) => ({ hotel: r.dimensionValues[0].value, clicks: parseInt(r.metricValues[0].value, 10) }));
    const topPages = byPage.map((r) => ({ page: r.dimensionValues[0].value, clicks: parseInt(r.metricValues[0].value, 10) }));

    const summary = `${totalClicks} hotel_booking_click events in ${startDate}..${endDate}. `
      + `Top hotels: ${topHotels.slice(0, 5).map((h) => `${h.hotel} (${h.clicks})`).join(', ') || 'none'}. `
      + `Top pages: ${topPages.slice(0, 5).map((p) => `${p.page} (${p.clicks})`).join(', ') || 'none'}.`;

    await supabase.from('pipeline_log').update({
      status: 'success', error_message: summary, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);

    return new Response(JSON.stringify({
      period: { startDate, endDate },
      totalClicks,
      topHotels,
      topPages,
    }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (err) {
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    await supabase.from('pipeline_log').update({
      status: 'error', error_message: message, finished_at: new Date().toISOString(),
    }).eq('id', logRow.id);
    console.error('ga4-report error:', err);
    return new Response(JSON.stringify({ error: 'ga4-report failed', message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
