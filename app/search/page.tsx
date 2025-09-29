"use client"
import { useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { NavigationHeader } from "@/components/navigation-header"
import { SmartSearch } from "@/components/smart-search"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  return (
    <main className="min-h-screen bg-white">
      {/* Custom Header for Search Page */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="flex items-center justify-between w-full px-6 py-4">
          {/* Logo at absolute left */}
          <div className="glass-pill">
            <Link href="/" className="flex items-center px-4 py-2">
              <Image src="/tatva-ops-logo.png" alt="Tatva Ops" width={120} height={40} className="h-8 w-auto" />
            </Link>
          </div>
          {/* Login at absolute right */}
          <div className="glass-pill">
            <Button variant="ghost" className="text-tatva-charcoal hover:text-tatva-orange hover:bg-transparent transition-all duration-200 font-medium text-sm px-4 py-2 rounded-full">
              Login
            </Button>
          </div>
        </div>
      </header>
      
      <div className="pt-20">
        {/* Smart Search Bar at Top */}
        <div className="bg-white py-8 px-6 mb-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 border-2 border-gray-300 rounded-2xl px-6 py-4 max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4">
                <Search className="h-6 w-6 text-gray-600" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="flex-1 bg-transparent border-0 focus:outline-none text-lg placeholder-gray-500 text-gray-800"
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

        <div className="bg-white">
          <SmartSearch query={query} />
        </div>
      </div>
    </main>
  )
}
