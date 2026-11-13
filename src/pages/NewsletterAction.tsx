import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MetaManager } from "@/components/MetaManager";
import { callNewsletter } from "@/utils/newsletter";

type Action = "confirm" | "unsubscribe";

const COPY: Record<Action, { title: string; heading: string; intro: string; button: string; success: string }> = {
  confirm: {
    title: "Confirm your subscription | Allergy-Free Travel",
    heading: "Confirm your subscription",
    intro: "One last step: confirm that you'd like to receive the Allergy-Free Travel newsletter.",
    button: "Confirm my subscription",
    success: "You're subscribed. Thank you — you'll hear from us when there are new guides worth sharing.",
  },
  unsubscribe: {
    title: "Unsubscribe | Allergy-Free Travel",
    heading: "Unsubscribe from the newsletter",
    intro: "Click below and we'll stop emailing you right away.",
    button: "Unsubscribe me",
    success: "You've been unsubscribed and won't receive any more newsletters. Sorry to see you go.",
  },
};

const ERRORS: Record<string, string> = {
  invalid_token: "This link isn't valid. It may be incomplete or already replaced by a newer one.",
  expired: "This confirmation link has expired. Please sign up again to get a fresh one.",
};

/**
 * Landing page for the links in newsletter emails. Deliberately requires a
 * button click rather than acting on page load: mail scanners prefetch links,
 * and we don't want them confirming or unsubscribing anyone.
 */
export default function NewsletterAction({ action }: { action: Action }) {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const copy = COPY[action];
  const [status, setStatus] = useState<"idle" | "working" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const run = async () => {
    setStatus("working");
    const result = await callNewsletter({ action, token });
    if (result.ok) {
      setStatus("done");
    } else {
      setErrorMessage(ERRORS[result.code ?? ""] ?? "Something went wrong. Please try again in a moment.");
      setStatus("error");
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-xl">
      <MetaManager
        routeKey={`/newsletter/${action}`}
        dynamicData={{
          title: copy.title,
          description: copy.intro,
          robots: "noindex, nofollow",
        }}
      />
      <h1 className="font-display text-3xl font-bold mb-4">{copy.heading}</h1>

      {status === "done" ? (
        <p className="flex items-start gap-2" role="status">
          <CheckCircle2 className="h-5 w-5 mt-0.5 shrink-0 text-teal-600" aria-hidden="true" />
          <span>{copy.success}</span>
        </p>
      ) : !token ? (
        <p className="flex items-start gap-2 text-red-600" role="alert">
          <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
          <span>{ERRORS.invalid_token}</span>
        </p>
      ) : (
        <>
          <p className="mb-6 text-muted-foreground">{copy.intro}</p>
          <Button onClick={run} disabled={status === "working"}>
            {status === "working" && <Loader2 className="h-4 w-4 mr-2 animate-spin" aria-hidden="true" />}
            {copy.button}
          </Button>
          {status === "error" && (
            <p className="flex items-start gap-2 text-red-600 mt-4" role="alert">
              <AlertCircle className="h-5 w-5 mt-0.5 shrink-0" aria-hidden="true" />
              <span>{errorMessage}</span>
            </p>
          )}
        </>
      )}

      <p className="mt-10 text-sm">
        <Link to="/" className="text-teal-700 underline hover:text-teal-900">
          Back to Allergy-Free Travel
        </Link>
      </p>
    </div>
  );
}
