"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function onSubmit(formData: FormData) {
    setIsSubmitting(true)
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Failed to submit")
      toast.success("Thanks! We'll get back to you soon.")
      ;(document.getElementById("contact-form") as HTMLFormElement | null)?.reset()
    } catch (e: any) {
      toast.error(e?.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen pt-28 px-6">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl border shadow-sm p-6">
        <h1 className="text-2xl font-semibold mb-6">Contact Us</h1>
        <form id="contact-form" action={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <Input name="name" placeholder="Your name" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <Input type="email" name="email" placeholder="you@example.com" required />
          </div>
          <div>
            <label className="block text-sm mb-1">Phone</label>
            <Input name="phone" placeholder="Optional" />
          </div>
          <div>
            <label className="block text-sm mb-1">Message</label>
            <Textarea name="message" rows={5} placeholder="How can we help?" required />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </div>
    </main>
  )
}


