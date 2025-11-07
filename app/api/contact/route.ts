import { NextResponse } from "next/server"
import { z } from "zod"
import { getSupabaseServer } from "@/lib/supabase"

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  phone: z.string().optional(),
  message: z.string().min(1).max(2000),
})

export async function POST(req: Request) {
  try {
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
    }

    const json = await req.json()
    const parse = ContactSchema.safeParse(json)
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid input", issues: parse.error.flatten() }, { status: 400 })
    }

    const payload = {
      name: parse.data.name,
      email: parse.data.email,
      phone: parse.data.phone ?? null,
      message: parse.data.message,
      created_at: new Date().toISOString(),
    }

    const supabase = getSupabaseServer()
    const { error } = await supabase.from("contact_submissions").insert(payload)
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Unexpected error" }, { status: 500 })
  }
}


