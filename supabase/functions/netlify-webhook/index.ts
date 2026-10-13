import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

let cachedSecret: string | null = null;
let cachedSecretAt = 0;
const SECRET_CACHE_MS = 60_000;

async function getWebhookSecret(): Promise<string | null> {
  if (cachedSecret && Date.now() - cachedSecretAt < SECRET_CACHE_MS) {
    return cachedSecret;
  }
  const { data, error } = await supabase
    .from("webhook_secrets")
    .select("secret")
    .eq("is_active", true)
    .maybeSingle();
  if (error || !data) {
    console.error("Failed to read webhook secret from database");
    return null;
  }
  cachedSecret = data.secret;
  cachedSecretAt = Date.now();
  return cachedSecret;
}

// ── JWS signature verification (Netlify's X-Webhook-Signature header) ──
// Netlify signs the raw request body with HS256 using a JWS secret token.
// The JWT payload contains { iss: "netlify", sha256: "<hex of body>" }.
// We verify the JWT and check that sha256 matches the raw body hash.
async function verifyJwsSignature(
  signatureHeader: string,
  rawBody: Uint8Array,
  secret: string,
): Promise<boolean> {
  try {
    // Manually decode the JWT (unverified) to extract the header and payload
    const parts = signatureHeader.split(".");
    if (parts.length !== 3) return false;

    // Decode header
    const headerJson = new TextDecoder().decode(
      base64UrlDecode(parts[0]),
    );
    const header = JSON.parse(headerJson);
    if (header.alg !== "HS256") return false;

    // Verify the signature using HMAC-SHA256
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const signedData = new TextEncoder().encode(parts[0] + "." + parts[1]);
    const signatureBytes = base64UrlDecode(parts[2]);

    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      signedData,
    );
    if (!valid) return false;

    // Decode payload and verify claims
    const payloadJson = new TextDecoder().decode(base64UrlDecode(parts[1]));
    const payload = JSON.parse(payloadJson);

    if (payload.iss !== "netlify") return false;

    // Verify body hash
    const bodyHash = await crypto.subtle.digest("SHA-256", rawBody);
    const bodyHashHex = Array.from(new Uint8Array(bodyHash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return payload.sha256 === bodyHashHex;
  } catch {
    return false;
  }
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = padded.length % 4;
  const b64 = pad ? padded + "=".repeat(4 - pad) : padded;
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// ── Timing-safe string comparison ──
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

const REQUIRED_FIELDS = ["name", "email", "phone"] as const;

interface NetlifyPayload {
  id: string;
  number: number;
  title: string | null;
  email: string | null;
  name: string | null;
  first_name: string | null;
  last_name: string | null;
  company: string | null;
  summary: string | null;
  body: string | null;
  data: Record<string, string>;
  created_at: string;
  form_id: string | null;
  form_name: string | null;
  site_url: string | null;
}

function jsonResponse(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function getField(data: Record<string, string>, ...keys: string[]): string {
  for (const k of keys) {
    const v = data[k];
    if (v && v.trim()) return v.trim();
  }
  return "";
}

async function getSystemAdminId(): Promise<string> {
  const { data, error } = await supabase
    .from("admin_profiles")
    .select("user_id")
    .order("created_at")
    .limit(1)
    .maybeSingle();
  if (error || !data) {
    throw new Error("No admin found in admin_profiles to attribute webhook creates");
  }
  return data.user_id;
}

async function processSubmission(
  payload: NetlifyPayload,
): Promise<{ submissionId: string; brideId: string; created: boolean }> {
  const source = "netlify_form";
  const sourceId = payload.id;
  const d = payload.data || {};
  const submittedAt = payload.created_at || new Date().toISOString();

  const name = getField(d, "name", "Name");
  const email = getField(d, "email", "Email");
  const phone = getField(d, "phone", "Phone number", "phone", "Phone");
  const contactMethod = getField(d, "preferredContactMethod", "preferred_contact_method");
  const weddingDate = getField(d, "weddingDate", "wedding_date");
  const plannedBudget = getField(d, "plannedBudget", "planned_budget");
  const guestSize = getField(d, "guestSize", "guest_size");

  const missing = REQUIRED_FIELDS.filter((f) => {
    if (f === "name") return !name;
    if (f === "email") return !email;
    if (f === "phone") return !phone;
    return false;
  });

  if (missing.length > 0) {
    const { error: syncErr } = await supabase.from("sync_events").upsert(
      {
        source,
        source_id: sourceId,
        status: "failed",
        error_message: `Missing required fields: ${missing.join(", ")}`,
      },
      { onConflict: "source,source_id" },
    );
    if (syncErr) throw new Error(`Failed to log sync_event: ${syncErr.message}`);
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }

  const systemAdminId = await getSystemAdminId();

  // Find or create bride by email (case-insensitive match)
  let brideId: string;
  let created = false;

  const { data: existing, error: findErr } = await supabase
    .from("brides")
    .select("id")
    .ilike("email", email)
    .is("deleted_at", null)
    .maybeSingle();

  if (findErr) throw new Error(`Bride lookup failed: ${findErr.message}`);

  if (existing) {
    brideId = existing.id;
  } else {
    const { data: newBride, error: insertErr } = await supabase
      .from("brides")
      .insert({
        first_name: name,
        email,
        phone,
        wedding_date: weddingDate || null,
        created_by: systemAdminId,
      })
      .select("id")
      .single();

    if (insertErr) {
      // Race condition: another concurrent request may have created the bride
      if (insertErr.code === "23505") {
        const { data: retry, error: retryErr } = await supabase
          .from("brides")
          .select("id")
          .ilike("email", email)
          .is("deleted_at", null)
          .maybeSingle();
        if (retryErr || !retry) {
          throw new Error("Bride creation race condition retry failed");
        }
        brideId = retry.id;
      } else {
        throw new Error(`Bride creation failed: ${insertErr.message}`);
      }
    } else {
      brideId = newBride.id;
      created = true;
    }
  }

  // Insert form_submission (idempotent via unique(source, source_id))
  const { data: submission, error: subErr } = await supabase
    .from("form_submissions")
    .insert({
      bride_id: brideId,
      name,
      email,
      phone,
      preferred_contact_method: contactMethod || null,
      wedding_date: weddingDate || null,
      planned_budget: plannedBudget || null,
      guest_size: guestSize || null,
      source,
      source_id: sourceId,
      original_submitted_at: submittedAt,
    })
    .select("id")
    .single();

  let submissionId: string;

  if (subErr) {
    if (subErr.code === "23505") {
      // Duplicate delivery — already processed
      const { data: existing2, error: fetchErr } = await supabase
        .from("form_submissions")
        .select("id")
        .eq("source", source)
        .eq("source_id", sourceId)
        .maybeSingle();
      if (fetchErr || !existing2) {
        throw new Error("Duplicate detection but fetch failed");
      }
      submissionId = existing2.id;

      // Mark sync_event as duplicate
      await supabase.from("sync_events").upsert(
        {
          source,
          source_id: sourceId,
          status: "duplicate",
          form_submission_id: submissionId,
          processed_at: new Date().toISOString(),
        },
        { onConflict: "source,source_id" },
      );

      return { submissionId, brideId, created };
    }
    throw new Error(`Form submission insert failed: ${subErr.message}`);
  }

  submissionId = submission.id;

  // Log successful sync_event
  const { error: syncErr } = await supabase.from("sync_events").upsert(
    {
      source,
      source_id: sourceId,
      status: "processed",
      form_submission_id: submissionId,
      processed_at: new Date().toISOString(),
    },
    { onConflict: "source,source_id" },
  );
  if (syncErr) throw new Error(`Sync event log failed: ${syncErr.message}`);

  return { submissionId, brideId, created };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  try {
    // Read the raw body once — needed for JWS signature verification
    const rawBody = await req.text();
    const rawBytes = new TextEncoder().encode(rawBody);

    // ── Authentication ──
    // Primary: Netlify JWS signature (X-Webhook-Signature header + JWS secret in Netlify UI)
    // Fallback: secret in query parameter (for environments without JWS support)
    const webhookSecret = await getWebhookSecret();
    if (!webhookSecret) {
      console.error("Webhook secret not configured in webhook_secrets table");
      return jsonResponse(500, { error: "Server misconfigured" });
    }

    const signatureHeader = req.headers.get("X-Webhook-Signature");
    let authenticated = false;
    let authMethod = "none";

    if (signatureHeader) {
      // Verify JWS signature (Netlify's recommended method)
      authenticated = await verifyJwsSignature(signatureHeader, rawBytes, webhookSecret);
      if (authenticated) authMethod = "jws_signature";
    }

    if (!authenticated) {
      // Fallback: check query parameter ?secret=...
      const url = new URL(req.url);
      const querySecret = url.searchParams.get("secret");
      if (querySecret) {
        authenticated = timingSafeEqual(querySecret, webhookSecret);
        if (authenticated) authMethod = "query_secret";
      }
    }

    if (!authenticated) {
      return jsonResponse(401, { error: "Unauthorized" });
    }

    console.log(`Webhook authenticated via ${authMethod}`);

    // ── Parse and validate payload ──
    let payload: NetlifyPayload;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return jsonResponse(400, { error: "Invalid JSON" });
    }

    if (!payload.id || typeof payload.id !== "string") {
      return jsonResponse(400, { error: "Missing submission id" });
    }
    if (!payload.data || typeof payload.data !== "object") {
      return jsonResponse(400, { error: "Missing form data" });
    }
    if (!payload.created_at || typeof payload.created_at !== "string") {
      return jsonResponse(400, { error: "Missing created_at timestamp" });
    }

    const result = await processSubmission(payload);

    return jsonResponse(200, {
      success: true,
      submission_id: result.submissionId,
      bride_id: result.brideId,
      bride_created: result.created,
    });
  } catch (err) {
    console.error("Webhook processing error:", err.message);
    return jsonResponse(500, { error: err.message });
  }
});
