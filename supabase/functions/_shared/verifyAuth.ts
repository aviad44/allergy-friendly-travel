import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/**
 * Verifies that the incoming request carries a valid Supabase-issued token
 * (anonymous session key or an authenticated user JWT). This blocks arbitrary
 * anonymous internet callers from draining paid API quotas while still allowing
 * the public app (which always sends the project token via supabase-js) to work.
 */
export async function isAuthorized(req: Request): Promise<boolean> {
  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return false;
    const token = authHeader.replace("Bearer ", "").trim();
    if (!token) return false;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
    );
    const { data, error } = await supabase.auth.getClaims(token);
    return !error && !!data?.claims;
  } catch (_e) {
    return false;
  }
}

export function unauthorizedResponse(corsHeaders: Record<string, string>): Response {
  return new Response(
    JSON.stringify({ error: "Unauthorized" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}
