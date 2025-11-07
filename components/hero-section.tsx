"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const serviceCategories = [
  "Interior Designing...",
  "Painting...",
  "Home Renovation...",
  "Furniture Setup...",
  "Construction Projects...",
  "Electrical Work...",
  "Plumbing Services...",
]

const searchOptions = [
  "Interior Design",
  "Construction",
  "Painting",
  "Home Automations",
  "Electrical Service",
  "Plumbing Services",
]

const backgroundImages = [
  "/freepik__the-style-is-candid-image-photography-with-natural__27320-1024x512.webp",
  "/living-room-interior.jpg",
  "/nalukettu-_1728994135329.jpg",
  "/Step into a Kerala home built around a beautiful traditional courtyard.webp",
]

export function HeroSection() {
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showOptions, setShowOptions] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const placeholderInterval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % serviceCategories.length)
    }, 2500)

    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % backgroundImages.length)
    }, 3000)

    return () => {
      clearInterval(placeholderInterval)
      clearInterval(imageInterval)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search functionality disabled
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(e)
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-tatva-beige">
      <div className="absolute inset-0 z-0 pt-20">
        {backgroundImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-x-4 top-4 bottom-6 bg-cover bg-center transition-opacity duration-1000 rounded-3xl shadow-2xl ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
        <div className="absolute inset-x-4 top-4 bottom-6 bg-tatva-light-overlay z-10 rounded-3xl" />
      </div>

      <div className="relative z-30 max-w-4xl mx-auto px-6 text-center">
        <h1
          className={`text-5xl font-bold mb-6 leading-tight text-balance transition-all duration-1000 font-sans md:text-6xl text-white ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"}`}
          style={{ textShadow: "2px 2px 4px var(--color-tatva-text-shadow)" }}
        >
          We are Building the Future of <span className="text-chart-4">Trusted Home Projects</span>
        </h1>

        <p
          className={`mb-12 max-w-3xl mx-auto leading-relaxed text-pretty transition-all duration-1000 font-sans text-center text-lg font-normal text-white ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"} animate-delay-200`}
          style={{ textShadow: "1px 1px 2px var(--color-tatva-text-shadow)" }}
        >
          {
            "Discover verified service partners, track milestones, and manage payments - all in one simple platform. From interiors to construction, Tatva Ops ensures safe, seamless project delivery."
          }
        </p>

        <div
          className={`relative max-w-2xl mx-auto mb-12 transition-all duration-1000 ${isVisible ? "animate-fade-in-up opacity-100" : "opacity-0"} animate-delay-400`}
        >
          <form
            onSubmit={handleSearch}
            className="relative flex items-center bg-tatva-search-bg rounded-full shadow-2xl border border-tatva-light-gray/30 overflow-hidden hover:shadow-3xl transition-all duration-300"
          >
            <div className="absolute left-6 text-tatva-gray">
              <Search className="h-6 w-6" />
            </div>

            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowOptions(true)}
              onBlur={() => setTimeout(() => setShowOptions(false), 200)}
              className="flex-1 pl-16 pr-4 py-6 text-lg border-0 bg-transparent placeholder:text-tatva-gray/70 focus:ring-0 focus:outline-none text-tatva-gray"
              placeholder={serviceCategories[currentPlaceholder]}
            />

            <Button
              type="submit"
              className="m-2 px-8 py-4 bg-tatva-orange hover:bg-tatva-orange-hover text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg"
              size="lg"
            >
              Search
            </Button>
          </form>

          {showOptions && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-sm border border-tatva-light-gray rounded-2xl shadow-xl p-4">
              <div className="flex flex-wrap gap-2 justify-center">
                {searchOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSearchQuery(option)
                      setShowOptions(false)
                    }}
                    className="px-4 py-2 rounded-full border border-tatva-light-gray text-sm font-medium hover:bg-tatva-orange hover:text-white hover:border-tatva-orange transition-all duration-200"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* trust badges removed per request */}
      </div>

      {/* Footer glass pills - centered */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="glass-pill px-4 py-2">
          <div className="flex items-center gap-3 text-sm text-black">
            <Link href="/privacy" className="hover:opacity-90 transition">Privacy &amp; Policy</Link>
            <span className="opacity-40">•</span>
            <Link href="/terms" className="hover:opacity-90 transition">Terms &amp; Conditions</Link>
            <span className="opacity-40">•</span>
            <Link href="/contact" className="hover:opacity-90 transition">Contact Us</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
