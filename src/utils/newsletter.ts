import { supabase } from "@/integrations/supabase/client";

export interface NewsletterResult {
  ok: boolean;
  /** Machine-readable reason when ok is false (see supabase/functions/newsletter). */
  code?: string;
  /** confirm/unsubscribe: the address was already in the requested state. */
  already?: boolean;
}

type NewsletterRequest =
  | { action: "subscribe"; email: string; source?: string; website?: string }
  | { action: "confirm"; token: string }
  | { action: "unsubscribe"; token: string };

/**
 * Calls the `newsletter` Edge Function. The function answers non-2xx for
 * expected outcomes (bad token, expired link, rate limit), and supabase-js
 * hides that body inside error.context — unwrap it so callers get the `code`.
 */
export async function callNewsletter(body: NewsletterRequest): Promise<NewsletterResult> {
  try {
    const { data, error } = await supabase.functions.invoke("newsletter", { body });
    if (!error && data && typeof data === "object") return data as NewsletterResult;
    const ctx = (error as { context?: unknown } | null)?.context;
    if (ctx instanceof Response) {
      try {
        const parsed = await ctx.json();
        if (parsed && typeof parsed === "object" && "ok" in parsed) {
          return parsed as NewsletterResult;
        }
      } catch {
        /* fall through */
      }
    }
    return { ok: false, code: "network_error" };
  } catch {
    return { ok: false, code: "network_error" };
  }
}
