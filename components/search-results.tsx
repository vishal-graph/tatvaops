"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  title: string
  room: string
  image: string
  price: string
  rating: number
  description: string
  features: string[]
  metric: string
  goal: string
}

const roomCategories = [
  "All Rooms",
  "Living Room",
  "Kitchen",
  "Bedroom",
  "Bathroom",
  "Dining Room",
  "Office",
  "Balcony",
]

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Modern Living Room",
    room: "Living Room",
    image: "/modern-living-room-city-view.png",
    price: "₹2,50,000",
    rating: 4.8,
    description: "Contemporary design with city view",
    features: ["Premium furniture", "Smart lighting", "Custom storage"],
    metric: "450 sq ft",
    goal: "Maximize space efficiency",
  },
  {
    id: "2",
    title: "Luxury Kitchen",
    room: "Kitchen",
    image: "/modern-kitchen-design.png",
    price: "₹3,75,000",
    rating: 4.9,
    description: "High-end modular kitchen design",
    features: ["Italian marble", "Built-in appliances", "Island counter"],
    metric: "280 sq ft",
    goal: "Premium cooking experience",
  },
  {
    id: "3",
    title: "Master Bedroom",
    room: "Bedroom",
    image: "/modern-bedroom-design.png",
    price: "₹1,85,000",
    rating: 4.7,
    description: "Elegant bedroom with walk-in closet",
    features: ["Custom wardrobes", "Ambient lighting", "Premium bedding"],
    metric: "320 sq ft",
    goal: "Peaceful retreat design",
  },
  {
    id: "4",
    title: "Spa Bathroom",
    room: "Bathroom",
    image: "/modern-bathroom-design.png",
    price: "₹2,25,000",
    rating: 4.8,
    description: "Luxury bathroom with modern fixtures",
    features: ["Rain shower", "Heated floors", "Smart mirrors"],
    metric: "120 sq ft",
    goal: "Luxury spa experience",
  },
  {
    id: "5",
    title: "Marble Living Room",
    room: "Living Room",
    image: "/luxury-living-room-marble.png",
    price: "₹4,50,000",
    rating: 4.9,
    description: "Luxurious marble-themed living space",
    features: ["Italian marble", "Designer furniture", "Art collection"],
    metric: "600 sq ft",
    goal: "Luxury statement design",
  },
]

interface SearchResultsProps {
  query: string
}

