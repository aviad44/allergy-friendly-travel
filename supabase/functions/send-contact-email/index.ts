
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import { isAuthorized, unauthorizedResponse } from "../_shared/verifyAuth.ts";
import { validateBody, z } from "../_shared/validation.ts";

// Escape HTML special characters to prevent HTML/phishing injection in emails
const escapeHtml = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().max(320).regex(EMAIL_REGEX, "Invalid email address"),
  message: z.string().trim().min(1).max(5000),
});

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

  if (!(await isAuthorized(req))) {
    return unauthorizedResponse(corsHeaders);
  }

  try {
    {
      const validation = await validateBody(req, contactSchema, corsHeaders, {
        onError: (payload, status) =>
          new Response(JSON.stringify({ ...(payload as object), success: false }), {
            status,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }),
      });
      if (!validation.success) return validation.response;
      const { name, email, message } = validation.data;
      console.log(`✅ Request data parsed: ${name} (${email})`);

      // Escaped, safe versions for HTML interpolation
      const safeName = escapeHtml(name);
      const safeEmail = escapeHtml(email);
      const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');

      // Debug Resend API key
      console.log("📧 Attempting to use Resend with API key status:", !!resendApiKey);
      
      if (!resendApiKey) {
        console.error("❌ RESEND_API_KEY is not defined");
        return new Response(
          JSON.stringify({ 
            error: "Server configuration error: Resend API key is missing",
            success: false
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
      
      // Send email to admin
      console.log("📧 Sending admin email to aviad44@gmail.com...");
      try {
        const adminEmailResponse = await resend.emails.send({
          from: "Allergy Free Travel <onboarding@resend.dev>",
          to: ["aviad44@gmail.com"],
          subject: "New Contact Form Submission - Allergy Free Travel",
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
          `,
        });

        console.log("✅ Admin email sent response:", JSON.stringify(adminEmailResponse));
        
        // If there was an error in the response
        if ('error' in adminEmailResponse && adminEmailResponse.error) {
          console.error("❌ Resend API error:", adminEmailResponse.error);
          return new Response(
            JSON.stringify({ 
              error: `Email service error: ${JSON.stringify(adminEmailResponse.error)}`,
              success: false
            }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }

        // Send confirmation email to user
        console.log("📧 Sending user confirmation email...");
        let userEmailResponse;
        try {
          userEmailResponse = await resend.emails.send({
            from: "Allergy Free Travel <onboarding@resend.dev>",
            to: [email],
            subject: "We've received your message - Allergy Free Travel",
            html: `
              <h2>Thank you for contacting Allergy Free Travel!</h2>
              <p>Dear ${safeName},</p>
              <p>We've received your message and will get back to you as soon as possible.</p>
              <p>Here's a copy of your message:</p>
              <p>${safeMessage}</p>
              <p>Best regards,</p>
              <p>The Allergy Free Travel Team</p>
            `,
          });

          console.log("✅ User confirmation email sent response:", JSON.stringify(userEmailResponse));
          
          // If there was an error in the user email response
          if ('error' in userEmailResponse && userEmailResponse.error) {
            console.error("⚠️ User email had error but admin email was sent:", userEmailResponse.error);
          }

        } catch (userEmailError) {
          console.error("❌ Error sending user confirmation email:", userEmailError);
          // We don't throw here because we still want to return success if admin email was sent
          userEmailResponse = { error: userEmailError.message || "Failed to send confirmation email" };
        }

        return new Response(
          JSON.stringify({ 
            success: true,
            message: "Contact form submitted successfully",
            adminEmailId: adminEmailResponse.id,
            userEmailStatus: userEmailResponse?.error ? "failed" : "sent"
          }),
          {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      } catch (emailError) {
        console.error("❌ Error sending admin email:", emailError);
        return new Response(
          JSON.stringify({ 
            error: emailError instanceof Error ? emailError.message : "Failed to send email",
            success: false
          }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          }
        );
      }
    }
  } catch (error) {
    console.error('❌ Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ 
        error: "An unexpected error occurred",
        details: error instanceof Error ? error.message : 'Unknown error',
        success: false
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
