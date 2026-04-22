import { createClient } from "@supabase/supabase-js";

/**
 * Admin Supabase client that uses the service role key.
 * Bypasses Row Level Security — use only in server-side API routes
 * where you need privileged access (e.g. inserting newsletter subscribers).
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
