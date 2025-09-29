"use client"

import { usePathname } from "next/navigation"
import { Sidebar } from "./sidebar"

export function ConditionalSidebar() {
  const pathname = usePathname()
  
  // Don't show sidebar on home page
  if (pathname === "/") {
    return null
  }
  
  return <Sidebar />
}
