"use client"

import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { flatItems, expandQueryTokens, scoreItem } from "@/lib/search-utils"

export function NavigationHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [q, setQ] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  
  function submit(e: React.FormEvent){ e.preventDefault(); router.push(`/search?q=${encodeURIComponent(q)}`) }
  
  useEffect(()=>{
    const t = q.trim(); if(t.length<3){ setSuggestions([]); return }
    const qTokens = expandQueryTokens(t)
    const matches = flatItems.map(item=>({ ...item, score: scoreItem(item as any, qTokens) }))
      .filter(m=>m.score>0)
      .sort((a,b)=>b.score-a.score)
      .slice(0,3)
      .map(m=>m.label)
    setSuggestions(matches)
  },[q])
  
  // On homepage, show logo and login
  if (pathname === "/") {
    return (
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="flex items-center justify-between w-full px-6 py-6">
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
            {suggestions.length>0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white/95 backdrop-blur-sm border rounded-2xl shadow-xl p-2">
                <div className="flex gap-2">
                  {suggestions.map(s=> (
                    <button key={s} onClick={()=>router.push(`/search?q=${encodeURIComponent(s)}`)} className="px-3 py-2 rounded-full border text-sm hover:bg-tatva-charcoal/10">{s}</button>
                  ))}
                </div>
              </div>
            )}
          </form>
        </div>
        {/* Login at absolute right */}
        <div className="glass-pill"><Button variant="ghost" className="text-tatva-charcoal hover:text-tatva-orange hover:bg-transparent transition-all duration-200 font-medium text-sm px-4 py-2 rounded-full">Login</Button></div>
      </div>
    </header>
  )
}
