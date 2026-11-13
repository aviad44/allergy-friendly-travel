import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NEWSLETTER_ENABLED } from "@/constants/newsletter";
import { callNewsletter } from "@/utils/newsletter";

interface NewsletterSignupProps {
  /** Which placement this is ('footer', 'article', ...), stored with the subscriber. */
  source: string;
  variant?: "compact" | "card";
}

const ERROR_MESSAGES: Record<string, string> = {
  invalid_email: "That doesn't look like a valid email address.",
  try_later: "We're getting a lot of signups right now. Please try again in a little while.",
  not_configured: "Newsletter signup isn't available yet. Please check back soon.",
  send_failed: "We couldn't send the confirmation email. Please try again in a moment.",
};

export function NewsletterSignup({ source, variant = "card" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  // Honeypot: hidden from people, tempting to bots. Anything in here => the
  // server silently discards the signup.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  if (!NEWSLETTER_ENABLED) return null;

  const inputId = `newsletter-email-${source}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;
    setError(null);
    setStatus("submitting");
    const result = await callNewsletter({ action: "subscribe", email, source, website });
    if (result.ok) {
      setStatus("done");
      return;
    }
    setStatus("idle");
    setError(ERROR_MESSAGES[result.code ?? ""] ?? "Something went wrong. Please try again.");
  };

  const wrapper =
    variant === "card"
      ? "rounded-xl border border-teal-100 bg-teal-50/60 p-6"
      : "";

  if (status === "done") {
    return (
      <div className={wrapper} role="status">
        <p className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-teal-600" aria-hidden="true" />
          <span>
            Almost done &mdash; we've emailed you a confirmation link. Click it to finish
            subscribing. (Check your spam folder if it doesn't arrive in a few minutes.)
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className={wrapper}>
      <h3 className={variant === "card" ? "text-lg font-semibold text-teal-900 mb-1" : "text-base font-semibold mb-2"}>
        <Mail className="inline h-4 w-4 mr-2 -mt-0.5" aria-hidden="true" />
        Get allergy-friendly travel guides by email
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        New hotel and restaurant guides backed by real traveler evidence. No spam,
        unsubscribe anytime.
      </p>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col sm:flex-row gap-2">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <Input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={254}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className="bg-white"
        />
        {/* Honeypot — keep out of the accessibility tree and tab order. */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label>
            Leave this field empty
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
        <Button type="submit" disabled={status === "submitting"} className="shrink-0">
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />
              Subscribing…
            </>
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
      {error && (
        <p className="text-sm text-red-600 mt-2" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-2">
        We'll email you a link to confirm. See our{" "}
        <Link to="/privacy/" className="underline hover:text-primary">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
