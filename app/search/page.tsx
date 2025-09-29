"use client"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { SmartSearch } from "@/components/smart-search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <main className="min-h-screen bg-tatva-light-gray">
      <NavigationHeader />
      <div className="pt-8">
        {/* Smart Search Bar at Top */}
        <div className="bg-white py-8 px-6 mb-6 rounded-3xl shadow-xl">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <Search className="h-6 w-6 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="flex-1 bg-transparent border-0 focus:outline-none text-lg placeholder-gray-400"
                  defaultValue={query}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const searchQuery = e.currentTarget.value;
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-t-3xl shadow-xl">
          <SmartSearch query={query} />
        </div>
      </div>
    </main>
  )
}
