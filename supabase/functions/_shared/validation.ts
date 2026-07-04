// Centralized request validation for all edge functions.
// Provides strict body-size limits, safe JSON parsing, and Zod schema
// validation with consistent 400 responses. This blocks malformed payloads
// and injection attempts (oversized input, wrong types, unexpected fields)
// before any function logic or external API call runs.
import { z } from "https://esm.sh/zod@3.23.8";

export { z };

// Default hard cap on request body size (bytes). Individual functions can
// override for endpoints that legitimately accept larger text (e.g. menus).
const DEFAULT_MAX_BODY_BYTES = 100_000; // 100 KB

export type ValidationSuccess<T> = { success: true; data: T };
export type ValidationFailure = { success: false; response: Response };
export type ValidationResult<T> = ValidationSuccess<T> | ValidationFailure;

function jsonResponse(
  body: unknown,
  status: number,
  corsHeaders: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

/**
 * Reads, size-limits, JSON-parses and schema-validates a request body.
 * Returns either { success: true, data } with the typed, validated payload,
 * or { success: false, response } with a ready-to-return 400 Response.
 */
export async function validateBody<T extends z.ZodTypeAny>(
  req: Request,
  schema: T,
  corsHeaders: Record<string, string>,
  opts: { maxBytes?: number; onError?: (payload: unknown, status: number) => Response } = {},
): Promise<ValidationResult<z.infer<T>>> {
  const maxBytes = opts.maxBytes ?? DEFAULT_MAX_BODY_BYTES;
  const fail = (payload: unknown, status = 400): ValidationFailure => ({
    success: false,
    response: opts.onError ? opts.onError(payload, status) : jsonResponse(payload, status, corsHeaders),
  });

  // Reject oversized payloads early using the declared Content-Length.
  const declaredLength = Number(req.headers.get("content-length") ?? "0");
  if (declaredLength && declaredLength > maxBytes) {
    return fail({ error: "Request body too large" }, 413);
  }

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return fail({ error: "Unable to read request body" });
  }

  // Guard against chunked/undeclared oversized bodies.
  if (raw.length > maxBytes) {
    return fail({ error: "Request body too large" }, 413);
  }

  let parsedJson: unknown;
  try {
    parsedJson = raw ? JSON.parse(raw) : {};
  } catch {
    return fail({ error: "Invalid JSON in request body" });
  }

  const result = schema.safeParse(parsedJson);
  if (!result.success) {
    return fail({
      error: "Validation failed",
      details: result.error.flatten().fieldErrors,
    });
  }

  return { success: true, data: result.data };
}

// Reusable field schemas shared across functions.
export const allergiesSchema = z.union([
  z.string().trim().max(500),
  z.array(z.string().trim().min(1).max(100)).max(50),
]);
