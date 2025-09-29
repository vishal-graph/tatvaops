"use client"
import { useSearchParams } from "next/navigation"
import { NavigationHeader } from "@/components/navigation-header"
import { SmartSearch } from "@/components/smart-search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <main className="min-h-screen bg-tatva-light-gray">
      <NavigationHeader />
      <div className="pt-8">
        <div className="bg-white rounded-t-3xl shadow-xl">
          <SmartSearch query={query} />
        </div>
      </div>
    </main>
  )
}