export function SearchResults({ query }: SearchResultsProps) {
  const [searchQuery, setSearchQuery] = useState(query)
  const [selectedRoom, setSelectedRoom] = useState("All Rooms")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects)
  const router = useRouter()

  useEffect(() => {
    let filtered = mockProjects

    // Filter by search query
    if (searchQuery.toLowerCase().includes("interior") || searchQuery.toLowerCase().includes("design")) {
      // Show all projects for interior design searches
      filtered = mockProjects
    }

    // Filter by room category
    if (selectedRoom !== "All Rooms") {
      filtered = filtered.filter((project) => project.room === selectedRoom)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, selectedRoom])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  const scrollContainer = (direction: "left" | "right", containerId: string) => {
    const container = document.getElementById(containerId)
    if (container) {
      const scrollAmount = 400 // Increased scroll amount to match card width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  const groupedProjects = roomCategories.reduce(
    (acc, room) => {
      if (room === "All Rooms") return acc
      const roomProjects = filteredProjects.filter((project) => project.room === room)
      if (roomProjects.length > 0) {
        acc[room] = roomProjects
      }
      return acc
    },
    {} as Record<string, Project[]>,
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-6">
          <div className="relative flex items-center bg-white rounded-full shadow-lg border border-tatva-light-gray/30 overflow-hidden">
            <div className="absolute left-6 text-tatva-gray">
              <Search className="h-5 w-5" />
            </div>
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 pl-16 pr-4 py-4 text-base border-0 bg-transparent placeholder:text-tatva-gray/70 focus:ring-0 focus:outline-none text-tatva-gray"
              placeholder="Search for interior designs, rooms, styles..."
            />
            <Button
              type="submit"
              className="m-2 px-6 py-3 bg-tatva-charcoal hover:bg-tatva-charcoal/90 text-white font-semibold rounded-full transition-all duration-300"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-tatva-gray text-sm">
            About {filteredProjects.length} results for "{query}"
          </p>
        </div>

        {/* Room Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {roomCategories.map((room) => (
            <Button
              key={room}
              variant={selectedRoom === room ? "default" : "outline"}
              onClick={() => setSelectedRoom(room)}
              className={`whitespace-nowrap px-4 py-2 rounded-full transition-all duration-200 ${
                selectedRoom === room
                  ? "bg-tatva-charcoal text-white hover:bg-tatva-charcoal/90"
                  : "border-tatva-light-gray text-tatva-gray hover:bg-tatva-charcoal/10 hover:text-tatva-charcoal"
              }`}
            >
              {room}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-tatva-charcoal mb-6">What Is Interior Design?</h2>
          <p className="text-lg text-tatva-gray leading-relaxed">
            At Tatva Ops, interior design is the foundation of everything we do. It's not about guesswork, quick fixes,
            or "one-size-fits-all" solutions. Interior design provides precise, objective data about spatial processes
            and aesthetic preferences by measuring specific elements in room layouts, allowing for a more personalized
            and proactive approach to living spaces compared to generic advice or style-driven choices.
          </p>
        </div>
      </div>

      {/* Room-wise Project Sections */}
      {selectedRoom === "All Rooms" ? (
        Object.entries(groupedProjects).map(([roomName, projects]) => (
          <div key={roomName} className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-tatva-charcoal">{roomName} Designs</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollContainer("left", `scroll-${roomName}`)}
                  className="p-2 border-tatva-light-gray hover:bg-tatva-charcoal/10 rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => scrollContainer("right", `scroll-${roomName}`)}
                  className="p-2 border-tatva-light-gray hover:bg-tatva-charcoal/10 rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              id={`scroll-${roomName}`}
              className="flex gap-6 overflow-x-auto pb-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="flex-shrink-0 w-96 h-80 bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-tatva-light-gray/20 rounded-3xl overflow-hidden"
                >
                  <div className="relative h-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    <div className="absolute top-6 left-6">
                      <div className="text-4xl font-bold text-white mb-1">
                        {project.metric.split(" ")[0]}
                        <span className="text-lg font-normal ml-1 opacity-90">{project.metric.split(" ")[1]}</span>
                      </div>
                      <div className="text-lg font-semibold text-white/90">{project.title}</div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-semibold text-sm">⭐ {project.rating}</span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 bg-tatva-charcoal rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-bold">🎯</span>
                          </div>
                          <span className="font-semibold text-tatva-charcoal text-sm">Goal</span>
                          <span className="text-tatva-gray text-sm">{project.goal}</span>
                        </div>
                        <div className="space-y-1">
                          {project.features.slice(0, 2).map((feature, index) => (
                            <div key={index} className="flex items-center text-sm text-tatva-gray">
                              <span className="w-1 h-1 bg-tatva-charcoal rounded-full mr-3 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-2xl font-bold text-white">{project.price}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      ) : (
        /* Single Room View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer border border-tatva-light-gray/30 rounded-2xl overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden rounded-t-2xl">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-semibold text-tatva-charcoal">
                  ⭐ {project.rating}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="mb-3">
                  <h3 className="font-semibold text-lg text-tatva-charcoal mb-1">{project.title}</h3>
                  <p className="text-tatva-gray text-sm mb-2">{project.description}</p>
                  <div className="text-xl font-bold text-tatva-charcoal">{project.price}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-tatva-charcoal">Key Features:</div>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, index) => (
                      <span key={index} className="text-xs bg-tatva-beige text-tatva-gray px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
