
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

// Initialize Resend with API key
const resendApiKey = Deno.env.get("RESEND_API_KEY");
console.log("RESEND_API_KEY defined:", resendApiKey ? "Yes" : "No");

const resend = new Resend(resendApiKey);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  console.log("📨 Contact form request received");
  
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log("✅ Handling CORS preflight request");
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let requestData;
    try {
      requestData = await req.json();
      const { name, email, message } = requestData;
      console.log(`✅ Request data parsed: ${name} (${email})`);

      // Validate required fields
      if (!name || !email || !message) {
        console.error("❌ Missing required fields");
        return new Response(
          JSON.stringify({ 
            error: "Missing required fields: name, email, and message are required"
          }),
          {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }

      // Debug Resend API key
      console.log("📧 Attempting to use Resend with API key status:", !!resendApiKey);
      
      // Send email to admin - UPDATED EMAIL ADDRESS HERE
      console.log("📧 Sending admin email to aviad44@gmail.com...");
      try {
        const adminEmailResponse = await resend.emails.send({
          from: "Allergy Free Travel <onboarding@resend.dev>",
          to: ["aviad44@gmail.com"],
          subject: "New Contact Form Submission - Allergy Free Travel",
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        });

        console.log("✅ Admin email sent response:", JSON.stringify(adminEmailResponse));
        
        // If there was an error in the response
        if (adminEmailResponse.error) {
          throw new Error(`Resend API error: ${JSON.stringify(adminEmailResponse.error)}`);
        }

        // Send confirmation email to user
        console.log("📧 Sending user confirmation email...");
        try {
          const userEmailResponse = await resend.emails.send({
            from: "Allergy Free Travel <onboarding@resend.dev>",
            to: [email],
            subject: "We've received your message - Allergy Free Travel",
            html: `
              <h2>Thank you for contacting Allergy Free Travel!</h2>
              <p>Dear ${name},</p>
              <p>We've received your message and will get back to you as soon as possible.</p>
              <p>Here's a copy of your message:</p>
              <p>${message.replace(/\n/g, '<br>')}</p>
              <p>Best regards,</p>
              <p>The Allergy Free Travel Team</p>
            `,
          });

          console.log("✅ User confirmation email sent response:", JSON.stringify(userEmailResponse));
          
          // If there was an error in the user email response
          if (userEmailResponse.error) {
            console.error("⚠️ User email had error but admin email was sent:", userEmailResponse.error);
          }

        } catch (userEmailError) {
          console.error("❌ Error sending user confirmation email:", userEmailError);
          // We don't throw here because we still want to return success if admin email was sent
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            message: "Contact form submitted successfully",
            adminEmailId: adminEmailResponse.id,
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (emailError) {
        console.error("❌ Error sending admin email:", emailError);
        throw emailError;
      }
    } catch (parseError) {
      console.error("❌ Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request body", 
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error' 
        }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  } catch (error) {
    console.error('❌ Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
