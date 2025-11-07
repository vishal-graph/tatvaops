import { createClient, type SupabaseClient } from "@supabase/supabase-js"

// Lazily create a server-side Supabase client.
// Avoid creating a client at module import time to prevent build-time failures when env vars are missing (e.g., on Vercel preview without env set yet).
export function getSupabaseServer(): SupabaseClient {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error("Supabase not configured: set SUPABASE_URL and SUPABASE_SERVICE_ROLE")
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}


