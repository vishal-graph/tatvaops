"use client"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { SmartSearch } from "@/components/smart-search"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <main className="h-screen bg-white overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Slim Search Bar at Top */}
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 border border-gray-300 rounded-full px-4 py-2 max-w-2xl mx-auto shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="flex-1 bg-transparent border-0 focus:outline-none text-sm placeholder-gray-500 text-gray-800"
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

        {/* Search Results - Scrollable only when needed */}
        <div className="flex-1 overflow-y-auto">
          <SmartSearch query={query} />
        </div>
      </div>
    </main>
  )
}
