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
        {/* Our Services Banner */}
        <div className="relative py-20 px-8 mx-4 rounded-[2rem] overflow-hidden shadow-2xl">
          {/* Background Image - better styling image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-[2rem]"
              style={{
              backgroundImage: "url('/modern-interior-design-living-room-with-natural-li.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat"
            }}
          />
          {/* Subtle overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20 rounded-[2rem]"></div>
          {/* Content with better contrast */}
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 drop-shadow-2xl tracking-tight">
              Our Services
            </h1>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-lg font-medium">
              Discover a comprehensive range of home services designed to transform your living space. 
              From interior design to maintenance, we connect you with verified professionals for all your needs.
            </p>
          </div>
        </div>
        
        {/* Search Bar Section */}
        <div className="bg-white py-8 px-6 -mt-4 relative z-20">
          <div className="max-w-4xl mx-auto">
            <div className="glass-pill px-6 py-4 max-w-2xl mx-auto shadow-lg">
              <div className="flex items-center gap-4">
                <Search className="h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="flex-1 bg-transparent border-0 focus:outline-none text-lg"
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
