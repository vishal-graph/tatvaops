"use client"

import Link from "next/link"
import Image from "next/image"
import { Home, Info, Shield, HelpCircle, Phone, LogIn, Wrench } from "lucide-react"
import { useState } from "react"

const topItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/search", icon: Wrench, label: "Services" },
  { href: "/about", icon: Info, label: "About Us" },
  { href: "/privacy", icon: Shield, label: "Privacy Policy" },
]

const bottomItems = [
  { href: "/help", icon: HelpCircle, label: "Help & Support" },
  { href: "/login", icon: LogIn, label: "Login" },
]

export function Sidebar(){
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 bg-white text-gray-800 overflow-hidden w-16 border-r border-gray-200">
      <nav className="flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-center px-3 py-4">
            <Link href="/" className="block">
              <Image 
                src="/geometric-logo.png" 
                alt="Tatva Ops" 
                width={32} 
                height={32} 
                className="h-8 w-8 cursor-pointer hover:opacity-80 transition-opacity" 
              />
            </Link>
          </div>
          <div className="mt-2 flex flex-col">
            {topItems.map(({href, icon:Icon, label})=> (
              <div key={href} className="relative">
                <Link 
                  href={href} 
                  className="flex items-center justify-center px-3 py-3 hover:bg-gray-100"
                  onMouseEnter={() => setHoveredItem(href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Icon className="h-5 w-5" />
                </Link>
                {hoveredItem === href && (
                  <div className="absolute left-16 top-0 bg-white px-3 py-3 rounded-r-md shadow-lg border border-gray-200 z-50">
                    <span className="text-sm whitespace-nowrap">{label}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          {bottomItems.map(({href, icon:Icon, label})=> (
            <div key={href} className="relative">
                <Link 
                  href={href} 
                  className="flex items-center justify-center px-3 py-3 hover:bg-gray-100"
                  onMouseEnter={() => setHoveredItem(href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Icon className="h-5 w-5" />
                </Link>
                {hoveredItem === href && (
                  <div className="absolute left-16 top-0 bg-white px-3 py-3 rounded-r-md shadow-lg border border-gray-200 z-50">
                    <span className="text-sm whitespace-nowrap">{label}</span>
                  </div>
                )}
            </div>
          ))}
          <div className="px-3 py-3 text-[11px] text-gray-400 text-center">©</div>
        </div>
      </nav>
    </aside>
  )
}


