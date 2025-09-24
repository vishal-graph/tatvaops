"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function NavigationHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/95 backdrop-blur-xl rounded-full px-8 py-4 border border-tatva-light-gray/20 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image src="/tatva-ops-logo.png" alt="Tatva Ops" width={120} height={40} className="h-8 w-auto" />
            </Link>

            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/about"
                className="text-tatva-charcoal hover:text-tatva-orange transition-colors duration-200 font-medium text-sm"
              >
                About Us
              </Link>
              <Link
                href="/enquiry"
                className="text-tatva-charcoal hover:text-tatva-orange transition-colors duration-200 font-medium text-sm"
              >
                Enquiry
              </Link>
              <Link
                href="/contact"
                className="text-tatva-charcoal hover:text-tatva-orange transition-colors duration-200 font-medium text-sm"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-tatva-charcoal hover:text-tatva-orange hover:bg-tatva-orange/10 transition-all duration-200 font-medium text-sm px-4 py-2 rounded-full"
              >
                Login
              </Button>
              <Button className="bg-tatva-orange hover:bg-tatva-orange-hover text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 hover:scale-105">
                Try Tatva Ops
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
