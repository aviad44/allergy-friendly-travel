
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ReviewNotificationRequest {
  authorName: string;
  reviewText: string;
  rating: number;
  destination?: string;
  travelerType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { authorName, reviewText, rating, destination, travelerType }: ReviewNotificationRequest = await req.json();

    console.log("Sending review notification email for:", { authorName, rating });

    const emailResponse = await resend.emails.send({
      from: "Allergy Free Travel <onboarding@resend.dev>",
      to: ["aviad44@gmail.com"],
      subject: `ביקורת חדשה נוספה לאתר - ${rating} כוכבים`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; direction: rtl;">
          <h1 style="color: #2563eb; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">ביקורת חדשה נוספה לאתר</h1>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0 0 10px 0; color: #374151;">פרטי הביקורת:</h3>
            <p><strong>שם המחבר:</strong> ${authorName}</p>
            <p><strong>דירוג:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
            ${destination ? `<p><strong>יעד:</strong> ${destination}</p>` : ''}
            ${travelerType ? `<p><strong>סוג נוסע:</strong> ${travelerType}</p>` : ''}
          </div>
          
          <div style="background-color: #f0f9ff; padding: 15px; border-radius: 8px; border-right: 4px solid #2563eb;">
            <h3 style="margin: 0 0 10px 0; color: #1e40af;">תוכן הביקורת:</h3>
            <p style="line-height: 1.6; color: #374151;">"${reviewText}"</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              ביקורת זו נוספה באופן אוטומטי לאתר. אם תרצה לנהל את הביקורות, היכנס לעמוד הביקורות באתר.
            </p>
            <p style="color: #6b7280; font-size: 14px;">
              <a href="https://your-site-url.com/reviews" style="color: #2563eb;">צפה בכל הביקורות</a>
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-review-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
