import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service_role key.
 * This bypasses Row Level Security — use ONLY in trusted server-side code.
 * Never expose this key on the client side.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
