"use client"
import { useSearchParams } from "next/navigation"
import { NavigationHeader } from "@/components/navigation-header"
import { SearchResults } from "@/components/search-results"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <main className="min-h-screen bg-tatva-light-gray">
      <NavigationHeader />
      <div className="pt-24">
        <div className="relative mx-6 mb-8 rounded-3xl overflow-hidden shadow-2xl">
          <div className="relative h-96">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/modern-bedroom-design.png')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="relative h-full flex flex-col justify-center items-center text-center px-8">
              <h1 className="text-5xl font-bold text-white mb-4 text-balance">Interior Design Projects</h1>
              <p className="text-xl text-white/90 mb-2">Your dream space starts with expert interior design.</p>
              <p className="text-lg text-white/80">Here is everything we create for you.</p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-t-3xl shadow-xl">
          <SearchResults query={query} />
        </div>
      </div>
    </main>
  )
}
