import { createClient } from "@supabase/supabase-js"

// Server-side Supabase client. Requires env vars to be set.
// SUPABASE_URL: e.g. https://xyzcompany.supabase.co
// SUPABASE_SERVICE_ROLE: service role key (server-only)

const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE as string

if (!supabaseUrl || !supabaseServiceRoleKey) {
  // We avoid throwing during import to not crash Next dev server; API route will validate.
  // eslint-disable-next-line no-console
  console.warn("Supabase env vars missing: SUPABASE_URL / SUPABASE_SERVICE_ROLE")
}

export const supabaseServer = createClient(supabaseUrl || "", supabaseServiceRoleKey || "")


