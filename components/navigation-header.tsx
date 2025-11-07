"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, LogIn } from "lucide-react"

export function NavigationHeader() {
  const pathname = usePathname()
  const [q, setQ] = useState("")
  
  function submit(e: React.FormEvent){ 
    e.preventDefault()
    // Search functionality disabled
  }
  
  // On homepage, show full navigation
  if (pathname === "/") {
    return (
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-center w-full px-6 py-6">
          {/* Combined Navigation Pill */}
          <nav className="glass-pill">
            <div className="flex items-center gap-1 px-3 py-2">
              {/* Logo */}
              <Link href="/" className="flex items-center px-3 py-2">
                <Image src="/tatva-ops-logo.png" alt="Tatva Ops" width={120} height={40} className="h-8 w-auto" />
              </Link>
              
              {/* Navigation Links */}
              <ul className="hidden md:flex items-center gap-1">
                <li>
                  <Link href="/about" className="px-4 py-2 text-sm font-medium text-tatva-charcoal hover:text-tatva-orange hover:bg-white/50 rounded-full transition-all duration-200">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="px-4 py-2 text-sm font-medium text-tatva-charcoal hover:text-tatva-orange hover:bg-white/50 rounded-full transition-all duration-200">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/testimonials" className="px-4 py-2 text-sm font-medium text-tatva-charcoal hover:text-tatva-orange hover:bg-white/50 rounded-full transition-all duration-200">
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="px-4 py-2 text-sm font-medium text-tatva-charcoal hover:text-tatva-orange hover:bg-white/50 rounded-full transition-all duration-200">
                    Contact Us
                  </Link>
                </li>
              </ul>
              
              {/* Login Button */}
              <Button variant="ghost" className="text-tatva-charcoal hover:text-tatva-orange hover:bg-white/50 transition-all duration-200 font-medium text-sm px-4 py-2 rounded-full flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Login
              </Button>
            </div>
          </nav>
        </div>
      </header>
    )
  }
  
  // On search page, don't show header
  if (pathname === "/search") {
    return null
  }

  // On other pages, show search centered with login on right
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between w-full px-6 py-6">
        {/* Empty space for balance */}
        <div className="w-20"></div>
        {/* Inline search centered */}
        <div className="flex-1 flex items-center justify-center px-4">
          <form onSubmit={submit} className="hidden md:block w-full max-w-xl relative">
            <div className="glass-pill px-4 py-2 flex items-center">
              <Input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search services..." className="border-0 bg-transparent focus-visible:ring-0 text-sm flex-1" />
              <button type="submit" className="ml-2 p-1 hover:opacity-70 transition-opacity">
                <Search className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </form>
        </div>
        {/* Login at absolute right */}
        <div className="glass-pill"><Button variant="ghost" className="text-tatva-charcoal hover:text-tatva-orange hover:bg-transparent transition-all duration-200 font-medium text-sm px-4 py-2 rounded-full flex items-center gap-2">
          <LogIn className="h-4 w-4" />
          Login
        </Button></div>
      </div>
    </header>
  )
}
